"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

import { formatNumber } from '@/lib/formatters';

const INSTRUMENTS = [
  { symbol: 'NIFTY 50', price: 24835.10, change: 1.24, currency: '₹', spread: 0.5 },
  { symbol: 'AAPL', price: 224.23, change: 0.78, currency: '$', spread: 0.02 },
  { symbol: 'BTC/USD', price: 64320.00, change: 2.31, currency: '$', spread: 1.0 },
  { symbol: 'NVDA', price: 128.45, change: 3.42, currency: '$', spread: 0.01 },
];

export default function TradingPreview() {
  const { isAuthenticated } = useAuth();
  const [selectedInst, setSelectedInst] = useState(INSTRUMENTS[0]);
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'Market' | 'Limit'>('Market');
  const [quantity, setQuantity] = useState<number>(50);
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1h' | '1D'>('5m');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const estimatedValue = quantity * selectedInst.price;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  return (
    <section id="terminal" className="relative w-full py-28 bg-[#090b10] border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
              Execution Suite Demo
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            High-Performance Trading Terminal
          </h2>
          <p className="text-base md:text-lg text-gray-400">
            Experience ultra-low latency order routing, institutional level-2 DOM, and seamless risk execution.
          </p>
        </div>

        {/* Terminal Window Frame */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, #11141c 0%, #0c0e15 100%)',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 229, 255, 0.08)',
          }}
        >
          {/* Terminal Window Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 border-b border-white/10 bg-black/40">
            {/* Instrument Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {INSTRUMENTS.map((inst) => (
                <button
                  key={inst.symbol}
                  onClick={() => setSelectedInst(inst)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all"
                  style={{
                    background: selectedInst.symbol === inst.symbol ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${selectedInst.symbol === inst.symbol ? '#00E5FF' : 'rgba(255, 255, 255, 0.08)'}`,
                    color: selectedInst.symbol === inst.symbol ? '#00E5FF' : 'white',
                    fontWeight: selectedInst.symbol === inst.symbol ? 700 : 500,
                  }}
                >
                  <span>{inst.symbol}</span>
                  <span style={{ color: inst.change >= 0 ? '#00DC82' : '#FF4B4B' }}>
                    {inst.change >= 0 ? '+' : ''}
                    {inst.change}%
                  </span>
                </button>
              ))}
            </div>

            {/* Timeframe Selectors */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
              {(['1m', '5m', '15m', '1h', '1D'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className="px-2.5 py-1 rounded transition-colors"
                  style={{
                    background: timeframe === tf ? '#00E5FF' : 'transparent',
                    color: timeframe === tf ? '#00363d' : 'rgba(255, 255, 255, 0.6)',
                    fontWeight: timeframe === tf ? 700 : 500,
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Main Grid: Chart on Left, Order Panel on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Chart Area */}
            <div className="lg:col-span-2 p-6 flex flex-col justify-between" style={{ minHeight: '420px' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-mono font-black text-white">
                    {selectedInst.currency}
                    {formatNumber(selectedInst.price)}
                  </span>
                  <span
                    className="text-sm font-mono font-bold px-2 py-0.5 rounded"
                    style={{
                      color: selectedInst.change >= 0 ? '#00DC82' : '#FF4B4B',
                      background: selectedInst.change >= 0 ? 'rgba(0,220,130,0.1)' : 'rgba(255,75,75,0.1)',
                    }}
                  >
                    {selectedInst.change >= 0 ? '▲ +' : '▼ '}
                    {selectedInst.change}%
                  </span>
                </div>

                <div className="text-xs font-mono text-gray-400">SPREAD: {selectedInst.spread} PTS</div>
              </div>

              {/* Realistic Candlestick Grid Visualizer */}
              <div className="relative w-full h-[280px] bg-black/30 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4 opacity-15">
                  <div className="border-b border-white"></div>
                  <div className="border-b border-white"></div>
                  <div className="border-b border-white"></div>
                  <div className="border-b border-white"></div>
                </div>

                {/* Simulated Candlestick Sequence */}
                <div className="relative flex items-end justify-between h-[210px] w-full px-4 z-10">
                  {[
                    { open: 120, close: 145, high: 160, low: 110, up: true },
                    { open: 145, close: 135, high: 155, low: 125, up: false },
                    { open: 135, close: 170, high: 185, low: 130, up: true },
                    { open: 170, close: 160, high: 178, low: 150, up: false },
                    { open: 160, close: 190, high: 200, low: 155, up: true },
                    { open: 190, close: 180, high: 195, low: 170, up: false },
                    { open: 180, close: 210, high: 220, low: 175, up: true },
                    { open: 210, close: 225, high: 235, low: 200, up: true },
                    { open: 225, close: 215, high: 230, low: 205, up: false },
                    { open: 215, close: 240, high: 250, low: 210, up: true },
                    { open: 240, close: 255, high: 260, low: 235, up: true },
                  ].map((c, i) => {
                    const color = c.up ? '#00DC82' : '#FF4B4B';
                    const height = Math.abs(c.close - c.open);
                    const bottom = Math.min(c.open, c.close);
                    const wickHeight = c.high - c.low;

                    return (
                      <div key={i} className="relative flex flex-col items-center justify-end h-full w-4">
                        {/* High-Low Wick */}
                        <div
                          className="absolute"
                          style={{
                            bottom: `${c.low * 0.7}px`,
                            height: `${wickHeight * 0.7}px`,
                            width: '1.5px',
                            background: color,
                          }}
                        ></div>
                        {/* Open-Close Body */}
                        <div
                          className="absolute rounded-sm"
                          style={{
                            bottom: `${bottom * 0.7}px`,
                            height: `${Math.max(4, height * 0.7)}px`,
                            width: '12px',
                            background: color,
                            boxShadow: `0 0 10px ${c.up ? 'rgba(0,220,130,0.3)' : 'rgba(255,75,75,0.3)'}`,
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>

                {/* Sub Volume Bar Indicator */}
                <div className="flex items-end justify-between h-[30px] w-full px-4 border-t border-white/5 pt-1 z-10 opacity-60">
                  {[40, 30, 65, 45, 80, 50, 75, 90, 60, 95, 100].map((v, i) => (
                    <div
                      key={i}
                      style={{
                        height: `${v}%`,
                        width: '10px',
                        background: '#00E5FF',
                        borderRadius: '2px 2px 0 0',
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Execution Panel */}
            <div className="p-6 flex flex-col justify-between bg-black/20">
              <div>
                {/* Buy / Sell Toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5 border border-white/10 mb-5">
                  <button
                    type="button"
                    onClick={() => setSide('BUY')}
                    className="py-2.5 rounded-lg font-bold text-xs tracking-wider transition-all"
                    style={{
                      background: side === 'BUY' ? '#00DC82' : 'transparent',
                      color: side === 'BUY' ? '#00391d' : '#00DC82',
                      boxShadow: side === 'BUY' ? '0 0 20px rgba(0, 220, 130, 0.4)' : 'none',
                    }}
                  >
                    BUY / LONG
                  </button>
                  <button
                    type="button"
                    onClick={() => setSide('SELL')}
                    className="py-2.5 rounded-lg font-bold text-xs tracking-wider transition-all"
                    style={{
                      background: side === 'SELL' ? '#FF4B4B' : 'transparent',
                      color: side === 'SELL' ? '#68000b' : '#FF4B4B',
                      boxShadow: side === 'SELL' ? '0 0 20px rgba(255, 75, 75, 0.4)' : 'none',
                    }}
                  >
                    SELL / SHORT
                  </button>
                </div>

                {/* Order Type Tabs */}
                <div className="flex gap-4 mb-4 text-xs font-mono text-gray-400">
                  {(['Market', 'Limit'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      className="pb-1 transition-colors"
                      style={{
                        color: orderType === type ? '#00E5FF' : 'rgba(255,255,255,0.5)',
                        borderBottom: orderType === type ? '2px solid #00E5FF' : '2px solid transparent',
                        fontWeight: orderType === type ? 700 : 500,
                      }}
                    >
                      {type} Order
                    </button>
                  ))}
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  {/* Quantity Input */}
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1.5">QUANTITY (UNITS)</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3.5 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  {/* Limit Price Input if Limit Order */}
                  {orderType === 'Limit' && (
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1.5">LIMIT PRICE</label>
                      <input
                        type="number"
                        defaultValue={selectedInst.price}
                        className="w-full bg-black/50 border border-white/15 rounded-lg px-3.5 py-2 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Estimated Total Calculation */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-gray-400">
                      <span>EST. VALUE:</span>
                      <span className="text-white font-bold">
                        {selectedInst.currency}
                        {formatNumber(estimatedValue)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-[11px]">
                      <span>EXECUTION FEE:</span>
                      <span className="text-emerald-400">₹0.00 (Zero Commission)</span>
                    </div>
                  </div>

                  {orderSuccess && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center">
                      ✓ Demo {side} order placed for {quantity} {selectedInst.symbol}!
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg"
                    style={{
                      background: side === 'BUY' ? '#00DC82' : '#FF4B4B',
                      color: side === 'BUY' ? '#00391d' : '#fff',
                      boxShadow: `0 0 25px ${side === 'BUY' ? 'rgba(0,220,130,0.4)' : 'rgba(255,75,75,0.4)'}`,
                    }}
                  >
                    Execute {side} Demo Order
                  </button>
                </form>
              </div>

              {/* Seamless Link to Live Platform */}
              <div className="mt-4 text-center">
                <Link
                  href={isAuthenticated ? '/dashboard' : '/signup'}
                  className="text-xs text-cyan-400 hover:underline font-mono inline-flex items-center gap-1"
                >
                  {isAuthenticated ? 'Open Full Trading Journal →' : 'Create Free Account to Trade Live →'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

