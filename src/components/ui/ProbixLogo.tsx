"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function ProbixLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const scales = { sm: 'w-10 h-10', md: 'w-20 h-20', lg: 'w-32 h-32' };
  return (
      <div className={`${scales[size]} relative group`}>
          {/* Outer Glass Layer */}
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-md rounded-2xl border border-white/20 rotate-3 group-hover:rotate-6 transition-transform duration-500 shadow-xl" />
          {/* Inner "P" Shape Core */}
          <div className="absolute inset-[10%] bg-[#0A0C12] rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center overflow-hidden border border-primary/40">
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,_transparent,_#3B82F6_50%,_transparent_100%)] opacity-20 animate-spin duration-[8s]" />
              <span className="text-white font-black italic text-5xl -translate-x-1 translate-y-1 drop-shadow-[0_0_10px_rgba(59,130,246,1)] z-10">P</span>
              <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none z-20" />
          </div>
          {/* Ground glow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-2 bg-primary/40 blur-xl rounded-full" />
      </div>
  );
}
