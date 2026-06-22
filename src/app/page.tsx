"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  Zap,
  CirclePlay,
  Users,
  BarChart3,
  MessageSquare,
  Globe,
  Award,
  ChevronRight,
  ChevronLeft,
  Activity,
  Lock,
  User,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { ProbixLogo } from '@/components/ui/ProbixLogo';
import { useRouter } from 'next/navigation';
import { useProbix } from '@/store/ProbixContext';
import { GlassBadge, PulseNode } from '@/components/dashboard/DashboardComponents';
import { toast } from 'sonner';

export default function ProbixLanding() {
  const [view, setView] = useState<'landing' | 'onboarding' | 'auth'>('landing');
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

  // --- 3D MOTION SENSOR (Emil Kowalski Physics) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  if (!mounted || !isHydrated) {
    return (
      <div className="h-screen bg-[#010206] flex items-center justify-center">
        <ProbixLogo size="md" className="animate-pulse opacity-50" />
      </div>
    );
  }

  const easeOut = [0.23, 1, 0.32, 1];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-x-hidden bg-[#010206] text-white selection:bg-primary/40 transition-colors duration-1000"
    >

      {/* ELITE HEADER - High Fidelity Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-14 h-28 flex justify-between items-center glass border-b border-white/5 backdrop-blur-3xl">
        <div className="flex items-center gap-24">
          <div className="flex items-center gap-5 cursor-pointer group active-press" onClick={() => setView('landing')}>
            <ProbixLogo size="sm" />
            <span className="font-black text-3xl tracking-tighter italic text-white transition-all group-hover:tracking-normal">PROBIX</span>
          </div>

          <div className="hidden xl:flex items-center gap-12">
            {['Discovery', 'Node Stream', 'Oracle Registry', 'Insights', 'Protocol'].map((link) => (
              <button key={link} className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 hover:text-primary transition-all active-press">{link}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-10">
          <ThemeToggle />
          <button className="text-sm font-black uppercase tracking-[0.3em] italic hover:text-primary transition-all active-press text-white" onClick={() => { setAuthMode('login'); setView('auth'); }}>Authorize</button>
          <Button className="!rounded-2xl !px-14 !py-8 shadow-[0_30px_100px_oklch(65%_0.22_250_/_30%)] text-sm font-black uppercase tracking-[0.3em] active-press" onClick={() => setView('onboarding')}>Establish Node</Button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {/* --- VIEW: LANDING --- */}
        {view === 'landing' && (
          <motion.main
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            className="pt-28 flex flex-col items-center"
          >
            {/* HERO SECTION - The Africa Hub Cluster */}
            <section className="relative w-full max-w-[1600px] px-16 py-24 flex flex-col 2xl:flex-row items-center min-h-[700px]">
                <div className="relative z-10 flex-[1.4] text-left space-y-16 pl-6">
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-5">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary italic">Terminal Hub v2.4.0 Active</span>
                    </motion.div>
                    <h1 className="text-9xl lg:text-[160px] font-light italic tracking-tighter leading-[0.75] uppercase transition-all duration-1000">
                        Forecast Africa. <br /> <span className="font-black text-primary drop-shadow-glow">Stay Ahead.</span>
                    </h1>
                    <p className="text-3xl text-slate-400 font-medium max-w-2xl leading-tight italic opacity-80">
                        Join 42,831 analysts leveraging institutional-grade data and decentralized oracle intelligence.
                    </p>
                    <div className="flex items-center gap-12 pt-6">
                        <Button size="lg" className="!px-16 !py-10 !rounded-full shadow-[0_30px_120px_oklch(65%_0.22_250_/_40%)] font-black italic uppercase tracking-[0.3em] text-2xl group active-press" onClick={() => setView('onboarding')}>
                            Explore Discovery <ArrowRight className="ml-5 group-hover:translate-x-3 transition-transform w-8 h-8" />
                        </Button>
                        <button className="flex items-center gap-6 text-lg font-black hover:text-primary transition-all uppercase tracking-[0.2em] group/play active-press">
                            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover/play:border-primary transition-all duration-500 bg-white/5 shadow-2xl">
                                <CirclePlay size={36} className="group-hover/play:fill-primary/20 transition-all duration-700" />
                            </div>
                            Watch Tutorial
                        </button>
                    </div>

                    <div className="flex items-center gap-8 pt-12">
                        <div className="flex -space-x-4">
                            {[1,2,3,4,5].map(i => <img key={i} src={`https://i.pravatar.cc/150?u=${i+30}`} className="w-14 h-14 rounded-full border-4 border-[#010206] object-cover shadow-2xl" alt="User" />)}
                        </div>
                        <div className="text-left space-y-1">
                            <p className="text-2xl font-black italic leading-none tabular tracking-tighter">42,831+</p>
                            <p className="text-[10px] font-black uppercase opacity-40 tracking-[0.4em] italic">Active Forecasters</p>
                        </div>
                    </div>
                </div>

                {/* THE PROBIX ANALYTICAL MAP */}
                <div className="relative flex-1 h-full min-h-[600px] w-full flex items-center justify-center">
                    <div className="relative w-full h-[700px]">
                        <svg viewBox="0 0 1000 1000" className="w-full h-full text-primary/20 fill-current overflow-visible opacity-60">
                             <circle cx="500" cy="450" r="400" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 8" className="animate-pulse" />
                             <path d="M400,100 L450,100 L500,120 L550,150 L580,200 L600,250 L620,300 L650,320 L700,320 L750,350 L800,400 L820,450 L800,500 L750,600 L700,700 L650,800 L600,850 L550,900 L500,920 L450,900 L400,850 L350,750 L320,650 L300,550 L280,450 L250,400 L250,350 L280,300 L320,250 L350,200 Z" className="opacity-10" />
                        </svg>

                        {/* HIGH-FIDELITY BADGES */}
                        <motion.div animate={{ y: [0, -15, 0], x: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[8%] left-[5%] active-press">
                            <GlassBadge icon={<TrendingUp size={18}/>} color="border-secondary/50" text="Nigeria Inflation" stat="Below 18% in 2026?" statColor="text-white" subStat="72% Yes" subStatColor="text-secondary" />
                        </motion.div>
                        <motion.div animate={{ y: [0, 12, 0], x: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[32%] right-[8%] active-press">
                            <GlassBadge icon={<Users size={18}/>} color="border-accent/50" text="Kenya Elections" stat="Ruto Re-elected?" statColor="text-white" subStat="61% Yes" subStatColor="text-accent" />
                        </motion.div>
                        <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[60%] left-[-10%] active-press">
                            <GlassBadge icon={<Award size={18}/>} color="border-fuchsia/50" text="AFCON Hub" stat="Nigeria to Win?" statColor="text-white" subStat="78% Yes" subStatColor="text-fuchsia" />
                        </motion.div>
                        <motion.div animate={{ y: [0, 15, 0], x: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-[15%] right-[25%] active-press">
                            <GlassBadge icon={<Zap size={18}/>} color="border-primary/50" text="Naira-USD Node" stat="Below ₦1,400?" statColor="text-white" subStat="67% Yes" subStatColor="text-primary" />
                        </motion.div>

                        <PulseNode top="12%" left="48%" color="bg-secondary" />
                        <PulseNode top="45%" left="55%" color="bg-primary" />
                        <PulseNode top="65%" left="35%" color="bg-fuchsia" />
                        <PulseNode top="35%" left="75%" color="bg-accent" />
                    </div>
                </div>
            </section>

            {/* INSTITUTIONAL STATS - Multi-layered */}
            <section className="w-full max-w-7xl px-16 py-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <StatsCard icon={<Users size={28}/>} title="42,831+" label="Active Forecasters" trend="+ 12.5% Signal" color="text-primary" />
                <StatsCard icon={<BarChart3 size={28}/>} title="12,430+" label="Live Node Streams" trend="+ 8.4% Volume" color="text-fuchsia" />
                <StatsCard icon={<TrendingUp size={28}/>} title="68.7%" label="Avg. Oracle Accuracy" trend="+ 5.2% Drift" color="text-secondary" />
                <StatsCard icon={<MessageSquare size={28}/>} title="94.2K+" label="Analytical Insights" trend="+ 15.7% Pulse" color="text-accent" />
            </section>

            {/* CORE ANALYTICAL GRID */}
            <section className="w-full max-w-7xl px-16 py-24 flex flex-col xl:flex-row gap-16">
                <div className="flex-[3] space-y-20">
                    <div className="space-y-12">
                        <div className="flex justify-between items-center px-4">
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter">Explore Node Hubs</h3>
                            <button className="text-[10px] font-black text-primary uppercase tracking-[0.4em] hover:underline active-press">View All Protocols →</button>
                        </div>
                        <div className="flex flex-wrap gap-5">
                            {[
                                { name: 'Politics', icon: '🏛️', color: 'bg-primary' },
                                { name: 'Economy', icon: '📈', color: 'bg-secondary' },
                                { name: 'Sports', icon: '⚽', color: 'bg-accent' },
                                { name: 'Technology', icon: '🚀', color: 'bg-fuchsia' },
                                { name: 'Energy', icon: '⚡', color: 'bg-blue-500' },
                                { name: 'Crypto', icon: '₿', color: 'bg-orange-500' },
                                { name: 'Business', icon: '💼', color: 'bg-indigo-500' }
                            ].map(cat => (
                                <button key={cat.name} className="flex items-center gap-5 bg-white/[0.03] border border-white/5 px-10 py-4 rounded-full hover:bg-white/[0.08] hover:border-primary/30 transition-all active-press shadow-xl backdrop-blur-sm">
                                    <div className={`w-10 h-10 rounded-full ${cat.color} flex items-center justify-center text-lg shadow-2xl`}>{cat.icon}</div>
                                    <span className="text-base font-black italic uppercase tracking-widest">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="flex justify-between items-center px-4">
                            <div className="flex items-center gap-6">
                                <span className="text-3xl animate-bounce">⚡</span>
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter">Trending Node Streams</h3>
                            </div>
                            <button className="text-[10px] font-black text-primary uppercase tracking-[0.4em] hover:underline active-press">Full Registry →</button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {markets.slice(0, 4).map(m => (
                                <MarketCard key={m.id} {...m} onClick={() => {}} onQuickBet={() => {}} />
                            ))}
                        </div>
                        <div className="flex justify-center gap-6 pt-10">
                            <button className="w-16 h-16 rounded-[24px] border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all active-press shadow-2xl"><ChevronLeft size={32}/></button>
                            <button className="w-16 h-16 rounded-[24px] border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all active-press shadow-2xl"><ChevronRight size={32}/></button>
                        </div>
                    </div>
                </div>

                {/* THE ELITE RIGHT SIDEBAR (The Peak) */}
                <aside className="flex-1 space-y-12">
                    <div className="glass p-12 rounded-[56px] border-white/5 space-y-12 relative overflow-hidden bg-white/[0.01] shadow-3xl">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[100px]" />
                        <div className="flex justify-between items-center px-2">
                             <h4 className="text-sm font-black italic uppercase tracking-[0.3em] opacity-40">Market Confidence</h4>
                             <Activity size={18} className="text-primary animate-pulse" />
                        </div>
                        <div className="relative w-full aspect-square flex flex-col items-center justify-center">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="50%" cy="50%" r="43%" fill="transparent" stroke="currentColor" strokeWidth="14" className="text-white/[0.02]" />
                                <motion.circle
                                    initial={{ strokeDashoffset: 270 }}
                                    animate={{ strokeDashoffset: 270 * (1 - 0.67) }}
                                    transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
                                    cx="50%" cy="50%" r="43%" fill="transparent" stroke="currentColor" strokeWidth="14" strokeDasharray="270" className="text-primary drop-shadow-glow" strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center space-y-2 text-center pt-4">
                                <span className="text-[120px] font-black italic tracking-tighter leading-none tabular drop-shadow-glow">67%</span>
                                <span className="text-xs font-black uppercase tracking-[0.5em] opacity-30 italic leading-none">Global Sentiment Index</span>
                                <div className="flex items-center gap-3 text-secondary text-base font-black italic pt-8">
                                    <TrendingUp size={18}/> + 4.3% Drift
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8 pt-8 border-t border-white/5">
                            <SectorProgress label="Economy Nodes" value={72} color="bg-primary" />
                            <SectorProgress label="Oracle Politics" value={61} color="bg-fuchsia" />
                            <SectorProgress label="Sports Accuracy" value={78} color="bg-secondary" />
                            <SectorProgress label="Energy Supply" value={55} color="bg-accent" />
                        </div>
                        <button className="w-full text-xs font-black uppercase tracking-[0.4em] text-primary hover:underline py-4 active-press transition-all">Audit Node Data Sources →</button>
                    </div>

                    <div className="glass p-12 rounded-[56px] border-white/5 space-y-12 bg-white/[0.01] shadow-3xl">
                        <div className="flex justify-between items-center px-2">
                             <h4 className="text-sm font-black italic uppercase tracking-[0.3em] opacity-40">Master Oracles</h4>
                             <Award size={18} className="text-secondary" />
                        </div>
                        <div className="space-y-10">
                            <AnalystRowMini rank={1} name="The Macro Sage" accuracy={91.4} followers="1.2K" img="https://i.pravatar.cc/150?u=12" color="bg-yellow-500" />
                            <AnalystRowMini rank={2} name="Bayo Economics" accuracy={88.2} followers="863" img="https://i.pravatar.cc/150?u=15" color="bg-slate-300" />
                            <AnalystRowMini rank={3} name="Naija Sports Hub" accuracy={85.7} followers="1.6K" img="https://i.pravatar.cc/150?u=18" color="bg-orange-600" />
                        </div>
                    </div>

                    <div className="relative p-12 rounded-[56px] bg-[#020617] border border-primary/20 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] group active-press">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[150px]" />
                        <div className="relative z-10 space-y-8 text-left">
                            <div className="w-16 h-16 rounded-[24px] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-glow group-hover:scale-110 transition-transform duration-700">
                                <Cpu size={32}/>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white">Join the Protocol.</h4>
                                <p className="text-lg text-slate-400 font-medium italic leading-relaxed">Establish your analytical signature and earn node reputation.</p>
                            </div>
                            <Button className="w-full !rounded-[28px] !py-10 text-lg font-black uppercase tracking-[0.2em] italic group active-press">
                                Initialize Forecast <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform w-6 h-6" />
                            </Button>
                        </div>
                        <div className="absolute bottom-[-40px] right-[-40px] opacity-10 scale-150 rotate-12 group-hover:rotate-[30deg] transition-transform duration-1000">
                             <MessageSquare size={200} className="text-primary" />
                        </div>
                    </div>
                </aside>
            </section>

            {/* TRUSTED BY PROBIX PARTNERS */}
            <section className="w-full bg-[#010206] py-32 border-t border-white/5">
                <div className="max-w-[1600px] mx-auto px-16 space-y-20">
                    <div className="flex items-center gap-6 px-4">
                        <div className="h-px flex-1 bg-white/5" />
                        <p className="text-xs font-black uppercase tracking-[0.8em] opacity-20 text-center italic leading-none">Trusted by institutional thinkers across Africa</p>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-20 px-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
                        {['Flutterwave', 'Paystack', 'Big Cabal Media', 'Chipper', 'Cowrywise', 'Andela'].map(name => (
                            <span key={name} className="text-[44px] font-black italic tracking-tighter uppercase opacity-50 hover:opacity-100 transition-all cursor-pointer text-white hover:drop-shadow-glow">{name}</span>
                        ))}
                    </div>
                </div>
            </section>
          </motion.main>
        )}

        {/* --- VIEW: AUTH (Elite Pro Max) --- */}
        {view === 'auth' && (
          <motion.section key="auth" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="min-h-screen flex items-center justify-center p-12 pt-32 bg-[#010206]">
            <div className="w-full max-w-[560px] p-24 glass rounded-[72px] border border-white/10 shadow-[0_60px_150px_rgba(0,0,0,0.8)] text-left relative overflow-hidden bg-white/[0.01]">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[150px]" />
              <div className="relative z-10 flex flex-col items-center text-center mb-16 space-y-12">
                 <div className="active-press transition-transform duration-1000 hover:rotate-[360deg]">
                    <ProbixLogo size="md" />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-8xl font-black italic tracking-tighter uppercase text-white leading-none">Authorize</h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-8 bg-primary/40" />
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[1em] italic leading-none opacity-60">Security Node 2.4.0</p>
                        <div className="h-px w-8 bg-primary/40" />
                    </div>
                 </div>
              </div>
              <div className="space-y-12 relative z-10">
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] ml-6 italic opacity-60 leading-none">Oracle Signature</label>
                    <div className="relative group">
                        <User className="absolute left-8 top-1/2 -translate-y-1/2 text-primary opacity-40 group-focus-within:opacity-100 transition-all duration-700" size={28}/>
                        <input type="text" placeholder="Username or analytical handle" className="w-full bg-white/[0.03] border border-white/10 rounded-[36px] py-10 pl-24 pr-12 outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-700 font-black italic text-3xl placeholder:opacity-10 text-white shadow-inner" />
                    </div>
                </div>
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] ml-6 italic opacity-60 leading-none">Secure Key</label>
                    <div className="relative group">
                        <Lock className="absolute left-8 top-1/2 -translate-y-1/2 text-primary opacity-40 group-focus-within:opacity-100 transition-all duration-700" size={28}/>
                        <input type="password" placeholder="••••••••••••••••" className="w-full bg-white/[0.03] border border-white/10 rounded-[36px] py-10 pl-24 pr-12 outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-700 font-black italic text-3xl placeholder:opacity-10 text-white shadow-inner" />
                    </div>
                </div>
                <Button className="w-full !py-12 text-5xl !rounded-[48px] font-black italic uppercase tracking-[0.2em] shadow-[0_30px_100px_oklch(65%_0.22_250_/_40%)] mt-8 active-press" onClick={() => {
                    toast.success("Authenticating Node Signature...");
                    setTimeout(() => { login(); router.push('/dashboard'); }, 1500);
                }}>
                  {authMode === 'login' ? 'Seal Session' : 'Access Hub'}
                </Button>

                <div className="relative py-12 flex items-center">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="px-10 text-[10px] font-black text-slate-500 uppercase tracking-[1em] whitespace-nowrap opacity-40 italic">Sync Protocol</span>
                    <div className="flex-1 h-px bg-white/5" />
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <Button variant="secondary" className="!rounded-[32px] !py-10 glass italic font-black text-sm tracking-[0.3em] uppercase hover:bg-primary/10 transition-all border-white/5 active-press shadow-2xl group">
                        <Globe size={18} className="mr-3 opacity-40 group-hover:text-primary transition-all"/> Cloud Node
                    </Button>
                    <Button variant="secondary" className="!rounded-[32px] !py-10 glass italic font-black text-sm tracking-[0.3em] uppercase hover:bg-fuchsia/10 transition-all border-white/5 active-press shadow-2xl group">
                        <ShieldCheck size={18} className="mr-3 opacity-40 group-hover:text-fuchsia transition-all"/> Meta Vault
                    </Button>
                </div>
              </div>

              <p className="text-center mt-20 text-xl font-bold text-slate-500 italic">
                {authMode === 'login' ? "Node handle not detected? " : "Signature verified? "}
                <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-primary hover:underline font-black ml-4 uppercase tracking-tighter text-3xl active-press transition-all">
                  {authMode === 'login' ? 'Establish' : 'Authorize'}
                </button>
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- ELITE PRO MAX SUB-COMPONENTS ---

function StatsCard({ icon, title, label, trend, color }: any) {
    return (
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          className="glass p-12 rounded-[56px] border-white/5 flex flex-col gap-10 bg-white/[0.01] hover:bg-white/[0.03] transition-all group cursor-default shadow-[0_20px_60px_rgba(0,0,0,0.3)] min-h-[280px] justify-between relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] -z-0 rounded-bl-[100px]" />
            <div className={`w-20 h-20 rounded-[32px] bg-white/[0.03] flex items-center justify-center ${color} shadow-2xl group-hover:scale-110 transition-transform duration-700 border border-white/5 group-hover:border-primary/20 relative z-10`}>{icon}</div>
            <div className="text-left space-y-4 relative z-10 pl-2">
                <div className="flex flex-col space-y-1">
                    <span className="text-6xl font-black italic tracking-tighter tabular leading-none text-white">{title}</span>
                    <span className="text-xs font-black uppercase tracking-[0.5em] opacity-30 italic leading-none pt-2">{label}</span>
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
        <div className="flex items-center justify-between group cursor-pointer active-press hover:bg-white/[0.02] p-4 rounded-[32px] transition-all border border-transparent hover:border-white/5">
            <div className="flex items-center gap-8">
                <div className="relative">
                    <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-xl ${color} text-[#010206] text-sm font-black flex items-center justify-center shadow-2xl z-10 italic border-4 border-[#010206]`}>{rank}</div>
                    <img src={img} className="w-16 h-16 rounded-[24px] object-cover border-2 border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl" alt={name} />
                </div>
                <div className="text-left space-y-1">
                    <p className="text-xl font-black italic uppercase tracking-tight text-white group-hover:text-primary transition-colors leading-none">{name} <CheckCircle2 className="inline ml-2 text-primary opacity-40 group-hover:opacity-100" size={16}/></p>
                    <div className="flex items-center gap-4">
                        <p className="text-[11px] font-bold text-secondary uppercase italic opacity-60 tabular">{accuracy}% Accuracy</p>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest tabular">{followers} Followers</p>
                    </div>
                </div>
            </div>
            <button className="bg-primary/10 text-primary border border-primary/20 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-glow active-press">Synchronize</button>
        </div>
    );
}
