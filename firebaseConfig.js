// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUrXAJ_-0tO8SZnn9BTMxsmF0ik-olEHg",
  authDomain: "mycoin-ee4f3.firebaseapp.com",
  projectId: "mycoin-ee4f3",
  storageBucket: "mycoin-ee4f3.appspot.com",
  messagingSenderId: "688966007004",
  appId: "1:688966007004:web:d67fc690d04d6e7a0b1c19",
  measurementId: "G-FS5VZ55EDP",
  databaseURL:"https://mycoin-ee4f3-default-rtdb.firebaseio.com/"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);