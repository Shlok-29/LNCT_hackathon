import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Clock, MessageSquare, AlertCircle, ChevronRight } from 'lucide-react';

const EmployeeTickets = () => {
  const tickets = [
    { id: 'TCK-4821', user: 'Alex Thompson', subject: 'Tax simulation error', priority: 'High', status: 'Open', time: '12m ago' },
    { id: 'TCK-4822', user: 'Jessica Lee', subject: 'Account verification', priority: 'Medium', status: 'In Progress', time: '1h ago' },
    { id: 'TCK-4823', user: 'Michael Chen', subject: 'Budget Lab feedback', priority: 'Low', status: 'Open', time: '3h ago' },
    { id: 'TCK-4824', user: 'Sarah Wilson', subject: 'Investment withdrawal', priority: 'High', status: 'Open', time: '5h ago' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold">Support Queue</h1>
          <p className="text-slate-400 text-sm mt-1">Manage active support requests from platform users.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <div className="text-xl font-bold text-emerald-400">14</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">Pending</div>
          </div>
          <div className="text-center px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
            <div className="text-xl font-bold text-rose-400">3</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">Urgent</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket, idx) => (
          <motion.div 
            key={ticket.id}
            whileHover={{ x: 4 }}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-emerald-500/30 transition-all"
          >
            <div className="flex items-center gap-5">
              <div className={`p-3 rounded-xl ${
                ticket.priority === 'High' ? 'bg-rose-500/10 text-rose-500' : 
                ticket.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 
                'bg-emerald-500/10 text-emerald-500'
              }`}>
                <Ticket size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{ticket.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    ticket.status === 'Open' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>{ticket.status}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{ticket.subject}</h3>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><MessageSquare size={14} /> {ticket.user}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {ticket.time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Priority</span>
                <span className={`text-xs font-bold ${
                  ticket.priority === 'High' ? 'text-rose-400' : 
                  ticket.priority === 'Medium' ? 'text-amber-400' : 
                  'text-emerald-400'
                }`}>{ticket.priority}</span>
              </div>
              <button className="p-2 text-slate-600 group-hover:text-white transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl flex items-start gap-4">
        <AlertCircle className="text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-emerald-400 mb-1 text-sm">Employee Tip</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            High priority tickets involving financial transactions should be escalated to the Admin team if they remain unresolved for more than 4 hours.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeTickets;
