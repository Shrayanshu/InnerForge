import React from 'react';
import { User, Settings, Shield, LogOut, Activity } from 'lucide-react';
import { useStore } from '../store/useStore';

export function ProfileScreen() {
  const { identityStatement, coreValues, mainFocus } = useStore();

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-slate-100">
      {/* Header */}
      <header className="flex items-center p-4 justify-between sticky top-0 z-50 border-b border-primary/10 bg-background-dark">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <User className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-widest flex-1 text-center uppercase">
          Profile
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-24 overflow-y-auto">
        {/* Profile Info */}
        <div className="flex flex-col items-center p-8 border-b border-primary/10">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full border-4 border-primary p-1 shadow-[0_0_20px_rgba(244,140,37,0.3)] min-h-32 w-32 mb-4" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaASn2bO5PKmKVW_9gGsNwDMg1-4Tjzpvt8es5MQ4ffxuekUBBsji1XboYLoFmV1NnSsTUzkTlPs350f2dkIk_gw8__eAD6M3ruFp5AIbZwzXCdfMEzbXloNZFDtAYWZ9r1BeVoAPpK2MTawqP7c-va_oansPtl5wD5aN32fCaZ1AfxCxlof87wU7yYRqW6hXEU16dDIg4MPorFZggZKe5ZL8aLFjRbOPM-mrTNXJ6PzkN_qkMcTzsA5Prry9qbDVJ8Z0Ya1xJhAyh")' }}
          ></div>
          <h3 className="text-2xl font-bold tracking-tight">Initiate Kaelen</h3>
          <p className="text-primary text-sm font-bold uppercase tracking-widest mt-1">Warrior Class</p>
        </div>

        {/* Identity & Vow */}
        <div className="p-6 space-y-6">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="text-primary w-5 h-5" />
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Identity Statement</h4>
            </div>
            <p className="text-slate-100 text-lg italic leading-relaxed bg-primary/5 p-4 rounded-xl border border-primary/10">
              "{identityStatement || 'I am a warrior forging my path through discipline.'}"
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Activity className="text-primary w-5 h-5" />
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Core Values</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {coreValues.length > 0 ? coreValues.map(value => (
                <span key={value} className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-sm font-bold">
                  {value}
                </span>
              )) : (
                <span className="text-slate-500 text-sm italic">No core values selected.</span>
              )}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="text-primary w-5 h-5" />
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Main Focus</h4>
            </div>
            <p className="text-slate-100 text-base bg-primary/5 p-4 rounded-xl border border-primary/10">
              {mainFocus || 'Focusing on daily consistency.'}
            </p>
          </section>
        </div>

        {/* Settings / Actions */}
        <div className="p-6 space-y-4 border-t border-primary/10">
          <button className="w-full flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors">
            <span className="font-bold text-slate-300">Account Settings</span>
            <Settings className="w-5 h-5 text-slate-500" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-colors text-red-500">
            <span className="font-bold">Log Out</span>
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
