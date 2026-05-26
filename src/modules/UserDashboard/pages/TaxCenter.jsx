import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calculator, AlertTriangle } from 'lucide-react';

const TaxCenter = () => {
  const [income, setIncome] = useState(65000);
  const [status, setStatus] = useState('single');

  // Simplified US Tax brackets for 2024 (Single)
  const singleBrackets = [
    { rate: 0.10, max: 11600 },
    { rate: 0.12, max: 47150 },
    { rate: 0.22, max: 100525 },
    { rate: 0.24, max: 191950 },
    { rate: 0.32, max: 243725 },
  ];

  // Simplified US Tax brackets for 2024 (Married)
  const marriedBrackets = [
    { rate: 0.10, max: 23200 },
    { rate: 0.12, max: 94300 },
    { rate: 0.22, max: 201050 },
    { rate: 0.24, max: 383900 },
    { rate: 0.32, max: 487450 },
  ];

  const standardDeduction = status === 'single' ? 14600 : 29200;
  const taxableIncome = Math.max(0, income - standardDeduction);

  const calculateTax = () => {
    let tax = 0;
    let remainingIncome = taxableIncome;
    let prevMax = 0;
    const brackets = status === 'single' ? singleBrackets : marriedBrackets;

    for (let b of brackets) {
      if (remainingIncome > 0) {
        const taxableAtThisRate = Math.min(remainingIncome, b.max - prevMax);
        tax += taxableAtThisRate * b.rate;
        remainingIncome -= taxableAtThisRate;
        prevMax = b.max;
      } else {
        break;
      }
    }
    // Add top bracket if still remaining
    if (remainingIncome > 0) {
      tax += remainingIncome * 0.35;
    }
    return tax;
  };

  const estimatedTax = calculateTax();
  const effectiveRate = income > 0 ? (estimatedTax / income) * 100 : 0;
  const marginalRate = status === 'single' 
    ? singleBrackets.find(b => taxableIncome <= b.max)?.rate || 0.35
    : marriedBrackets.find(b => taxableIncome <= b.max)?.rate || 0.35;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="text-orange-400" size={32} />
            Tax Center
          </h1>
          <p className="text-gray-400 mt-2">Estimate your federal income tax based on 2024 brackets.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Input Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-lg font-bold border-b border-gray-800 pb-4">
            <Calculator className="text-indigo-400" /> Tax Calculator
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Filing Status</label>
            <div className="flex gap-4">
              <button 
                onClick={() => setStatus('single')}
                className={`flex-1 py-3 rounded-xl font-medium border transition-all ${status === 'single' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' : 'bg-gray-950 border-gray-700 text-gray-400 hover:border-gray-500'}`}
              >
                Single
              </button>
              <button 
                onClick={() => setStatus('married')}
                className={`flex-1 py-3 rounded-xl font-medium border transition-all ${status === 'married' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' : 'bg-gray-950 border-gray-700 text-gray-400 hover:border-gray-500'}`}
              >
                Married (Joint)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Gross Annual Income</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input 
                type="number" 
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl py-4 pl-8 pr-4 text-white focus:outline-none focus:border-orange-500 transition-colors text-xl font-bold"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">Standard Deduction applied: ₹{standardDeduction.toLocaleString()}</p>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-orange-900/40 to-red-900/20 border border-orange-500/20 rounded-3xl p-6 flex flex-col justify-center">
          <h3 className="text-gray-300 font-medium mb-2 text-center uppercase tracking-widest text-sm">Estimated Federal Tax</h3>
          <div className="text-5xl md:text-6xl font-bold text-center text-white mb-8">
            ₹{estimatedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900/60 p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-gray-400 text-sm mb-1">Effective Tax Rate</div>
              <div className="text-2xl font-bold text-orange-400">{effectiveRate.toFixed(1)}%</div>
            </div>
            <div className="bg-gray-900/60 p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-gray-400 text-sm mb-1">Marginal Bracket</div>
              <div className="text-2xl font-bold text-red-400">{(marginalRate * 100).toFixed(0)}%</div>
            </div>
          </div>

          <div className="mt-8 flex gap-3 text-sm text-orange-200 bg-orange-500/10 p-4 rounded-xl">
            <AlertTriangle className="shrink-0 text-orange-400" size={20} />
            <p>
              Your <strong>Marginal Rate</strong> is the tax you pay on your <em>last</em> dollar earned. 
              Your <strong>Effective Rate</strong> is the actual percentage of your total income paid in taxes.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaxCenter;
