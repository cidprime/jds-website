import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-white shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>
        <Link to={'/'}>
          <h1 className='font-bold text-sm sm:text-lg flex flex-wrap'>
            <span className='text-blue-900'>JED</span>
            <span className='text-yellow-500'>DIGITAL</span>
            <span className='text-blue-900'>SOLUTIONS</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-2 rounded-lg flex items-center'>
          <input type="text" placeholder='Search...' className='focus:outline-none bg-transparent w-24 sm:w-60'/>
          <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-4'>
          <Link to={'/'}>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link to={'/about'}>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          <Link to={'/log-in'}>
            <li className='text-slate-700 hover:underline'>
              Sign in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
