import { Market } from '@/types/market';

export const MARKETS: Omit<Market, 'yesPrice' | 'noPrice'>[] = [
  { id: 1, title: "Will Nigeria's inflation rate drop below 20% in 2027?", category: "Economy", percentage: 68, trend: "+4.3% today", color: "#10B981", chartData: [20, 35, 45, 60, 55, 72, 70, 85, 90, 72, 68, 75, 80, 78, 85, 90, 88, 82, 80, 78], volume: "3.2k forecasts", comments: 418, icon: "🇳🇬", description: "This market tracks the official exchange rate and inflation metrics verified by Lagos oracle nodes." },
  { id: 2, title: "Will Peter Obi run in the 2027 presidential election?", category: "Politics", percentage: 61, trend: "+2.1% today", color: "#8B5CF6", chartData: [30, 25, 40, 50, 61, 58, 65, 70, 61, 55, 60, 65, 62, 58, 60, 64, 61, 63, 61, 65], volume: "1.9k forecasts", comments: 342, icon: "🏛️", description: "Political climate analysis suggests a strong base for a 2027 run based on current sentiment polls." },
  { id: 3, title: "Will Nigeria qualify for the 2026 FIFA World Cup?", category: "Sports", percentage: 78, trend: "+6.6% today", color: "#F59E0B", chartData: [40, 50, 65, 70, 78, 75, 80, 85, 78, 80, 82, 85, 88, 90, 85, 82, 80, 78, 82, 85], volume: "4.7k forecasts", comments: 512, icon: "⚽", description: "Qualifying rounds and friendly matches show high confidence in the Super Eagles squad nodes." },
  { id: 4, title: "Will Flutterwave reach $10B valuation by mid 2026?", category: "Tech", percentage: 55, trend: "-1.2% today", color: "#3B82F6", chartData: [60, 55, 50, 55, 55, 52, 45, 50, 55, 58, 60, 55, 52, 50, 48, 50, 52, 55, 58, 55], volume: "1.1k forecasts", comments: 278, icon: "🚀", description: "Fintech growth trends in Africa remain strong, though global market volatility is a key variable." },
  { id: 5, title: "Will the NPFL Secure a $50M Broadcast Deal for 2026?", category: "Sports", percentage: 42, trend: "+8.1% today", color: "#10B981", chartData: [10, 15, 20, 25, 30, 35, 40, 42], volume: "850 forecasts", comments: 156, icon: "📺", description: "Negotiations with global streaming giants are underway for Nigerian Professional Football League rights." },
  { id: 6, title: "Will Nigeria Adopt Bitcoin as Legal Tender by 2030?", category: "Crypto", percentage: 12, trend: "-0.5% today", color: "#F59E0B", chartData: [5, 8, 12, 10, 15, 12], volume: "12k forecasts", comments: 1205, icon: "₿", description: "Speculation remains high despite regulatory hurdles; parallels drawn with other emerging economies." },
  { id: 7, title: "Will Lagos-Calabar Coastal Highway be completed by 2030?", category: "Nigeria", percentage: 35, trend: "+1.2% today", color: "#10B981", chartData: [20, 25, 30, 32, 35], volume: "2.5k forecasts", comments: 89, icon: "🛣️", description: "Progress on the coastal highway project is monitored via government nodes." },
  { id: 8, title: "Will Burna Boy win another Grammy in 2026?", category: "Tech & Startups", percentage: 45, trend: "+4.2% today", color: "#8B5CF6", chartData: [30, 40, 45, 42, 45], volume: "8k forecasts", comments: 450, icon: "🏆", description: "Cultural sentiment and upcoming album releases suggest strong potential." }
];

export const ANALYSTS = [
  { id: 1, name: "David Okoro", accuracy: 91, image: "https://i.pravatar.cc/150?u=9", rank: 1, trend: "+12.4%", xp: "4,280", level: 4 },
  { id: 2, name: "Sarah Chen", accuracy: 89, image: "https://i.pravatar.cc/150?u=2", rank: 2, trend: "+9.8%", xp: "3,150", level: 3 },
  { id: 3, name: "Kevin Zhang", accuracy: 87, image: "https://i.pravatar.cc/150?u=3", rank: 3, trend: "+7.1%", xp: "2,840", level: 3 }
];

interface Topic {
  name: string;
  forecasts: string;
  accuracy: string;
}

interface CategoryData {
  icon: string;
  desc: string;
  stats: {
    forecasts: string;
    analysts: string;
    accuracy: string;
    followers: string;
  };
  sentiment: number;
  topics: Topic[];
}

