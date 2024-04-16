import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // import auth from firebase/auth

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "invoicefy-93c67.firebaseapp.com",
  projectId: "invoicefy-93c67",
  storageBucket: "invoicefy-93c67.appspot.com",
  messagingSenderId: "104827703585",
  appId: "1:104827703585:web:c2042780f904cfc6ceee60",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // initialize and export auth module
