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
import { CATEGORIES_DATA } from '@/store/data';

interface GlassBadgeProps {
  icon: React.ReactNode;
  color: string;
  text: string;
  stat: string;
  statColor: string;
}

/**
 * GlassBadge - Implements Concentric Radius and Tactile Feedback
 * Outer: 24px, Inner: 16px
 */
export function GlassBadge({ icon, color, text, stat, statColor }: GlassBadgeProps) {
  return (
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className={`glass p-4 rounded-[24px] border-l-[4px] ${color} shadow-3xl flex items-center gap-5 min-w-[240px] z-30 group cursor-pointer transition-all duration-500 border-white/5 text-left active-press`}
      >
          <div className="w-11 h-11 rounded-[16px] flex items-center justify-center bg-probix-bg dark:bg-white/5 border border-probix-border dark:border-white/5 shadow-inner group-hover:bg-primary/10 transition-colors">
              {icon}
          </div>
          <div className="text-left flex-1 min-w-0">
              <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.2em] mb-1.5 leading-none truncate italic opacity-60">{text}</p>
              <p className={`text-xl font-black italic tracking-tighter leading-none ${statColor} drop-shadow-glow tabular`}>{stat}</p>
          </div>
      </motion.div>
  );
}

interface PulseNodeProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  color: string;
}

export function PulseNode({ top, left, right, bottom, color }: PulseNodeProps) {
  return (
      <div style={{ top, left, right, bottom }} className="absolute w-4 h-4 rounded-full z-20 shadow-glow">
          <div className={`absolute inset-0 rounded-full animate-ping opacity-75 shadow-glow ${color}`} />
          <div className={`relative w-full h-full rounded-full shadow-2xl border border-white/40 ${color}`} />
      </div>
  );
}

interface CategoryStatProps {
  label: string;
  value: string;
}

/**
 * CategoryStat - High density technical marker
 */
export function CategoryStat({ label, value }: CategoryStatProps) {
 return (
    <div className="text-right flex flex-col justify-center border-l border-probix-border dark:border-white/10 pl-10 h-20 text-left">
       <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.3em] mb-2 italic opacity-60">{label}</p>
       <p className="text-4xl font-black italic text-probix-text dark:text-white tracking-tighter leading-none tabular">{value}</p>
    </div>
 );
}

interface NotificationItemProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export function NotificationItem({ title, desc, icon }: NotificationItemProps) {
  return (
      <div className="flex items-start gap-5 p-5 rounded-[24px] hover:bg-probix-surface dark:hover:bg-white/[0.04] transition-all cursor-pointer group border border-transparent hover:border-probix-border dark:hover:border-white/5 text-left active-press">
          <div className="w-12 h-12 rounded-[16px] bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-all duration-500 shadow-xl border border-primary/10">{icon}</div>
          <div className="min-w-0 text-left space-y-1">
              <p className="text-sm font-black italic uppercase leading-none text-probix-text dark:text-white group-hover:text-primary transition-colors">{title}</p>
              <p className="text-[11px] font-bold text-probix-muted truncate leading-relaxed opacity-60 italic">{desc}</p>
          </div>
      </div>
  );
}

interface MoverItemProps {
  label: string;
  trend: string;
  positive?: boolean;
}

/**
 * MoverItem - High-precision volatility marker
 */
