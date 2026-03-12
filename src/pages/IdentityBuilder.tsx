import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';
import { IdentityInput } from '../components/identity/IdentityInput';
import { IdentityPreviewCard } from '../components/identity/IdentityPreviewCard';
import { CoreValuesSelector } from '../components/identity/CoreValuesSelector';
import { FocusSelector } from '../components/identity/FocusSelector';
import { ConfirmIdentityButton } from '../components/identity/ConfirmIdentityButton';

export function IdentityBuilder() {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isConfirming ? 0.4 : 1 }}
      transition={{ duration: 0.8 }}
      className="flex-1 overflow-y-auto w-full pb-24"
    >
      {/* Progress Bar Component */}
      <div className="flex flex-col gap-3 p-6 max-w-2xl mx-auto">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-primary text-base font-semibold uppercase tracking-widest">Warrior Path</p>
          <p className="text-slate-400 text-sm font-medium">Stage 1 of 4</p>
        </div>
        <div className="rounded-full bg-primary/20 h-3 overflow-hidden">
          <div className="h-full rounded-full bg-primary w-1/4"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-6 py-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6 border border-primary/20">
          <Shield className="text-primary w-10 h-10" />
        </div>
        <h1 className="text-slate-100 tracking-tight text-4xl md:text-5xl font-bold leading-tight mb-4">
          Who are you becoming?
        </h1>
        <p className="text-slate-300 text-lg font-normal leading-relaxed">
          Forge your new identity. Define the warrior within and commit to the transformation.
        </p>
      </section>

      {/* Identity Input Form */}
      <section className="px-6 max-w-2xl mx-auto w-full">
        <div className="space-y-8">
          <div>
            <IdentityInput />
            <IdentityPreviewCard isConfirming={isConfirming} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CoreValuesSelector />
            <FocusSelector />
          </div>

          <ConfirmIdentityButton onConfirmStart={() => setIsConfirming(true)} />
        </div>
      </section>
    </motion.div>
  );
}
