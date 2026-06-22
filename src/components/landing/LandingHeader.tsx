"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { ProbixLogo } from '@/components/ui/ProbixLogo';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function LandingHeader({ setView, setAuthMode }: { setView: (v: any) => void, setAuthMode: (m: any) => void }) {
  return (
    <nav className="fixed top-0 w-full z-[100] px-12 h-24 flex justify-between items-center bg-[#010206]/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-20">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('landing')}>
          <ProbixLogo size="sm" />
          <span className="font-black text-2xl tracking-tighter italic text-white">Probix</span>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {['Explore', 'Forecasts', 'Analysts', 'Insights', 'Pricing', 'About'].map((link) => (
            <button key={link} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">{link}</button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="p-2.5 rounded-full hover:bg-white/5 cursor-pointer text-slate-400 transition-all">
          <Search size={22} />
        </div>
        <ThemeToggle />
        <button
            className="text-sm font-bold text-white hover:text-primary transition-colors active-press"
            onClick={() => { setAuthMode('login'); setView('auth'); }}
        >
            Sign In
        </button>
        <Button
            className="!rounded-xl !px-10 !py-4 shadow-[0_0_40px_rgba(59,130,246,0.3)] text-sm font-black uppercase tracking-widest active-press"
            onClick={() => { setAuthMode('signup'); setView('auth'); }}
        >
            Join Probix
        </Button>
      </div>
    </nav>
  );
}
