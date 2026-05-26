const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  salary: { type: Number, default: 0 },
  familyMembers: { type: Number, default: 1 },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  canEditFinancials: { type: Boolean, default: true },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  badges: { type: Number, default: 0 },
  notifications: [
    {
      title: String,
      message: String,
      type: { type: String, enum: ['info', 'success', 'warning', 'error'], default: 'info' },
      isRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
