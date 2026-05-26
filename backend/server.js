const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const Roadmap = require('./models/Roadmap');
const Mentor = require('./models/Mentor');
const Video = require('./models/Video');
const LearningPath = require('./models/LearningPath');
const UserLearningPath = require('./models/UserLearningPath');

const PersonalizedDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stockAnalysis: [{
        symbol: String,
        name: String,
        recommendation: String, // Buy, Sell, Hold
        analysis: String,
        score: Number, // 0-100
        potential: String // +15%, etc.
    }],
    simulations: [{
        title: String,
        description: String,
        goal: String,
        duration: String,
        complexity: String // Easy, Medium, Hard
    }],
    insuranceRecommendations: {
        health: [{
            company: String,
            plan: String,
            cover: String,
            premium: String,
            rating: Number,
            features: [String]
        }],
        life: [{
            company: String,
            plan: String,
            cover: String,
            premium: String,
            rating: Number,
            features: [String]
        }]
    }
});

const PersonalizedData = mongoose.model('PersonalizedData', PersonalizedDataSchema);

const app = express();
const crypto = require('crypto');

// Forgot Password Request
app.post('/api/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        // In a real app, send email here. For now, we return the token
        console.log(`Password reset token for ${email}: ${resetToken}`);
        res.json({ message: 'Reset token generated (checked server console)', token: resetToken });
    } catch (error) {
        res.status(500).json({ message: 'Error in forgot password' });
    }
});

// Reset Password
app.post('/api/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password' });
    }
});

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'fincash_secret_key';
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
    origin: ['https://fincash123.netlify.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Razorpay Integration
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

app.post('/api/payment/create-order', async (req, res) => {
    try {
        const { amount } = req.body;
        const parsedAmount = typeof amount === 'string' ? parseInt(amount.replace(/[^0-9.-]+/g,"")) : amount;
        
        const options = {
            amount: parsedAmount * 100, // paise
            currency: "INR",
            receipt: "receipt_order_" + Date.now()
        };
        
        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ success: false, message: 'Server error creating order' });
    }
});

