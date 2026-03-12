import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { ArrowLeft, Shield, Dumbbell, Flame, Swords } from 'lucide-react';

export function VowScreen() {
  const { disciplines, speakFirstVow } = useStore();
  const [step, setStep] = useState<0 | 1 | 2>(0);

  // Get the most recently created discipline
  const currentDiscipline = disciplines[disciplines.length - 1];

  const handleCommit = () => {
    // Step 1: The Seal
    setStep(1);
    
    // Step 2: The Breath
    setTimeout(() => {
      setStep(2);
    }, 4000); // 4 seconds of "The oath is sealed"
    
    // Step 3: Enter the Main App
    setTimeout(() => {
      speakFirstVow();
    }, 7000); // 3 seconds of "Take a breath"
  };

  if (!currentDiscipline) return null;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-dark font-display text-slate-100 antialiased">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="vow-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            className="flex flex-col flex-1"
          >
            {/* Header / TopAppBar */}
            <header className="flex items-center bg-background-dark p-4 pb-2 justify-between border-b border-primary/10">
              <button 
                className="text-slate-100 flex size-12 shrink-0 items-center justify-center hover:bg-primary/10 rounded-full transition-colors"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12 uppercase tracking-widest">
                Warrior Vow
              </h2>
            </header>

            {/* Progress Tracking */}
            <div className="flex flex-col gap-3 p-6 bg-surface-dark/40">
              <div className="flex gap-6 justify-between items-end">
                <p className="text-primary text-sm font-bold uppercase tracking-widest">Training Progress</p>
                <p className="text-slate-400 text-sm font-medium">Step 4 of 5</p>
              </div>
              <div className="rounded-full bg-primary/20 h-2 overflow-hidden">
                <div className="h-full rounded-full bg-primary" style={{ width: '80%' }}></div>
              </div>
            </div>

            <main className="flex-1 flex flex-col items-center">
              {/* Hero Image Container */}
              <div className="w-full @container">
                <div className="@[480px]:px-6 @[480px]:py-4">
                  <div 
                    className="relative w-full aspect-video md:aspect-[21/9] bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden @[480px]:rounded-xl shadow-2xl shadow-primary/10" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4AX2NV8vuT3dFm7R9nZ-qHUEZZop_zop6S9fve9Q1uMzzPNPIUaOl31qPGEWojP6TAMbh_i9iGNQ3Wo7eAcaveqldxy1f-szUa5JLEcbvD4QPM3u_0JkTIqWWK5ZiF_ieqp88dTibe_-af-5rT7qk9F5afso1PLX2zbSNzEXnA7MU211jkg-jGz-74YirGoduKnTTtzuvt7Fn7f2_1jWK4goSVQ5psHBHiaZuAHh9hy4gs832fgvPixqoQsFXy08qbeQoK7IjZCbJ")' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="max-w-2xl w-full px-6 py-10 flex flex-col items-center text-center">
                <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-4 px-3 py-1 border border-primary/30 rounded-full bg-primary/5">
                  The Discipline
                </span>
                <h1 className="text-slate-100 tracking-tight text-4xl md:text-6xl font-bold leading-none pb-6 uppercase italic">
                  Speak Your <span className="text-primary">Vow</span>
                </h1>
                <div className="w-16 h-1 bg-primary mb-8 rounded-full"></div>
                
                {/* The Discipline Reminder */}
                <div className="bg-surface-dark/40 border border-primary/20 p-6 rounded-xl mb-8 w-full max-w-md">
                  <p className="text-slate-300 text-lg font-medium leading-relaxed italic">
                    "When <span className="text-primary font-bold">{currentDiscipline.cue.toLowerCase()}</span>, 
                    I will <span className="text-primary font-bold">{currentDiscipline.action.toLowerCase()}</span> 
                    at <span className="text-primary font-bold">{currentDiscipline.location.toLowerCase()}</span>."
                  </p>
                </div>

                {/* Ceremonial Message */}
                <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-lg mb-12 italic">
                  "In the presence of discipline, let these words mark the beginning. Small acts repeated each day forge the person you are becoming."
                </p>

                {/* Action Button */}
                <button 
                  onClick={handleCommit}
                  className="group relative w-full md:w-auto px-12 py-5 bg-primary hover:bg-primary/90 text-background-dark font-bold text-lg uppercase tracking-widest rounded-lg transition-all transform active:scale-95 overflow-hidden shadow-[0_0_30px_rgba(244,140,37,0.3)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Commit to the Oath
                    <Shield className="w-6 h-6 fill-background-dark" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>

              {/* Detail Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-12 w-full max-w-5xl">
                <div className="p-6 rounded-xl bg-surface-dark/60 border border-primary/10 flex flex-col items-center text-center">
                  <Dumbbell className="text-primary mb-3 w-8 h-8" />
                  <h3 className="font-bold text-slate-100 uppercase text-xs tracking-tighter mb-1">Strength</h3>
                  <p className="text-slate-400 text-sm italic">Body like iron</p>
                </div>
                <div className="p-6 rounded-xl bg-surface-dark/60 border border-primary/10 flex flex-col items-center text-center">
                  <Flame className="text-primary mb-3 w-8 h-8" />
                  <h3 className="font-bold text-slate-100 uppercase text-xs tracking-tighter mb-1">Discipline</h3>
                  <p className="text-slate-400 text-sm italic">Mind like water</p>
                </div>
                <div className="p-6 rounded-xl bg-surface-dark/60 border border-primary/10 flex flex-col items-center text-center">
                  <Swords className="text-primary mb-3 w-8 h-8" />
                  <h3 className="font-bold text-slate-100 uppercase text-xs tracking-tighter mb-1">Honor</h3>
                  <p className="text-slate-400 text-sm italic">Soul of fire</p>
                </div>
              </div>
            </main>
            
            {/* Spacer for bottom padding if needed */}
            <div className="h-10 bg-background-dark"></div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="sealed-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-50 bg-background-dark"
          >
            <Shield className="w-16 h-16 text-primary mb-8 opacity-80" />
            <h2 className="text-4xl font-bold text-slate-100 uppercase tracking-widest mb-6">
              The oath is sealed.
            </h2>
            <p className="text-xl text-slate-400 italic max-w-md leading-relaxed">
              Your discipline has been forged.<br/>
              Return each day and honor it.
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="breath-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-50 bg-background-dark"
          >
            <h2 className="text-3xl font-bold text-slate-100 uppercase tracking-widest mb-6">
              Take a breath.
            </h2>
            <p className="text-xl text-primary italic max-w-md leading-relaxed">
              Your training begins now.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
