// client/src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCpazYas5m2eN3tuEqH1BV2FQ8UJVvrNRU",
    authDomain: "drug-traceability-system.firebaseapp.com",
    projectId: "drug-traceability-system",
    storageBucket: "drug-traceability-system.firebasestorage.app",
    messagingSenderId: "359766500424",
    appId: "1:359766500424:web:337c79c2684bdbf00d247d",
    measurementId: "G-R9E1JT291T"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};