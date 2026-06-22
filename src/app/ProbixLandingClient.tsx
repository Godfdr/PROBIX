"use client";

import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue
} from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Lock,
  User,
  CirclePlay,
  ChevronRight
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { ProbixLogo } from '@/components/ui/ProbixLogo';
import { useRouter } from 'next/navigation';
import { useProbix } from '@/store/ProbixContext';
import { GlassBadge, PulseNode } from '@/components/dashboard/DashboardComponents';

export default function ProbixLandingClient() {
  const [view, setView] = useState<'landing' | 'onboarding' | 'auth'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();
  const { login, isAuthenticated } = useProbix();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (mounted && isAuthenticated) router.push('/dashboard');
  }, [isAuthenticated, router, mounted]);

  // --- 3D MOTION SENSOR ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  if (!mounted) return null;

  const easeOut = [0.23, 1, 0.32, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-x-hidden selection:bg-primary/40 bg-probix-bg transition-colors duration-1000"
    >

      {/* PERSISTENT NAV */}
      <nav className="fixed top-0 w-full z-[100] px-12 h-24 flex justify-between items-center glass border-b border-probix-border backdrop-blur-3xl">
        <div className="flex items-center gap-4 cursor-pointer group active-press" onClick={() => setView('landing')}>
          <ProbixLogo size="sm" />
          <span className="font-black text-2xl tracking-tighter italic text-probix-text dark:text-white">PROBIX</span>
        </div>

        <div className="flex items-center gap-10">
          <ThemeToggle />
          <button className="text-xs font-black uppercase tracking-widest italic hover:text-primary transition-colors active-press text-probix-text dark:text-white" onClick={() => { setAuthMode('login'); setView('auth'); }}>Log In</button>
          <Button className="!rounded-2xl !px-12 !py-6 shadow-glow text-xs font-black uppercase tracking-widest active-press" onClick={() => setView('onboarding')}>Get Started</Button>
        </div>
      </nav>

      <AnimatePresence mode="wait">

        {/* --- VIEW: LANDING --- */}
        {view === 'landing' && (
          <motion.section
            key="landing"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative min-h-screen flex flex-col items-center justify-center pt-24"
          >
            {/* AFRICA MAP BACKGROUND */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40 dark:opacity-30">
                <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-end pr-10">
                    <svg viewBox="0 0 1000 1000" className="w-[850px] h-[850px] text-primary/10 dark:text-primary/20 fill-current overflow-visible">
                        <path d="M400,100 L450,100 L500,120 L550,150 L580,200 L600,250 L620,300 L650,320 L700,320 L750,350 L800,400 L820,450 L800,500 L750,600 L700,700 L650,800 L600,850 L550,900 L500,920 L450,900 L400,850 L350,750 L320,650 L300,550 L280,450 L250,400 L250,350 L280,300 L320,250 L350,200 Z" className="animate-pulse" style={{ strokeDasharray: '4 4', stroke: 'currentColor', fill: 'none', strokeWidth: 1 }} />
                        <motion.path d="M500,400 Q700,400 800,450" stroke="url(#line-grad)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
                        <motion.path d="M400,200 Q500,300 500,400" stroke="url(#line-grad)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }} />
                        <defs>
                            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="oklch(65% 0.2 250)" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <PulseNode top="20%" left="45%" color="bg-secondary" />
                    <PulseNode top="35%" left="58%" color="bg-fuchsia" />
                    <PulseNode top="65%" left="52%" color="bg-accent" />
                    <PulseNode top="42%" left="78%" color="bg-primary" />
                </div>
            </div>

            <div className="w-full max-w-7xl px-12 z-10 flex flex-col items-start text-left relative">
                <div className="max-w-3xl space-y-12">
                    <motion.div variants={itemVariants} className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary bg-primary/10 px-6 py-2 rounded-full border border-primary/20 italic">Global Prediction Terminal</span>
                        <div className="h-px flex-1 bg-probix-border dark:bg-white/5" />
                      </div>
                      <h1 className="text-8xl md:text-9xl font-light italic tracking-tighter leading-[0.8] text-probix-text dark:text-white uppercase">
                        The future<br />isn&apos;t guessed.<br /> <span className="font-black text-primary drop-shadow-glow">forecasted.</span>
                      </h1>
                    </motion.div>

                    <motion.p
                      variants={itemVariants}
                      className="text-2xl md:text-3xl text-probix-muted font-medium max-w-xl italic opacity-80 leading-relaxed"
                    >
                      Join 42,831 Africans using institutional-grade data to predict what matters most.
                    </motion.p>

                    <motion.div
                      variants={itemVariants}
                      className="flex flex-wrap items-center gap-8 pt-6"
                    >
                      <Button size="lg" className="!rounded-full !px-14 !py-8 text-xl font-black uppercase italic shadow-glow group active-press" onClick={() => setView('onboarding')}>
                        Explore Discovery <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform w-6 h-6" />
                      </Button>
                      <button className="flex items-center gap-4 px-10 py-6 rounded-full border border-probix-border dark:border-white/10 hover:border-primary/40 bg-probix-surface/40 dark:bg-white/5 transition-all group/play active-press shadow-xl backdrop-blur-md">
                        <div className="w-12 h-12 rounded-full border border-probix-border dark:border-white/20 flex items-center justify-center group-hover/play:border-primary transition-colors bg-probix-bg dark:bg-white/5 shadow-inner">
                            <CirclePlay size={24} className="text-probix-text dark:text-white group-hover/play:text-primary transition-colors" />
                        </div>
                        <span className="text-base font-black uppercase italic tracking-widest text-probix-text dark:text-white">Terminal Tutorial</span>
                      </button>
                    </motion.div>
                </div>

                {/* Floating Highlight Cards (Staggered Entry) */}
                <motion.div variants={itemVariants} className="absolute top-[0%] right-[22%] hidden 2xl:block active-press">
                    <GlassBadge icon={<TrendingUp size={16} className="text-secondary" />} color="border-secondary/50" text="Inflation < 18%" stat="72% Yes" statColor="text-secondary" />
                </motion.div>
                <motion.div variants={itemVariants} className="absolute top-[28%] right-[38%] hidden 2xl:block active-press">
                    <GlassBadge icon={<Zap size={16} className="text-fuchsia" />} color="border-fuchsia/50" text="AFCON 2027 Morocco" stat="65% Yes" statColor="text-fuchsia" />
                </motion.div>
                <motion.div variants={itemVariants} className="absolute bottom-[18%] right-[30%] hidden 2xl:block active-press">
                    <GlassBadge icon={<TrendingUp size={16} className="text-accent" />} color="border-accent/50" text="Dangote Refinery Profitable?" stat="55% Yes" statColor="text-accent" />
                </motion.div>
                <motion.div variants={itemVariants} className="absolute top-[42%] right-[8%] hidden 2xl:block active-press">
                    <GlassBadge icon={<ArrowRight size={16} className="text-primary" />} color="border-primary/50" text="Naira < ₦1,400/$" stat="68% Yes" statColor="text-primary" />
                </motion.div>
            </div>

            {/* TRENDING TICKER */}
            <motion.div
              variants={itemVariants}
              className="w-full overflow-hidden bg-probix-surface/40 dark:bg-white/[0.02] border-y border-probix-border dark:border-white/5 py-10 mt-32 backdrop-blur-sm"
            >
                <div className="flex animate-scroll whitespace-nowrap gap-32 items-center">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex items-center gap-8 shrink-0 group cursor-pointer active-press tabular">
                            <span className="text-4xl grayscale group-hover:grayscale-0 transition-all duration-700">{['🇳🇬', '⚽', '🏛️', '🚀', '📈', '₿'][i-1]}</span>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-probix-muted group-hover:text-primary transition-colors italic leading-none">
                                  {['Naira Stability', 'Super Eagles Qualify', '2027 Election Polls', 'Flutterwave IPO', 'Global Tech Drift', 'Bitcoin Node'][i-1]}
                              </span>
                              <span className="text-secondary font-black italic text-xl mt-1 leading-none">{(60 + i * 5)}% YES</span>
                            </div>
                        </div>
                    ))}
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={`dup-${i}`} className="flex items-center gap-8 shrink-0 group cursor-pointer active-press tabular">
                            <span className="text-4xl grayscale group-hover:grayscale-0 transition-all duration-700">{['🇳🇬', '⚽', '🏛️', '🚀', '📈', '₿'][i-1]}</span>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-probix-muted group-hover:text-primary transition-colors italic leading-none">
                                  {['Naira Stability', 'Super Eagles Qualify', '2027 Election Polls', 'Flutterwave IPO', 'Global Tech Drift', 'Bitcoin Node'][i-1]}
                              </span>
                              <span className="text-secondary font-black italic text-xl mt-1 leading-none">{(60 + i * 5)}% YES</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="h-20" />
          </motion.section>
        )}

        {/* --- VIEW: ONBOARDING --- */}
        {view === 'onboarding' && (
          <OnboardingView onComplete={() => setView('auth')} />
        )}

        {/* --- VIEW: AUTH --- */}
        {view === 'auth' && (
          <AuthView
            mode={authMode}
            toggleMode={() => setAuthMode(m => m === 'login' ? 'signup' : 'login')}
            onComplete={() => {
              login();
              router.push('/dashboard');
            }}
          />
        )}

      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function OnboardingView({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Trade on Outcomes.", desc: "Use your local expertise to predict the future of sports, politics, and economics.", icon: <TrendingUp size={56} className="text-primary" /> },
    { title: "Instant Settlement.", desc: "Fast, secure payouts on the Base network. Direct withdrawals to your Naira bridge.", icon: <Shield size={56} className="text-secondary" /> },
    { title: "African Accuracy.", desc: "Access the most precise prediction engine in Africa. Institutional-grade data.", icon: <Zap size={56} className="text-accent" /> }
  ];

  const easeOut = [0.23, 1, 0.32, 1];

  return (
    <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8, ease: easeOut }} className="min-h-screen flex items-center justify-center p-12 bg-probix-bg transition-colors duration-1000">
      <div className="max-w-7xl w-full glass rounded-[80px] p-24 flex flex-col lg:flex-row gap-20 items-center shadow-3xl dark:shadow-[0_0_150px_rgba(0,0,0,1)] relative overflow-hidden border-kinpaku-gold/10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] -z-0" />
        <div className="flex-1 space-y-12 relative z-10 text-left">
          <motion.div key={step} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: easeOut }} className="space-y-10">
            <div className="inline-block p-10 rounded-[48px] bg-probix-bg dark:bg-lacquer-black border border-probix-border dark:border-white/10 shadow-2xl active-press transition-all hover:border-primary/40">{steps[step].icon}</div>
            <h2 className="text-8xl font-black italic tracking-tighter leading-[0.85] text-probix-text dark:text-white uppercase">{steps[step].title}</h2>
            <p className="text-3xl text-probix-muted font-medium italic leading-relaxed opacity-80 max-w-xl">{steps[step].desc}</p>
          </motion.div>
          <div className="flex gap-10 pt-10">
            <Button size="lg" className="flex-1 !rounded-[40px] !py-12 text-4xl uppercase italic font-black shadow-glow active-press shadow-primary/30" onClick={() => step < 2 ? setStep(s => s + 1) : onComplete()}>
              {step < 2 ? "Continue" : "Initialize Terminal"}
            </Button>
            <Button size="lg" variant="secondary" className="px-20 !rounded-[40px] glass !py-12 text-4xl uppercase italic font-black active-press hover:bg-white/10" onClick={onComplete}>Skip</Button>
          </div>
          <div className="flex gap-4 mt-12">
             {steps.map((_, i) => <div key={i} className={`h-2.5 rounded-full transition-all duration-1000 ${i === step ? "w-24 bg-primary shadow-glow" : "w-8 bg-probix-border dark:bg-white/10"}`} />)}
          </div>
        </div>
        <div className="hidden lg:flex flex-1 justify-center relative">
          <div className="w-[650px] h-[650px] relative">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[2px] border-dashed border-primary/20 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: easeOut }} className="w-80 h-80 bg-probix-surface dark:bg-raised-lacquer rounded-[72px] border border-probix-border dark:border-white/10 shadow-3xl flex items-center justify-center z-10 shadow-primary/20 active-press">
                  <ProbixLogo size="lg" />
               </motion.div>
               <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-[180px] -z-0" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface AuthViewProps {
  mode: 'login' | 'signup';
  toggleMode: () => void;
  onComplete: () => void;
}

