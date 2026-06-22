"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, History, BarChart3, Users, Bookmark, Bell, Search, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useProbix } from '@/store/ProbixContext';
import { MarketCard } from '@/components/dashboard/MarketCard';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';

export default function ProbixDashboard() {
  const { markets, balance, logout, isHydrated, isAuthenticated } = useProbix();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      window.location.href = '/';
    }
  }, [isHydrated, isAuthenticated]);

  if (!isHydrated || !isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-200 dark:border-white/10 flex flex-col p-6 gap-8 shrink-0">
        <div className="font-black text-2xl tracking-tighter">PROBIX</div>
        <nav className="flex flex-col gap-2">
          <SidebarItem icon={<Home size={20}/>} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <SidebarItem icon={<Compass size={20}/>} label="Explore" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
          <SidebarItem icon={<History size={20}/>} label="History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
          <SidebarItem icon={<BarChart3 size={20}/>} label="Markets" active={activeTab === 'markets'} onClick={() => setActiveTab('markets')} />
        </nav>
        <div className="mt-auto">
          <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 mb-4">
            <p className="text-xs text-slate-500 mb-1">Balance</p>
            <p className="text-xl font-black italic">₦{balance.toLocaleString()}</p>
          </div>
          <button onClick={logout} className="text-sm font-bold text-slate-500 hover:text-red-500">Logout</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-8 bg-white/80 dark:bg-black/80 backdrop-blur-md shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search markets..." className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon"><Bell size={20}/></Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex justify-between items-end">
                <h2 className="text-3xl font-black tracking-tight">Trending Now</h2>
                <button className="text-sm text-blue-600 font-bold hover:underline">See all Hubs</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {markets.slice(0, 6).map(market => (
                  <MarketCard key={market.id} {...market} onClick={() => {}} onQuickBet={() => {}} />
                ))}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"}`}>
      {icon}
      <span className="font-bold">{label}</span>
    </button>
  );
}
