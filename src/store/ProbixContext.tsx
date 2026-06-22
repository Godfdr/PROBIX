"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Market } from '@/types/market';
import { MARKETS } from './data';

interface Position {
  id: string;
  marketId: number;
  marketTitle: string;
  side: 'yes' | 'no';
  amount: number;
  entryPrice: number;
  timestamp: number;
}

interface Transaction {
  id: string;
  marketTitle: string;
  amount: number;
  type: 'trade' | 'topup';
  timestamp: number;
  status: 'success' | 'pending';
}

interface ProbixContextType {
  balance: number;
  setBalance: (balance: number) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  positions: Position[];
  markets: Market[];
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  addMarket: (market: Market) => void;
  addPosition: (market: Market, side: 'yes' | 'no', amount: number) => void;
  watchlist: number[];
  toggleWatchlist: (marketId: number) => void;
  walletAddress: string | null;
  isHydrated: boolean;
}

const ProbixContext = createContext<ProbixContextType | undefined>(undefined);

export function ProbixProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('probix_balance');
    const savedAuth = localStorage.getItem('probix_auth');
    const savedPositions = localStorage.getItem('probix_positions');
    const savedTransactions = localStorage.getItem('probix_transactions');
    const savedWatchlist = localStorage.getItem('probix_watchlist');
    const savedWallet = localStorage.getItem('probix_wallet');
    const savedMarkets = localStorage.getItem('probix_markets');

    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedAuth === 'true') setIsAuthenticated(true);
    if (savedPositions) setPositions(JSON.parse(savedPositions));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
    if (savedWallet) setWalletAddress(savedWallet);

    if (savedMarkets) {
      setMarkets(JSON.parse(savedMarkets));
    } else {
      setMarkets(MARKETS.map(m => ({
          ...m,
          yesPrice: m.percentage / 100,
          noPrice: (100 - m.percentage) / 100,
      })));
    }

    setIsHydrated(true);
  }, []);

  // Persist state to localStorage on every change (only after initial hydration)
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem('probix_balance', balance.toString());
    localStorage.setItem('probix_auth', isAuthenticated.toString());
    localStorage.setItem('probix_positions', JSON.stringify(positions));
    localStorage.setItem('probix_transactions', JSON.stringify(transactions));
    localStorage.setItem('probix_watchlist', JSON.stringify(watchlist));
    localStorage.setItem('probix_markets', JSON.stringify(markets));
    if (walletAddress) localStorage.setItem('probix_wallet', walletAddress);
  }, [balance, isAuthenticated, positions, transactions, watchlist, walletAddress, markets, isHydrated]);

  // --- LIVE PRICE SIMULATION ---
  useEffect(() => {
    if (!isHydrated || markets.length === 0) return;

    const interval = setInterval(() => {
      setMarkets(prevMarkets => prevMarkets.map(m => {
        const isVolatile = Math.random() > 0.8;
        const volatility = isVolatile ? 0.05 : 0.015;
        const change = (Math.random() * volatility * 2) - volatility;

        const newYes = Math.min(Math.max(m.yesPrice + change, 0.02), 0.98);
        const newPercentage = Math.round(newYes * 100);

        const newChartData = [...m.chartData.slice(1), newPercentage];

        return {
          ...m,
          yesPrice: newYes,
          noPrice: 1 - newYes,
          percentage: newPercentage,
          chartData: newChartData,
          trend: `${change >= 0 ? '+' : ''}${(Math.abs(change) * 100).toFixed(1)}% now`
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [isHydrated, markets.length]);

  const login = () => {
    setIsAuthenticated(true);
    const newAddress = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
    setWalletAddress(newAddress);
    if (balance === 0) {
        setBalance(50000);
        setTransactions([{
            id: `tx-${Date.now()}`,
            marketTitle: 'Terminal Initialization',
            amount: 50000,
            type: 'topup',
            timestamp: Date.now(),
            status: 'success'
        }]);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setWalletAddress(null);
    localStorage.setItem('probix_auth', 'false');
    localStorage.removeItem('probix_wallet');
  };

  const addMarket = (market: Market) => {
    setMarkets(prev => [market, ...prev]);
  };

  const addPosition = (market: Market, side: 'yes' | 'no', amount: number) => {
    if (balance < amount) {
      alert("Insufficient balance in your node terminal.");
      return;
    }

    const price = side === 'yes' ? market.yesPrice : market.noPrice;
    const newPosition: Position = {
      id: `pos-${Date.now()}`,
      marketId: market.id,
      marketTitle: market.title,
      side,
      amount,
      entryPrice: price,
      timestamp: Date.now()
    };

    setPositions(prev => [newPosition, ...prev]);
    setTransactions(prev => [{
        id: `tx-${Date.now()}`,
        marketTitle: market.title,
        amount: -amount,
        type: 'trade',
        timestamp: Date.now(),
        status: 'success'
    }, ...prev]);
    setBalance(prev => prev - amount);
  };

  const toggleWatchlist = (marketId: number) => {
    setWatchlist(prev =>
      prev.includes(marketId)
        ? prev.filter(id => id !== marketId)
        : [...prev, marketId]
    );
  };

  return (
    <ProbixContext.Provider value={{
      balance,
      setBalance,
      isAuthenticated,
      login,
      logout,
      positions,
      markets,
      transactions,
      setTransactions,
      addMarket,
      addPosition,
      watchlist,
      toggleWatchlist,
      walletAddress,
      isHydrated
    }}>
      {children}
    </ProbixContext.Provider>
  );
}

export function useProbix() {
  const context = useContext(ProbixContext);
  if (context === undefined) {
    throw new Error('useProbix must be used within a ProbixProvider');
  }
  return context;
}
