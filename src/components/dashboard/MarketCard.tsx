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

/**
 * MarketCard - Fully Replicated Design from Image
 * Implements: Tabular numbers, Custom Easings, Tactile Click
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
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className="glass group cursor-pointer hover:border-primary/40 relative overflow-hidden h-[420px] flex flex-col p-8 transition-all duration-500 shadow-2xl bg-white/[0.01] rounded-[32px] border border-white/5 text-left active-press"
    >
      <div className="flex justify-between items-start mb-8 relative z-10">
         <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5 shadow-inner">
            <span className="text-xl grayscale group-hover:grayscale-0 transition-all duration-1000">{icon}</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-primary transition-colors italic leading-none">{category}</span>
         </div>
         <button className="text-slate-500 hover:text-white transition-colors p-1 active-press"><MoreVertical size={18} /></button>
      </div>

      <div onClick={onClick} className="flex-1 relative z-10 flex flex-col">
         <h4 className="text-2xl font-black italic leading-[1.1] mb-6 line-clamp-3 group-hover:text-primary transition-colors tracking-tighter uppercase text-white min-h-[3.3rem]">
           {title}
         </h4>

         <div className="flex items-center gap-3 mb-2 tabular">
            <p className="text-6xl font-black italic tracking-tighter leading-none text-secondary drop-shadow-glow">{percentage}%</p>
            <span className="text-xs font-black uppercase text-slate-500 tracking-widest pb-1 italic opacity-60">YES</span>
         </div>

         <div className={`flex items-center gap-2 font-black text-[10px] uppercase italic tracking-widest leading-none tabular ${trend.includes('+') ? 'text-secondary' : 'text-crimson'}`}>
            <TrendingUp size={14} className={trend.includes('+') ? '' : 'rotate-180'} />
            {trend}
         </div>
      </div>

      {/* CHART SECTION FROM IMAGE */}
      <div className="h-28 w-full relative mb-6 overflow-hidden rounded-2xl bg-white/[0.01] border border-white/5 shadow-inner">
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
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10 text-slate-500">
          <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                  <Users size={16} className="opacity-60" />
                  <span className="text-[10px] font-black uppercase tracking-widest tabular">{volume.split(' ')[0]} forecasts</span>
              </div>
              <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="opacity-60" />
                  <span className="text-[10px] font-black uppercase tracking-widest tabular">{comments}</span>
              </div>
          </div>
          <div className="flex -space-x-1.5">
              {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/150?u=${i+10}`} className="w-6 h-6 rounded-full border border-[#010206] object-cover" alt="User" />)}
              <div className="w-6 h-6 rounded-full border border-[#010206] bg-white/5 flex items-center justify-center text-[8px] font-black italic">+8</div>
          </div>
      </div>
    </motion.div>
  );
}
