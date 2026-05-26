const mongoose = require('mongoose');

const userLearningPathSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pathId: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningPath', required: true },
  progress: { type: Number, default: 0 },
  status: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserLearningPath', userLearningPathSchema);