function AuthView({ mode, toggleMode, onComplete }: AuthViewProps) {
  const easeOut = [0.23, 1, 0.32, 1];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8, ease: easeOut }} className="min-h-screen flex items-center justify-center p-12 bg-probix-bg transition-colors duration-1000">
      <div className="max-w-[540px] w-full glass rounded-[64px] p-24 border border-probix-border dark:border-white/10 shadow-3xl dark:shadow-[0_0_150px_rgba(0,0,0,1)] relative overflow-hidden bg-probix-surface/40 dark:bg-lacquer-black/60">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 blur-[120px] -z-0" />

        <div className="text-center mb-16 relative z-10 flex flex-col items-center space-y-10">
          <div className="active-press transition-transform duration-1000 hover:rotate-12">
            <ProbixLogo size="md" />
          </div>
          <div className="space-y-3">
            <h2 className="text-7xl font-black italic tracking-tighter leading-none text-probix-text dark:text-white uppercase">{mode === 'login' ? 'Authorize' : 'Initialize'}</h2>
            <p className="text-[11px] font-black text-probix-muted uppercase tracking-[0.8em] italic opacity-60">Terminal Session 2.4.0</p>
          </div>
        </div>

        <div className="space-y-10 relative z-10 text-left">
          <div className="space-y-4 px-2">
            <label className="text-[11px] font-black text-probix-muted uppercase tracking-[0.5em] ml-4 italic opacity-60">Signature handle</label>
            <div className="relative group">
               <User className="absolute left-8 top-1/2 -translate-y-1/2 text-primary opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all duration-500" size={24}/>
               <input
                  type="text"
                  placeholder="Username or Oracle ID"
                  className="w-full bg-probix-bg/50 dark:bg-lacquer-black/40 border border-probix-border dark:border-white/10 rounded-[32px] py-8 pl-20 pr-10 outline-none focus:border-primary/50 focus:bg-probix-bg dark:focus:bg-lacquer-black transition-all duration-500 font-black italic text-2xl placeholder:opacity-10 text-probix-text dark:text-white shadow-inner"
               />
            </div>
          </div>
          <div className="space-y-4 px-2">
            <label className="text-[11px] font-black text-probix-muted uppercase tracking-[0.5em] ml-4 italic opacity-60">Security Signature</label>
            <div className="relative group">
               <Lock className="absolute left-8 top-1/2 -translate-y-1/2 text-primary opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all duration-500" size={24}/>
               <input
                  type="password"
                  placeholder="••••••••••••••••"
                  className="w-full bg-probix-bg/50 dark:bg-lacquer-black/40 border border-probix-border dark:border-white/10 rounded-[32px] py-8 pl-20 pr-10 outline-none focus:border-primary/50 focus:bg-probix-bg dark:focus:bg-lacquer-black transition-all duration-500 font-black italic text-2xl placeholder:opacity-10 text-probix-text dark:text-white shadow-inner"
               />
            </div>
          </div>

          <Button size="lg" className="w-full !py-10 text-4xl mt-12 !rounded-[40px] italic font-black tracking-[0.2em] shadow-glow active-press shadow-primary/40 uppercase" onClick={() => {
            toast.success("Authenticating Node Signature...");
            setTimeout(onComplete, 1200);
          }}>
            {mode === 'login' ? 'Establish Session' : 'Access Node'}
          </Button>

          <div className="relative py-12 flex items-center">
            <div className="flex-1 h-px bg-probix-border dark:bg-white/10" />
            <span className="px-10 text-[10px] font-black text-probix-muted uppercase tracking-[0.8em] whitespace-nowrap opacity-40 italic">Sync Account</span>
            <div className="flex-1 h-px bg-probix-border dark:bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-6">
             <Button variant="secondary" className="!rounded-[28px] !py-8 glass italic font-black text-xs tracking-[0.2em] uppercase hover:bg-primary/10 transition-all border-probix-border dark:border-white/5 active-press">Veltra Wallet</Button>
             <Button variant="secondary" className="!rounded-[28px] !py-8 glass italic font-black text-xs tracking-[0.2em] uppercase hover:bg-fuchsia/10 transition-all border-probix-border dark:border-white/5 active-press">Google Node</Button>
          </div>
        </div>

        <p className="text-center mt-16 text-sm font-bold text-probix-muted italic">
          {mode === 'login' ? "Protocol handle not found? " : "Access established? "}
          <button onClick={toggleMode} className="text-primary hover:underline italic font-black ml-4 uppercase tracking-tighter text-lg active-press">
            {mode === 'login' ? 'Initialize' : 'Authorize'}
          </button>
        </p>
      </div>
    </motion.div>
  );
}
