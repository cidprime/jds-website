import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";

export default function CreateCourse() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [refCreatedBy, setRefCreatedBy] = useState(currentUser._id);
  const [formData, setFormData] = useState({
    createdBy: currentUser._id,
  });
  
  console.log(formData.imageUrl);

  const handleImageSubmit = (e) => {
    if(file && file.size > 0) {
      setUploading(true);
      setImageUploadError(false);
      storeImage(file);
    } else {
      setImageUploadError("save an image first");
      setUploading(false);
    }
  }
  
  const storeImage = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setImageUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, imageUrl: downloadURL });
            setImageUploadError(false);
            setUploading(false);
          })
          .catch(err => {
            setImageUploadError("Image Upload failed (image must be less than 2 Mb)");
            setUploading(false);
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
      // dispatch(updateUserStart());

      const res = await fetch(`/api/courses/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if(data.success === false) {
        // dispatch(updateUserFailure(data.message));
        return;
      }
      // dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch(err) {
      // dispatch(updateUserFailure(err.message));
    }
  }

  // Need to delete from Firebase
  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      imageUrl: ''
    });
  }

  return (
    <main className='p-3 max-w-5xl mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Create a course</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className="flex flex-col gap-4 flex-1">
          <input onChange={handleChange} type="text" placeholder='Title' className='border p-2 rounded-md focus:outline-blue-400' id='title' maxLength='300' minLength='6' required/>
          <textarea onChange={handleChange} type="text" placeholder='Description' className='border p-2 rounded-md focus:outline-blue-400' id='description' required/>
          
          <div className="flex gap-10 items-center">
            <div className="flex gap-2">
              <input onChange={handleChange} type="checkbox" id='isFree' className='w-5'/>
              <span>Is free</span>
            </div>

            <div className="flex gap-2 items-center">
              <input onChange={handleChange} type="number" min="500" placeholder='Price in XOF' className='border p-2 rounded-md focus:outline-blue-400' id='price' required/>
              <span className='text-xs'>(Prix en XOF)</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className='font-normal text-sm text-gray-600 '>Niveau du cours</span>

            <select onChange={handleChange} id="level" className='border p-2 rounded-md focus:outline-blue-400' required>
              <option value="Beginner">Beginner</option>
              <option value="intermediate">intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          
          <input onChange={handleChange} type="text" placeholder='Domain (ex: Informatique, Marketing)' className='border p-2 rounded-md focus:outline-blue-400' id='domain' required/>

          <input onChange={handleChange} type="number" id="duration" min="1" placeholder='duree estimee du cours (en heures)' className='border p-2 rounded-md focus:outline-blue-400' required/>

          <textarea onChange={handleChange} type="text" placeholder='Programme du cours' className='border p-2 rounded-md focus:outline-blue-400' id='syllabus' required/>
  
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Image : 
            <span className='font-normal text-gray-600 ml-2'>the image must be the course cover</span>
          </p>
          <div className="flex gap-4">
            <input onChange={(e) => setFile(e.target.files[0])} className='p-3 border border-gray-300 rounded w-full' type="file" id='image' accept='image/*'/>
            <button disabled={uploading} type="button" onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              {uploading ? 'Loading...' : 'Upload'}
            </button>
          </div>
          <p className='text-sm self-center'>
            {
              imageUploadError ? (
                <span className="text-red-700">{imageUploadError}</span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">{`Uploading ${filePerc} %`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">Image successfully uploaded</span>
              ) : ''
            }
          </p>
          {
            formData.imageUrl && <div className="flex justify-between p-2 border items-center">
              <img src={formData.imageUrl} alt="course cover" className="w-20 h-20 object-contain rounded-lg"/>
              <button onClick={handleRemoveImage} type="button" className="text-red-700 p-2 uppercase hover:opacity-75">Delete</button>
            </div>
          }
          <button onClick={handleImageSubmit} className="bg-slate-700 text-white p-2 rounded-lg text-center uppercase hover:opacity-95 disabled:opacity-80">
            {currentUser.role !== 4181 && <Link to={"/create-sections"}>
              Create a course
            </Link>}
          </button>
        </div>
      </form>
    </main>
  )
}
