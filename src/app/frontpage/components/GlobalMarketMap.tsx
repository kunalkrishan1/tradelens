"use client";

import React, { useState } from 'react';

interface FinancialHub {
  id: string;
  name: string;
  country: string;
  x: number; // percentage on map projection (0 to 100)
  y: number; // percentage on map projection (0 to 100)
  marketIndex: string;
  changePercent: number;
  currentValue: string;
  status: 'Open' | 'Closed' | 'Pre-Market';
  localTime: string;
  volume: string;
}

const HUBS: FinancialHub[] = [
  {
    id: 'nyc',
    name: 'New York',
    country: 'United States',
    x: 27.5,
    y: 36.5,
    marketIndex: 'S&P 500',
    changePercent: 0.64,
    currentValue: '5,648.40',
    status: 'Open',
    localTime: '09:45 EDT',
    volume: '$4.8B',
  },
  {
    id: 'lon',
    name: 'London',
    country: 'United Kingdom',
    x: 48.2,
    y: 28.5,
    marketIndex: 'FTSE 100',
    changePercent: 0.72,
    currentValue: '8,345.10',
    status: 'Open',
    localTime: '14:45 BST',
    volume: '£2.4B',
  },
  {
    id: 'fra',
    name: 'Frankfurt',
    country: 'Germany',
    x: 51.5,
    y: 29.5,
    marketIndex: 'DAX 40',
    changePercent: 0.58,
    currentValue: '18,630.40',
    status: 'Open',
    localTime: '15:45 CEST',
    volume: '€1.8B',
  },
  {
    id: 'dxb',
    name: 'Dubai',
    country: 'UAE',
    x: 62.8,
    y: 44.2,
    marketIndex: 'DFMGI',
    changePercent: 0.39,
    currentValue: '4,380.15',
    status: 'Closed',
    localTime: '17:45 GST',
    volume: 'AED 850M',
  },
  {
    id: 'bom',
    name: 'Mumbai',
    country: 'India',
    x: 68.5,
    y: 47.8,
    marketIndex: 'NIFTY 50',
    changePercent: 1.24,
    currentValue: '24,835.10',
    status: 'Open',
    localTime: '19:15 IST',
    volume: '₹3.4B',
  },
  {
    id: 'sin',
    name: 'Singapore',
    country: 'Singapore',
    x: 77.2,
    y: 59.8,
    marketIndex: 'STI',
    changePercent: 0.45,
    currentValue: '3,412.80',
    status: 'Closed',
    localTime: '21:45 SGT',
    volume: 'S$1.2B',
  },
  {
    id: 'hkg',
    name: 'Hong Kong',
    country: 'Hong Kong SAR',
    x: 79.8,
    y: 47.2,
    marketIndex: 'HANG SENG',
    changePercent: -0.35,
    currentValue: '17,640.20',
    status: 'Closed',
    localTime: '21:45 HKT',
    volume: 'HK$98B',
  },
  {
    id: 'tyo',
    name: 'Tokyo',
    country: 'Japan',
    x: 87.5,
    y: 38.5,
    marketIndex: 'NIKKEI 225',
    changePercent: 1.08,
    currentValue: '38,362.50',
    status: 'Closed',
    localTime: '22:45 JST',
    volume: '¥2.8T',
  },
  {
    id: 'syd',
    name: 'Sydney',
    country: 'Australia',
    x: 89.8,
    y: 78.5,
    marketIndex: 'ASX 200',
    changePercent: 0.52,
    currentValue: '8,080.60',
    status: 'Closed',
    localTime: '23:45 AEST',
    volume: 'A$1.9B',
  },
];

