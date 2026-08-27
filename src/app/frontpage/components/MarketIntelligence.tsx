"use client";

import React, { useState, useEffect } from 'react';
import { MarketItem } from '@/app/api/markets/route';
import { formatNumber } from '@/lib/formatters';

const CATEGORIES = ['All', 'Indices', 'Stocks', 'Crypto', 'Commodities', 'Forex', 'ETFs'];

export default function MarketIntelligence() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [markets, setMarkets] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/markets?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.markets) {
          setMarkets(data.data.markets);
        }
      })
      .catch((err) => console.error('Error fetching market intelligence:', err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const renderSparkline = (points: number[], isUp: boolean, symbolKey: string) => {
    if (!points || points.length === 0) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    const width = 120;
    const height = 36;
    const step = width / (points.length - 1);

    const pathData = points
      .map((p, i) => {
        const x = i * step;
        const y = height - ((p - min) / range) * (height - 8) - 4;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isUp ? '#00DC82' : '#FF4B4B';
    const gradId = `sparkGrad-${symbolKey.replace(/[^a-zA-Z0-9]/g, '')}`;

    return (
      <svg className="w-full h-9 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${pathData} L${width},${height} L0,${height} Z`} fill={`url(#${gradId})`} />
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0px 2px 4px ${isUp ? 'rgba(0,220,130,0.4)' : 'rgba(255,75,75,0.4)'})` }}
        />
      </svg>
    );
  };

  return (
    <section id="markets" className="relative w-full py-28 bg-[#0d0f14]/80 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-mono text-cyan-300 font-bold mb-3">
              LIVE ASSET RADAR
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              A clearer view of every market.
            </h2>
            <p className="text-gray-400 mt-2 max-w-xl">
              Real-time prices, volume dynamics, and instant trend recognition across global equities, crypto, forex, and commodities.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
                style={{
                  background: selectedCategory === cat ? '#00E5FF' : 'transparent',
                  color: selectedCategory === cat ? '#00363d' : 'rgba(255,255,255,0.7)',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  boxShadow: selectedCategory === cat ? '0 0 15px rgba(0, 229, 255, 0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Markets Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-56 rounded-2xl bg-white/5 animate-pulse border border-white/5"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {markets.map((item) => {
              const isUp = item.changePercent >= 0;
              const rangePct = Math.max(
                5,
                Math.min(95, ((item.price - item.low) / (item.high - item.low || 1)) * 100)
              );

              return (
                <div
                  key={item.symbol}
                  className="group relative p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:border-cyan-400/40 hover:scale-[1.02] flex flex-col justify-between"
                  style={{
                    background: 'linear-gradient(180deg, rgba(20, 24, 33, 0.85) 0%, rgba(12, 15, 22, 0.95) 100%)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-cyan-400/80 uppercase px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/20">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1.5 group-hover:text-cyan-300 transition-colors">
                          {item.symbol}
                        </h3>
                        <p className="text-xs text-gray-400 truncate max-w-[150px]">{item.name}</p>
                      </div>

                      <div
                        className="text-xs font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                        style={{
                          color: isUp ? '#00DC82' : '#FF4B4B',
                          background: isUp ? 'rgba(0, 220, 130, 0.12)' : 'rgba(255, 75, 75, 0.12)',
                          border: `1px solid ${isUp ? 'rgba(0, 220, 130, 0.3)' : 'rgba(255, 75, 75, 0.3)'}`,
                        }}
                      >
                        {isUp ? '▲' : '▼'} {Math.abs(item.changePercent).toFixed(2)}%
                      </div>
                    </div>

                    {/* Price & Sparkline */}
                    <div className="flex items-baseline justify-between mt-4">
                      <div>
                        <div className="text-2xl font-mono font-black text-white">
                          {item.currency}
                          {formatNumber(item.price)}
                        </div>
                        <div className="text-[11px] font-mono text-gray-400 mt-0.5">
                          {isUp ? '+' : '-'}
                          {item.currency}
                          {Math.abs(item.changeValue).toFixed(2)} 24H
                        </div>
                      </div>

                      <div className="w-[120px]">{renderSparkline(item.sparkline, isUp, item.symbol)}</div>
                    </div>
                  </div>

                  {/* 24h High / Low Indicator Bar */}
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1.5">
                      <span>L: {formatNumber(item.low, { minDecimals: 0, maxDecimals: 2 })}</span>
                      <span className="text-gray-300">VOL: {item.volume}</span>
                      <span>H: {formatNumber(item.high, { minDecimals: 0, maxDecimals: 2 })}</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/10 relative">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${rangePct}%`,
                          background: isUp
                            ? 'linear-gradient(90deg, #3b82f6, #00DC82)'
                            : 'linear-gradient(90deg, #3b82f6, #FF4B4B)',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
