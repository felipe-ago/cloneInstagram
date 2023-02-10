import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/functions";
import firebase from "firebase/compat/app";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDFYYh7DaZ0LXv66N7H4eLcjOwGDgohl-k",
  authDomain: "instagram-clone-curso-e7a1b.firebaseapp.com",
  projectId: "instagram-clone-curso-e7a1b",
  storageBucket: "instagram-clone-curso-e7a1b.appspot.com",
  messagingSenderId: "162921568078",
  appId: "1:162921568078:web:a4ebfe50112ed59270f01f",
  measurementId: "G-D75R6D5BDZ",
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export { db, auth, storage, functions };