export const CATEGORIES_DATA: Record<string, CategoryData> = {
  "Nigeria": {
    icon: "🇳🇬",
    desc: "Track everything about Nigeria - economy, politics, business, senate, and society.",
    stats: { forecasts: "1.2k", analysts: "320", accuracy: "85%", followers: "12.4k" },
    sentiment: 72,
    topics: [
      { name: "2027 Elections", forecasts: "42", accuracy: "81%" },
      { name: "Naira Exchange Rate", forecasts: "115", accuracy: "63%" },
      { name: "Inflation Rate", forecasts: "84", accuracy: "92%" },
      { name: "Oil Production", forecasts: "12", accuracy: "87%" },
      { name: "Security & Safety", forecasts: "42", accuracy: "76%" },
      { name: "GDP Growth", forecasts: "15", accuracy: "89%" }
    ]
  },
  "Africa": {
    icon: "🌍",
    desc: "Get a pan-African view of trends and events across the continent.",
    stats: { forecasts: "2.4k", analysts: "512", accuracy: "83%", followers: "18.7k" },
    sentiment: 65,
    topics: [
      { name: "Economic Growth", forecasts: "112", accuracy: "83%" },
      { name: "Elections & Politics", forecasts: "215", accuracy: "62%" },
      { name: "Trade & Markets", forecasts: "312", accuracy: "64%" },
      { name: "Population & Migration", forecasts: "88", accuracy: "61%" }
    ]
  },
  "Sports": {
    icon: "⚽",
    desc: "Predict match outcomes, tournaments, transfers, and sport trends.",
    stats: { forecasts: "3.1k", analysts: "1.1k", accuracy: "79%", followers: "24.3k" },
    sentiment: 58,
    topics: [
      { name: "Football (Soccer)", forecasts: "1.5k", accuracy: "80%" },
      { name: "Basketball", forecasts: "420", accuracy: "71%" },
      { name: "Tennis", forecasts: "230", accuracy: "77%" },
      { name: "Formula 1", forecasts: "210", accuracy: "82%" },
      { name: "Transfers & Rumors", forecasts: "310", accuracy: "72%" },
      { name: "Olympics", forecasts: "150", accuracy: "74%" }
    ]
  },
  "Economy": {
    icon: "📈",
    desc: "Monitor global and local economic indicators, inflation, and markets.",
    stats: { forecasts: "2.8k", analysts: "730", accuracy: "82%", followers: "20.1k" },
    sentiment: 61,
    topics: [
      { name: "Global GDP", forecasts: "7", accuracy: "81%" },
      { name: "Inflation", forecasts: "15", accuracy: "63%" },
      { name: "Interest Rates", forecasts: "42", accuracy: "92%" },
      { name: "Stock Markets", forecasts: "4", accuracy: "87%" },
      { name: "Commodities", forecasts: "11", accuracy: "76%" },
      { name: "Unemployment", forecasts: "14", accuracy: "89%" }
    ]
  },
  "Tech & Startups": {
    icon: "🚀",
    desc: "Technology trends, startups, funding, and innovation across the globe.",
    stats: { forecasts: "2.2k", analysts: "910", accuracy: "84%", followers: "16.8k" },
    sentiment: 74,
    topics: [
      { name: "AI & Machine Learning", forecasts: "112", accuracy: "81%" },
      { name: "Startups & Funding", forecasts: "215", accuracy: "63%" },
      { name: "Cryptocurrency", forecasts: "312", accuracy: "92%" },
      { name: "Gadgets & Devices", forecasts: "88", accuracy: "87%" },
      { name: "Big Tech", forecasts: "42", accuracy: "76%" },
      { name: "Future of Work", forecasts: "15", accuracy: "89%" }
    ]
  },
  "Crypto": {
    icon: "₿",
    desc: "Digital assets, decentralized finance, and blockchain adoption in Africa.",
    stats: { forecasts: "5.4k", analysts: "1.2k", accuracy: "76%", followers: "32.1k" },
    sentiment: 82,
    topics: [
      { name: "Bitcoin Adoption", forecasts: "1.2k", accuracy: "71%" },
      { name: "Stablecoins (USDT/USDC)", forecasts: "850", accuracy: "84%" },
      { name: "Web3 Ecosystem", forecasts: "420", accuracy: "68%" },
      { name: "Crypto Regulation", forecasts: "310", accuracy: "62%" }
    ]
  }
};
