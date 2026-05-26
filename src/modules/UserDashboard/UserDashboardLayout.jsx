import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Wallet, FileText, TrendingUp, 
  Layers, MessageSquare, Users, Settings, LogOut,
  Menu, X, Bell, Search, PlayCircle, Calendar, User
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, logout } from '../../store/slices/authSlice';
import axios from 'axios';

const NavItem = ({ item, setSidebarOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavLink
        to={item.path}
        end={item.path === '/user'}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive 
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`
        }
        onClick={() => setSidebarOpen(false)}
      >
        {item.icon}
        <span className="font-medium">{item.name}</span>
      </NavLink>

      {/* Submenu on Hover */}
      {item.children && isHovered && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-full top-0 ml-4 w-56 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
          <div className="relative z-10">
            {item.children.map((child) => (
              <NavLink
                key={child.name}
                to={child.path}
                className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group/child"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover/child:bg-indigo-600 transition-colors">
                  {child.name.includes('Free') ? <PlayCircle size={14} /> : <Calendar size={14} />}
                </div>
                {child.name}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const UserDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated && !localStorage.getItem('token')) {
    return <Navigate to="/login" replace />;
  }
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await axios.get('https://fincash-1.onrender.com/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.isRead).length);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    const syncProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://fincash-1.onrender.com/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(updateProfile(response.data));
      } catch (error) {
        console.error("Profile sync failed:", error);
      }
    };
    syncProfile();
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // 30s refresh
    return () => clearInterval(interval);
  }, [dispatch]);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`https://fincash-1.onrender.com/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  const navItems = [
    { name: 'Dashboard', path: '/user', icon: <LayoutDashboard size={20} /> },
    { name: 'Budget Lab', path: '/user/budget', icon: <Wallet size={20} /> },
    { name: 'Tax Center', path: '/user/taxes', icon: <FileText size={20} /> },
    { name: 'Investments', path: '/user/investments', icon: <TrendingUp size={20} /> },
    { name: 'Simulations', path: '/user/simulations', icon: <Layers size={20} /> },
    { name: 'AI Mentor', path: '/user/ai-mentor', icon: <MessageSquare size={20} /> },
    { name: 'Profile', path: '/user/profile', icon: <User size={20} /> },
    { 
      name: 'Human Mentors', 
      path: '/human-mentor', 
      icon: <Users size={20} />,
      children: [
        { name: 'Free AI Videos', path: '/human-mentor/free' },
        { name: '1-on-1 Sessions', path: '/human-mentor/one-on-one' }
      ]
    },
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
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xl tracking-tight">
            <img src="/favicon.png" alt="FinCash Favicon" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
            FinCash
          </div>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Learning Paths
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} setSidebarOpen={setSidebarOpen} />
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-gray-800">
          <NavLink 
            to="/user/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </NavLink>
          <button 
            onClick={handleLogout}
            className="w-full mt-2 flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 flex items-center justify-between px-6 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 border border-gray-700 focus-within:border-indigo-500 transition-colors">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none outline-none text-sm w-64 placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 mr-4">
              <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-full text-sm font-bold border border-yellow-500/20">
                ⭐ Lvl {Math.floor((user?.xp || 0) / 100) + 1}
              </div>
              <div className="flex items-center gap-1.5 bg-orange-500/10 text-orange-500 px-3 py-1.5 rounded-full text-sm font-bold border border-orange-500/20">
                🔥 {user?.streak || 0} Day Streak
              </div>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 transition-colors ${showNotifications ? 'text-white bg-white/10 rounded-full' : 'text-gray-400 hover:text-white'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white border-2 border-gray-900">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl z-[100] overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm">Notifications</h3>
                        <span className="text-[10px] bg-indigo-600 px-2 py-0.5 rounded-full text-white font-black uppercase">{unreadCount} New</span>
                      </div>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div 
                            key={n._id}
                            onClick={() => !n.isRead && markAsRead(n._id)}
                            className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer relative ${!n.isRead ? 'bg-indigo-500/5' : 'opacity-60'}`}
                          >
                            {!n.isRead && <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full" />}
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="text-xs font-bold text-white mb-1">{n.title}</h4>
                              <span className="text-[9px] text-gray-500 font-bold whitespace-nowrap">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="text-[11px] text-gray-400 leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell size={32} className="text-gray-700 mx-auto mb-2 opacity-20" />
                          <p className="text-xs text-gray-500 font-bold">No notifications yet</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <NavLink to="/user/profile" className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 cursor-pointer block hover:scale-105 transition-transform">
              <div className="w-full h-full bg-gray-900 rounded-full border-2 border-gray-900 flex items-center justify-center overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`} alt="Avatar" />
              </div>
            </NavLink>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto bg-gray-950 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboardLayout;
