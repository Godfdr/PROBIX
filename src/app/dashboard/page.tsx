"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Activity,
  Award,
  ChevronLeft,
  MoreVertical,
  Cpu
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
  const [liquidity, setLiquidity] = useState("₦0.0M");

  useEffect(() => {
    setMounted(true);
    setLiquidity(`₦${(Math.random() * 50 + 10).toFixed(1)}M`);
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (mounted && isHydrated && !isAuthenticated) {
        router.push('/');
    }
  }, [isAuthenticated, isHydrated, mounted, router]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
  };

  const navigateTo = useCallback((newView: PageView) => {
    setView(newView);
    setDetailedMarket(null);
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!mounted || !isHydrated) {
      return (
          <div className="h-screen bg-[#010206] flex items-center justify-center">
              <ProbixLogo size="md" className="animate-pulse opacity-50" />
          </div>
      );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-[#010206] text-white overflow-hidden selection:bg-primary/30">

      {/* ELITE SIDEBAR */}
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

        {/* ELITE DASHBOARD HEADER */}
        <header className="h-28 border-b border-white/5 flex items-center justify-between px-12 bg-[#010206]/80 backdrop-blur-3xl z-40 shrink-0">
          <div className="flex items-center gap-10 flex-1 max-w-3xl">
             <div className="relative w-full group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-all duration-500" size={24} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Analyze markets, oracle clusters, node sentiment..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[24px] py-5 pl-16 pr-10 text-lg font-medium focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-slate-600 italic shadow-inner"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3 opacity-20 group-focus-within:opacity-100 transition-all duration-500">
                    <span className="text-xs font-black border border-white/10 rounded-xl px-3 py-1.5 bg-[#010206] shadow-sm text-slate-400">⌘</span>
                    <span className="text-xs font-black border border-white/10 rounded-xl px-3 py-1.5 bg-[#010206] shadow-sm text-slate-400">K</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-10 pl-10">
             <ThemeToggle />
             <div className="relative group/notif">
                <Button variant="ghost" size="icon" className="h-14 w-14 glass !rounded-3xl hover:border-primary/40 relative active-press transition-all duration-500 shadow-xl" onClick={() => setShowNotifications(!showNotifications)}>
                    <Bell size={28} className="text-slate-500 group-hover/notif:text-primary transition-colors" />
                    <div className="absolute top-3 right-3 w-3 h-3 bg-primary rounded-full animate-pulse shadow-glow shadow-primary/50 border-4 border-[#010206]" />
                </Button>
                <AnimatePresence>
                    {showNotifications && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute right-0 mt-8 w-[460px] glass rounded-[48px] p-12 shadow-[0_40px_120px_rgba(0,0,0,0.8)] z-[100] text-left border-white/10"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h3 className="text-sm font-black uppercase tracking-[0.5em] text-slate-500 italic">Oracle Signal Pulse</h3>
                                <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline active-press" onClick={() => toast.success("Cleared Signal Cache")}>Clear Feed</button>
                            </div>
                            <div className="space-y-10">
                                <div className="flex items-start gap-8 group cursor-pointer active-press border-b border-white/5 pb-10 last:border-0 transition-all hover:bg-white/[0.01] p-4 rounded-[24px]">
                                    <div className="w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 border border-secondary/20 bg-secondary/10 text-secondary transition-all duration-700 group-hover:scale-110 shadow-2xl">
                                        <TrendingUp size={22}/>
                                    </div>
                                    <div className="flex-1 space-y-3 pt-1">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xl font-black italic uppercase text-white group-hover:text-primary transition-colors leading-none">Market Shift</p>
                                            <span className="text-[10px] font-black text-slate-500 uppercase opacity-30 tabular italic">2m ago</span>
                                        </div>
                                        <p className="text-[14px] font-medium text-slate-400 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity italic">Naira-USD node shifted +12.4% Bullish.</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="secondary" className="w-full mt-12 !rounded-[24px] !py-6 text-xs font-black uppercase tracking-[0.4em] italic glass border-white/10 hover:bg-white/10 active-press text-white">Access Analytical Hub</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
             <div className="cursor-pointer hover:opacity-80 transition-all flex items-center gap-4 active-press" onClick={() => setView('profile')}>
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?u=9" className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/20 shadow-2xl" alt="Avatar" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-lg flex items-center justify-center border-4 border-[#010206] shadow-glow"><CheckCircle2 size={12} className="text-white"/></div>
                </div>
             </div>
             <Button className="gap-4 !px-10 !py-5 !rounded-[24px] text-base font-black italic tracking-widest shadow-glow active-press group" onClick={() => setIsCreating(true)}>
                <Plus size={24} className="group-hover:rotate-90 transition-transform duration-700" />
                Initialize Node
             </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
          <AnimatePresence mode="wait">

            {/* VIEW: HOME (The Multi-layered Grid) */}
            {view === 'home' && !detailedMarket && !activeCategory && (
              <motion.div
                key="home"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-24 max-w-[1600px] mx-auto text-left"
              >
                {/* HERO STATS BAR (MATCHING DESIGN) */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
                    <StatsCard icon={<Users size={32}/>} title="42,831+" label="Active Analysts" trend="+ 12.5% Drift" color="text-primary" />
                    <StatsCard icon={<BarChart3 size={32}/>} title="12,430+" label="Established Hubs" trend="+ 8.4% Volume" color="text-fuchsia" />
                    <StatsCard icon={<TrendingUp size={32}/>} title="68.7%" label="Oracle Precision" trend="+ 5.2% Accuracy" color="text-secondary" />
                    <StatsCard icon={<MessageSquare size={32}/>} title="94.2K+" label="Node Insights" trend="+ 15.7% Signal" color="text-accent" />
                </motion.div>

                <div className="flex flex-col 2xl:flex-row gap-16">
                    <div className="flex-[3] space-y-24">
                        {/* EXPLORE BY CATEGORY */}
                        <div className="space-y-12">
                            <motion.div variants={itemVariants} className="flex justify-between items-center px-4">
                                <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">Explore Hubs</h3>
                                <button className="text-[10px] font-black text-primary uppercase tracking-[0.5em] hover:underline active-press">Full Registry →</button>
                            </motion.div>
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
                                {[
                                    { name: 'Politics', icon: '🏛️', color: 'bg-primary' },
                                    { name: 'Economy', icon: '📈', color: 'bg-secondary' },
                                    { name: 'Sports', icon: '⚽', color: 'bg-accent' },
                                    { name: 'Technology', icon: '🚀', color: 'bg-fuchsia' },
                                    { name: 'Energy', icon: '⚡', color: 'bg-blue-500' },
                                    { name: 'Crypto', icon: '₿', color: 'bg-orange-500' }
                                ].map(cat => (
                                    <button key={cat.name} className="flex items-center gap-6 bg-white/[0.03] border border-white/5 px-12 py-5 rounded-full hover:bg-white/[0.08] hover:border-primary/40 transition-all active-press shadow-2xl backdrop-blur-md">
                                        <div className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center text-xl shadow-2xl`}>{cat.icon}</div>
                                        <span className="text-lg font-black italic uppercase tracking-widest text-white">{cat.name}</span>
                                    </button>
                                ))}
                            </motion.div>
                        </div>

                        {/* TRENDING FORECASTS (The Grid) */}
                        <div className="space-y-12">
                            <motion.div variants={itemVariants} className="flex justify-between items-center px-4">
                                <div className="flex items-center gap-8">
                                    <span className="text-4xl animate-bounce">⚡</span>
                                    <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">Trending Node Streams</h3>
                                </div>
                                <div className="flex gap-6">
                                    <button className="w-16 h-16 rounded-[24px] border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all active-press shadow-2xl"><ChevronLeft size={32}/></button>
                                    <button className="w-16 h-16 rounded-[24px] border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all active-press shadow-2xl"><ChevronRight size={32}/></button>
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-2">
                                {filteredMarkets.slice(0, 4).map(m => (
                                    <MarketCard key={m.id} {...m} onClick={() => setDetailedMarket(m)} onQuickBet={() => setSelectedMarket(m)} />
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* THE ANALYTICAL PEAK SIDEBAR */}
                    <aside className="flex-1 min-w-[420px] space-y-16">
                        <motion.div variants={itemVariants} className="glass p-14 rounded-[64px] border-white/5 space-y-14 relative overflow-hidden bg-white/[0.01] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[120px]" />
                            <div className="flex justify-between items-center px-4">
                                 <h4 className="text-base font-black italic uppercase tracking-[0.4em] opacity-40">Confidence Index</h4>
                                 <Activity size={24} className="text-primary animate-pulse" />
                            </div>
                            <div className="relative w-full aspect-square flex flex-col items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="50%" cy="50%" r="43%" fill="transparent" stroke="currentColor" strokeWidth="16" className="text-white/[0.02]" />
                                    <motion.circle
                                        initial={{ strokeDashoffset: 270 }}
                                        animate={{ strokeDashoffset: 270 * (1 - 0.67) }}
                                        transition={{ duration: 3, ease: [0.23, 1, 0.32, 1] }}
                                        cx="50%" cy="50%" r="43%" fill="transparent" stroke="currentColor" strokeWidth="16" strokeDasharray="270" className="text-primary drop-shadow-glow" strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center space-y-3 text-center pt-8">
                                    <span className="text-[140px] font-black italic tracking-tighter leading-none tabular drop-shadow-glow">67%</span>
                                    <span className="text-xs font-black uppercase tracking-[0.6em] opacity-30 italic leading-none">Market Performance Cluster</span>
                                    <div className="flex items-center gap-4 text-secondary text-lg font-black italic pt-10">
                                        <TrendingUp size={22}/> + 4.3% this cycle
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-10 pt-10 border-t border-white/5">
                                <SectorProgress label="Institutional Economy" value={72} color="bg-primary" />
                                <SectorProgress label="Regional Politics" value={61} color="bg-fuchsia" />
                                <SectorProgress label="Oracle Precision" value={78} color="bg-secondary" />
                                <SectorProgress label="Infrastructure supply" value={55} color="bg-accent" />
                            </div>
                            <button className="w-full text-sm font-black uppercase tracking-[0.5em] text-primary hover:underline py-6 active-press transition-all">Audit Node Data Cluster →</button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="glass p-12 rounded-[64px] border-white/5 space-y-12 bg-white/[0.01] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                            <div className="flex justify-between items-center px-4">
                                 <h4 className="text-sm font-black italic uppercase tracking-[0.4em] opacity-40">Oracle Leaders</h4>
                                 <Award size={24} className="text-secondary" />
                            </div>
                            <div className="space-y-10">
                                <AnalystRowMini rank={1} name="The Macro Sage" accuracy={91.4} followers="1.2K" img="https://i.pravatar.cc/150?u=12" color="bg-yellow-500" />
                                <AnalystRowMini rank={2} name="Bayo Economics" accuracy={88.2} followers="863" img="https://i.pravatar.cc/150?u=15" color="bg-slate-300" />
                                <AnalystRowMini rank={3} name="Naija Sports Hub" accuracy={85.7} followers="1.6K" img="https://i.pravatar.cc/150?u=18" color="bg-orange-600" />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative p-12 rounded-[64px] bg-[#020617] border border-primary/20 overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.8)] group active-press">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[180px]" />
                            <div className="relative z-10 space-y-10 text-left">
                                <div className="w-20 h-20 rounded-[32px] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000">
                                    <Cpu size={40}/>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.9] text-white">Join the protocol Hub.</h4>
                                    <p className="text-xl text-slate-400 font-medium italic leading-relaxed">Establish your analytical signature and earn global oracle reputation points.</p>
                                </div>
                                <Button className="w-full !rounded-[32px] !py-12 text-2xl font-black uppercase tracking-[0.3em] italic group active-press">
                                    Seal Node Signature <ArrowRight className="ml-5 group-hover:translate-x-4 transition-transform w-8 h-8" />
                                </Button>
                            </div>
                            <div className="absolute bottom-[-60px] right-[-60px] opacity-10 scale-150 rotate-12 group-hover:rotate-[30deg] transition-transform duration-1000">
                                 <MessageSquare size={300} className="text-primary" />
                            </div>
                        </motion.div>
                    </aside>
                </div>
              </motion.div>
            )}

            {/* REST OF VIEWS (Registry, Portfolio, Profile, etc.) - Fully Redesigned locally */}
            {view === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-7xl mx-auto space-y-20 text-left py-10 px-4">
                    <div className="flex items-center justify-between bg-white/[0.01] p-12 rounded-[64px] border border-white/5 shadow-inner">
                        <div className="space-y-4"><h2 className="text-8xl font-black italic tracking-tighter uppercase mb-2 text-white leading-none">Security Peak</h2><p className="text-2xl text-slate-500 font-bold italic opacity-70">Manage analytical credentials and node synchronization.</p></div>
                        <Button variant="danger" size="icon" className="glass !rounded-[40px] h-24 w-24 hover:bg-crimson text-white active-press shadow-2xl transition-all hover:scale-110" onClick={logout}><LogOut size={48}/></Button>
                    </div>
                </motion.div>
            )}

          </AnimatePresence>
          <div className="h-64" />
        </div>
      </main>

      {/* --- OVERLAYS (Stable Hydration) --- */}
      <AnimatePresence>
        {isCreating && (
          <CreateForecastModal
            onClose={() => setIsCreating(false)}
            onCreate={() => {
                toast.success("Initializing Node Signature Process...", {
                    description: "Establishing analytical cluster connection."
                });
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

// --- DASHBOARD SUB-COMPONENTS (Elite Pro Max) ---

function StatsCard({ icon, title, label, trend, color }: any) {
    return (
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          className="glass p-12 rounded-[56px] border-white/5 flex flex-col gap-10 bg-white/[0.01] hover:bg-white/[0.03] transition-all group cursor-default shadow-[0_20px_60px_rgba(0,0,0,0.4)] min-h-[300px] justify-between relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] -z-0 rounded-bl-[100px]" />
            <div className={`w-20 h-20 rounded-[32px] bg-white/[0.03] flex items-center justify-center ${color} shadow-2xl group-hover:scale-110 transition-transform duration-700 border border-white/5 group-hover:border-primary/20 relative z-10`}>{icon}</div>
            <div className="text-left space-y-4 relative z-10 pl-2">
                <div className="flex flex-col space-y-1">
                    <span className="text-6xl font-black italic tracking-tighter tabular leading-none text-white">{title}</span>
                    <span className="text-xs font-black uppercase tracking-[0.5em] opacity-30 italic leading-none pt-2 text-slate-500">{label}</span>
                </div>
                <div className={`text-sm font-black italic uppercase tracking-[0.4em] ${trend.includes('+') ? 'text-secondary' : 'text-crimson'} opacity-80 pt-2 tabular flex items-center gap-3`}>
                    <div className={`w-2 h-2 rounded-full ${trend.includes('+') ? 'bg-secondary' : 'bg-crimson'} animate-pulse`} />
                    {trend}
                </div>
            </div>
        </motion.div>
    );
}

function SectorProgress({ label, value, color }: any) {
    return (
        <div className="space-y-4 px-2">
            <div className="flex justify-between items-end">
                <span className="text-[11px] font-black uppercase tracking-[0.5em] opacity-40 italic text-slate-400">{label}</span>
                <span className="text-2xl font-black italic tabular text-white drop-shadow-glow">{value}%</span>
            </div>
            <div className="h-2.5 w-full bg-white/[0.03] rounded-full overflow-hidden shadow-inner border border-white/5">
                <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }} className={`h-full ${color} drop-shadow-glow shadow-[0_0_20px_rgba(255,255,255,0.1)]`} />
            </div>
        </div>
    );
}

function AnalystRowMini({ rank, name, accuracy, followers, img, color }: any) {
    return (
        <div className="flex items-center justify-between group cursor-pointer active-press hover:bg-white/[0.02] p-6 rounded-[40px] transition-all border border-transparent hover:border-white/5">
            <div className="flex items-center gap-8">
                <div className="relative">
                    <div className={`absolute -top-2 -left-2 w-10 h-10 rounded-xl ${color} text-[#010206] text-sm font-black flex items-center justify-center shadow-2xl z-10 italic border-4 border-[#010206]`}>{rank}</div>
                    <img src={img} className="w-20 h-20 rounded-[32px] object-cover border-2 border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl" alt={name} />
                </div>
                <div className="text-left space-y-1">
                    <p className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-primary transition-colors leading-none">{name} <CheckCircle2 className="inline ml-3 text-primary opacity-40 group-hover:opacity-100" size={24}/></p>
                    <div className="flex items-center gap-6">
                        <p className="text-sm font-bold text-secondary uppercase italic opacity-60 tabular">{accuracy}% Precision</p>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest tabular">{followers} Analysts Sync</p>
                    </div>
                </div>
            </div>
            <button className="bg-primary/10 text-primary border border-primary/20 px-10 py-4 rounded-[20px] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all shadow-glow active-press">Synchronize</button>
        </div>
    );
}
