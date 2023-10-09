// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDxdjrimfN_KDsmCwa4ATgCF4-qvC9Ykag",
  authDomain: "powergym-75bd7.firebaseapp.com",
  projectId: "powergym-75bd7",
  storageBucket: "powergym-75bd7.appspot.com",
  messagingSenderId: "548776827841",
  appId: "1:548776827841:web:9339429e17f6e3e1586d40",
  measurementId: "G-4W9G2XFFZV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);