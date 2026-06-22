"use client";

import React, { useState, useRef, useEffect } from 'react';
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
  CirclePlay
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { ProbixLogo } from '@/components/ui/ProbixLogo';
import { useRouter } from 'next/navigation';
import { useProbix } from '@/store/ProbixContext';
import { GlassBadge, PulseNode } from '@/components/dashboard/DashboardComponents';

export default function ProbixLanding() {
  const [view, setView] = useState<'landing' | 'onboarding' | 'auth'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();
  const { login, isAuthenticated } = useProbix();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
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

  if (!mounted) return null;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-x-hidden selection:bg-primary/40 bg-probix-bg transition-colors duration-1000"
    >

      {/* PERSISTENT NAV */}
      <nav className="fixed top-0 w-full z-[100] px-8 h-20 flex justify-between items-center bg-probix-bg/80 backdrop-blur-md border-b border-probix-border">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('landing')}>
          <ProbixLogo size="sm" />
          <span className="font-black text-xl tracking-tighter italic">PROBIX</span>
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle />
          <button className="text-xs font-black uppercase tracking-widest italic hover:text-primary transition-colors" onClick={() => { setAuthMode('login'); setView('auth'); }}>Log In</button>
          <Button className="!rounded-xl !px-8 !py-4 shadow-glow text-xs font-black uppercase tracking-widest" onClick={() => setView('onboarding')}>Get Started</Button>
        </div>
      </nav>

      <AnimatePresence mode="wait">

        {/* --- VIEW: LANDING --- */}
        {view === 'landing' && (
          <motion.section
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative min-h-screen flex flex-col items-center justify-center pt-20"
          >
            {/* AFRICA MAP BACKGROUND */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-end pr-10">
                    <svg viewBox="0 0 1000 1000" className="w-[800px] h-[800px] text-primary/40 fill-current overflow-visible">
                        <path d="M400,100 L450,100 L500,120 L550,150 L580,200 L600,250 L620,300 L650,320 L700,320 L750,350 L800,400 L820,450 L800,500 L750,600 L700,700 L650,800 L600,850 L550,900 L500,920 L450,900 L400,850 L350,750 L320,650 L300,550 L280,450 L250,400 L250,350 L280,300 L320,250 L350,200 Z" className="animate-pulse" style={{ strokeDasharray: '4 4', stroke: 'currentColor', fill: 'none', strokeWidth: 1 }} />
                        <motion.path d="M500,400 Q700,400 800,450" stroke="url(#line-grad)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity }} />
                        <motion.path d="M400,200 Q500,300 500,400" stroke="url(#line-grad)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, repeat: Infinity }} />
                        <defs>
                            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="#3B82F6" />
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
                <div className="max-w-2xl">
                    <motion.h1
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 italic text-probix-text dark:text-white uppercase"
                    >
                      The future<br />isn&apos;t guessed.<br />It&apos;s <span className="text-primary drop-shadow-glow">forecasted.</span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg md:text-xl text-probix-muted font-bold mb-10 italic opacity-80"
                    >
                      Join 42,831 Africans forecasting what matters most.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap items-center gap-4 mb-16"
                    >
                      <Button size="lg" className="!rounded-full !px-8 !py-5 text-base font-black uppercase italic shadow-glow group" onClick={() => setView('onboarding')}>
                        Explore trending <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                      </Button>
                      <button className="flex items-center gap-3 px-6 py-4 rounded-full border border-probix-border dark:border-white/10 hover:border-primary/40 bg-probix-surface dark:bg-white/5 transition-all group/play">
                        <div className="w-6 h-6 rounded-full border border-probix-border dark:border-white/20 flex items-center justify-center group-hover/play:border-primary transition-colors">
                            <CirclePlay size={12} className="text-probix-text dark:text-white group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-xs font-black uppercase italic tracking-widest text-probix-text dark:text-white group-hover:text-primary transition-colors">How Probix works</span>
                      </button>
                    </motion.div>
                </div>

                <div className="absolute top-[-5%] right-[25%] hidden lg:block">
                    <GlassBadge icon={<TrendingUp size={16} className="text-secondary" />} color="border-secondary/50" text="Inflation < 18%" stat="72% Yes" statColor="text-secondary" />
                </div>
                <div className="absolute top-[25%] right-[40%] hidden lg:block">
                    <GlassBadge icon={<Zap size={16} className="text-fuchsia" />} color="border-fuchsia/50" text="AFCON 2027 Morocco" stat="65% Yes" statColor="text-fuchsia" />
                </div>
                <div className="absolute bottom-[20%] right-[32%] hidden lg:block">
                    <GlassBadge icon={<TrendingUp size={16} className="text-accent" />} color="border-accent/50" text="Dangote Refinery Profitable?" stat="55% Yes" statColor="text-accent" />
                </div>
                <div className="absolute top-[40%] right-[10%] hidden lg:block">
                    <GlassBadge icon={<TrendingUp size={16} className="text-secondary" />} color="border-secondary/50" text="Naira < ₦2,000/$" stat="68% Yes" statColor="text-secondary" />
                </div>
            </div>

            {/* TRENDING TICKER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full overflow-hidden bg-probix-surface border-y border-probix-border py-6 mb-20"
            >
                <div className="flex animate-scroll whitespace-nowrap gap-16 items-center">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex items-center gap-4 shrink-0 group cursor-pointer">
                            <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{['🇳🇬', '⚽', '🏛️', '🚀', '📈', '₿'][i-1]}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-probix-muted group-hover:text-primary transition-colors">
                                {['Naira Stability', 'Super Eagles Qualify', '2027 Election Polls', 'Flutterwave IPO', 'Global Tech Drift', 'Bitcoin Node'][i-1]}
                            </span>
                            <span className="text-secondary font-black italic">{(60 + i * 5)}% YES</span>
                        </div>
                    ))}
                    {/* Repeat for animation */}
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={`dup-${i}`} className="flex items-center gap-4 shrink-0 group cursor-pointer">
                            <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{['🇳🇬', '⚽', '🏛️', '🚀', '📈', '₿'][i-1]}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-probix-muted group-hover:text-primary transition-colors">
                                {['Naira Stability', 'Super Eagles Qualify', '2027 Election Polls', 'Flutterwave IPO', 'Global Tech Drift', 'Bitcoin Node'][i-1]}
                            </span>
                            <span className="text-secondary font-black italic">{(60 + i * 5)}% YES</span>
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
    { title: "Trade on Outcomes.", desc: "Use your local expertise to predict the future of sports, politics, and economics.", icon: <TrendingUp size={40} className="text-primary" /> },
    { title: "Instant Settlement.", desc: "Fast, secure payouts on the Base network. Direct withdrawals to your Naira bridge.", icon: <Shield size={40} className="text-secondary" /> },
    { title: "African Accuracy.", desc: "Access the most precise prediction engine in Africa. Institutional-grade data.", icon: <Zap size={40} className="text-accent" /> }
  ];

  return (
    <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen flex items-center justify-center p-8 bg-probix-bg">
      <div className="max-w-5xl w-full glass rounded-[48px] p-16 flex flex-col lg:flex-row gap-12 items-center shadow-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[100px]" />
        <div className="flex-1 space-y-8 relative z-10 text-left">
          <motion.div key={step} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="inline-block p-5 rounded-2xl bg-primary/10 border border-primary/20 shadow-inner mb-4">{steps[step].icon}</div>
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-[0.9] text-probix-text uppercase">{steps[step].title}</h2>
            <p className="text-xl text-probix-muted font-bold italic leading-relaxed opacity-80 max-w-md">{steps[step].desc}</p>
          </motion.div>
          <div className="flex gap-6 pt-6">
            <Button size="lg" className="flex-1 !rounded-2xl !py-6 text-xl uppercase italic font-black shadow-glow active:scale-95 shadow-primary/30" onClick={() => step < 2 ? setStep(s => s + 1) : onComplete()}>
              {step < 2 ? "Continue" : "Get Started"}
            </Button>
            <Button size="lg" variant="secondary" className="px-10 !rounded-2xl glass !py-6 text-xl uppercase italic font-black active:scale-95">Skip</Button>
          </div>
          <div className="flex gap-2 mt-8">
             {steps.map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${i === step ? "w-16 bg-primary shadow-glow" : "w-4 bg-probix-border"}`} />)}
          </div>
        </div>
        <div className="hidden lg:flex flex-1 justify-center relative">
          <div className="w-[400px] h-[400px] relative">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[2px] border-dashed border-primary/20 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }} className="w-48 h-48 bg-probix-surface rounded-[40px] border border-probix-border dark:border-white/10 shadow-3xl flex items-center justify-center z-10">
                  <ProbixLogo size="lg" />
               </motion.div>
               <div className="absolute w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] -z-0" />
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
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen flex items-center justify-center p-6 bg-probix-bg">
      <div className="max-w-[440px] w-full glass rounded-[40px] p-12 border-probix-border dark:border-white/10 shadow-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] -z-0" />

        <div className="text-center mb-10 relative z-10 flex flex-col items-center">
          <ProbixLogo size="md" />
          <h2 className="text-4xl font-black italic tracking-tighter mb-4 mt-8 leading-none text-probix-text uppercase">
            {mode === 'login' ? 'Authorize' : 'Initialize'}
          </h2>
          <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.4em] italic opacity-60">Terminal Session 2.4.0</p>
        </div>

        <div className="space-y-5 relative z-10 text-left">
          <div className="space-y-1.5 px-1">
            <label className="text-[9px] font-black text-probix-muted uppercase tracking-[0.3em] ml-2">Protocol handle</label>
            <div className="relative group">
               <User className="absolute left-5 top-1/2 -translate-y-1/2 text-primary opacity-50 group-focus-within:opacity-100 transition-all" size={16}/>
               <input
                  type="text"
                  placeholder="Username or Veltra ID"
                  className="w-full bg-probix-surface/50 border border-probix-border rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-primary/50 focus:bg-probix-surface transition-all font-bold italic text-base placeholder:opacity-20 text-probix-text shadow-inner"
               />
            </div>
          </div>
          <div className="space-y-1.5 px-1">
            <label className="text-[9px] font-black text-probix-muted uppercase tracking-[0.3em] ml-2">Security Key</label>
            <div className="relative group">
               <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary opacity-50 group-focus-within:opacity-100 transition-all" size={16}/>
               <input
                  type="password"
                  placeholder="••••••••••••••••"
                  className="w-full bg-probix-surface/50 border border-probix-border rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-primary/50 focus:bg-probix-surface transition-all font-bold italic text-base placeholder:opacity-20 text-probix-text shadow-inner"
               />
            </div>
          </div>

          <Button size="lg" className="w-full !py-6 text-xl mt-6 !rounded-[24px] italic font-black tracking-[0.2em] shadow-glow active:scale-95 shadow-primary/40 uppercase" onClick={onComplete}>
            {mode === 'login' ? 'Establish Session' : 'Access Node'}
          </Button>

          <div className="relative py-6 flex items-center">
            <div className="flex-1 h-px bg-probix-border" />
            <span className="px-4 text-[8px] font-black text-probix-muted uppercase tracking-[0.4em] whitespace-nowrap opacity-60">OR SYNC ACCOUNT</span>
            <div className="flex-1 h-px bg-probix-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <Button variant="secondary" className="!rounded-xl !py-4 glass italic font-black text-[9px] tracking-[0.1em] uppercase hover:bg-primary/10 transition-all border-probix-border dark:border-white/5">Veltra Wallet</Button>
             <Button variant="secondary" className="!rounded-xl !py-4 glass italic font-black text-[9px] tracking-[0.1em] uppercase hover:bg-fuchsia/10 transition-all border-probix-border dark:border-white/5">Google Node</Button>
          </div>
        </div>

        <p className="text-center mt-10 text-sm font-bold text-probix-muted italic">
          {mode === 'login' ? "Protocol handle not found? " : "Access established? "}
          <button onClick={toggleMode} className="text-primary hover:underline italic font-black ml-1 uppercase tracking-tighter text-base">
            {mode === 'login' ? 'Initialize' : 'Authorize'}
          </button>
        </p>
      </div>
    </motion.div>
  );
}
