import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { 
  Target, TrendingUp, ShieldCheck, Award, Zap, 
  BookOpen, ChevronRight, PlayCircle, Sparkles,
  ArrowUpRight, Lock, X, BarChart3, Binary, 
  ArrowUp, ArrowDown, Minus
} from 'lucide-react';
import RoadmapForm from '../../../components/RoadmapForm';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [marketData, setMarketData] = useState(null);
  const [learningPaths, setLearningPaths] = useState([]);
  const [userStats, setUserStats] = useState({ xp: 0, streak: 0, badges: 0 });
  const [selectedPath, setSelectedPath] = useState(null);
  const [isPathModalOpen, setIsPathModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const IconMap = {
    ShieldCheck: <ShieldCheck size={24} className="text-emerald-400" />,
    Target: <Target size={24} className="text-blue-400" />,
    TrendingUp: <TrendingUp size={24} className="text-purple-400" />
  };

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/market-data');
        setMarketData(response.data);
      } catch (err) {
        console.error("Dashboard market data fetch failed:", err);
      }
    };
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 10000); // 10s refresh
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/roadmap', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRoadmap(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching roadmap:", error);
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, []);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/user-learning-paths', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLearningPaths(response.data);
      } catch (err) {
        console.error("Error fetching learning paths:", err);
      }
    };
    const fetchUserStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
      const response = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/user-stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserStats(response.data);
      } catch (err) {
        console.error("Error fetching user stats:", err);
      }
    };
    fetchLearningPaths();
    fetchUserStats();
  }, []);

  const handleUpdateProgress = async (pathId, currentProgress) => {
    try {
      setIsUpdating(true);
      const newProgress = Math.min(currentProgress + 25, 100);
      const token = localStorage.getItem('token');
      await axios.patch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + `/api/user-learning-paths/${pathId}/progress`, 
        { progress: newProgress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh data
      const pathsRes = await axios.get('http://localhost:5000/api/user-learning-paths', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLearningPaths(pathsRes.data);
      
      const statsRes = await axios.get('http://localhost:5000/api/user-stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserStats(statsRes.data);
      
      if (newProgress === 100) {
        setIsPathModalOpen(false);
      } else {
        setSelectedPath(pathsRes.data.find(p => p.pathId === pathId));
      }
    } catch (err) {
      console.error("Error updating progress:", err);
    } finally {
      setIsUpdating(false);
    }
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
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome & Gamification Banner */}
      <motion.section variants={itemVariants} className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 to-purple-900 border border-indigo-500/30 p-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-indigo-500 opacity-20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 uppercase font-outfit tracking-tighter">
              Welcome back, {user?.name?.split(' ')?.[0] || 'User'}! 👋
            </h1>
            <p className="text-indigo-200 text-lg">You're making great progress in your financial journey.</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 max-w-xs bg-gray-900/50 rounded-full h-3 border border-indigo-500/20 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-400 to-purple-400 h-full rounded-full" style={{ width: `${Math.min((userStats.xp / 1000) * 100, 100)}%` }}></div>
              </div>
              <span className="text-sm font-bold text-white">{userStats.xp} / 1000 XP</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => user?.canEditFinancials && setIsRoadmapOpen(true)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                user?.canEditFinancials 
                ? 'bg-white text-indigo-900 hover:bg-indigo-50 shadow-lg' 
                : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/5'
              }`}
            >
              {user?.canEditFinancials ? <TrendingUp size={18} /> : <Lock size={18} />}
              Update Financial Profile
            </button>
            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center bg-gray-900/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <Award size={32} className="text-yellow-400 mb-1" />
                <span className="text-2xl font-bold">{userStats.badges}</span>
                <span className="text-xs text-gray-300 uppercase tracking-wider">Badges</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-gray-900/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <Zap size={32} className="text-orange-400 mb-1" />
                <span className="text-2xl font-bold">{userStats.streak}</span>
                <span className="text-xs text-gray-300 uppercase tracking-wider">Streak</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Roadmap Popup */}
      <RoadmapForm isOpen={isRoadmapOpen} onClose={() => setIsRoadmapOpen(false)} />

      {/* Personalized Learning Paths */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="text-indigo-400" /> Personalized Paths
          </h2>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center">
            View All <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {learningPaths.map((path, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              onClick={() => {
                setSelectedPath(path);
                setIsPathModalOpen(true);
              }}
              className={`bg-gradient-to-br ${path.color} border ${path.borderColor} rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden group cursor-pointer`}
            >
              <div className="bg-gray-900/50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-white/5">
                {IconMap[path.icon] || <BookOpen size={24} className="text-indigo-400" />}
              </div>
              <h3 className="text-xl font-bold mb-2">{path.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{path.description}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-gray-300">Progress</span>
                  <span className="text-white">{path.progress}%</span>
                </div>
                <div className="w-full bg-gray-900/60 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                <PlayCircle size={28} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Personalized AI Hub - NEW SECTION */}
      <motion.section variants={itemVariants} className="grid lg:grid-cols-2 gap-8">
        {/* Personalized Stock Analysis */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart3 size={120} className="text-indigo-500" />
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <Sparkles className="text-indigo-400" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Personalized Picks</h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">AI-Powered Analysis for {user?.name || 'You'}</p>
            </div>
          </div>

          <div className="space-y-4">
            {(user?.personalized?.stockAnalysis || []).map((stock, i) => (
              <div key={i} className="p-5 rounded-[2rem] bg-slate-950 border border-white/5 hover:border-indigo-500/30 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-lg font-black text-white">{stock.symbol}</span>
                    <p className="text-xs text-gray-500 font-bold uppercase">{stock.name}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    stock.recommendation === 'Buy' ? 'bg-emerald-500/20 text-emerald-400' : 
                    stock.recommendation === 'Sell' ? 'bg-rose-500/20 text-rose-400' : 
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {stock.recommendation}
                  </div>
                </div>
                <p className="text-xs text-gray-400 font-bold leading-relaxed mb-4">
                  {stock.analysis}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase">AI Score</p>
                      <p className="text-sm font-black text-white">{stock.score}/100</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase">Potential</p>
                      <p className="text-sm font-black text-emerald-400">{stock.potential}</p>
                    </div>
                  </div>
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                    <ArrowUpRight size={18} className="text-indigo-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Risk Simulations */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Binary size={120} className="text-purple-500" />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
              <Zap className="text-purple-400" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Risk Simulations</h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">Stress-Test Your Financial IQ</p>
            </div>
          </div>

          <div className="space-y-4">
            {(user?.personalized?.simulations || []).map((sim, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-slate-950 border border-white/5 hover:border-purple-500/30 transition-all group/sim">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-black text-white">{sim.title}</h4>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${
                    sim.complexity === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                    sim.complexity === 'Hard' ? 'bg-rose-500/10 text-rose-400' :
                    'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    {sim.complexity}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-bold leading-relaxed mb-6">
                  {sim.description}
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 p-3 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Duration</p>
                    <p className="text-xs font-black text-white">{sim.duration}</p>
                  </div>
                  <div className="flex-1 p-3 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-gray-500 font-black uppercase mb-1">Reward</p>
                    <p className="text-xs font-black text-indigo-400">+200 XP</p>
                  </div>
                </div>
                <button className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  Launch Simulation <PlayCircle size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Market Snapshot & Recommended Action */}
      <motion.section variants={itemVariants} className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
            <Sparkles size={200} className="text-indigo-500" />
          </div>
          <div className="badge inline-flex w-fit bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/20">
            Roadmap Insights
          </div>
          <h3 className="text-2xl font-bold mb-2">
            {roadmap?.aiAdvice?.[0] || (user?.salary ? "Optimize your Investments" : "Set up your Monthly Budget")}
          </h3>
          <p className="text-gray-400 mb-6 max-w-sm">
            {roadmap?.aiAdvice?.[1] || (user?.salary ? "You've set your budget. Now let's maximize your 30% savings goal." : "Use our interactive Budget Lab to allocate your income using the 7:3 rule.")}
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl w-fit transition-colors flex items-center gap-2">
            Full Analysis <ChevronRight size={18} />
          </button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-400" /> Live Market
          </h3>
          <div className="space-y-4">
            {(marketData?.stocks?.slice(0, 3) || []).map((stock, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors">
                <span className="font-medium text-gray-200">{stock.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`${stock.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'} font-medium`}>{stock.change}</span>
                  {stock.trend === 'up' ? <ArrowUp size={16} className="text-emerald-400" /> : <ArrowDown size={16} className="text-rose-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Learning Path Detail Modal */}
      <AnimatePresence>
        {isPathModalOpen && selectedPath && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-slate-900 border border-white/10 rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl"
            >
              <div className={`h-32 bg-gradient-to-br ${selectedPath.color} p-8 flex items-end relative`}>
                <button 
                  onClick={() => setIsPathModalOpen(false)}
                  className="absolute top-6 right-6 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition-all z-10"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-900/50 rounded-2xl flex items-center justify-center border border-white/10 text-white">
                    {IconMap[selectedPath.icon]}
                  </div>
                  <h2 className="text-2xl font-black text-white">{selectedPath.title}</h2>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <p className="text-gray-400 font-medium leading-relaxed">
                  {selectedPath.description}. This module covers the essential principles and practical applications of {selectedPath.title.toLowerCase()}.
                </p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-500">
                    <span>Your Progress</span>
                    <span className="text-white">{selectedPath.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-950 rounded-full h-3 border border-white/5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedPath.progress}%` }}
                      className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <button 
                    disabled={isUpdating || selectedPath.progress === 100}
                    onClick={() => handleUpdateProgress(selectedPath.pathId, selectedPath.progress)}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isUpdating ? 'Updating...' : selectedPath.progress === 100 ? 'Path Completed' : 'Continue Learning (+25%)'}
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Dashboard;
