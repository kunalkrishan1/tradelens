"use client";

import { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { createChart, CrosshairMode, CandlestickSeries } from 'lightweight-charts';
const pnlByDay = [
  { day: 'Mon', pnl: 850 },
  { day: 'Tue', pnl: 1200 },
  { day: 'Wed', pnl: -450 },
  { day: 'Thu', pnl: 2100 },
  { day: 'Fri', pnl: 600 },
];

const winLossData = [
  { name: 'Winning Trades', value: 68 },
  { name: 'Losing Trades', value: 32 },
];
const COLORS = ['#10b981', '#ef4444'];

export default function Analytics() {
  const [mounted, setMounted] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);
  const [replaySpeed, setReplaySpeed] = useState(1);
  const [activeAsset, setActiveAsset] = useState('AAPL');
  
  const chartContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seriesRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataRef = useRef<any[]>([]);
  const currentIndexRef = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  // Generate random data for the simulator based on asset
  useEffect(() => {
    let currentPrice = activeAsset === 'AAPL' ? 150 : activeAsset === 'TSLA' ? 200 : 450;
    let time = new Date('2025-01-01').getTime();
    const data = [];
    for (let i = 0; i < 300; i++) {
      const volatility = activeAsset === 'TSLA' ? 5 : 2;
      const open = currentPrice + (Math.random() - 0.5) * volatility;
      const high = open + Math.random() * volatility;
      const low = open - Math.random() * volatility;
      const close = low + Math.random() * (high - low);
      currentPrice = close;
      
      const dateStr = new Date(time).toISOString().split('T')[0];
      data.push({ time: dateStr, open, high, low, close });
      time += 24 * 60 * 60 * 1000;
    }
    dataRef.current = data;
    currentIndexRef.current = 50; // Start with 50 candles visible
  }, [activeAsset]);

  // Chart instantiation
  useEffect(() => {
    if (!chartContainerRef.current || !mounted) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: 'solid' as any, color: 'transparent' },
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

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981', downColor: '#ef4444', borderVisible: false,
      wickUpColor: '#10b981', wickDownColor: '#ef4444',
    });
    seriesRef.current = series;

    series.setData(dataRef.current.slice(0, currentIndexRef.current));
    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) chart.applyOptions({ width, height });
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [mounted, activeAsset]);

  // Replay interval logic
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isReplaying) {
      intervalId = setInterval(() => {
        if (currentIndexRef.current < dataRef.current.length && seriesRef.current) {
          const nextCandle = dataRef.current[currentIndexRef.current];
          seriesRef.current.update(nextCandle);
          currentIndexRef.current += 1;
        } else {
          setIsReplaying(false);
          clearInterval(intervalId);
        }
      }, 1000 / replaySpeed); 
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isReplaying, replaySpeed]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8 fade-in" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      
      <header>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Deep Analytics</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Identify your edge and eliminate your weaknesses.</p>
      </header>

      <div className="dashboard-grid" style={{ marginTop: 0 }}>
        
        {/* P&L by Day of Week */}
        <div className="col-span-8 glass-panel flex flex-col gap-4">
          <h3 style={{ fontSize: '1.2rem' }}>P&L by Day of Week</h3>
          <div style={{ flex: 1, minHeight: '300px', width: '100%', padding: '10px 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pnlByDay} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '8px', backdropFilter: 'blur(10px)' }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`$${value}`, 'P&L']}
                />
                <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                  {pnlByDay.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.pnl > 0 ? 'var(--success-color)' : 'var(--danger-color)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Win/Loss Distribution */}
        <div className="col-span-4 glass-panel flex flex-col gap-4">
          <h3 style={{ fontSize: '1.2rem' }}>Win / Loss Distribution</h3>
          <div style={{ flex: 1, minHeight: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'white' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trade Statistics Table */}
        <div className="col-span-12 glass-panel">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Detailed Statistics</h3>
          <div className="dashboard-grid" style={{ marginTop: 0, gap: '16px' }}>
            <div className="col-span-3" style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Profit Factor</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#c084fc' }}>2.14</div>
            </div>

            <div className="col-span-3" style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Risk / Reward Ratio</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>2.2 : 1</div>
            </div>
            
            <div className="col-span-3" style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Average Winning Trade</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--success-color)' }}>+$420.50</div>
            </div>
            
            <div className="col-span-3" style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Average Losing Trade</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--danger-color)' }}>-$190.25</div>
            </div>
          </div>
        </div>

        {/* Trade Replay Simulator */}
        <div className="col-span-12 glass-panel flex flex-col" style={{ padding: 0, overflow: 'hidden', minHeight: '600px', marginTop: '24px' }}>
          
          <div className="flex items-center justify-between" style={{ padding: '16px 24px', borderBottom: '1px solid var(--panel-border)', background: 'var(--panel-bg)' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Trade Replay Simulator</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Backtest your edge in a simulated live environment</p>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={activeAsset} 
                onChange={(e) => { setActiveAsset(e.target.value); setIsReplaying(false); }}
                style={{ background: 'var(--bg-color)', color: 'var(--text-primary)', border: '1px solid var(--panel-border)', padding: '6px 12px', borderRadius: '6px', outline: 'none' }}
              >
                <option value="AAPL">AAPL (Apple Inc)</option>
                <option value="TSLA">TSLA (Tesla Inc)</option>
                <option value="SPY">SPY (S&P 500 ETF)</option>
              </select>

              <div style={{ width: '1px', height: '24px', background: 'var(--panel-border)' }}></div>

              <select 
                value={replaySpeed} 
                onChange={(e) => setReplaySpeed(Number(e.target.value))}
                style={{ background: 'var(--bg-color)', color: 'var(--text-primary)', border: '1px solid var(--panel-border)', padding: '6px 12px', borderRadius: '6px', outline: 'none' }}
              >
                <option value="1">1x Speed</option>
                <option value="2">2x Speed</option>
                <option value="5">5x Speed</option>
                <option value="10">10x Speed</option>
              </select>
              
              <button 
                onClick={() => setIsReplaying(!isReplaying)}
                className="btn" 
                style={{ 
                  background: isReplaying ? 'var(--danger-glow)' : 'var(--accent-glow)',
                  color: isReplaying ? 'var(--danger-color)' : 'var(--accent-color)',
                  border: isReplaying ? '1px solid var(--danger-color)' : '1px solid var(--accent-color)',
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 16px' 
                }}
              >
                {isReplaying ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Play
                  </>
                )}
              </button>
            </div>
          </div>

          <div ref={chartContainerRef} style={{ flex: 1, width: '100%', position: 'relative' }}></div>
        </div>

      </div>
    </div>
  );
}
