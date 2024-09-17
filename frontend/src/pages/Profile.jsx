import { useSelector } from "react-redux"

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className="rounded-full w-24 h-24 cursor-pointer object-cover self-center mt-1" />
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
