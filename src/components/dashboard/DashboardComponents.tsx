"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, Heart, Share, ShieldCheck, Wallet, Crown, Zap, Globe, Award, Activity } from 'lucide-react';

interface GlassBadgeProps {
  icon: React.ReactNode;
  color: string;
  text: string;
  stat: string;
  statColor: string;
  subStat?: string;
  subStatColor?: string;
}

/**
 * GlassBadge - Implements Concentric Radius and Tactile Feedback
 */
export function GlassBadge({ icon, color, text, stat, statColor, subStat, subStatColor }: GlassBadgeProps) {
  return (
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className={`glass p-4 rounded-[28px] border-l-[4px] ${color} shadow-3xl flex items-center gap-5 min-w-[260px] z-30 group cursor-pointer transition-all duration-500 border-white/5 active-press`}
      >
          <div className="w-12 h-12 rounded-[18px] flex items-center justify-center bg-white/5 border border-white/5 shadow-inner group-hover:bg-primary/10 transition-colors">
              {icon}
          </div>
          <div className="text-left flex-1 min-w-0">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 leading-none truncate italic opacity-60">{text}</p>
              <p className={`text-xl font-black italic tracking-tighter leading-none ${statColor}`}>{stat}</p>
              {subStat && <p className={`text-xs font-black uppercase mt-1 ${subStatColor} drop-shadow-glow tabular`}>{subStat}</p>}
          </div>
      </motion.div>
  );
}

export function PulseNode({ top, left, right, bottom, color }: { top?: string, left?: string, right?: string, bottom?: string, color: string }) {
  return (
      <div style={{ top, left, right, bottom }} className="absolute w-4 h-4 rounded-full z-20 shadow-glow">
          <div className={`absolute inset-0 rounded-full animate-ping opacity-75 shadow-glow ${color}`} />
          <div className={`relative w-full h-full rounded-full shadow-2xl border border-white/40 ${color}`} />
      </div>
  );
}

export function CategoryStat({ label, value }: { label: string, value: string }) {
 return (
    <div className="text-left flex flex-col justify-center border-l border-white/10 pl-10 h-20">
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 italic opacity-60">{label}</p>
       <p className="text-4xl font-black italic text-white tracking-tighter leading-none tabular">{value}</p>
    </div>
 );
}

/**
 * StatBox - Multi-layered technical data node
 */
