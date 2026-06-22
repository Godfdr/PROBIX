"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Bell,
  Search,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Zap,
  Globe,
  Share2,
  Bookmark,
  CheckCircle2,
  Users2,
  BarChart3,
  Target,
  LogOut,
  ArrowUp,
  CirclePlay,
  Clock,
  Plus,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// UI Components
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { ProbixLogo } from '@/components/ui/ProbixLogo';

// Dashboard Components
import { Sidebar } from '@/components/dashboard/Sidebar';
import { MarketCard } from '@/components/dashboard/MarketCard';
import {
  GlassBadge,
  PulseNode,
  CategoryStat,
  MoverItem,
  Comment,
  WalletOption,
  SettingItem,
  PodiumCard,
  InsightDetailItem,
  StatBox,
  AnalystRow,
  TransactionRow
} from '@/components/dashboard/DashboardComponents';

// Overlays
import { CreateForecastModal } from '@/components/market/CreateForecastModal';
import { TradingDrawer } from '@/components/market/TradingDrawer';
import { TopUpModal } from '@/components/dashboard/TopUpModal';
import { MarketChart } from '@/components/market/MarketChart';

// State & Data
import { useProbix } from '@/store/ProbixContext';
import { ANALYSTS, CATEGORIES_DATA } from '@/store/data';
import { Market } from '@/types/market';

type PageView = 'home' | 'explore' | 'forecasts' | 'markets' | 'leaderboard' | 'watchlist' | 'insights' | 'communities' | 'profile' | 'category';

