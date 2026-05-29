import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Star, Calendar, Clock, CheckCircle2, 
  ChevronRight, Filter, Play, Sparkles, X, 
  CreditCard, Smartphone, Landmark, ShieldCheck,
  AlertCircle, BrainCircuit, ArrowLeft
} from 'lucide-react';
import axios from 'axios';
import MentorVideoPlayer from '../../../components/MentorVideoPlayer';
import AssessmentFlow from '../../../components/AssessmentFlow';

const HumanMentors = ({ mode = 'all' }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [aiVideos, setAiVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const mentorsRes = await axios.get('http://localhost:5000/api/mentors');
        setMentors([
          {
            id: 1,
            name: "Nithin Kamath",
            role: "Founder & CEO, Zerodha",
            specialty: "Stock Market & Entrepreneurship",
            rating: 5.0,
            reviews: "2.4K",
            available: "Consultation Request",
            sessionPrice: "₹10,000",
            image: "https://tse1.mm.bing.net/th?q=nithin+kamath+zerodha+headshot",
            linkedinUrl: "https://www.linkedin.com/in/nithinkamath/",
            description: "Nithin Kamath is an Indian entrepreneur and stockbroker. He co-founded Zerodha, India's largest retail brokerage firm. He focuses heavily on disrupting traditional financial models and advocating for trading discipline.",
            sessionOverview: "Detailed guidance on bootstrapping startups and building a disciplined approach towards stock market investments."
          },
          {
            id: 2,
            name: "CA Rachana Ranade",
            role: "Chartered Accountant & Finance Educator",
            specialty: "Taxation & Fundamental Analysis",
            rating: 4.9,
            reviews: "5.1K",
            available: "Weekends",
            sessionPrice: "₹5,000",
            image: "https://tse2.mm.bing.net/th?q=ca+rachana+ranade+headshot",
            linkedinUrl: "https://www.linkedin.com/in/rachanaranade/",
            description: "A prominent Chartered Accountant and educator with millions of followers. She simplifies complex taxation, GST, and stock market concepts to make financial literacy accessible to everyone.",
            sessionOverview: "A masterclass on optimizing your personal taxes and performing fundamental analysis for long-term investments."
          },
          {
            id: 3,
            name: "Ankur Warikoo",
            role: "Entrepreneur & Investor",
            specialty: "Business & Personal Finance",
            rating: 4.8,
            reviews: "3.2K",
            available: "Mon-Wed",
            sessionPrice: "₹8,000",
            image: "https://tse3.mm.bing.net/th?q=ankur+warikoo+headshot",
            linkedinUrl: "https://www.linkedin.com/in/warikoo/",
            description: "Former CEO of nearbuy.com and an influential content creator. Ankur shares tactical advice on building startups, managing time, and achieving financial independence through smart investments.",
            sessionOverview: "Actionable strategies on building a personal brand, navigating career transitions, and managing personal investments."
          },
          {
            id: 4,
            name: "Sharan Hegde",
            role: "Founder at The 1% Club",
            specialty: "Personal Finance & Wealth Creation",
            rating: 4.9,
            reviews: "1.8K",
            available: "Thu-Sat",
            sessionPrice: "₹4,000",
            image: "https://tse4.mm.bing.net/th?q=sharan+hegde+headshot",
            linkedinUrl: "https://www.linkedin.com/in/sharanhegde95/",
            description: "Sharan is a leading personal finance expert who educates young professionals on money management, investment hacks, and developing a long-term wealth mindset.",
            sessionOverview: "Review of your personal finance framework focusing on the 1% club strategies for aggressive wealth creation."
          },
          {
            id: 5,
            name: "Balaji Srinivasan",
            role: "Angel Investor & Crypto Expert",
            specialty: "Cryptocurrency & Web3",
            rating: 4.9,
            reviews: "800",
            available: "By Appointment",
            sessionPrice: "$500",
            image: "https://tse1.mm.bing.net/th?q=balaji+srinivasan+headshot",
            linkedinUrl: "https://www.linkedin.com/in/balajisrinivasan/",
            description: "Former CTO of Coinbase and General Partner at a16z. Balaji is a visionary in the crypto space, authoring 'The Network State' and advising highly disruptive Web3 startups.",
            sessionOverview: "Deep dive into web3 macro trends, decentralized systems, and startup advising in the crypto ecosystem."
          },
          {
            id: 6,
            name: "Ishita Sharma",
            role: "CA Finalist & Junior Audit Associate",
            specialty: "Indirect Taxation & GST Compliance",
            rating: 4.8,
            reviews: "120",
            available: "Mon, Wed, Fri",
            sessionPrice: "₹1,499",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
            description: "A top-ranking CA finalist who simplifies the complexities of GST and tax filing for young freelancers and small businesses.",
            sessionOverview: "Personalized session on managing your GST filings and optimizing indirect tax for your business or freelance work."
          },
          {
            id: 7,
            name: "Aditya Verma",
            role: "Quantitative Trader & Fintech Enthusiast",
            specialty: "Scalping Strategies & Technical Analysis",
            rating: 4.9,
            reviews: "250",
            available: "Weekdays",
            sessionPrice: "₹999",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
            description: "A 21-year-old trading prodigy who has built a successful portfolio using data-driven scalping techniques.",
            sessionOverview: "Live trading session focusing on scalping strategies and market entry/exit timing for beginners."
          },
          {
            id: 8,
            name: "Rohan Mehta",
            role: "CFA Level 2 Candidate",
            specialty: "Portfolio Rebalancing & Equity Research",
            rating: 4.7,
            reviews: "85",
            available: "Sat-Sun",
            sessionPrice: "₹1,299",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
            description: "Passionate about value investing, Rohan helps beginners understand how to read balance sheets and build long-term wealth.",
            sessionOverview: "Deep dive into equity research and how to build a diversified portfolio that beats the market."
          },
          {
            id: 9,
            name: "Sneha Kapoor",
            role: "Young Investor & Content Creator",
            specialty: "Gen-Z Financial Planning & Budgeting",
            rating: 4.9,
            reviews: "430",
            available: "Daily Evening",
            sessionPrice: "₹799",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
            description: "Sneha focuses on teaching financial discipline and the power of compounding to students and early-career professionals.",
            sessionOverview: "Interactive budgeting session to help you save your first ₹1 Lakh and start your investment journey early."
          }
        ]);
        setAiVideos([
          {
            title: "Learn Trading from Zero in 90 Minutes: Full Course",
            duration: "90:00",
            views: "0",
            thumbnail: "https://images.unsplash.com/photo-1611974714024-463ef9c71659",
            videoUrl: "/learn_trading.mp4",
            category: "Trading",
            quiz: [
              { question: "What is a 'Bull Market'?", options: ["Market falling", "Market rising", "No movement", "Market closed"], correct: 1 },
              { question: "What does a 'Bear Market' signify?", options: ["Market rising", "Market closed", "Market falling", "Stagnant prices"], correct: 2 },
              { question: "What is a 'Stock'?", options: ["A debt instrument", "A share of ownership in a company", "A bank deposit", "A government bond"], correct: 1 },
              { question: "What does 'Liquidity' refer to in trading?", options: ["Ease of buying/selling an asset", "Company's cash reserves", "The total size of the market", "Water utility stocks"], correct: 0 },
              { question: "What is a 'Dividend'?", options: ["A trading fee", "A loan from a broker", "A tax on profits", "A portion of profits paid to shareholders"], correct: 3 },
              { question: "What is 'Day Trading'?", options: ["Trading once a day", "Holding stocks for years", "Buying and selling securities within the same day", "Trading only during daylight"], correct: 2 },
              { question: "What does 'P/E Ratio' stand for?", options: ["Price-to-Equity Ratio", "Price-to-Earnings Ratio", "Profit-to-Earnings", "Primary-Earnings"], correct: 1 },
              { question: "What is a 'Stop-Loss Order'?", options: ["An order to maximize profits", "An order to sell a security when it reaches a certain price to limit loss", "A command to halt all market trades", "A guarantee against any losses"], correct: 1 },
              { question: "What does 'Market Capitalization' measure?", options: ["Total profits of a company", "Only retail investments", "Total value of a company's outstanding shares", "Corporate debt"], correct: 2 },
              { question: "What is 'Diversification'?", options: ["Putting all money in one stock", "Spreading investments to reduce risk", "Trading only tech stocks", "Following market trends blindly"], correct: 1 },
              { question: "What is an 'ETF'?", options: ["Electronic Trade Facility", "Early Trading Fund", "Exchange Traded Fund", "Equity Transfer Form"], correct: 2 },
              { question: "What does 'Margin' mean in trading?", options: ["The profit made on a trade", "Borrowing money from a broker to buy stock", "The gap between buying and selling price", "A type of tax"], correct: 1 },
              { question: "What is 'Going Long'?", options: ["Holding stocks for retirement", "Buying a stock expecting it to rise", "Shorting a stock", "Trading on margin"], correct: 1 },
              { question: "What does 'Short Selling' mean?", options: ["Selling shares you don't own expecting the price to fall", "Selling stock very quickly", "Selling for a short-term profit", "Only trading small cap stocks"], correct: 0 },
              { question: "What is 'Volatility'?", options: ["The stability of a stock", "Rate at which the price of an asset moves up and down", "The trading volume", "A stock that doesn't move"], correct: 1 },
              { question: "What is a 'Blue Chip' stock?", options: ["A cheap stock", "A tech company stock", "Stock of a large, well-established, financially sound company", "A brand new IPO"], correct: 2 },
              { question: "What is 'Volume' in trading?", options: ["The loudness of the trading floor", "The size of a company", "The number of shares traded during a period", "The amount of profit made"], correct: 2 },
              { question: "What is a 'Limit Order'?", options: ["An order to buy/sell at the current market price", "An order to buy/sell at a specified price or better", "An order that limits your trading for the day", "A restriction on stock quantity"], correct: 1 },
              { question: "What does 'ROI' stand for?", options: ["Rate Of Inflation", "Return On Investment", "Risk Of Investing", "Ratio Of Income"], correct: 1 },
              { question: "What is a 'Portfolio'?", options: ["A folder for stock certificates", "A single stock investment", "A collection of financial investments", "A broker's fee structure"], correct: 2 }
            ]
          },
          {
            title: "Goods and Services Tax (GST) 2024 Fundamentals: Full Course",
            duration: "52:14",
            views: "0",
            thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
            videoUrl: "/gst_course_full.mp4",
            category: "Taxation",
            quiz: [
              { question: "What does GST stand for?", options: ["Goods and Sales Tax", "General Service Tax", "Goods and Services Tax", "Global Standard Tax"], correct: 2 },
              { question: "In which year was GST implemented in India?", options: ["2015", "2016", "2017", "2018"], correct: 2 },
              { question: "Which of the following taxes was replaced by GST?", options: ["Income Tax", "Corporate Tax", "Value Added Tax (VAT)", "Wealth Tax"], correct: 2 },
              { question: "What are the four primary tax slabs under GST?", options: ["5%, 12%, 18%, 28%", "0%, 5%, 10%, 15%", "5%, 10%, 15%, 20%", "8%, 12%, 18%, 24%"], correct: 0 },
              { question: "What does CGST stand for?", options: ["Country Goods and Services Tax", "Central Goods and Services Tax", "Common Goods and Sales Tax", "Corporate Goods Tax"], correct: 1 },
              { question: "What does SGST stand for?", options: ["Standard Goods and Services Tax", "Sales Goods and Services Tax", "State Goods and Services Tax", "Special Goods and Services Tax"], correct: 2 },
              { question: "What does IGST stand for?", options: ["Internal Goods and Services Tax", "Integrated Goods and Services Tax", "International Goods and Services Tax", "Indian Goods and Services Tax"], correct: 1 },
              { question: "Who determines the GST rates in India?", options: ["Prime Minister", "Reserve Bank of India (RBI)", "Finance Minister alone", "GST Council"], correct: 3 },
              { question: "Which of the following is generally exempt from GST?", options: ["Electronics", "Fresh fruits and vegetables", "Automobiles", "Restaurant Services"], correct: 1 },
              { question: "What is the fundamental principle behind GST?", options: ["One Nation, One Tax", "Higher Tax for Rich", "Tax Free Economy", "Multiple State Taxes"], correct: 0 },
              { question: "What is the maximum cap of GST rate prescribed under the GST Act?", options: ["28%", "30%", "35%", "40%"], correct: 3 },
              { question: "What does ITC stand for in GST?", options: ["Internal Tax Credit", "Input Tax Credit", "International Trade Commission", "Indian Tax Code"], correct: 1 },
              { question: "Supply of goods between two different states attracts which tax?", options: ["CGST only", "SGST only", "IGST", "VAT"], correct: 2 },
              { question: "Which entity manages the IT infrastructure of GST in India?", options: ["Reserve Bank of India (RBI)", "Infosys", "Goods and Services Tax Network (GSTN)", "NIC"], correct: 2 },
              { question: "What is a GSTIN?", options: ["GST India Network", "Goods and Services Tax Identification Number", "General Sales Tax Index Number", "Global Standard Tax Identification"], correct: 1 },
              { question: "How many digits/characters make up a GSTIN?", options: ["10", "12", "15", "16"], correct: 2 },
              { question: "What is the interest penalty for delayed GST payment?", options: ["12% per annum", "18% per annum", "24% per annum", "No interest, just a flat fee"], correct: 1 },
              { question: "Can Input Tax Credit (ITC) be claimed on items for personal consumption?", options: ["Yes, fully", "Yes, up to 50%", "No", "Yes, with special permission"], correct: 2 },
              { question: "Which Constitution Amendment Act introduced the GST?", options: ["99th Amendment", "100th Amendment", "101st Amendment", "102nd Amendment"], correct: 2 },
              { question: "What is the current GST status of regular Petrol and Diesel?", options: ["5% slab", "18% slab", "28% slab plus cess", "Outside the purview of GST currently"], correct: 3 }
            ]
          },
          {
            title: "Cryptocurrency Trading Masterclass",
            duration: "60:00",
            views: "0",
            thumbnail: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d",
            videoUrl: "/crypto_trading.mp4",
            category: "Crypto",
            quiz: [
              { question: "What does 'Cryptocurrency' mean?", options: ["A physical coin", "A digital or virtual currency secured by cryptography", "A central bank note", "A form of stock market share"], correct: 1 },
              { question: "What is a 'Blockchain'?", options: ["A chain of physical blocks", "A centralized database", "A distributed public ledger where transactions are recorded", "A new tech company"], correct: 2 },
              { question: "Which was the first decentralized cryptocurrency?", options: ["Ethereum", "Bitcoin", "Dogecoin", "Ripple"], correct: 1 },
              { question: "What does 'HODL' stand for in crypto slang?", options: ["Hold On for Dear Life", "Have Only Digital Life", "Hassle Of Daily Lending", "Heavy On Digital Lending"], correct: 0 },
              { question: "What is an 'Altcoin'?", options: ["An alternative physical coin", "Any cryptocurrency other than Bitcoin", "An altered coin", "A scam coin"], correct: 1 },
              { question: "What is a 'Wallet' in crypto?", options: ["A leather purse", "A bank account", "A digital tool that allows users to store and manage their cryptocurrency", "A file on your desktop"], correct: 2 },
              { question: "What does 'DeFi' stand for?", options: ["Delayed Finance", "Decentralized Finance", "Digital Finance", "Democratized Finance"], correct: 1 },
              { question: "What is 'Mining' in the context of cryptocurrency?", options: ["Digging for gold", "Creating fake coins", "The process of verifying transactions and adding them to the public ledger", "Hacking into accounts"], correct: 2 },
              { question: "What is a 'Smart Contract'?", options: ["A legally binding paper contract", "A contract signed by smart people", "A self-executing contract with the terms directly written into code", "An insurance policy"], correct: 2 },
              { question: "What does 'ICO' stand for?", options: ["International Coin Organization", "Initial Coin Offering", "Internal Crypto Operation", "Interest Control Outline"], correct: 1 },
              { question: "What is 'Fiat' money?", options: ["Fake money", "Cryptocurrency", "Government-issued currency like USD or INR", "Gold bars"], correct: 2 },
              { question: "What does 'Market Cap' mean in cryptocurrency?", options: ["The upper limit of a market", "Total value of all circulating coins", "The biggest coin", "The total number of users"], correct: 1 },
              { question: "What is a 'Whale' in crypto?", options: ["A large aquatic mammal", "An individual or entity holding a massive amount of cryptocurrency", "A new trader", "A crypto exchange"], correct: 1 },
              { question: "What does 'Gas Fee' mean?", options: ["Money to buy petrol", "The cost necessary to perform a transaction on the network", "A tax by the government", "A physical fee"], correct: 1 },
              { question: "What is a 'Hardware Wallet'?", options: ["A wallet made of metal", "A digital wallet on your phone", "A physical device used to store cryptocurrency offline securely", "A paper with codes"], correct: 2 },
              { question: "What is 'Staking'?", options: ["Locking cryptocurrencies to receive rewards and support network security", "Gambling with crypto", "Selling all your crypto", "Buying high and selling low"], correct: 0 },
              { question: "What is 'FOMO'?", options: ["Finding Other Market Opportunities", "Fear Of Missing Out", "Future Of Market Operations", "Flow Of Money Out"], correct: 1 },
              { question: "What does a 'Bull Run' mean in crypto?", options: ["A farm event", "A market crash", "An extended period where prices rise aggressively", "When no trades happen"], correct: 2 },
              { question: "What is an 'Exchange'?", options: ["Trading cards", "A digital marketplace where you can buy and sell cryptocurrencies", "Swapping secrets", "A physical bank branch"], correct: 1 },
              { question: "What is an 'NFT'?", options: ["No Fee Trading", "National Finance Token", "Non-Fungible Token", "New Financial Technology"], correct: 2 }
            ]
          },
          {
            title: "Indian Tax System Explained: All you need to know",
            duration: "25:00",
            views: "0",
            thumbnail: "https://images.unsplash.com/photo-1589232390691-58221683aa3d",
            videoUrl: "/indian_tax_system.mp4",
            category: "Taxation",
            quiz: [
              { question: "Who is responsible for collecting Direct Taxes in India?", options: ["GST Council", "CBDT", "RBI", "SEBI"], correct: 1 },
              { question: "Which tax was replaced by GST in India?", options: ["Income Tax", "Corporate Tax", "Service Tax", "Wealth Tax"], correct: 2 },
              { question: "What is the current standard GST rate for most electronics?", options: ["5%", "12%", "18%", "28%"], correct: 2 },
              { question: "Under which section can you claim deductions for LIC premiums?", options: ["Section 80D", "Section 80C", "Section 80G", "Section 10"], correct: 1 },
              { question: "What does TDS stand for?", options: ["Tax Deducted at Source", "Total Daily Savings", "Tax Deposit Scheme", "Tax Deduction System"], correct: 0 },
              { question: "What is the maximum limit for deduction under Section 80C?", options: ["1 Lakh", "1.5 Lakh", "2 Lakh", "2.5 Lakh"], correct: 1 },
              { question: "Which body governs the GST in India?", options: ["The Parliament", "GST Council", "Finance Ministry", "State Governments"], correct: 1 },
              { question: "What is the income limit for a tax rebate under Section 87A (New Regime)?", options: ["5 Lakh", "6 Lakh", "7 Lakh", "8 Lakh"], correct: 2 },
              { question: "What is Corporate Tax?", options: ["Tax on salaries", "Tax on company profits", "Tax on imports", "Tax on luxury goods"], correct: 1 },
              { question: "Which type of tax is GST?", options: ["Direct Tax", "Indirect Tax", "Progressive Tax", "Wealth Tax"], correct: 1 },
              { question: "What is the full form of PAN?", options: ["Permanent Account Number", "Personal Access Number", "Primary Account Note", "Public Account Network"], correct: 0 },
              { question: "What is the standard deduction for salaried individuals?", options: ["30,000", "40,000", "50,000", "60,000"], correct: 2 },
              { question: "Which tax is levied on the import of goods into India?", options: ["GST", "Excise Duty", "Customs Duty", "Cess"], correct: 2 },
              { question: "What is the portal for filing Income Tax Returns in India?", options: ["GSTN Portal", "e-Filing Portal", "RBI Portal", "NSDL Portal"], correct: 1 },
              { question: "What is Surcharge in Indian tax system?", options: ["A processing fee", "Tax levied on tax-exempt income", "An additional tax on high-income earners", "A fine for late filing"], correct: 2 },
              { question: "What is 'Cess' used for?", options: ["General budget", "Specific purposes like Education and Health", "Repaying state debts", "Import subsidies"], correct: 1 },
              { question: "What is the frequency of filing GST returns for regular taxpayers?", options: ["Weekly", "Monthly/Quarterly", "Half-yearly", "Annually"], correct: 1 },
              { question: "What is a 'Tax Haven'?", options: ["A bank vault", "A country with very low or no taxes", "A legal tax consultancy", "A government savings scheme"], correct: 1 },
              { question: "What is Capital Gains Tax?", options: ["Tax on salary", "Tax on profit from sale of assets", "Tax on bank interest", "Tax on lottery winnings"], correct: 1 },
              { question: "Which year is the 'Assessment Year' if the Financial Year is 2023-24?", options: ["2022-23", "2023-24", "2024-25", "2025-26"], correct: 2 }
            ]
          }
        ]);
      } catch (err) {
        console.error("Error fetching mentors/videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      setIsProcessing(false);
      return;
    }

    try {
      const orderRes = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount: selectedMentor.sessionPrice
      });
      
      if (!orderRes.data.success) {
        alert("Server error creating Razorpay order.");
        setIsProcessing(false);
        return;
      }
      
      const { id: order_id, amount, currency } = orderRes.data.order;

      const options = {
        "key": "rzp_test_placeholder", // Ensure proper replacement in local testing
        "amount": amount.toString(),
        "currency": currency,
        "name": "FinCash Mentorship",
        "description": "Session with " + selectedMentor.name,
        "order_id": order_id,
        "handler": async function (response) {
            setIsProcessing(true);
            try {
                const verifyRes = await axios.post('http://localhost:5000/api/payment/verify', {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                });
                if(verifyRes.data.success) {
                    setIsProcessing(false);
                    setPaymentSuccess(true);
                } else {
                    alert("Payment verification failed");
                    setIsProcessing(false);
                }
            } catch (err) {
                console.error("Verification error", err);
                alert("Payment verification failed");
                setIsProcessing(false);
            }
        },
        "prefill": {
            "name": "FinCash User",
            "email": "user@fincash.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#4F46E5"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response){
          alert("Payment Failed. " + response.error.description);
          setIsProcessing(false);
      });
      
      paymentObject.open();
      setIsProcessing(false);
    } catch (e) {
      console.error("Error heavily:", e);
      alert("Error initiating payment.");
      setIsProcessing(false);
    }
  };

  const closeModals = () => {
    setSelectedMentor(null);
    setShowPayment(false);
    setPaymentSuccess(false);
  };

  return (
    <>
      {/* Modals - Rendered in a Portal to ensure they appear on top of everything (navbar, sidebar) */}
      {createPortal(
        <AnimatePresence>
          {activeVideo && !showAssessment && (
            <MentorVideoPlayer 
              video={activeVideo} 
              onEnded={() => setShowAssessment(true)} 
              onClose={() => setActiveVideo(null)} 
            />
          )}
          {showAssessment && (
            <AssessmentFlow 
              video={activeVideo} 
              onClose={() => {
                setActiveVideo(null);
                setShowAssessment(false);
              }} 
            />
          )}
          
          {/* Booking Modal */}
          {selectedMentor && !showPayment && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-slate-900 border border-white/10 rounded-[3rem] max-w-2xl w-full overflow-hidden shadow-2xl"
              >
                <div className="relative h-48 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 flex items-end">
                  <button 
                    onClick={() => setSelectedMentor(null)}
                    className="absolute top-6 right-6 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white/20 shadow-xl">
                      <img src={selectedMentor.image} alt={selectedMentor.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-white">
                      <h2 className="text-3xl font-black">
                        {selectedMentor.linkedinUrl ? (
                          <a href={selectedMentor.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-indigo-300">
                            {selectedMentor.name}
                          </a>
                        ) : (
                          selectedMentor.name
                        )}
                      </h2>
                      <p className="text-white/80 font-bold">{selectedMentor.role}</p>
                    </div>
                  </div>
                </div>

                <div className="p-10 space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Session Price</p>
                      <p className="text-2xl font-black text-emerald-400">{selectedMentor.sessionPrice}</p>
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Availability</p>
                      <p className="text-2xl font-black text-indigo-400">{selectedMentor.available}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Star className="text-amber-400" size={14} /> About the Mentor
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed font-bold">
                        {selectedMentor.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Sparkles className="text-indigo-400" size={14} /> Session Overview
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed font-bold italic">
                        " {selectedMentor.sessionOverview} "
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex gap-4">
                    <button 
                      onClick={() => setSelectedMentor(null)}
                      className="flex-1 py-4 bg-slate-950 text-gray-400 rounded-2xl font-black text-sm hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setShowPayment(true)}
                      className="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                    >
                      Proceed to Payment <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Payment Modal */}
          {showPayment && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-900 border border-white/10 rounded-[3rem] max-w-md w-full overflow-hidden shadow-2xl relative"
              >
                {isProcessing && (
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-white font-black text-sm uppercase tracking-widest">Processing Secure Payment...</p>
                  </div>
                )}

                {paymentSuccess ? (
                  <div className="p-12 text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 size={40} className="text-emerald-500" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white">Payment Success!</h2>
                      <p className="text-gray-500 font-bold mt-2">Your session with {selectedMentor.name} is confirmed.</p>
                    </div>
                    <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 space-y-2 text-left">
                      <div className="flex justify-between text-xs font-bold"><span className="text-gray-500">Transaction ID:</span> <span className="text-white">#TXN_8293810</span></div>
                      <div className="flex justify-between text-xs font-bold"><span className="text-gray-500">Date:</span> <span className="text-white">{new Date().toLocaleDateString()}</span></div>
                    </div>
                    <button 
                      onClick={closeModals}
                      className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-sm hover:scale-[1.02] transition-all"
                    >
                      Go to My Sessions
                    </button>
                  </div>
                ) : (
                  <div className="p-8 space-y-8">
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => setShowPayment(false)}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-xs font-bold"
                      >
                        <ArrowLeft size={16} /> Back to Details
                      </button>
                      <button onClick={closeModals} className="text-gray-500 hover:text-white"><X size={24} /></button>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Secure Checkout</h3>
                      <p className="text-xs text-gray-500 font-bold mt-1">Payment for {selectedMentor.name}</p>
                    </div>

                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="text-indigo-400" size={24} />
                        <span className="text-sm font-black text-indigo-400 uppercase">Amount to Pay</span>
                      </div>
                      <span className="text-2xl font-black text-white">{selectedMentor.sessionPrice}</span>
                    </div>

                    {/* Payment Tabs */}
                    <div className="flex bg-slate-950 p-1 rounded-xl gap-1">
                      {[
                        { id: 'card', icon: CreditCard, label: 'Card' },
                        { id: 'upi', icon: Smartphone, label: 'UPI' },
                        { id: 'net', icon: Landmark, label: 'Net Banking' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setPaymentMethod(tab.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] font-black uppercase transition-all ${
                            paymentMethod === tab.id ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-white'
                          }`}
                        >
                          <tab.icon size={14} /> {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[160px]">
                      {paymentMethod === 'card' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                          <input type="text" placeholder="Card Number" className="w-full bg-slate-950 border border-white/5 p-4 rounded-xl text-white font-bold text-sm focus:border-indigo-500 outline-none" />
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="MM/YY" className="bg-slate-950 border border-white/5 p-4 rounded-xl text-white font-bold text-sm outline-none" />
                            <input type="password" placeholder="CVV" className="bg-slate-950 border border-white/5 p-4 rounded-xl text-white font-bold text-sm outline-none" />
                          </div>
                        </div>
                      )}
                      {paymentMethod === 'upi' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                          <div className="p-6 bg-slate-950 rounded-2xl border border-white/5 text-center space-y-4">
                            <div className="w-24 h-24 bg-white rounded-xl mx-auto flex items-center justify-center font-black text-black">QR CODE</div>
                            <p className="text-xs text-gray-500 font-bold">Scan with GPay, PhonePe, or Paytm</p>
                          </div>
                          <div className="relative">
                            <input type="text" placeholder="example@upi" className="w-full bg-slate-950 border border-white/5 p-4 rounded-xl text-white font-bold text-sm outline-none" />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-indigo-400 uppercase">Verify</button>
                          </div>
                        </div>
                      )}
                      {paymentMethod === 'net' && (
                        <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2">
                          {['SBI', 'HDFC', 'ICICI', 'Axis', 'KOTAK', 'BOB'].map(bank => (
                            <button key={bank} className="bg-slate-950 border border-white/5 p-4 rounded-xl text-xs font-black text-gray-400 hover:text-white hover:border-indigo-500 transition-all">{bank}</button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={handleProcessPayment}
                      className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                    >
                      Confirm & Pay {selectedMentor.sessionPrice}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-500 uppercase">
                      <ShieldCheck size={12} /> SSL Encrypted Secure Transaction
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 pb-20"
      >

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="text-purple-400" size={32} />
            {mode === 'free' ? 'Free AI Knowledge Base' : mode === 'sessions' ? 'One-to-One Mentorship' : 'Human & AI Mentorship'}
          </h1>
          <p className="text-gray-400 mt-2">
            {mode === 'free' ? 'Learn from high-quality AI-generated finance tutorials.' : 'Book personal sessions with certified experts.'}
          </p>
        </div>
      </div>

      {/* AI Videos Section - Only in 'free' or 'all' mode */}
      {(mode === 'free' || mode === 'all') && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-white">Recommended AI Video Guides</h3>
              <p className="text-sm text-gray-500 font-bold">Watch, learn, and earn certificates.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiVideos.map((video, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-gray-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-indigo-500/30 transition-all shadow-2xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <video 
                    src={video.videoUrl} 
                    poster={video.thumbnail}
                    muted 
                    loop 
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/40 pointer-events-none transition-all" />
                  <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
                    <span className="bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">{video.category}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-xl text-[10px] font-black border border-white/10 pointer-events-none">{video.duration}</div>
                </div>

                <div className="p-8 space-y-4">
                  <h4 className="text-xl font-black text-white leading-tight group-hover:text-indigo-400 transition-colors">{video.title}</h4>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => setActiveVideo(video)}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                    >
                      <Play size={18} fill="currentColor" /> Watch Video
                    </button>
                    <button 
                      onClick={() => {
                        setActiveVideo(video);
                        setShowAssessment(true);
                      }}
                      className="w-full py-4 bg-slate-950 border border-white/5 hover:border-indigo-500/50 text-gray-400 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <BrainCircuit size={16} /> Start Assessment
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Human Mentors Section - Only in 'sessions' or 'all' mode */}
      {(mode === 'sessions' || mode === 'all') && (
        <>
          <h3 className="text-xl font-bold">Certified Financial Experts</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <motion.div 
                key={mentor.id}
                whileHover={{ y: -5 }}
                className="bg-gray-900 border border-gray-800 rounded-3xl p-6 transition-all hover:border-indigo-500/30 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                    <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                      <Star size={14} fill="currentColor" /> {mentor.rating}
                    </div>
                  </div>
                </div>
                
                <h4 className="text-lg font-bold mb-1">
                  {mentor.linkedinUrl ? (
                    <a href={mentor.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 hover:underline">
                      {mentor.name}
                    </a>
                  ) : (
                    mentor.name
                  )}
                </h4>
                <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">{mentor.specialty}</p>
                
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-6 border-t border-gray-800 pt-4">
                  <div className="flex items-center gap-1 text-emerald-500 font-bold">
                    <Calendar size={14} /> Available {mentor.available}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-black text-white">{mentor.sessionPrice}</span>
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">per session</span>
                </div>
                
                <button 
                  onClick={() => setSelectedMentor(mentor)}
                  className="w-full py-3 bg-gray-800 hover:bg-indigo-600 text-gray-300 hover:text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-indigo-600/20"
                >
                  Book 1-on-1 Session <ChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </>
      )}
      </motion.div>
    </>
  );
};

export default HumanMentors;
