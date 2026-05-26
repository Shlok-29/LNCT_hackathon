import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Sparkles, Plus, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AIMentor = () => {
  const { user } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: `Hello ${user?.name?.split(' ')[0] || 'User'}! I'm your FinCash AI Mentor. I can help you with budgeting, tax optimization, or investment strategies. What's on your mind today?`,
      time: '12:00 PM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Map frontend roles to OpenAI roles
      const history = messages.map(m => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.content
      }));

      const response = await axios.post('http://localhost:8000/api/chat', {
        message: input,
        history: history
      });

      const botResponse = {
        id: Date.now() + 1,
        role: 'bot',
        content: response.data.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      console.error("AI Mentor Error:", err);
      const errorMsg = {
        id: Date.now() + 1,
        role: 'bot',
        content: "I'm having trouble connecting to my brain right now. Please try again in a moment.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-[calc(100vh-6rem)] flex flex-col bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gray-900/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Bot size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Financial Mentor</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider">Online & Analyzing</span>
            </div>
          </div>
        </div>
        <button className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all border border-transparent hover:border-gray-700">
          <Plus size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent_40%)]">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                  msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-indigo-400 border border-gray-700'
                }`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`space-y-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-gray-900/80 backdrop-blur-md border-t border-gray-800">
        <form onSubmit={handleSend} className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your mentor about budgeting, taxes, or 401ks..."
            className="w-full bg-gray-950 border border-gray-700 rounded-2xl py-4 pl-6 pr-16 text-white focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-600 disabled:opacity-50"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-indigo-400 transition-colors"
            >
              <Sparkles size={20} />
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-[10px] text-gray-600 uppercase font-bold tracking-widest">
          AI Mentors can make mistakes. Verify important financial data.
        </p>
      </div>
    </motion.div>
  );
};

export default AIMentor;
