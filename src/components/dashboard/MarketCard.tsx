"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare, MoreVertical, Zap } from 'lucide-react';
import { Market } from '@/types/market';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface MarketCardProps extends Market {
  onClick: () => void;
  onQuickBet: () => void;
}

/**
 * MarketCard - High-Density Analytical Node
 * Implements Concentric Radius: Outer 32px, Content 24px, Inner 16px
 */
export function MarketCard({
  title,
  category,
  percentage,
  trend,
  color,
  chartData,
  volume,
  comments,
  onClick,
  icon,
}: MarketCardProps) {
  const data = chartData.map((val, i) => ({ time: i, value: val }));

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className="glass group cursor-pointer hover:border-primary/40 relative overflow-hidden h-[450px] flex flex-col p-10 transition-all duration-500 shadow-3xl bg-probix-surface/40 dark:bg-[#0A0C12]/40 rounded-[32px] border-probix-border dark:border-white/5 text-left active-press"
    >
      {/* Glare Effect */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="flex justify-between items-start mb-12 relative z-10">
         <div className="flex items-center gap-5 bg-probix-bg dark:bg-white/5 px-6 py-3 rounded-2xl border border-probix-border dark:border-white/5 shadow-inner">
            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110">{icon}</span>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-probix-muted group-hover:text-primary transition-colors italic leading-none">{category}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest text-secondary italic opacity-80">Sync Active</span>
              </div>
            </div>
         </div>
         <button className="text-probix-muted hover:text-primary transition-colors p-2 active-press"><MoreVertical size={24} /></button>
      </div>

      <div onClick={onClick} className="flex-1 relative z-10 flex flex-col">
         <h4 className="text-3xl font-black italic leading-[1.05] mb-8 line-clamp-2 group-hover:text-primary transition-colors tracking-tighter uppercase text-probix-text dark:text-white min-h-[4rem]">
           {title}
         </h4>

         <div className="flex items-center gap-6 mb-4 tabular">
            <p className="text-[80px] font-black italic tracking-tighter leading-none text-secondary drop-shadow-glow">{percentage}%</p>
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-black uppercase text-probix-muted tracking-widest italic opacity-60 leading-none">Weight</span>
              <div className={`flex items-center gap-1.5 font-black text-[11px] uppercase italic tracking-widest leading-none ${trend.includes('+') ? 'text-secondary' : 'text-crimson'}`}>
                  <TrendingUp size={16} className={trend.includes('+') ? '' : 'rotate-180'} />
                  {trend}
              </div>
            </div>
         </div>
      </div>

      <div className="h-28 w-full relative mb-10 overflow-hidden rounded-2xl bg-probix-bg/30 dark:bg-white/[0.01] border border-probix-border dark:border-white/5 shadow-inner">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${title.slice(0,3)}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={4}
                fillOpacity={1}
                fill={`url(#grad-${title.slice(0,3)})`}
                animationDuration={2500}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-probix-border dark:border-white/5 relative z-10 text-probix-muted">
          <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                  <Users size={20} className="opacity-60 text-primary" />
                  <span className="text-xs font-black uppercase tracking-widest tabular">{volume.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-3">
                  <MessageSquare size={20} className="opacity-60 text-secondary" />
                  <span className="text-xs font-black uppercase tracking-widest tabular">{comments}</span>
              </div>
          </div>
          <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="relative group/avatar">
                  <img src={`https://i.pravatar.cc/150?u=${i+10}`} className="w-10 h-10 rounded-full border-2 border-probix-bg dark:border-[#0A0C12] object-cover hover:scale-125 transition-transform relative z-10 shadow-2xl" alt="Analyst" />
                  <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover/avatar:scale-150 transition-all duration-500" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-probix-bg dark:border-[#0A0C12] bg-probix-surface dark:bg-white/5 flex items-center justify-center text-[10px] font-black italic text-probix-text dark:text-white relative z-20 shadow-xl">+8</div>
          </div>
      </div>

      {/* Interactive Hub Label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl">
              <Zap size={10} className="text-primary animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-primary italic">Enter Node</span>
          </div>
      </div>
    </motion.div>
  );
}
