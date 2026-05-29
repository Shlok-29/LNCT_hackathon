import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sun, Moon, Menu, X, ArrowRight, Shield, 
  TrendingUp, BookOpen, Layers, Activity, Users,
  Globe, Zap, LogOut, Compass, ChevronDown, PlayCircle
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import RoadmapForm from "./RoadmapForm";
import axios from "axios";

export default function LandingPage() {
  const [dark, setDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/api/roadmap', {
            headers: { Authorization: `Bearer ${token}` }
          });
          // If a roadmap exists, we could pre-set it or show a "View Roadmap" button
          // For now, we'll just log it
          if (response.data) console.log("Existing roadmap found:", response.data);
        } catch (error) {
          console.error("Error fetching roadmap:", error);
        }
      }
    };
    fetchRoadmap();
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-32">

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6">
              <Zap size={14} /> The Future of Financial Literacy
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] font-outfit mb-8"
            >
              Master Your Money <br/>
              <span className="text-animate-gradient">Through Play.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Simulate real-life financial scenarios, from filing your first tax return to building a 401(k). Personalized learning paths tailored for young professionals.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4">
              {isAuthenticated ? (
                <button 
                  onClick={() => setIsRoadmapOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-600/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3"
                >
                  <Compass size={24} /> Create Financial Roadmap
                </button>
              ) : (
                <Link 
                  to="/signup" 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-600/30 transition-all hover:-translate-y-1 active:scale-95"
                >
                  Join FinCash Now
                </Link>
              )}
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-4 rounded-2xl font-black text-lg transition-all hover:-translate-y-1 backdrop-blur-md">
                View Simulations
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex items-center justify-center lg:justify-start gap-6 grayscale opacity-40">
              <Globe size={24} />
              <div className="h-px w-12 bg-white/10"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Trusted by 50,000+ Young Professionals</span>
            </motion.div>
          </motion.div>

          {/* 3D Visual Hero */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative perspective-1000"
          >
            <div className="relative z-10 glass-card p-4 md:p-8 preserve-3d rotate-x-6 -rotate-y-12 hover:rotate-0 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                alt="Finance Dashboard Simulation"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover border border-white/10"
              />
              {/* Floating elements */}
              <div className="absolute -top-10 -right-10 glass-card p-6 shadow-2xl animate-bounce duration-[3000ms]">
                <TrendingUp size={32} className="text-emerald-400" />
                <div className="mt-2 font-bold text-xl">+42%</div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Wealth Index</div>
              </div>
              <div className="absolute -bottom-6 -left-6 glass-card p-4 shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                  <Shield size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">Tax Safe</div>
                  <div className="text-[10px] text-slate-400">Simulation Complete</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM STATEMENT / FEATURES */}
      <section id="features" className="px-8 py-32 bg-white/2 dark:bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black font-outfit mb-6">Designed for the <span className="text-indigo-400">First-Time Earner</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">We bridge the gap between "getting a paycheck" and "building a fortune" through interactive, risk-free simulations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Budget Lab", 
                desc: "Practice the 50/30/20 rule with interactive sliders and real-world expense shocks.",
                icon: <Layers size={40} className="text-indigo-400" />
              },
              { 
                title: "Tax Optimizer", 
                desc: "Understand your paycheck, filing statuses, and deductions before the IRS knocks.",
                icon: <BookOpen size={40} className="text-purple-400" />
              },
              { 
                title: "Investment Sim", 
                desc: "Experience 10 years of market volatility in 10 minutes. Learn to hold when it counts.",
                icon: <TrendingUp size={40} className="text-emerald-400" />
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card p-10 flex flex-col items-center text-center group"
              >
                <div className="mb-8 p-6 rounded-3xl bg-slate-900 border border-white/5 group-hover:scale-110 group-hover:border-indigo-500/30 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black font-outfit mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Roadmap Form Modal */}
      <RoadmapForm isOpen={isRoadmapOpen} onClose={() => setIsRoadmapOpen(false)} />
    </div>
  );
}
