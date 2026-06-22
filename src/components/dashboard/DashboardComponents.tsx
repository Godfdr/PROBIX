"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  CheckCircle2,
  Heart,
  Share,
  ShieldCheck,
  Wallet,
  Crown,
  Zap,
  Globe,
  Award,
  ArrowUpRight
} from 'lucide-react';

interface GlassBadgeProps {
  icon: React.ReactNode;
  color: string;
  text: string;
  stat: string;
  statColor: string;
}

export function GlassBadge({ icon, color, text, stat, statColor }: GlassBadgeProps) {
  return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className={`glass p-3 rounded-[20px] border-l-[3px] ${color} shadow-xl flex items-center gap-3 min-w-[200px] z-30 group cursor-pointer transition-all border-white/5 text-left`}
      >
          <div className="w-10 h-10 rounded-[14px] flex items-center justify-center bg-probix-bg dark:bg-white/5 border border-probix-border dark:border-white/5 shadow-inner">
              {icon}
          </div>
          <div className="text-left flex-1 min-w-0">
              <p className="text-[9px] font-black text-probix-muted uppercase tracking-[0.15em] mb-0.5 truncate italic opacity-60">{text}</p>
              <p className={`text-lg font-black italic tracking-tighter leading-none ${statColor} drop-shadow-glow`}>{stat}</p>
          </div>
      </motion.div>
  );
}

export function PulseNode({ top, left, right, bottom, color }: { top?: string, left?: string, right?: string, bottom?: string, color: string }) {
  return (
      <div style={{ top, left, right, bottom }} className="absolute w-3 h-3 rounded-full z-20 shadow-glow">
          <div className={`absolute inset-0 rounded-full animate-ping opacity-75 shadow-glow ${color}`} />
          <div className={`relative w-full h-full rounded-full shadow-xl border border-white/40 ${color}`} />
      </div>
  );
}

export function CategoryStat({ label, value }: { label: string, value: string }) {
 return (
    <div className="text-left border-l border-probix-border dark:border-white/10 pl-6 h-12 flex flex-col justify-center">
       <p className="text-[9px] font-black text-probix-muted uppercase tracking-[0.2em] mb-0.5 italic opacity-60">{label}</p>
       <p className="text-2xl font-black italic text-probix-text dark:text-white tracking-tighter leading-none">{value}</p>
    </div>
 );
}

export function MoverItem({ label, trend, positive }: { label: string, trend: string, positive?: boolean }) {
return (
  <div className="flex items-center justify-between group cursor-pointer transition-all hover:translate-x-1 p-3 rounded-[16px] hover:bg-probix-surface dark:hover:bg-white/[0.02] text-left">
     <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shadow-md transition-all group-hover:scale-105 ${positive ? 'bg-secondary/10 text-secondary' : 'bg-crimson/10 text-crimson'}`}>
          <TrendingUp size={18} className={positive ? '' : 'rotate-180'} />
        </div>
        <span className="text-sm font-black italic tracking-tight text-probix-text dark:text-white/80 group-hover:text-primary transition-colors uppercase leading-none">{label}</span>
     </div>
     <div className="text-right">
          <span className={`text-base font-black ${positive ? 'text-secondary' : 'text-crimson'} italic leading-none`}>{trend}</span>
     </div>
  </div>
);
}

export function Comment({ user, text }: { user: string, text: string }) {
 return (
    <div className="glass p-5 rounded-[24px] border-probix-border dark:border-white/5 space-y-3 hover:border-primary/30 transition-all text-left group shadow-lg bg-probix-surface/40 dark:bg-white/[0.01]">
       <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] italic flex items-center gap-2">@ {user} <CheckCircle2 size={10} className="opacity-40" /></p>
       <p className="text-sm text-probix-text dark:text-champagne font-medium leading-relaxed italic">&quot;{text}&quot;</p>
    </div>
 )
}

export function WalletOption({ label, description, active }: { label: string, description: string, active?: boolean }) {
return (
  <button className={`w-full flex items-center justify-between p-6 rounded-[32px] transition-all border-2 ${active ? 'bg-primary/10 border-primary shadow-glow shadow-primary/20' : 'bg-probix-surface/60 dark:bg-[#0A0C12] border-probix-border dark:border-white/5 text-probix-muted hover:border-primary/30'} text-left`}>
     <div className="flex items-center gap-6">
        <div className={`w-12 h-12 rounded-[18px] bg-probix-bg dark:bg-[#020308] flex items-center justify-center border border-probix-border dark:border-white/10 shadow-inner`}>
           {active ? <ShieldCheck size={24} className="text-primary" /> : <Wallet size={24} className="opacity-30" />}
        </div>
        <div className="text-left space-y-0.5">
           <p className="font-black italic uppercase tracking-tighter text-xl leading-none text-probix-text dark:text-white">{label}</p>
           <p className="text-[9px] font-black opacity-40 uppercase tracking-widest italic leading-none">{description}</p>
        </div>
     </div>
     {active && <CheckCircle2 size={20} className="text-secondary" />}
  </button>
);
}

export function SettingItem({ label, active }: { label: string, active?: boolean }) {
return (
  <div className="flex items-center justify-between group p-3 rounded-[16px] hover:bg-probix-surface dark:hover:bg-white/[0.02] transition-all text-left">
     <span className="text-sm font-bold italic text-probix-muted group-hover:text-probix-text dark:group-hover:text-white transition-colors uppercase tracking-widest">{label}</span>
     <div className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${active ? 'bg-primary' : 'bg-probix-border dark:bg-white/10'}`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${active ? 'translate-x-6' : 'translate-x-0 opacity-40'}`} />
     </div>
  </div>
);
}

