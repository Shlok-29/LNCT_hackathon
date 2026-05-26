import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calculator, Info, CheckCircle2, Sparkles } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/slices/authSlice';
import axios from 'axios';

const RoadmapForm = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    salary: user?.salary || '',
    familyMembers: user?.familyMembers || '',
  });

  const [roadmap, setRoadmap] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Pre-fill when user profile loads
  useEffect(() => {
    if (user) {
      setFormData({
        salary: user.salary || '',
        familyMembers: user.familyMembers || '',
      });
    }
  }, [user]);

  const calculateRoadmap = async (e) => {
    e.preventDefault();
    const salary = Number(formData.salary);
    const savings = salary * 0.3; // 30% Savings
    const expenses = salary * 0.7; // 70% Expenses

    const roadmapData = {
      salary,
      savings,
      expenses,
      familyMembers: Number(formData.familyMembers),
      familyShare: expenses / (Number(formData.familyMembers) || 1),
      perDay: expenses / 30
    };

    // Persist to Backend
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');
      const response = await axios.post('https://fincash-1.onrender.com/api/roadmap', roadmapData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update Redux Profile
      dispatch(updateProfile({ 
        salary, 
        familyMembers: roadmapData.familyMembers,
        canEditFinancials: false // Sync with backend lock
      }));
      
      // Include AI Advice in state
      setRoadmap({ ...roadmapData, aiAdvice: response.data.aiAdvice });
      setIsSaving(false);
    } catch (error) {
      console.error("Failed to save roadmap:", error);
      setRoadmap(roadmapData); // Still show local calc even if save fails
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-800/50">
          <h2 className="text-xl font-bold font-outfit flex items-center gap-2">
            <Calculator className="text-indigo-400" /> Create Your Financial Roadmap
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          {!roadmap ? (
            <form onSubmit={calculateRoadmap} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Monthly Net Salary (₹)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none"
                    placeholder="e.g. 5000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Family Members</label>
                  <input 
                    type="number" 
                    required
                    value={formData.familyMembers}
                    onChange={(e) => setFormData({...formData, familyMembers: e.target.value})}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none"
                    placeholder="e.g. 4"
                  />
                </div>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl flex gap-3">
                <Info className="text-indigo-400 shrink-0" size={20} />
                <p className="text-xs text-indigo-200">
                  We use the <strong>7:3 Financial Discipline Rule</strong>: 70% of your income is allocated to expenses (including rent, food, and family needs), while 30% is strictly for savings and investments.
                </p>
              </div>

              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
              >
                Generate Roadmap
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Total Monthly Savings Goal</div>
                <div className="text-5xl font-black text-emerald-400 font-outfit">₹{roadmap.savings.toLocaleString()}</div>
                <div className="text-xs text-slate-500 mt-2">(30% of your ₹{roadmap.salary.toLocaleString()} income)</div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Max Expenses</div>
                  <div className="text-xl font-bold">₹{roadmap.expenses.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Per Member</div>
                  <div className="text-xl font-bold">₹{roadmap.familyShare.toFixed(0)}</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Daily Limit</div>
                  <div className="text-xl font-bold">₹{roadmap.perDay.toFixed(0)}</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-300 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-400" /> AI-Generated Roadmap:
                </h4>
                {roadmap.aiAdvice ? (
                  roadmap.aiAdvice.map((advice, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400 bg-white/5 p-3 rounded-xl border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0"></div>
                      {advice}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 size={14} className="text-emerald-500" /> Automate ₹{roadmap.savings} transfer to high-yield account.
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 size={14} className="text-emerald-500" /> Limit daily spending to under ₹{roadmap.perDay.toFixed(0)}.
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 size={14} className="text-emerald-500" /> Allocate ₹{roadmap.familyShare.toFixed(0)} per family member for necessities.
                    </div>
                  </>
                )}
              </div>

              <button 
                onClick={() => setRoadmap(null)}
                className="w-full py-3 border border-white/10 rounded-xl text-slate-400 font-bold hover:text-white hover:bg-white/5 transition-all"
              >
                Recalculate
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RoadmapForm;
