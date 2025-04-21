// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true
  },
  picture: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to find or create user from Firebase auth data
userSchema.statics.findOrCreate = async function(firebaseUser) {
  let user = await this.findOne({ uid: firebaseUser.uid });
  
  if (!user) {
    user = new this({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.name || '',
      picture: firebaseUser.picture || '',
      role: firebaseUser.email === 'admin@example.com' ? 'admin' : 'user' // Replace with your admin email
    });
    await user.save();
  } else {
    // Update user data if needed
    user.lastLogin = Date.now();
    if (firebaseUser.name && user.name !== firebaseUser.name) {
      user.name = firebaseUser.name;
    }
    if (firebaseUser.picture && user.picture !== firebaseUser.picture) {
      user.picture = firebaseUser.picture;
    }
    await user.save();
  }
  
  return user;
};

module.exports = mongoose.model('User', userSchema);