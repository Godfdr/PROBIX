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

export default function ProbixDashboardClient() {
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

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setMounted(true);
    setLiquidity(`₦${(Math.random() * 50 + 10).toFixed(1)}M`);
  }, []);

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) window.location.href = '/';
  }, [isAuthenticated, mounted]);

  // --- LIVE SESSION INSIGHTS SIMULATION ---
  useEffect(() => {
    if (!detailedMarket) return;
    const interval = setInterval(() => {
        const users = ["Node_Master", "Market_Oracle", "Elite_Forecaster", "Naira_Tracker", "Alpha_Sync"];
        const insights = [
            "Order depth increasing at current levels.",
            "Node synchronization successful. Liquidity stable.",
            "Predictive patterns suggest a bullish shift in the next cycle.",
            "Verification protocols passed for current session.",
            "Cross-node analysis confirms sentiment drift."
        ];
        const newComment = {
            id: Date.now(),
            user: users[Math.floor(Math.random() * users.length)],
            text: insights[Math.floor(Math.random() * insights.length)]
        };
        setSessionComments(prev => [newComment, ...prev].slice(0, 10));
    }, 12000);
    return () => clearInterval(interval);
  }, [detailedMarket]);

  // Sync detailed market when prices update in context
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
    const result = markets.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return result;
  }, [searchQuery, markets]);

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-probix-bg text-probix-text overflow-hidden">
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
              <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white animate-pulse">Initializing Terminal</h2>
              <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.5em] italic">Accessing Global Node Hub / v2.4.0</p>
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

        <header className="h-20 border-b border-probix-border flex items-center justify-between px-8 bg-probix-bg/80 backdrop-blur-md z-40 shrink-0">
          <div className="flex items-center gap-6 flex-1 max-w-xl text-left">
             <div className="relative w-full group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-probix-muted group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search forecasts, topics, analysts..."
                  className="w-full bg-probix-surface border border-probix-border rounded-[14px] py-3 pl-14 pr-4 text-sm font-medium focus:border-primary/50 outline-none transition-all placeholder:text-probix-muted/50 italic"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-40">
                    <span className="text-[10px] font-black border border-probix-border rounded px-1.5 py-0.5">⌘</span>
                    <span className="text-[10px] font-black border border-probix-border rounded px-1.5 py-0.5">K</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <ThemeToggle />
             <div className="relative">
                <Button variant="ghost" size="icon" className="h-10 w-10 glass !rounded-xl hover:border-primary/30 relative" onClick={() => setShowNotifications(!showNotifications)}>
                    <Bell size={20} />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow shadow-primary/50" />
                </Button>
                <AnimatePresence>
                    {showNotifications && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-4 w-[360px] glass rounded-[32px] p-8 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] text-left"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-probix-muted">Recent Alerts</h3>
                                <button className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">Mark all read</button>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-5 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 group-hover:scale-110 transition-transform">
                                        <TrendingUp size={18} />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-black italic uppercase text-probix-text dark:text-white group-hover:text-primary transition-colors">Market Shift Detected</p>
                                        <p className="text-[11px] font-bold text-probix-muted leading-tight opacity-70">Naira-USD Terminal node has shifted +12.4% Bullish in the last cycle.</p>
                                        <p className="text-[9px] font-black text-probix-muted uppercase opacity-40">2 mins ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-black italic uppercase text-probix-text dark:text-white group-hover:text-primary transition-colors">Position Verified</p>
                                        <p className="text-[11px] font-bold text-probix-muted leading-tight opacity-70">Your YES position on #NGR-INF-27 has been established on Base.</p>
                                        <p className="text-[9px] font-black text-probix-muted uppercase opacity-40">15 mins ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                                        <Zap size={18} />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-black italic uppercase text-probix-text dark:text-white group-hover:text-primary transition-colors">Liquidity Match</p>
                                        <p className="text-[11px] font-bold text-probix-muted leading-tight opacity-70">Lagos Oracle Hub 4 has verified new analytical clusters for session 2.4.</p>
                                        <p className="text-[9px] font-black text-probix-muted uppercase opacity-40">1 hour ago</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="secondary" className="w-full mt-8 !rounded-2xl !py-4 text-[10px] font-black uppercase tracking-[0.2em] italic glass border-white/5 hover:bg-white/10">View Analytical Hub</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
             <div className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-3" onClick={() => setView('profile')}>
                <img src="https://i.pravatar.cc/150?u=9" className="w-10 h-10 rounded-full object-cover border border-primary/20" alt="Avatar" />
             </div>
             <Button className="gap-2 !px-6 !py-3 !rounded-[12px] text-xs font-black italic tracking-widest shadow-glow" onClick={() => setIsCreating(true)}>
                <Plus size={18} />
                Create Forecast
             </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
            <AnimatePresence mode="wait">

              {/* VIEW: HOME */}
              {view === 'home' && !detailedMarket && !activeCategory && (
                <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12 max-w-5xl">

                  <div className="relative w-full rounded-[40px] bg-probix-surface dark:bg-[#020308] border border-probix-border dark:border-white/5 p-12 overflow-hidden shadow-3xl flex flex-col md:flex-row items-center min-h-[450px]">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(59,130,246,0.06),_transparent_70%)] pointer-events-none" />

                      <div className="relative z-30 flex-[1.2] text-left space-y-8 pl-4">
                          <h1 className="text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.85] text-probix-text dark:text-white uppercase">
                              The future <br /> isn&apos;t guessed. <br /> It&apos;s <span className="text-primary italic drop-shadow-glow text-[#3B82F6]">forecasted.</span>
                          </h1>
                          <p className="text-xl text-probix-muted font-bold italic opacity-80 max-w-sm leading-relaxed">
                              Join 42,831 Africans forecasting what matters most.
                          </p>
                          <div className="flex items-center gap-6 pt-4">
                              <Button size="lg" className="!px-10 !rounded-full !py-6 shadow-3xl shadow-primary/50 font-black italic uppercase tracking-widest text-lg group active:scale-95 transition-all text-white">
                                  Explore trending <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                              </Button>
                              <button className="flex items-center gap-3 text-sm font-black text-probix-text dark:text-white hover:text-primary transition-all uppercase tracking-widest group/play">
                                  <div className="w-10 h-10 rounded-full border border-probix-border dark:border-white/10 flex items-center justify-center group-hover/play:border-primary transition-colors bg-probix-bg dark:bg-white/5">
                                      <CirclePlay size={20} className="fill-probix-muted/10 dark:fill-white/10 group-hover:fill-primary/20 transition-all" />
                                  </div>
                                  How Probix works
                              </button>
                          </div>
                      </div>

                      <div className="relative flex-1 h-full min-h-[400px] w-full flex items-center justify-center">
                          <div className="relative w-[380px] h-[450px]">
                               <svg viewBox="0 0 100 125" className="w-full h-full drop-shadow-neon transition-all duration-1000 group-hover:scale-105">
                                  <path d="M48,15 L55,15 L62,20 L70,30 L75,45 L78,60 L75,75 L70,90 L62,105 L50,115 L38,105 L28,90 L22,75 L18,60 L22,45 L28,30 L38,20 Z" fill="url(#neon-grad)" className="opacity-10" />
                                  <path d="M48,15 L55,15 L62,20 L70,30 L75,45 L78,60 L75,75 L70,90 L62,105 L50,115 L38,105 L28,90 L22,75 L18,60 L22,45 L28,30 L38,20 Z" fill="none" stroke="#3B82F6" strokeWidth="0.5" className="opacity-30" />
                               </svg>
                               <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[5%] left-[-15%] scale-75 origin-right"><GlassBadge icon={<TrendingUp size={16} className="text-secondary" />} color="border-secondary/50" text="Inflation < 18%" stat="72% Yes" statColor="text-secondary" /></motion.div>
                               <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[48%] left-[-28%] scale-75 origin-right"><GlassBadge icon={<TrendingUp size={16} className="text-fuchsia" />} color="border-fuchsia/50" text="AFCON 2027 Morocco" stat="65% Yes" statColor="text-fuchsia" /></motion.div>
                               <PulseNode top="12%" left="48%" color="bg-secondary" />
                               <PulseNode top="55%" left="32%" color="bg-fuchsia" />
                               <PulseNode top="42%" right="8%" color="bg-accent" />
                               <PulseNode bottom="18%" left="55%" color="bg-primary" />
                          </div>
                      </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex justify-between items-end px-2 text-left">
                      <div className="flex items-center gap-4">
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none text-white">Trending Now</h3>
                        <span className="text-xl animate-bounce">🔥</span>
                      </div>
                      <button className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:underline">See all <ArrowRight size={14}/></button>
                    </div>

                    <div className="flex gap-3 px-2 overflow-x-auto no-scrollbar pb-2">
                        {['All', 'Politics', 'Economy', 'Sports', 'Tech', 'Entertainment', 'Crypto', 'Energy'].map(cat => (
                           <button
                             key={cat}
                             onClick={() => cat === 'All' ? setSearchQuery("") : setSearchQuery(cat)}
                             className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all shrink-0 ${searchQuery === cat || (cat === 'All' && searchQuery === "") ? 'bg-primary border-primary text-white shadow-glow' : 'bg-probix-surface border-probix-border hover:border-primary/50 text-white'}`}
                           >
                                {cat}
                           </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-1">
                      {filteredMarkets.slice(0, 4).map((market) => (
                        <MarketCard key={market.id} {...market} onClick={() => setDetailedMarket(market)} onQuickBet={() => setSelectedMarket(market)} />
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM REPUTATION SECTION FROM IMAGE */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-probix-surface dark:bg-white/5 rounded-[24px] p-6 border border-probix-border dark:border-white/5">
                      <div className="flex flex-col items-center gap-2 text-center border-r border-probix-border dark:border-white/5">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Zap size={16}/></div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-probix-text dark:text-white leading-tight">Real People<br/><span className="opacity-40">Real Opinions</span></p>
                      </div>
                      <div className="flex flex-col items-center gap-2 text-center border-r border-probix-border dark:border-white/5">
                          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary"><CheckCircle2 size={16}/></div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-probix-text dark:text-white leading-tight">Reputation-Based<br/><span className="opacity-40">Forecasting</span></p>
                      </div>
                      <div className="flex flex-col items-center gap-2 text-center border-r border-probix-border dark:border-white/5">
                          <div className="w-8 h-8 rounded-lg bg-fuchsia/10 flex items-center justify-center text-fuchsia"><Zap size={16}/></div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-probix-text dark:text-white leading-tight">AI-Powered<br/><span className="opacity-40">Insights</span></p>
                      </div>
                      <div className="flex flex-col items-center gap-2 text-center">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent"><Globe size={16}/></div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-probix-text dark:text-white leading-tight">African-Centric<br/><span className="opacity-40">Intelligence</span></p>
                      </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW: CATEGORY */}
              {view === 'category' && activeCategory && !detailedMarket && (
                <motion.div key="category-detail" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-12 text-left">
                    <div className="flex items-center gap-8 mb-16">
                      <div className="w-24 h-24 rounded-[40px] glass flex items-center justify-center text-6xl shadow-2xl border border-white/5 uppercase">
                          {CATEGORIES_DATA[activeCategory]?.icon || '🌐'}
                      </div>
                      <div className="flex-1 space-y-4">
                        <h2 className="text-7xl font-black italic tracking-tighter uppercase mb-2 leading-none text-white">{activeCategory} Hub</h2>
                        <p className="text-2xl text-probix-muted font-bold italic opacity-60 max-w-2xl leading-relaxed">{CATEGORIES_DATA[activeCategory]?.desc || 'Verified forecasting nodes.'}</p>
                      </div>
                      <div className="flex gap-10 pr-6">
                          <CategoryStat label="Active Nodes" value={CATEGORIES_DATA[activeCategory]?.stats.forecasts || "0"} />
                          <CategoryStat label="Analyst Sync" value={CATEGORIES_DATA[activeCategory]?.stats.analysts || "0"} />
                          <CategoryStat label="Avg Accuracy" value={CATEGORIES_DATA[activeCategory]?.stats.accuracy || "0%"} />
                      </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                      <div className="xl:col-span-2 space-y-12">
                        <div>
                            <p className="text-xs font-black text-probix-muted uppercase tracking-[0.4em] mb-8">Popular Topics</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                              {(CATEGORIES_DATA[activeCategory]?.topics || []).map((topic: Topic, i: number) => (
                                <div key={i} className="glass p-8 rounded-[32px] border border-white/5 flex flex-col gap-6 group cursor-pointer hover:border-primary/40 transition-all text-left relative overflow-hidden bg-white/[0.01]">
                                    <h4 className="text-lg font-black italic tracking-tight uppercase group-hover:text-primary transition-colors text-white">{topic.name}</h4>
                                    <div className="flex justify-between items-end relative z-10">
                                      <div>
                                          <p className="text-[10px] font-black text-probix-muted uppercase tracking-widest leading-none mb-2">{topic.forecasts} Forecasts</p>
                                          <p className="text-sm font-black text-secondary italic">{topic.accuracy} Avg Accuracy</p>
                                      </div>
                                      <div className="w-10 h-10 rounded-xl glass border-white/10 flex items-center justify-center group-hover:bg-primary transition-all group-hover:text-white"><ChevronRight size={18}/></div>
                                    </div>
                                </div>
                              ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-black text-probix-muted uppercase tracking-[0.4em] mb-8">Trending Forecasts</p>
                            <div className="space-y-6">
                              {markets.filter(m => m.category === activeCategory || activeCategory === 'Africa' || (activeCategory === 'Nigeria' && m.icon === '🇳🇬')).map((m, i) => (
                                <div key={i} className="glass p-10 rounded-[48px] border border-white/5 flex items-center gap-12 group cursor-pointer hover:border-primary/20 transition-all shadow-xl" onClick={() => setDetailedMarket(m)}>
                                    <div className="w-20 h-20 rounded-[32px] bg-probix-surface flex items-center justify-center text-5xl border border-white/5 shadow-inner">{m.icon}</div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-3xl font-black italic tracking-tight group-hover:text-primary transition-colors truncate leading-none uppercase text-white mb-2">{m.title}</h4>
                                      <p className="text-[10px] font-black text-probix-muted uppercase tracking-widest flex items-center gap-3 italic">
                                        <span className="text-primary">ACTIVE HUB</span> • {m.category}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-4xl font-black italic text-secondary leading-none mb-2">{m.percentage}% YES</p>
                                      <p className="text-[11px] font-black text-probix-muted uppercase tracking-widest opacity-60">{m.volume}</p>
                                    </div>
                                    <ChevronRight size={32} className="text-probix-muted opacity-20 group-hover:opacity-100 transition-opacity" />
                                </div>
                              ))}
                            </div>
                        </div>
                      </div>

                      <div className="space-y-10">
                        <div className="bento-card p-12 flex flex-col items-center text-center bg-primary/[0.02]">
                            <p className="text-xs font-black text-probix-muted uppercase tracking-[0.3em] mb-10 text-left w-full border-b border-white/5 pb-4">Market Sentiment</p>
                            <div className="relative w-56 h-56 flex items-center justify-center mb-10">
                              <svg className="w-full h-full -rotate-90">
                                  <circle cx="50%" cy="50%" r="45%" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-probix-border opacity-20" />
                                  <circle cx="50%" cy="50%" r="45%" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="282.6" strokeDashoffset={282.6 * (1 - (CATEGORIES_DATA[activeCategory]?.sentiment || 50) / 100)} className="text-secondary drop-shadow-glow" strokeLinecap="round" />
                              </svg>
                              <div className="absolute flex flex-col items-center">
                                  <span className="text-7xl font-black italic tracking-tighter text-white leading-none mb-1">{(CATEGORIES_DATA[activeCategory]?.sentiment || 50)}%</span>
                                  <span className="text-xs font-black text-secondary uppercase tracking-[0.3em] italic">Bullish</span>
                              </div>
                            </div>
                            <p className="text-base font-bold italic text-probix-muted leading-relaxed opacity-80">Increased liquidity detection in the last cycle.</p>
                        </div>
                      </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW: DETAILED MARKET */}
              {detailedMarket && (
                <motion.div key="analytical-view" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="h-full flex flex-col gap-10 text-left">
                    <div className="flex items-center justify-between">
                      <button onClick={() => setDetailedMarket(null)} className="flex items-center gap-3 text-sm font-black text-probix-muted hover:text-primary transition-all uppercase tracking-[0.2em] italic group">
                          <ChevronRight className="rotate-180 group-hover:-translate-x-2 transition-transform" size={20}/> Back to Node Stream
                      </button>
                      <div className="flex gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`glass h-12 w-12 !rounded-2xl transition-all ${watchlist.includes(detailedMarket.id) ? 'text-primary border-primary/40 bg-primary/10' : ''}`}
                            onClick={() => toggleWatchlist(detailedMarket.id)}
                          >
                            <Bookmark size={20} className={watchlist.includes(detailedMarket.id) ? 'fill-current' : ''} />
                          </Button>
                          <Button variant="ghost" size="icon" className="glass h-12 w-12 !rounded-2xl"><Share2 size={20}/></Button>
                      </div>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-10 flex-1 min-h-0 pb-10">
                      <div className="flex-[2.5] flex flex-col gap-10 overflow-hidden">
                          <div className="bento-card flex-1 p-14 relative overflow-hidden flex flex-col min-h-[500px]">
                            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_#3B82F605,_transparent_60%)]" />
                            <div className="flex justify-between items-start mb-16 relative z-10 text-left">
                                <div className="space-y-6">
                                  <span className="text-[10px] font-black text-primary bg-primary/10 px-6 py-2.5 rounded-full border border-primary/20 uppercase tracking-[0.4em]">{detailedMarket.category} Hub</span>
                                  <h2 className="text-6xl lg:text-7xl font-black italic tracking-tighter leading-[0.9] max-w-3xl uppercase text-white">{detailedMarket.title}</h2>
                                  <div className="flex items-center gap-8 text-probix-muted pt-4">
                                      <div className="flex items-center gap-3 bg-probix-surface px-5 py-3 rounded-2xl border border-probix-border shadow-inner"><Globe size={16}/> <span className="text-[11px] font-black uppercase tracking-[0.2em] italic">Lagos Terminal Node</span></div>
                                      <div className="flex items-center gap-3 bg-probix-surface px-5 py-3 rounded-2xl border border-probix-border shadow-inner"><Target size={16}/> <span className="text-[11px] font-black uppercase tracking-[0.2em] italic">Ends Dec 2026</span></div>
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-[11px] font-black text-probix-muted uppercase tracking-[0.4em] mb-4">Probability Node</p>
                                  <p className="text-9xl font-black italic tracking-tighter text-secondary leading-none shadow-glow shadow-secondary/10">{detailedMarket.percentage}% <span className="text-lg not-italic uppercase tracking-widest font-bold">YES</span></p>
                                  <p className="text-sm font-black text-secondary italic mt-6 flex items-center justify-end gap-2 animate-pulse leading-none"><TrendingUp size={20}/> +2.4% today</p>
                                </div>
                            </div>
                            <div className="flex-1 bg-[#010206] rounded-[56px] border border-white/5 relative group p-14 mb-8 overflow-hidden flex flex-col shadow-inner">
                                <MarketChart data={detailedMarket.chartData} color={detailedMarket.color} />
                            </div>
                          </div>
                          <div className="bento-card p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-secondary/[0.02] border-secondary/10 shadow-glow shadow-secondary/5 text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[80px]" />
                            <div className="space-y-4 relative z-10 text-left">
                                <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-secondary">Synchronize Session</h3>
                                <p className="text-lg text-probix-muted font-bold italic opacity-70 leading-relaxed">Position node at {(detailedMarket.yesPrice * 100).toFixed(0)}¢ / {(detailedMarket.noPrice * 100).toFixed(0)}¢ liquidity.</p>
                            </div>
                            <div className="flex gap-8 relative z-10">
                                <Button className="flex-1 !py-10 text-3xl !rounded-[40px] shadow-3xl shadow-secondary/30 font-black uppercase italic bg-secondary hover:bg-secondary/90 border-none transition-all active:scale-95 text-white" onClick={() => setSelectedMarket(detailedMarket)}>YES {(detailedMarket.yesPrice * 100).toFixed(0)}¢</Button>
                                <Button variant="secondary" className="flex-1 !py-10 text-3xl !rounded-[40px] glass border-white/10 font-black uppercase italic hover:bg-white/10 active:scale-95 transition-all text-white" onClick={() => setSelectedMarket(detailedMarket)}>NO {(detailedMarket.noPrice * 100).toFixed(0)}¢</Button>
                            </div>
                          </div>

                          {/* MARKET STATS GRID */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                              <StatBox label="Liquidity" value={liquidity} color="text-primary" />
                              <StatBox label="Volume" value={detailedMarket.volume.split(' ')[0]} color="text-secondary" />
                              <StatBox label="Analyst Sync" value="92%" color="text-accent" />
                              <StatBox label="Node Status" value="ACTIVE" color="text-secondary" animate />
                          </div>
                      </div>

                      <div className="flex-1 flex flex-col gap-10 overflow-hidden h-full min-w-[320px] text-left">
                          <div className="bento-card p-10 flex flex-col overflow-hidden h-[48%] shadow-2xl relative text-left">
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-probix-muted mb-10 border-b border-probix-border pb-8 flex items-center gap-4 relative z-10"><Users2 size={18} className="text-primary"/> Analyst Consensus</h3>
                            <div className="space-y-8 flex-1 overflow-y-auto no-scrollbar pr-2 relative z-10 text-left">
                                {ANALYSTS.map(a => (
                                  <div key={a.id} className="glass p-6 rounded-[32px] border-white/5 flex items-center gap-6 hover:border-primary/40 transition-all cursor-pointer group shadow-xl" onClick={() => {}}>
                                      <div className="relative">
                                          <img src={a.image} className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl border border-white/5" alt={a.name} />
                                          <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-secondary rounded-lg border-2 border-[#0A0C12] flex items-center justify-center shadow-glow shadow-secondary/40"><TrendingUp size={12} className="text-white"/></div>
                                      </div>
                                      <div className="flex-1 min-w-0 text-left">
                                        <p className="text-lg font-black italic truncate leading-none mb-2 uppercase tracking-tight group-hover:text-primary transition-colors text-white">{a.name}</p>
                                        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-3 italic text-left">Bullish • {a.accuracy}% Signal</p>
                                      </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="bento-card p-10 flex-1 flex flex-col overflow-hidden relative shadow-2xl text-left">
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-probix-muted mb-10 border-b border-probix-border pb-8 flex items-center gap-4 relative z-10"><CheckCircle2 size={18} className="text-secondary"/> Session Insights</h3>
                            <div className="flex-1 space-y-8 overflow-y-auto no-scrollbar pr-3 italic relative z-10 text-left">
                                <AnimatePresence initial={false}>
                                    {sessionComments.map(comment => (
                                        <motion.div
                                            key={comment.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                        >
                                            <Comment user={comment.user} text={comment.text} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <div className="mt-8 pt-8 border-t border-probix-border flex gap-5 relative z-10">
                                <input type="text" placeholder="Add insight..." className="flex-1 bg-probix-surface border border-probix-border rounded-[24px] px-8 text-sm font-bold focus:border-primary/50 outline-none transition-all italic placeholder:opacity-30 shadow-inner text-white" />
                                <Button size="icon" className="h-14 w-14 !rounded-[24px] shadow-3xl shadow-primary/30 text-white"><ArrowUp size={24}/></Button>
                            </div>
                          </div>
                      </div>
                    </div>
                </motion.div>
              )}

              {/* VIEW: FORECASTS (Portfolio) */}
              {view === 'forecasts' && !detailedMarket && (
                  <motion.div key="portfolio" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-12 text-left">
                      <div className="space-y-4 text-left">
                          <h2 className="text-7xl font-black italic tracking-tighter uppercase mb-2 text-white leading-none">Your Node Portfolio</h2>
                          <p className="text-2xl text-probix-muted font-bold italic opacity-60 max-w-2xl leading-relaxed">Track active positions and settlement nodes.</p>
                      </div>

                      {positions.length === 0 ? (
                          <div className="min-h-[400px] flex flex-col items-center justify-center glass rounded-[48px] border-white/5 p-20 text-center space-y-8">
                               <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center"><BarChart3 size={48} className="text-probix-muted" /></div>
                               <p className="text-2xl font-bold italic text-probix-muted">No active terminal positions detected.</p>
                               <Button onClick={() => setView('markets')}>Explore Markets</Button>
                          </div>
                      ) : (
                          <div className="space-y-6">
                              {positions.map((pos) => (
                                  <div key={pos.id} className="glass p-10 rounded-[48px] border border-white/5 flex items-center justify-between hover:bg-white/[0.02] transition-all group">
                                      <div className="flex items-center gap-10">
                                          <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-white shadow-3xl font-black text-xs ${pos.side === 'yes' ? 'bg-secondary' : 'bg-crimson'}`}>
                                              {pos.side.toUpperCase()}
                                          </div>
                                          <div className="text-left">
                                              <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white group-hover:text-primary transition-colors">{pos.marketTitle}</h4>
                                              <p className="text-[10px] font-black text-probix-muted uppercase tracking-widest mt-2 flex items-center gap-3 italic">
                                                  <Clock size={12}/> {new Date(pos.timestamp).toLocaleString()} • ID: {pos.id}
                                              </p>
                                          </div>
                                      </div>
                                      <div className="flex gap-16 items-center">
                                          <div className="text-right">
                                              <p className="text-xs font-black text-probix-muted uppercase tracking-widest mb-1 italic">Position</p>
                                              <p className="text-3xl font-black italic text-white leading-none uppercase tracking-tighter">₦{pos.amount.toLocaleString()}</p>
                                          </div>
                                          <div className="text-right">
                                              <p className="text-xs font-black text-probix-muted uppercase tracking-widest mb-1 italic">Entry</p>
                                              <p className="text-3xl font-black italic text-secondary leading-none uppercase tracking-tighter">{(pos.entryPrice * 100).toFixed(0)}¢</p>
                                          </div>
                                          <div className="w-px h-12 bg-white/10" />
                                          <Button variant="ghost" className="glass !rounded-2xl h-14 px-8 border-white/10 font-black italic uppercase text-xs tracking-widest hover:border-primary/50 text-white">Details</Button>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}
                  </motion.div>
              )}

              {/* VIEW: LEADERBOARD */}
              {view === 'leaderboard' && !detailedMarket && (
                  <motion.div key="leaderboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16 text-left">
                      <div className="flex justify-between items-end mb-8">
                          <div className="space-y-3">
                              <h2 className="text-8xl font-black italic tracking-tighter uppercase mb-2 leading-none text-white">Leaderboard</h2>
                              <p className="text-3xl text-probix-muted font-bold italic opacity-60 max-w-2xl leading-relaxed">Top analysts synchronized with the protocol.</p>
                          </div>
                          <div className="flex gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
                              {['All Time', '30D', '7D'].map(t => <button key={t} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${t === '30D' ? 'bg-primary text-white shadow-glow shadow-primary/30' : 'text-probix-muted hover:text-white'}`}>{t}</button>)}
                          </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end pt-20 pb-20">
                          <PodiumCard analyst={ANALYSTS[1]} rank={2} color="#8B949E" h="h-80" />
                          <PodiumCard analyst={ANALYSTS[0]} rank={1} color="#FFD700" featured h="h-96" />
                          <PodiumCard analyst={ANALYSTS[2]} rank={3} color="#CD7F32" h="h-72" />
                      </div>

                      <div className="space-y-6 max-w-5xl mx-auto">
                          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-probix-muted mb-10 border-b border-probix-border pb-8 flex items-center gap-4 relative z-10">Pro Analyst Registry</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {ANALYSTS.map((a, i) => (
                                  <AnalystRow key={a.id} analyst={a} rank={i + 1} />
                              ))}
                              {[1, 2, 3, 4].map((i) => (
                                  <AnalystRow
                                      key={`extra-${i}`}
                                      analyst={{
                                          name: `Node_Analyst_${432 + i}`,
                                          image: `https://i.pravatar.cc/150?u=${i + 20}`,
                                          accuracy: 85 - i,
                                          trend: "+4.2%"
                                      }}
                                      rank={ANALYSTS.length + i}
                                  />
                              ))}
                          </div>
                      </div>
                  </motion.div>
              )}

              {/* VIEW: INSIGHTS */}
              {view === 'insights' && !detailedMarket && (
                  <motion.div key="insights" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-20 text-left max-w-6xl mx-auto py-10">
                      <div className="space-y-6">
                          <h2 className="text-8xl font-black italic tracking-tighter uppercase mb-2 leading-none text-white">Protocol Insights</h2>
                          <p className="text-3xl text-probix-muted font-bold italic opacity-60 max-w-3xl leading-relaxed">Each area is a hub for forecasts, insights, and community discussions.</p>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                          <div className="space-y-12">
                              <InsightDetailItem
                                  icon={<Globe size={40} className="text-primary"/>}
                                  title="Pan-African Scope"
                                  desc="Navigate borders to track regional economic shifts and political nodes."
                              />
                              <InsightDetailItem
                                  icon={<TrendingUp size={40} className="text-secondary"/>}
                                  title="Accuracy Tracking"
                                  desc="Reputation system measuring every analyst node's historical precision."
                              />
                          </div>
                          <div className="bento-card p-16 bg-[#020308] border-white/5 relative overflow-hidden flex flex-col justify-center text-left">
                              <h3 className="text-6xl font-black italic tracking-tighter text-white leading-[0.9] uppercase">Every topic <br/> that matters.</h3>
                              <div className="flex gap-8 pt-10">
                                  <Button size="lg" className="!px-12 !rounded-full !py-8 text-xl font-black italic uppercase text-white">Join Protocol</Button>
                              </div>
                          </div>
                      </div>
                  </motion.div>
              )}

              {/* VIEW: PROFILE */}
              {view === 'profile' && !detailedMarket && (
                  <motion.div key="profile-hub" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-6xl mx-auto space-y-16 text-left py-6">
                      <div className="flex items-center justify-between">
                          <div className="space-y-3"><h2 className="text-7xl font-black italic tracking-tighter uppercase mb-2 text-white leading-none">Terminal Hub</h2><p className="text-2xl text-probix-muted font-bold italic opacity-70 max-w-xl">Manage credentials and terminal security.</p></div>
                          <Button variant="danger" size="icon" className="glass !rounded-[32px] h-20 w-20 hover:bg-crimson text-white" onClick={() => logout()}><LogOut size={36}/></Button>
                      </div>

                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                          <div className="xl:col-span-2 space-y-12">
                              <div className="bento-card p-16 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden shadow-3xl bg-[#020308] text-left">
                                  <div className="relative shrink-0">
                                      <div className="w-48 h-48 rounded-[60px] bg-primary/10 border-4 border-primary/20 flex items-center justify-center font-black text-9xl text-primary italic shadow-3xl">DO</div>
                                      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#010206] rounded-[24px] border-4 border-[#010206] shadow-3xl flex items-center justify-center">
                                          <div className="w-10 h-10 bg-secondary rounded-[18px] flex items-center justify-center text-white shadow-glow"><CheckCircle2 size={24}/></div>
                                      </div>
                                  </div>
                                  <div className="space-y-8 relative z-10 flex-1 text-left">
                                      <h3 className="text-7xl font-black italic tracking-tighter uppercase leading-none text-white">David Okoro</h3>
                                      <p className="text-2xl text-primary font-black italic opacity-80 uppercase tracking-widest truncate">Node #{walletAddress || "PRBX-9482"}</p>
                                      <div className="flex gap-5 pt-4">
                                          <div className="px-8 py-3 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-black uppercase tracking-widest italic">Rank #1 Global</div>
                                          <div className="px-8 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest italic">Level 4</div>
                                      </div>
                                  </div>
                              </div>

                              <div className="bento-card p-16 text-left">
                                  <div className="flex justify-between items-center mb-16 px-2">
                                      <h3 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-6 text-white"><CheckCircle2 size={40} className="text-primary"/> Financial Bridges</h3>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                      <WalletOption label="Veltra Hub" description="Active Sync" active />
                                      <WalletOption label="Bridge Protocol" description="WalletConnect" />
                                  </div>
                              </div>

                              <div className="bento-card p-16 text-left">
                                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-probix-muted mb-10 border-b border-probix-border pb-8 flex items-center gap-5 text-left">Transaction Pulse</h3>
                                  <div className="space-y-4">
                                      {transactions.length === 0 ? (
                                          <p className="text-sm font-bold italic text-probix-muted text-center py-10">No recent transactions synchronized.</p>
                                      ) : (
                                          transactions.map(tx => (
                                              <div key={tx.id} className="tabular">
                                                <TransactionRow tx={tx} />
                                              </div>
                                          ))
                                      )}
                                  </div>
                              </div>
                          </div>

                          <div className="space-y-12">
                              <div className="bento-card p-12 bg-primary shadow-[0_0_80px_rgba(59,130,246,0.3)] border-none relative overflow-hidden group text-left">
                                  <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.3em] mb-4 italic">Synchronized Funds</p>
                                  <h4 className="text-7xl font-black text-white italic tracking-tighter shadow-3xl leading-none mb-6">₦{balance.toLocaleString()}</h4>
                                  <div className="flex items-center gap-4 text-white/80 py-6 border-t border-white/10 mb-6"><Clock size={24}/><p className="text-[11px] font-bold italic uppercase tracking-widest">Latest Audit: Success</p></div>
                                  <Button variant="secondary" className="w-full !py-8 glass bg-white/20 border-none text-sm font-black uppercase tracking-[0.3em] text-white" onClick={() => setIsDepositing(true)}>Sync Terminal Funds</Button>
                              </div>
                              <div className="bento-card p-12 space-y-10 shadow-2xl text-left">
                                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-probix-muted border-b border-probix-border pb-8 flex items-center gap-5 text-left"><Settings className="text-primary" size={20}/> Config Protocols</h3>
                                  <div className="space-y-8 text-left">
                                      <SettingItem label="Global Alerts" active />
                                      <SettingItem label="OLED Optimization" active />
                                      <SettingItem label="Multi-Sig 2FA" active />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </motion.div>
              )}

              {/* VIEW: EXPLORE & MARKETS */}
              {['explore', 'markets'].includes(view) && !detailedMarket && (
                  <motion.div key="markets-explore" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-12 text-left">
                      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                          <div className="space-y-4">
                              <h2 className="text-7xl font-black italic tracking-tighter uppercase mb-2 text-white leading-none">{view === 'explore' ? 'Global Discovery' : 'Active Markets'}</h2>
                              <p className="text-2xl text-probix-muted font-bold italic opacity-60 max-w-2xl leading-relaxed">
                                  {view === 'explore' ? 'Discover trending nodes across the African prediction protocol.' : 'High-fidelity terminal nodes verified for session trading.'}
                              </p>
                          </div>
                          <div className="flex gap-4 glass p-2 rounded-[24px] border-white/5 shadow-xl">
                              <Button variant="ghost" size="sm" className="!rounded-xl px-6 bg-white/5 border border-white/10 font-black italic uppercase tracking-widest text-[10px] text-white">Trending</Button>
                              <Button variant="ghost" size="sm" className="!rounded-xl px-6 font-black italic uppercase tracking-widest text-[10px] text-probix-muted">Newest</Button>
                              <Button variant="ghost" size="sm" className="!rounded-xl px-6 font-black italic uppercase tracking-widest text-[10px] text-probix-muted">Ending Soon</Button>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                          {filteredMarkets.map(m => (
                              <MarketCard key={m.id} {...m} onClick={() => setDetailedMarket(m)} onQuickBet={() => setSelectedMarket(m)} />
                          ))}
                      </div>
                  </motion.div>
              )}

              {/* VIEW: WATCHLIST */}
              {view === 'watchlist' && !detailedMarket && (
                  <motion.div key="watchlist-hub" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-12 text-left">
                      <div className="space-y-4">
                          <h2 className="text-7xl font-black italic tracking-tighter uppercase mb-2 text-white leading-none">Your Watchlist</h2>
                          <p className="text-2xl text-probix-muted font-bold italic opacity-60 max-w-2xl leading-relaxed">Tracking priority terminal nodes for analysis.</p>
                      </div>

                      {watchlist.length === 0 ? (
                          <div className="min-h-[400px] flex flex-col items-center justify-center glass rounded-[48px] border-white/5 p-20 text-center space-y-8">
                               <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center"><Bookmark size={48} className="text-probix-muted" /></div>
                               <p className="text-2xl font-bold italic text-probix-muted">No nodes currently tracked in watchlist.</p>
                               <Button onClick={() => setView('markets')}>Discover Markets</Button>
                          </div>
                      ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                              {markets.filter(m => watchlist.includes(m.id)).map(m => (
                                  <MarketCard key={m.id} {...m} onClick={() => setDetailedMarket(m)} onQuickBet={() => setSelectedMarket(m)} />
                              ))}
                          </div>
                      )}
                  </motion.div>
              )}

              {/* VIEW: COMMUNITIES */}
              {view === 'communities' && !detailedMarket && (
                  <motion.div key="communities-hub" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-12 text-left">
                      <div className="space-y-4">
                          <h2 className="text-7xl font-black italic tracking-tighter uppercase mb-2 text-white leading-none">Node Communities</h2>
                          <p className="text-2xl text-probix-muted font-bold italic opacity-60 max-w-2xl leading-relaxed">Join specialized hubs to synchronize with top analysts.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                          {Object.keys(CATEGORIES_DATA).map(key => (
                              <div key={key} className="glass p-12 rounded-[56px] border border-white/5 flex flex-col gap-8 hover:bg-white/[0.02] transition-all group cursor-pointer shadow-xl" onClick={() => { setActiveCategory(key); setView('category'); }}>
                                  <div className="flex justify-between items-start">
                                      <div className="w-20 h-20 rounded-[32px] bg-probix-surface flex items-center justify-center text-5xl border border-white/5 shadow-inner group-hover:scale-110 transition-transform">{CATEGORIES_DATA[key].icon}</div>
                                      <Button variant="ghost" className="!rounded-2xl glass border-white/10 text-[10px] font-black uppercase tracking-widest italic hover:bg-primary hover:text-white transition-all">Join Hub</Button>
                                  </div>
                                  <div className="space-y-4">
                                      <h3 className="text-4xl font-black italic tracking-tighter uppercase text-white group-hover:text-primary transition-colors">{key} Protocol</h3>
                                      <p className="text-lg text-probix-muted font-bold italic opacity-60 line-clamp-2">{CATEGORIES_DATA[key].desc}</p>
                                  </div>
                                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                                      <div className="flex -space-x-4">
                                          {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/150?u=${i+10}`} className="w-10 h-10 rounded-full border-2 border-[#010206] object-cover" alt="User avatar" />)}
                                          <div className="w-10 h-10 rounded-full border-2 border-[#010206] bg-probix-surface flex items-center justify-center text-[10px] font-black italic text-probix-muted">+{CATEGORIES_DATA[key].stats.followers}</div>
                                      </div>
                                      <div className="text-right">
                                          <p className="text-[10px] font-black text-probix-muted uppercase tracking-widest leading-none mb-1 italic">Accuracy</p>
                                          <p className="text-2xl font-black italic text-secondary leading-none">{CATEGORIES_DATA[key].stats.accuracy}</p>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </motion.div>
              )}

            </AnimatePresence>
            <div className="h-64" />
          </div>

          {/* RIGHT SIDEBAR WIDGETS FROM IMAGE */}
          <aside className="w-80 border-l border-probix-border p-6 flex flex-col gap-8 overflow-y-auto no-scrollbar bg-probix-bg/50 shrink-0 hidden xl:flex">
              <div className="space-y-6">
                  <div className="flex justify-between items-center px-1">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-probix-text dark:text-white">Biggest Movers</h3>
                      <span className="text-[9px] font-black text-probix-muted uppercase border border-probix-border px-1.5 py-0.5 rounded">24h</span>
                  </div>
                  <div className="space-y-4">
                      <MoverItem label="Fuel price decrease" trend="+12.4%" positive />
                      <MoverItem label="USD will rise above" trend="-8.7%" />
                      <MoverItem label="Blackouts reduce" trend="+6.1%" positive />
                      <MoverItem label="Bitcoin above $120k" trend="+5.3%" positive />
                  </div>
              </div>

              <div className="space-y-6">
                  <div className="flex justify-between items-center px-1">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-probix-text dark:text-white">Top Analysts</h3>
                      <button className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">View all</button>
                  </div>
                  <div className="space-y-4">
                      {ANALYSTS.map(a => (
                          <div key={a.id} className="flex items-center justify-between group cursor-pointer">
                              <div className="flex items-center gap-3">
                                  <img src={a.image} className="w-8 h-8 rounded-full object-cover" alt={a.name} />
                                  <div className="text-left">
                                      <p className="text-[10px] font-black uppercase text-probix-text dark:text-white leading-none mb-1">{a.name}</p>
                                      <p className="text-[9px] font-bold text-secondary uppercase italic opacity-60">{a.accuracy}% Accuracy</p>
                                  </div>
                              </div>
                              <button className="bg-primary text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-lg shadow-glow">Follow</button>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="bg-probix-surface dark:bg-[#0A0C12] border border-probix-border dark:border-white/5 rounded-3xl p-6 space-y-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl -z-0" />
                  <div className="flex justify-between items-center relative z-10">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-probix-text dark:text-white">Probix Insights</h3>
                      <div className="bg-primary/20 text-primary text-[8px] font-black px-1.5 py-0.5 rounded uppercase">AI</div>
                  </div>
                  <div className="space-y-4 relative z-10">
                      <div className="h-20 w-full bg-probix-bg/50 dark:bg-white/[0.02] rounded-xl overflow-hidden">
                          <MarketChart data={[30, 45, 40, 60, 55, 70, 65]} color="#3B82F6" />
                      </div>
                      <div className="text-left">
                          <p className="text-[10px] font-bold text-probix-muted uppercase tracking-widest leading-none mb-2 italic">Overall market confidence is</p>
                          <p className="text-xl font-black italic text-probix-text dark:text-white uppercase tracking-tighter mb-4">Bullish <span className="text-primary">(62% avg)</span></p>
                          <p className="text-[9px] font-medium text-probix-muted leading-relaxed mb-6 opacity-60">Top driver: Inflation report, FX policy, Oil prices drop</p>
                          <button className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-2 group/link">Read full report <ArrowRight size={10} className="group-hover/link:translate-x-1 transition-transform"/></button>
                      </div>
                  </div>
              </div>

              <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-probix-text dark:text-white px-1">Featured Analyst</h3>
                  <div className="bg-probix-surface dark:bg-white/5 border border-probix-border dark:border-white/5 rounded-3xl p-4 flex items-center gap-4 group cursor-pointer hover:border-primary/30 transition-all">
                      <img src="https://i.pravatar.cc/150?u=12" className="w-10 h-10 rounded-xl object-cover" alt="The Macro Sage" />
                      <div className="flex-1 text-left min-w-0">
                          <p className="text-[10px] font-black uppercase text-probix-text dark:text-white truncate">The Macro Sage <CheckCircle2 className="inline text-primary" size={10}/></p>
                          <p className="text-[9px] font-bold text-secondary uppercase tracking-widest italic leading-none mt-1">91% Accuracy</p>
                      </div>
                      <ChevronRight size={14} className="text-probix-muted" />
                  </div>
              </div>
          </aside>
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