export default function ProbixDashboard() {
  const {
    balance,
    positions,
    transactions,
    isAuthenticated,
    logout,
    walletAddress,
    watchlist,
    toggleWatchlist,
    markets,
    isHydrated
  } = useProbix();

  const [view, setView] = useState<PageView>('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [detailedMarket, setDetailedMarket] = useState<Market | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if not authenticated (after hydration)
  useEffect(() => {
    if (mounted && isHydrated && !isAuthenticated) {
        window.location.href = '/';
    }
  }, [isAuthenticated, isHydrated, mounted]);

  // Sync detailed market
  useEffect(() => {
    if (detailedMarket) {
      const updated = markets.find(m => m.id === detailedMarket.id);
      if (updated) setDetailedMarket(updated);
    }
  }, [markets, detailedMarket]);

  const filteredMarkets = useMemo(() => {
    return markets.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, markets]);

  if (!mounted || !isHydrated) {
      return (
          <div className="h-screen bg-probix-bg flex items-center justify-center">
              <ProbixLogo size="md" className="animate-pulse opacity-50" />
          </div>
      );
  }

  // Final check to prevent flicker
  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-probix-bg text-probix-text overflow-hidden">

      <Sidebar
        view={view}
        activeCategory={activeCategory}
        detailedMarket={detailedMarket}
        setView={setView}
        setDetailedMarket={setDetailedMarket}
        setActiveCategory={setActiveCategory}
        setSearchQuery={setSearchQuery}
        categories={CATEGORIES_DATA}
        logout={logout}
        walletAddress={walletAddress}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        <header className="h-20 border-b border-probix-border flex items-center justify-between px-10 bg-probix-bg/80 backdrop-blur-md z-40 shrink-0">
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
             <div className="relative w-full group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-probix-muted" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search forecasting nodes..."
                  className="w-full bg-probix-surface border border-probix-border rounded-[14px] py-3 pl-14 pr-4 text-sm outline-none focus:border-primary/50 transition-all placeholder:text-probix-muted/50 italic shadow-inner"
                />
             </div>
          </div>

          <div className="flex items-center gap-6">
             <ThemeToggle />
             <Button variant="ghost" size="icon" className="h-10 w-10 glass !rounded-xl" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={20} />
             </Button>
             <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setView('profile')}>
                <img src="https://i.pravatar.cc/150?u=9" className="w-10 h-10 rounded-full border border-primary/20" alt="Avatar" />
             </div>
             <Button className="gap-2 !px-6 !py-3 !rounded-[12px] text-xs font-black italic tracking-widest shadow-glow" onClick={() => setIsCreating(true)}>
                <Plus size={18} />
                Establish Forecast
             </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
          <AnimatePresence mode="wait">

            {/* VIEW: HOME */}
            {view === 'home' && !detailedMarket && !activeCategory && (
              <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-16 max-w-7xl mx-auto text-left">

                <div className="relative w-full rounded-[40px] bg-probix-surface dark:bg-[#020308] border border-probix-border dark:border-white/5 p-12 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center min-h-[450px]">
                    <div className="relative z-30 flex-[1] space-y-8 pl-4">
                        <h1 className="text-6xl lg:text-7xl font-black italic tracking-tighter leading-[0.85] text-probix-text dark:text-white uppercase">
                            Trade the <br /> <span className="text-primary italic drop-shadow-glow">Future.</span>
                        </h1>
                        <p className="text-xl text-probix-muted font-bold italic opacity-80 max-w-sm leading-relaxed">
                            Join 42,831 Analysts forecasting what matters most in Africa.
                        </p>
                        <Button size="lg" className="!px-10 !rounded-full !py-6 shadow-3xl shadow-primary/50 font-black italic uppercase tracking-widest text-lg" onClick={() => setView('markets')}>
                            Explore Hubs <ArrowRight className="ml-3" />
                        </Button>
                    </div>

                    <div className="relative flex-1 h-full min-h-[400px] w-full flex items-center justify-center">
                        <div className="relative w-[380px] h-[450px]">
                             <svg viewBox="0 0 100 125" className="w-full h-full opacity-20"><path d="M48,15 L55,15 L62,20 L70,30 L75,45 L78,60 L75,75 L70,90 L62,105 L50,115 L38,105 L28,90 L22,75 L18,60 L22,45 L28,30 L38,20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" /></svg>
                             <div className="absolute top-[10%] left-[-10%] scale-75"><GlassBadge icon={<TrendingUp size={16}/>} color="border-secondary/50" text="Naira Hub" stat="72% Yes" statColor="text-secondary" /></div>
                             <PulseNode top="12%" left="48%" color="bg-secondary" />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                  <div className="flex justify-between items-end px-2">
                    <h3 className="text-3xl font-black italic tracking-tighter uppercase text-probix-text dark:text-white leading-none">Active Streams</h3>
                    <div className="flex gap-4">
                        {['All', 'Politics', 'Economy', 'Sports'].map(cat => (
                           <button key={cat} onClick={() => cat === 'All' ? setSearchQuery("") : setSearchQuery(cat)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${searchQuery === cat || (cat === 'All' && searchQuery === "") ? 'bg-primary border-primary text-white shadow-glow' : 'bg-probix-surface border-probix-border text-probix-text dark:text-white'}`}>{cat}</button>
                        ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-1">
                    {filteredMarkets.slice(0, 6).map((market) => (
                      <MarketCard key={market.id} {...market} onClick={() => setDetailedMarket(market)} onQuickBet={() => setSelectedMarket(market)} />
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* Rest of views with scaled down typography */}
            {view === 'leaderboard' && (
                <motion.div key="leaderboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-left max-w-7xl mx-auto">
                    <h2 className="text-6xl font-black italic tracking-tighter uppercase text-probix-text dark:text-white leading-none">Registry</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end pt-10 pb-10">
                        <PodiumCard analyst={ANALYSTS[1]} rank={2} color="#8B949E" h="h-72" />
                        <PodiumCard analyst={ANALYSTS[0]} rank={1} color="#FFD700" featured h="h-80" />
                        <PodiumCard analyst={ANALYSTS[2]} rank={3} color="#CD7F32" h="h-64" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ANALYSTS.map((a, i) => <AnalystRow key={a.id} analyst={a} rank={i + 1} />)}
                    </div>
                </motion.div>
            )}

            {/* Profile view with scaled down headers */}
            {view === 'profile' && (
                 <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-6xl mx-auto space-y-12 text-left py-6">
                      <div className="flex items-center justify-between">
                          <div className="space-y-2"><h2 className="text-6xl font-black italic tracking-tighter uppercase text-probix-text dark:text-white leading-none">Terminal</h2><p className="text-xl text-probix-muted font-bold italic opacity-70">Manage node signatures.</p></div>
                          <Button variant="danger" size="icon" className="glass !rounded-2xl h-14 w-14" onClick={logout}><LogOut size={24}/></Button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                          <div className="lg:col-span-2 space-y-10">
                              <div className="bento-card p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden shadow-xl bg-probix-surface text-left">
                                  <div className="w-40 h-40 rounded-[40px] bg-primary/10 border-4 border-primary/20 flex items-center justify-center font-black text-8xl text-primary italic shadow-2xl">DO</div>
                                  <div className="space-y-4 flex-1">
                                      <h3 className="text-5xl font-black italic tracking-tighter uppercase text-probix-text dark:text-white">David Okoro</h3>
                                      <p className="text-xl text-primary font-black italic opacity-80 uppercase tracking-widest tabular">Node #{walletAddress || "PRBX-9482"}</p>
                                  </div>
                              </div>

                              <div className="bento-card p-12 text-left">
                                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-probix-muted mb-8 border-b border-probix-border pb-6 italic">Transaction Pulse</h3>
                                  <div className="space-y-4">
                                      {transactions.map(tx => <TransactionRow key={tx.id} tx={tx} />)}
                                  </div>
                              </div>
                          </div>

                          <div className="space-y-10">
                              <div className="bento-card p-10 bg-primary shadow-2xl border-none relative overflow-hidden text-left">
                                  <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-2 italic">Funds</p>
                                  <h4 className="text-6xl font-black text-white italic tracking-tighter leading-none mb-8 tabular">₦{balance.toLocaleString()}</h4>
                                  <Button variant="secondary" className="w-full !py-6 glass bg-white/20 border-none text-xs font-black uppercase tracking-[0.3em] text-white" onClick={() => setIsDepositing(true)}>Sync Hub</Button>
                              </div>
                          </div>
                      </div>
                 </motion.div>
            )}

            {/* Fallback for detailed market or categories */}
            {detailedMarket && (
                <motion.div key="detailed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left space-y-10 max-w-7xl mx-auto">
                    <button onClick={() => setDetailedMarket(null)} className="text-xs font-black text-probix-muted hover:text-primary transition-all uppercase tracking-[0.2em] italic flex items-center gap-2 group active-press">
                        <ChevronRight className="rotate-180 group-hover:-translate-x-2 transition-transform" size={16}/> Node Hub
                    </button>
                    <div className="bento-card p-12 relative overflow-hidden flex flex-col min-h-[500px] rounded-[48px] dark:bg-raised-lacquer">
                         <div className="flex justify-between items-start mb-12 relative z-10">
                            <div className="space-y-4">
                               <span className="text-[10px] font-black text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 uppercase tracking-[0.4em] italic">{detailedMarket.category} Hub</span>
                               <h2 className="text-5xl lg:text-6xl font-black italic tracking-tighter leading-[0.9] max-w-2xl uppercase text-probix-text dark:text-white">{detailedMarket.title}</h2>
                            </div>
                            <div className="text-right">
                               <p className="text-8xl font-black italic tracking-tighter text-secondary leading-none tabular shadow-glow shadow-secondary/20">{detailedMarket.percentage}%</p>
                            </div>
                         </div>
                         <div className="flex-1 bg-probix-bg dark:bg-lacquer-black/40 rounded-[40px] border border-probix-border dark:border-white/5 relative group p-10 mb-8 overflow-hidden flex flex-col shadow-inner">
                            <MarketChart data={detailedMarket.chartData} color={detailedMarket.color} />
                         </div>
                    </div>
                </motion.div>
            )}

          </AnimatePresence>
          <div className="h-64" />
        </div>
      </main>

      {/* --- OVERLAYS --- */}
      <AnimatePresence>
        {isCreating && (
          <CreateForecastModal
            onClose={() => setIsCreating(false)}
            onCreate={() => {}}
          />
        )}
        {selectedMarket && (
          <TradingDrawer
            market={selectedMarket}
            onClose={() => setSelectedMarket(null)}
          />
        )}
        {isDepositing && (
          <TopUpModal onClose={() => setIsDepositing(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
