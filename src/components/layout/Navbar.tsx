"use client";

import React from 'react';
import { Search, Wallet, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  isWalletConnected: boolean;
  balance: number;
  onConnectWallet: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar = ({
  isWalletConnected,
  balance,
  onConnectWallet,
  searchQuery,
  onSearchChange
}: NavbarProps) => {
  return (
    <nav className="fixed top-0 w-full z-[100] glass border-b border-white/[0.05] h-16 flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white italic">P</div>
          <span className="font-bold text-xl tracking-tighter hidden sm:block">PROBIX</span>
        </div>

        <div className="hidden lg:flex items-center gap-1 w-[400px]">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-600" size={18} />
            <input
              type="text"
              placeholder="Search markets..."
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-2 pl-12 pr-4 text-sm focus:border-primary/50 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isWalletConnected ? (
          <div className="flex items-center gap-3 bg-probix-800/50 pl-4 pr-1 py-1 rounded-2xl border border-white/5">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-[9px] font-black text-text-600 uppercase tracking-widest">Available</span>
              <span className="text-sm font-black text-secondary tracking-tight">₦{balance.toLocaleString()}</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-probix-700 flex items-center justify-center border border-white/10">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            </div>
          </div>
        ) : (
          <Button onClick={onConnectWallet} className="flex items-center gap-2">
            <Wallet size={16} />
            Connect Wallet
          </Button>
        )}
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu size={24} />
        </Button>
      </div>
    </nav>
  );
};
