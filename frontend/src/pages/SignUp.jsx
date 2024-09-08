import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-2xl font-semibold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='fistname' className='p-2 border-2 rounded-lg focus:outline-yellow-700' id='fistname'/>
        <input type="text" placeholder='lastname' className='p-2 border-2 rounded-lg focus:outline-yellow-700' id='lastname'/>
        <input type="text" placeholder='password' className='p-2 border-2 rounded-lg focus:outline-yellow-700' id='password'/>
        <button className='bg-blue-950 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-sm'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Have an account?</p>
        <Link to={'/log-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
