import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sun, Moon, Menu, X, ArrowRight, Activity, Users, 
  ChevronDown, PlayCircle, LogOut 
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { motion } from "framer-motion";

const Navbar = ({ dark, setDark }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 bg-white/2 dark:bg-slate-950/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <img src="/favicon.png" alt="FinCash Favicon" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
          <span className="text-2xl font-black font-outfit tracking-tighter dark:text-white text-slate-900">FinCash</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center text-sm font-bold uppercase tracking-widest text-slate-400">
          <Link to="/#features" className="hover:text-indigo-400 transition-colors">Features</Link>
          <Link to="/user/simulations" className="hover:text-indigo-400 transition-colors">Simulations</Link>
          
          {/* Mentors Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-indigo-400 transition-colors uppercase tracking-widest text-sm font-bold">
              Mentors <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 mt-4 w-48 bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link to="/human-mentor/free" className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                <PlayCircle size={16} className="text-indigo-400" /> AI Videos
              </Link>
              <Link to="/human-mentor/one-on-one" className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                <Users size={16} className="text-purple-400" /> Human Mentor
              </Link>
            </div>
          </div>

          <Link to="/user" className="hover:text-indigo-400 transition-colors">Dashboard</Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setDark(!dark)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            {dark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
          </button>
          
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hidden md:block text-sm font-bold hover:text-indigo-400 transition-colors dark:text-slate-400 text-slate-600">Login</Link>
              <Link 
                to="/signup" 
                className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
              >
                Get Started <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/user" className="hidden md:block text-sm font-bold text-indigo-400">Welcome, {user?.name?.split(' ')[0] || 'User'}</Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
          
          <button className="md:hidden p-2 text-slate-400" onClick={() => setMobileMenuOpen(true)}>
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 bg-slate-950 z-[100] p-8 flex flex-col gap-8"
        >
          <div className="flex justify-between items-center">
            <span className="text-2xl font-black text-white">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-6 text-xl font-bold text-slate-400">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/user/simulations" onClick={() => setMobileMenuOpen(false)}>Simulations</Link>
            <Link to="/human-mentor/free" onClick={() => setMobileMenuOpen(false)}>AI Videos</Link>
            <Link to="/human-mentor/one-on-one" onClick={() => setMobileMenuOpen(false)}>Mentors</Link>
            <Link to="/user" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
