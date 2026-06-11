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
      className="glass group cursor-pointer hover:border-white/20 relative overflow-hidden h-[450px] flex flex-col p-8 transition-all duration-500 shadow-2xl bg-[#0A0C12]/40 rounded-[32px] border-white/5 text-left"
    >
      <div className="flex justify-between items-start mb-8 relative z-10">
         <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-probix-muted group-hover:text-white transition-colors">{category}</span>
         </div>
         <button className="text-probix-muted hover:text-white transition-colors p-1"><MoreVertical size={18} /></button>
      </div>

      <div onClick={onClick} className="flex-1 relative z-10 flex flex-col">
         <h4 className="text-2xl font-black italic leading-[1.1] mb-6 line-clamp-3 group-hover:text-primary transition-colors tracking-tighter uppercase text-white min-h-[4.5rem]">
           {title}
         </h4>

         <div className="flex items-center gap-3 mb-2">
            <p className="text-6xl font-black italic tracking-tighter leading-none" style={{ color }}>{percentage}%</p>
            <span className="text-xs font-black uppercase text-probix-muted tracking-widest pb-1 italic opacity-60">YES</span>
         </div>

         <div className={`flex items-center gap-2 font-black text-[10px] uppercase italic tracking-widest leading-none ${trend.includes('+') ? 'text-secondary' : 'text-crimson'}`}>
            <TrendingUp size={14} className={trend.includes('+') ? '' : 'rotate-180'} />
            {trend}
         </div>
      </div>

      <div className="h-24 w-full relative mb-6">
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
