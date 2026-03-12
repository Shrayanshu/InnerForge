import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { X, HelpCircle, PenLine, Zap, Timer, Bell, MapPin, ChevronsRight, Star } from 'lucide-react';

export function DisciplineCreator() {
  const { 
    addDiscipline, 
    updateDiscipline,
    disciplines, 
    setIsCreatingDiscipline,
    editingDisciplineId,
    setEditingDisciplineId
  } = useStore();
  
  const [name, setName] = useState('');
  const [action, setAction] = useState('');
  const [cue, setCue] = useState('');
  const [location, setLocation] = useState('');

  // Pre-fill form if editing
  useEffect(() => {
    if (editingDisciplineId) {
      const disciplineToEdit = disciplines.find(d => d.id === editingDisciplineId);
      if (disciplineToEdit) {
        setName(disciplineToEdit.name);
        setAction(disciplineToEdit.action);
        setCue(disciplineToEdit.cue);
        setLocation(disciplineToEdit.location);
      }
    }
  }, [editingDisciplineId, disciplines]);

  // Calculate Discipline Strength (1 to 5 stars)
  const calculateStrength = () => {
    let score = 0;
    if (name.trim().length > 0) score += 1;
    if (action.trim().length > 0) score += 1;
    if (cue.trim().length > 0) score += 1;
    if (location.trim().length > 0) score += 1;
    // Bonus point if action is short (under 40 chars)
    if (action.trim().length > 0 && action.length < 40) score += 1;
    return score;
  };

  const strength = calculateStrength();
  const isReady = strength >= 4; // Requires all fields to be filled

  const handleBeginTraining = () => {
    if (!isReady) return;
    
    if (editingDisciplineId) {
      updateDiscipline(editingDisciplineId, { name, action, cue, location });
    } else {
      addDiscipline({ name, action, cue, location });
    }
  };

  const handleClose = () => {
    if (disciplines.length > 0) {
      setIsCreatingDiscipline(false);
      setEditingDisciplineId(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark overflow-x-hidden"
    >
      {/* Dojo Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #f48c25 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Navigation */}
      <div className="flex items-center bg-background-dark p-4 pb-2 justify-between border-b border-primary/10 relative z-10">
        <div 
          onClick={handleClose}
          className={`text-slate-100 flex size-12 shrink-0 items-center justify-center rounded-full transition-colors ${disciplines.length > 0 ? 'cursor-pointer hover:bg-primary/10' : 'opacity-0 pointer-events-none'}`}
        >
          <X className="w-6 h-6" />
        </div>
        <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-widest flex-1 text-center uppercase">
          Warrior Training
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-lg h-12 text-primary p-2 hover:bg-primary/10 transition-colors">
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full px-4 relative z-10">
        {/* Header Section */}
        <div className="pt-8 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-1 w-8 bg-primary rounded-full"></div>
            <span className="text-primary font-bold text-sm uppercase tracking-tighter">
              {editingDisciplineId ? 'Refine Your Path' : 'Forge Your Path'}
            </span>
          </div>
          <h1 className="text-white text-3xl font-bold leading-tight tracking-tight">
            {editingDisciplineId ? 'Refine Discipline' : 'New Discipline'}
          </h1>
          <p className="text-slate-400 text-base font-normal mt-2">
            {editingDisciplineId 
              ? 'Sharpen your discipline. Small adjustments lead to mastery.' 
              : 'Forge a new habit by starting small. Master the dojo through consistent, tiny actions.'}
          </p>
        </div>

        {/* Discipline Creator Form */}
        <div className="space-y-6 pb-24">
          
          {/* Discipline Name */}
          <div className="flex flex-col gap-2">
            <label className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <PenLine className="text-primary w-5 h-5" />
                <p className="text-slate-200 text-xs font-bold uppercase tracking-widest">Discipline Name</p>
              </div>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-primary/20 bg-primary/5 h-14 placeholder:text-slate-600 p-4 text-lg font-medium transition-all" 
                placeholder="e.g., Morning Meditation"
              />
            </label>
          </div>

          {/* Tiny Action Guide Card */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-4 items-start">
            <div className="bg-primary text-background-dark rounded-full p-1 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-primary text-sm uppercase">The Warrior's Rule</h4>
              <p className="text-sm text-slate-300 mt-1">
                A new discipline must take less than 60 seconds to complete. Make it so easy you cannot fail.
              </p>
            </div>
          </div>

          {/* Tiny Action */}
          <div className="flex flex-col gap-2">
            <label className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="text-primary w-5 h-5" />
                <p className="text-slate-200 text-xs font-bold uppercase tracking-widest">Tiny Action (&lt; 60 secs)</p>
              </div>
              <input 
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-primary/20 bg-primary/5 h-14 placeholder:text-slate-600 p-4 text-lg font-medium transition-all" 
                placeholder="e.g., Take one deep breath"
              />
              {action.length > 40 && (
                <p className="text-xs text-primary/80 mt-2 italic">
                  Consider reducing the action to something you can complete in under one minute.
                </p>
              )}
            </label>
          </div>

          {/* Cue & Place Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="text-primary w-5 h-5" />
                <p className="text-slate-200 text-xs font-bold uppercase tracking-widest">The Cue</p>
              </div>
              <input 
                value={cue}
                onChange={(e) => setCue(e.target.value)}
                className="w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-primary/20 bg-primary/5 h-14 placeholder:text-slate-600 p-4 text-base transition-all" 
                placeholder="e.g., After I pour tea"
              />
            </label>
            <label className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="text-primary w-5 h-5" />
                <p className="text-slate-200 text-xs font-bold uppercase tracking-widest">The Place</p>
              </div>
              <input 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-primary/20 bg-primary/5 h-14 placeholder:text-slate-600 p-4 text-base transition-all" 
                placeholder="e.g., The balcony"
              />
            </label>
          </div>

          {/* Discipline Strength Indicator */}
          <div className="pt-4 flex flex-col items-center">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Discipline Strength</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 transition-colors duration-300 ${star <= strength ? 'text-primary fill-primary' : 'text-slate-700'}`} 
                />
              ))}
            </div>
            {strength === 5 && (
              <p className="text-xs text-primary mt-2 italic">Excellent discipline. Easy to honor daily.</p>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <button 
              onClick={handleBeginTraining}
              disabled={!isReady}
              className={`w-full font-bold py-4 rounded-xl text-lg uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                isReady 
                  ? 'bg-primary hover:bg-primary/90 text-background-dark shadow-lg shadow-primary/20' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{editingDisciplineId ? 'Save Refinements' : 'Begin Training'}</span>
              <ChevronsRight className="w-6 h-6" />
            </button>
            {!editingDisciplineId && (
              <p className="text-center text-slate-500 text-xs mt-4">
                By clicking begin, you commit to 30 days of practice.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Dojo Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 z-20"></div>
    </motion.div>
  );
}
