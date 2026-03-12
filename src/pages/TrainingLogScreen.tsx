import React, { useState } from 'react';
import { ArrowLeft, Dumbbell, Target, Repeat, ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';

export function TrainingLogScreen() {
  const { disciplines, selectedDisciplineId, setSelectedDisciplineId, honorDisciplineWithValue } = useStore();
  const [inputValue, setInputValue] = useState<string>('');
  const [isHonored, setIsHonored] = useState(false);

  const discipline = disciplines.find(d => d.id === selectedDisciplineId);

  if (!discipline) {
    return null;
  }

  // Try to extract a number from the action to use as a target, default to 1
  const targetMatch = discipline.action.match(/\d+/);
  const targetNumber = targetMatch ? parseInt(targetMatch[0], 10) : 1;
  
  // Extract the action text without the number for the prompt
  let actionText = 'times';
  if (targetMatch) {
    actionText = discipline.action.replace(targetMatch[0], '').trim();
  }

  const enteredValue = parseInt(inputValue, 10) || 0;
  const isExceeded = enteredValue > targetNumber;
  const isMissed = enteredValue < targetNumber;

  const handleHonor = () => {
    if (isMissed) {
      // Show the missed state
      setIsHonored(true);
    } else {
      honorDisciplineWithValue(discipline.id, enteredValue);
      setIsHonored(true);
    }
  };

  const handleRecordMissed = () => {
    // We don't record a completion, just close the screen
    setSelectedDisciplineId(null);
  };

  const handleContinueTraining = () => {
    setIsHonored(false);
    setInputValue('');
  };

  // Generate quick select values based on target
  const quickValues = Array.from(new Set([
    targetNumber,
    targetNumber * 2,
    targetNumber * 3,
    targetNumber * 5
  ])).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-slate-100">
      {/* Top Navigation */}
      <nav className="flex items-center p-4 justify-between border-b border-primary/10">
        <button 
          onClick={() => setSelectedDisciplineId(null)}
          className="text-primary flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-primary/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-widest flex-1 text-center uppercase">
          Reflection
        </h2>
        <div className="size-10"></div> {/* Spacer for symmetry */}
      </nav>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto px-6 py-8 bg-gradient-to-b from-primary/5 to-transparent">
        {/* Header Section */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-6">
            <Dumbbell className="w-8 h-8 text-primary" />
          </div>
          <p className="text-primary/70 text-sm font-medium uppercase tracking-[0.2em] mb-2">Your vow today</p>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{discipline.action}</h1>
        </header>

        {/* Input Section */}
        <div className="max-w-md mx-auto space-y-8">
          <AnimatePresence mode="wait">
            {!isHonored ? (
              <motion.div 
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-primary/5 border border-primary/20 p-8 rounded-xl backdrop-blur-sm"
              >
                <label className="block text-center text-slate-200 text-lg font-medium mb-6" htmlFor="amount">
                  How many {actionText} did you perform?
                </label>
                
                <div className="relative max-w-[120px] mx-auto mb-8">
                  <input 
                    id="amount"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-primary/30 focus:border-primary text-center text-4xl font-bold py-2 focus:ring-0 text-slate-100 transition-colors placeholder-primary/20 outline-none"
                    placeholder="0"
                  />
                </div>
                
                <div className="flex justify-center gap-3 mb-8">
                  {quickValues.map((val) => (
                    <button 
                      key={val}
                      onClick={() => setInputValue(val.toString())}
                      className="size-12 rounded-full border border-primary/30 text-primary text-sm font-bold flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all"
                    >
                      {val}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={handleHonor}
                  disabled={inputValue === ''}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary text-background-dark font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Record Training
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="feedback"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-3 px-4 py-8"
              >
                {isMissed ? (
                  <>
                    <div className="flex items-center justify-center gap-2 text-primary mb-4">
                      <ShieldAlert className="w-8 h-8" />
                      <p className="font-bold uppercase tracking-widest text-lg">Vow Not Fulfilled</p>
                    </div>
                    <p className="text-slate-300 text-lg mb-6">
                      Your vow was not fulfilled.
                    </p>
                    <div className="flex flex-col gap-4 mt-8">
                      <button 
                        onClick={handleContinueTraining}
                        className="w-full bg-primary text-background-dark font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-sm"
                      >
                        Continue Training
                      </button>
                      <button 
                        onClick={handleRecordMissed}
                        className="w-full bg-transparent border border-primary/30 text-primary font-bold py-4 rounded-lg transition-all uppercase tracking-widest text-sm hover:bg-primary/10"
                      >
                        Record as Missed Day
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-2 text-primary mb-4">
                      <ShieldCheck className="w-8 h-8" />
                      <p className="font-bold uppercase tracking-widest text-lg">Discipline Honored</p>
                    </div>
                    
                    <p className="text-slate-300 text-lg mb-6">
                      {isExceeded 
                        ? "You exceeded your vow."
                        : "You kept your word."}
                    </p>
                    
                    <div className="pt-8 border-t border-primary/10 mt-8">
                      <p className="text-sm text-primary/60 italic leading-relaxed mb-8">
                        "The vow is small so you never fail.<br/>Anything beyond it is a bonus."
                      </p>
                      <button 
                        onClick={() => setSelectedDisciplineId(null)}
                        className="w-full bg-primary text-background-dark font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-sm"
                      >
                        Return to the Forge
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
