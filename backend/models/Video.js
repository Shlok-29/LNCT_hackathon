const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  views: { type: String, required: true },
  thumbnail: { type: String, required: true },
  videoUrl: { type: String, required: true },
  category: { type: String, required: true },
  quiz: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correct: { type: Number, required: true },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', videoSchema);
