const User = require('../models/User');
const { admin } = require('../firebase-admin');

// Verify Admin Status
exports.verifyAdmin = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const user = await User.findOne({ uid: decodedToken.uid });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    res.json({
      uid: user.uid,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Promote User to Admin (Super Admin Only)
exports.promoteToAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const requestingAdmin = await User.findOne({ uid: req.user.uid });

    if (requestingAdmin.role !== 'super_admin') {
      return res.status(403).json({ error: 'Super admin privileges required' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role: 'admin' },
      { new: true }
    );

    // Update Firebase custom claims
    await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};