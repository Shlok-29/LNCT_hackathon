import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  User, Mail, IndianRupee, TrendingDown, 
  Target, Activity, TrendingUp, CreditCard, 
  ShoppingBag, Coffee, Home, Zap
} from 'lucide-react';

const Profile = () => {
  const { user } = useSelector(state => state.auth);

  const mockExpenses = [
    { id: 1, name: 'Grocery Run', amount: 4500, category: 'Food', icon: ShoppingBag, color: 'text-green-400', bg: 'bg-green-400/10', date: 'Today' },
    { id: 2, name: 'Electricity Bill', amount: 2100, category: 'Utilities', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10', date: 'Yesterday' },
    { id: 3, name: 'Cafe Coffee Day', amount: 350, category: 'Leisure', icon: Coffee, color: 'text-orange-400', bg: 'bg-orange-400/10', date: '2 days ago' },
    { id: 4, name: 'Rent Payment', amount: 15000, category: 'Housing', icon: Home, color: 'text-indigo-400', bg: 'bg-indigo-400/10', date: '5 days ago' },
  ];

  const stats = [
    { title: "Monthly Income", value: user?.salary ? `₹${user.salary.toLocaleString()}` : "₹45,000", icon: TrendingUp, color: "from-green-500 to-emerald-700" },
    { title: "Total Expenses", value: "₹21,950", icon: TrendingDown, color: "from-red-500 to-rose-700" },
    { title: "Current Savings", value: user?.savings ? `₹${user.savings.toLocaleString()}` : "₹23,050", icon: IndianRupee, color: "from-indigo-500 to-purple-700" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto space-y-6 lg:space-y-8"
    >
      {/* Header Profile Card */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 p-8 shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] flex-shrink-0">
              <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center overflow-hidden border-[4px] border-gray-900">
                <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random&size=128`} alt="Profile" className="group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-gray-900 rounded-full" title="Online"></div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {user?.name || 'John Doe'}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50">
                <Mail size={16} className="text-indigo-400" />
                <span className="text-sm font-medium">{user?.email || 'user@example.com'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50">
                <Target size={16} className="text-purple-400" />
                <span className="text-sm font-medium">Goal: Financial Independence</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex flex-col gap-3">
            <button className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-colors text-sm font-bold flex items-center gap-2">
              <User size={16} /> Edit Profile
            </button>
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all transform hover:scale-105 text-sm font-bold flex items-center gap-2">
              <Activity size={16} /> View Full Report
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="relative overflow-hidden group bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-gray-700 transition-colors">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-800 border border-gray-700 group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} className="text-white opacity-80" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Expenses */}
        <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CreditCard className="text-indigo-400" /> Recent Expenses
            </h2>
            <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">View All</button>
          </div>
          <div className="space-y-4 flex-1">
            {mockExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-800/40 border border-gray-800 hover:bg-gray-800/60 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${expense.bg} ${expense.color} group-hover:scale-110 transition-transform shrink-0`}>
                    <expense.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{expense.name}</h4>
                    <p className="text-xs text-gray-500">{expense.category} • {expense.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-white text-sm">-₹{expense.amount.toLocaleString()}</h4>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress & Goals */}
        <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col h-full">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <Target className="text-purple-400" /> Financial Progress
          </h2>
          <div className="space-y-8 flex-1">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-300">Monthly Budget Usage</span>
                <span className="text-sm font-bold text-indigo-400">48%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '48%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">₹21,950 spent out of ₹45,000 budget</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-300">Emergency Fund Goal</span>
                <span className="text-sm font-bold text-emerald-400">75%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 w-full hover:animate-[shimmer_2s_infinite]" />
                </motion.div>
              </div>
              <p className="text-xs text-gray-500 mt-2">₹1,50,000 saved out of ₹2,00,000 goal</p>
            </div>
            
            <div className="p-4 mt-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Target size={20} className="text-indigo-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-indigo-100 mb-1">Great Job!</h4>
                <p className="text-xs text-indigo-200/70 leading-relaxed">You are on track to hit your emergency fund goal 2 months earlier than projected. Keep up the good work!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
