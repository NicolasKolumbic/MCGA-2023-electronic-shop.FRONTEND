// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhmGGzfAt-jGuFcB5MJFxyMX2A2RyhuMk",
  authDomain: "mcga---login.firebaseapp.com",
  projectId: "mcga---login",
  storageBucket: "mcga---login.appspot.com",
  messagingSenderId: "32064969706",
  appId: "1:32064969706:web:a3b27bdd6fbceaa8697093",
  measurementId: "G-JX7N78NVYQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
