"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, Heart, Share, ShieldCheck, Wallet, Crown } from 'lucide-react';

interface GlassBadgeProps {
  icon: React.ReactNode;
  color: string;
  text: string;
  stat: string;
  statColor: string;
}

export function GlassBadge({ icon, color, text, stat, statColor }: GlassBadgeProps) {
  return (
      <div className={`glass p-4 rounded-[24px] border-l-[4px] ${color} shadow-3xl flex items-center gap-5 min-w-[240px] z-30 group cursor-pointer hover:scale-110 transition-all duration-500 border-white/5 text-left`}>
          <div className="w-11 h-11 rounded-[18px] flex items-center justify-center bg-white/5 border border-white/5 shadow-inner group-hover:bg-white/10 transition-colors">
              {icon}
          </div>
          <div className="text-left flex-1 min-w-0">
              <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1.5 leading-none truncate">{text}</p>
              <p className={`text-xl font-black italic tracking-tighter leading-none ${statColor} drop-shadow-glow`}>{stat}</p>
          </div>
      </div>
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
      <div style={{ top, left, right, bottom }} className="absolute w-3 h-3 rounded-full z-20">
          <div className={`absolute inset-0 rounded-full animate-ping opacity-75 shadow-glow shadow-white/20 ${color}`} />
          <div className={`relative w-full h-full rounded-full shadow-glow border border-white/20 ${color}`} />
      </div>
  );
}

interface CategoryStatProps {
  label: string;
  value: string;
}

