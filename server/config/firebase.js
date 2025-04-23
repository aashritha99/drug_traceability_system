// server/services/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // Download from Firebase Console

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

// Auth functions
const verifyIdToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      role: decodedToken.email === process.env.ADMIN_EMAIL ? 'admin' : 'user' // Custom claim check
    };
  } catch (err) {
    console.error('Error verifying token:', err);
    throw new Error('Invalid ID token');
  }
};

const setCustomUserClaims = async (uid, claims) => {
  try {
    await admin.auth().setCustomUserClaims(uid, claims);
    console.log(`Custom claims set for ${uid}`);
  } catch (err) {
    console.error('Error setting claims:', err);
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await admin.auth().getUserByEmail(email);
    return user;
  } catch (err) {
    if (err.code === 'auth/user-not-found') return null;
    throw err;
  }
};

const createUser = async (userData) => {
  try {
    const user = await admin.auth().createUser({
      email: userData.email,
      password: userData.password,
      emailVerified: userData.email === process.env.ADMIN_EMAIL // Auto-verify admin
    });

    if (userData.email === process.env.ADMIN_EMAIL) {
      await setCustomUserClaims(user.uid, { role: 'admin' });
    }

    return user;
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

// Database reference
const db = admin.firestore();
const authInstance = admin.auth();

module.exports = {
  admin,
  auth: authInstance,
  db,
  verifyIdToken,
  setCustomUserClaims,
  getUserByEmail,
  createUser
};