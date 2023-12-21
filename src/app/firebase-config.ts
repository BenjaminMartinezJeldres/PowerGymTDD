// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoUT-l5Dybjj3aqtDacfzzFwhJiKIhYQ4",
  authDomain: "ionic-8394f.firebaseapp.com",
  databaseURL: "https://ionic-8394f-default-rtdb.firebaseio.com",
  projectId: "ionic-8394f",
  storageBucket: "ionic-8394f.appspot.com",
  messagingSenderId: "586355332066",
  appId: "1:586355332066:web:b4b7009058a02ead9c9fbb",
  measurementId: "G-5X89R4W1L6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);