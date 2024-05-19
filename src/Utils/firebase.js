// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfvZDHkXzw0ENr477WzXDmGQ5UTwIpMzY",
  authDomain: "netflixgpt-2efd6.firebaseapp.com",
  projectId: "netflixgpt-2efd6",
  storageBucket: "netflixgpt-2efd6.appspot.com",
  messagingSenderId: "1025542864509",
  appId: "1:1025542864509:web:3ed2f8d163686cc3837b14",
  measurementId: "G-YBKVMFH31B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();