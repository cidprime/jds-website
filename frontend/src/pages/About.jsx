import React from 'react'
import AboutUsBg from '../assets/About-us-background.jpeg'

export default function About() {
  return (
    <div>
      <div className='flex '>
        <img className='' src={AboutUsBg} alt="About us background image" />
        <span className='text-red-600'>About Us</span>
      </div>
    </div>
  )
}
