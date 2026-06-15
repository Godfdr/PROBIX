"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare, MoreVertical } from 'lucide-react';
import { Market } from '@/types/market';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface MarketCardProps extends Market {
  onClick: () => void;
  onQuickBet: () => void;
}

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
  onQuickBet
}: MarketCardProps) {
  const data = chartData.map((val, i) => ({ time: i, value: val }));

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      className="glass group cursor-pointer hover:border-white/20 relative overflow-hidden h-[420px] flex flex-col p-6 transition-all duration-500 shadow-2xl bg-probix-surface dark:bg-[#0A0C12]/40 rounded-[28px] border-white/5 text-left"
    >
      <div className="flex justify-between items-start mb-6 relative z-10">
         <div className="flex items-center gap-2.5 bg-probix-bg dark:bg-white/5 px-3 py-1.5 rounded-lg border border-probix-border dark:border-white/5">
            <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{icon}</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-probix-muted group-hover:text-probix-text dark:group-hover:text-white transition-colors">{category}</span>
         </div>
         <button className="text-probix-muted hover:text-probix-text dark:hover:text-white transition-colors p-1"><MoreVertical size={16} /></button>
      </div>

      <div onClick={onClick} className="flex-1 relative z-10 flex flex-col">
         <h4 className="text-xl font-black italic leading-[1.1] mb-4 line-clamp-3 group-hover:text-primary transition-colors tracking-tighter uppercase text-probix-text dark:text-white min-h-[3.3rem]">
           {title}
         </h4>

         <div className="flex items-center gap-2.5 mb-1">
            <p className="text-5xl font-black italic tracking-tighter leading-none" style={{ color }}>{percentage}%</p>
            <span className="text-[10px] font-black uppercase text-probix-muted tracking-widest pb-0.5 italic opacity-60">YES</span>
         </div>

         <div className={`flex items-center gap-1.5 font-black text-[9px] uppercase italic tracking-widest leading-none ${trend.includes('+') ? 'text-secondary' : 'text-crimson'}`}>
            <TrendingUp size={12} className={trend.includes('+') ? '' : 'rotate-180'} />
            {trend}
         </div>
      </div>

      <div className="h-20 w-full relative mb-4">
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
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#grad-${title.slice(0,3)})`}
                animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10 text-probix-muted">
          <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                  <Users size={14} className="opacity-60" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{volume.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="opacity-60" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{comments}</span>
              </div>
          </div>
          <div className="flex -space-x-2">
              {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/150?u=${i+10}`} className="w-6 h-6 rounded-full border border-[#0A0C12] object-cover" />)}
              <div className="w-6 h-6 rounded-full border border-[#0A0C12] bg-white/5 flex items-center justify-center text-[8px] font-black italic">+8</div>
          </div>
      </div>
    </motion.div>
  );
}
