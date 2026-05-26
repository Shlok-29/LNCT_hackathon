import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  BarChart3, 
  Users, 
  UserSquare2, 
  GraduationCap, 
  DollarSign, 
  Terminal, 
  ShieldCheck, 
  FileStack, 
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell
} from 'lucide-react';

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { role, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !isAuthenticated) {
      navigate('/login');
    } else if (isAuthenticated && role !== 'admin') {
      navigate('/user');
    }
  }, [role, isAuthenticated, navigate]);

  const adminNavItems = [
    { name: 'Overview', path: '/admin', icon: <BarChart3 size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Employees', path: '/admin/employees', icon: <UserSquare2 size={20} /> },
    { name: 'Mentors', path: '/admin/mentors', icon: <GraduationCap size={20} /> },
    { name: 'Revenue', path: '/admin/revenue', icon: <DollarSign size={20} /> },
    { name: 'AI Logs', path: '/admin/ai-logs', icon: <Terminal size={20} /> },
    { name: 'Security', path: '/admin/security', icon: <ShieldCheck size={20} /> },
    { name: 'Reports', path: '/admin/reports', icon: <FileStack size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <img src="/favicon.png" alt="FinCash Favicon" className="w-full h-full object-contain" />
            </div>
            AdminPanel
          </div>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all text-sm">
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button className="w-full mt-1 flex items-center gap-3 px-4 py-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all text-sm font-bold">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-slate-800 rounded-full px-4 py-1.5 border border-slate-700">
              <Search size={16} className="text-slate-400" />
              <input type="text" placeholder="Global search..." className="bg-transparent border-none outline-none text-xs w-48" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full border border-rose-500/20 uppercase tracking-tighter">
              System: Stable
            </div>
            <button className="relative p-2 text-slate-400 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 p-0.5 cursor-pointer">
              <div className="w-full h-full bg-slate-900 rounded-md flex items-center justify-center text-[10px] font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-auto bg-slate-950 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
