import { FaPhone } from 'react-icons/fa';
import bgimage from '../assets/contsct-bg-image.jpeg';

export default function Contact() {
  return (
    <div>
      <div className="relative w-full h-64">
        <img src={bgimage} alt="bg-image" className='blur-sm h-full w-full'/>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className='text-2xl sm:text-4xl text-black font-bold'>Nous Contacter</h1>
          <span className='px-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam explicabo esse vitae sit.</span>
        </div>
      </div>
      <div className="">
        <div className="">
          <div className="flex items-center border rounded-lg px-2 my-2">
            <span className='bg-slate-400  p-2 rounded-full'>
              <FaPhone className='rotate-90 w-4 h-auto text-yellow-500'/>
            </span>
            <div className='flex flex-col ml-2'>
              <span className='font-semibold text-sm'>Numéro de Téléphone</span>
              <span className='text-xs'>(+226) 00 00 00 00</span>
            </div>
          </div>
        </div>
      </div>
      <div className="">

      </div>

    </div>
  )
}
