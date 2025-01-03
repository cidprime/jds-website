import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { FaEdit } from "react-icons/fa"
import { updateUserFailure, updateUserSuccess, updateUserStart, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutStart, signOutFailure, signOutSuccess } from '../redux/user/userSlice'
import { Link } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL;

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL });
          })
      }
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      dispatch(updateUserStart());

      const res = await fetch(`${API_URL}/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if(data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch(err) {
      dispatch(updateUserFailure(err.message));
    }
  }

  const handleDeleteUser = async () => {
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`${API_URL}/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

    } catch(err) {
      dispatch(deleteUserFailure(err.message));
    }
  }

  const handleSignOut = async () => {
    try{
      dispatch(signOutStart());
      const res = await fetch(`${API_URL}/api/auth/signout`);

      const data = await res.json();
      if(data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));

    } catch(err) {
      dispatch(signOutFailure(err.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full w-24 h-24 cursor-pointer object-cover self-center mt-1" />
        <p className='text-sm self-center'>
          {
            fileUploadError ? (
              <span className="text-red-700">Error Image Upload(image must be less than 2 Mb)</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc} %`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">Image successfully uploaded</span>
            ) : ''
          }
        </p>
        <input type="text" placeholder="Prenom(s)" defaultValue={currentUser.firstname} id="firstname" className='border p-2 rounded-md focus:outline-blue-800 hover:outline-blue-600' onChange={handleChange} />
        <input type="text" placeholder="Nom" defaultValue={currentUser.lastname} id="lastname" className='border p-2 rounded-md focus:outline-blue-800 hover:outline-blue-600' onChange={handleChange} />
        <input type="email" placeholder="email" defaultValue={currentUser.email} id="eamil" className='border p-2 rounded-md focus:outline-blue-800 hover:outline-blue-600' onChange={handleChange} />
        <input type="password" placeholder="password" id="password" className='border p-2 rounded-md focus:outline-blue-800 hover:outline-blue-600' onChange={handleChange} />
        <button disabled={loading} className='bg-blue-950 text-white rounded-md p-2 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
        {currentUser.role !== 4181 && <Link className="bg-green-700 text-white p-2 rounded-lg text-center uppercase hover:opacity-95" to={"/create-course"}>
          Create Course
        </Link>}
      </form>
      <div className="flex justify-between mt-2">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      {error && <p className='text-red-800 mt-4'> {error} </p>}
      {updateSuccess && <p className='text-green-800 mt-4'> Update completed </p>}
    </div>
  )
}
