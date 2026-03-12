import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { Flame, Check, Dumbbell } from 'lucide-react';

const greetings = [
  "The forge awaits.",
  "Another day to honor your discipline.",
  "Consistency builds strength."
];

const Embers = () => {
  const [embers, setEmbers] = useState<{ id: number; size: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate embers only on client side to avoid hydration mismatch if SSR was used,
    // but also to keep it clean.
    const newEmbers = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
    }));
    setEmbers(newEmbers);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute bottom-0 rounded-full bg-orange-500/60"
          style={{
            width: ember.size,
            height: ember.size,
            left: `${ember.left}%`,
            boxShadow: '0 0 10px 2px rgba(249, 115, 22, 0.4)',
          }}
          animate={{
            y: ['0vh', '-100vh'],
            x: ['0px', `${(Math.random() - 0.5) * 100}px`],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export function TodayDashboard() {
  const { identityStatement, disciplines, completions, setSelectedDisciplineId, setIsReflectingDaily, dailyReflections } = useStore();
  const [toast, setToast] = useState<string | null>(null);
  const [greeting] = useState(() => greetings[Math.floor(Math.random() * greetings.length)]);

  const today = new Date().toISOString().split('T')[0];
  const existingReflection = dailyReflections.find(r => r.date === today);
  
  // Only count active disciplines for today's progress
  const activeDisciplines = disciplines.filter(d => d.status === 'active');
  const completedCount = activeDisciplines.filter(d => completions[d.id]?.includes(today)).length;
  const totalCount = activeDisciplines.length;
  const allCompleted = totalCount > 0 && completedCount === totalCount;

  const prevCompletedCountRef = useRef(completedCount);

  useEffect(() => {
    if (completedCount > prevCompletedCountRef.current) {
      setToast("Discipline honored. The forge burns brighter.");
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
    prevCompletedCountRef.current = completedCount;
  }, [completedCount]);

  const handleDisciplineClick = (id: string) => {
    if (completions[id]?.includes(today)) return; // Already completed
    setSelectedDisciplineId(id);
  };

  const progressPercentage = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
  const strokeDasharray = 552.92;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progressPercentage) / 100;

  return (
    <div className="flex flex-col w-full">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-surface-dark border border-primary/30 text-slate-100 px-6 py-3 rounded-full shadow-2xl shadow-primary/20 z-50 flex items-center gap-3 w-max max-w-[90vw]"
          >
            <Flame className="text-primary w-5 h-5 shrink-0" />
            <span className="font-medium text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Center Stage */}
      <div className="flex flex-col p-6 items-center relative overflow-hidden min-h-[360px] justify-center">
        <Embers />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none z-0"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-6 w-full">
          <p className="text-primary/70 text-sm font-medium italic tracking-wide">{greeting}</p>
          
          <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle className="text-primary/10" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="8"></circle>
              <circle 
                className="text-primary transition-all duration-1000 ease-out" 
                cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" 
                strokeDasharray={strokeDasharray} 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round" strokeWidth="8"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-40 w-40 border-4 border-background-dark shadow-2xl shadow-orange-500/20" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARJUuU6YzjRSLgZpZTSKSffMKRvSmR_3CFCoLncQgB-ZQwg_EpTutpz8phHFIfDsbshxiTWuHKS03BoQwq4HliR4hkv4P5MTkzqtv8zU5_ZyI1R9CRI7lkfxcaxADdg6MT7aBndzyWmcnrqpX5-Jl28AWhes8hjduWJIwz0nJSwwlRk3wNJp8Nny-3Cwbu_HUklg9JRJeZvna8vMfaVQGS6uDyNqU2vWqfx-rMxgy6krcWxAZwtZnjID2YSMDd0hauO9UU06jJpuWk")' }}
              ></div>
            </div>
            <div className="absolute -bottom-2 bg-primary text-background-dark px-4 py-1 rounded-full font-bold text-sm shadow-lg">
              LEVEL 1
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <h1 className="text-slate-100 text-3xl font-bold tracking-tight">
              {allCompleted ? "Victorious" : completedCount > 0 ? "Determined" : "Focused"}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Flame className="text-primary w-4 h-4" />
              <p className="text-primary text-base font-semibold">
                {allCompleted ? "You honored every discipline today." : "Your training continues."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Identity Banner */}
      <div className="px-6 py-2 w-full text-center mb-6">
        <p className="text-primary/60 text-xs font-bold uppercase tracking-widest mb-2">Who you are becoming</p>
        <p className="text-slate-300 text-base italic font-medium max-w-sm mx-auto">"{identityStatement}"</p>
      </div>

      {/* Forge Progress Section */}
      <div className="px-6 py-4 text-center">
        <h3 className="text-primary/60 text-xs font-bold uppercase tracking-widest mb-2">Forge Progress</h3>
        <p className="text-slate-100 text-lg font-bold">{completedCount} / {totalCount} disciplines honored</p>
      </div>

      {/* Daily Disciplines */}
      <div className="px-6 pt-4 pb-8">
        <div className="flex flex-col gap-3">
          {activeDisciplines.map((discipline) => {
            const isCompleted = completions[discipline.id]?.includes(today);
            
            return (
              <motion.div 
                key={discipline.id}
                layout
                onClick={() => handleDisciplineClick(discipline.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  isCompleted 
                    ? 'bg-primary/5 border-primary/30 opacity-70' 
                    : 'bg-surface-dark border-primary/10 hover:border-primary/30'
                }`}
              >
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${
                  isCompleted ? 'bg-primary text-background-dark' : 'bg-primary/20 text-primary'
                }`}>
                  <Dumbbell className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`font-bold truncate ${isCompleted ? 'text-slate-300 line-through' : 'text-slate-100'}`}>
                    {discipline.name}
                  </p>
                  <p className="text-slate-500 text-xs truncate">
                    {discipline.cue} → {discipline.action}
                  </p>
                </div>
                
                <div 
                  className={`flex items-center justify-center size-8 shrink-0 rounded-full border-2 transition-all ${
                    isCompleted 
                      ? 'border-primary bg-primary text-background-dark' 
                      : 'border-primary/30 text-transparent'
                  }`}
                >
                  <Check className="w-5 h-5" />
                </div>
              </motion.div>
            );
          })}
          
          {activeDisciplines.length === 0 && (
            <div className="text-center py-8 text-slate-500 italic">
              No active disciplines. Forge a new one in the Training tab.
            </div>
          )}
        </div>
      </div>

      {/* Evening Reflection */}
      <div className="px-6 pb-12">
        <div className="bg-surface-dark border border-primary/10 rounded-xl p-5">
          <h3 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Evening Reflection</h3>
          <p className="text-slate-400 text-sm mb-4">What did you learn about your discipline today?</p>
          <button 
            onClick={() => setIsReflectingDaily(true)}
            className="w-full bg-background-dark border border-primary/30 hover:border-primary/60 text-slate-300 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-primary" />
            {existingReflection ? 'Update Reflection' : 'Begin Reflection'}
          </button>
        </div>
      </div>
    </div>
  );
}
