import React from 'react';
import { useStore } from '../../store/useStore';
import { Zap } from 'lucide-react';

const VALUES = [
  'Discipline', 'Integrity', 'Resilience', 'Courage', 
  'Consistency', 'Focus', 'Strength', 'Growth'
];

export function CoreValuesSelector() {
  const { coreValues, toggleCoreValue } = useStore();

  return (
    <div className="bg-primary/5 border border-primary/20 p-5 rounded-xl">
      <div className="flex items-center gap-3 mb-2">
        <Zap className="w-5 h-5 text-primary" />
        <div>
          <h4 className="font-bold text-slate-100">Core Values</h4>
          <p className="text-xs text-slate-400">The principles that guide your training (Select 2-3).</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {VALUES.map((val) => {
          const isSelected = coreValues.includes(val);
          return (
            <button
              key={val}
              onClick={() => toggleCoreValue(val)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isSelected 
                  ? 'bg-primary text-background-dark shadow-md shadow-primary/20' 
                  : 'bg-background-dark text-slate-300 border border-primary/20 hover:border-primary/50'
              }`}
            >
              {val}
            </button>
          );
        })}
      </div>
    </div>
  );
}
