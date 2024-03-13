import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

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
const auth: Auth = getAuth(app);

export {app, auth};
