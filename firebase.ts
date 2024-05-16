import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmaSidTJ1u4P8VEvCJdpaVDwTIiqfvK4I",
  authDomain: "mirfanz-funmath.firebaseapp.com",
  projectId: "mirfanz-funmath",
  storageBucket: "mirfanz-funmath.appspot.com",
  messagingSenderId: "199776895803",
  appId: "1:199776895803:web:48cf3c79fbe84d2ffbad1e",
  measurementId: "G-VYBTKKWLZD",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);

export const db = getFirestore(app);
