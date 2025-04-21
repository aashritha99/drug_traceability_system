// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from "firebase/auth";

// Your web app's Firebase configuration
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

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Google Sign-In function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Sign Out function
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
};

// Export auth and other necessary functions
export { 
  auth, 
  onAuthStateChanged,
  googleProvider 
};