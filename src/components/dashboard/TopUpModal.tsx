"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Wallet, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useProbix } from '@/store/ProbixContext';
import { toast } from 'sonner';

interface TopUpModalProps {
  onClose: () => void;
}

export function TopUpModal({ onClose }: TopUpModalProps) {
  const { setBalance, balance, transactions, setTransactions } = useProbix() as any; // Temporary cast for simulation
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTopUp = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setBalance(balance + amt);
      if (setTransactions) {
        setTransactions((prev: any) => [{
          id: `tx-${Date.now()}`,
          marketTitle: 'Terminal Funding',
          amount: amt,
          type: 'topup',
          timestamp: Date.now(),
          status: 'success'
        }, ...prev]);
      }
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success('Terminal funded', {
        description: `Successfully synchronized ₦${amt.toLocaleString()} to node terminal.`,
      });
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 2000);
  };

  const presets = [5000, 10000, 25000, 50000];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[3000]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-[3010] p-6"
      >
        <div className="max-w-xl w-full glass rounded-[56px] p-16 border-white/10 shadow-3xl pointer-events-auto relative bg-[#010206] overflow-hidden">
          {isProcessing && (
            <div className="absolute inset-0 bg-[#010206]/80 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-6">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-black italic uppercase tracking-[0.2em] text-white">Synchronizing Node...</p>
            </div>
          )}

          {isSuccess && (
            <div className="absolute inset-0 bg-[#010206]/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center gap-6 text-center p-10">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center shadow-glow shadow-secondary/40">
                <CheckCircle2 size={48} className="text-white" />
              </div>
              <h3 className="text-4xl font-black italic uppercase text-white leading-none">Node Funded</h3>
              <p className="text-xl text-probix-muted font-bold italic opacity-60">Terminal balance successfully updated.</p>
            </div>
          )}

          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Wallet size={24} />
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-white">Fund Terminal</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="glass h-12 w-12 !rounded-2xl text-white">
              <X size={24} />
            </Button>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-probix-muted uppercase tracking-[0.4em] ml-2 italic">Session Amount (NGN)</label>
              <div className="relative group">
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-probix-surface border border-probix-border rounded-[32px] py-8 px-10 outline-none focus:border-primary/50 transition-all font-black italic text-5xl placeholder:opacity-10 text-white shadow-inner"
                />
                <span className="absolute right-10 top-1/2 -translate-y-1/2 text-probix-muted font-black italic text-2xl opacity-20 uppercase tracking-tighter">₦</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {presets.map(p => (
                <button
                  key={p}
                  onClick={() => setAmount(p.toString())}
                  className="py-4 rounded-2xl glass border-white/5 text-[11px] font-black italic uppercase tracking-widest hover:bg-primary/20 hover:border-primary/30 transition-all text-white"
                >
                  +{p/1000}K
                </button>
              ))}
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full !py-8 text-2xl shadow-3xl shadow-primary/40 font-black uppercase italic !rounded-[32px] tracking-[0.2em] active:scale-95 transition-all text-white"
                onClick={handleTopUp}
              >
                SYNC FUNDS
              </Button>
              <div className="flex items-center justify-center gap-3 mt-8 opacity-40">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <p className="text-[9px] font-black text-probix-muted uppercase tracking-[0.3em] italic">Veltra Bridge / Instant Settlement</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