app.post('/api/payment/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder')
                                        .update(razorpay_order_id + "|" + razorpay_payment_id)
                                        .digest('hex');
                                        
        if (expectedSignature === razorpay_signature) {
            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('Error verifying Razorpay payment:', error);
        res.status(500).json({ success: false, message: 'Server error verifying payment' });
    }
});

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(async () => {
      console.log('Connected to MongoDB');
      // Seed Admin User
      const adminExists = await User.findOne({ email: 'admin@fincash.com' });
      if (!adminExists) {
          const hashedAdminPassword = await bcrypt.hash('admin123', 10);
          await User.create({
              name: 'Admin',
              email: 'admin@fincash.com',
              password: hashedAdminPassword,
              role: 'admin',
              notifications: [
                  { title: "Welcome to FinCash!", message: "We're glad to have you here. Start by setting up your financial profile.", type: "info" },
                  { title: "Security Alert", message: "Make sure to enable two-factor authentication for better security.", type: "warning" }
              ]
          });
          console.log('Admin user seeded: admin@fincash.com / admin123');
      }

      // Seed Mentors
      const mentorsCount = await Mentor.countDocuments();
      if (mentorsCount === 0) {
          const mentorsData = [
              {
                  name: "Rajesh Kumar",
                  role: "Senior Investment Strategist",
                  specialty: "Indian Stock Market & Mutual Funds",
                  rating: 4.9,
                  reviews: 156,
                  available: "Mon - Wed",
                  sessionPrice: "₹799",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
                  description: "With over 15 years in the Indian financial sector, Rajesh specializes in long-term wealth creation through equity and debt instruments.",
                  sessionOverview: "A deep dive into your current portfolio with a focus on diversifying across Indian market sectors for optimal returns."
              },
              {
                  name: "Priya Sharma",
                  role: "Personal Finance Consultant",
                  specialty: "Tax Planning & Retirement",
                  rating: 4.8,
                  reviews: 89,
                  available: "Tue - Fri",
                  sessionPrice: "₹699",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
                  description: "Priya helps young professionals navigate the complexities of 80C, 80D, and NPS to maximize their take-home salary while building a retirement nest egg.",
                  sessionOverview: "Personalized tax-saving roadmap and a step-by-step guide to starting your retirement fund early."
              },
              {
                  name: "Sarah Jenkins",
                  role: "Certified Financial Planner (CFP)",
                  specialty: "Debt Management & Savings",
                  rating: 4.9,
                  reviews: 128,
                  available: "Mon - Fri",
                  sessionPrice: "₹599",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
                  description: "Sarah has helped thousands of families get out of debt and build sustainable spending habits through her 'Freedom Framework'.",
                  sessionOverview: "A comprehensive look at your monthly cash flow, identifying 'leakage' and creating a high-velocity debt payoff plan."
              },
              {
                  name: "Ananya Iyer",
                  role: "Wealth Psychology Coach",
                  specialty: "Behavioral Finance",
                  rating: 4.7,
                  reviews: 42,
                  available: "Wed - Sat",
                  sessionPrice: "₹499",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
                  description: "Ananya focuses on the 'why' behind your spending. She combines psychology with finance to help you break toxic money cycles.",
                  sessionOverview: "Interactive session to identify your money personality and set emotional boundaries with your wallet."
              },
              {
                  name: "Vikram Singh",
                  role: "Portfolio Manager",
                  specialty: "Global Markets & Real Estate",
                  rating: 4.9,
                  reviews: 74,
                  available: "Mon - Thu",
                  sessionPrice: "₹749",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
                  description: "Vikram specializes in HNI portfolio management and alternative investments like REITs and fractional real estate.",
                  sessionOverview: "Strategic discussion on asset allocation and exploring high-yield alternative investment opportunities."
              }
          ];
          await Mentor.insertMany(mentorsData);
          console.log('Mentors seeded');
      }

      // Seed Videos
      const videosCount = await Video.countDocuments();
      if (videosCount === 0) {
          const videosData = [
              {
                  title: "GST 2024 Fundamentals - What is GST",
                  duration: "52:14",
                  views: "1.5M",
                  thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
                  videoUrl: "/gst_fundamentals_2024.mp4",
                  category: "Taxation",
                  quiz: [
                      { question: "What does GST stand for?", options: ["Goods and Sales Tax", "General Service Tax", "Goods and Services Tax", "Global Standard Tax"], correct: 2 },
                      { question: "When was GST implemented in India?", options: ["1st July 2017", "1st April 2017", "1st Jan 2018", "15th Aug 2016"], correct: 0 }
                  ]
              },
              {
                  title: "Learn Trading from Zero - Full Course",
                  duration: "90:00",
                  views: "1.2M",
                  thumbnail: "https://images.unsplash.com/photo-1611974714024-463ef9c71659",
                  videoUrl: "/trading_course.mp4",
                  category: "Masterclass",
                  quiz: [
                      { question: "What is a 'Bull Market'?", options: ["Market falling", "Market rising", "No movement", "Market closed"], correct: 1 },
                      { question: "What does 'Liquidity' refer to?", options: ["Company cash", "Ease of buying/selling", "Stock color", "Market volume"], correct: 1 }
                  ]
              }
          ];
          await Video.insertMany(videosData);
          console.log('Videos seeded');
      }

      // Seed Learning Paths
      const pathsCount = await LearningPath.countDocuments();
      if (pathsCount === 0) {
          const pathsData = [
              {
                  title: "Saving Basics",
                  description: "Build your first emergency fund",
                  progress: 75,
                  icon: "ShieldCheck",
                  color: "from-emerald-500/20 to-emerald-500/5",
                  borderColor: "border-emerald-500/20"
              },
              {
                  title: "Financial Discipline",
                  description: "Master the 50/30/20 rule",
                  progress: 30,
                  icon: "Target",
                  color: "from-blue-500/20 to-blue-500/5",
                  borderColor: "border-blue-500/20"
              },
              {
                  title: "Intro to Investing",
                  description: "Understand compound interest",
                  progress: 0,
                  icon: "TrendingUp",
                  color: "from-purple-500/20 to-purple-500/5",
                  borderColor: "border-purple-500/20"
              }
          ];
          await LearningPath.insertMany(pathsData);
          console.log('Learning Paths seeded');
      }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Admin Auth Middleware
const authenticateAdmin = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    });
};

// Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, SECRET_KEY, { expiresIn: '24h' });
        res.status(201).json({ 
            token, 
            user: { 
                id: newUser._id, 
                name: newUser.name, 
                email: newUser.email,
                role: newUser.role,
                salary: newUser.salary,
                familyMembers: newUser.familyMembers,
                canEditFinancials: newUser.canEditFinancials,
                xp: newUser.xp,
                streak: newUser.streak,
                badges: newUser.badges
            } 
        });

        // Initialize Learning Paths for new user
        const allPaths = await LearningPath.find();
        const userPaths = allPaths.map(path => ({
            userId: newUser._id,
            pathId: path._id,
            progress: 0,
            status: 'not_started'
        }));
        await UserLearningPath.insertMany(userPaths);

        // Generate personalized data for new user
        await PersonalizedData.create({
            userId: newUser._id,
            stockAnalysis: [
                {
                    symbol: "RELIANCE",
                    name: "Reliance Industries",
                    recommendation: "Buy",
                    analysis: "Strong growth in retail and telecom sectors makes this a defensive yet growth-oriented pick for your profile.",
                    score: 85,
                    potential: "+12%"
                },
                {
                    symbol: "HDFCBANK",
                    name: "HDFC Bank",
                    recommendation: "Hold",
                    analysis: "Market leader with steady margins. Perfect for long-term stability in your personalized portfolio.",
                    score: 72,
                    potential: "+8%"
                }
            ],
            simulations: [
                {
                    title: "The Emergency Fund Run",
                    description: "Can you survive a sudden car repair and medical bill with just your current savings?",
                    goal: "Reach ₹50,000 liquid cash",
                    duration: "3 Virtual Months",
                    complexity: "Easy"
                },
                {
                    title: "Market Crash 2024",
                    description: "The market just dipped 15%. How do you rebalance your portfolio to capitalize on the recovery?",
                    goal: "Minimize losses to <5%",
                    duration: "6 Virtual Months",
                    complexity: "Hard"
                }
            ]
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during signup' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
        // Ensure personalized data exists
        let personalized = await PersonalizedData.findOne({ userId: user._id });
        if (!personalized) {
            personalized = await PersonalizedData.create({
                userId: user._id,
                stockAnalysis: [
                    { symbol: "RELIANCE", name: "Reliance Industries", recommendation: "Buy", analysis: "Strong growth in retail and telecom sectors.", score: 85, potential: "+12%" },
                    { symbol: "HDFCBANK", name: "HDFC Bank", recommendation: "Hold", analysis: "Market leader with steady margins.", score: 72, potential: "+8%" }
                ],
                simulations: [
                    { title: "The Emergency Fund Run", description: "Can you survive a sudden car repair?", goal: "Reach ₹50,000 liquid cash", duration: "3 Virtual Months", complexity: "Easy" },
                    { title: "Market Crash 2024", description: "The market just dipped 15%.", goal: "Minimize losses to <5%", duration: "6 Virtual Months", complexity: "Hard" }
                ],
                insuranceRecommendations: {
                    health: [
                        { company: "Star Health", plan: "Family Health Optima", cover: "₹10 Lakh", premium: "₹1,200/mo", rating: 4.8, features: ["Cashless Hospitalization", "No Claim Bonus"] },
                        { company: "Niva Bupa", plan: "ReAssure Pro", cover: "₹15 Lakh", premium: "₹1,500/mo", rating: 4.7, features: ["Unlimited Reinstatement", "Global Cover"] },
                        { company: "Care Health", plan: "Care Supreme", cover: "₹25 Lakh", premium: "₹1,800/mo", rating: 4.6, features: ["AYUSH Coverage", "Daily Cash"] },
                        { company: "HDFC ERGO", plan: "Optima Secure", cover: "₹10 Lakh", premium: "₹1,400/mo", rating: 4.9, features: ["4x Coverage", "Secure Benefit"] },
                        { company: "ICICI Lombard", plan: "Health Elite", cover: "₹20 Lakh", premium: "₹1,650/mo", rating: 4.7, features: ["Wellness Rewards", "OPD Cover"] },
                        { company: "Aditya Birla", plan: "Activ Health Platinum", cover: "₹10 Lakh", premium: "₹1,100/mo", rating: 4.5, features: ["100% HealthReturns", "Chronic Management"] }
                    ],
                    life: [
                        { company: "HDFC Life", plan: "Click 2 Protect Super", cover: "₹1 Crore", premium: "₹800/mo", rating: 4.9, features: ["Return of Premium", "Critical Illness Rider"] },
                        { company: "ICICI Pru", plan: "iProtect Smart", cover: "₹1.5 Crore", premium: "₹1,000/mo", rating: 4.8, features: ["Accidental Death Cover", "Terminal Illness"] },
                        { company: "Max Life", plan: "Smart Secure Plus", cover: "₹1 Crore", premium: "₹750/mo", rating: 4.7, features: ["Increasing Cover", "Premium Break"] },
                        { company: "Tata AIA", plan: "Sampoorna Raksha", cover: "₹2 Crore", premium: "₹1,200/mo", rating: 4.8, features: ["Life Stage Benefit", "Flexible Payouts"] },
                        { company: "LIC", plan: "Tech Term", cover: "₹1 Crore", premium: "₹900/mo", rating: 4.6, features: ["Trust of LIC", "Low Cost Online Plan"] }
                    ]
                }
            });
        }

        res.json({ 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                role: user.role,
                salary: user.salary,
                familyMembers: user.familyMembers,
                canEditFinancials: user.canEditFinancials,
                xp: user.xp,
                streak: user.streak,
                badges: user.badges,
                personalized: personalized
            } 
        });

        // Ensure user has learning paths initialized (for existing users)
        const userPathsCount = await UserLearningPath.countDocuments({ userId: user._id });
        if (userPathsCount === 0) {
            const allPaths = await LearningPath.find();
            const userPaths = allPaths.map(path => ({
                userId: user._id,
                pathId: path._id,
                progress: 0,
                status: 'not_started'
            }));
            await UserLearningPath.insertMany(userPaths);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Roadmap Routes
// Get User Profile
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const personalized = await PersonalizedData.findOne({ userId: user._id });
        res.json({
            ...user._doc,
            personalized: personalized
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

app.post('/api/roadmap', authenticateToken, async (req, res) => {
    try {
        const { salary, familyMembers, savings, expenses } = req.body;
        
        // Update User Profile and LOCK editing
        await User.findByIdAndUpdate(req.user.id, { 
            salary, 
            familyMembers,
            canEditFinancials: false // Lock after fill
        });

        // Add a notification for completing roadmap
        await User.findByIdAndUpdate(req.user.id, {
            $push: {
                notifications: {
                    title: "Roadmap Generated",
                    message: "Your personalized financial roadmap has been generated successfully!",
                    type: "success"
                }
            },
            $inc: { xp: 50 } // Reward 50 XP
        });

        const newRoadmap = new Roadmap({
            userId: req.user.id,
            salary,
            familyMembers,
            savings,
            expenses
        });
        await newRoadmap.save();

        // AI Advice Generator (Logic-based AI)
        const aiAdvice = generateAIAdvice(salary, familyMembers, savings);

        res.status(201).json({ ...newRoadmap._doc, aiAdvice });
    } catch (error) {
        res.status(500).json({ message: 'Error saving roadmap' });
    }
});

const generateAIAdvice = (salary, familyMembers, savings) => {
    const advice = [];
    const monthlyExpenses = salary - savings;
    const perPersonExpense = monthlyExpenses / (familyMembers || 1);
    
    // ML-Style Decision Tree / Heuristics
    // Tier 1: Emergency & Security
    if (savings < (monthlyExpenses * 3)) {
        const gap = (monthlyExpenses * 3) - savings;
        advice.push(`🚨 CRITICAL: Your emergency fund is low. Target ₹${gap.toLocaleString()} additional savings to cover 3 months of expenses.`);
    } else {
        advice.push("✅ SECURITY: You have a healthy 3-month buffer. Transitioning to 'Wealth Acceleration' mode.");
    }

    // Tier 2: Life Stage Optimization
    if (familyMembers >= 4) {
        advice.push("👨‍👩‍👧‍👦 FAMILY PATH: High dependency ratio detected. Recommendation: 20-year Term Insurance + Comprehensive Family Floater Health Plan.");
    } else if (familyMembers === 1 && salary > 60000) {
        advice.push("🚀 SOLO GROWTH: High disposable income potential. Recommendation: Maximize ELSS (Tax Saving) and start a 'High-Risk/High-Reward' Crypto or Small-cap Equity bucket (5% allocation).");
    }

    // Tier 3: Future Projections (Predictive ML)
    const annualSavings = savings * 12;
    const fiveYearProjection = annualSavings * 5 * 1.12; // Assuming 12% CAGR
    advice.push(`📈 PROJECTION: At current rates with 12% market growth, you will accumulate ₹${Math.round(fiveYearProjection).toLocaleString()} in 5 years.`);

    // Tier 4: Expense Management
    if (perPersonExpense > 15000) {
        advice.push("⚠️ EFFICIENCY: Your per-member spending is above average (₹" + Math.round(perPersonExpense).toLocaleString() + "). Potential for 10% optimization in lifestyle expenses.");
    }

    return advice;
};

// Admin Route: Toggle Edit Permissions
app.patch('/api/admin/toggle-edit/:userId', authenticateAdmin, async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.userId);
        if (!targetUser) return res.status(404).json({ message: 'User not found' });
        
        targetUser.canEditFinancials = !targetUser.canEditFinancials;
        await targetUser.save();
        
        res.json({ message: `Edit permission ${targetUser.canEditFinancials ? 'enabled' : 'disabled'}`, canEditFinancials: targetUser.canEditFinancials });
    } catch (error) {
        res.status(500).json({ message: 'Error toggling permission' });
    }
});

// Admin Route: Get All Users
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

app.get('/api/roadmap', authenticateToken, async (req, res) => {
    try {
        const roadmap = await Roadmap.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
        if (roadmap) {
            const aiAdvice = generateAIAdvice(roadmap.salary, roadmap.familyMembers, roadmap.savings);
            res.json({ ...roadmap._doc, aiAdvice });
        } else {
            res.status(404).json({ message: 'No roadmap found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roadmap' });
    }
});

// Real-time Market Data Simulation Endpoint
app.get('/api/market-data', async (req, res) => {
    try {
        const randomize = (base, range) => (base + (Math.random() * range - range / 2)).toFixed(2);
        const randomTrend = () => Math.random() > 0.5 ? 'up' : 'down';
        const randomChange = () => (Math.random() * 3).toFixed(2) + '%';

        const stocks = [
            { name: "Reliance Ind.", ticker: "RELIANCE", price: `₹${randomize(2945, 50)}`, change: `+${randomChange()}`, signal: "BUY", color: "emerald", trend: "up" },
            { name: "HDFC Bank", ticker: "HDFCBANK", price: `₹${randomize(1532, 20)}`, change: `-${randomChange()}`, signal: "HOLD", color: "amber", trend: "down" },
            { name: "TCS Ltd.", ticker: "TCS", price: `₹${randomize(3840, 60)}`, change: `+${randomChange()}`, signal: "BUY", color: "emerald", trend: "up" },
            { name: "Infosys", ticker: "INFY", price: `₹${randomize(1420, 30)}`, change: `-${randomChange()}`, signal: "SELL", color: "rose", trend: "down" },
            { name: "Adani Ent.", ticker: "ADANIENT", price: `₹${randomize(3120, 100)}`, change: `+${randomChange()}`, signal: "STRONG BUY", color: "indigo", trend: "up" },
        ];

        const insurancePolicies = [
            { company: "HDFC Life", plan: "Term Life (Live Offer)", cover: "₹1 Crore", premium: `₹${Math.floor(800 + Math.random() * 100)}/mo`, rating: (4.5 + Math.random() * 0.5).toFixed(1), features: ["Limited Time Discount", "Online Offer"] },
            { company: "ICICI Pru", plan: "Health Care (Real-Time)", cover: "₹10 Lakh", premium: `₹${Math.floor(1100 + Math.random() * 200)}/mo`, rating: (4.4 + Math.random() * 0.6).toFixed(1), features: ["No Claim Bonus", "Instant Approval"] },
            { company: "LIC", plan: "Endowment (Flash Sale)", cover: "₹50 Lakh", premium: `₹${Math.floor(2000 + Math.random() * 300)}/mo`, rating: (4.2 + Math.random() * 0.8).toFixed(1), features: ["Tax Savings", "Guaranteed Return"] },
            { company: "Star Health", plan: "Family Optima (Live)", cover: "₹15 Lakh", premium: `₹${Math.floor(1500 + Math.random() * 250)}/mo`, rating: (4.6 + Math.random() * 0.4).toFixed(1), features: ["Maternity Cover included", "Discounted Premium"] }
        ];

        res.json({
            stocks,
            insurancePolicies,
            marketSentiment: Math.random() > 0.7 ? "BULLISH" : Math.random() > 0.4 ? "NEUTRAL" : "BEARISH",
            buyStrength: Math.floor(60 + Math.random() * 30)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching market data' });
    }
});

// New Endpoints
app.get('/api/mentors', async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching mentors' });
    }
});

app.get('/api/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos' });
    }
});

