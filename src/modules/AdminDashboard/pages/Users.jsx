import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MoreVertical, ShieldAlert, CheckCircle2, XCircle, Unlock, Lock } from 'lucide-react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleEdit = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/toggle-edit/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error("Error toggling edit:", error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-slate-400 text-sm">Monitor and manage all platform participants.</p>
        </div>
        <button className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-rose-600/20">
          Export User Data
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Filter by name or email..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs focus:border-rose-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 outline-none">
              <option>All Plans</option>
              <option>Free</option>
              <option>Premium</option>
            </select>
            <select className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 outline-none">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-800/50 text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-800">
              <th className="px-6 py-4 font-bold">User</th>
              <th className="px-6 py-4 font-bold">Plan</th>
              <th className="px-6 py-4 font-bold">Joined</th>
              <th className="px-6 py-4 font-bold">Edit Perm.</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-800/30 transition-all group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold border border-slate-700">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-200">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-md border bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                    {user.salary ? 'Profile Set' : 'Incomplete'}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                    {user.canEditFinancials ? <Unlock size={14} className="text-emerald-500" /> : <Lock size={14} className="text-rose-500" />}
                    <span className={`text-xs font-bold ${user.canEditFinancials ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {user.canEditFinancials ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => toggleEdit(user._id)}
                    className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
                      user.canEditFinancials ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                  >
                    {user.canEditFinancials ? 'Revoke Edit' : 'Grant Edit'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 font-bold bg-slate-900/50">
          <div>Showing 1 - 5 of 12,842 users</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-md hover:text-white transition-all">Prev</button>
            <button className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-md hover:text-white transition-all">Next</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminUsers;
