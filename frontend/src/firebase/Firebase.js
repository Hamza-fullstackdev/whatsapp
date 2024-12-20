// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "whatsapp-d5540.firebaseapp.com",
  projectId: "whatsapp-d5540",
  storageBucket: "whatsapp-d5540.appspot.com",
  messagingSenderId: "1009772786700",
  appId: "1:1009772786700:web:bc339b2c5ba3035927ea29",
  measurementId: "G-TNJS0FS2JP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
