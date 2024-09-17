import { FaGoogle } from 'react-icons/fa';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try{
      const Provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, Provider);
      
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: result.user.displayName, 
          email: result.user.email, 
          avatar: result.user.photoURL 
        })
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');

    } catch(err) {
      console.log('could not signIn with google', err);
    }
  }

  return (
    <button onClick={handleGoogleClick} type='button' className='flex justify-center gap-4 items-center bg-red-800 text-white p-2 uppercase rounded-lg hover:opacity-95'>
      <FaGoogle />
      Continue with Google
    </button>
  )
}
