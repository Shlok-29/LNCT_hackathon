import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, DollarSign, Activity, Shield, BarChart3, 
  ExternalLink, ArrowUpRight, ArrowDownRight, Briefcase, 
  Zap, Search, Filter, Sparkles, Heart, LifeBuoy, 
  Umbrella, Star, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Investments = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('opportunities');
  const [marketData, setMarketData] = useState({
    stocks: [],
    insurancePolicies: [],
    marketSentiment: 'BULLISH',
    buyStrength: 84
  });
  const [loading, setLoading] = useState(true);
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(7);

  // Compound interest calculation
  const months = years * 12;
  const ratePerMonth = returnRate / 100 / 12;
  const futureValue = initialInvestment * Math.pow(1 + ratePerMonth, months) +
    monthlyContribution * ((Math.pow(1 + ratePerMonth, months) - 1) / ratePerMonth);
  const totalContributed = initialInvestment + (monthlyContribution * months);
  const totalInterest = futureValue - totalContributed;

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get((import.meta.env.VITE_API_URL || 'https://fincash-1.onrender.com') + '/api/market-data');
        if (response.data && response.data.stocks) {
          setMarketData(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch market data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5000);
    return () => clearInterval(interval);
  }, []);

  const tradingPlatforms = [
    { name: "Zerodha", features: "Direct Mutual Funds, Low Brokerage", link: "https://zerodha.com" },
    { name: "Upstox", features: "Pro Analysis Tools, Fast Trading", link: "https://upstox.com" },
    { name: "Groww", features: "Simple UI, Easy for Beginners", link: "https://groww.in" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <TrendingUp className="text-indigo-400" size={36} />
            Investment Hub
          </h1>
          <p className="text-gray-500 font-bold mt-1 text-sm uppercase tracking-widest">Analyze, Simulate & Explore Opportunities</p>
        </div>
        
        <div className="flex bg-slate-950/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
          {['opportunities', 'simulator', 'insurance', 'trading'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-tighter transition-all ${
                activeTab === tab 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'opportunities' && (
          <motion.div 
            key="opps"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Personalized AI Insight Card - NEW */}
              <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group border border-white/10 shadow-2xl shadow-indigo-600/30">
                <Sparkles className="absolute top-[-20%] right-[-10%] w-40 h-40 opacity-20 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10 space-y-6">
                  <div className="badge bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border border-white/10">AI ML Recommendation</div>
                  <div>
                    <h3 className="text-2xl font-black">AI Portfolio Strategy</h3>
                    <p className="text-white/70 font-bold mt-2 text-sm leading-relaxed">
                      {user?.personalized?.stockAnalysis?.[0]?.analysis || "Analyzing your financial behavior to suggest the best assets..."}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs font-black uppercase mb-2">
                      <span>Personalized Alignment</span>
                      <span>92%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `92%` }}
                        className="h-full bg-white" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Signal Summary */}
              <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <Activity className="absolute top-[-20%] right-[-10%] w-40 h-40 opacity-5 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <TrendingUp className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">Market Sentiment</h3>
                    <p className="text-gray-500 font-bold">Overall Signal: <span className="text-emerald-400 uppercase">{marketData.marketSentiment}</span></p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs font-black uppercase mb-2">
                      <span>Buy Strength</span>
                      <span>{marketData.buyStrength}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${marketData.buyStrength}%` }}
                        className="h-full bg-indigo-500" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Card */}
              <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-emerald-400">
                      <BarChart3 size={24} />
                    </div>
                    <span className="bg-indigo-400/10 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">Alpha Signal</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">Top Pick: {user?.personalized?.stockAnalysis?.[0]?.symbol || "Loading..."}</h3>
                    <p className="text-gray-500 font-bold text-sm">Target Potential: <span className="text-emerald-400 font-black">{user?.personalized?.stockAnalysis?.[0]?.potential || "+15%"}</span></p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-400 cursor-pointer hover:gap-3 transition-all">
                    View Personalized Analysis <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Analysis Table */}
            <div className="bg-slate-900 border border-white/5 rounded-[3rem] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black">Stock Analysis Tool</h3>
                  <p className="text-xs text-gray-500 font-black uppercase tracking-widest mt-1">Real-time Buy/Sell Recommendations</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input type="text" placeholder="Search Ticker..." className="bg-slate-950 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs font-bold focus:outline-none focus:border-indigo-500" />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-950/50">
                    <tr>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Asset Name</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Current Price</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">24h Change</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">AI Signal</th>
                      <th className="px-8 py-5 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {marketData.stocks.map((stock, i) => (
                      <motion.tr 
                        key={stock.ticker} 
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-8 py-6">
                          <div className="font-black text-white">{stock.name}</div>
                          <div className="text-[10px] text-gray-500 font-bold">{stock.ticker}</div>
                        </td>
                        <td className="px-8 py-6 font-mono font-bold text-white">{stock.price}</td>
                        <td className="px-8 py-6">
                          <span className={`flex items-center gap-1 font-bold ${stock.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {stock.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            {stock.change}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            stock.signal.includes('BUY') ? 'bg-emerald-500/10 text-emerald-400' : 
                            stock.signal === 'HOLD' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            {stock.signal}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 hover:bg-indigo-500/10 text-gray-500 hover:text-indigo-400 rounded-lg transition-all">
                            <ExternalLink size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'simulator' && (
          <motion.div 
            key="sim"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-12 gap-8"
          >
            {/* Controls */}
            <div className="lg:col-span-4 bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 space-y-8">
              <h3 className="text-xl font-black mb-4">Parameters</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-3">Initial Investment</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-black">₹</span>
                    <input 
                      type="number" 
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-10 pr-6 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-3">Monthly SIP</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-black">₹</span>
                    <input 
                      type="number" 
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-10 pr-6 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
                    <span>Duration</span>
                    <span className="text-indigo-400">{years} Years</span>
                  </label>
                  <input 
                    type="range" min="1" max="40" value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
                    <span>Exp. Return</span>
                    <span className="text-indigo-400">{returnRate}% ARR</span>
                  </label>
                  <input 
                    type="range" min="1" max="15" value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-8 bg-slate-900 border border-white/5 rounded-[3rem] p-12 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.1),transparent)]" />
              
              <div className="relative z-10 text-center space-y-4 mb-12">
                <h3 className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs">Estimated Future Value</h3>
                <div className="text-6xl md:text-8xl font-black text-white tracking-tighter">
                  ₹{futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="relative z-10 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
                <div className="bg-slate-950 border border-white/5 p-8 rounded-[2rem] space-y-2">
                  <div className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Total Invested</div>
                  <div className="text-3xl font-black text-white">₹{totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                
                <div className="bg-indigo-600 p-8 rounded-[2rem] space-y-2 shadow-xl shadow-indigo-600/20">
                  <div className="text-white/60 font-black uppercase tracking-widest text-[10px]">Total Gain</div>
                  <div className="text-3xl font-black text-white">₹{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'insurance' && (
          <motion.div 
            key="ins"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            {/* Health Insurance Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <Heart size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Recommended Health Plans</h2>
                  <p className="text-xs text-gray-500 font-black uppercase tracking-widest mt-0.5">Top-rated plans curated for your age and dependents</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(user?.personalized?.insuranceRecommendations?.health || []).map((ins, i) => (
                  <div key={i} className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 space-y-6 group hover:border-emerald-500/30 transition-all hover:bg-slate-900/50">
                    <div className="flex justify-between items-start">
                      <div className="text-3xl font-black text-white">{ins.company}</div>
                      <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-black text-white">{ins.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-emerald-400 font-black text-sm uppercase tracking-widest mb-1">{ins.plan}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-500 font-bold uppercase">Cover: {ins.cover}</span>
                        <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase">{ins.premium}</span>
                      </div>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-white/5">
                      {ins.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                          <ShieldCheck size={14} className="text-emerald-500" /> {f}
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20">
                      Compare & Buy
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Life Insurance Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  <Umbrella size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Recommended Life Covers</h2>
                  <p className="text-xs text-gray-500 font-black uppercase tracking-widest mt-0.5">High-sum assured term plans for your family's security</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(user?.personalized?.insuranceRecommendations?.life || []).map((ins, i) => (
                  <div key={i} className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 space-y-6 group hover:border-indigo-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="text-3xl font-black text-white">{ins.company}</div>
                      <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-black text-white">{ins.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-indigo-400 font-black text-sm uppercase tracking-widest mb-1">{ins.plan}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-500 font-bold uppercase">Cover: {ins.cover}</span>
                        <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase">{ins.premium}</span>
                      </div>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-white/5">
                      {ins.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                          <CheckCircle2 size={14} className="text-indigo-500" /> {f}
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-4 bg-slate-950 text-white border border-white/10 rounded-2xl font-black text-sm hover:bg-white hover:text-slate-950 transition-all">
                      Check Premium
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Market Schemes Section */}
            <div>
              <div className="flex items-center gap-3 mb-8 mt-12 bg-indigo-600/10 p-4 rounded-3xl border border-indigo-500/20">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 relative">
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
                  <Activity size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-2">
                    Live Market Schemes <span className="text-rose-400 text-xs px-2 py-0.5 bg-rose-500/10 rounded-full border border-rose-500/20 uppercase tracking-widest animate-pulse">Live</span>
                  </h2>
                  <p className="text-xs text-gray-400 font-bold mt-0.5">Real-time fluctuating premium schemes from the market ⚡</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(marketData.insurancePolicies || []).map((ins, i) => (
                  <div key={`live-${i}`} className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 space-y-6 group hover:border-rose-500/30 transition-all shadow-xl shadow-rose-900/5 hover:-translate-y-1 duration-300">
                    <div className="flex justify-between items-start">
                      <div className="text-2xl font-black text-white">{ins.company || ins.provider}</div>
                      <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-black text-white">{ins.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-rose-400 font-black text-sm uppercase tracking-widest mb-1">{ins.plan || ins.type}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-500 font-bold uppercase">Cover: {ins.cover || ins.coverage}</span>
                        <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                        <span className="text-[10px] text-rose-400 font-black uppercase bg-rose-500/10 px-2 rounded">{ins.premium}</span>
                      </div>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-white/5">
                      {ins.features?.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                          <Zap size={14} className="text-rose-500" /> {f}
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-2xl font-black text-sm hover:from-rose-500 hover:to-rose-400 transition-all shadow-lg shadow-rose-600/20">
                      Snap Offer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'trading' && (
          <motion.div 
            key="trade"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[3rem] p-12 text-white text-center space-y-6">
              <h2 className="text-4xl font-black">Trade with the Best</h2>
              <p className="text-white/60 font-bold max-w-xl mx-auto">Access the top-rated Indian trading platforms directly from FinCash. Analyze and execute with zero latency.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tradingPlatforms.map((platform, i) => (
                <div key={i} className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:bg-slate-800/50 transition-all">
                  <div className="space-y-4">
                    <div className="text-3xl font-black group-hover:text-indigo-400 transition-colors">{platform.name}</div>
                    <p className="text-gray-500 font-bold text-sm">{platform.features}</p>
                  </div>
                  <a href={platform.link} target="_blank" rel="noreferrer" className="mt-8 flex items-center justify-between group/btn">
                    <span className="text-xs font-black uppercase tracking-widest">Connect Account</span>
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover/btn:bg-indigo-600 transition-all">
                      <ArrowUpRight size={18} />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Investments;
