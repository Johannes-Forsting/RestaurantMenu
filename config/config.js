// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6ourj7WSwBpF41P8nbu6fyl2EDVjtX7c",
    authDomain: "restaurantmenu-94eff.firebaseapp.com",
    projectId: "restaurantmenu-94eff",
    storageBucket: "restaurantmenu-94eff.appspot.com",
    messagingSenderId: "802464809223",
    appId: "1:802464809223:web:21b1bbaed9b72e8014c5a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore();
export const storage = getStorage(app);