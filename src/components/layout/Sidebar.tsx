"use client";

import React from 'react';
import {
  LayoutGrid,
  Landmark,
  Trophy,
  CircleDollarSign,
  Zap,
  Globe
} from 'lucide-react';
import { Category } from '@/types/market';

const CATEGORIES = [
  { name: "All" as Category, icon: <LayoutGrid size={16} /> },
  { name: "Politics" as Category, icon: <Landmark size={16} /> },
  { name: "Sports" as Category, icon: <Trophy size={16} /> },
  { name: "Economy" as Category, icon: <CircleDollarSign size={16} /> },
  { name: "Culture" as Category, icon: <Zap size={16} /> },
  { name: "Crypto" as Category, icon: <Globe size={16} /> },
];

interface SidebarProps {
  activeTab: Category;
  onTabChange: (tab: Category) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="hidden lg:flex w-64 border-r border-white/[0.05] flex-col p-6 gap-2 shrink-0">
      <span className="text-[10px] font-black text-text-600 uppercase tracking-[0.2em] mb-4">Categories</span>
      <div className="space-y-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onTabChange(cat.name)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === cat.name
                ? "bg-primary/10 text-primary border border-primary/20 shadow-glow"
                : "text-text-400 hover:bg-white/[0.03] border border-transparent"
            }`}
          >
            <span className={activeTab === cat.name ? "text-primary" : "text-text-600"}>
              {cat.icon}
            </span>
            {cat.name}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <div className="glass rounded-2xl p-4 space-y-3">
          <p className="text-xs font-bold text-text-400">Trade on what you know.</p>
          <p className="text-[10px] text-text-600 leading-relaxed">Join thousands of Nigerians predicting the future of Africa.</p>
          <button className="w-full text-xs font-black text-primary hover:underline flex items-center justify-between">
            View Analytics <Globe size={12} />
          </button>
        </div>
      </div>
    </aside>
  );
};
