# FinCash

FinCash - Empowering your financial future.

## Description
FinCash is a comprehensive financial wellness platform designed to bridge the gap between financial awareness and action. It provides users with personalized financial roadmaps, AI-driven investment advice, and a gamified learning experience to make financial planning accessible and engaging. Whether you are a student, a young professional, or a family, FinCash helps you optimize your savings, understand market trends, and build a secure financial future.

## Tech Stack

### Frontend
- **Framework**: React (Vite)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT & Bcrypt
- **Payments**: Razorpay Integration

### AI Backend
- **Framework**: FastAPI (Python)
- **AI Model**: Google Gemini Pro (via Generative AI SDK)
- **Purpose**: Personalized financial advice and evaluation based on user activity and goals.

## Folder Structure
```text
FinCash/
├── ai_backend/           # Python-based AI services (FastAPI + Gemini)
├── backend/              # Node.js Express server and Mongoose models
│   ├── data/             # Seeding data
│   ├── models/           # Mongoose schemas
│   └── server.js         # Main server entry point
├── public/               # Static assets (images, videos)
├── src/                  # React frontend source code
│   ├── api/              # API service layer
│   ├── components/       # Reusable UI components
│   ├── modules/          # Feature-based dashboard modules
│   │   ├── AdminDashboard/
│   │   ├── Auth/
│   │   ├── EmployeeDashboard/
│   │   └── UserDashboard/
│   ├── store/            # Redux state management
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Entry point
├── index.html            # Entry HTML file
├── package.json          # Root dependencies and scripts
└── tailwind.config.js    # Styling configuration
```

## Detailed Explanation

### Features
- **Personalized Financial Roadmap**: Inputs like salary, family size, and expenses generate a custom financial path with AI-driven advice.
- **AI Consultation**: Integrated AI advisor (powered by Gemini) provides real-time evaluations and investment suggestions based on your learning progress.
- **Gamified Learning Paths**: Interactive lessons on saving, investing, and taxes with progress tracking, XP, streaks, and badges.
- **Real-time Market Insights**: Simulated market data for stocks and insurance policies to keep you informed about current trends.
- **Mentor System**: Book sessions with financial experts for 1-on-1 guidance, with secure payment processing via Razorpay.
- **Educational Content**: A curated library of videos and quizzes covering fundamental to advanced financial topics.
- **Multi-Role Dashboards**: Specialized interfaces for Users, Employees, and Admins to manage profiles, educational content, and user permissions.

### How it Works
1. **Onboarding**: Users sign up and provide basic financial details.
2. **Personalization**: The system calculates a personalized roadmap and AI-driven suggestions.
3. **Engagement**: Users complete learning paths, watch videos, and take quizzes to earn XP and badges.
4. **Actionable Advice**: Based on their profile and progress, users receive specific investment and insurance recommendations.
5. **Expert Guidance**: Users can book sessions with professional mentors for deeper financial strategies.

### Advantages
- **Empowerment**: Demystifies complex financial concepts through easy-to-follow learning paths.
- **Engagement**: Gamification elements keep users motivated and consistent in their financial journey.
- **Actionability**: Moves beyond theory by providing personalized, data-driven advice that users can act upon.
- **Security**: Robust authentication and secure payment integration ensure a safe environment for managing financial information.