export function PodiumCard({ analyst, rank, color, featured, h }: any) {
  return (
      <motion.div
        whileHover={{ y: -15, scale: 1.01 }}
        className={`glass rounded-[40px] border-probix-border dark:border-white/5 flex flex-col items-center justify-end p-10 pb-16 relative overflow-hidden transition-all duration-500 hover:shadow-2xl bg-probix-surface/40 dark:bg-white/[0.01] ${h} ${featured ? 'border-primary/30 z-10' : 'opacity-70'} text-left`}
      >
           <div className="absolute top-10 left-10 text-8xl font-black italic opacity-[0.03] text-probix-text dark:text-white">#{rank}</div>
           <div className="relative mb-10">
              <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shadow-xl z-10 border-2 border-probix-bg dark:border-[#010206]`} style={{ backgroundColor: color, color: '#010206' }}>
                  {rank === 1 ? <Crown size={20}/> : rank}
              </div>
              <img src={analyst.image} className={`w-36 h-40 rounded-[32px] object-cover border-2 shadow-xl ${featured ? 'border-primary' : 'border-probix-border dark:border-white/10'}`} alt={analyst.name} />
           </div>
           <div className="text-center space-y-6">
              <h4 className="text-3xl font-black italic tracking-tighter uppercase text-probix-text dark:text-white leading-none">{analyst.name}</h4>
              <div className="space-y-0.5">
                  <p className="text-5xl font-black italic tracking-tighter leading-none" style={{ color }}>{analyst.accuracy}%</p>
                  <p className="text-[10px] font-black text-probix-muted uppercase tracking-widest italic opacity-40">Precision</p>
              </div>
           </div>
      </motion.div>
  )
}

export function InsightDetailItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
      <div className="flex gap-8 items-start group text-left p-4 rounded-[32px] hover:bg-probix-surface dark:hover:bg-white/[0.01] transition-all">
          <div className="w-16 h-16 rounded-[20px] glass flex items-center justify-center border-probix-border dark:border-white/5 bg-probix-bg dark:bg-white/[0.01] shadow-lg shrink-0">
              {icon}
          </div>
          <div className="space-y-2 pt-1">
              <h4 className="text-3xl font-black italic tracking-tighter uppercase text-probix-text dark:text-white leading-none">{title}</h4>
              <p className="text-lg text-probix-muted font-medium italic opacity-80">{desc}</p>
          </div>
      </div>
  )
}

export function TransactionRow({ tx }: { tx: any }) {
  return (
    <div className="flex items-center justify-between p-6 rounded-[24px] glass border-probix-border dark:border-white/5 hover:bg-probix-surface transition-all group shadow-md bg-probix-bg dark:bg-white/[0.01]">
        <div className="flex items-center gap-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-105 ${tx.type === 'topup' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                {tx.type === 'topup' ? <CheckCircle2 size={20}/> : <TrendingUp size={20}/>}
            </div>
            <div className="text-left space-y-1">
                <p className="text-lg font-black italic uppercase tracking-tight text-probix-text dark:text-champagne group-hover:text-primary transition-colors leading-none">{tx.marketTitle}</p>
                <p className="text-[10px] font-bold text-probix-muted uppercase tracking-widest italic opacity-40">{new Date(tx.timestamp).toLocaleString()}</p>
            </div>
        </div>
        <div className="text-right">
            <p className={`text-xl font-black italic leading-none ${tx.amount > 0 ? 'text-secondary' : 'text-probix-text dark:text-white'}`}>
                {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
            </p>
        </div>
    </div>
  )
}

export function AnalystRow({ analyst, rank }: any) {
    return (
        <div className="flex items-center justify-between p-5 rounded-[24px] glass border-probix-border dark:border-white/5 hover:bg-probix-surface dark:hover:bg-white/[0.04] transition-all group cursor-pointer shadow-sm">
            <div className="flex items-center gap-6">
                <span className="text-lg font-black italic text-probix-muted opacity-20 w-6">#{rank}</span>
                <img src={analyst.image} className="w-12 h-12 rounded-xl object-cover border border-probix-border dark:border-white/10" alt={analyst.name} />
                <div className="text-left">
                    <p className="text-lg font-black italic uppercase text-probix-text dark:text-white leading-none group-hover:text-primary transition-colors">{analyst.name}</p>
                    <p className="text-[9px] font-black text-secondary uppercase tracking-widest italic opacity-60">Verified Node Signal</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-2xl font-black italic text-probix-text dark:text-white leading-none">{analyst.accuracy}%</p>
            </div>
        </div>
    );
}

export function StatBox({ label, value, color, animate }: { label: string, value: string, color: string, animate?: boolean }) {
    return (
        <div className="glass p-8 rounded-[32px] border-probix-border dark:border-white/5 space-y-4 hover:border-primary/30 transition-all text-left bg-probix-surface/40 dark:bg-white/[0.01]">
            <p className="text-[9px] font-black text-probix-muted uppercase tracking-[0.2em] italic opacity-60 leading-none">{label}</p>
            <div className="flex items-center gap-4">
                {animate && <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-glow" />}
                <p className={`text-4xl font-black italic tracking-tighter leading-none ${color} uppercase`}>{value}</p>
            </div>
        </div>
    );
}
