import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Filter, Download } from 'lucide-react';

const AdminRevenue = () => {
  const stats = [
    { label: 'Total Revenue', value: '₹12,45,000', change: '+12.5%', trend: 'up', icon: <DollarSign className="text-emerald-400" /> },
    { label: 'Avg. Subscription', value: '₹4,999', change: '+3.2%', trend: 'up', icon: <TrendingUp className="text-blue-400" /> },
    { label: 'Active Users', value: '8,432', change: '-2.1%', trend: 'down', icon: <Users className="text-purple-400" /> },
  ];

  const transactions = [
    { id: 'TXN-9402', user: 'Rahul Sharma', amount: '₹4,999', date: '2024-04-24', status: 'Completed' },
    { id: 'TXN-9401', user: 'Priya Patel', amount: '₹9,999', date: '2024-04-24', status: 'Completed' },
    { id: 'TXN-9399', user: 'Amit Verma', amount: '₹4,999', date: '2024-04-23', status: 'Pending' },
    { id: 'TXN-9398', user: 'Sneha Gupta', amount: '₹14,999', date: '2024-04-23', status: 'Completed' },
    { id: 'TXN-9397', user: 'Vikram Singh', amount: '₹4,999', date: '2024-04-22', status: 'Failed' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-outfit text-white">Revenue Insights</h1>
          <p className="text-slate-400">Monitor your platform's financial performance and growth metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 rounded-xl text-sm font-bold text-white hover:bg-rose-500 transition-all shadow-lg shadow-rose-600/20">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              {stat.icon}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5">
                {stat.icon}
              </div>
              <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white">{stat.value}</span>
              <span className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 glass-card p-8 border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Monthly Growth</h2>
            <select className="bg-slate-900 border-none text-xs font-bold text-slate-400 rounded-lg px-2 py-1 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[45, 62, 58, 85, 72, 94].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full relative">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="w-full bg-gradient-to-t from-rose-600/20 to-rose-500 rounded-t-lg group-hover:to-rose-400 transition-all cursor-pointer relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-950 text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{height * 10}k
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div className="glass-card p-8 border border-white/5">
          <h2 className="text-xl font-bold text-white mb-6">Source Breakdown</h2>
          <div className="space-y-6">
            {[
              { label: 'Subscriptions', value: 65, color: 'bg-rose-500' },
              { label: 'Consultations', value: 25, color: 'bg-indigo-500' },
              { label: 'Ad Revenue', value: 10, color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="text-white">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    className={`h-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="text-emerald-400 font-bold italic">Pro Tip:</span> Subscriptions are up 15% this month. Consider launching a annual plan to lock in long-term revenue.
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card overflow-hidden border border-white/5">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
          <button className="text-xs font-bold text-rose-400 hover:text-rose-300">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] bg-white/[0.02]">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((txn, i) => (
                <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-slate-400">{txn.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-white">{txn.user}</td>
                  <td className="px-6 py-4 text-sm font-bold text-white">{txn.amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{txn.date}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                      txn.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      txn.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminRevenue;
