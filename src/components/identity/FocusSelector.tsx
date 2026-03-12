import React from 'react';
import { useStore } from '../../store/useStore';
import { Target } from 'lucide-react';

const FOCUS_OPTIONS = [
  'Physical Strength', 'Mental Resilience', 'Discipline', 
  'Knowledge', 'Career Growth', 'Health & Energy'
];

export function FocusSelector() {
  const { mainFocus, setMainFocus } = useStore();

  return (
    <div className="bg-primary/5 border border-primary/20 p-5 rounded-xl">
      <div className="flex items-center gap-3 mb-2">
        <Target className="w-5 h-5 text-primary" />
        <div>
          <h4 className="font-bold text-slate-100">Primary Training Focus</h4>
          <p className="text-xs text-slate-400">Where will you forge your strength?</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {FOCUS_OPTIONS.map((focus) => {
          const isSelected = mainFocus === focus;
          return (
            <button
              key={focus}
              onClick={() => setMainFocus(focus)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all text-left flex items-center justify-between ${
                isSelected 
                  ? 'bg-primary/20 border-primary text-primary border' 
                  : 'bg-background-dark text-slate-300 border border-primary/10 hover:border-primary/30'
              }`}
            >
              {focus}
              {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
