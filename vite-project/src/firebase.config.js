// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRRQUvxl3Rzcuk384MidgYmhpcMNXbEDs",
  authDomain: "chatting-web-6aa69.firebaseapp.com",
  projectId: "chatting-web-6aa69",
  storageBucket: "chatting-web-6aa69.firebasestorage.app",
  messagingSenderId: "510109610079",
  appId: "1:510109610079:web:e7c97486693df12970abea",
  measurementId: "G-PGQ80EWCX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
auth.settings.appVerificationDisabledForTesting = false;
export const db = getFirestore(app); 
export const storage = getStorage(app);

