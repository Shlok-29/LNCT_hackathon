import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Ticket, 
  FileStack, 
  ShieldCheck, 
  Bell, 
  LifeBuoy,
  Settings,
  LogOut,
  Menu,
  X,
  Search
} from 'lucide-react';

const EmployeeDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const empNavItems = [
    { name: 'Tickets', path: '/employee', icon: <Ticket size={20} /> },
    { name: 'Reports', path: '/employee/reports', icon: <FileStack size={20} /> },
    { name: 'Moderation', path: '/employee/moderation', icon: <ShieldCheck size={20} /> },
    { name: 'Notifications', path: '/employee/notifications', icon: <Bell size={20} /> },
    { name: 'Mentor Support', path: '/employee/mentor-support', icon: <LifeBuoy size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-emerald-950/20 border-r border-emerald-900/30 backdrop-blur-xl transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <img src="/favicon.png" alt="FinCash Favicon" className="w-full h-full object-contain" />
            </div>
            StaffHub
          </div>
          <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {empNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/employee'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-900/30">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all text-sm">
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button className="w-full mt-1 flex items-center gap-3 px-4 py-3 text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all text-sm font-bold">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-emerald-900/30 bg-slate-900/30 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Shift: <span className="text-emerald-500">Morning (GMT+5)</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-1.5 border border-emerald-900/20">
              <Search size={16} className="text-slate-400" />
              <input type="text" placeholder="Search tickets..." className="bg-transparent border-none outline-none text-xs w-48" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-200">John Employee</div>
                <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Moderator Level 2</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold shadow-lg shadow-emerald-600/20">
                JE
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-auto p-6 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.03),transparent_25%)]">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboardLayout;
