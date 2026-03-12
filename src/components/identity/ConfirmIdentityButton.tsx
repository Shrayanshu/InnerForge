import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';
import { Sparkles } from 'lucide-react';

interface Props {
  onConfirmStart: () => void;
}

export function ConfirmIdentityButton({ onConfirmStart }: Props) {
  const { identityStatement, coreValues, mainFocus, confirmIdentity } = useStore();
  const [isConfirming, setIsConfirming] = useState(false);

  // Validation: Must have an oath, at least 1 core value, and a main focus
  const isReady = identityStatement.trim().length > 0 && coreValues.length > 0 && mainFocus !== '';

  const handleConfirm = () => {
    if (!isReady) return;
    setIsConfirming(true);
    onConfirmStart(); // Triggers the parent screen fade
    
    // Sequence: Wait for glow animation, then confirm state to move to next screen
    setTimeout(() => {
      confirmIdentity();
    }, 2000);
  };

  return (
    <div className="relative mt-8">
      <AnimatePresence>
        {isConfirming && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm"
          >
            <motion.p 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-primary font-bold text-2xl tracking-widest uppercase shadow-primary/50 drop-shadow-lg"
            >
              The path is chosen.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={handleConfirm}
        disabled={!isReady || isConfirming}
        className={`w-full font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
          isReady 
            ? 'bg-primary hover:bg-primary/90 text-background-dark shadow-lg shadow-primary/20' 
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        Confirm Identity
        <Sparkles className="w-5 h-5" />
      </button>
    </div>
  );
}
