import React, { useState } from 'react';
import { Flame, UserCircle, Star, BellRing, Zap, MapPin, MoreVertical, Shield } from 'lucide-react';
import { useStore, Discipline } from '../store/useStore';

export function TrainingManagementScreen() {
  const { disciplines, completions, pauseDiscipline, resumeDiscipline, retireDiscipline, setIsCreatingDiscipline, setEditingDisciplineId } = useStore();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const activeDisciplines = disciplines.filter(d => d.status === 'active');
  const pausedDisciplines = disciplines.filter(d => d.status === 'paused');

  const calculateStreak = (id: string) => {
    const dates = completions[id] || [];
    if (dates.length === 0) return 0;
    
    const sortedDates = [...dates].sort().reverse();
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    // Check if completed today or yesterday
    const todayStr = currentDate.toISOString().split('T')[0];
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
      return 0; // Streak broken
    }
    
    let checkDate = new Date(sortedDates[0]);
    
    for (const dateStr of sortedDates) {
      if (dateStr === checkDate.toISOString().split('T')[0]) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateStrength = (discipline: Discipline) => {
    let score = 0;
    if (discipline.name.trim().length > 0) score += 1;
    if (discipline.action.trim().length > 0) score += 1;
    if (discipline.cue.trim().length > 0) score += 1;
    if (discipline.location.trim().length > 0) score += 1;
    // Bonus point if action is short (under 40 chars)
    if (discipline.action.trim().length > 0 && discipline.action.length < 40) score += 1;
    return score;
  };

  const renderStars = (strength: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < strength ? 'fill-primary text-primary' : 'text-primary/30'}`} 
      />
    ));
  };

  return (
    <div className="flex flex-col min-h-full bg-background-dark text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-background-dark/80 backdrop-blur-md p-4 border-b border-primary/10">
        <div className="flex items-center gap-3">
          <Flame className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold tracking-tight uppercase">Training Hall</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Status Overview */}
        <div className="flex items-center justify-between px-2 text-sm uppercase tracking-widest text-slate-400 font-semibold">
          <span>Active Practice</span>
          <span className="text-primary">{activeDisciplines.length} Current</span>
        </div>

        {/* Active Discipline Cards */}
        <div className="space-y-4">
          {activeDisciplines.map((discipline) => {
            const strength = calculateStrength(discipline);
            return (
              <div key={discipline.id} className="flex flex-col overflow-hidden rounded-xl border border-primary/10 bg-primary/5 shadow-xl">
                <div 
                  className="relative h-40 w-full bg-cover bg-center" 
                  style={{ 
                    backgroundImage: `url('https://picsum.photos/seed/${discipline.id}/800/400?grayscale&blur=2')`,
                    filter: 'brightness(0.7)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">{discipline.name}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        {renderStars(strength)}
                      </div>
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                        Streak: {calculateStreak(discipline.id)} Days
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 space-y-4 relative">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-start gap-3">
                      <BellRing className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs uppercase text-slate-500 font-bold tracking-wider">The Cue</p>
                        <p className="text-base text-slate-300">{discipline.cue}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs uppercase text-slate-500 font-bold tracking-wider">Tiny Action</p>
                        <p className="text-base text-slate-300">{discipline.action}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs uppercase text-slate-500 font-bold tracking-wider">The Place</p>
                        <p className="text-base text-slate-300">{discipline.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => setEditingDisciplineId(discipline.id)}
                      className="flex-1 bg-primary text-background-dark font-bold py-3 rounded-lg text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
                    >
                      Refine Discipline
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === discipline.id ? null : discipline.id)}
                        className="flex items-center justify-center w-12 h-full bg-white/5 border border-white/10 text-slate-400 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {activeMenuId === discipline.id && (
                        <div className="absolute bottom-full right-0 mb-2 w-48 bg-surface-dark border border-white/10 rounded-lg shadow-xl overflow-hidden z-20">
                          <button 
                            onClick={() => { pauseDiscipline(discipline.id); setActiveMenuId(null); }}
                            className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition-colors"
                          >
                            Pause Training
                          </button>
                          <button 
                            onClick={() => { retireDiscipline(discipline.id); setActiveMenuId(null); }}
                            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors"
                          >
                            Retire Discipline
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paused Disciplines */}
        {pausedDisciplines.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between px-2 text-sm uppercase tracking-widest text-slate-500 font-semibold">
              <span>Paused Training</span>
            </div>
            
            {pausedDisciplines.map(discipline => (
              <div key={discipline.id} className="flex flex-col overflow-hidden rounded-xl border border-white/5 bg-white/5 opacity-60 grayscale-[0.5] transition-all hover:opacity-80">
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-bold text-slate-300 tracking-tight">{discipline.name}</h2>
                      <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest mt-0.5">{discipline.action}</p>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] bg-slate-800 text-slate-400 rounded-full font-bold uppercase tracking-widest border border-white/5">
                      Paused
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    <p className="text-slate-500"><span className="text-slate-400 uppercase font-bold mr-2">Cue:</span>{discipline.cue}</p>
                  </div>
                  
                  <div className="flex gap-2 pt-1">
                    <button 
                      onClick={() => resumeDiscipline(discipline.id)}
                      className="flex-1 bg-slate-800 border border-white/5 text-slate-300 font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest hover:bg-slate-700 transition-colors"
                    >
                      Resume Training
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Action */}
        <div className="py-8 text-center">
          <button 
            onClick={() => setIsCreatingDiscipline(true)}
            className="w-full bg-primary/10 border-2 border-dashed border-primary/30 hover:border-primary/50 text-primary py-6 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group shadow-lg shadow-primary/5"
          >
            <Shield className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-sm">Forge New Discipline</span>
          </button>
        </div>
      </main>
    </div>
  );
}

