const mongoose = require('mongoose');
require('dotenv').config();

const MentorSchema = new mongoose.Schema({
    name: String,
    role: String,
    specialty: String,
    rating: Number,
    reviews: Number,
    image: String,
    available: String,
    sessionPrice: String,
    description: String,
    sessionOverview: String
});

const Mentor = mongoose.model('Mentor', MentorSchema);

async function clearMentors() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB Atlas');
        
        await Mentor.deleteMany({});
        console.log('Cleared existing mentors');
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

clearMentors();
