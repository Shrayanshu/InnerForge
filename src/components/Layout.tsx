import React from 'react';
import { Castle, Activity, Swords, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PWAInstallPrompt } from './PWAInstallPrompt';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { activeTab, setActiveTab } = useStore();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-dark">
      {/* Top Navigation */}
      <nav className="flex items-center bg-background-dark p-4 justify-center sticky top-0 z-50 border-b border-primary/10">
        <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-widest text-center uppercase">
          Warrior Grounds
        </h2>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pb-24">
        {children}
      </main>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background-dark/95 backdrop-blur-md border-t border-primary/10 flex justify-around p-3 z-50">
        <button 
          onClick={() => setActiveTab('today')}
          className={`flex flex-1 flex-col items-center transition-colors ${activeTab === 'today' ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
        >
          <Castle className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold tracking-wide">DOJO</span>
        </button>
        <button 
          onClick={() => setActiveTab('progress')}
          className={`flex flex-1 flex-col items-center transition-colors ${activeTab === 'progress' ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
        >
          <Activity className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold tracking-wide">PROGRESS</span>
        </button>
        <button 
          onClick={() => setActiveTab('training')}
          className={`flex flex-1 flex-col items-center transition-colors ${activeTab === 'training' ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
        >
          <Swords className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold tracking-wide">QUESTS</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-1 flex-col items-center transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-slate-500 hover:text-primary'}`}
        >
          <User className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold tracking-wide">PROFILE</span>
        </button>
      </div>
    </div>
  );
}
