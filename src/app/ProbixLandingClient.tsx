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
  ChevronRight,
  Award,
  Globe,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { ProbixLogo } from '@/components/ui/ProbixLogo';
import { useRouter } from 'next/navigation';
import { useProbix } from '@/store/ProbixContext';
import { GlassBadge, PulseNode } from '@/components/dashboard/DashboardComponents';
import { toast } from 'sonner';

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-x-hidden selection:bg-primary/40 bg-probix-bg transition-colors duration-1000"
    >

      {/* PERSISTENT NAV - High Fidelity Glass */}
      <nav className="fixed top-0 w-full z-[100] px-14 h-28 flex justify-between items-center glass border-b border-probix-border backdrop-blur-3xl transition-all duration-500">
        <div className="flex items-center gap-5 cursor-pointer group active-press" onClick={() => setView('landing')}>
          <ProbixLogo size="sm" />
          <span className="font-black text-3xl tracking-tighter italic text-probix-text dark:text-white transition-all group-hover:tracking-normal">PROBIX</span>
        </div>

        <div className="flex items-center gap-12">
          <ThemeToggle />
          <button className="text-sm font-black uppercase tracking-[0.3em] italic hover:text-primary transition-all active-press text-probix-text dark:text-white" onClick={() => { setAuthMode('login'); setView('auth'); }}>Log In</button>
          <Button className="!rounded-2xl !px-14 !py-8 shadow-glow text-sm font-black uppercase tracking-[0.3em] active-press" onClick={() => setView('onboarding')}>Initialize Terminal</Button>
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
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            className="relative min-h-screen flex flex-col items-center justify-center pt-32"
          >
            {/* AFRICA MAP BACKGROUND - The Depth Core */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40 dark:opacity-30 transition-opacity duration-1000">
                <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-end pr-10">
                    <svg viewBox="0 0 1000 1000" className="w-[900px] h-[900px] text-primary/10 dark:text-primary/20 fill-current overflow-visible">
                        <path d="M400,100 L450,100 L500,120 L550,150 L580,200 L600,250 L620,300 L650,320 L700,320 L750,350 L800,400 L820,450 L800,500 L750,600 L700,700 L650,800 L600,850 L550,900 L500,920 L450,900 L400,850 L350,750 L320,650 L300,550 L280,450 L250,400 L250,350 L280,300 L320,250 L350,200 Z" className="animate-pulse" style={{ strokeDasharray: '4 4', stroke: 'currentColor', fill: 'none', strokeWidth: 1 }} />
                        <motion.path d="M500,400 Q700,400 800,450" stroke="url(#line-grad-landing)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
                        <motion.path d="M400,200 Q500,300 500,400" stroke="url(#line-grad-landing)" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }} />
                        <defs>
                            <linearGradient id="line-grad-landing" x1="0%" y1="0%" x2="100%" y2="0%">
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

            <div className="w-full max-w-7xl px-16 z-10 flex flex-col items-start text-left relative">
                <div className="max-w-4xl space-y-16">
                    <motion.div variants={itemVariants} className="space-y-6">
                      <div className="flex items-center gap-5">
                        <span className="text-[11px] font-black uppercase tracking-[0.8em] text-primary bg-primary/10 px-6 py-2 rounded-full border border-primary/20 italic">Validated Node Protocol</span>
                        <div className="h-px flex-1 bg-probix-border dark:bg-white/5 shadow-sm" />
                      </div>
                      <h1 className="text-9xl md:text-[160px] font-light italic tracking-tighter leading-[0.75] text-probix-text dark:text-white uppercase transition-all duration-1000">
                        The future<br />isn&apos;t guessed.<br /> <span className="font-black text-primary drop-shadow-glow">forecasted.</span>
                      </h1>
                    </motion.div>

                    <motion.p
                      variants={itemVariants}
                      className="text-3xl md:text-4xl text-probix-muted font-medium max-w-2xl italic opacity-80 leading-tight"
                    >
                      Join 42,831 Analysts using local expertise to predict regional economic shifts and global trends.
                    </motion.p>

                    <motion.div
                      variants={itemVariants}
                      className="flex flex-wrap items-center gap-10 pt-10"
                    >
                      <Button size="lg" className="!rounded-full !px-16 !py-10 text-2xl font-black uppercase italic shadow-[0_30px_100px_oklch(65%_0.2_250_/_40%)] group active-press" onClick={() => setView('onboarding')}>
                        Explore Registry <ArrowRight className="ml-5 group-hover:translate-x-3 transition-transform w-8 h-8" />
                      </Button>
                      <button className="flex items-center gap-6 px-12 py-8 rounded-full border border-probix-border dark:border-white/10 hover:border-primary/40 bg-probix-surface/40 dark:bg-white/5 transition-all group/play active-press shadow-2xl backdrop-blur-xl">
                        <div className="w-16 h-16 rounded-full border border-probix-border dark:border-white/20 flex items-center justify-center group-hover/play:border-primary transition-all duration-500 bg-probix-bg dark:bg-white/5 shadow-inner">
                            <CirclePlay size={32} className="text-probix-text dark:text-white group-hover/play:text-primary transition-all duration-700" />
                        </div>
                        <span className="text-lg font-black uppercase italic tracking-widest text-probix-text dark:text-white">Terminal Tutorial</span>
                      </button>
                    </motion.div>
                </div>

                {/* Floating Analytical Nodes (Optical Alignment) */}
                <motion.div variants={itemVariants} className="absolute top-[-5%] right-[20%] hidden 2xl:block active-press transition-transform hover:scale-110">
                    <GlassBadge icon={<TrendingUp size={18} className="text-secondary" />} color="border-secondary/50" text="Inflation < 18%" stat="72% Yes" statColor="text-secondary" />
                </motion.div>
                <motion.div variants={itemVariants} className="absolute top-[25%] right-[35%] hidden 2xl:block active-press transition-transform hover:scale-110">
                    <GlassBadge icon={<Award size={18} className="text-fuchsia" />} color="border-fuchsia/50" text="AFCON 2027 Morocco" stat="65% Yes" statColor="text-fuchsia" />
                </motion.div>
                <motion.div variants={itemVariants} className="absolute bottom-[20%] right-[32%] hidden 2xl:block active-press transition-transform hover:scale-110">
                    <GlassBadge icon={<Activity size={18} className="text-accent" />} color="border-accent/50" text="Dangote Refinery Hub?" stat="55% Yes" statColor="text-accent" />
                </motion.div>
                <motion.div variants={itemVariants} className="absolute top-[45%] right-[5%] hidden 2xl:block active-press transition-transform hover:scale-110">
                    <GlassBadge icon={<Globe size={18} className="text-primary" />} color="border-primary/50" text="Naira < ₦1,400/$" stat="68% Yes" statColor="text-primary" />
                </motion.div>
            </div>

            {/* TRENDING TICKER - Deep Craft Spacing */}
            <motion.div
              variants={itemVariants}
              className="w-full overflow-hidden bg-probix-surface/40 dark:bg-white/[0.02] border-y border-probix-border dark:border-white/10 py-12 mt-40 backdrop-blur-md shadow-2xl"
            >
                <div className="flex animate-scroll whitespace-nowrap gap-40 items-center">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex items-center gap-10 shrink-0 group cursor-pointer active-press tabular transition-all duration-700 hover:scale-105">
                            <span className="text-5xl grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:rotate-12">{['🇳🇬', '⚽', '🏛️', '🚀', '📈', '₿'][i-1]}</span>
                            <div className="flex flex-col space-y-2">
                              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-probix-muted group-hover:text-primary transition-colors italic leading-none opacity-60">
                                  {['Naira Stability', 'Super Eagles Node', '2027 Oracle Polls', 'Fintech IPO Hub', 'Global Tech Drift', 'Bitcoin Protocol'][i-1]}
                              </span>
                              <span className="text-secondary font-black italic text-2xl mt-1 leading-none drop-shadow-glow">{(60 + i * 5)}% YES</span>
                            </div>
                        </div>
                    ))}
                    {/* Duplicate for loop */}
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={`dup-${i}`} className="flex items-center gap-10 shrink-0 group cursor-pointer active-press tabular transition-all duration-700 hover:scale-105">
                            <span className="text-5xl grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:rotate-12">{['🇳🇬', '⚽', '🏛️', '🚀', '📈', '₿'][i-1]}</span>
                            <div className="flex flex-col space-y-2">
                              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-probix-muted group-hover:text-primary transition-colors italic leading-none opacity-60">
                                  {['Naira Stability', 'Super Eagles Node', '2027 Oracle Polls', 'Fintech IPO Hub', 'Global Tech Drift', 'Bitcoin Protocol'][i-1]}
                              </span>
                              <span className="text-secondary font-black italic text-2xl mt-1 leading-none drop-shadow-glow">{(60 + i * 5)}% YES</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="h-28" />
          </motion.section>
        )}

        {/* --- VIEW: ONBOARDING (Production Grade) --- */}
        {view === 'onboarding' && (
          <OnboardingView onComplete={() => {
            toast.success("Terminal Initialized Successfully");
            setView('auth');
          }} />
        )}

        {/* --- VIEW: AUTH (High Density) --- */}
        {view === 'auth' && (
          <AuthView
            mode={authMode}
            toggleMode={() => {
                setAuthMode(m => m === 'login' ? 'signup' : 'login');
                toast.info(`Switching to ${authMode === 'login' ? 'Registration' : 'Authorization'} Node`);
            }}
            onComplete={() => {
              login();
              toast.success("Signature Authenticated", { description: "Session Hub 2.4.0 active." });
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
    { title: "Trade on Outcomes.", desc: "Use your local expertise to predict the future of sports, politics, and regional economics with institutional precision.", icon: <TrendingUp size={64} className="text-primary" /> },
    { title: "Instant Settlement.", desc: "Fast, secure payouts on the Base network. Direct withdrawals to your validated Naira bridge nodes.", icon: <Shield size={64} className="text-secondary" /> },
    { title: "African Accuracy.", desc: "Access the most precise prediction engine in Africa. Powered by decentralized oracle data.", icon: <Zap size={64} className="text-accent" /> }
  ];

  const easeOut = [0.23, 1, 0.32, 1];

  return (
    <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95, x: 50 }} transition={{ duration: 0.8, ease: easeOut }} className="min-h-screen flex items-center justify-center p-12 bg-probix-bg transition-colors duration-1000">
      <div className="max-w-7xl w-full glass rounded-[80px] p-24 flex flex-col lg:flex-row gap-24 items-center shadow-[0_50px_150px_rgba(0,0,0,0.1)] dark:shadow-[0_50px_150px_rgba(0,0,0,1)] relative overflow-hidden border-kinpaku-gold/10">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 blur-[180px] -z-0" />
        <div className="flex-1 space-y-16 relative z-10 text-left">
          <motion.div key={step} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: easeOut }} className="space-y-12">
            <div className="inline-block p-12 rounded-[56px] bg-probix-bg dark:bg-lacquer-black border border-probix-border dark:border-white/10 shadow-3xl active-press transition-all hover:border-primary/50 group">
                <div className="group-hover:scale-125 transition-transform duration-700 group-hover:rotate-6">{steps[step].icon}</div>
            </div>
            <h2 className="text-9xl font-black italic tracking-tighter leading-[0.8] text-probix-text dark:text-white uppercase">{steps[step].title}</h2>
            <p className="text-3xl text-probix-muted font-medium italic leading-relaxed opacity-80 max-w-2xl">{steps[step].desc}</p>
          </motion.div>
          <div className="flex gap-12 pt-10">
            <Button size="lg" className="flex-1 !rounded-[48px] !py-12 text-5xl uppercase italic font-black shadow-[0_20px_80px_oklch(65%_0.2_250_/_30%)] active-press" onClick={() => step < 2 ? setStep(s => s + 1) : onComplete()}>
              {step < 2 ? "Continue" : "Launch Terminal"}
            </Button>
            <Button size="lg" variant="secondary" className="px-24 !rounded-[48px] glass !py-12 text-5xl uppercase italic font-black active-press hover:bg-white/10" onClick={onComplete}>Skip</Button>
          </div>
          <div className="flex gap-5 mt-16 px-2">
             {steps.map((_, i) => <div key={i} className={`h-3 rounded-full transition-all duration-1000 ${i === step ? "w-32 bg-primary shadow-glow" : "w-10 bg-probix-border dark:bg-white/10"}`} />)}
          </div>
        </div>
        <div className="hidden lg:flex flex-1 justify-center relative">
          <div className="w-[700px] h-[700px] relative group/logo">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[3px] border-dashed border-primary/20 rounded-full group-hover/logo:border-primary/40 transition-colors duration-1000" />
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }} transition={{ duration: 10, repeat: Infinity, ease: easeOut }} className="w-96 h-96 bg-probix-surface dark:bg-raised-lacquer rounded-[80px] border border-probix-border dark:border-white/10 shadow-[0_60px_120px_rgba(0,0,0,0.4)] flex items-center justify-center z-10 shadow-primary/20 active-press transition-all hover:scale-110">
                  <ProbixLogo size="lg" />
               </motion.div>
               <div className="absolute w-[600px] h-[600px] bg-primary/20 rounded-full blur-[200px] -z-0 opacity-40 group-hover/logo:opacity-100 transition-opacity duration-1000" />
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
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05, y: -50 }} transition={{ duration: 0.8, ease: easeOut }} className="min-h-screen flex items-center justify-center p-12 bg-probix-bg transition-colors duration-1000">
      <div className="max-w-[580px] w-full glass rounded-[72px] p-28 border border-probix-border dark:border-white/10 shadow-[0_60px_150px_rgba(0,0,0,0.1)] dark:shadow-[0_60px_150px_rgba(0,0,0,1)] relative overflow-hidden bg-probix-surface/60 dark:bg-lacquer-black/80">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 blur-[150px] -z-0" />

        <div className="text-center mb-20 relative z-10 flex flex-col items-center space-y-12">
          <div className="active-press transition-transform duration-1000 hover:rotate-[360deg]">
            <ProbixLogo size="md" />
          </div>
          <div className="space-y-4">
            <h2 className="text-8xl font-black italic tracking-tighter leading-none text-probix-text dark:text-white uppercase">{mode === 'login' ? 'Authorize' : 'Initialize'}</h2>
            <div className="flex items-center justify-center gap-4">
               <div className="h-px w-8 bg-primary/40" />
               <p className="text-xs font-black text-probix-muted uppercase tracking-[0.8em] italic opacity-60 leading-none">Security Node 2.4.0</p>
               <div className="h-px w-8 bg-primary/40" />
            </div>
          </div>
        </div>

        <div className="space-y-12 relative z-10 text-left">
          <div className="space-y-4 px-4">
            <label className="text-[11px] font-black text-probix-muted uppercase tracking-[0.6em] ml-6 italic opacity-60 leading-none">Signature Handle</label>
            <div className="relative group">
               <User className="absolute left-10 top-1/2 -translate-y-1/2 text-primary opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all duration-700" size={28}/>
               <input
                  type="text"
                  placeholder="Username or Analytical ID"
                  className="w-full bg-probix-bg/60 dark:bg-lacquer-black/60 border border-probix-border dark:border-white/10 rounded-[36px] py-10 pl-24 pr-12 outline-none focus:border-primary focus:bg-probix-bg dark:focus:bg-lacquer-black transition-all duration-700 font-black italic text-3xl placeholder:opacity-10 text-probix-text dark:text-white shadow-inner"
               />
            </div>
          </div>
          <div className="space-y-4 px-4">
            <label className="text-[11px] font-black text-probix-muted uppercase tracking-[0.6em] ml-6 italic opacity-60 leading-none">Security Key</label>
            <div className="relative group">
               <Lock className="absolute left-10 top-1/2 -translate-y-1/2 text-primary opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all duration-700" size={28}/>
               <input
                  type="password"
                  placeholder="••••••••••••••••"
                  className="w-full bg-probix-bg/60 dark:bg-lacquer-black/60 border border-probix-border dark:border-white/10 rounded-[36px] py-10 pl-24 pr-12 outline-none focus:border-primary focus:bg-probix-bg dark:focus:bg-lacquer-black transition-all duration-700 font-black italic text-3xl placeholder:opacity-10 text-probix-text dark:text-white shadow-inner"
               />
            </div>
          </div>

          <Button size="lg" className="w-full !py-12 text-5xl mt-16 !rounded-[48px] italic font-black tracking-[0.2em] shadow-[0_20px_80px_oklch(65%_0.2_250_/_30%)] active-press uppercase" onClick={() => {
            onComplete();
          }}>
            {mode === 'login' ? 'Seal Session' : 'Access Hub'}
          </Button>

          <div className="relative py-14 flex items-center">
            <div className="flex-1 h-px bg-probix-border dark:bg-white/10" />
            <span className="px-12 text-[10px] font-black text-probix-muted uppercase tracking-[1em] whitespace-nowrap opacity-40 italic">Sync Hub</span>
            <div className="flex-1 h-px bg-probix-border dark:bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-8 px-2">
             <Button variant="secondary" className="!rounded-[32px] !py-10 glass italic font-black text-sm tracking-[0.3em] uppercase hover:bg-primary/10 transition-all border-probix-border dark:border-white/10 active-press shadow-xl">Veltra Hub</Button>
             <Button variant="secondary" className="!rounded-[32px] !py-10 glass italic font-black text-sm tracking-[0.3em] uppercase hover:bg-fuchsia/10 transition-all border-probix-border dark:border-white/10 active-press shadow-xl">Google Node</Button>
          </div>
        </div>

        <p className="text-center mt-20 text-lg font-bold text-probix-muted italic">
          {mode === 'login' ? "Handle not detected? " : "Access established? "}
          <button onClick={toggleMode} className="text-primary hover:underline italic font-black ml-4 uppercase tracking-tighter text-2xl active-press transition-all">
            {mode === 'login' ? 'Initialize' : 'Authorize'}
          </button>
        </p>
      </div>
    </motion.div>
  );
}
