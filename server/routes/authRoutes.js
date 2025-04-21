// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Verify Firebase ID token and get user data
router.post('/verify', async (req, res) => {
  try {
    const { idToken } = req.body;
    
    if (!idToken) {
      return res.status(400).json({ error: 'ID token is required' });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Here you can add custom logic to check if the user exists in your DB
    // or create a new user record if needed
    
    res.json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || '',
      picture: decodedToken.picture || '',
      isAdmin: decodedToken.email === 'admin@example.com' // Replace with your admin email
    });
  } catch (err) {
    console.error('Error verifying ID token:', err);
    res.status(401).json({ error: 'Invalid ID token' });
  }
});

// Get current user data
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const idToken = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // You can add additional user data from your database here
    res.json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || '',
      picture: decodedToken.picture || '',
      isAdmin: decodedToken.email === 'admin@example.com' // Replace with your admin email
    });
  } catch (err) {
    console.error('Error getting user data:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;