"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Market } from '@/types/market';
import { Button } from '@/components/ui/Button';

interface MarketCardProps {
  market: Market;
  onClick: () => void;
}

export const MarketCard = ({ market, onClick }: MarketCardProps) => {
  return (
    <motion.div
      layoutId={`market-${market.id}`}
      onClick={onClick}
      className="glass rounded-[32px] p-6 hover:border-primary/30 transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center text-2xl border border-white/5 group-hover:border-primary/20 transition-colors">
          {market.image}
        </div>
        <div className="text-right">
          <p className="text-[10px] text-text-600 font-black uppercase tracking-[0.1em]">Volume</p>
          <p className="text-sm font-black text-text-200">₦{(market.volume / 1000).toFixed(0)}K</p>
        </div>
      </div>

      <span className="text-[10px] font-black tracking-widest text-primary uppercase mb-3 px-2 py-0.5 rounded-md bg-primary/10 self-start border border-primary/10">
        {market.category}
      </span>

      <h3 className="font-bold text-lg leading-tight mb-8 min-h-[3rem] group-hover:text-primary transition-colors line-clamp-2">
        {market.title}
      </h3>

      <div className="mt-auto flex gap-2.5">
        <Button variant="success" className="flex-1 flex-col py-3.5 h-auto">
          <span className="text-[9px] uppercase tracking-widest opacity-50 mb-0.5">Yes</span>
          <span className="text-lg font-black italic">{(market.yesPrice * 100).toFixed(0)}¢</span>
        </Button>
        <Button variant="danger" className="flex-1 flex-col py-3.5 h-auto">
          <span className="text-[9px] uppercase tracking-widest opacity-50 mb-0.5">No</span>
          <span className="text-lg font-black italic">{(market.noPrice * 100).toFixed(0)}¢</span>
        </Button>
      </div>
    </motion.div>
  );
};
