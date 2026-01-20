// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTPzVhGeXz9oxIqc8wwQizPKSBnezr7kI",
  authDomain: "simatika-undiksha.firebaseapp.com",
  projectId: "simatika-undiksha",
  storageBucket: "simatika-undiksha.firebasestorage.app",
  messagingSenderId: "844013907697",
  appId: "1:844013907697:web:f64067d7e6e1a179e58350",
  measurementId: "G-V5RQQJ4FE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);