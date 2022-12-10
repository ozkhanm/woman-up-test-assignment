import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const apiKey = process.env.REACT_APP_API_KEY;
const firebaseConfig = {
  apiKey,
  authDomain: "woman-up-backend.firebaseapp.com",
  projectId: "woman-up-backend",
  storageBucket: "woman-up-backend.appspot.com",
  messagingSenderId: "950343160293",
  appId: "1:950343160293:web:d9b75b90f4ccda0fc0df0c",
  measurementId: "G-F3YC3PDS7S"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
