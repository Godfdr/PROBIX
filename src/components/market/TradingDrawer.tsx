"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Zap, X, ChevronDown } from 'lucide-react';
import { Market } from '@/types/market';
import { Button } from '@/components/ui/Button';
import { useProbix } from '@/store/ProbixContext';
import { toast } from 'sonner';
import { OrderBook } from './OrderBook';

export const TradingDrawer = ({ market, onClose }: { market: Market | null; onClose: () => void }) => {
  const { addPosition, balance } = useProbix();
  const [tradeAmount, setAmount] = useState("");
  const [side, setSide] = useState<'yes' | 'no'>('yes');
  const [isExecuting, setIsExecuting] = useState(false);

  // Use useMemo to avoid calculations if market is null
  const { currentPrice, potentialPayout, roi } = useMemo(() => {
    if (!market) return { currentPrice: 0, potentialPayout: "0.00", roi: "0.0" };
    const price = side === 'yes' ? market.yesPrice : market.noPrice;
    const payout = tradeAmount && !isNaN(parseFloat(tradeAmount)) ? (parseFloat(tradeAmount) * (1 / price)).toFixed(2) : "0.00";
    const calculatedRoi = ((1 / price - 1) * 100).toFixed(1);
    return { currentPrice: price, potentialPayout: payout, roi: calculatedRoi };
  }, [market, side, tradeAmount]);

  if (!market) return null;

  const handleExecute = () => {
    const amt = parseFloat(tradeAmount);
    if (isNaN(amt) || amt <= 0) return;

    setIsExecuting(true);
    // Simulate order matching
    const matchingToast = toast.loading('Matching order nodes...', {
        description: `Searching liquidity for ₦${amt.toLocaleString()}...`
    });

    setTimeout(() => {
      toast.dismiss(matchingToast);
      addPosition(market, side, amt);
      setIsExecuting(false);
      toast.success('Node established successfully', {
        description: `Verified ${side.toUpperCase()} position on Base Terminal.`,
      });
      onClose();
    }, 2000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200]"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-probix-900 border-l border-white/10 z-[210] p-8 flex flex-col shadow-2xl"
      >
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              {market.category}
            </span>
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="w-10 h-10">
            <X size={20} />
          </Button>
        </div>

        <h2 className="text-3xl font-black italic tracking-tighter leading-[1.1] mb-10">
          {market.title}
        </h2>

        <div className="bg-probix-800 rounded-[32px] p-7 border border-white/5 mb-8 shadow-inner">
          <div className="mb-8">
            <p className="text-[10px] font-black text-probix-muted uppercase tracking-[0.4em] mb-4 italic">Order Depth</p>
            <OrderBook />
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-sm font-bold text-text-400">Winning Outcome</span>
            <div className="flex p-1 bg-probix-900 rounded-2xl border border-white/5">
              <button
                onClick={() => setSide('yes')}
                className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                  side === 'yes' ? "bg-secondary text-black shadow-lg" : "text-text-600"
                }`}
              >
                YES
              </button>
              <button
                onClick={() => setSide('no')}
                className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                  side === 'no' ? "bg-crimson text-white shadow-lg" : "text-text-600"
                }`}
              >
                NO
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs font-black text-text-600 uppercase tracking-widest">Amount to trade</span>
              <span className="text-xs font-bold text-text-400">Bal: ₦{balance.toLocaleString()}</span>
            </div>
            <div className="relative group">
              <input
                type="number"
                placeholder="0.00"
                value={tradeAmount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-probix-950 border border-white/10 rounded-2xl py-7 px-8 text-4xl font-black focus:border-primary/50 outline-none transition-all placeholder:text-text-600 group-hover:border-white/20"
              />
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-text-400 font-black text-2xl italic tracking-tighter">NGN</span>
            </div>
          </div>

          <div className="mt-10 space-y-4 pt-6 border-t border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-600 font-bold uppercase tracking-tight">Potential Payout</span>
              <span className="text-xl font-black text-secondary italic">₦{potentialPayout}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-600 font-bold uppercase tracking-tight">Estimated ROI</span>
              <span className="text-xl font-black text-primary italic">+{roi}%</span>
            </div>
          </div>
        </div>

        <Button
          disabled={!tradeAmount || isExecuting || parseFloat(tradeAmount) > balance}
          size="lg"
          className="w-full !py-6 text-xl font-black italic tracking-[0.1em] disabled:opacity-50 disabled:grayscale transition-all mb-6 uppercase shadow-3xl shadow-primary/30"
          onClick={handleExecute}
        >
          {isExecuting ? "ESTABLISHING NODE..." : "EXECUTE TRADE"}
        </Button>

        {parseFloat(tradeAmount) > balance && (
          <p className="text-crimson text-[10px] font-black uppercase tracking-widest text-center mb-6 animate-pulse">
            Insufficient Terminal Balance
          </p>
        )}

        <div className="mt-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-text-600 text-[10px] font-black uppercase tracking-[0.2em]">
            <Zap size={12} className="text-accent" />
            Verified Settlement on Base
          </div>
          <div className="w-12 h-1 bg-probix-700 rounded-full opacity-20" />
        </div>
      </motion.div>
    </>
  );
};
