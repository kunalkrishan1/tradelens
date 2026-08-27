"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function PortfolioPreview() {
  const { isAuthenticated } = useAuth();

  return (
    <section id="portfolio" className="relative w-full py-28 bg-[#0b0e14] border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
              Alpha Tracking & Journal
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Total Portfolio Intelligence
          </h2>
          <p className="text-base md:text-lg text-gray-400">
            Monitor real-time drawdown, eliminate emotional tilt, and analyze trade psychology with institutional metrics.
          </p>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Portfolio Value Card */}
          <div
            className="lg:col-span-2 p-8 rounded-2xl border border-white/10 flex flex-col justify-between"
            style={{
              background: 'linear-gradient(180deg, rgba(22, 27, 38, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div>
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-gray-400 block mb-1">TOTAL PORTFOLIO EQUITY</span>
                  <div className="text-4xl md:text-5xl font-mono font-black text-white">
                    ₹12,45,820<span className="text-2xl text-gray-400">.00</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-right">
                    <span className="text-[10px] font-mono text-emerald-400 block font-bold">TODAY&apos;S P&L</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">+₹8,420 (+1.18%)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-right">
                    <span className="text-[10px] font-mono text-cyan-400 block font-bold">ALL-TIME ALPHA</span>
                    <span className="text-lg font-mono font-bold text-cyan-300">+18.42%</span>
                  </div>
                </div>
              </div>

              {/* Simulated Equity Curve */}
              <div className="relative h-[220px] w-full pt-4">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 150">
                  <defs>
                    <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,130 Q80,120 140,90 T250,70 T350,45 T450,25 L500,15 L500,150 L0,150 Z"
                    fill="url(#eqGrad)"
                  />
                  <path
                    d="M0,130 Q80,120 140,90 T250,70 T350,45 T450,25 L500,15"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="3"
                    style={{ filter: 'drop-shadow(0 4px 10px rgba(0, 229, 255, 0.5))' }}
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-white/10 mt-6 text-xs font-mono text-gray-400">
              <span>SHARPE RATIO: <strong className="text-white">2.48</strong></span>
              <span>PROFIT FACTOR: <strong className="text-emerald-400">3.12</strong></span>
              <span>WIN RATE: <strong className="text-emerald-400">74.2%</strong></span>
              <span>MAX DRAWDOWN: <strong className="text-cyan-300">-3.4%</strong></span>
            </div>
          </div>

          {/* Asset Allocation & Discipline Gauge */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* Asset Allocation Card */}
            <div
              className="p-6 rounded-2xl border border-white/10"
              style={{
                background: 'linear-gradient(180deg, rgba(22, 27, 38, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                <span>Asset Allocation</span>
                <span className="text-xs font-mono text-cyan-400">4 Classes</span>
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { label: 'Indian & US Equities', pct: 52, val: '₹6,47,826', color: '#00E5FF' },
                  { label: 'Crypto Assets (BTC/ETH)', pct: 24, val: '₹2,99,000', color: '#8b5cf6' },
                  { label: 'Commodities (Gold)', pct: 14, val: '₹1,74,414', color: '#f59e0b' },
                  { label: 'Cash & Collateral', pct: 10, val: '₹1,24,580', color: '#00DC82' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-gray-300 mb-1">
                      <span>{item.label}</span>
                      <span className="font-bold text-white">{item.pct}% ({item.val})</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.pct}%`, background: item.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Discipline & Consistency Score Card */}
            <div
              className="p-6 rounded-2xl border border-white/10 flex items-center justify-between"
              style={{
                background: 'linear-gradient(180deg, rgba(22, 27, 38, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div>
                <span className="text-xs font-mono text-gray-400 block">ZELLA DISCIPLINE SCORE</span>
                <span className="text-3xl font-mono font-black text-white">88.4<span className="text-sm text-gray-400">/100</span></span>
                <span className="text-xs text-emerald-400 block font-semibold mt-0.5">Top 5% Trading Psychology</span>
              </div>

              <Link
                href={isAuthenticated ? '/dashboard' : '/signup'}
                className="px-5 py-3 rounded-xl font-bold text-xs bg-cyan-400 text-black hover:scale-105 transition-all shadow-lg text-center"
                style={{ textDecoration: 'none' }}
              >
                Track Your Edge →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

