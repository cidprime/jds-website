import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('query', search);
    urlParams.set('page', 1);
    const searchQuery = urlParams.toString();
    navigate(`/?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const queryFromUrl = urlParams.get('query');
    if(queryFromUrl) {
      setSearch(queryFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-white shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>
        <Link to={'/'} className='cursor-pointer'>
          <h1 className='font-bold text-sm sm:text-lg flex flex-wrap'>
            <span className='text-blue-900'>JED</span>
            <span className='text-yellow-500'>DIGITAL</span>
            <span className='text-blue-900'>SOLUTIONS</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-2 rounded-lg flex items-center'>
          <input type="text" placeholder='Search...' className='focus:outline-none bg-transparent w-24 sm:w-60' 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
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
          <Link to={'/dashboard'}>
            {
              currentUser ? (<img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />)
                          : (<li className='text-slate-700 hover:underline'>
                              Sign in
                            </li>) 
            }
          </Link>
        </ul>
      </div>
    </header>
  )
}
