import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-slate-800 border border-primary/30 rounded-xl p-4 shadow-2xl z-50 flex items-center justify-between animate-in slide-in-from-bottom-5">
      <div className="flex items-center gap-3">
        <div className="bg-primary/20 p-2 rounded-lg text-primary">
          <Download className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-slate-100 font-bold text-sm">Install InnerForge</h3>
          <p className="text-slate-400 text-xs">Add to your home screen for quick access.</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={handleInstallClick}
          className="bg-primary hover:bg-primary/90 text-background-dark font-bold py-2 px-4 rounded-lg text-sm transition-colors"
        >
          Install
        </button>
        <button 
          onClick={() => setShowPrompt(false)}
          className="text-slate-400 hover:text-slate-200 p-2"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
