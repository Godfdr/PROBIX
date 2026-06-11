"use client";

import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface MarketChartProps {
  data: number[];
  color: string;
}

export function MarketChart({ data, color }: MarketChartProps) {
  const chartData = useMemo(() => {
    return data.map((val, index) => ({
      time: index,
      value: val,
    }));
  }, [data]);

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="time"
            hide
          />
          <YAxis
            domain={['auto', 'auto']}
            hide
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="glass p-4 rounded-2xl border border-white/10 shadow-2xl">
                    <p className="text-xs font-black text-probix-muted uppercase tracking-widest mb-1">Probability</p>
                    <p className="text-2xl font-black italic tracking-tighter" style={{ color }}>
                      {payload[0].value}%
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorValue)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
