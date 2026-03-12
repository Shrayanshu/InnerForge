import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';
import { Shield } from 'lucide-react';

interface Props {
  isConfirming: boolean;
}

export function IdentityPreviewCard({ isConfirming }: Props) {
  const identityStatement = useStore((state) => state.identityStatement);

  return (
    <AnimatePresence>
      {identityStatement.trim().length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="overflow-hidden mt-6"
        >
          <motion.div
            animate={isConfirming ? {
              boxShadow: ['0px 0px 0px rgba(244,140,37,0)', '0px 0px 30px rgba(244,140,37,0.6)', '0px 0px 15px rgba(244,140,37,0.4)'],
              borderColor: ['rgba(244,140,37,0.3)', 'rgba(244,140,37,1)', 'rgba(244,140,37,0.5)']
            } : {}}
            transition={{ duration: 1.5 }}
            className="bg-background-dark border border-primary/30 p-6 rounded-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <h4 className="text-primary text-sm font-bold uppercase tracking-widest">Your Path</h4>
            </div>
            <p className="text-slate-300 text-sm mb-1">You are becoming</p>
            <p className="text-slate-100 text-xl font-bold leading-snug mb-4">
              "{identityStatement}"
            </p>
            <p className="text-primary/60 text-xs italic border-t border-primary/10 pt-3">
              The forge recognizes your intention.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
