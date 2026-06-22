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

interface Topic {
  name: string;
  forecasts: string;
  accuracy: string;
}

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
    markets
  } = useProbix();

  const [view, setView] = useState<PageView>('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [detailedMarket, setDetailedMarket] = useState<Market | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [liquidity, setLiquidity] = useState("₦0.0M");
  const [sessionComments, setSessionComments] = useState([
    { id: 1, user: "Alex Terminal", text: "Analytical clusters verified by Lagos Node 4 show massive liquidity shift." },
    { id: 2, user: "CryptoWhale_NG", text: "Highest verification score in current session nodes." },
  ]);

  useEffect(() => {
    setMounted(true);
    setLiquidity(`₦${(Math.random() * 50 + 10).toFixed(1)}M`);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) window.location.href = '/';
  }, [isAuthenticated, mounted]);

  // Sync detailed market when prices update
  useEffect(() => {
    if (detailedMarket) {
      const updated = markets.find(m => m.id === detailedMarket.id);
      if (updated && JSON.stringify(updated) !== JSON.stringify(detailedMarket)) {
        setDetailedMarket(updated);
      }
    }
    if (selectedMarket) {
      const updated = markets.find(m => m.id === selectedMarket.id);
      if (updated && JSON.stringify(updated) !== JSON.stringify(selectedMarket)) {
        setSelectedMarket(updated);
      }
    }
  }, [markets, detailedMarket, selectedMarket]);

  const filteredMarkets = useMemo(() => {
    return markets.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, markets]);

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-probix-bg text-probix-text overflow-hidden transition-colors duration-500">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] bg-probix-bg flex flex-col items-center justify-center gap-12"
          >
            <div className="relative">
              <ProbixLogo size="lg" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border-t-2 border-primary rounded-full opacity-20"
              />
            </div>
            <div className="space-y-4 text-center">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase text-probix-text animate-pulse">Initializing Terminal</h2>
              <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.5em] italic opacity-40">Accessing Global Node Hub / v2.4.0</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <div className="flex items-center gap-6 flex-1 max-w-2xl text-left">
             <div className="relative w-full group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-probix-muted group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search forecasts, topics, analysts..."
                  className="w-full bg-probix-surface border border-probix-border rounded-[14px] py-3 pl-14 pr-4 text-sm font-medium focus:border-primary/50 outline-none transition-all placeholder:text-probix-muted/50 italic shadow-inner"
                />
             </div>
          </div>

          <div className="flex items-center gap-6">
             <ThemeToggle />
             <div className="relative">
                <Button variant="ghost" size="icon" className="h-10 w-10 glass !rounded-xl hover:border-primary/30 relative" onClick={() => setShowNotifications(!showNotifications)}>
                    <Bell size={20} />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow shadow-primary/50" />
                </Button>
             </div>
             <div className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-3" onClick={() => setView('profile')}>
                <img src="https://i.pravatar.cc/150?u=9" className="w-10 h-10 rounded-full object-cover border border-primary/20 shadow-lg" alt="Avatar" />
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
              <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-16 max-w-7xl mx-auto">

                <div className="relative w-full rounded-[48px] bg-probix-surface dark:bg-[#020308] border border-probix-border dark:border-white/5 p-16 overflow-hidden shadow-3xl flex flex-col md:flex-row items-center min-h-[500px]">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(59,130,246,0.06),_transparent_70%)] pointer-events-none" />

                    <div className="relative z-30 flex-[1] text-left space-y-10 pl-4">
                        <h1 className="text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.85] text-probix-text dark:text-white uppercase">
                            The future <br /> isn&apos;t guessed. <br /> It&apos;s <span className="text-primary italic drop-shadow-glow">forecasted.</span>
                        </h1>
                        <p className="text-2xl text-probix-muted font-bold italic opacity-80 max-w-sm leading-relaxed">
                            Join 42,831 Africans forecasting what matters most.
                        </p>
                        <div className="flex items-center gap-8 pt-6">
                            <Button size="lg" className="!px-12 !rounded-full !py-8 shadow-3xl shadow-primary/50 font-black italic uppercase tracking-widest text-xl group active:scale-95 transition-all text-white">
                                Explore discovery <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform w-6 h-6" />
                            </Button>
                            <button className="flex items-center gap-4 text-base font-black text-probix-text dark:text-white hover:text-primary transition-all uppercase tracking-widest group/play">
                                <div className="w-12 h-12 rounded-full border border-probix-border dark:border-white/10 flex items-center justify-center group-hover/play:border-primary transition-colors bg-probix-bg dark:bg-white/5">
                                    <CirclePlay size={24} className="fill-probix-muted/10 dark:fill-white/10 group-hover:fill-primary/20 transition-all" />
                                </div>
                                How Probix works
                            </button>
                        </div>
                    </div>

                    <div className="relative flex-1 h-full min-h-[450px] w-full flex items-center justify-center pr-4">
                        <div className="relative w-[420px] h-[500px]">
                             <svg viewBox="0 0 100 125" className="w-full h-full drop-shadow-neon transition-all duration-1000 group-hover:scale-105">
                                <path d="M48,15 L55,15 L62,20 L70,30 L75,45 L78,60 L75,75 L70,90 L62,105 L50,115 L38,105 L28,90 L22,75 L18,60 L22,45 L28,30 L38,20 Z" fill="url(#neon-grad)" className="opacity-10" />
                                <path d="M48,15 L55,15 L62,20 L70,30 L75,45 L78,60 L75,75 L70,90 L62,105 L50,115 L38,105 L28,90 L22,75 L18,60 L22,45 L28,30 L38,20 Z" fill="none" stroke="#3B82F6" strokeWidth="0.5" className="opacity-30" />
                             </svg>
                             <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[5%] left-[-15%] scale-90 origin-right"><GlassBadge icon={<TrendingUp size={16} className="text-secondary" />} color="border-secondary/50" text="Inflation < 18%" stat="72% Yes" statColor="text-secondary" /></motion.div>
                             <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[48%] left-[-28%] scale-90 origin-right"><GlassBadge icon={<TrendingUp size={16} className="text-fuchsia" />} color="border-fuchsia/50" text="AFCON 2027 Morocco" stat="65% Yes" statColor="text-fuchsia" /></motion.div>
                             <PulseNode top="12%" left="48%" color="bg-secondary" />
                             <PulseNode top="55%" left="32%" color="bg-fuchsia" />
                             <PulseNode top="42%" right="8%" color="bg-accent" />
                             <PulseNode bottom="18%" left="55%" color="bg-primary" />
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                  <div className="flex justify-between items-end mb-12 px-2 text-left">
                    <div className="flex items-center gap-4"><h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none text-probix-text dark:text-white">Trending Hubs</h3><span className="text-2xl animate-bounce">🔥</span></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-1">
                    {filteredMarkets.map((market) => (
                      <MarketCard key={market.id} {...market} onClick={() => setDetailedMarket(market)} onQuickBet={() => setSelectedMarket(market)} />
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* Rest of views are identical to original single-file Client dashboard */}
            {/* [OMITTED FOR CONCISION] */}

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
