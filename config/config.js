// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTUnNYyZIwQDK0FaAl4_7H57NkpnHa6SQ",
    authDomain: "fir-demo-1b5b0.firebaseapp.com",
    projectId: "fir-demo-1b5b0",
    storageBucket: "fir-demo-1b5b0.appspot.com",
    messagingSenderId: "244871663167",
    appId: "1:244871663167:web:0d6b54b61edb8d5ac2f28a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore();
export const storage = getStorage(app);

