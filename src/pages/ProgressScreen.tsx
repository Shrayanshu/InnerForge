import React from 'react';
import { Settings, Calendar, CheckSquare, TrendingUp, Dumbbell, Activity, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import { calculateXP } from '../utils/xp';

export function ProgressScreen() {
  const { disciplines, completions, setIsReflectingWeekly, dailyReflections, weeklyReflections } = useStore();

  const activeDisciplines = disciplines.filter(d => d.status === 'active');
  const todayDate = new Date();
  const todayStr = todayDate.toISOString().split('T')[0];
  
  // Calculate total XP and Level using the new RPG scaling logic
  const { totalXp, level, nextLevelBaseXp, xpIntoCurrentLevel, xpNeededForNextLevel, progressPercent } = calculateXP(completions, dailyReflections, weeklyReflections);

  // Calculate Streak
  let streak = 0;
  let checkDate = new Date(todayDate);
  const completionDates = new Set<string>();
  Object.values(completions).forEach(dates => dates.forEach(d => completionDates.add(d)));

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (completionDates.has(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (dateStr === todayStr) {
      // If today isn't completed yet, check yesterday before breaking the streak
      checkDate.setDate(checkDate.getDate() - 1);
      const yesterdayStr = checkDate.toISOString().split('T')[0];
      if (completionDates.has(yesterdayStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    } else {
      break;
    }
  }

  // Calculate Weekly Completion (Last 7 days)
  let last7DaysCompletions = 0;
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
  
  const possibleWeeklyCompletions = activeDisciplines.length * 7;
  const weeklyCompletion = possibleWeeklyCompletions === 0 
    ? 0 
    : Math.round((last7DaysCompletions / possibleWeeklyCompletions) * 100);

  return (
    <div className="flex flex-col w-full">
      {/* Profile Section with Immersive Gradient Background */}
      <div className="flex p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none"></div>
        <div className="flex w-full flex-col gap-6 items-center relative z-10">
          <div className="flex gap-4 flex-col items-center">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4 border-primary p-1 shadow-[0_0_20px_rgba(244,140,37,0.3)] min-h-32 w-32" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaASn2bO5PKmKVW_9gGsNwDMg1-4Tjzpvt8es5MQ4ffxuekUBBsji1XboYLoFmV1NnSsTUzkTlPs350f2dkIk_gw8__eAD6M3ruFp5AIbZwzXCdfMEzbXloNZFDtAYWZ9r1BeVoAPpK2MTawqP7c-va_oansPtl5wD5aN32fCaZ1AfxCxlof87wU7yYRqW6hXEU16dDIg4MPorFZggZKe5ZL8aLFjRbOPM-mrTNXJ6PzkN_qkMcTzsA5Prry9qbDVJ8Z0Ya1xJhAyh")' }}
              ></div>
              <div className="absolute -bottom-2 right-0 bg-primary text-background-dark text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                Level {level}
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-100 text-[24px] font-bold leading-tight tracking-tight text-center">Initiate Kaelen</p>
              <p className="text-primary text-base font-semibold leading-normal text-center uppercase tracking-wider">Warrior Class</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="flex flex-col gap-4 p-6 bg-primary/5 mx-4 rounded-xl border border-primary/10">
        <div className="flex gap-6 justify-between items-end">
          <div className="flex flex-col">
            <p className="text-slate-100 text-base font-bold leading-normal">Evolution Progress</p>
            <p className="text-slate-400 text-sm font-normal leading-normal text-center">
              {nextLevelBaseXp - totalXp} XP to Level {level + 1}
            </p>
          </div>
          <p className="text-primary text-sm font-bold leading-normal">{xpIntoCurrentLevel} / {xpNeededForNextLevel} XP</p>
        </div>
        
        <div className="rounded-full bg-slate-800 h-3 overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-tighter">Level {level}</p>
          <p className="text-primary text-xs font-bold uppercase tracking-tighter">Level {level + 1}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-primary/10 border border-primary/20 shadow-sm">
          <div className="flex items-center gap-2">
            <Calendar className="text-primary w-4 h-4" />
            <p className="text-slate-400 text-sm font-medium leading-normal uppercase">Days Disciplined</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-100 tracking-tight text-3xl font-bold leading-tight">{streak} Days</p>
            {streak > 0 && <p className="text-emerald-500 text-sm font-bold leading-normal">Active</p>}
          </div>
        </div>
        
        <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-primary/10 border border-primary/20 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckSquare className="text-primary w-4 h-4" />
            <p className="text-slate-400 text-sm font-medium leading-normal uppercase">Weekly Completion</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-100 tracking-tight text-3xl font-bold leading-tight">{weeklyCompletion}%</p>
          </div>
        </div>
        
        <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-primary/10 border border-primary/20 shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-primary w-4 h-4" />
            <p className="text-slate-400 text-sm font-medium leading-normal uppercase">Total XP</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-slate-100 tracking-tight text-3xl font-bold leading-tight">{totalXp}</p>
          </div>
        </div>
      </div>

      {/* Weekly Evaluation Action */}
      <div className="px-6 pb-6">
        <button 
          onClick={() => setIsReflectingWeekly(true)}
          className="w-full bg-primary/10 border border-primary/30 hover:bg-primary/20 text-primary font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
        >
          <Shield className="w-5 h-5" />
          Weekly Evaluation
        </button>
      </div>

      {/* Reflection History */}
      <div className="px-6 pb-8">
        <h3 className="text-slate-100 text-lg font-bold mb-4">Reflection History</h3>
        <div className="space-y-3">
          {dailyReflections.length === 0 ? (
            <p className="text-slate-400 text-sm italic">No reflections recorded yet.</p>
          ) : (
            [...dailyReflections].reverse().map(reflection => (
              <div key={reflection.id} className="flex flex-col gap-2 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center">
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">
                    {reflection.date === todayStr ? 'Today' : reflection.date}
                  </p>
                  <p className="text-slate-400 text-xs">Reflection recorded</p>
                </div>
                {reflection.honored && (
                  <p className="text-slate-300 text-sm"><span className="text-slate-500">Honored:</span> {reflection.honored}</p>
                )}
                {reflection.struggle && (
                  <p className="text-slate-300 text-sm"><span className="text-slate-500">Struggle:</span> {reflection.struggle}</p>
                )}
                {reflection.improve && (
                  <p className="text-slate-300 text-sm"><span className="text-slate-500">Improve:</span> {reflection.improve}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Activities / Quests List */}
      <div className="px-6 pb-8">
        <h3 className="text-slate-100 text-lg font-bold mb-4">Training Milestones</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-slate-100 font-bold text-sm">Morning Strength Ritual</p>
              <p className="text-slate-400 text-xs">Completed 5 minutes ago</p>
            </div>
            <p className="text-primary font-bold">+50 XP</p>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-slate-100 font-bold text-sm">Focus Meditation</p>
              <p className="text-slate-400 text-xs">Yesterday</p>
            </div>
            <p className="text-primary font-bold">+25 XP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
