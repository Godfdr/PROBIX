"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useProbix } from '@/store/ProbixContext';

interface CreateForecastModalProps {
  onClose: () => void;
  onCreate: (market: Market) => void;
}

export function CreateForecastModal({ onClose, onCreate }: CreateForecastModalProps) {
  const { addMarket } = useProbix();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sports',
    percentage: 50,
    trend: "New Hub",
    color: "#8B5CF6",
    chartData: [40, 45, 50, 50, 48, 52, 50, 55],
    volume: "0 forecasts",
    comments: 0,
    icon: "🔥",
    description: "",
    yesPrice: 0.5,
    noPrice: 0.5
  });
  const [isLaunching, setIsLaunching] = useState(false);

  const categories = [
    { name: 'Sports', icon: '⚽', color: '#F59E0B' },
    { name: 'Politics', icon: '🏛️', color: '#8B5CF6' },
    { name: 'Economy', icon: '📈', color: '#10B981' },
    { name: 'Tech', icon: '🚀', color: '#3B82F6' },
    { name: 'Crypto', icon: '₿', color: '#F59E0B' },
    { name: 'Nigeria', icon: '🇳🇬', color: '#10B981' },
  ];

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      const newMarket = {
        ...formData,
        id: Date.now(),
        yesPrice: formData.percentage / 100,
        noPrice: (100 - formData.percentage) / 100,
      };
      addMarket(newMarket);
      onCreate(newMarket);
      setIsLaunching(false);
      onClose();
    }, 2500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[2000]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-[2010] p-6"
      >
         <div className="max-w-4xl w-full glass rounded-[72px] p-16 shadow-[0_0_150px_rgba(139,92,246,0.3)] pointer-events-auto flex flex-col gap-10 overflow-y-auto max-h-[90vh] no-scrollbar relative bg-probix-bg dark:bg-[#010206]">
            {isLaunching && (
                <div className="absolute inset-0 bg-probix-bg/98 dark:bg-[#010206]/98 backdrop-blur-3xl z-50 flex flex-col items-center justify-center gap-10">
                    <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                        <Zap size={120} className="text-primary fill-primary shadow-glow shadow-primary/50"/>
                    </motion.div>
                    <p className="font-black italic text-5xl tracking-widest uppercase text-probix-text animate-pulse">Establishing Node...</p>
                </div>
            )}

            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-probix-text">Initialize Forecast</h2>
                <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.5em] italic">Protocol 2.4 / Node Establishment</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="glass h-16 w-16 !rounded-[28px] hover:border-primary/50 shadow-3xl text-probix-text">
                <X size={36}/>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-primary uppercase tracking-[0.4em] ml-2 italic">Question Node</label>
                    <textarea
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. Will Enyimba win the NPFL 2026 Title?"
                      className="w-full bg-probix-surface dark:bg-[#0A0C12] border border-probix-border dark:border-white/5 rounded-[32px] py-8 px-10 outline-none focus:border-primary/50 transition-all font-black italic text-2xl placeholder:opacity-10 shadow-inner text-probix-text h-48 resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-primary uppercase tracking-[0.4em] ml-2 italic">Node Description</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      placeholder="Verified data source and settlement criteria..."
                      className="w-full bg-probix-surface dark:bg-[#0A0C12] border border-probix-border dark:border-white/5 rounded-[32px] py-8 px-10 outline-none focus:border-primary/50 transition-all font-bold italic text-lg placeholder:opacity-10 shadow-inner text-probix-muted h-32 resize-none"
                    />
                  </div>
               </div>

               <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-primary uppercase tracking-[0.4em] ml-2 italic">Protocol Category</label>
                    <div className="grid grid-cols-3 gap-4">
                       {categories.map((cat) => (
                         <button
                           key={cat.name}
                           onClick={() => setFormData({...formData, category: cat.name, icon: cat.icon, color: cat.color})}
                           className={`p-6 rounded-[28px] flex flex-col items-center justify-center gap-3 transition-all border-2 ${formData.category === cat.name ? 'bg-primary/10 border-primary shadow-glow shadow-primary/20' : 'bg-probix-surface dark:bg-white/5 border-transparent opacity-40 hover:opacity-100'}`}
                         >
                            <span className="text-4xl">{cat.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-probix-text">{cat.name}</span>
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="bento-card bg-primary/5 border-primary/20 p-8 flex flex-col gap-6">
                     <div className="flex justify-between items-center">
                        <p className="text-[11px] font-black text-primary/50 dark:text-white/50 uppercase tracking-[0.2em] italic leading-none">Initial Probability</p>
                        <span className="text-4xl font-black italic text-primary leading-none">{formData.percentage}%</span>
                     </div>
                     <input
                        type="range"
                        min="1"
                        max="99"
                        value={formData.percentage}
                        onChange={e => setFormData({...formData, percentage: parseInt(e.target.value)})}
                        className="w-full accent-primary h-1.5 bg-probix-border dark:bg-white/10 rounded-full appearance-none cursor-pointer"
                     />
                     <div className="flex justify-between text-[9px] font-black text-probix-muted dark:text-white/20 uppercase tracking-widest">
                        <span>Highly Unlikely</span>
                        <span>Highly Likely</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                disabled={!formData.title}
                className="w-full !py-12 text-4xl shadow-3xl shadow-primary/40 font-black uppercase italic !rounded-[48px] tracking-[0.2em] active:scale-95 transition-all text-white"
                onClick={handleLaunch}
              >
                AUTHORIZE NODE LAUNCH
              </Button>
              <p className="text-center text-[10px] font-black text-probix-muted uppercase tracking-[0.4em] mt-8 italic opacity-40">Verification process may take up to 2,500ms</p>
            </div>
         </div>
      </motion.div>
    </>
  );
}
