import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});


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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
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
        <input type="text" placeholder="Prenom(s)" id="prenom" className='border p-2 rounded-md focus:outline-blue-800 hover:outline-blue-600' />
        <input type="text" placeholder="Nom" id="nom" className='border p-2 rounded-md focus:outline-blue-800 hover:outline-blue-600'/>
        <input type="email" placeholder="email" id="eamil" className='border p-2 rounded-md focus:outline-blue-800 hover:outline-blue-600' />
        <input type="password" placeholder="password" id="password" className='border p-2 rounded-md focus:outline-blue-800 hover:outline-blue-600' />
        <button className='bg-blue-950 text-white rounded-md p-2 uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className="flex justify-between mt-2">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
