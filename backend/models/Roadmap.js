const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  salary: { type: Number, required: true },
  familyMembers: { type: Number, required: true },
  savings: { type: Number, required: true },
  expenses: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
