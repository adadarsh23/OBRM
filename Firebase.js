// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZLRK2gL5Xe8nlq_enfFIHiXdL_vobplE",
  authDomain: "boardband23.firebaseapp.com",
  databaseURL: "https://boardband23-default-rtdb.firebaseio.com",
  projectId: "boardband23",
  storageBucket: "boardband23.appspot.com",
  messagingSenderId: "359649510528",
  appId: "1:359649510528:web:1443a5993e721de22b5265",
  measurementId: "G-NWZRP67N0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
export { database,firestore, app, addDoc, collection };