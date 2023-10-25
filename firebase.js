import {initializeApp } from "firebase/app";
import {getFirestore } from "@firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA7Q76ybPvg3R0PMxdxbNKb7_LNaqOHZUk",
  authDomain: "fir-c195b.firebaseapp.com",
  projectId: "fir-c195b",
  storageBucket: "fir-c195b.appspot.com",
  messagingSenderId: "239156595773",
  appId: "1:239156595773:web:773e5c09af66e301d46e54",
  measurementId: "G-GXM9TM9394"
};

const app =initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage= getStorage(app);
                                  