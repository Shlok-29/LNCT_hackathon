import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      await axios.post('https://fincash-1.onrender.com/api/reset-password', { token, newPassword });
      setStatus('success');
      setMessage('Password updated successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8 relative z-10"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-600/20">
            <Lock size={28} />
          </div>
          <h1 className="text-3xl font-black font-outfit">Create New Password</h1>
          <p className="text-slate-400 mt-2">Almost there! Set your new secure password below.</p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl text-sm mb-6 text-center border flex items-center justify-center gap-2 ${
            status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {status === 'success' ? <CheckCircle2 size={18} /> : <ShieldAlert size={18} />}
            {message}
          </div>
        )}

        {status !== 'success' && (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Reset Token</label>
              <input 
                type="text" 
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition-all text-xs font-mono"
                placeholder="Paste token from email/console"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Updating...' : 'Update Password'} 
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