export function MoverItem({ label, trend, positive }: MoverItemProps) {
return (
  <div className="flex items-center justify-between group cursor-pointer transition-all hover:translate-x-2 p-4 rounded-[20px] hover:bg-probix-surface dark:hover:bg-white/[0.02] text-left active-press border border-transparent hover:border-probix-border dark:hover:border-white/5">
     <div className="flex items-center gap-5 text-left">
        <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shadow-lg transition-all group-hover:scale-110 ${positive ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-crimson/10 text-crimson border border-crimson/20'}`}>
          <TrendingUp size={20} className={positive ? 'shadow-glow' : 'rotate-180'} />
        </div>
        <span className="text-base font-black italic tracking-tight text-probix-text dark:text-white/80 group-hover:text-primary transition-colors uppercase leading-none">{label}</span>
     </div>
     <div className="text-right tabular">
          <span className={`text-lg font-black ${positive ? 'text-secondary drop-shadow-glow' : 'text-crimson'} italic leading-none`}>{trend}</span>
          <p className="text-[9px] font-black uppercase text-probix-muted opacity-40 mt-1.5 tracking-widest italic">Signal Velocity</p>
     </div>
  </div>
);
}

interface CommentProps {
  user: string;
  text: string;
}

export function Comment({ user, text }: CommentProps) {
 return (
    <div className="glass p-6 rounded-[28px] border-probix-border dark:border-white/5 space-y-4 hover:border-primary/40 transition-all text-left group shadow-xl bg-probix-surface/40 dark:bg-white/[0.01] active-press">
       <div className="flex items-center justify-between">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic flex items-center gap-2 leading-none">@ {user} <CheckCircle2 size={12} className="opacity-40" /></p>
          <span className="text-[9px] font-black text-probix-muted opacity-30 uppercase tracking-widest italic">Analytical Stream</span>
       </div>
       <p className="text-base text-probix-text dark:text-champagne font-medium leading-relaxed italic group-hover:text-probix-text dark:group-hover:text-white transition-colors">&quot;{text}&quot;</p>
       <div className="flex gap-5 pt-2 opacity-0 group-hover:opacity-40 transition-opacity">
          <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-probix-text dark:text-white active-press"><Heart size={14}/> Like</button>
          <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-probix-text dark:text-white active-press"><Share size={14}/> Node</button>
       </div>
    </div>
 )
}

interface WalletOptionProps {
  label: string;
  description: string;
  active?: boolean;
}

export function WalletOption({ label, description, active }: WalletOptionProps) {
return (
  <button className={`w-full flex items-center justify-between p-8 rounded-[40px] transition-all border-2 active-press ${active ? 'bg-primary/10 border-primary shadow-glow' : 'bg-probix-surface/60 dark:bg-[#0A0C12] border-probix-border dark:border-white/5 text-probix-muted hover:border-primary/30'} text-left`}>
     <div className="flex items-center gap-8">
        <div className={`w-16 h-16 rounded-[24px] bg-probix-bg dark:bg-[#020308] flex items-center justify-center border border-probix-border dark:border-white/10 shadow-inner ${active ? 'shadow-primary/20' : ''}`}>
           {active ? <ShieldCheck size={32} className="text-primary drop-shadow-glow" /> : <Wallet size={32} className="opacity-30" />}
        </div>
        <div className="text-left space-y-1">
           <p className="font-black italic uppercase tracking-tighter text-2xl leading-none text-probix-text dark:text-white">{label}</p>
           <p className="text-[10px] font-black opacity-40 uppercase tracking-widest italic leading-none">{description}</p>
        </div>
     </div>
     {active ? (
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white shadow-3xl border-4 border-probix-bg dark:border-[#010206] scale-110">
          <CheckCircle2 size={24}/>
      </div>
     ) : (
      <div className="w-10 h-10 rounded-full border-2 border-probix-border dark:border-white/10 group-hover:border-primary/40 transition-all" />
     )}
  </button>
);
}

interface SettingItemProps {
  label: string;
  active?: boolean;
}

export function SettingItem({ label, active }: SettingItemProps) {
return (
  <div className="flex items-center justify-between group p-4 rounded-[20px] hover:bg-probix-surface dark:hover:bg-white/[0.02] transition-all text-left border border-transparent hover:border-probix-border dark:hover:border-white/5 active-press">
     <span className="text-base font-bold italic text-probix-muted group-hover:text-probix-text dark:group-hover:text-white transition-colors uppercase tracking-widest">{label}</span>
     <div className={`w-14 h-7 rounded-full p-1.5 transition-all cursor-pointer ${active ? 'bg-primary shadow-glow shadow-primary/40' : 'bg-probix-border dark:bg-white/10 shadow-inner'}`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-all duration-500 shadow-xl ${active ? 'translate-x-7 scale-110' : 'translate-x-0 opacity-40'}`} />
     </div>
  </div>
);
}

interface PodiumCardProps {
  analyst: {
    name: string;
    image: string;
    accuracy: number;
    xp: string;
    trend: string;
  };
  rank: number;
  color: string;
  featured?: boolean;
  h: string;
}

/**
 * PodiumCard - The High-Craft Analytical Stand
 */
export function PodiumCard({ analyst, rank, color, featured, h }: PodiumCardProps) {
  return (
      <motion.div
        whileHover={{ y: -25, scale: 1.02 }}
        className={`glass rounded-[56px] border-probix-border dark:border-white/5 flex flex-col items-center justify-end p-12 pb-20 relative overflow-hidden transition-all duration-700 hover:shadow-3xl bg-probix-surface/40 dark:bg-white/[0.01] active-press ${h} ${featured ? 'border-primary/40 z-10 shadow-[0_0_100px_oklch(65%_0.2_250_/_15%)]' : 'opacity-60 hover:opacity-100'} text-left`}
      >
           <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-64 h-64 blur-[120px] opacity-20" style={{ backgroundColor: color }} />
           <div className="absolute top-10 left-10 text-[120px] font-black italic opacity-[0.03] text-probix-text dark:text-white">#{rank}</div>

           <div className="relative mb-12">
              <div className={`absolute -top-4 -right-4 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-3xl z-10 border-4 border-probix-bg dark:border-[#010206]`} style={{ backgroundColor: color, color: '#010206' }}>
                  {rank === 1 ? <Crown size={28}/> : rank}
              </div>
              <img src={analyst.image} className={`w-44 h-44 rounded-[56px] object-cover border-4 ${featured ? 'border-primary shadow-glow scale-110' : 'border-probix-border dark:border-white/10 shadow-xl'}`} alt={analyst.name} />
           </div>

           <div className="text-center space-y-8">
              <div className="space-y-2">
                <h4 className="text-4xl font-black italic tracking-tighter uppercase text-probix-text dark:text-white leading-none">{analyst.name}</h4>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] italic opacity-60">Master Oracle Node</p>
              </div>
              <div className="space-y-1">
                  <p className="text-7xl font-black italic tracking-tighter leading-none tabular drop-shadow-glow" style={{ color }}>{analyst.accuracy}%</p>
                  <p className="text-[11px] font-black text-probix-muted uppercase tracking-widest italic opacity-40">Session Precision</p>
              </div>
              <div className="flex gap-8 pt-8 justify-center border-t border-probix-border dark:border-white/5">
                   <div className="text-center space-y-1">
                       <p className="text-[9px] font-black text-probix-muted uppercase tracking-widest leading-none italic">Experience</p>
                       <p className="text-2xl font-black text-probix-text dark:text-white italic tabular">{analyst.xp} XP</p>
                   </div>
                   <div className="w-px h-10 bg-probix-border dark:bg-white/10 my-auto" />
                   <div className="text-center space-y-1">
                       <p className="text-[9px] font-black text-probix-muted uppercase tracking-widest leading-none italic">Drift</p>
                       <p className="text-2xl font-black text-secondary italic tabular">{analyst.trend}</p>
                   </div>
              </div>
           </div>
      </motion.div>
  )
}

interface InsightDetailItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export function InsightDetailItem({ icon, title, desc }: InsightDetailItemProps) {
  return (
      <div className="flex gap-12 items-start group text-left p-6 rounded-[40px] hover:bg-probix-surface dark:hover:bg-white/[0.01] transition-all border border-transparent hover:border-probix-border dark:hover:border-white/10">
          <div className="w-24 h-24 rounded-[32px] glass flex items-center justify-center border-probix-border dark:border-white/5 bg-probix-bg dark:bg-white/[0.01] shadow-xl group-hover:scale-110 group-hover:border-primary/40 transition-all duration-700 shrink-0">
              <div className="group-hover:drop-shadow-glow transition-all duration-700">{icon}</div>
          </div>
          <div className="space-y-4 text-left pt-2">
              <h4 className="text-5xl font-black italic tracking-tighter uppercase text-probix-text dark:text-white leading-none group-hover:text-primary transition-colors">{title}</h4>
              <p className="text-xl text-probix-muted font-medium italic leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{desc}</p>
          </div>
      </div>
  )
}

interface TransactionRowProps {
  tx: {
    id: string;
    marketTitle: string;
    amount: number;
    type: 'trade' | 'topup';
    timestamp: number;
    status: 'success' | 'pending';
  }
}

/**
 * TransactionRow - Tabular Audit Log
 */
export function TransactionRow({ tx }: TransactionRowProps) {
  return (
    <div className="flex items-center justify-between p-8 rounded-[32px] glass border-probix-border dark:border-white/5 hover:bg-probix-surface dark:hover:bg-raised-lacquer transition-all group shadow-xl bg-probix-bg dark:bg-white/[0.01] active-press">
        <div className="flex items-center gap-10">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${tx.type === 'topup' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                {tx.type === 'topup' ? <CheckCircle2 size={28}/> : <TrendingUp size={28}/>}
            </div>
            <div className="text-left space-y-2">
                <p className="text-xl font-black italic uppercase tracking-tight text-probix-text dark:text-champagne group-hover:text-primary transition-colors leading-none">{tx.marketTitle}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest italic bg-primary/10 px-3 py-1 rounded-lg">Verified</span>
                  <p className="text-[11px] font-bold text-probix-muted uppercase tracking-widest italic opacity-40 tabular">{new Date(tx.timestamp).toLocaleString()}</p>
                </div>
            </div>
        </div>
        <div className="text-right space-y-2 tabular">
            <p className={`text-2xl font-black italic leading-none ${tx.amount > 0 ? 'text-secondary drop-shadow-glow' : 'text-probix-text dark:text-white'}`}>
                {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
            </p>
            <p className="text-[10px] font-black uppercase text-probix-muted tracking-[0.4em] opacity-30 italic">ID: {tx.id.slice(-8).toUpperCase()}</p>
        </div>
    </div>
  )
}

interface AnalystRowProps {
  analyst: {
    name: string;
    image: string;
    accuracy: number;
    trend: string;
  };
  rank: number;
}

/**
 * AnalystRow - High-density Registry Entry
 */
export function AnalystRow({ analyst, rank }: AnalystRowProps) {
    return (
        <div className="flex items-center justify-between p-6 rounded-[32px] glass border-probix-border dark:border-white/5 hover:bg-probix-surface dark:hover:bg-white/[0.04] transition-all group cursor-pointer active-press shadow-lg bg-probix-bg dark:bg-white/[0.01]">
            <div className="flex items-center gap-8">
                <span className="text-xl font-black italic text-probix-muted opacity-20 w-8 tabular">#{rank}</span>
                <div className="relative group/avatar">
                  <img src={analyst.image} className="w-16 h-16 rounded-2xl object-cover border-2 border-probix-border dark:border-white/10 group-hover:scale-110 transition-transform shadow-xl" alt={analyst.name} />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-lg border-2 border-probix-bg dark:border-[#010206] shadow-glow" />
                </div>
                <div className="text-left space-y-1">
                    <p className="text-xl font-black italic uppercase text-probix-text dark:text-white group-hover:text-primary transition-colors leading-none">{analyst.name}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                      <p className="text-[10px] font-black text-secondary uppercase tracking-widest italic opacity-60">Verified Node Signal</p>
                    </div>
                </div>
            </div>
            <div className="text-right space-y-1 tabular">
                <p className="text-3xl font-black italic text-probix-text dark:text-white leading-none tabular group-hover:text-secondary transition-colors">{analyst.accuracy}%</p>
                <p className={`text-[10px] font-black uppercase tracking-widest italic ${analyst.trend.includes('+') ? 'text-secondary' : 'text-crimson'}`}>{analyst.trend} Drift</p>
            </div>
        </div>
    );
}

/**
 * StatBox - Multi-layered technical data node
 */
export function StatBox({ label, value, color, animate }: { label: string, value: string, color: string, animate?: boolean }) {
    return (
        <div className="glass p-10 rounded-[40px] border-probix-border dark:border-white/5 space-y-6 hover:border-primary/40 transition-all text-left bg-probix-surface/40 dark:bg-white/[0.01] active-press shadow-2xl group">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-primary/20 group-hover:w-12 transition-all duration-700" />
              <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.5em] italic leading-none opacity-60">{label}</p>
            </div>
            <div className="flex items-center gap-5">
                {animate && <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-glow shadow-secondary/40 border border-white/20" />}
                <p className={`text-6xl font-black italic tracking-tighter leading-none ${color} uppercase tabular drop-shadow-glow`}>{value}</p>
            </div>
            <div className="pt-2">
              <div className="h-1 w-full bg-probix-border dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full ${color.replace('text-', 'bg-')} opacity-40`} />
              </div>
            </div>
        </div>
    );
}
