import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, BrainCircuit, Wallet, Sparkles, Send, Loader2 } from 'lucide-react';
import axios from 'axios';

const AssessmentFlow = ({ video, onClose }) => {
  const [step, setStep] = useState('quiz'); // quiz -> assignment -> result
  const [quizAnswers, setQuizAnswers] = useState({});
  const [assignment, setAssignment] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const quizQuestions = video.quiz || [
    {
      id: 1,
      question: "Default Question: What is the main topic of this video?",
      options: ["Finance", "Technology", "Health", "Leisure"],
      correct: 0
    }
  ];

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('assignment');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAssignmentSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const profileRes = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const score = Object.keys(quizAnswers).filter(idx => quizAnswers[idx] === quizQuestions[idx].correct).length;

      const response = await axios.post('http://localhost:8000/api/evaluate', {
        quiz_score: score,
        total_questions: quizQuestions.length,
        assignment_text: assignment,
        user_savings: (profileRes.data.salary || 50000) * 3,
        user_salary: profileRes.data.salary || 50000,
        video_title: video.title
      });

      setAiResult(response.data);
      setStep('result');
    } catch (err) {
      console.error("Evaluation failed:", err);
      setAiResult({
        suggestion: "Your financial profile suggests a balanced approach. We recommend allocating 40% to Mutual Funds and 60% to safe debt instruments until you build a stronger cushion.",
        type: "Balanced Portfolio"
      });
      setStep('result');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          {step === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 md:p-12 space-y-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                    <BrainCircuit size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Knowledge Check</h2>
                    <p className="text-gray-400 text-sm">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                  </div>
                </div>
                <div className="text-xs font-black text-indigo-400 uppercase tracking-widest bg-indigo-400/5 px-4 py-2 rounded-full border border-indigo-400/20">
                  {Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}% Complete
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                  className="h-full bg-indigo-500"
                />
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-xl font-bold text-white leading-relaxed">{quizQuestions[currentQuestionIndex].question}</p>
                  <div className="grid grid-cols-1 gap-3">
                    {quizQuestions[currentQuestionIndex].options.map((opt, optIdx) => (
                      <button 
                        key={optIdx}
                        onClick={() => setQuizAnswers({...quizAnswers, [currentQuestionIndex]: optIdx})}
                        className={`p-5 rounded-2xl border text-left text-sm font-bold transition-all flex items-center justify-between group ${
                          quizAnswers[currentQuestionIndex] === optIdx 
                            ? 'bg-indigo-600 border-indigo-500 text-white' 
                            : 'bg-slate-950 border-white/5 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {opt}
                        {quizAnswers[currentQuestionIndex] === optIdx && <CheckCircle2 size={18} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1 py-4 bg-slate-950 text-gray-500 rounded-2xl font-black text-sm border border-white/5 hover:text-white disabled:opacity-0 transition-all"
                >
                  Previous
                </button>
                <button 
                  onClick={handleNext}
                  disabled={quizAnswers[currentQuestionIndex] === undefined}
                  className="flex-[2] py-4 bg-white text-slate-950 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'assignment' && (
            <motion.div 
              key="assignment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 md:p-12 space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Final Assignment</h2>
                  <p className="text-gray-400 text-sm">Briefly describe your financial goal for the next 12 months.</p>
                </div>
              </div>

              <div className="space-y-4">
                <textarea 
                  rows={6}
                  value={assignment}
                  onChange={(e) => setAssignment(e.target.value)}
                  placeholder="e.g. I want to save ₹50,000 for a downpayment while clearing my credit card debt..."
                  className="w-full bg-slate-950 border border-white/5 rounded-3xl p-6 text-white text-lg focus:outline-none focus:border-indigo-500 transition-all resize-none"
                />
              </div>

              <button 
                onClick={handleAssignmentSubmit}
                disabled={loading || assignment.length < 10}
                className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-black text-lg hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <><Loader2 className="animate-spin" size={24} /> AI Evaluating...</> : <><Send size={24} /> Submit & Get AI Advice</>}
              </button>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12 space-y-8 text-center"
            >
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-600/40">
                  <Sparkles size={40} />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white">AI Recommendation</h2>
                <div className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-xs">{aiResult?.type}</div>
              </div>

              <div className="bg-slate-950/50 border border-white/5 rounded-[2rem] p-8 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Wallet size={80} />
                </div>
                <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                  {aiResult?.suggestion}
                </p>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-5 bg-white text-slate-950 rounded-3xl font-black text-lg hover:bg-gray-200 transition-all"
              >
                Finish Session
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssessmentFlow;
