"use client";

import { useState, useEffect, useMemo } from 'react';

export default function Calendar() {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [trades, setTrades] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem('tradelens_trades_data');
    if (saved) {
      setTrades(JSON.parse(saved));
    }
  }, []);

  const dailyStats = useMemo(() => {
    const stats: Record<string, { pnl: number, trades: number, emotion: string }> = {};
    trades.forEach(t => {
      const d = new Date(t.date);
      if (isNaN(d.getTime())) return;
      
      const day = d.getDate();
      const month = d.getMonth();
      const year = d.getFullYear();
      
      const key = `${year}-${month}-${day}`;
      if (!stats[key]) {
        stats[key] = { pnl: 0, trades: 0, emotion: 'Calm & Focused' };
      }
      stats[key].pnl += t.pnl;
      stats[key].trades += 1;
      
      if (stats[key].pnl < -100) stats[key].emotion = 'Frustrated';
      if (stats[key].pnl < -500) stats[key].emotion = 'Revenge / Angry';
    });
    return stats;
  }, [trades]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col gap-8 fade-in" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Profit Calendar</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track your daily consistency and prop firm evaluation progress.</p>
      </header>

      <div className="dashboard-grid" style={{ marginTop: 0 }}>
        
        {/* Calendar Grid */}
        <div className="col-span-8 glass-panel flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                &larr;
              </button>
              <h2 style={{ fontSize: '1.25rem', minWidth: '140px', textAlign: 'center' }}>{monthName}</h2>
              <button 
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                &rarr;
              </button>
            </div>
            <div className="flex gap-4 items-center" style={{ fontSize: '0.85rem' }}>
              <div className="flex items-center gap-2">
                <div style={{ width: '12px', height: '12px', background: 'var(--success-color)', borderRadius: '2px', opacity: 0.8 }}></div> 
                <span style={{ color: 'var(--text-secondary)' }}>Profit Day</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{ width: '12px', height: '12px', background: 'var(--danger-color)', borderRadius: '2px', opacity: 0.8 }}></div> 
                <span style={{ color: 'var(--text-secondary)' }}>Loss Day</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, paddingBottom: '8px' }}>{day}</div>
            ))}
            
            {/* Empty days for offset */}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
            
            {/* Calendar Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const key = `${year}-${month}-${day}`;
              const data = dailyStats[key];
              const dateObj = new Date(year, month, day);
              const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
              const hasData = !!data;
              const isProfit = hasData && data.pnl > 0;
              const isLoss = hasData && data.pnl < 0;
              
              return (
                <div 
                  key={day} 
                  className="calendar-cell relative"
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  style={{ 
                    background: isProfit ? 'rgba(16, 185, 129, 0.15)' : isLoss ? 'rgba(239, 68, 68, 0.15)' : isWeekend ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)',
                    border: isProfit ? '1px solid rgba(16, 185, 129, 0.3)' : isLoss ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '12px',
                    minHeight: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: hasData ? 'pointer' : 'default',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    transform: hoveredDay === day && hasData ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: hoveredDay === day && hasData ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' : 'none',
                    zIndex: hoveredDay === day ? 10 : 1
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: isWeekend ? 'var(--text-secondary)' : 'white' }}>{day}</span>
                  
                  {hasData && (
                    <span style={{ 
                      fontWeight: 700, 
                      fontSize: '1rem',
                      color: isProfit ? 'var(--success-color)' : 'var(--danger-color)'
                    }}>
                      {isProfit ? '+' : '-'}${Math.abs(data.pnl).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                  )}

                  {/* Hover Tooltip */}
                  {hoveredDay === day && hasData && (
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--panel-bg)',
                      border: '1px solid var(--panel-border)',
                      borderRadius: '8px',
                      padding: '12px',
                      width: '160px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                      zIndex: 20,
                      backdropFilter: 'blur(20px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <div className="flex justify-between" style={{ fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Trades:</span>
                        <span style={{ fontWeight: 600 }}>{data.trades}</span>
                      </div>
                      <div className="flex justify-between" style={{ fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Win Rate:</span>
                        <span style={{ fontWeight: 600 }}>{isProfit ? '100%' : '0%'}</span>
                      </div>
                      <div className="flex flex-col mt-1" style={{ fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Dominant Emotion:</span>
                        <span style={{ fontWeight: 600, color: isProfit ? 'var(--success-color)' : 'var(--danger-color)' }}>{data.emotion}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Prop Firm Tracker Panel */}
        <div className="col-span-4 flex flex-col gap-6">
          <div className="glass-panel flex flex-col gap-6" style={{ background: 'linear-gradient(to bottom, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.4))' }}>
            
            <div className="flex justify-between items-center" style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Apex 50k Evaluation</h2>
              <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)' }}>Active</span>
            </div>

            {/* Profit Target Gauge */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Profit Target ($3,000)</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--success-color)' }}>$1,850</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--panel-border)' }}>
                <div style={{ width: '61.6%', height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}></div>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'right' }}>61.6% Complete</span>
            </div>

            {/* Trailing Drawdown */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-end">
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Trailing Drawdown ($2,500)</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>$2,100 <span style={{fontSize: '0.8rem', color:'var(--text-secondary)', fontWeight: 400}}>buffer</span></span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--panel-border)' }}>
                <div style={{ width: '84%', height: '100%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)' }}></div>
              </div>
            </div>

            {/* Consistency Rule */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-end">
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Consistency Rule (30%)</span>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'white' }}>Passed</span>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px', borderRadius: '8px', color: '#6ee7b7', fontSize: '0.85rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                Your best day ($450) is 24% of your total profit, safely under the 30% limit.
              </div>
            </div>
            
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              View Account Rules
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