export function StatBox({ label, value, color, animate }: { label: string, value: string, color: string, animate?: boolean }) {
    return (
        <div className="glass p-10 rounded-[40px] border-white/5 space-y-6 hover:border-primary/40 transition-all text-left bg-white/[0.01] active-press shadow-2xl group">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-primary/20 group-hover:w-12 transition-all duration-700" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic leading-none opacity-60">{label}</p>
            </div>
            <div className="flex items-center gap-5">
                {animate && <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-glow shadow-secondary/40 border border-white/20" />}
                <p className={`text-6xl font-black italic tracking-tighter leading-none ${color} uppercase tabular drop-shadow-glow`}>{value}</p>
            </div>
        </div>
    );
}

export function AnalystRow({ analyst, rank }: any) {
    return (
        <div className="flex items-center justify-between p-6 rounded-[32px] glass border-white/5 hover:bg-white/[0.04] transition-all group cursor-pointer active-press shadow-lg bg-white/[0.01]">
            <div className="flex items-center gap-8">
                <span className="text-xl font-black italic text-slate-600 w-8 tabular">#{rank}</span>
                <div className="relative group/avatar">
                  <img src={analyst.image} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:scale-110 transition-transform shadow-xl" alt={analyst.name} />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-lg border-2 border-[#010206] shadow-glow" />
                </div>
                <div className="text-left space-y-1">
                    <p className="text-xl font-black italic uppercase tracking-tight text-white group-hover:text-primary transition-colors leading-none">{analyst.name}</p>
                    <p className="text-[10px] font-black text-secondary uppercase tracking-widest italic opacity-60">Verified Node Signal</p>
                </div>
            </div>
            <div className="text-right space-y-1 tabular">
                <p className="text-3xl font-black italic text-white leading-none tabular">{analyst.accuracy}%</p>
            </div>
        </div>
    );
}

export function TransactionRow({ tx }: { tx: any }) {
  return (
    <div className="flex items-center justify-between p-6 rounded-[32px] glass border-white/5 hover:bg-white/[0.02] transition-all group shadow-xl bg-white/[0.01] active-press">
        <div className="flex items-center gap-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${tx.type === 'topup' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                {tx.type === 'topup' ? <CheckCircle2 size={24}/> : <TrendingUp size={24}/>}
            </div>
            <div className="text-left space-y-1">
                <p className="text-xl font-black italic uppercase tracking-tight text-white group-hover:text-primary transition-colors leading-none">{tx.marketTitle}</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest italic opacity-40 tabular">{new Date(tx.timestamp).toLocaleString()}</p>
            </div>
        </div>
        <div className="text-right space-y-1 tabular">
            <p className={`text-2xl font-black italic leading-none ${tx.amount > 0 ? 'text-secondary drop-shadow-glow' : 'text-white'}`}>
                {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
            </p>
        </div>
    </div>
  )
}

export function MoverItem({ label, trend, positive }: { label: string, trend: string, positive?: boolean }) {
    return (
      <div className="flex items-center justify-between group cursor-pointer transition-all hover:translate-x-2 p-4 rounded-[20px] hover:bg-white/[0.02] text-left active-press">
         <div className="flex items-center gap-5">
            <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shadow-lg transition-all group-hover:scale-110 ${positive ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-crimson/10 text-crimson border border-crimson/20'}`}>
              <TrendingUp size={20} className={positive ? '' : 'rotate-180'} />
            </div>
            <span className="text-base font-black italic tracking-tight text-white/80 group-hover:text-primary transition-colors uppercase leading-none">{label}</span>
         </div>
         <div className="text-right tabular">
              <span className={`text-lg font-black ${positive ? 'text-secondary drop-shadow-glow' : 'text-crimson'} italic leading-none`}>{trend}</span>
         </div>
      </div>
    );
}

export function Comment({ user, text }: { user: string, text: string }) {
    return (
       <div className="glass p-6 rounded-[28px] border-white/5 space-y-4 hover:border-primary/40 transition-all text-left group shadow-xl bg-white/[0.01] active-press">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic flex items-center gap-2">@ {user} <CheckCircle2 size={12} className="opacity-40" /></p>
          <p className="text-base text-slate-300 font-medium leading-relaxed italic group-hover:text-white transition-colors">&quot;{text}&quot;</p>
       </div>
    )
}

export function PodiumCard({ analyst, rank, color, featured, h }: any) {
    return (
        <motion.div
          whileHover={{ y: -15, scale: 1.02 }}
          className={`glass rounded-[56px] border-white/5 flex flex-col items-center justify-end p-10 pb-16 relative overflow-hidden transition-all duration-700 hover:shadow-3xl bg-white/[0.01] active-press ${h} ${featured ? 'border-primary/40 z-10 shadow-[0_0_100px_rgba(59,130,246,0.1)]' : 'opacity-60'} text-left`}
        >
             <div className="absolute top-10 left-10 text-[120px] font-black italic opacity-[0.03] text-white">#{rank}</div>
             <div className="relative mb-12">
                <div className={`absolute -top-4 -right-4 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-3xl z-10 border-4 border-[#010206]`} style={{ backgroundColor: color, color: '#010206' }}>
                    {rank === 1 ? <Crown size={28}/> : rank}
                </div>
                <img src={analyst.image} className={`w-44 h-44 rounded-[56px] object-cover border-4 ${featured ? 'border-primary shadow-glow scale-110' : 'border-white/10 shadow-xl'}`} alt={analyst.name} />
             </div>
             <div className="text-center space-y-6">
                <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none">{analyst.name}</h4>
                <div className="space-y-1">
                    <p className="text-7xl font-black italic tracking-tighter leading-none tabular drop-shadow-glow" style={{ color }}>{analyst.accuracy}%</p>
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic opacity-40">Precision</p>
                </div>
             </div>
        </motion.div>
    )
}

export function InsightDetailItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex gap-10 items-start group text-left p-6 rounded-[40px] hover:bg-white/[0.01] transition-all border border-transparent hover:border-white/10">
            <div className="w-20 h-20 rounded-[28px] glass flex items-center justify-center border-white/5 bg-white/[0.01] shadow-xl group-hover:scale-110 group-hover:border-primary/40 transition-all duration-700 shrink-0">
                {icon}
            </div>
            <div className="space-y-3 pt-2">
                <h4 className="text-5xl font-black italic tracking-tighter uppercase text-white leading-none group-hover:text-primary transition-colors">{title}</h4>
                <p className="text-xl text-slate-400 font-medium italic leading-relaxed opacity-80">{desc}</p>
            </div>
        </div>
    )
}

export function WalletOption({ label, description, active }: { label: string, description: string, active?: boolean }) {
    return (
      <button className={`w-full flex items-center justify-between p-8 rounded-[40px] transition-all border-2 active-press ${active ? 'bg-primary/10 border-primary shadow-glow' : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-primary/30'} text-left`}>
         <div className="flex items-center gap-8">
            <div className={`w-14 h-14 rounded-[22px] bg-[#010206] flex items-center justify-center border border-white/10 shadow-inner`}>
               {active ? <ShieldCheck size={28} className="text-primary drop-shadow-glow" /> : <Wallet size={28} className="opacity-30" />}
            </div>
            <div className="text-left space-y-1">
               <p className="font-black italic uppercase tracking-tighter text-2xl leading-none text-white">{label}</p>
               <p className="text-[10px] font-black opacity-40 uppercase tracking-widest italic leading-none">{description}</p>
            </div>
         </div>
         {active && <CheckCircle2 size={24} className="text-secondary" />}
      </button>
    );
}

export function SettingItem({ label, active }: { label: string, active?: boolean }) {
    return (
      <div className="flex items-center justify-between group p-4 rounded-[20px] hover:bg-white/[0.02] transition-all text-left active-press">
         <span className="text-base font-bold italic text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">{label}</span>
         <div className={`w-14 h-7 rounded-full p-1.5 transition-all cursor-pointer ${active ? 'bg-primary' : 'bg-white/10 shadow-inner'}`}>
            <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${active ? 'translate-x-7' : 'translate-x-0 opacity-40'}`} />
         </div>
      </div>
    );
}
