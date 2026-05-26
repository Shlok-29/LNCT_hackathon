import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Plus, Trash2, PieChart, Info } from 'lucide-react';

const BudgetLab = () => {
  const [income, setIncome] = useState(4000);
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Rent', amount: 1200, category: 'Needs' },
    { id: 2, name: 'Groceries', amount: 400, category: 'Needs' },
    { id: 3, name: 'Entertainment', amount: 200, category: 'Wants' },
    { id: 4, name: 'Savings', amount: 600, category: 'Savings' },
  ]);

  const [newItem, setNewItem] = useState({ name: '', amount: '', category: 'Needs' });

  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const remaining = income - totalExpenses;

  const categories = {
    Needs: expenses.filter(e => e.category === 'Needs').reduce((s, i) => s + Number(i.amount), 0),
    Wants: expenses.filter(e => e.category === 'Wants').reduce((s, i) => s + Number(i.amount), 0),
    Savings: expenses.filter(e => e.category === 'Savings').reduce((s, i) => s + Number(i.amount), 0),
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.amount) return;
    setExpenses([...expenses, { ...newItem, id: Date.now(), amount: Number(newItem.amount) }]);
    setNewItem({ name: '', amount: '', category: 'Needs' });
  };

  const removeItem = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Wallet className="text-emerald-400" size={32} />
            Budget Lab
          </h1>
          <p className="text-gray-400 mt-2">Interactive 50/30/20 Budgeting Simulation</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <label className="block text-sm font-semibold text-gray-300 mb-2">Monthly Net Income</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input 
                type="number" 
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl py-3 pl-8 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors text-lg font-semibold"
              />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-4">Add Expense</h3>
            <form onSubmit={addItem} className="flex gap-4">
              <input 
                type="text"
                placeholder="Expense Name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="flex-1 bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-white focus:border-emerald-500 outline-none"
              />
              <input 
                type="number"
                placeholder="Amount"
                value={newItem.amount}
                onChange={(e) => setNewItem({...newItem, amount: e.target.value})}
                className="w-24 bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-white focus:border-emerald-500 outline-none"
              />
              <select 
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="w-32 bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-white focus:border-emerald-500 outline-none"
              >
                <option value="Needs">Needs</option>
                <option value="Wants">Wants</option>
                <option value="Savings">Savings</option>
              </select>
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl transition-colors">
                <Plus size={24} />
              </button>
            </form>

            <div className="mt-8 space-y-3">
              {expenses.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-950 rounded-xl border border-gray-800">
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-md w-fit mt-1
                      ${item.category === 'Needs' ? 'bg-blue-500/20 text-blue-400' : 
                        item.category === 'Wants' ? 'bg-purple-500/20 text-purple-400' : 
                        'bg-emerald-500/20 text-emerald-400'}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">₹{item.amount}</span>
                    <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <PieChart className="text-indigo-400" /> Summary
            </h3>
            
            <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
              <span className="text-gray-400">Remaining</span>
              <span className={`text-3xl font-bold ${remaining < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                ₹{remaining}
              </span>
            </div>

            <div className="space-y-6">
              {/* Needs: Target 50% */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-blue-400">Needs (Target 50%)</span>
                  <span>₹{categories.Needs} / ₹{income * 0.5}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${Math.min((categories.Needs / (income || 1)) * 100, 100)}%`}}></div>
                </div>
              </div>

              {/* Wants: Target 30% */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-purple-400">Wants (Target 30%)</span>
                  <span>₹{categories.Wants} / ₹{income * 0.3}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${Math.min((categories.Wants / (income || 1)) * 100, 100)}%`}}></div>
                </div>
              </div>

              {/* Savings: Target 20% */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-emerald-400">Savings (Target 20%)</span>
                  <span>₹{categories.Savings} / ₹{income * 0.2}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${Math.min((categories.Savings / (income || 1)) * 100, 100)}%`}}></div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex gap-3">
              <Info className="text-indigo-400 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-indigo-200">
                The 50/30/20 rule is a simple budgeting framework: 50% for needs, 30% for wants, and 20% for savings or paying off debt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetLab;
