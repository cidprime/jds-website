// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jds-website-61e20.firebaseapp.com",
  projectId: "jds-website-61e20",
  storageBucket: "jds-website-61e20.appspot.com",
  messagingSenderId: "159510850824",
  appId: "1:159510850824:web:c24e94658d275e3b0110bd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);