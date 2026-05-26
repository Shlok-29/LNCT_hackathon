import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Car, Home, ShieldAlert, Briefcase, Zap, ChevronRight } from 'lucide-react';

const Simulations = () => {
  const simulationCards = [
    {
      title: "Buy a Car",
      description: "Finance vs. Cash. See how a car loan affects your 5-year budget.",
      icon: <Car size={32} className="text-blue-400" />,
      difficulty: "Beginner",
      duration: "10 mins",
      color: "border-blue-500/20 bg-blue-500/5"
    },
    {
      title: "Emergency Fund Crisis",
      description: "An unexpected ₹2,000 medical bill. Can your budget survive?",
      icon: <ShieldAlert size={32} className="text-red-400" />,
      difficulty: "Intermediate",
      duration: "15 mins",
      color: "border-red-500/20 bg-red-500/5"
    },
    {
      title: "First Home Journey",
      description: "Navigate down payments, PMI, and hidden closing costs.",
      icon: <Home size={32} className="text-emerald-400" />,
      difficulty: "Advanced",
      duration: "30 mins",
      color: "border-emerald-500/20 bg-emerald-500/5"
    },
    {
      title: "Job Switch Simulation",
      description: "Higher salary but higher cost of living. Is the move worth it?",
      icon: <Briefcase size={32} className="text-purple-400" />,
      difficulty: "Intermediate",
      duration: "20 mins",
      color: "border-purple-500/20 bg-purple-500/5"
    }
  ];

  const [showTutorial, setShowTutorial] = React.useState(true);

  const tutorialSteps = [
    { 
      step: "01", 
      title: "Choose Scenario", 
      desc: "Select a real-world event from the grid below. Each scenario is designed to test a specific financial skill.", 
      icon: <Layers className="text-blue-400" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    { 
      step: "02", 
      title: "Input Reality", 
      desc: "Connect your real salary or simulate a new income bracket to see how the choices affect YOU.", 
      icon: <Zap className="text-yellow-400" />,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    },
    { 
      step: "03", 
      title: "Market Shock", 
      desc: "Experience 10 years of market ups and downs in 10 minutes. Learn to keep your cool when things get red.", 
      icon: <ShieldAlert className="text-rose-400" />,
      image: "https://images.unsplash.com/photo-1611974714024-463ef9c71659"
    },
    { 
      step: "04", 
      title: "Mastery Badge", 
      desc: "Earn XP and unlock badges by making optimal decisions that align with the 7:3 savings rule.", 
      icon: <ChevronRight className="text-emerald-400" />,
      image: "https://images.unsplash.com/photo-1523240715630-991f2e812300"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black font-outfit flex items-center gap-4">
            <Layers className="text-indigo-500" size={40} />
            Simulations
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Master the art of decision making without the real-world risk.</p>
        </div>
        <button 
          onClick={() => setShowTutorial(!showTutorial)}
          className="bg-gray-900 border border-white/5 px-6 py-2 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all"
        >
          {showTutorial ? 'Hide Tutorial' : 'Show Tutorial'}
        </button>
      </div>

      {/* Interactive Horizontal Tutorial */}
      {showTutorial && (
        <motion.section 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="relative"
        >
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
            {tutorialSteps.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[320px] md:min-w-[400px] bg-gray-900 border border-gray-800 rounded-[2rem] overflow-hidden snap-start hover:border-indigo-500/50 transition-all group"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div className="p-3 bg-gray-950/80 backdrop-blur-md rounded-2xl border border-white/10">{item.icon}</div>
                    <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors font-outfit">{item.step}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {simulationCards.map((sim, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-3xl border ${sim.color} flex flex-col justify-between group cursor-pointer transition-all hover:shadow-2xl hover:shadow-indigo-500/10`}
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-gray-900 p-4 rounded-2xl border border-white/5">
                  {sim.icon}
                </div>
                <div className="flex gap-2">
                  <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-gray-700">
                    {sim.difficulty}
                  </span>
                  <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
                    {sim.duration}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">{sim.title}</h3>
              <p className="text-gray-400 leading-relaxed">{sim.description}</p>
            </div>
            
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-bold group-hover:gap-3 transition-all">
                Launch Simulation <ChevronRight size={20} />
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-[10px] font-bold">
                    User
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-indigo-600 flex items-center justify-center text-[10px] font-bold">
                  +12
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Simulation Mastery Stats */}
      <section className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-indigo-600/20 flex items-center justify-center border-4 border-indigo-600/30">
              <Zap size={40} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Simulation Mastery</h3>
              <p className="text-gray-400">Complete 2 more scenarios to unlock "Level 5 Disciplinarian"</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">8/12</div>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">85%</div>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Avg Score</div>
            </div>
            <div className="hidden sm:block">
              <div className="text-3xl font-bold">2.4k</div>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Total XP</div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Simulations;
