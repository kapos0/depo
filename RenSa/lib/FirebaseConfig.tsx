// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDudjdJ8SwOQjTGP0dd6AEUYtIq09oD6ww",
    authDomain: "rensa-f98f5.firebaseapp.com",
    projectId: "rensa-f98f5",
    storageBucket: "rensa-f98f5.firebasestorage.app",
    messagingSenderId: "1020840537306",
    appId: "1:1020840537306:web:990e3b068b70416d1b09e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
