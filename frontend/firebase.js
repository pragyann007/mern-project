// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vinzo-abecb.firebaseapp.com",
  projectId: "vinzo-abecb",
  storageBucket: "vinzo-abecb.firebasestorage.app",
  messagingSenderId: "19593924521",
  appId: "1:19593924521:web:cd324da0220aad5b96beb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth}


