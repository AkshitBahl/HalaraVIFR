// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl55asjIeqJAgZv-bfdN6gxyJkCmrAIKg",
  authDomain: "awdwawd.firebaseapp.com",
  projectId: "awdwawd",
  storageBucket: "awdwawd.appspot.com",
  messagingSenderId: "402065758231",
  appId: "1:402065758231:web:3ae13a448b486189426452",
  measurementId: "G-R0Y0Q3VN5G"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);


