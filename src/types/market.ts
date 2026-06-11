export interface Market {
  id: number;
  title: string;
  category: string;
  percentage: number;
  trend: string;
  color: string;
  chartData: number[];
  volume: string;
  comments: number;
  icon: string;
  description: string;
  yesPrice: number;
  noPrice: number;
  image?: string; // Kept for backwards compatibility if needed
}

export type Category = "All" | "Politics" | "Sports" | "Economy" | "Culture" | "Crypto" | "Nigeria" | "Tech & Startups";
