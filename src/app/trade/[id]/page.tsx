"use client";

import { useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode, ISeriesApi, CandlestickSeries, createSeriesMarkers } from 'lightweight-charts';
import Link from 'next/link';

// Full Mock OHLC data
const fullData = [
  { time: '2026-05-08', open: 46.10, high: 46.50, low: 45.90, close: 46.45 },
  { time: '2026-05-09', open: 46.45, high: 47.10, low: 46.20, close: 46.80 },
  { time: '2026-05-10', open: 46.80, high: 47.90, low: 46.50, close: 47.70 },
  { time: '2026-05-11', open: 47.70, high: 48.20, low: 47.50, close: 48.00 },
  { time: '2026-05-12', open: 48.00, high: 48.10, low: 46.80, close: 47.00 },
  { time: '2026-05-13', open: 47.00, high: 47.20, low: 45.50, close: 45.80 },
  { time: '2026-05-14', open: 45.80, high: 46.20, low: 45.10, close: 46.00 },
  { time: '2026-05-15', open: 46.00, high: 46.90, low: 45.80, close: 46.80 }, // Entry (Index 7)
  { time: '2026-05-16', open: 46.80, high: 48.00, low: 46.50, close: 47.90 },
  { time: '2026-05-17', open: 47.90, high: 48.50, low: 47.10, close: 47.20 },
  { time: '2026-05-18', open: 47.20, high: 47.50, low: 46.00, close: 46.50 },
  { time: '2026-05-19', open: 46.50, high: 49.00, low: 46.20, close: 48.80 }, // Exit (Index 11)
  { time: '2026-05-20', open: 48.80, high: 49.50, low: 48.50, close: 49.10 },
  { time: '2026-05-21', open: 49.10, high: 49.30, low: 48.20, close: 48.50 },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TradeDetail({ params }: { params: { id: string } }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  // Initialize Chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'rgba(255, 255, 255, 0.6)',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
      timeScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981', downColor: '#ef4444', borderVisible: false,
      wickUpColor: '#10b981', wickDownColor: '#ef4444',
    });
    seriesRef.current = candlestickSeries;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    candlestickSeries.setData(fullData as any);

    // Add Risk/Reward Price Lines to simulate the boxes in the screenshot
    candlestickSeries.createPriceLine({
      price: 46.80,
      color: '#3b82f6',
      lineWidth: 2,
      lineStyle: 0, // Solid line for entry
      axisLabelVisible: true,
      title: 'Entry',
    });

    candlestickSeries.createPriceLine({
      price: 49.00,
      color: '#10b981',
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      title: 'Take Profit',
    });

    candlestickSeries.createPriceLine({
      price: 45.00,
      color: '#ef4444',
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      title: 'Stop Loss',
    });

    // @ts-ignore - Ignore lightweight-charts strict generic type mismatch
    createSeriesMarkers(candlestickSeries, [
      { time: '2026-05-15', position: 'belowBar', color: '#3b82f6', shape: 'arrowUp', text: 'Buy' },
      { time: '2026-05-19', position: 'aboveBar', color: '#eab308', shape: 'arrowDown', text: 'Exit' },
    ] as unknown as Parameters<typeof createSeriesMarkers>[1]);

    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        chart.applyOptions({ width, height });
      }
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);



  return (
    <div className="flex flex-col gap-6 fade-in" style={{ animation: 'fadeIn 0.5s ease-out', height: 'calc(100vh - 80px)' }}>
      
      {/* Header */}
      <header className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="btn btn-outline" style={{ padding: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </Link>
          <div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              AAPL <span className="badge badge-success">WIN</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>May 15, 2026 - May 19, 2026</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-outline">Edit Trade</button>
          <button className="btn btn-primary">Share</button>
        </div>
      </header>

      <div className="trade-detail-grid" style={{ flex: 1 }}>
        
        {/* Left Sidebar: Trade Details */}
        <div className="glass-panel flex flex-col gap-6" style={{ overflowY: 'auto' }}>
          
          <div style={{ textAlign: 'center', borderBottom: '1px solid var(--panel-border)', paddingBottom: '20px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Net P&L</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--success-color)' }}>+$517.60</div>
            <div className="flex justify-center gap-4 mt-2 text-sm text-gray-400">
              <span>Gross: <span className="text-white">$522.40</span></span>
              <span>Fees: <span className="text-white">$4.80</span></span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Execution</h3>
            <div className="flex justify-between" style={{ fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Side</span>
              <span className="text-success font-semibold">LONG</span>
            </div>
            <div className="flex justify-between" style={{ fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Quantity</span>
              <span className="text-white font-semibold">100 Shares</span>
            </div>
            <div className="flex justify-between" style={{ fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Avg Entry</span>
              <span className="text-white font-semibold">$46.80</span>
            </div>
            <div className="flex justify-between" style={{ fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Avg Exit</span>
              <span className="text-white font-semibold">$48.80</span>
            </div>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'var(--panel-border)' }}></div>

          <div className="flex flex-col gap-3">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Behavioral Tags</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Strategy</span>
              <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', alignSelf: 'flex-start' }}>Breakout Retest</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Emotions</span>
              <span className="badge badge-success" style={{ alignSelf: 'flex-start' }}>Calm & Focused</span>
            </div>
          </div>

        </div>

        {/* Right Panel: TradingView Chart */}
        <div className="glass-panel flex flex-col" style={{ padding: 0, overflow: 'hidden' }}>
          
          {/* Chart Toolbar & Replay Controls */}
          <div className="flex items-center justify-between" style={{ padding: '12px 24px', borderBottom: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.2)' }}>
            <div className="flex items-center gap-4">
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>1D</span>
              <div style={{ width: '1px', height: '16px', background: 'var(--panel-border)' }}></div>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>
            </div>
          </div>

          <div ref={chartContainerRef} style={{ flex: 1, width: '100%', position: 'relative' }}></div>
        </div>

      </div>
    </div>
  );
}