export default function GlobalMarketMap() {
  const [selectedHub, setSelectedHub] = useState<FinancialHub>(HUBS[0]);
  const [hoveredHub, setHoveredHub] = useState<FinancialHub | null>(null);

  const active = hoveredHub || selectedHub;

  return (
    <section id="map" className="relative w-full py-28 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
              Global Financial Infrastructure
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Markets without borders.
          </h2>
          <p className="text-base md:text-lg text-gray-400">
            Track real-time liquidity, institutional order flow, and session momentum across the world&apos;s leading financial centers.
          </p>
        </div>

        {/* 3D Glass Map Terminal Panel */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-white/10 p-6 lg:p-8"
          style={{
            background: 'linear-gradient(180deg, rgba(18, 22, 30, 0.85) 0%, rgba(10, 12, 18, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 229, 255, 0.08)',
          }}
        >
          {/* Map Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-xs text-gray-400 block font-mono">SELECTED CENTER</span>
                <span className="text-lg font-bold text-white flex items-center gap-2">
                  {active.name}, {active.country}
                  <span
                    className="text-xs px-2 py-0.5 rounded font-mono font-bold"
                    style={{
                      background: active.status === 'Open' ? 'rgba(0, 220, 130, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                      color: active.status === 'Open' ? '#00DC82' : '#94a3b8',
                      border: `1px solid ${active.status === 'Open' ? 'rgba(0, 220, 130, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                    }}
                  >
                    {active.status.toUpperCase()}
                  </span>
                </span>
              </div>

              <div className="hidden sm:block h-8 w-[1px] bg-white/10"></div>

              <div className="hidden sm:block">
                <span className="text-xs text-gray-400 block font-mono">BENCHMARK INDEX</span>
                <span className="text-lg font-mono font-bold text-cyan-300">
                  {active.marketIndex} • {active.currentValue}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-right font-mono">
              <div>
                <span className="text-xs text-gray-400 block">SESSION TIME</span>
                <span className="text-sm text-white font-semibold">{active.localTime}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">DAILY RETURN</span>
                <span
                  className="text-sm font-bold flex items-center justify-end gap-1"
                  style={{ color: active.changePercent >= 0 ? '#00DC82' : '#FF4B4B' }}
                >
                  {active.changePercent >= 0 ? '+' : ''}
                  {active.changePercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Interactive World Vector Projection Canvas */}
          <div className="relative w-full aspect-[2/1] min-h-[360px] max-h-[560px] bg-black/40 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
            {/* World Map SVG Vector Silhouette */}
            <svg
              className="w-full h-full object-contain pointer-events-none opacity-40"
              viewBox="0 0 1000 500"
              fill="none"
            >
              {/* Geographically accurate world coastline shapes */}
              <path
                d="M150,120 Q200,80 270,110 T320,190 T240,240 T160,200 Z M220,260 Q270,270 300,340 T270,450 T220,380 T210,290 Z M460,110 Q540,80 570,140 T510,200 T440,150 Z M480,210 Q550,210 580,280 T540,420 T460,320 T470,220 Z M630,90 Q750,70 850,120 T890,240 T780,270 T660,200 T610,130 Z M760,340 Q840,320 890,380 T840,460 T760,430 Z M830,170 Q870,160 880,210 T840,230 Z"
                fill="rgba(0, 229, 255, 0.08)"
                stroke="rgba(0, 229, 255, 0.2)"
                strokeWidth="1.5"
              />
              {/* Latitude / Longitude Matrix Grid Lines */}
              <line x1="0" y1="125" x2="1000" y2="125" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
              <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(0,229,255,0.08)" strokeDasharray="4 4" />
              <line x1="0" y1="375" x2="1000" y2="375" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
              <line x1="250" y1="0" x2="250" y2="500" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
              <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(0,229,255,0.08)" strokeDasharray="4 4" />
              <line x1="750" y1="0" x2="750" y2="500" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />

              {/* Connecting Liquidity Arcs */}
              <path
                d="M275,182 Q380,100 482,142"
                fill="none"
                stroke="url(#arcGrad1)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="animate-pulse"
              />
              <path
                d="M482,142 Q580,180 685,239"
                fill="none"
                stroke="url(#arcGrad1)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <path
                d="M685,239 Q780,280 875,192"
                fill="none"
                stroke="url(#arcGrad1)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <path
                d="M685,239 Q720,270 772,299"
                fill="none"
                stroke="url(#arcGrad1)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <path
                d="M772,299 Q830,340 898,392"
                fill="none"
                stroke="url(#arcGrad1)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />

              <defs>
                <linearGradient id="arcGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Financial Hub Nodes */}
            {HUBS.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              const isHover = hoveredHub?.id === hub.id;
              const isActive = isSelected || isHover;

              return (
                <div
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  onMouseEnter={() => setHoveredHub(hub)}
                  onMouseLeave={() => setHoveredHub(null)}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${hub.x}%`,
                    top: `${hub.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isActive ? 40 : 20,
                  }}
                >
                  {/* Outer Pulsing Beacon Wave */}
                  <div
                    className="absolute -inset-3 rounded-full opacity-75 animate-ping"
                    style={{
                      background: hub.status === 'Open' ? 'rgba(0, 229, 255, 0.4)' : 'rgba(148, 163, 184, 0.2)',
                    }}
                  ></div>

                  {/* Core Node Center */}
                  <div
                    className="relative w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
                    style={{
                      background: hub.status === 'Open' ? '#00E5FF' : '#94a3b8',
                      boxShadow: hub.status === 'Open' ? '0 0 15px #00E5FF' : 'none',
                      border: '2px solid #000',
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  </div>

                  {/* Dynamic Popover Tooltip */}
                  {isActive && (
                    <div
                      className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 p-3 rounded-xl border border-cyan-400/40 backdrop-blur-xl shadow-2xl z-50 whitespace-nowrap pointer-events-none"
                      style={{
                        background: 'rgba(15, 20, 28, 0.95)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 229, 255, 0.2)',
                      }}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <span className="font-bold text-white text-xs">{hub.name}</span>
                        <span
                          className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded"
                          style={{
                            color: hub.changePercent >= 0 ? '#00DC82' : '#FF4B4B',
                            background: hub.changePercent >= 0 ? 'rgba(0,220,130,0.1)' : 'rgba(255,75,75,0.1)',
                          }}
                        >
                          {hub.changePercent >= 0 ? '+' : ''}
                          {hub.changePercent}%
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-cyan-300">
                        {hub.marketIndex}: <span className="text-white font-bold">{hub.currentValue}</span>
                      </div>
                      <div className="text-[9px] font-mono text-gray-400 mt-1">
                        VOL: {hub.volume} • {hub.status.toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Hub Selector Grid Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2.5 mt-6">
            {HUBS.map((hub) => (
              <button
                key={hub.id}
                onClick={() => setSelectedHub(hub)}
                className="flex flex-col p-2.5 rounded-lg text-left transition-all border"
                style={{
                  background: selectedHub.id === hub.id ? 'rgba(0, 229, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  borderColor: selectedHub.id === hub.id ? '#00E5FF' : 'rgba(255, 255, 255, 0.06)',
                  boxShadow: selectedHub.id === hub.id ? '0 0 15px rgba(0, 229, 255, 0.2)' : 'none',
                }}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-bold text-white truncate">{hub.name}</span>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: hub.status === 'Open' ? '#00DC82' : '#64748b' }}
                  ></span>
                </div>
                <div className="text-[10px] font-mono text-gray-400 truncate mt-0.5">{hub.marketIndex}</div>
                <div
                  className="text-[10px] font-mono font-bold mt-1"
                  style={{ color: hub.changePercent >= 0 ? '#00DC82' : '#FF4B4B' }}
                >
                  {hub.changePercent >= 0 ? '+' : ''}
                  {hub.changePercent}%
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

