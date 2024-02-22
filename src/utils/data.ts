// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoDFKLC0Uy7EtWbb8QTn2r4vnOq_khWB4",
  authDomain: "task-manager-dc7e3.firebaseapp.com",
  projectId: "task-manager-dc7e3",
  storageBucket: "task-manager-dc7e3.appspot.com",
  messagingSenderId: "716559229220",
  appId: "1:716559229220:web:1b0fec096dfbab9d2b53b1",
  measurementId: "G-F75X9WBG4H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
