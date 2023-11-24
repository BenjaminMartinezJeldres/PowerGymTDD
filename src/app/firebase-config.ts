// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBi_4pSsEjBAAOSCWJy0Q3sgT3X43t1Uno",
    authDomain: "powergymmobile-76069.firebaseapp.com",
    projectId: "powergymmobile-76069",
    storageBucket: "powergymmobile-76069.appspot.com",
    messagingSenderId: "223598682572",
    appId: "1:223598682572:web:1fda19cc2c55619889fd69"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);