import React from 'react'

export default function CreateCourse() {
  return (
    <main className='p-3 max-w-5xl mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Create a course</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className="flex flex-col gap-4 flex-1">
          <input type="text" placeholder='Title' className='border p-2 rounded-md focus:outline-blue-400' id='title' maxLength='300' minLength='6' required/>
          <textarea type="text" placeholder='Description' className='border p-2 rounded-md focus:outline-blue-400' id='description' required/>
          
          <div className="flex gap-10 items-center">
            <div className="flex gap-2">
              <input type="checkbox" id='isFree' className='w-5'/>
              <span>Is free</span>
            </div>

            <div className="flex gap-2 items-center">
              <input type="number" placeholder='Price in XOF' className='border p-2 rounded-md focus:outline-blue-400' id='price' required/>
              <span className='text-xs'>(Prix en XOF)</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className='font-normal text-sm text-gray-600 '>Niveau du cours</span>

            <select placeholder="Level" className='border p-2 rounded-md focus:outline-blue-400' required>
              <option value="Beginner" placeholder="Niveau du cours"></option>
              <option>Beginner</option>
              <option>intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          
          <input type="text" placeholder='Domain (ex: Informatique, Marketing)' className='border p-2 rounded-md focus:outline-blue-400' id='domain' required/>

          <input type="number" placeholder='duree estimee du cours (en min)' className='border p-2 rounded-md focus:outline-blue-400' required/>

          <textarea type="text" placeholder='Programme du cours' className='border p-2 rounded-md focus:outline-blue-400' id='syllabus' required/>
  
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Image : 
            <span className='font-normal text-gray-600 ml-2'>the image must be the cover</span>
          </p>
          <div className="flex gap-4">
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id='image' accept='image/*'/>
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
          <button className="bg-slate-700 text-white p-2 rounded-lg text-center uppercase hover:opacity-95 disabled:opacity-80">
            Create a course
          </button>
        </div>
      </form>
    </main>
  )
}
