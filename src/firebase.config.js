
import { initializeApp } from "firebase/app";
import {getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBYefHnql8sU0rCDXxuoA_RlMZzcbpcppk",
  authDomain: "therealstore-ca6bb.firebaseapp.com",
  projectId: "therealstore-ca6bb",
  storageBucket: "therealstore-ca6bb.appspot.com",
  messagingSenderId: "889455036460",
  appId: "1:889455036460:web:048d2b49adeb2c6b1f2989",
  measurementId: "G-VTQPWSWL8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

setPersistence(auth, browserSessionPersistence);
