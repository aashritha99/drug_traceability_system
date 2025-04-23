const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Admin privileges required',
        code: 'ADMIN_ACCESS_DENIED'
      });
    }
    
    req.user.role = user.role; // Attach role to request
    next();
  } catch (err) {
    res.status(500).json({ error: 'Authorization check failed' });
  }
};