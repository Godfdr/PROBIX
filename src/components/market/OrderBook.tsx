"use client";

import React from 'react';

export function OrderBook() {
  const [jitter, setJitter] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
        setJitter(Math.random());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const bids = React.useMemo(() => [
    { price: (0.68 + (jitter * 0.01)).toFixed(2), size: (1.2 + jitter).toFixed(1) + 'k', type: 'bid' },
    { price: (0.67 + (jitter * 0.005)).toFixed(2), size: (2.5 - jitter).toFixed(1) + 'k', type: 'bid' },
    { price: '0.65', size: '4.8k', type: 'bid' },
  ], [jitter]);

  const asks = React.useMemo(() => [
    { price: (0.70 - (jitter * 0.01)).toFixed(2), size: (0.8 + jitter).toFixed(1) + 'k', type: 'ask' },
    { price: (0.71 - (jitter * 0.005)).toFixed(2), size: (1.5 + jitter).toFixed(1) + 'k', type: 'ask' },
    { price: '0.73', size: '3.2k', type: 'ask' },
  ], [jitter]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-black text-probix-muted uppercase tracking-[0.2em]">Price</span>
        <span className="text-[10px] font-black text-probix-muted uppercase tracking-[0.2em]">Size (₦)</span>
      </div>

      <div className="space-y-1">
        {asks.reverse().map((ask, i) => (
          <div key={i} className="flex justify-between items-center px-2 py-1 rounded-lg hover:bg-white/[0.02] transition-colors group relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 bg-crimson/5 group-hover:bg-crimson/10 transition-colors" style={{ width: `${(i+1)*20}%` }} />
            <span className="text-xs font-black text-crimson italic relative z-10">{ask.price}</span>
            <span className="text-xs font-bold text-probix-muted italic relative z-10">{ask.size}</span>
          </div>
        ))}
      </div>

      <div className="h-px bg-white/5 my-2" />

      <div className="space-y-1">
        {bids.map((bid, i) => (
          <div key={i} className="flex justify-between items-center px-2 py-1 rounded-lg hover:bg-white/[0.02] transition-colors group relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors" style={{ width: `${(3-i)*25}%` }} />
            <span className="text-xs font-black text-secondary italic relative z-10">{bid.price}</span>
            <span className="text-xs font-bold text-probix-muted italic relative z-10">{bid.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
