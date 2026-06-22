"use client";

import React from 'react';
import {
  Home,
  Compass,
  History,
  BarChart3,
  Users,
  Bookmark,
  Lightbulb,
  Users2,
  Plus,
  Crown,
  ChevronRight,
  CheckCircle2,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ProbixLogo } from '@/components/ui/ProbixLogo';
import { Market } from '@/types/market';

interface CategoryInfo {
  icon: string;
  desc: string;
  stats: {
    forecasts: string;
    analysts: string;
    accuracy: string;
    followers: string;
  };
  sentiment: number;
  topics: {
    name: string;
    forecasts: string;
    accuracy: string;
  }[];
}

interface SidebarProps {
  view: string;
  activeCategory: string | null;
  detailedMarket: Market | null;
  setView: (view: string) => void;
  setDetailedMarket: (market: Market | null) => void;
  setActiveCategory: (category: string | null) => void;
  categories: Record<string, CategoryInfo>;
  logout: () => void;
  walletAddress: string | null;
  setSearchQuery: (query: string) => void;
}

export function Sidebar({
  view,
  activeCategory,
  detailedMarket,
  setView,
  setDetailedMarket,
  setActiveCategory,
  categories,
  logout,
  walletAddress,
  setSearchQuery
}: SidebarProps) {
  const resetAll = () => {
    setDetailedMarket(null);
    setActiveCategory(null);
    setSearchQuery("");
  };

  return (
    <aside className="w-64 border-r border-probix-border flex flex-col p-4 gap-6 bg-probix-surface dark:bg-[#010206] shrink-0 z-50 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-3 px-2 mb-2 cursor-pointer group" onClick={() => { setView('home'); resetAll(); }}>
        <ProbixLogo size="sm" />
        <span className="font-black text-xl tracking-tighter italic">Probix</span>
      </div>

      <nav className="flex flex-col gap-1 text-left">
        <SidebarItem icon={<Home size={18} />} label="Home" active={view === 'home' && !activeCategory && !detailedMarket} onClick={() => { setView('home'); resetAll(); }} />
        <SidebarItem icon={<Compass size={18} />} label="Explore" active={view === 'explore'} onClick={() => { setView('explore'); resetAll(); }} />
        <SidebarItem icon={<History size={18} />} label="Forecasts" active={view === 'forecasts' && !detailedMarket} onClick={() => { setView('forecasts'); resetAll(); }} />
        <SidebarItem icon={<BarChart3 size={18} />} label="Markets" active={view === 'markets'} onClick={() => { setView('markets'); resetAll(); }} badge="Live" />
        <SidebarItem icon={<Users size={18} />} label="Leaderboard" active={view === 'leaderboard'} onClick={() => { setView('leaderboard'); resetAll(); }} />
        <SidebarItem icon={<Bookmark size={18} />} label="Watchlist" active={view === 'watchlist'} onClick={() => { setView('watchlist'); resetAll(); }} />
        <SidebarItem icon={<Lightbulb size={18} />} label="Insights" active={view === 'insights'} onClick={() => { setView('insights'); resetAll(); }} />
        <SidebarItem icon={<Users2 size={18} />} label="Communities" active={view === 'communities'} onClick={() => { setView('communities'); resetAll(); }} />
      </nav>

      <div className="space-y-4 pt-4 border-t border-white/5 text-left">
        <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.2em] px-2">Your Shortcuts</p>
        <div className="flex flex-col gap-1">
          {Object.keys(categories).map(key => (
            <ShortcutItem key={key} label={key} icon={categories[key].icon} onClick={() => { setView('category'); setActiveCategory(key); setDetailedMarket(null); setSearchQuery(""); }} />
          ))}
          <button className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-probix-muted hover:text-probix-text transition-all group">
            <Plus size={14} className="group-hover:rotate-90 transition-transform" /> Add more
          </button>
        </div>
      </div>

      <div className="mt-auto pt-4 space-y-4 text-left">
          <div className="glass p-4 rounded-[24px] border border-white/5 shadow-2xl cursor-pointer hover:border-primary/20 transition-all" onClick={() => { setView('profile'); setDetailedMarket(null); setActiveCategory(null); }}>
              <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                      <img src="https://i.pravatar.cc/150?u=9" className="w-10 h-10 rounded-full object-cover border border-white/10" alt="Profile" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-[#010206] flex items-center justify-center">
                          <CheckCircle2 size={10} className="text-white" />
                      </div>
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-black italic truncate">David Okoro <CheckCircle2 className="inline ml-1 text-primary" size={12}/></p>
                      <p className="text-[10px] font-bold text-primary tracking-widest uppercase italic leading-none truncate">#{walletAddress || 'PRBX-9482'}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); logout(); }} className="text-probix-muted hover:text-crimson transition-colors"><LogOut size={16}/></button>
              </div>
              <div className="flex justify-between items-end mb-1 px-1">
                  <p className="text-[9px] font-black uppercase text-probix-muted"><span className="text-white">4,280</span> XP</p>
                  <p className="text-[9px] font-black uppercase text-probix-muted">Level 4</p>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-5 shadow-inner">
                  <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} className="h-full bg-primary shadow-glow shadow-primary/40" />
              </div>
              <Button className="w-full !rounded-xl !py-3 gap-2 glass border-white/10 font-black italic tracking-widest text-[10px] uppercase shadow-2xl hover:bg-primary/20 transition-all group">
                  <Crown size={12} className="text-accent group-hover:scale-125 transition-transform" /> Upgrade to Pro <ChevronRight size={12} className="ml-auto opacity-40" />
              </Button>
          </div>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  badge?: string;
}

function SidebarItem({ icon, label, active, onClick, badge }: SidebarItemProps) {
  return (
    <button onClick={onClick} className={`flex items-center justify-between px-6 py-3 rounded-[16px] transition-all relative group ${active ? "bg-primary text-white shadow-lg font-black" : "text-probix-muted hover:bg-white/[0.04] hover:text-probix-text font-bold"}`}>
      <div className="flex items-center gap-4 italic text-sm tracking-tight text-left">
        <span className={`${active ? "text-white" : "text-primary/60 group-hover:scale-110 transition-transform"}`}>{icon}</span>
        {label}
      </div>
      {badge && <span className="bg-primary/20 text-primary text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-[0.2em] border border-primary/20">{badge}</span>}
      {active && <ChevronRight size={14} className="ml-auto opacity-70 group-hover:translate-x-1 transition-transform" />}
    </button>
  );
}

interface ShortcutItemProps {
  label: string;
  icon: string;
  onClick: () => void;
}

function ShortcutItem({ label, icon, onClick }: ShortcutItemProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-4 px-4 py-3 text-xs font-bold text-probix-muted hover:text-probix-text transition-all w-full group rounded-xl hover:bg-white/[0.03] text-left">
       <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
       <span className="font-black italic tracking-tighter uppercase opacity-80 group-hover:opacity-100 text-left">{label}</span>
    </button>
  );
}
