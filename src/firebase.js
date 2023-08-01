import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from  "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2AsLuDuinfOVO7NHR3SF3E-Z14YKQFtw",
  authDomain: "swasthya-app-626cc.firebaseapp.com",
  projectId: "swasthya-app-626cc",
  storageBucket: "swasthya-app-626cc.appspot.com",
  messagingSenderId: "151567214116",
  appId: "1:151567214116:web:795baf7d7f58b0b96cdab1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db=getFirestore();

export {app,auth,db};