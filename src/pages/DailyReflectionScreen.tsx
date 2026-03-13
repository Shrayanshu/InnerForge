import React, { useState } from 'react';
import { X, Calendar, Shield, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';

export function DailyReflectionScreen() {
  const { setIsReflectingDaily, addDailyReflection, dailyReflections, setActiveTab } = useStore();
  
  const today = new Date().toISOString().split('T')[0];
  const existingReflection = dailyReflections.find(r => r.date === today);

  const [honored, setHonored] = useState(existingReflection?.honored || '');
  const [struggle, setStruggle] = useState(existingReflection?.struggle || '');
  const [improve, setImprove] = useState(existingReflection?.improve || '');

  const handleSealEntry = () => {
    addDailyReflection({ honored, struggle, improve });
    setIsReflectingDaily(false);
    setActiveTab('progress');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-slate-100">
      {/* Header */}
      <header className="flex items-center p-4 sticky top-0 z-10 border-b border-primary/10 bg-background-dark">
        <button 
          onClick={() => setIsReflectingDaily(false)}
          className="flex size-12 shrink-0 items-center justify-start text-slate-100 hover:text-primary transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-widest flex-1 text-center uppercase">
          Daily Reflection
        </h1>
        <div className="flex size-12 items-center justify-end">
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Progress Section */}
        <div className="flex flex-col gap-3 p-6 bg-primary/5">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest">Reflection Phase</p>
              <p className="text-slate-100 text-xl font-bold leading-tight">
                Integrating the Day's Lessons
              </p>
            </div>
            <p className="text-primary text-sm font-bold leading-normal">1 / 1</p>
          </div>
          <div className="rounded-full bg-primary/20 h-2 w-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full bg-primary" 
              initial={{ width: 0 }}
              animate={{ width: `100%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Hero Title */}
        <div className="px-6 py-8 text-center">
          <h2 className="text-slate-100 tracking-tight text-3xl font-bold leading-tight mb-2">Warrior's Review</h2>
          <p className="text-slate-400 text-sm italic">Silence the world. Honor your truth.</p>
        </div>

        {/* Reflection Questions */}
        <div className="px-6 space-y-8">
          {/* Question 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="text-primary w-6 h-6" />
              <h3 className="text-slate-100 text-lg font-bold leading-tight">What discipline did you honor?</h3>
            </div>
            <textarea 
              value={honored}
              onChange={(e) => setHonored(e.target.value)}
              className="w-full bg-primary/5 border border-primary/20 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none min-h-[120px] placeholder:text-slate-600" 
              placeholder="Reflect on your strength today..."
            />
          </section>

          {/* Question 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Zap className="text-primary w-6 h-6" />
              <h3 className="text-slate-100 text-lg font-bold leading-tight">Where did you struggle?</h3>
            </div>
            <textarea 
              value={struggle}
              onChange={(e) => setStruggle(e.target.value)}
              className="w-full bg-primary/5 border border-primary/20 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none min-h-[120px] placeholder:text-slate-600" 
              placeholder="Identify the friction points..."
            />
          </section>

          {/* Question 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-primary w-6 h-6" />
              <h3 className="text-slate-100 text-lg font-bold leading-tight">What will you improve?</h3>
            </div>
            <textarea 
              value={improve}
              onChange={(e) => setImprove(e.target.value)}
              className="w-full bg-primary/5 border border-primary/20 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none min-h-[120px] placeholder:text-slate-600" 
              placeholder="Commit to tomorrow's growth..."
            />
          </section>

          {/* Submit Action */}
          <div className="pt-4 pb-8">
            <button 
              onClick={handleSealEntry}
              disabled={!honored && !struggle && !improve}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary text-background-dark font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
            >
              {existingReflection ? 'Update Reflection' : "Seal Today's Entry"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
