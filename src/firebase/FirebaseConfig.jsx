// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnxnC9f51L9DW3lpy3GEBJ08alUIdrtpU",
  authDomain: "ecommerce-app-2fb53.firebaseapp.com",
  projectId: "ecommerce-app-2fb53",
  storageBucket: "ecommerce-app-2fb53.appspot.com",
  messagingSenderId: "427530213388",
  appId: "1:427530213388:web:94d77a1349d0a3ae1f7629",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export{fireDB,auth}
