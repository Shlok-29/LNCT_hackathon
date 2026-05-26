import React from "react";
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-white/5 pt-20 pb-10 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/favicon.png" alt="FinCash Favicon" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
              <span className="text-2xl font-black font-outfit tracking-tighter text-white">FinCash</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              The all-in-one centralized portal designed for first-time earners. Master your financial journey through immersive mentorship and real-time guidance.
            </p>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-lg font-bold font-outfit mb-6 text-white uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Finance Mentorship
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Financial Assessment
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Expense Tracking
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Personalized Guidance
              </li>
            </ul>
          </div>

          {/* Financial Tools */}
          <div>
            <h4 className="text-lg font-bold font-outfit mb-6 text-white uppercase tracking-wider">Market Access</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Stock Guidance Hub
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Savings-Based Trading
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Risk Assessments
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Market Analytics
              </li>
            </ul>
          </div>

          {/* Admin & Portals */}
          <div>
            <h4 className="text-lg font-bold font-outfit mb-6 text-white uppercase tracking-wider">Access Portals</h4>
            <div className="flex flex-col gap-3">
              <Link to="/user" className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-xs font-bold text-center text-slate-300 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all">
                USER DASHBOARD
              </Link>
              <Link to="/admin" className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-xs font-bold text-center text-slate-300 hover:bg-rose-600 hover:border-rose-500 hover:text-white transition-all">
                ADMIN PORTAL
              </Link>
              <Link to="/employee" className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-xs font-bold text-center text-slate-300 hover:bg-emerald-600 hover:border-emerald-500 hover:text-white transition-all">
                STAFF HUB
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">
          <div>© {new Date().getFullYear()} FinCash. Empowering the Next Generation.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;
