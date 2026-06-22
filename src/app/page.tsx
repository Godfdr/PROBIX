"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Zap, Lock, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useProbix } from '@/store/ProbixContext';

export default function ProbixLanding() {
  const [view, setView] = useState<'landing' | 'auth'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();
  const { login, isAuthenticated, isHydrated } = useProbix();

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isHydrated, router]);

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-500">
      <nav className="fixed top-0 w-full z-50 px-6 h-16 flex justify-between items-center bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="font-black text-xl tracking-tighter" onClick={() => setView('landing')}>PROBIX</div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="text-sm font-bold" onClick={() => { setAuthMode('login'); setView('auth'); }}>Log In</button>
          <Button onClick={() => { setAuthMode('signup'); setView('auth'); }}>Get Started</Button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.section key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Predict the future. <br/><span className="text-blue-600">Trade on outcomes.</span></h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl">The first prediction market built for Africa. Trade on sports, politics, and local economics with instant payouts.</p>
            <div className="flex gap-4">
              <Button size="lg" className="px-8" onClick={() => setView('auth')}>Start Trading <ArrowRight className="ml-2" /></Button>
              <Button size="lg" variant="secondary">View Markets</Button>
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
               <FeatureCard icon={<TrendingUp/>} title="Live Markets" desc="Real-time outcomes on topics that matter to you." />
               <FeatureCard icon={<Shield/>} title="Secure" desc="Built on decentralized protocols for total safety." />
               <FeatureCard icon={<Zap/>} title="Instant" desc="Lightning fast settlement and withdrawals." />
            </div>
          </motion.section>
        )}

        {view === 'auth' && (
          <motion.section key="auth" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-32 flex justify-center px-6">
            <div className="w-full max-w-md p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10">
              <h2 className="text-3xl font-black mb-6">{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Username" className="w-full p-4 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-white/10" />
                <input type="password" placeholder="Password" className="w-full p-4 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-white/10" />
                <Button className="w-full py-4 text-lg" onClick={() => { login(); router.push('/dashboard'); }}>
                  {authMode === 'login' ? 'Log In' : 'Sign Up'}
                </Button>
                <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="w-full text-center text-sm text-slate-500">
                  {authMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 text-left">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
    </div>
  );
}
