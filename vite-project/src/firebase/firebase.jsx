// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRRQUvxl3Rzcuk384MidgYmhpcMNXbEDs",
  authDomain: "chatting-web-6aa69.firebaseapp.com",
  projectId: "chatting-web-6aa69",
  storageBucket: "chatting-web-6aa69.firebasestorage.app",
  messagingSenderId: "510109610079",
  appId: "1:510109610079:web:e7c97486693df12970abea",
  measurementId: "G-PGQ80EWCX1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth=getAuth(app);
export {app,auth};