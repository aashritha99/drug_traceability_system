// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpazYas5m2eN3tuEqH1BV2FQ8UJVvrNRU",
  authDomain: "drug-traceability-system.firebaseapp.com",
  projectId: "drug-traceability-system",
  storageBucket: "drug-traceability-system.firebasestorage.app",
  messagingSenderId: "359766500424",
  appId: "1:359766500424:web:337c79c2684bdbf00d247d",
  measurementId: "G-R9E1JT291T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Google Sign-In function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    console.error("Google sign-in error:", err);
    throw err;
  }
};

// Email/Password Auth Functions
export const emailSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (err) {
    console.error("Email sign-in error:", err);
    throw err;
  }
};

export const emailSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (err) {
    console.error("Sign up error:", err);
    throw err;
  }
};

// Export auth and other necessary functions
export { 
  auth, 
  signOut, 
  onAuthStateChanged,
  googleProvider,
  analytics
};