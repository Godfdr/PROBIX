"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  Zap,
  CirclePlay,
  Users,
  BarChart3,
  MessageSquare,
  Globe,
  MoreVertical,
  Activity,
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { ProbixLogo } from '@/components/ui/ProbixLogo';
import { useRouter } from 'next/navigation';
import { useProbix } from '@/store/ProbixContext';
import { GlassBadge, PulseNode } from '@/components/dashboard/DashboardComponents';
import { MarketCard } from '@/components/dashboard/MarketCard';
import { LandingHeader } from '@/components/landing/LandingHeader';

export default function ProbixLanding() {
  const [view, setView] = useState<'landing' | 'auth'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();
  const { login, isAuthenticated, isHydrated, markets } = useProbix();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isHydrated && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isHydrated, router, mounted]);

  if (!mounted || !isHydrated) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#010206] text-white selection:bg-primary/40">

      {/* HEADER MATCHING IMAGE */}
      <LandingHeader setView={setView} setAuthMode={setAuthMode} />

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.main
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 flex flex-col items-center"
          >
            {/* HERO SECTION WITH AFRICA MAP */}
            <section className="relative w-full max-w-7xl px-12 py-20 flex flex-col md:flex-row items-center min-h-[600px]">
                <div className="relative z-10 flex-[1.2] text-left space-y-10">
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
                        <ProbixLogo size="sm" />
                        <span className="text-xs font-black uppercase tracking-[0.4em] opacity-40">Global Intelligence Hub</span>
                    </motion.div>
                    <h1 className="text-7xl lg:text-[100px] font-black italic tracking-tighter leading-[0.8] uppercase">
                        Forecast Africa. <br /> <span className="text-primary drop-shadow-glow">Stay Ahead.</span>
                    </h1>
                    <p className="text-2xl text-slate-400 font-medium max-w-xl leading-relaxed italic">
                        Join thousands of Africans forecasting the future with data, insights and collective intelligence.
                    </p>
                    <div className="flex items-center gap-10 pt-4">
                        <Button size="lg" className="!px-12 !rounded-full !py-8 shadow-[0_20px_80px_rgba(59,130,246,0.4)] font-black italic uppercase tracking-widest text-xl group active-press" onClick={() => setView('auth')}>
                            Explore Forecasts <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                        </Button>
                        <button className="flex items-center gap-4 text-base font-black hover:text-primary transition-all uppercase tracking-widest group/play active-press">
                            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover/play:border-primary transition-colors bg-white/5">
                                <CirclePlay size={24} className="group-hover/play:fill-primary/20" />
                            </div>
                            Watch Demo
                        </button>
                    </div>

                    {/* HERO AVATARS */}
                    <div className="flex items-center gap-6 pt-10">
                        <div className="flex -space-x-3">
                            {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/150?u=${i+20}`} className="w-10 h-10 rounded-full border-2 border-[#010206] object-cover" alt="User" />)}
                        </div>
                        <div className="text-left">
                            <p className="text-lg font-black italic leading-none">42,831+</p>
                            <p className="text-[10px] font-bold uppercase opacity-40 tracking-widest">Active forecasters</p>
                        </div>
                    </div>
                </div>

                {/* THE AFRICA MAP COMPONENT (REPLICATED FROM IMAGE) */}
                <div className="relative flex-1 h-full min-h-[500px] w-full flex items-center justify-center">
                    <div className="relative w-full h-[600px]">
                        {/* DOTTED AFRICA MAP SVG MOCK */}
                        <svg viewBox="0 0 1000 1000" className="w-full h-full text-primary/30 fill-current overflow-visible opacity-50">
                             <circle cx="500" cy="450" r="350" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="animate-pulse" />
                             <path d="M400,100 L450,100 L500,120 L550,150 L580,200 L600,250 L620,300 L650,320 L700,320 L750,350 L800,400 L820,450 L800,500 L750,600 L700,700 L650,800 L600,850 L550,900 L500,920 L450,900 L400,850 L350,750 L320,650 L300,550 L280,450 L250,400 L250,350 L280,300 L320,250 L350,200 Z" className="opacity-10" />
                        </svg>

                        {/* FLOATING BADGES MATCHING IMAGE */}
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[5%]">
                            <GlassBadge icon={<TrendingUp size={14}/>} color="border-secondary/50" text="Nigeria Inflation" stat="Below 18% in 2026?" statColor="text-white" subStat="72% Yes" subStatColor="text-secondary" />
                        </motion.div>
                        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[28%] right-[10%]">
                            <GlassBadge icon={<Users size={14}/>} color="border-accent/50" text="Kenya Elections" stat="Ruto Re-elected?" statColor="text-white" subStat="61% Yes" subStatColor="text-accent" />
                        </motion.div>
                        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[55%] left-[-15%]">
                            <GlassBadge icon={<Award size={14}/>} color="border-fuchsia/50" text="AFCON 2025" stat="Nigeria to Win?" statColor="text-white" subStat="78% Yes" subStatColor="text-fuchsia" />
                        </motion.div>
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-[20%] right-[30%]">
                            <GlassBadge icon={<Zap size={14}/>} color="border-primary/50" text="Naira to Dollar" stat="Below ₦1,500?" statColor="text-white" subStat="67% Yes" subStatColor="text-primary" />
                        </motion.div>
                        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute bottom-[40%] left-[25%]">
                            <GlassBadge icon={<Activity size={14}/>} color="border-secondary/50" text="Oil Price" stat="Above $100?" statColor="text-white" subStat="55% Yes" subStatColor="text-secondary" />
                        </motion.div>

                        {/* MAP NODES */}
                        <PulseNode top="12%" left="48%" color="bg-secondary" />
                        <PulseNode top="45%" left="55%" color="bg-primary" />
                        <PulseNode top="65%" left="35%" color="bg-fuchsia" />
                        <PulseNode top="35%" left="75%" color="bg-accent" />
                    </div>
                </div>
            </section>

            {/* HORIZONTAL STATS BAR (MATCHING IMAGE) */}
            <section className="w-full max-w-7xl px-12 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard icon={<Users size={24}/>} title="42,831+" label="Active Forecasters" trend="+ 12.5% this month" color="text-primary" />
                <StatsCard icon={<BarChart3 size={24}/>} title="12,430+" label="Live Forecasts" trend="+ 8.4% this month" color="text-fuchsia" />
                <StatsCard icon={<TrendingUp size={24}/>} title="68.7%" label="Avg. Market Accuracy" trend="+ 5.2% this month" color="text-secondary" />
                <StatsCard icon={<MessageSquare size={24}/>} title="94.2K+" label="Comments & Insights" trend="+ 15.7% this month" color="text-accent" />
            </section>

            {/* MAIN CONTENT AREA WITH RIGHT SIDEBAR */}
            <section className="w-full max-w-7xl px-12 py-20 flex flex-col xl:flex-row gap-12">
                <div className="flex-[3] space-y-16">
                    {/* EXPLORE BY CATEGORY */}
                    <div className="space-y-10">
                        <div className="flex justify-between items-center px-2">
                            <h3 className="text-2xl font-black italic uppercase tracking-tight">Explore by Category</h3>
                            <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View all categories</button>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {[
                                { name: 'Politics', icon: '🏛️', color: 'bg-primary' },
                                { name: 'Economy', icon: '📈', color: 'bg-secondary' },
                                { name: 'Sports', icon: '⚽', color: 'bg-accent' },
                                { name: 'Technology', icon: '🚀', color: 'bg-fuchsia' },
                                { name: 'Energy', icon: '⚡', color: 'bg-blue-500' },
                                { name: 'Crypto', icon: '₿', color: 'bg-orange-500' },
                                { name: 'Business', icon: '💼', color: 'bg-indigo-500' },
                                { name: 'Entertainment', icon: '🎭', color: 'bg-pink-500' }
                            ].map(cat => (
                                <button key={cat.name} className="flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-3.5 rounded-full hover:bg-white/10 transition-all active-press">
                                    <div className={`w-8 h-8 rounded-full ${cat.color} flex items-center justify-center text-sm shadow-lg`}>{cat.icon}</div>
                                    <span className="text-sm font-black italic uppercase tracking-widest">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TRENDING FORECASTS GRID */}
                    <div className="space-y-10">
                        <div className="flex justify-between items-center px-2">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl animate-bounce">🔥</span>
                                <h3 className="text-2xl font-black italic uppercase tracking-tight">Trending Forecasts</h3>
                            </div>
                            <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View all forecasts</button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {markets.slice(0, 4).map(m => (
                                <MarketCard key={m.id} {...m} onClick={() => {}} onQuickBet={() => {}} />
                            ))}
                        </div>
                        {/* NAVIGATION ARROWS FROM IMAGE */}
                        <div className="flex justify-center gap-4 pt-6">
                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><ChevronLeft size={24}/></button>
                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><ChevronRight size={24}/></button>
                        </div>
                    </div>
                </div>

                {/* THE ELITE RIGHT SIDEBAR */}
                <aside className="flex-1 space-y-10">
                    {/* MARKET CONFIDENCE GAUGE */}
                    <div className="glass p-10 rounded-[40px] border-white/5 space-y-10 relative overflow-hidden bg-white/[0.01]">
                        <div className="flex justify-between items-center px-2">
                             <h4 className="text-sm font-black italic uppercase tracking-widest opacity-60">Market Confidence</h4>
                             <button className="text-[10px] font-black text-primary uppercase tracking-widest">View all</button>
                        </div>
                        <div className="relative w-full aspect-square flex flex-col items-center justify-center">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-white/5" />
                                <motion.circle
                                    initial={{ strokeDashoffset: 263.8 }}
                                    animate={{ strokeDashoffset: 263.8 * (1 - 0.67) }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    cx="50%" cy="50%" r="42%" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="263.8" className="text-primary drop-shadow-glow" strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center space-y-1">
                                <span className="text-[100px] font-black italic tracking-tighter leading-none tabular">67%</span>
                                <span className="text-xs font-black uppercase tracking-[0.4em] opacity-40 italic">Overall Market Confidence</span>
                                <div className="flex items-center gap-2 text-secondary text-xs font-black italic pt-4">
                                    <TrendingUp size={14}/> + 4.3% this week
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 pt-6 border-t border-white/5">
                            <SectorProgress label="Economy" value={72} color="bg-primary" />
                            <SectorProgress label="Politics" value={61} color="bg-fuchsia" />
                            <SectorProgress label="Sports" value={78} color="bg-secondary" />
                            <SectorProgress label="Energy" value={55} color="bg-accent" />
                            <SectorProgress label="Tech" value={63} color="bg-blue-500" />
                        </div>
                        <button className="w-full text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:underline py-2">View full report →</button>
                    </div>

                    {/* TOP ANALYSTS */}
                    <div className="glass p-10 rounded-[40px] border-white/5 space-y-10 bg-white/[0.01]">
                        <div className="flex justify-between items-center px-2">
                             <h4 className="text-sm font-black italic uppercase tracking-widest opacity-60">Top Analysts</h4>
                             <button className="text-[10px] font-black text-primary uppercase tracking-widest">View all</button>
                        </div>
                        <div className="space-y-8">
                            <AnalystRowMini rank={1} name="The Macro Sage" accuracy={91} followers="1.2K" img="https://i.pravatar.cc/150?u=12" color="bg-yellow-500" />
                            <AnalystRowMini rank={2} name="Bayo Economics" accuracy={88} followers="863" img="https://i.pravatar.cc/150?u=15" color="bg-slate-300" />
                            <AnalystRowMini rank={3} name="Naija Sports Hub" accuracy={85} followers="1.6K" img="https://i.pravatar.cc/150?u=18" color="bg-orange-600" />
                        </div>
                    </div>

                    {/* CTA JOIN THE CONVERSATION */}
                    <div className="relative p-10 rounded-[40px] bg-[#020617] border border-primary/20 overflow-hidden shadow-2xl group active-press">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 blur-[100px]" />
                        <div className="relative z-10 space-y-6 text-left">
                            <h4 className="text-3xl font-black italic uppercase tracking-tight leading-none">Join the conversation.</h4>
                            <p className="text-sm font-medium text-slate-400 italic leading-relaxed">Share your predictions and earn reputation nodes.</p>
                            <Button className="w-full !rounded-2xl !py-6 text-xs font-black uppercase tracking-widest italic group">
                                Create Your First Forecast <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </div>
                        <div className="absolute bottom-[-20px] right-[-20px] opacity-10 scale-150 rotate-12">
                             <MessageSquare size={120} className="text-primary" />
                        </div>
                    </div>
                </aside>
            </section>

            {/* TRUSTED BY FOOTER LOGOS */}
            <section className="w-full bg-[#010206] py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-12 space-y-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-30 text-left italic">Trusted by forward thinkers across Africa</p>
                    <div className="flex flex-wrap items-center justify-between gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
                        {['Flutterwave', 'Paystack', 'Big Cabal Media', 'Chipper', 'Cowrywise', 'Andela'].map(name => (
                            <span key={name} className="text-3xl font-black italic tracking-tighter uppercase opacity-60 hover:opacity-100 transition-opacity cursor-pointer">{name}</span>
                        ))}
                    </div>
                </div>
            </section>
          </motion.main>
        )}

        {view === 'auth' && (
          <motion.section key="auth" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen flex items-center justify-center p-6 pt-24 bg-[#010206]">
            <div className="w-full max-w-md p-12 glass rounded-[48px] border-white/10 shadow-3xl text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[80px]" />
              <div className="relative z-10 flex flex-col items-center text-center mb-10">
                 <ProbixLogo size="md" />
                 <h2 className="text-4xl font-black italic mt-6 uppercase tracking-tighter">{authMode === 'login' ? 'Authorize' : 'Initialize'}</h2>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mt-2 italic">Terminal Session 2.4.0</p>
              </div>
              <div className="space-y-6 relative z-10">
                <input type="text" placeholder="Analytical Handle" className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 px-8 outline-none focus:border-primary/50 transition-all font-black italic placeholder:opacity-20 text-white shadow-inner" />
                <input type="password" placeholder="Terminal Signature" className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 px-8 outline-none focus:border-primary/50 transition-all font-black italic placeholder:opacity-20 text-white shadow-inner" />
                <Button className="w-full !py-8 text-xl !rounded-[32px] font-black italic uppercase tracking-widest shadow-glow mt-4" onClick={() => { login(); router.push('/dashboard'); }}>
                  {authMode === 'login' ? 'Establish Session' : 'Access Node'}
                </Button>
                <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="w-full text-center text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors italic">
                  {authMode === 'login' ? "Protocol handle not found? Initialize" : "Signature established? Authorize"}
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS MATCHING IMAGE STYLE ---

function StatsCard({ icon, title, label, trend, color }: any) {
    return (
        <div className="glass p-8 rounded-[40px] border-white/5 flex items-start gap-8 bg-white/[0.01] hover:bg-white/[0.03] transition-all group cursor-default shadow-xl">
            <div className={`w-14 h-14 rounded-[18px] bg-white/5 flex items-center justify-center ${color} shadow-inner group-hover:scale-110 transition-transform duration-500 border border-white/5`}>{icon}</div>
            <div className="text-left space-y-2">
                <div className="flex flex-col">
                    <span className="text-3xl font-black italic tracking-tighter tabular leading-none">{title}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1 italic">{label}</span>
                </div>
                <div className={`text-[9px] font-black italic uppercase tracking-widest ${trend.includes('+') ? 'text-secondary' : 'text-crimson'} opacity-80 pt-1`}>{trend}</div>
            </div>
        </div>
    );
}

function SectorProgress({ label, value, color }: any) {
    return (
        <div className="space-y-3 px-1">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">{label}</span>
                <span className="text-lg font-black italic tabular">{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full ${color} drop-shadow-glow`} />
            </div>
        </div>
    );
}

function AnalystRowMini({ rank, name, accuracy, followers, img, color }: any) {
    return (
        <div className="flex items-center justify-between group cursor-pointer active-press">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <div className={`absolute -top-1.5 -left-1.5 w-6 h-6 rounded-lg ${color} text-[#010206] text-[10px] font-black flex items-center justify-center shadow-lg z-10 italic`}>{rank}</div>
                    <img src={img} className="w-12 h-12 rounded-2xl object-cover border-2 border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-xl" alt={name} />
                </div>
                <div className="text-left space-y-0.5">
                    <p className="text-sm font-black italic uppercase tracking-tight text-white group-hover:text-primary transition-colors leading-none">{name}</p>
                    <p className="text-[9px] font-bold text-secondary uppercase italic opacity-60 tabular">{accuracy}% Accuracy</p>
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest tabular">{followers} followers</p>
                </div>
            </div>
            <button className="bg-primary/10 text-primary border border-primary/20 px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-glow">Follow</button>
        </div>
    );
}
