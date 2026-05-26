import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Star, CheckCircle2, Clock, Search, Plus, MoreVertical, Mail, Shield, X, User, Briefcase, Info } from 'lucide-react';

const AdminMentors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMentor, setNewMentor] = useState({ name: '', specialty: '', email: '', bio: '', status: 'Active' });

  const stats = [
    { label: 'Total Mentors', value: '24', icon: <GraduationCap size={20} />, color: 'text-indigo-400' },
    { label: 'Avg Rating', value: '4.9', icon: <Star size={20} />, color: 'text-amber-400' },
    { label: 'Sessions This Month', value: '142', icon: <CheckCircle2 size={20} />, color: 'text-emerald-400' },
  ];

  const [mentors, setMentors] = useState([
    { id: 1, name: 'Dr. Arvinder Singh', specialty: 'Tax Strategy & Planning', status: 'Active', rating: 4.9, sessions: 156, email: 'arvinder@fincash.com' },
    { id: 2, name: 'Meera Deshmukh', specialty: 'Stock Market & Equity', status: 'Active', rating: 4.8, sessions: 92, email: 'meera@fincash.com' },
    { id: 3, name: 'Kevin O\'Leary', specialty: 'Venture Capital & IPOs', status: 'Away', rating: 5.0, sessions: 310, email: 'kevin@fincash.com' },
    { id: 4, name: 'Sanjay Malhotra', specialty: 'Real Estate Investment', status: 'Active', rating: 4.7, sessions: 45, email: 'sanjay@fincash.com' },
    { id: 5, name: 'Sarah Jenkins', specialty: 'Retirement & Estate Planning', status: 'Inactive', rating: 4.6, sessions: 12, email: 'sarah@fincash.com' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mentorToAdd = {
      ...newMentor,
      id: mentors.length + 1,
      rating: 0.0,
      sessions: 0,
    };
    setMentors([mentorToAdd, ...mentors]);
    setIsModalOpen(false);
    setNewMentor({ name: '', specialty: '', email: '', bio: '', status: 'Active' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 relative"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-outfit text-white">Mentor Directory</h1>
          <p className="text-slate-400">Manage your network of financial experts and track their performance.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
        >
          <Plus size={18} />
          Add New Mentor
        </button>
      </div>

      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 border border-white/5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search mentors by name, specialty or email..." 
            className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-900 border border-white/5 text-sm font-bold text-slate-300 rounded-xl px-4 py-3 outline-none">
            <option>All Specialities</option>
            <option>Tax Strategy</option>
            <option>Equity</option>
          </select>
          <select className="bg-slate-900 border border-white/5 text-sm font-bold text-slate-300 rounded-xl px-4 py-3 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Away</option>
          </select>
        </div>
      </div>

      {/* Mentors Table */}
      <div className="glass-card overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] bg-white/[0.02]">
                <th className="px-8 py-5">Mentor</th>
                <th className="px-6 py-5">Specialty</th>
                <th className="px-6 py-5">Performance</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mentors.map((mentor, i) => (
                <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-black text-white border-2 border-slate-900">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{mentor.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail size={12} />
                          {mentor.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-slate-300">{mentor.specialty}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-bold">{mentor.rating}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{mentor.sessions} Sessions</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      mentor.status === 'Active' ? 'text-emerald-400 bg-emerald-400/10' :
                      mentor.status === 'Away' ? 'text-amber-400 bg-amber-400/10' :
                      'text-slate-500 bg-slate-500/10'
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${
                        mentor.status === 'Active' ? 'bg-emerald-400' :
                        mentor.status === 'Away' ? 'bg-amber-400' :
                        'bg-slate-500'
                      }`} />
                      {mentor.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <Shield size={16} />
                      </button>
                      <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
          <p className="text-xs text-slate-500 font-bold">Showing {mentors.length} of 24 mentors</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs font-bold text-slate-400 opacity-50 cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs font-bold text-slate-300 hover:text-white">Next</button>
          </div>
        </div>
      </div>

      {/* Create Mentor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-indigo-600/10 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                    <Plus size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">Add New Expert</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Expand your mentorship network</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <User size={12} /> Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                      value={newMentor.name}
                      onChange={(e) => setNewMentor({...newMentor, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Mail size={12} /> Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                      value={newMentor.email}
                      onChange={(e) => setNewMentor({...newMentor, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={12} /> Specialty / Expertise
                  </label>
                  <select 
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                    value={newMentor.specialty}
                    onChange={(e) => setNewMentor({...newMentor, specialty: e.target.value})}
                  >
                    <option value="">Select Specialty</option>
                    <option value="Tax Strategy & Planning">Tax Strategy & Planning</option>
                    <option value="Stock Market & Equity">Stock Market & Equity</option>
                    <option value="Venture Capital">Venture Capital</option>
                    <option value="Real Estate Investment">Real Estate Investment</option>
                    <option value="Crypto & Digital Assets">Crypto & Digital Assets</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Info size={12} /> Short Bio
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Briefly describe the expert's background..."
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none"
                    value={newMentor.bio}
                    onChange={(e) => setNewMentor({...newMentor, bio: e.target.value})}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 bg-slate-950 border border-white/5 rounded-2xl text-sm font-bold text-slate-400 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] px-6 py-4 bg-indigo-600 rounded-2xl text-sm font-bold text-white hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20"
                  >
                    Register Expert
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminMentors;
