import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success', 'error'
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://fincash-1.onrender.com/api/forgot-password', { email });
      setStatus('success');
      // For demo purposes, we show the token if it's returned (it is in our mock backend)
      setMessage('Reset link sent! In this demo, use token: ' + response.data.token);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to process request');
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card p-8 relative z-10"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-600/20">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-3xl font-black font-outfit">Reset Password</h1>
          <p className="text-slate-400 mt-2">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl text-sm mb-6 text-center border ${
            status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {message}
          </div>
        )}

        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  placeholder="alex@example.com"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Send Reset Link'} 
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        ) : (
          <Link 
            to="/reset-password" 
            className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all block text-center border border-white/10"
          >
            Go to Reset Page
          </Link>
        )}

        <div className="mt-8 text-center text-sm text-slate-400">
          Remember your password? <Link to="/login" className="text-indigo-400 font-bold hover:underline">Back to login</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
