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
  Settings,
  MoreVertical,
  Activity,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

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

  useEffect(() => {
    setMounted(true);
    setLiquidity(`₦${(Math.random() * 50 + 10).toFixed(1)}M`);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) window.location.href = '/';
  }, [isAuthenticated, mounted]);

  // Simulation of Live Comments
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } }
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-probix-bg text-probix-text overflow-hidden transition-colors duration-500">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] bg-probix-bg flex flex-col items-center justify-center gap-16"
          >
            <div className="relative">
              <ProbixLogo size="lg" />
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-60px] border-t-[0.5px] border-primary/40 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border-b-[0.5px] border-secondary/40 rounded-full"
              />
            </div>
            <div className="space-y-6 text-center">
              <h2 className="text-5xl font-black italic tracking-tighter uppercase text-probix-text animate-pulse">Initializing Terminal</h2>
              <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.8em] italic opacity-40">Lagos Oracle Node / Hub 2.4.0</p>
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
        <header className="h-24 border-b border-probix-border flex items-center justify-between px-12 bg-probix-bg/80 backdrop-blur-3xl z-40 shrink-0">
          <div className="flex items-center gap-8 flex-1 max-w-2xl text-left">
             <div className="relative w-full group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-probix-muted group-focus-within:text-primary transition-all duration-300" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search forecasting nodes, analysts, global topics..."
                  className="w-full bg-probix-surface border border-probix-border rounded-[20px] py-4 pl-16 pr-10 text-base font-medium focus:border-primary/50 outline-none transition-all placeholder:text-probix-muted/40 italic shadow-inner"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-30 group-focus-within:opacity-100 transition-opacity">
                    <span className="text-[11px] font-black border border-probix-border rounded-lg px-2 py-1 bg-probix-bg">⌘</span>
                    <span className="text-[11px] font-black border border-probix-border rounded-lg px-2 py-1 bg-probix-bg">K</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-8 pl-8">
             <ThemeToggle />
             <div className="relative group/notif">
                <Button variant="ghost" size="icon" className="h-12 w-12 glass !rounded-2xl hover:border-primary/40 relative active-press" onClick={() => setShowNotifications(!showNotifications)}>
                    <Bell size={24} className="text-probix-muted group-hover/notif:text-primary transition-colors" />
                    <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-glow shadow-primary/50 border-2 border-probix-bg" />
                </Button>
                <AnimatePresence>
                    {showNotifications && (
                        <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute right-0 mt-6 w-[420px] glass rounded-[40px] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.4)] z-[100] text-left border-white/10"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-probix-muted">Synchronized Alerts</h3>
                                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline active-press">Mark all read</button>
                            </div>
                            <div className="space-y-8">
                                <NotificationRow title="Market Shift Detected" desc="Naira-USD Terminal node has shifted +12.4% Bullish in the last cycle." time="2m ago" icon={<TrendingUp size={20}/>} color="secondary" />
                                <NotificationRow title="Position Established" desc="Your YES position on #AFCON-27 has been verified on the Base bridge." time="15m ago" icon={<CheckCircle2 size={20}/>} color="primary" />
                                <NotificationRow title="Oracle Synchronization" desc="Lagos Oracle Hub 4 has released new analytical clusters for session 2.4." time="1h ago" icon={<Zap size={20}/>} color="accent" />
                            </div>
                            <Button variant="secondary" className="w-full mt-10 !rounded-2xl !py-5 text-[11px] font-black uppercase tracking-[0.3em] italic glass border-white/5 hover:bg-white/10 active-press">Enter Analytical Hub</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
             <div className="cursor-pointer hover:opacity-80 transition-all flex items-center gap-4 active-press" onClick={() => setView('profile')}>
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?u=9" className="w-12 h-12 rounded-2xl object-cover border-2 border-primary/20 shadow-xl" alt="Avatar" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary rounded-lg flex items-center justify-center border-2 border-probix-bg shadow-glow"><CheckCircle2 size={10} className="text-white"/></div>
                </div>
             </div>
             <Button className="gap-3 !px-8 !py-4 !rounded-[18px] text-sm font-black italic tracking-widest shadow-glow active-press group" onClick={() => setIsCreating(true)}>
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                Establish Forecast
             </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
            <AnimatePresence mode="wait">

              {/* VIEW: HOME */}
              {view === 'home' && !detailedMarket && !activeCategory && (
                <motion.div
                  key="home"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-20 max-w-6xl mx-auto"
                >
                  <motion.div variants={itemVariants} className="relative w-full rounded-[56px] bg-probix-surface dark:bg-[#020308] border border-probix-border dark:border-white/5 p-16 overflow-hidden shadow-3xl flex flex-col xl:flex-row items-center min-h-[520px]">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_oklch(65%_0.2_250_/_10%),_transparent_70%)] pointer-events-none" />

                      <div className="relative z-30 flex-[1.3] text-left space-y-12 pl-4">
                          <h1 className="text-8xl lg:text-9xl font-light italic tracking-tighter leading-[0.8] text-probix-text dark:text-white uppercase">
                              The future <br /> isn&apos;t guessed. <br /> <span className="font-black text-primary drop-shadow-glow">forecasted.</span>
                          </h1>
                          <p className="text-2xl text-probix-muted font-bold italic opacity-60 max-w-md leading-relaxed">
                              Join 42,831 Analysts using local expertise to predict what matters most.
                          </p>
                          <div className="flex items-center gap-10 pt-4">
                              <Button size="lg" className="!px-14 !rounded-full !py-8 shadow-3xl shadow-primary/40 font-black italic uppercase tracking-[0.2em] text-xl group active-press transition-all text-white">
                                  Explore discovery <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform w-6 h-6" />
                              </Button>
                              <button className="flex items-center gap-5 text-base font-black text-probix-text dark:text-white hover:text-primary transition-all uppercase tracking-widest group/play active-press">
                                  <div className="w-14 h-14 rounded-full border border-probix-border dark:border-white/10 flex items-center justify-center group-hover/play:border-primary transition-colors bg-probix-bg dark:bg-white/5 shadow-inner">
                                      <CirclePlay size={28} className="fill-probix-muted/10 dark:fill-white/10 group-hover:fill-primary/20 transition-all" />
                                  </div>
                                  Terminal Tutorial
                              </button>
                          </div>
                      </div>

                      <div className="relative flex-1 h-full min-h-[450px] w-full flex items-center justify-center">
                          <div className="relative w-[420px] h-[500px]">
                               <svg viewBox="0 0 100 125" className="w-full h-full drop-shadow-neon transition-all duration-1000">
                                  <path d="M48,15 L55,15 L62,20 L70,30 L75,45 L78,60 L75,75 L70,90 L62,105 L50,115 L38,105 L28,90 L22,75 L18,60 L22,45 L28,30 L38,20 Z" fill="url(#neon-grad)" className="opacity-10" />
                                  <path d="M48,15 L55,15 L62,20 L70,30 L75,45 L78,60 L75,75 L70,90 L62,105 L50,115 L38,105 L28,90 L22,75 L18,60 L22,45 L28,30 L38,20 Z" fill="none" stroke="oklch(65% 0.2 250 / 30%)" strokeWidth="0.5" />
                               </svg>
                               <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[8%] left-[-20%] scale-90 origin-right"><GlassBadge icon={<TrendingUp size={16} className="text-secondary" />} color="border-secondary/50" text="Inflation < 18%" stat="72% Yes" statColor="text-secondary" /></motion.div>
                               <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[52%] left-[-35%] scale-90 origin-right"><GlassBadge icon={<Award size={16} className="text-fuchsia" />} color="border-fuchsia/50" text="AFCON 2027 Morocco" stat="65% Yes" statColor="text-fuchsia" /></motion.div>
                               <PulseNode top="12%" left="48%" color="bg-secondary" />
                               <PulseNode top="55%" left="32%" color="bg-fuchsia" />
                               <PulseNode top="42%" right="8%" color="bg-accent" />
                               <PulseNode bottom="18%" left="55%" color="bg-primary" />
                          </div>
                      </div>
                  </motion.div>

                  <div className="space-y-12">
                    <motion.div variants={itemVariants} className="flex justify-between items-end px-4 text-left">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-probix-text dark:text-white">Active Node Stream</h2>
                          <span className="text-2xl animate-bounce">⚡</span>
                        </div>
                        <p className="text-sm font-bold text-probix-muted uppercase tracking-widest italic opacity-60">High-fidelity markets updated in real-time</p>
                      </div>
                      <button className="text-xs font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3 hover:underline active-press bg-primary/10 px-6 py-3 rounded-full border border-primary/20">View Registry <ArrowRight size={16}/></button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex gap-4 px-4 overflow-x-auto no-scrollbar pb-4">
                        {['All Hubs', 'Politics', 'Economy', 'Sports', 'Tech', 'Entertainment', 'Crypto', 'Energy'].map(cat => (
                           <button
                             key={cat}
                             onClick={() => {
                                cat === 'All Hubs' ? setSearchQuery("") : setSearchQuery(cat);
                                toast.info(`Accessing ${cat} Node`, { duration: 1000 });
                             }}
                             className={`px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all shrink-0 active-press ${searchQuery === cat || (cat === 'All Hubs' && searchQuery === "") ? 'bg-primary border-primary text-white shadow-glow' : 'bg-probix-surface border-probix-border hover:border-primary/50 text-probix-text dark:text-white'}`}
                           >
                                {cat}
                           </button>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-2">
                      {filteredMarkets.slice(0, 4).map((market) => (
                        <MarketCard key={market.id} {...market} onClick={() => setDetailedMarket(market)} onQuickBet={() => setSelectedMarket(market)} />
                      ))}
                    </motion.div>
                  </div>

                  {/* HIGH-CRAFT VALUE PROP SECTION */}
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-probix-surface/40 dark:bg-white/[0.03] rounded-[48px] p-12 border border-probix-border dark:border-white/5 backdrop-blur-sm">
                      <ValuePropItem icon={<Zap size={24}/>} title="Oracle Verified" desc="Institutional data sources." color="primary" />
                      <ValuePropItem icon={<CheckCircle2 size={24}/>} title="Instant Settlement" desc="Verified node payouts." color="secondary" />
                      <ValuePropItem icon={<Activity size={24}/>} title="Live Insights" desc="AI-Powered prediction flow." color="fuchsia" />
                      <ValuePropItem icon={<Globe size={24}/>} title="Global Scale" desc="Pan-African market scope." color="accent" />
                  </motion.div>
                </motion.div>
              )}

              {/* VIEW: CATEGORY (Deep Craft) */}
              {view === 'category' && activeCategory && !detailedMarket && (
                <motion.div
                  key="category-detail"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-16 text-left max-w-6xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="flex items-center gap-12 mb-20 bg-probix-surface/40 dark:bg-white/[0.02] p-12 rounded-[56px] border border-probix-border dark:border-white/5 shadow-inner">
                      <div className="w-32 h-32 rounded-[40px] glass flex items-center justify-center text-7xl shadow-2xl border-white/10 uppercase bg-probix-bg dark:bg-[#0A0C12] active-press">
                          {CATEGORIES_DATA[activeCategory]?.icon || '🌐'}
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 italic">Validated Protocol</span>
                          <div className="h-px flex-1 bg-probix-border dark:bg-white/5" />
                        </div>
                        <h2 className="text-8xl font-black italic tracking-tighter uppercase leading-none text-probix-text dark:text-white">{activeCategory} Hub</h2>
                        <p className="text-2xl text-probix-muted font-medium italic opacity-80 max-w-3xl leading-relaxed">{CATEGORIES_DATA[activeCategory]?.desc || 'Verified forecasting nodes for local expertise.'}</p>
                      </div>
                      <div className="flex gap-12 pr-6 border-l border-probix-border dark:border-white/10 pl-12">
                          <CategoryStat label="Nodes" value={CATEGORIES_DATA[activeCategory]?.stats.forecasts || "0"} />
                          <CategoryStat label="Oracles" value={CATEGORIES_DATA[activeCategory]?.stats.analysts || "0"} />
                          <CategoryStat label="Accuracy" value={CATEGORIES_DATA[activeCategory]?.stats.accuracy || "0%"} />
                      </div>
                  </motion.div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-16 px-4">
                      <div className="xl:col-span-2 space-y-20">
                        <div className="space-y-10">
                            <p className="text-xs font-black text-probix-muted uppercase tracking-[0.6em] mb-4 border-l-4 border-primary pl-6 italic">Hot Oracle Clusters</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {(CATEGORIES_DATA[activeCategory]?.topics || []).map((topic: Topic, i: number) => (
                                <motion.div
                                  variants={itemVariants}
                                  key={i}
                                  className="glass p-10 rounded-[32px] border border-probix-border dark:border-white/5 flex flex-col gap-8 group cursor-pointer hover:border-primary/40 transition-all text-left relative overflow-hidden bg-probix-surface/40 dark:bg-white/[0.01] active-press shadow-xl"
                                >
                                    <div className="flex justify-between items-start">
                                      <h4 className="text-2xl font-black italic tracking-tight uppercase group-hover:text-primary transition-colors text-probix-text dark:text-white leading-none">{topic.name}</h4>
                                      <Zap size={16} className="text-primary opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                                    </div>
                                    <div className="flex justify-between items-end relative z-10">
                                      <div className="space-y-2">
                                          <p className="text-[10px] font-black text-probix-muted uppercase tracking-widest leading-none tabular">{topic.forecasts} Live Nodes</p>
                                          <p className="text-base font-black text-secondary italic tabular">{topic.accuracy} Aggregated accuracy</p>
                                      </div>
                                      <div className="w-12 h-12 rounded-2xl glass border-white/10 flex items-center justify-center group-hover:bg-primary transition-all group-hover:text-white shadow-lg active-press"><ChevronRight size={20}/></div>
                                    </div>
                                </motion.div>
                              ))}
                            </div>
                        </div>
                        <div className="space-y-10">
                            <p className="text-xs font-black text-probix-muted uppercase tracking-[0.6em] mb-4 border-l-4 border-secondary pl-6 italic">Active Market Stream</p>
                            <div className="space-y-6">
                              {markets.filter(m => m.category === activeCategory || activeCategory === 'Africa' || (activeCategory === 'Nigeria' && m.icon === '🇳🇬')).map((m, i) => (
                                <motion.div
                                  variants={itemVariants}
                                  key={i}
                                  className="glass p-10 rounded-[40px] border border-probix-border dark:border-white/5 flex items-center gap-14 group cursor-pointer hover:border-primary/20 transition-all shadow-xl bg-probix-surface/40 dark:bg-white/[0.02] active-press"
                                  onClick={() => setDetailedMarket(m)}
                                >
                                    <div className="w-24 h-24 rounded-[32px] bg-probix-bg dark:bg-lacquer-black flex items-center justify-center text-6xl border border-probix-border dark:border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-700">{m.icon}</div>
                                    <div className="flex-1 min-w-0 space-y-3">
                                      <h4 className="text-4xl font-black italic tracking-tight group-hover:text-primary transition-colors truncate leading-none uppercase text-probix-text dark:text-white">{m.title}</h4>
                                      <div className="flex items-center gap-4">
                                        <span className="text-[9px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 uppercase tracking-widest">Live Node</span>
                                        <p className="text-[10px] font-bold text-probix-muted uppercase tracking-widest opacity-60 italic">{m.category} Protocol</p>
                                      </div>
                                    </div>
                                    <div className="text-right space-y-2 tabular">
                                       <p className="text-5xl font-black italic text-secondary leading-none drop-shadow-glow">{m.percentage}% <span className="text-xs opacity-40 not-italic uppercase tracking-widest">Yes</span></p>
                                       <p className="text-[11px] font-black text-probix-muted uppercase tracking-widest opacity-60">{m.volume}</p>
                                    </div>
                                    <ChevronRight size={32} className="text-probix-muted opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                                </motion.div>
                              ))}
                            </div>
                        </div>
                      </div>

                      <div className="space-y-12">
                        <motion.div variants={itemVariants} className="bento-card p-14 flex flex-col items-center text-center bg-primary/[0.02] dark:bg-primary/[0.01] border-primary/20 rounded-[48px] shadow-3xl">
                            <p className="text-xs font-black text-probix-muted uppercase tracking-[0.4em] mb-12 text-left w-full border-b border-probix-border dark:border-white/5 pb-6 italic">Sentiment Index</p>
                            <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                              <svg className="w-full h-full -rotate-90">
                                  <circle cx="50%" cy="50%" r="45%" fill="transparent" stroke="currentColor" strokeWidth="16" className="text-probix-border dark:text-white/5" />
                                  <motion.circle
                                    initial={{ strokeDashoffset: 282.6 }}
                                    animate={{ strokeDashoffset: 282.6 * (1 - (CATEGORIES_DATA[activeCategory]?.sentiment || 50) / 100) }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    cx="50%" cy="50%" r="45%" fill="transparent" stroke="currentColor" strokeWidth="16" strokeDasharray="282.6" className="text-secondary drop-shadow-glow" strokeLinecap="round"
                                  />
                              </svg>
                              <div className="absolute flex flex-col items-center space-y-1">
                                  <span className="text-8xl font-black italic tracking-tighter text-probix-text dark:text-white leading-none tabular">{(CATEGORIES_DATA[activeCategory]?.sentiment || 50)}%</span>
                                  <span className="text-sm font-black text-secondary uppercase tracking-[0.4em] italic">Bullish</span>
                              </div>
                            </div>
                            <p className="text-lg font-bold italic text-probix-muted leading-relaxed opacity-80 px-4">An analytical drift of liquidity detected in current session.</p>
                            <Button variant="secondary" className="w-full mt-10 !rounded-2xl !py-4 text-[10px] font-black uppercase tracking-[0.3em] active-press">Audit Data Sources</Button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bento-card p-10 space-y-8 dark:bg-white/[0.01] border-white/5 rounded-[40px]">
                           <h3 className="text-xs font-black uppercase tracking-[0.4em] text-probix-muted italic border-b border-probix-border dark:border-white/5 pb-6">Oracle Leaders</h3>
                           <div className="space-y-6">
                              {ANALYSTS.slice(0, 3).map(a => (
                                <div key={a.id} className="flex items-center justify-between group cursor-pointer active-press">
                                    <div className="flex items-center gap-4">
                                      <img src={a.image} className="w-10 h-10 rounded-xl object-cover border border-probix-border dark:border-white/10 group-hover:scale-110 transition-transform" />
                                      <div className="text-left">
                                        <p className="text-xs font-black uppercase text-probix-text dark:text-white leading-none mb-1">{a.name}</p>
                                        <p className="text-[10px] font-black text-secondary uppercase italic opacity-60 tabular">{a.accuracy}% Signal</p>
                                      </div>
                                    </div>
                                    <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline active-press">Follow</button>
                                </div>
                              ))}
                           </div>
                        </motion.div>
                      </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW: DETAILED MARKET (The Analytical Peak) */}
              {detailedMarket && (
                <motion.div
                  key="analytical-view"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="h-full flex flex-col gap-12 text-left max-w-7xl mx-auto"
                >
                    <div className="flex items-center justify-between px-2">
                      <button onClick={() => setDetailedMarket(null)} className="flex items-center gap-4 text-xs font-black text-probix-muted hover:text-primary transition-all uppercase tracking-[0.3em] italic group active-press">
                          <div className="w-10 h-10 rounded-xl glass border-white/10 flex items-center justify-center group-hover:-translate-x-2 transition-transform shadow-lg"><ChevronRight className="rotate-180" size={20}/></div> Return to Terminal Stream
                      </button>
                      <div className="flex gap-6">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`glass h-14 w-14 !rounded-2xl transition-all shadow-xl active-press ${watchlist.includes(detailedMarket.id) ? 'text-primary border-primary/40 bg-primary/10' : 'text-probix-muted'}`}
                            onClick={() => {
                                toggleWatchlist(detailedMarket.id);
                                toast(watchlist.includes(detailedMarket.id) ? "Removed from Watchlist" : "Added to Watchlist", { icon: <Bookmark size={14}/> });
                            }}
                          >
                            <Bookmark size={24} className={watchlist.includes(detailedMarket.id) ? 'fill-current' : ''} />
                          </Button>
                          <Button variant="ghost" size="icon" className="glass h-14 w-14 !rounded-2xl shadow-xl active-press"><Share2 size={24} className="text-probix-muted"/></Button>
                      </div>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-12 flex-1 min-h-0 pb-10 px-2">
                      <div className="flex-[2.5] flex flex-col gap-12 overflow-hidden">
                          <motion.div variants={itemVariants} className="bento-card flex-1 p-16 relative overflow-hidden flex flex-col min-h-[550px] rounded-[56px] dark:bg-raised-lacquer border-kinpaku-gold/10">
                            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_oklch(65%_0.2_250_/_8%),_transparent_60%)]" />
                            <div className="flex justify-between items-start mb-20 relative z-10 text-left">
                                <div className="space-y-8 flex-1">
                                  <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 uppercase tracking-[0.5em] italic">{detailedMarket.category} Protocol</span>
                                    <div className="h-px w-24 bg-primary/20" />
                                  </div>
                                  <h2 className="text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.85] max-w-4xl uppercase text-probix-text dark:text-white">{detailedMarket.title}</h2>
                                  <div className="flex items-center gap-8 pt-4">
                                      <div className="flex items-center gap-4 bg-probix-surface dark:bg-lacquer-black px-6 py-4 rounded-2xl border border-probix-border dark:border-white/5 shadow-inner active-press transition-all hover:border-primary/40"><Globe size={20} className="text-primary"/> <span className="text-xs font-black uppercase tracking-[0.3em] italic text-probix-text dark:text-white">Lagos Oracle Terminal</span></div>
                                      <div className="flex items-center gap-4 bg-probix-surface dark:bg-lacquer-black px-6 py-4 rounded-2xl border border-probix-border dark:border-white/5 shadow-inner active-press transition-all hover:border-secondary/40"><Target size={20} className="text-secondary"/> <span className="text-xs font-black uppercase tracking-[0.3em] italic text-probix-text dark:text-white">Settlement Dec 2026</span></div>
                                  </div>
                                </div>
                                <div className="text-right shrink-0 ml-12 space-y-6">
                                  <div className="space-y-1">
                                    <p className="text-[11px] font-black text-probix-muted uppercase tracking-[0.6em] italic opacity-60">Probability Weight</p>
                                    <p className="text-[120px] font-black italic tracking-tighter text-secondary leading-none shadow-glow shadow-secondary/10 tabular">{detailedMarket.percentage}%</p>
                                  </div>
                                  <p className="text-lg font-black text-secondary italic flex items-center justify-end gap-3 animate-pulse leading-none tabular"><TrendingUp size={24}/> +2.4% Momentum</p>
                                </div>
                            </div>
                            <div className="flex-1 bg-probix-bg dark:bg-lacquer-black/40 rounded-[48px] border border-probix-border dark:border-white/5 relative group p-14 mb-8 overflow-hidden flex flex-col shadow-inner transition-all hover:border-primary/30">
                                <MarketChart data={detailedMarket.chartData} color={detailedMarket.color} />
                            </div>
                          </motion.div>

                          <motion.div variants={itemVariants} className="bento-card p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-secondary/[0.03] dark:bg-secondary/[0.01] border-secondary/20 shadow-glow shadow-secondary/5 text-left relative overflow-hidden rounded-[48px]">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 blur-[100px]" />
                            <div className="space-y-6 relative z-10 text-left">
                                <h3 className="text-5xl font-black italic tracking-tighter uppercase leading-none text-secondary">Establish Session</h3>
                                <p className="text-xl text-probix-muted font-bold italic opacity-70 leading-relaxed max-w-md">Synchronize node at <span className="text-probix-text dark:text-white">{(detailedMarket.yesPrice * 100).toFixed(0)}¢</span> buy / <span className="text-probix-text dark:text-white">{(detailedMarket.noPrice * 100).toFixed(0)}¢</span> sell liquidity.</p>
                            </div>
                            <div className="flex gap-8 relative z-10">
                                <Button className="flex-1 !py-12 text-4xl !rounded-[36px] shadow-3xl shadow-secondary/30 font-black uppercase italic bg-secondary hover:bg-secondary/90 border-none transition-all active-press text-white tabular" onClick={() => {
                                    setSelectedMarket(detailedMarket);
                                    toast.success("Initializing Node...", { duration: 1500 });
                                }}>YES {(detailedMarket.yesPrice * 100).toFixed(0)}¢</Button>
                                <Button variant="secondary" className="flex-1 !py-12 text-4xl !rounded-[36px] glass border-white/10 font-black uppercase italic hover:bg-white/10 active-press transition-all text-probix-text dark:text-white tabular" onClick={() => {
                                    setSelectedMarket(detailedMarket);
                                    toast.error("Initializing Node...", { duration: 1500 });
                                }}>NO {(detailedMarket.noPrice * 100).toFixed(0)}¢</Button>
                            </div>
                          </motion.div>

                          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8">
                              <StatBox label="Session Liquidity" value={liquidity} color="text-primary" />
                              <StatBox label="Forecast Volume" value={detailedMarket.volume.split(' ')[0]} color="text-secondary" />
                              <StatBox label="Oracle Sync" value="92%" color="text-accent" />
                              <StatBox label="Network Status" value="ACTIVE" color="text-secondary" animate />
                          </motion.div>
                      </div>

                      <div className="flex-1 flex flex-col gap-12 overflow-hidden h-full min-w-[380px] text-left">
                          <motion.div variants={itemVariants} className="bento-card p-12 flex flex-col overflow-hidden h-[48%] shadow-2xl relative text-left rounded-[48px] bg-probix-surface/40 dark:bg-white/[0.01]">
                            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-probix-muted mb-12 border-b border-probix-border dark:border-white/5 pb-8 flex items-center gap-5 relative z-10"><Users2 size={20} className="text-primary"/> Analyst Consensus</h3>
                            <div className="space-y-10 flex-1 overflow-y-auto no-scrollbar pr-2 relative z-10 text-left">
                                {ANALYSTS.map(a => (
                                  <div key={a.id} className="glass p-8 rounded-[32px] border border-probix-border dark:border-white/5 flex items-center gap-8 hover:border-primary/40 transition-all cursor-pointer group shadow-xl bg-probix-bg dark:bg-lacquer-black/40 active-press">
                                      <div className="relative shrink-0">
                                          <img src={a.image} className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-xl border border-probix-border dark:border-white/5" alt={a.name} />
                                          <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-secondary rounded-lg border-2 border-probix-bg dark:border-[#0A0C12] flex items-center justify-center shadow-glow shadow-secondary/40"><TrendingUp size={14} className="text-white"/></div>
                                      </div>
                                      <div className="flex-1 min-w-0 text-left">
                                        <p className="text-xl font-black italic truncate leading-none mb-2 uppercase tracking-tight group-hover:text-primary transition-colors text-probix-text dark:text-white">{a.name}</p>
                                        <p className="text-[11px] font-bold text-secondary uppercase tracking-widest flex items-center gap-3 italic text-left tabular">Bullish • {a.accuracy}% Signal</p>
                                      </div>
                                  </div>
                                ))}
                            </div>
                          </motion.div>

                          <motion.div variants={itemVariants} className="bento-card p-12 flex-1 flex flex-col overflow-hidden relative shadow-2xl text-left rounded-[48px] bg-probix-surface/40 dark:bg-white/[0.01]">
                            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-probix-muted mb-12 border-b border-probix-border dark:border-white/5 pb-8 flex items-center gap-5 relative z-10"><CheckCircle2 size={20} className="text-secondary"/> Node Insight Pulse</h3>
                            <div className="flex-1 space-y-10 overflow-y-auto no-scrollbar pr-3 italic relative z-10 text-left">
                                <AnimatePresence initial={false}>
                                    {sessionComments.map(comment => (
                                        <motion.div
                                            key={comment.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                        >
                                            <Comment user={comment.user} text={comment.text} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <div className="mt-10 pt-10 border-t border-probix-border dark:border-white/5 flex gap-6 relative z-10">
                                <input
                                  type="text"
                                  placeholder="Broadcast insight..."
                                  className="flex-1 bg-probix-bg dark:bg-lacquer-black border border-probix-border dark:border-white/5 rounded-[24px] px-8 text-base font-bold focus:border-primary/50 outline-none transition-all italic placeholder:opacity-20 shadow-inner text-probix-text dark:text-white"
                                />
                                <Button size="icon" className="h-16 w-16 !rounded-[24px] shadow-3xl shadow-primary/40 text-white active-press"><ArrowUp size={28}/></Button>
                            </div>
                          </motion.div>
                      </div>
                    </div>
                </motion.div>
              )}

              {/* VIEW: FORECASTS (The Terminal Portfolio) */}
              {view === 'forecasts' && !detailedMarket && (
                  <motion.div
                    key="portfolio"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-16 text-left max-w-6xl mx-auto px-4"
                  >
                      <motion.div variants={itemVariants} className="space-y-4 text-left bg-probix-surface/40 dark:bg-white/[0.02] p-12 rounded-[56px] border border-probix-border dark:border-white/5 shadow-inner">
                          <div className="flex items-center gap-4">
                            <Activity size={16} className="text-primary"/>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-probix-muted italic opacity-60">Terminal Statistics</span>
                          </div>
                          <h2 className="text-8xl font-black italic tracking-tighter uppercase mb-2 text-probix-text dark:text-white leading-none">Your Oracle Registry</h2>
                          <p className="text-2xl text-probix-muted font-medium italic opacity-80 max-w-3xl leading-relaxed">Managing {positions.length} active terminal positions with a session precision of 78.4%.</p>
                      </motion.div>

                      {positions.length === 0 ? (
                          <motion.div variants={itemVariants} className="min-h-[500px] flex flex-col items-center justify-center glass rounded-[56px] border-white/5 p-20 text-center space-y-12 bg-probix-surface/20 dark:bg-white/[0.01] shadow-inner">
                               <div className="w-32 h-32 rounded-full bg-probix-bg dark:bg-[#0A0C12] border border-probix-border dark:border-white/5 flex items-center justify-center shadow-2xl active-press transition-all hover:border-primary/30"><BarChart3 size={64} className="text-probix-muted opacity-40" /></div>
                               <div className="space-y-4">
                                 <p className="text-4xl font-black italic text-probix-text dark:text-white uppercase tracking-tighter">No established nodes found</p>
                                 <p className="text-xl font-bold italic text-probix-muted opacity-60">Your analytical terminal is awaiting first session establishment.</p>
                               </div>
                               <Button size="lg" className="!rounded-full !px-12 !py-6 text-lg font-black uppercase italic shadow-glow active-press" onClick={() => setView('markets')}>Discover Nodes</Button>
                          </motion.div>
                      ) : (
                          <div className="space-y-8">
                              {positions.map((pos) => (
                                  <motion.div
                                    variants={itemVariants}
                                    key={pos.id}
                                    className="glass p-12 rounded-[56px] border border-probix-border dark:border-white/5 flex items-center justify-between hover:bg-probix-surface dark:hover:bg-white/[0.02] transition-all group active-press bg-probix-surface/40 dark:bg-[#0A0C12]/40 shadow-xl"
                                  >
                                      <div className="flex items-center gap-14">
                                          <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center text-white shadow-3xl font-black text-lg group-hover:scale-110 transition-transform duration-700 ${pos.side === 'yes' ? 'bg-secondary shadow-secondary/30' : 'bg-crimson shadow-crimson/30'}`}>
                                              {pos.side.toUpperCase()}
                                          </div>
                                          <div className="text-left space-y-4">
                                              <h4 className="text-5xl font-black italic tracking-tighter uppercase text-probix-text dark:text-white group-hover:text-primary transition-colors leading-none">{pos.marketTitle}</h4>
                                              <p className="text-[11px] font-black text-probix-muted uppercase tracking-[0.4em] mt-2 flex items-center gap-5 italic opacity-60 tabular">
                                                  <span className="flex items-center gap-2"><Clock size={16} className="text-primary"/> {new Date(pos.timestamp).toLocaleDateString()}</span>
                                                  <span className="w-1.5 h-1.5 rounded-full bg-probix-border dark:bg-white/10" />
                                                  <span>NODE_ID: {pos.id.toUpperCase()}</span>
                                              </p>
                                          </div>
                                      </div>
                                      <div className="flex gap-20 items-center pr-4">
                                          <div className="text-right space-y-1">
                                              <p className="text-xs font-black text-probix-muted uppercase tracking-widest italic opacity-60">Weight</p>
                                              <p className="text-4xl font-black italic text-probix-text dark:text-white leading-none uppercase tracking-tighter tabular">₦{pos.amount.toLocaleString()}</p>
                                          </div>
                                          <div className="text-right space-y-1">
                                              <p className="text-xs font-black text-probix-muted uppercase tracking-widest italic opacity-60">Entry</p>
                                              <p className="text-4xl font-black italic text-secondary leading-none uppercase tracking-tighter tabular">{(pos.entryPrice * 100).toFixed(0)}¢</p>
                                          </div>
                                          <div className="w-px h-16 bg-probix-border dark:bg-white/10" />
                                          <Button variant="ghost" className="glass !rounded-[24px] h-16 px-10 border-white/10 font-black italic uppercase text-xs tracking-[0.3em] hover:border-primary/50 text-probix-text dark:text-white active-press shadow-lg">Session Details</Button>
                                      </div>
                                  </motion.div>
                              ))}
                          </div>
                      )}
                  </motion.div>
              )}

              {/* VIEW: LEADERBOARD (The Global Registry) */}
              {view === 'leaderboard' && !detailedMarket && (
                  <motion.div
                    key="leaderboard"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-24 text-left max-w-6xl mx-auto px-4"
                  >
                      <motion.div variants={itemVariants} className="flex justify-between items-end mb-8 bg-probix-surface/40 dark:bg-white/[0.02] p-12 rounded-[56px] border border-probix-border dark:border-white/5 shadow-inner">
                          <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                <Award size={16} className="text-primary"/>
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-probix-muted italic opacity-60">Global Ranking</span>
                              </div>
                              <h2 className="text-8xl font-black italic tracking-tighter uppercase mb-2 leading-none text-probix-text dark:text-white">The Oracle Registry</h2>
                              <p className="text-2xl text-probix-muted font-medium italic opacity-80 max-w-3xl leading-relaxed">Top analysts synchronized with the global prediction protocol.</p>
                          </div>
                          <div className="flex gap-4 glass p-3 rounded-2xl border-white/5 shadow-2xl bg-probix-bg dark:bg-[#0A0C12]">
                              {['All Time', '30D', '7D'].map(t => <button key={t} className={`px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active-press ${t === '30D' ? 'bg-primary text-white shadow-glow shadow-primary/30' : 'text-probix-muted hover:text-probix-text dark:hover:text-white'}`}>{t}</button>)}
                          </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-14 items-end pt-20 pb-20">
                          <PodiumCard analyst={ANALYSTS[1]} rank={2} color="#8B949E" h="h-[480px]" />
                          <PodiumCard analyst={ANALYSTS[0]} rank={1} color="oklch(84% 0.19 80.46)" featured h="h-[580px]" />
                          <PodiumCard analyst={ANALYSTS[2]} rank={ rank === 3 ? 3 : 3} color="#CD7F32" h="h-[420px]" />
                      </motion.div>

                      <div className="space-y-10 max-w-5xl mx-auto">
                          <div className="flex items-center justify-between px-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.6em] text-probix-muted italic border-l-4 border-primary pl-6">Verified Oracle Registry</h3>
                            <p className="text-[11px] font-bold text-probix-muted uppercase tracking-widest opacity-40 tabular">Total Participants: 2,847</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {ANALYSTS.map((a, i) => (
                                  <motion.div variants={itemVariants} key={a.id} className="active-press">
                                    <AnalystRow analyst={a} rank={i + 1} />
                                  </motion.div>
                              ))}
                              {[1, 2, 3, 4, 5, 6].map((i) => (
                                  <motion.div variants={itemVariants} key={`extra-${i}`} className="active-press">
                                    <AnalystRow
                                        analyst={{
                                            name: `Oracle_Node_${842 + i}`,
                                            image: `https://i.pravatar.cc/150?u=${i + 40}`,
                                            accuracy: 85 - i,
                                            trend: "+4.2%"
                                        }}
                                        rank={ANALYSTS.length + i}
                                    />
                                  </motion.div>
                              ))}
                          </div>
                          <div className="flex justify-center pt-10">
                            <Button variant="secondary" className="!rounded-full !px-12 !py-6 text-xs font-black uppercase tracking-[0.4em] italic active-press">Load Extended Registry</Button>
                          </div>
                      </div>
                  </motion.div>
              )}

              {/* VIEW: INSIGHTS (The Knowledge Hub) */}
              {view === 'insights' && !detailedMarket && (
                  <motion.div
                    key="insights"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-24 text-left max-w-6xl mx-auto py-10 px-4"
                  >
                      <motion.div variants={itemVariants} className="space-y-8 bg-probix-surface/40 dark:bg-white/[0.02] p-16 rounded-[56px] border border-probix-border dark:border-white/5 shadow-inner">
                          <div className="flex items-center gap-4">
                            <Zap size={16} className="text-primary"/>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-probix-muted italic opacity-60">Intelligence Hub</span>
                          </div>
                          <h2 className="text-9xl font-black italic tracking-tighter uppercase mb-2 leading-[0.8] text-probix-text dark:text-white">The Knowledge <br/> Engine</h2>
                          <p className="text-3xl text-probix-muted font-medium italic opacity-80 max-w-4xl leading-relaxed">Aggregating oracle sentiment and node verification logs into actionable institutional-grade data clusters.</p>
                      </motion.div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-4">
                          <div className="space-y-16">
                              <motion.div variants={itemVariants} className="active-press">
                                <InsightDetailItem
                                    icon={<Globe size={48} className="text-primary"/>}
                                    title="Borderless Analysis"
                                    desc="Navigating regional boundaries to track African economic shifts and localized political nodes with institutional precision."
                                />
                              </motion.div>
                              <motion.div variants={itemVariants} className="active-press">
                                <InsightDetailItem
                                    icon={<TrendingUp size={48} className="text-secondary"/>}
                                    title="Precision Tracking"
                                    desc="A multi-layered reputation system measuring the historical accuracy and predictive drift of every verified analyst node."
                                />
                              </motion.div>
                          </div>
                          <motion.div variants={itemVariants} className="bento-card p-20 bg-[#020308] dark:bg-raised-lacquer border-kinpaku-gold/10 relative overflow-hidden flex flex-col justify-center text-left rounded-[56px] shadow-3xl min-h-[450px]">
                              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_oklch(65%_0.2_250_/_10%),_transparent_60%)] pointer-events-none" />
                              <h3 className="text-7xl font-black italic tracking-tighter text-white leading-[0.9] uppercase relative z-10">Every topic <br/> that truly <br/> matters.</h3>
                              <div className="flex gap-10 pt-16 relative z-10">
                                  <Button size="lg" className="!px-14 !rounded-full !py-8 text-xl font-black italic uppercase tracking-[0.2em] shadow-glow active-press text-white group">Join The Protocol <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform"/></Button>
                              </div>
                              <div className="absolute bottom-10 right-10 opacity-10 scale-150 rotate-12"><Zap size={120} className="text-primary" /></div>
                          </motion.div>
                      </div>
                  </motion.div>
              )}

              {/* VIEW: PROFILE (Terminal Hub) */}
              {view === 'profile' && !detailedMarket && (
                  <motion.div
                    key="profile-hub"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="max-w-7xl mx-auto space-y-20 text-left py-10 px-4"
                  >
                      <motion.div variants={itemVariants} className="flex items-center justify-between bg-probix-surface/40 dark:bg-white/[0.02] p-12 rounded-[56px] border border-probix-border dark:border-white/5 shadow-inner">
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Award size={16} className="text-primary"/>
                              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-probix-muted italic opacity-60">Security Hub</span>
                            </div>
                            <h2 className="text-8xl font-black italic tracking-tighter uppercase mb-2 text-probix-text dark:text-white leading-none">The Terminal Node</h2>
                            <p className="text-2xl text-probix-muted font-medium italic opacity-70 max-w-2xl leading-relaxed">Manage authentication signatures, terminal credentials, and financial bridges.</p>
                          </div>
                          <Button variant="danger" size="icon" className="glass !rounded-[40px] h-24 w-24 hover:bg-crimson text-white active-press shadow-2xl transition-all hover:scale-110" onClick={() => {
                            toast.warning("Terminating Session...");
                            setTimeout(logout, 1500);
                          }}><LogOut size={48}/></Button>
                      </motion.div>

                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-16 px-2">
                          <div className="xl:col-span-2 space-y-16">
                              <motion.div variants={itemVariants} className="bento-card p-16 flex flex-col md:flex-row items-center gap-20 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-[#020308] dark:bg-raised-lacquer border-kinpaku-gold/10 rounded-[64px] transition-all hover:border-primary/40 group">
                                  <div className="relative shrink-0 active-press transition-transform duration-1000 group-hover:rotate-12">
                                      <div className="w-56 h-56 rounded-[60px] bg-primary/10 border-4 border-primary/20 flex items-center justify-center font-black text-[120px] text-primary italic shadow-3xl shadow-primary/20">DO</div>
                                      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#010206] rounded-[32px] border-4 border-[#010206] shadow-3xl flex items-center justify-center">
                                          <div className="w-14 h-14 bg-secondary rounded-[24px] flex items-center justify-center text-white shadow-glow"><CheckCircle2 size={32}/></div>
                                      </div>
                                  </div>
                                  <div className="space-y-10 relative z-10 flex-1 text-left">
                                      <div className="space-y-2">
                                        <h3 className="text-8xl font-black italic tracking-tighter uppercase leading-none text-white">David Okoro</h3>
                                        <div className="flex items-center gap-3">
                                          <p className="text-3xl text-primary font-black italic opacity-80 uppercase tracking-widest truncate tabular">#{walletAddress || "PRBX-9482"}</p>
                                          <div className="h-px flex-1 bg-white/10" />
                                        </div>
                                      </div>
                                      <div className="flex gap-8 pt-4">
                                          <div className="px-10 py-4 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-black uppercase tracking-[0.3em] italic tabular">Rank #1 Global</div>
                                          <div className="px-10 py-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.3em] italic tabular">Oracle Level 4</div>
                                      </div>
                                  </div>
                              </motion.div>

                              <motion.div variants={itemVariants} className="bento-card p-16 text-left rounded-[64px] bg-probix-surface/40 dark:bg-white/[0.01]">
                                  <div className="flex justify-between items-center mb-20 px-4">
                                      <h3 className="text-4xl font-black italic tracking-tighter uppercase flex items-center gap-10 text-probix-text dark:text-white"><CheckCircle2 size={56} className="text-primary"/> Operational Bridges</h3>
                                      <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.5em] italic opacity-40">2 Active Connections</p>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                      <WalletOption label="Veltra Hub" description="Active Signature Sync" active />
                                      <WalletOption label="Bridge Protocol" description="Multisig WalletConnect" />
                                  </div>
                              </motion.div>

                              <motion.div variants={itemVariants} className="bento-card p-16 text-left rounded-[64px] bg-probix-surface/40 dark:bg-white/[0.01]">
                                  <div className="flex justify-between items-center mb-16 px-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.6em] text-probix-muted italic border-l-4 border-primary pl-8">Network Transaction Pulse</h3>
                                    <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline active-press">Export Audit Log</button>
                                  </div>
                                  <div className="space-y-6">
                                      {transactions.length === 0 ? (
                                          <p className="text-xl font-bold italic text-probix-muted text-center py-20 opacity-40 uppercase tracking-tighter">No analytical transactions detected.</p>
                                      ) : (
                                          transactions.map(tx => (
                                              <div key={tx.id} className="tabular active-press">
                                                <TransactionRow tx={tx} />
                                              </div>
                                          ))
                                      )}
                                  </div>
                              </motion.div>
                          </div>

                          <div className="space-y-16">
                              <motion.div variants={itemVariants} className="bento-card p-14 bg-primary shadow-[0_0_120px_oklch(65%_0.2_250_/_30%)] border-none relative overflow-hidden group text-left rounded-[56px] active-press transition-all hover:scale-[1.02]">
                                  <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_oklch(100%_0_0_/_15%),_transparent_60%)]" />
                                  <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.5em] mb-6 italic leading-none">Synchronized Funds</p>
                                  <h4 className="text-[100px] font-black text-white italic tracking-tighter shadow-3xl leading-[0.8] mb-12 tabular">₦{balance.toLocaleString()}</h4>
                                  <div className="flex items-center gap-5 text-white/80 py-8 border-t border-white/10 mb-10"><Clock size={28}/><p className="text-xs font-black italic uppercase tracking-[0.2em] tabular">Latest Network Audit: Success</p></div>
                                  <Button variant="secondary" className="w-full !py-10 glass bg-white/20 border-none text-base font-black uppercase tracking-[0.3em] text-white active-press" onClick={() => setIsDepositing(true)}>Sync Terminal Assets</Button>
                                  <div className="absolute bottom-[-40px] right-[-40px] opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Award size={200} className="text-white" /></div>
                              </motion.div>
                              <motion.div variants={itemVariants} className="bento-card p-14 space-y-12 shadow-3xl text-left rounded-[56px] bg-probix-surface/40 dark:bg-white/[0.01]">
                                  <h3 className="text-xs font-black uppercase tracking-[0.6em] text-probix-muted border-b border-probix-border dark:border-white/5 pb-10 flex items-center gap-6 text-left italic"><Settings className="text-primary" size={24}/> Config Signatures</h3>
                                  <div className="space-y-10 text-left">
                                      <SettingItem label="Global Alerts" active />
                                      <SettingItem label="OLED Performance" active />
                                      <SettingItem label="Multi-Sig 2FA" active />
                                      <SettingItem label="Oracle Anonymous" />
                                  </div>
                              </motion.div>
                          </div>
                      </div>
                  </motion.div>
              )}

            </AnimatePresence>
            <div className="h-64" />
          </div>

          {/* RIGHT SIDEBAR ANALYTICS (The Deep Craft Widgets) */}
          <aside className="w-[380px] border-l border-probix-border p-10 flex flex-col gap-14 overflow-y-auto no-scrollbar bg-probix-bg dark:bg-[#010206]/80 backdrop-blur-3xl shrink-0 hidden 2xl:flex z-40">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-10">
                  <div className="flex justify-between items-center px-2">
                      <div className="flex items-center gap-3">
                        <Activity size={16} className="text-primary"/>
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-probix-text dark:text-white italic">Volatility Stream</h3>
                      </div>
                      <span className="text-[10px] font-black text-probix-muted uppercase border border-probix-border dark:border-white/5 px-2.5 py-1 rounded-lg tabular bg-probix-surface dark:bg-[#0A0C12]">24H Pulse</span>
                  </div>
                  <div className="space-y-6">
                      <MoverItem label="Fuel price drift" trend="+12.4%" positive />
                      <MoverItem label="Currency volatility" trend="-8.7%" />
                      <MoverItem label="Node stability shift" trend="+6.1%" positive />
                      <MoverItem label="Bitcoin Oracle Signal" trend="+5.3%" positive />
                  </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-10">
                  <div className="flex justify-between items-center px-2">
                      <div className="flex items-center gap-3">
                        <Award size={16} className="text-secondary"/>
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-probix-text dark:text-white italic">Oracle Leaders</h3>
                      </div>
                      <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline active-press" onClick={() => setView('leaderboard')}>Registry</button>
                  </div>
                  <div className="space-y-8">
                      {ANALYSTS.map(a => (
                          <div key={a.id} className="flex items-center justify-between group cursor-pointer active-press hover:bg-probix-surface dark:hover:bg-white/[0.03] p-4 rounded-3xl transition-all border border-transparent hover:border-probix-border dark:hover:border-white/5">
                              <div className="flex items-center gap-5">
                                  <div className="relative">
                                    <img src={a.image} className="w-12 h-12 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl border border-probix-border dark:border-white/10" alt={a.name} />
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary rounded-lg border-2 border-probix-bg dark:border-[#010206] shadow-glow" />
                                  </div>
                                  <div className="text-left space-y-1">
                                      <p className="text-sm font-black uppercase text-probix-text dark:text-white leading-none group-hover:text-primary transition-colors">{a.name}</p>
                                      <p className="text-[10px] font-bold text-secondary uppercase italic opacity-60 tabular">{a.accuracy}% Precision</p>
                                  </div>
                              </div>
                              <button
                                className="bg-primary/10 dark:bg-primary/20 text-primary text-[10px] font-black uppercase px-4 py-2 rounded-xl shadow-glow hover:bg-primary hover:text-white transition-all active-press"
                                onClick={(e) => { e.stopPropagation(); toast.success(`Following ${a.name}`); }}
                              >
                                Sync
                              </button>
                          </div>
                      ))}
                  </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-probix-surface dark:bg-[#0A0C12] border border-probix-border dark:border-white/5 rounded-[48px] p-10 space-y-10 relative overflow-hidden group shadow-2xl transition-all hover:border-primary/40">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[100px] -z-0 group-hover:bg-primary/20 transition-all duration-1000" />
                  <div className="flex justify-between items-center relative z-10">
                      <h3 className="text-xs font-black uppercase tracking-[0.5em] text-probix-text dark:text-white italic leading-none">Oracle AI Insights</h3>
                      <div className="bg-primary/20 text-primary text-[9px] font-black px-2.5 py-1 rounded-full uppercase italic border border-primary/20 shadow-glow">Active AI</div>
                  </div>
                  <div className="space-y-10 relative z-10 text-left">
                      <div className="h-32 w-full bg-probix-bg/50 dark:bg-white/[0.02] rounded-3xl overflow-hidden border border-probix-border dark:border-white/10 p-2 shadow-inner">
                          <MarketChart data={[30, 45, 40, 60, 55, 75, 65, 85, 80, 95]} color="oklch(65% 0.2 250)" />
                      </div>
                      <div className="text-left space-y-6">
                          <div className="space-y-2">
                            <p className="text-[11px] font-black text-probix-muted uppercase tracking-[0.3em] leading-none italic opacity-60">Consensus Index</p>
                            <p className="text-5xl font-black italic text-probix-text dark:text-white uppercase tracking-tighter leading-none">Bullish <span className="text-primary drop-shadow-glow">84.2%</span></p>
                          </div>
                          <p className="text-xs font-medium text-probix-muted leading-relaxed opacity-80 border-l-2 border-primary pl-4">Top driver: Regional Inflation report synchronized with recent Central Bank FX policy node adjustments.</p>
                          <button className="text-[10px] font-black text-primary uppercase tracking-[0.4em] flex items-center gap-3 group/link active-press">Read Full Oracle Report <ArrowRight size={14} className="group-hover/link:translate-x-3 transition-transform"/></button>
                      </div>
                  </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="space-y-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-probix-text dark:text-white px-2 italic">Featured analyst</h3>
                  <div className="bg-probix-surface/60 dark:bg-white/[0.02] border border-probix-border dark:border-white/5 rounded-[40px] p-8 flex items-center gap-8 group cursor-pointer hover:border-primary/40 transition-all active-press shadow-xl">
                      <div className="relative shrink-0">
                        <img src="https://i.pravatar.cc/150?u=12" className="w-16 h-16 rounded-2xl object-cover shadow-2xl border border-probix-border dark:border-white/10 group-hover:rotate-6 transition-transform" alt="The Macro Sage" />
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary rounded-lg border-2 border-probix-bg dark:border-[#010206] flex items-center justify-center shadow-glow shadow-primary/40"><Zap size={14} className="text-white"/></div>
                      </div>
                      <div className="flex-1 text-left min-w-0 space-y-2">
                          <p className="text-lg font-black uppercase text-probix-text dark:text-white truncate italic leading-none">The Macro Sage <CheckCircle2 className="inline text-primary ml-2" size={16}/></p>
                          <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] italic leading-none tabular">91% Precision Hub</p>
                      </div>
                      <ChevronRight size={24} className="text-probix-muted opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                  </div>
              </motion.div>
          </aside>
        </div>
      </main>

      {/* --- OVERLAYS --- */}
      <AnimatePresence>
        {isCreating && (
          <CreateForecastModal
            onClose={() => setIsCreating(false)}
            onCreate={() => {
              toast.success("Initializing Node Establishment Protocol...");
            }}
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

// --- SUB-COMPONENTS ---

function NotificationRow({ title, desc, time, icon, color }: { title: string, desc: string, time: string, icon: React.ReactNode, color: 'primary' | 'secondary' | 'accent' }) {
    const colorMap = {
        primary: 'bg-primary/10 text-primary border-primary/20',
        secondary: 'bg-secondary/10 text-secondary border-secondary/20',
        accent: 'bg-accent/10 text-accent border-accent/20'
    };
    return (
        <div className="flex items-start gap-6 group cursor-pointer active-press border-b border-probix-border dark:border-white/5 pb-8 last:border-0">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 group-hover:scale-110 shadow-lg ${colorMap[color]}`}>
                {icon}
            </div>
            <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-base font-black italic uppercase text-probix-text dark:text-white group-hover:text-primary transition-colors leading-none">{title}</p>
                    <span className="text-[10px] font-black text-probix-muted uppercase opacity-40 tabular">{time}</span>
                </div>
                <p className="text-[12px] font-bold text-probix-muted leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{desc}</p>
            </div>
        </div>
    );
}

function ValuePropItem({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: 'primary' | 'secondary' | 'fuchsia' | 'accent' }) {
    const colors = {
        primary: 'text-primary bg-primary/10 border-primary/20',
        secondary: 'text-secondary bg-secondary/10 border-secondary/20',
        fuchsia: 'text-fuchsia bg-fuchsia/10 border-fuchsia/20',
        accent: 'text-accent bg-accent/10 border-accent/20'
    };
    return (
        <div className="flex flex-col items-center gap-5 text-center p-8 rounded-[32px] hover:bg-probix-bg dark:hover:bg-[#0A0C12] transition-all group cursor-default border border-transparent hover:border-probix-border dark:hover:border-white/5 active-press">
            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-xl border transition-all duration-500 group-hover:scale-110 shadow-glow ${colors[color]}`}>
                {icon}
            </div>
            <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-probix-text dark:text-white italic">{title}</p>
                <p className="text-[10px] font-bold text-probix-muted uppercase tracking-widest opacity-60 leading-tight">{desc}</p>
            </div>
        </div>
    );
}
