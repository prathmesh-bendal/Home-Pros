// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnLXtscMg7z-s2UQ6fDpMnGT3YaHMGMLE",
  authDomain: "home-pros-4e9eb.firebaseapp.com",
  projectId: "home-pros-4e9eb",
  storageBucket: "home-pros-4e9eb.appspot.com",
  messagingSenderId: "483324397913",
  appId: "1:483324397913:web:901de278ca15647ff46448"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()