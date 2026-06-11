"use client";

import React from 'react';
import { MarketCard } from '@/components/dashboard/MarketCard';
import { Market } from '@/types/market';

interface MarketGridProps {
  markets: Market[];
  onMarketClick: (market: Market) => void;
  onQuickBet: (market: Market) => void;
}

export const MarketGrid = ({ markets, onMarketClick, onQuickBet }: MarketGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-1">
      {markets.map((market) => (
        <MarketCard
          key={market.id}
          {...market}
          onClick={() => onMarketClick(market)}
          onQuickBet={() => onQuickBet(market)}
        />
      ))}
    </div>
  );
};
