// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPCLi8Pv8O-f1ZdsyzYJ7JbxvGjv5fAN8",
  authDomain: "electronic-shop-ba2cf.firebaseapp.com",
  projectId: "electronic-shop-ba2cf",
  storageBucket: "electronic-shop-ba2cf.appspot.com",
  messagingSenderId: "762212707267",
  appId: "1:762212707267:web:439b280df4eaf425ca6b76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
