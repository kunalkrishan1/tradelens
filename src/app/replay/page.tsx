"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time, SeriesMarker, CandlestickSeries, createSeriesMarkers } from 'lightweight-charts';

// --- MOCK DATA GENERATOR ---
function generateMockCandles(basePrice: number, count: number, volatility: number): CandlestickData[] {
  let currentPrice = basePrice;
  const candles: CandlestickData[] = [];
  const startTime = Math.floor(Date.now() / 1000) - (count * 60);

  for (let i = 0; i < count; i++) {
    const open = currentPrice;
    const move = (Math.random() - 0.5) * volatility;
    const close = open + move;
    const high = Math.max(open, close) + (Math.random() * volatility * 0.5);
    const low = Math.min(open, close) - (Math.random() * volatility * 0.5);
    
    candles.push({
      time: (startTime + (i * 60)) as Time, // 1 min intervals
      open,
      high,
      low,
      close,
    });
    currentPrice = close;
  }
  return candles;
}

export default function ReplayEngine() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const markersRef = useRef<any>(null);

  // Replay State
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // ms per candle
  const [currentIndex, setCurrentIndex] = useState(50); // Start with 50 candles visible
  
  // Trade Data (Mocking a specific trade for replay)
  const trade = useMemo(() => {
    const entryPrice = 45100.50;
    const candles = generateMockCandles(45000, 200, 50); // Generate 200 candles
    
    // Inject exact entry/exit into the candle data to make it look realistic
    const entryIndex = 70;
    const exitIndex = 140;
    
    return {
      symbol: 'BTCUSD',
      side: 'LONG',
      entryPrice,
      exitPrice: 45600.00,
      sl: 44900.00,
      tp: 45800.00,
      entryIndex,
      exitIndex,
      candles
    };
  }, []);

  const [aiInsights, setAiInsights] = useState<string[]>([]);

  // Initialize Chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.05)' },
        horzLines: { color: 'rgba(255,255,255,0.05)' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 0,
      }
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    const seriesMarkers = createSeriesMarkers(series);
    markersRef.current = seriesMarkers;

    // Set initial data
    series.setData(trade.candles.slice(0, currentIndex));

    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [trade]);

  // Animation Loop & Markers
  useEffect(() => {
    if (!seriesRef.current) return;

    // Update visible data
    seriesRef.current.setData(trade.candles.slice(0, currentIndex));

    // Update Markers
    const markers: SeriesMarker<Time>[] = [];
    if (currentIndex >= trade.entryIndex) {
      markers.push({
        time: trade.candles[trade.entryIndex].time,
        position: 'belowBar',
        color: '#3b82f6',
        shape: 'arrowUp',
        text: 'ENTRY',
      });
    }
    if (currentIndex >= trade.exitIndex) {
      markers.push({
        time: trade.candles[trade.exitIndex].time,
        position: 'aboveBar',
        color: '#ec4899',
        shape: 'arrowDown',
        text: 'EXIT',
      });
    }
    if (markersRef.current) {
      markersRef.current.setMarkers(markers);
    }

    // AI Insights Logic
    if (currentIndex === trade.entryIndex + 5) {
      setAiInsights(prev => [...prev, '⚡ Perfect Entry execution. Price immediately gained momentum.']);
    }
    if (currentIndex === trade.exitIndex) {
      setAiInsights(prev => [...prev, '⚠️ Early Exit detected! You closed before hitting Take Profit, leaving potential RR on the table.']);
    }

    // Playback Loop
    let interval: NodeJS.Timeout;
    if (isPlaying && currentIndex < trade.candles.length) {
      interval = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= trade.candles.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying, speed, trade]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(50);
    setAiInsights([]);
  };

  return (
    <div className="flex flex-col gap-6 fade-in" style={{ height: 'calc(100vh - 80px)', animation: 'fadeIn 0.5s ease-out' }}>
      
      <header className="flex justify-between items-center">
        <div>
          <div className="flex gap-4 items-center">
            <h1 style={{ fontSize: '2rem', marginBottom: '4px' }}>Trade Replay Engine</h1>
            <span className="badge badge-success" style={{ fontSize: '0.9rem' }}>{trade.symbol} {trade.side}</span>
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>Relive your execution candle-by-candle to expose behavioral mistakes.</p>
        </div>
      </header>

      <div className="flex gap-6" style={{ flex: 1, minHeight: 0 }}>
        
        {/* Main Chart Area */}
        <div className="flex flex-col gap-4" style={{ flex: 3 }}>
          <div className="glass-panel" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-6 text-sm">
                <div>Entry: <span style={{ color: 'white' }}>${trade.entryPrice.toFixed(2)}</span></div>
                <div>Target: <span style={{ color: 'var(--success-color)' }}>${trade.tp.toFixed(2)}</span></div>
                <div>Stop: <span style={{ color: 'var(--danger-color)' }}>${trade.sl.toFixed(2)}</span></div>
              </div>
            </div>
            
            {/* Chart Container */}
            <div ref={chartContainerRef} style={{ flex: 1, width: '100%' }}></div>
          </div>

          {/* Timeline & Controls Panel */}
          <div className="glass-panel flex items-center gap-6" style={{ padding: '16px 24px' }}>
            <button onClick={handlePlayPause} className="btn btn-primary" style={{ width: '48px', height: '48px', borderRadius: '50%', padding: 0 }}>
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              )}
            </button>
            
            <button onClick={handleReset} className="btn btn-outline" style={{ padding: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v6h6"></path><path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path></svg>
            </button>

            <div className="flex flex-col" style={{ flex: 1 }}>
              <input 
                type="range" 
                min={1} 
                max={trade.candles.length} 
                value={currentIndex}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentIndex(parseInt(e.target.value));
                }}
                style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--accent-color)' }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Start</span>
                <span>Entry</span>
                <span>Exit</span>
                <span>End</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setSpeed(1000)} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.8rem', background: speed === 1000 ? 'rgba(255,255,255,0.1)' : 'transparent' }}>1x</button>
              <button onClick={() => setSpeed(250)} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.8rem', background: speed === 250 ? 'rgba(255,255,255,0.1)' : 'transparent' }}>4x</button>
              <button onClick={() => setSpeed(50)} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.8rem', background: speed === 50 ? 'rgba(255,255,255,0.1)' : 'transparent' }}>Max</button>
            </div>
          </div>
        </div>

        {/* AI Review Panel */}
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px' }}>
          <div className="flex items-center gap-2 mb-6" style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '16px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>AI Execution Review</h3>
          </div>

          <div className="flex flex-col gap-4" style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
            {aiInsights.length === 0 ? (
              <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'center', marginTop: '20px' }}>
                Hit Play to start the replay. AI insights will populate dynamically based on your execution...
              </div>
            ) : (
              aiInsights.map((insight, idx) => (
                <div key={idx} className="fade-in" style={{ 
                  background: insight.includes('⚠️') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  borderLeft: `4px solid ${insight.includes('⚠️') ? 'var(--danger-color)' : 'var(--success-color)'}`,
                  padding: '16px',
                  borderRadius: '0 8px 8px 0',
                  fontSize: '0.9rem',
                  lineHeight: 1.5
                }}>
                  {insight}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
