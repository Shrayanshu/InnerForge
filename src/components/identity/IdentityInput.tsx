import React from 'react';
import { useStore } from '../../store/useStore';

export function IdentityInput() {
  const { identityStatement, setIdentityStatement } = useStore();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold uppercase tracking-wider text-primary ml-1">
        Your Oath
      </label>
      <textarea
        value={identityStatement}
        onChange={(e) => setIdentityStatement(e.target.value)}
        className="w-full bg-background-light dark:bg-primary/5 border-2 border-primary/20 focus:border-primary rounded-xl p-5 text-xl font-medium leading-relaxed dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-0 outline-none transition-all"
        placeholder="I am becoming someone who keeps their word."
        rows={4}
      />
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 px-1 italic">
        The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.
      </p>
    </div>
  );
}
