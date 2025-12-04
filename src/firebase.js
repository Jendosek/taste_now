import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhn4VZt4ZfA3c5GUTmQK_G06iaaDHZZNo",
  authDomain: "taste-now.firebaseapp.com",
  projectId: "taste-now",
  storageBucket: "taste-now.firebasestorage.app",
  messagingSenderId: "4666838544",
  appId: "1:4666838544:web:3544b1c8f9841493c60495"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);