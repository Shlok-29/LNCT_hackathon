import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserSquare2, GraduationCap, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

const AdminOverview = () => {
  const stats = [
    { name: 'Total Users', value: '12,842', change: '+12%', trend: 'up', icon: <Users className="text-blue-400" /> },
    { name: 'Employees', value: '42', change: '+2', trend: 'up', icon: <UserSquare2 className="text-emerald-400" /> },
    { name: 'Active Mentors', value: '156', change: '-4', trend: 'down', icon: <GraduationCap className="text-rose-400" /> },
    { name: 'MRR', value: '₹45,210', change: '+18%', trend: 'up', icon: <DollarSign className="text-yellow-400" /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold">Admin Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time platform performance and core metrics.</p>
        </div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
          Last Updated: 2 mins ago
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-rose-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-slate-400 text-sm font-medium">{stat.name}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mock Chart Area */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-200">User Growth (Last 30 Days)</h3>
            <Activity className="text-slate-500" size={20} />
          </div>
          <div className="flex-1 flex items-end gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 85, 95, 75, 60, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-rose-500/20 hover:bg-rose-500/40 transition-all rounded-t-lg relative group" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h * 10}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            <span>Apr 01</span>
            <span>Apr 15</span>
            <span>Apr 30</span>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-slate-200 mb-6">Recent Platform Events</h3>
          <div className="space-y-6">
            {[
              { type: 'Security', msg: 'Multiple failed login attempts detected', time: '5m ago', color: 'text-rose-400' },
              { type: 'Billing', msg: 'MRR exceeded ₹45k milestone', time: '2h ago', color: 'text-yellow-400' },
              { type: 'System', msg: 'New employee onboarded: Jane Doe', time: '5h ago', color: 'text-emerald-400' },
              { type: 'Mentor', msg: 'Sarah Jenkins updated her specialty', time: '1d ago', color: 'text-blue-400' },
            ].map((event, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-1 h-10 rounded-full ${event.color.replace('text', 'bg')}`}></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1 flex justify-between">
                    <span className={event.color}>{event.type}</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="text-sm text-slate-300">{event.msg}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-xs font-bold text-slate-400 hover:text-white border border-slate-800 rounded-xl transition-all">
            View All Audit Logs
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminOverview;
