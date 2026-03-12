import React, { useState } from 'react';
import { ArrowLeft, Share2, Dumbbell, Zap, Trophy, Timer, Quote, Edit3, TrendingUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import { calculateXP } from '../utils/xp';

export function WeeklyEvaluationScreen() {
  const { setIsReflectingWeekly, addWeeklyReflection, disciplines, completions, dailyReflections, weeklyReflections } = useStore();
  const [isRecording, setIsRecording] = useState(false);
  const [reflection, setReflection] = useState('');

  const activeDisciplines = disciplines.filter(d => d.status === 'active');
  const totalDisciplines = activeDisciplines.length;

  // Calculate Last 7 Days Completions
  let last7DaysCompletions = 0;
  const possibleWeeklyCompletions = totalDisciplines * 7;
  
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().split('T')[0];
    
    activeDisciplines.forEach(disc => {
      if (completions[disc.id]?.includes(dStr)) {
        last7DaysCompletions++;
      }
    });
  }

  const weeklyCompletionPercent = possibleWeeklyCompletions === 0 
    ? 0 
    : Math.round((last7DaysCompletions / possibleWeeklyCompletions) * 100);

  // Calculate Total XP
  const { totalXp } = calculateXP(completions, dailyReflections, weeklyReflections);

  // Calculate Days with at least one workout this week
  let daysWithWorkout = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().split('T')[0];
    
    const hasWorkout = activeDisciplines.some(disc => completions[disc.id]?.includes(dStr));
    if (hasWorkout) daysWithWorkout++;
  }

  const handleRecord = () => {
    if (isRecording && reflection) {
      addWeeklyReflection({ reflection });
      setIsReflectingWeekly(false);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-slate-100">
      {/* Header */}
      <header className="flex items-center p-4 pb-2 justify-between sticky top-0 z-50 border-b border-primary/10 bg-background-dark">
        <button 
          onClick={() => setIsReflectingWeekly(false)}
          className="text-primary flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-primary/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-widest flex-1 text-center uppercase">
          Weekly Evaluation
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {/* Hero Progress Section */}
        <div className="flex p-6">
          <div className="flex w-full flex-col gap-6 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full"></div>
              <div 
                className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4 border-primary/30 p-1 min-h-32 w-32 overflow-hidden bg-background-dark/50" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuApHAvaD1QsCsTYnVc9kcEPLW_1h-PE_gu1WBUzwjqWPyd0dA80oNHopgw8aD0pbMT44vCG3kYrSVfbfJVEqaEI72M1LpXN6pws0X7MCL4oR0mJzPj68lQr_D2iktrnLbHHyv5wp4yryhou8mb-r6nVHpHraJqyACCoi8LFavxIiQE0d46gIrEwWrHcRzj5YTVHsrSnS49zcoVejXpvV3qUhnA_JJ8A6fRz-MumDxkW7B-TD1ZqwMzXBjsGTfMymwCdX5eKp130_a-y")' }}
              ></div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <p className="text-slate-100 text-2xl font-bold leading-tight tracking-tight text-center">Champion's Ascent</p>
              <p className="text-primary text-base font-medium leading-normal text-center">The Crucible of Discipline</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 px-4 py-2">
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2">
              <Dumbbell className="text-primary w-4 h-4" />
              <p className="text-slate-400 text-sm font-medium">Active Days</p>
            </div>
            <p className="text-slate-100 text-2xl font-bold">{daysWithWorkout} / 7</p>
          </div>
          
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2">
              <Zap className="text-primary w-4 h-4" />
              <p className="text-slate-400 text-sm font-medium">Intensity</p>
            </div>
            <p className="text-slate-100 text-2xl font-bold">{weeklyCompletionPercent}%</p>
          </div>
          
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2">
              <Trophy className="text-primary w-4 h-4" />
              <p className="text-slate-400 text-sm font-medium">Total XP</p>
            </div>
            <p className="text-slate-100 text-2xl font-bold">{totalXp}</p>
          </div>
          
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2">
              <Timer className="text-primary w-4 h-4" />
              <p className="text-slate-400 text-sm font-medium">Focus Time</p>
            </div>
            <p className="text-slate-100 text-2xl font-bold">{last7DaysCompletions * 0.5}h</p>
          </div>
        </div>

        {/* Strength Chart Section */}
        <div className="px-4 py-8">
          <div className="flex flex-col gap-4 bg-primary/5 border border-primary/10 rounded-2xl p-6">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Strength Consistency</p>
                <p className="text-slate-100 text-4xl font-bold tracking-tight">{weeklyCompletionPercent}%</p>
              </div>
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold">
                Last 7 Days
              </div>
            </div>
            
            <div className="grid min-h-[160px] grid-flow-col gap-3 items-end justify-items-center mt-4">
              {[6, 5, 4, 3, 2, 1, 0].map((offset, i) => {
                const d = new Date();
                d.setDate(d.getDate() - offset);
                const dStr = d.toISOString().split('T')[0];
                const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
                
                let dayCompletions = 0;
                activeDisciplines.forEach(disc => {
                  if (completions[disc.id]?.includes(dStr)) {
                    dayCompletions++;
                  }
                });
                
                const heightPercent = totalDisciplines === 0 ? 0 : (dayCompletions / totalDisciplines) * 100;
                const opacity = heightPercent === 0 ? 0.1 : Math.max(0.2, heightPercent / 100);
                
                return (
                  <div key={i} className="flex flex-col w-full items-center gap-2">
                    <div 
                      className="bg-primary rounded-t-sm w-full transition-all duration-500" 
                      style={{ height: `${Math.max(5, heightPercent)}%`, opacity }}
                    ></div>
                    <p className="text-slate-500 text-[11px] font-bold">{dayName}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reflection Prompt */}
        <div className="px-4 pb-8">
          <div className="bg-white/5 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-primary/10">
              <Quote className="w-24 h-24" />
            </div>
            <h3 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Reflection</h3>
            <p className="text-slate-100 italic text-lg leading-relaxed relative z-10 mb-6">
              "Review your week. What fueled your drive when fatigue set in, and where did you falter?"
            </p>
            
            {isRecording ? (
              <textarea 
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="w-full bg-background-dark/50 border border-primary/30 rounded-lg p-4 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none min-h-[120px] placeholder:text-slate-500 mb-4 relative z-10" 
                placeholder="I remembered my vow..."
                autoFocus
              />
            ) : null}
            
            <button 
              onClick={handleRecord}
              disabled={isRecording && !reflection}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-background-dark font-bold py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-sm relative z-10"
            >
              {isRecording ? (
                <>Seal Reflection</>
              ) : (
                <>
                  <Edit3 className="w-5 h-5" />
                  Record Reflection
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
