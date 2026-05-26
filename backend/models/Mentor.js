const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  specialty: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  image: { type: String, required: true },
  available: { type: String, required: true },
  sessionPrice: { type: String, required: true },
  description: { type: String, required: true },
  sessionOverview: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mentor', mentorSchema);