export function CategoryStat({ label, value }: CategoryStatProps) {
 return (
    <div className="text-right flex flex-col justify-center border-l border-white/5 pl-10 h-20 text-left">
       <p className="text-[11px] font-black text-probix-muted uppercase tracking-[0.3em] mb-2 italic">{label}</p>
       <p className="text-5xl font-black italic text-white tracking-tighter leading-none shadow-glow shadow-primary/5">{value}</p>
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
      <div className="flex items-start gap-5 p-5 rounded-[24px] hover:bg-white/[0.04] transition-all cursor-pointer group border border-transparent hover:border-white/5 shadow-inner text-left">
          <div className="w-10 h-10 rounded-[18px] bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:shadow-glow group-hover:scale-110 transition-all duration-500 shadow-xl">{icon}</div>
          <div className="min-w-0 text-left space-y-1">
              <p className="text-sm font-black italic uppercase leading-none text-white/90 group-hover:text-primary transition-colors">{title}</p>
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

export function MoverItem({ label, trend, positive }: MoverItemProps) {
return (
  <div className="flex items-center justify-between group cursor-pointer transition-all hover:translate-x-2 p-3 rounded-2xl hover:bg-white/[0.02] text-left">
     <div className="flex items-center gap-6 text-left">
        <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shadow-xl ${positive ? 'bg-secondary/10 border border-secondary/20' : 'bg-crimson/10 border border-crimson/20'}`}>
          <TrendingUp size={24} className={positive ? 'text-secondary shadow-glow shadow-secondary/20' : 'text-crimson rotate-180'} />
        </div>
        <span className="text-lg font-black italic tracking-tight text-probix-text/80 group-hover:text-probix-text transition-colors uppercase leading-none text-white">{label}</span>
     </div>
     <div className="text-right">
          <span className={`text-base font-black ${positive ? 'text-secondary shadow-glow shadow-secondary/10' : 'text-crimson'} italic leading-none`}>{trend}</span>
          <p className="text-[9px] font-black uppercase text-probix-muted opacity-40 mt-1.5 tracking-widest">Velocity</p>
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
    <div className="glass p-6 rounded-[28px] border-white/5 space-y-3 hover:border-primary/30 transition-all text-left group shadow-xl bg-white/[0.01]">
       <div className="flex items-center justify-between"><p className="text-[11px] font-black text-primary uppercase tracking-[0.2em] italic flex items-center gap-2 leading-none">@ {user} <CheckCircle2 size={12} className="opacity-40" /></p> <span className="text-[10px] font-black text-probix-muted opacity-30 uppercase tracking-widest">Just Now</span></div>
       <p className="text-base text-[#F9FAFB]/90 font-medium leading-relaxed italic group-hover:text-white transition-colors">&quot;{text}&quot;</p>
       <div className="flex gap-4 pt-2 opacity-0 group-hover:opacity-40 transition-opacity">
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white"><Heart size={14}/> Like</button>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white"><Share size={14}/> Share</button>
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
  <button className={`w-full flex items-center justify-between p-10 rounded-[40px] transition-all border-2 ${active ? 'bg-primary/10 border-primary text-probix-text shadow-[0_0_50px_rgba(59,130,246,0.2)]' : 'bg-[#0A0C12] border-white/5 text-probix-muted hover:border-white/20'} text-left`}>
     <div className="flex items-center gap-10">
        <div className={`w-20 h-20 rounded-[32px] bg-[#020308] flex items-center justify-center border border-white/10 shadow-inner ${active ? 'shadow-primary/20' : ''}`}>
           {active ? <ShieldCheck size={36} className="text-primary shadow-glow shadow-primary/20" /> : <Wallet size={36} className="opacity-40" />}
        </div>
        <div className="text-left space-y-2">
           <p className="font-black italic uppercase tracking-tighter text-3xl leading-none mb-1 text-white">{label}</p>
           <p className="text-sm font-bold opacity-60 uppercase tracking-widest italic leading-none">{description}</p>
        </div>
     </div>
     {active ? (
      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-white shadow-3xl shadow-secondary/40 border-4 border-[#010206] scale-110">
          <CheckCircle2 size={32}/>
      </div>
     ) : (
      <div className="w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-white/30 transition-all" />
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
  <div className="flex items-center justify-between group p-3 rounded-2xl hover:bg-white/[0.02] transition-all text-left">
     <span className="text-lg font-bold italic text-probix-muted group-hover:text-probix-text transition-colors uppercase tracking-tight">{label}</span>
     <div className={`w-16 h-8 rounded-full p-1.5 transition-all cursor-pointer ${active ? 'bg-primary shadow-glow shadow-primary/40' : 'bg-white/10 shadow-inner'}`}>
        <div className={`w-5 h-5 rounded-full bg-white transition-all duration-500 shadow-xl ${active ? 'translate-x-8 scale-110 shadow-primary/50' : 'translate-x-0 opacity-40'}`} />
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

export function PodiumCard({ analyst, rank, color, featured, h }: PodiumCardProps) {
  return (
      <motion.div
        whileHover={{ y: -20, scale: 1.05 }}
        className={`glass rounded-[48px] border-white/5 flex flex-col items-center justify-end p-10 pb-16 relative overflow-hidden transition-all duration-700 hover:shadow-glow hover:bg-white/[0.02] ${h} ${featured ? 'border-primary/30 z-10 shadow-[0_0_80px_rgba(59,130,246,0.15)]' : 'opacity-60 hover:opacity-100'} text-left`}
      >
           <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-48 h-48 blur-[100px] opacity-10" style={{ backgroundColor: color }} />
           <div className="absolute top-8 left-8 text-8xl font-black italic opacity-5 text-white">#{rank}</div>

           <div className="relative mb-10">
              <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-3xl z-10 border-4 border-[#010206]`} style={{ backgroundColor: color, color: '#010206' }}>
                  {rank === 1 ? <Crown size={24}/> : rank}
              </div>
              <img src={analyst.image} className={`w-36 h-36 rounded-[48px] object-cover border-4 ${featured ? 'border-primary shadow-glow scale-110' : 'border-white/10 shadow-xl'}`} alt={analyst.name} />
           </div>

           <div className="text-center space-y-6">
              <div className="space-y-1">
                <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none">{analyst.name}</h4>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">PRO ANALYST NODE</p>
              </div>
              <div className="space-y-1">
                  <p className="text-6xl font-black italic tracking-tighter leading-none" style={{ color }}>{analyst.accuracy}%</p>
                  <p className="text-[11px] font-black text-probix-muted uppercase tracking-widest italic opacity-60">Session Accuracy</p>
              </div>
              <div className="flex gap-6 pt-6 justify-center border-t border-white/5">
                   <div className="text-center">
                       <p className="text-[9px] font-black text-probix-muted uppercase tracking-widest leading-none mb-1">Experience</p>
                       <p className="text-xl font-black text-white italic">{analyst.xp} XP</p>
                   </div>
                   <div className="w-px h-8 bg-white/10 my-auto" />
                   <div className="text-center">
                       <p className="text-[9px] font-black text-probix-muted uppercase tracking-widest leading-none mb-1">Velocity</p>
                       <p className="text-xl font-black text-secondary italic">{analyst.trend}</p>
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
      <div className="flex gap-10 items-start group text-left">
          <div className="w-20 h-20 rounded-[32px] glass flex items-center justify-center border border-white/5 bg-white/[0.01] shadow-xl group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500 shrink-0">
              {icon}
          </div>
          <div className="space-y-4 text-left">
              <h4 className="text-4xl font-black italic tracking-tighter uppercase text-white">{title}</h4>
              <p className="text-xl text-probix-muted font-bold italic leading-relaxed opacity-80">{desc}</p>
          </div>
      </div>
  )
}

interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
}

export function ActionCard({ icon, label }: ActionCardProps) {
  return (
      <div className="glass p-10 rounded-[40px] border-white/5 flex flex-col items-center gap-6 hover:bg-white/[0.02] hover:border-primary/20 transition-all group text-left">
          <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary group-hover:shadow-glow group-hover:scale-110 transition-all">
              {icon}
          </div>
          <p className="text-lg font-black italic uppercase tracking-widest text-probix-muted group-hover:text-white transition-colors">{label}</p>
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

export function TransactionRow({ tx }: TransactionRowProps) {
  return (
    <div className="flex items-center justify-between p-6 rounded-[28px] glass border-white/5 hover:bg-white/[0.02] transition-all group shadow-xl bg-white/[0.01]">
        <div className="flex items-center gap-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'topup' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                {tx.type === 'topup' ? <CheckCircle2 size={24}/> : <TrendingUp size={24}/>}
            </div>
            <div className="text-left">
                <p className="text-lg font-black italic uppercase tracking-tight text-white group-hover:text-primary transition-colors leading-none mb-1">{tx.marketTitle}</p>
                <p className="text-[10px] font-bold text-probix-muted uppercase tracking-widest italic opacity-60">{new Date(tx.timestamp).toLocaleString()}</p>
            </div>
        </div>
        <div className="text-right">
            <p className={`text-xl font-black italic leading-none mb-1 ${tx.amount > 0 ? 'text-secondary' : 'text-white'}`}>
                {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
            </p>
            <p className="text-[9px] font-black uppercase text-probix-muted tracking-widest opacity-40 italic">TX: {tx.id.slice(-6)}</p>
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

export function AnalystRow({ analyst, rank }: AnalystRowProps) {
    return (
        <div className="flex items-center justify-between p-5 rounded-[24px] glass border-white/5 hover:bg-white/[0.04] transition-all group cursor-pointer">
            <div className="flex items-center gap-5">
                <span className="text-xs font-black italic text-probix-muted opacity-30 w-6">#{rank}</span>
                <img src={analyst.image} className="w-12 h-12 rounded-xl object-cover border border-white/10 group-hover:scale-110 transition-transform" alt={analyst.name} />
                <div className="text-left">
                    <p className="text-sm font-black italic uppercase text-white group-hover:text-primary transition-colors">{analyst.name}</p>
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest italic opacity-60">Verified Signal</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-black italic text-white leading-none mb-1">{analyst.accuracy}%</p>
                <p className="text-[9px] font-black text-secondary uppercase tracking-widest italic">{analyst.trend}</p>
            </div>
        </div>
    );
}

interface ActivityItemProps {
  user: string;
  action: string;
  market: string;
  amount: string;
  type: string;
}

export function ActivityItem({ user, action, market, amount, type }: ActivityItemProps) {
    return (
      <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors px-6 rounded-2xl group">
        <div className="flex items-center gap-5">
          <div className="w-10 h-10 rounded-xl bg-probix-surface-alt border border-white/10 flex items-center justify-center text-[10px] font-black italic text-primary group-hover:scale-110 transition-transform">
            {user.slice(0, 2).toUpperCase()}
          </div>
          <div className="text-sm">
            <span className="font-black italic text-text-secondary tracking-widest uppercase text-[10px] opacity-60">{user}</span>
            <span className="mx-3 text-probix-muted font-bold italic opacity-40 uppercase text-[9px] tracking-widest">{action}</span>
            <span className="font-black italic text-white uppercase tracking-tight">{market}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-black italic tracking-tighter text-white">{amount}</p>
          <p className={`text-[9px] font-black uppercase tracking-[0.2em] italic ${type === 'Yes' ? 'text-secondary drop-shadow-glow' : 'text-crimson'}`}>{type}</p>
        </div>
      </div>
    );
}

interface StatBoxProps {
  label: string;
  value: string;
  color: string;
  animate?: boolean;
}

export function StatBox({ label, value, color, animate }: StatBoxProps) {
    return (
        <div className="glass p-8 rounded-[32px] border-white/5 space-y-3 hover:border-white/10 transition-all text-left">
            <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.4em] italic leading-none">{label}</p>
            <div className="flex items-center gap-3">
                {animate && <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-glow shadow-secondary/40" />}
                <p className={`text-4xl font-black italic tracking-tighter leading-none ${color} uppercase`}>{value}</p>
            </div>
        </div>
    );
}