app.get('/api/learning-paths', async (req, res) => {
    try {
        const paths = await LearningPath.find();
        res.json(paths);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching learning paths' });
    }
});

app.get('/api/user-stats', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('xp streak badges');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user stats' });
    }
});

app.get('/api/notifications', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('notifications');
        const notifications = user.notifications || [];
        res.json(notifications.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: 'Error fetching notifications' });
    }
});

app.patch('/api/notifications/:id/read', authenticateToken, async (req, res) => {
    try {
        await User.updateOne(
            { _id: req.user.id, "notifications._id": req.params.id },
            { $set: { "notifications.$.isRead": true } }
        );
        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification' });
    }
});

app.get('/api/user-learning-paths', authenticateToken, async (req, res) => {
    try {
        const userPaths = await UserLearningPath.find({ userId: req.user.id }).populate('pathId');
        const flattened = userPaths
            .filter(up => up.pathId) // Filter out any deleted paths
            .map(up => ({
                ...up.pathId._doc,
                progress: up.progress,
                status: up.status,
                pathId: up.pathId._id
            }));
        res.json(flattened);
    } catch (error) {
        console.error("Error fetching user learning paths:", error);
        res.status(500).json({ message: 'Error fetching user learning paths' });
    }
});

app.patch('/api/user-learning-paths/:pathId/progress', authenticateToken, async (req, res) => {
    try {
        const { progress } = req.body;
        const status = progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : 'not_started';
        
        await UserLearningPath.updateOne(
            { userId: req.user.id, pathId: req.params.pathId },
            { $set: { progress, status, updatedAt: Date.now() } }
        );

        if (progress === 100) {
            await User.findByIdAndUpdate(req.user.id, {
                $inc: { xp: 100 },
                $push: {
                    notifications: {
                        title: "Path Completed! 🏆",
                        message: `Congratulations! You've completed a learning path and earned 100 XP.`,
                        type: "success"
                    }
                }
            });
        }

        res.json({ message: 'Progress updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating progress' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
