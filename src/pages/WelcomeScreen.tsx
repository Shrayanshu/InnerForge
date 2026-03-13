import React from 'react';
import { motion } from 'motion/react';
import { Users, Swords, Zap, TrendingUp, ChevronsUp, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export function WelcomeScreen() {
  const startTrial = useStore((state) => state.startTrial);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="px-4 py-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-background-dark rounded-xl min-h-[500px] border border-primary/20 shadow-2xl shadow-primary/10"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCupuIC3tVU8b8N7RgsiRVzMKvLrooVItqjMat9sRGewnT8a_6g7bxol50vhM-MG4m2NBnJqZPQZLjrS1Z4rOHoddsbR5TMY_FcpYba8pSLBeeOz5bRMyLffd2I1dbioHhAq9iq6HvZffY9PQ_FzNzXThGV0UBIEuEckFNk93tpX8y6WMRKo_hmCUtBiZOmr3Js41apJp_4yzXCz-W0AnNzk00QHuALLpCXAgmSVGF47pYt2scVYIu7_dvJ6u_5tEEzgjkRYOfs7j-o")'
          }}
        >
          {/* Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
          
          {/* Content Over Image */}
          <div className="relative z-10 p-6 md:p-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="inline-block px-3 py-1 mb-4 rounded-full bg-primary text-background-dark text-xs font-bold uppercase tracking-widest"
            >
              New Recruit Access
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-slate-100 tracking-tight text-5xl md:text-6xl font-bold leading-none pb-4"
            >
              Forge Who You Are <br/>
              <span className="text-primary italic">Becoming</span>
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {/* Philosophy Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 py-10 max-w-4xl mx-auto text-center"
      >
        <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed mb-8">
          Welcome to the Warrior Training Ground. InnerForge is more than a program; it's a crucible. 
          Embrace the discipline, face the heat, and transform your potential into absolute power.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={startTrial}
            className="bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            START THE TRIAL
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap gap-4 p-4 md:p-6 max-w-6xl mx-auto w-full"
      >
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-primary/10 border border-primary/20 backdrop-blur-sm hover:bg-primary/20 transition-colors">
          <div className="flex items-center gap-2 text-primary">
            <Users className="w-5 h-5" />
            <p className="text-slate-100 text-sm font-bold uppercase tracking-wider">Warriors</p>
          </div>
          <p className="text-slate-100 tracking-tight text-3xl font-bold leading-tight">12,482</p>
          <div className="flex items-center gap-1">
            <TrendingUp className="text-green-500 w-4 h-4" />
            <p className="text-green-500 text-sm font-medium leading-normal">+12% this moon</p>
          </div>
        </div>

        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-primary/10 border border-primary/20 backdrop-blur-sm hover:bg-primary/20 transition-colors">
          <div className="flex items-center gap-2 text-primary">
            <Swords className="w-5 h-5" />
            <p className="text-slate-100 text-sm font-bold uppercase tracking-wider">Methods</p>
          </div>
          <p className="text-slate-100 tracking-tight text-3xl font-bold leading-tight">42</p>
          <p className="text-slate-400 text-sm font-medium leading-normal">Active Katas</p>
        </div>

        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-primary/10 border border-primary/20 backdrop-blur-sm hover:bg-primary/20 transition-colors">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="w-5 h-5" />
            <p className="text-slate-100 text-sm font-bold uppercase tracking-wider">Collective Power</p>
          </div>
          <p className="text-slate-100 tracking-tight text-3xl font-bold leading-tight">MAX</p>
          <div className="flex items-center gap-1">
            <ChevronsUp className="text-green-500 w-4 h-4" />
            <p className="text-green-500 text-sm font-medium leading-normal">Surging</p>
          </div>
        </div>
      </motion.div>

      {/* Featured Training Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="p-4 md:p-6 max-w-6xl mx-auto w-full mb-8"
      >
        <div className="relative group overflow-hidden rounded-xl bg-slate-900 border border-primary/30 hover:border-primary/60 transition-colors cursor-pointer">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img 
                alt="Training Session" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhnYTLzrX2WimVOluymtNOWeHIFj0pUL2h5VgGtqpoloo1PhTAE25NWM9uy9EcR1Tc5Dle4t9Qa3CycHEUAYFLpPAeZePV3SrHZepKHEmknuiNQDY17EWheAJE8UQfsKCDw3rT6GSUcVE0Ag_ACosYH-mrdJhUJXKdzfNeOnOKmo6z6YUrfIa1ZoWShcekltHXFucINtZ30QwPtVIc6edWmZ1oiVdqoPsB5rSHzx3JqG9cgEHb8x3wpANcQ4uMUP9p9kmuf-ongEgY"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-primary text-2xl font-bold mb-2">The Apprentice Path</h3>
              <p className="text-slate-300 mb-6">Begin your journey with the fundamental 7-day fire walk. Master the basic strikes and the iron mindset required to survive the forge.</p>
              <div className="inline-flex items-center text-primary font-bold gap-2 group/link cursor-pointer" onClick={startTrial}>
                ENTER THE DOJO
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
