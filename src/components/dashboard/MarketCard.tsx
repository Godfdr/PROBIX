"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare } from 'lucide-react';
import { Market } from '@/types/market';

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
  volume,
  comments,
  onClick,
}: MarketCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer text-left"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{category}</span>
        <div className={`flex items-center gap-1 text-[10px] font-bold ${trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
          <TrendingUp size={12} className={trend.includes('+') ? '' : 'rotate-180'} />
          {trend}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-6 line-clamp-2 leading-tight">{title}</h3>

      <div className="flex items-center gap-2 mb-6">
        <p className="text-4xl font-black italic tracking-tighter" style={{ color }}>{percentage}%</p>
        <span className="text-xs font-bold text-slate-400 uppercase">Yes</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users size={14} />
            <span className="text-[10px] font-bold">{volume.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageSquare size={14} />
            <span className="text-[10px] font-bold">{comments}</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-black">+8</div>
      </div>
    </motion.div>
  );
}
