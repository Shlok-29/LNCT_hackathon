const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  progress: { type: Number, default: 0 },
  icon: { type: String, required: true }, // Store name of Lucide icon
  color: { type: String, required: true },
  borderColor: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LearningPath', learningPathSchema);
