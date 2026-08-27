"use client";

import React, { useEffect, useState } from 'react';
import { formatNumber } from '@/lib/formatters';

interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  currency: string;
}

const DEFAULT_TICKERS: TickerItem[] = [
  { symbol: 'NIFTY 50', name: 'India', price: 24835.10, changePercent: 1.24, currency: '₹' },
  { symbol: 'SENSEX', name: 'India', price: 81520.45, changePercent: 0.87, currency: '₹' },
  { symbol: 'S&P 500', name: 'US', price: 5648.40, changePercent: 0.64, currency: '$' },
  { symbol: 'NASDAQ', name: 'US', price: 17820.60, changePercent: 1.12, currency: '$' },
  { symbol: 'BTC/USD', name: 'Crypto', price: 64320.00, changePercent: 2.31, currency: '$' },
  { symbol: 'ETH/USD', name: 'Crypto', price: 3485.50, changePercent: 3.15, currency: '$' },
  { symbol: 'GOLD (XAU)', name: 'Commodity', price: 2512.40, changePercent: 0.42, currency: '$' },
  { symbol: 'NVDA', name: 'Stock', price: 128.45, changePercent: 3.42, currency: '$' },
  { symbol: 'EUR/USD', name: 'Forex', price: 1.1085, changePercent: 0.18, currency: '€' },
  { symbol: 'CRUDE OIL', name: 'Commodity', price: 78.45, changePercent: -1.14, currency: '$' },
];

export default function MarketTicker() {
  const [tickers, setTickers] = useState<TickerItem[]>(DEFAULT_TICKERS);

  useEffect(() => {
    // Optionally fetch dynamic ticker from /api/markets
    fetch('/api/markets')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.ticker && data.data.ticker.length > 0) {
          setTickers(data.data.ticker);
        }
      })
      .catch(() => {
        // Fallback to initial defaults
      });
  }, []);

  const formatPrice = (price: number, currency: string) => {
    return `${currency}${formatNumber(price)}`;
  };

  return (
    <div
      className="w-full overflow-hidden border-y"
      style={{
        background: 'rgba(15, 15, 18, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center">
        {/* Live Feed Header Chip */}
        <div
          className="flex-shrink-0 flex items-center gap-2 px-6 py-3 border-r z-10"
          style={{
            background: 'rgba(20, 20, 25, 0.98)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.05em', color: '#00E5FF' }}>
            MARKET TICKER
          </span>
        </div>

        {/* Marquee Track */}
        <div className="flex overflow-hidden relative w-full py-2.5">
          <div className="flex items-center gap-10 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
            {[...tickers, ...tickers, ...tickers].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs font-mono">
                <span className="text-gray-400 font-semibold">{item.symbol}</span>
                <span className="text-white font-bold">{formatPrice(item.price, item.currency)}</span>
                <span
                  className="flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded"
                  style={{
                    color: item.changePercent >= 0 ? '#00DC82' : '#FF4B4B',
                    background: item.changePercent >= 0 ? 'rgba(0, 220, 130, 0.12)' : 'rgba(255, 75, 75, 0.12)',
                  }}
                >
                  {item.changePercent >= 0 ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
                <span className="text-gray-700 ml-4">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}} />
    </div>
  );
}

