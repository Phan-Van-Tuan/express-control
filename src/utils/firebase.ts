// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKZGwtokIddt57Aj7WWRGBv7uOB8m3OYc",
  authDomain: "express-services-ce69f.firebaseapp.com",
  projectId: "express-services-ce69f",
  storageBucket: "express-services-ce69f.firebasestorage.app",
  messagingSenderId: "345264553340",
  appId: "1:345264553340:web:598b9c08903bac8593f8f9",
  measurementId: "G-P8E0EQTKQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
