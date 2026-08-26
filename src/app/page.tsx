'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
type Trade = {
  id: string;
  symbol: string;
  side?: string;
  date?: string;git 
  open?: string;
  pnl?: number;
  tags?: string[];
};

const fallbackTrades: Trade[] = [
  { id: 'T-1049', symbol: 'NVDA', side: 'LONG', date: '2026-05-08 09:30', pnl: 2640, tags: ['Breakout'] },
  { id: 'T-1048', symbol: 'TSLA', side: 'SHORT', date: '2026-05-07 13:15', pnl: 1650, tags: ['VWAP Reject'] },
  { id: 'T-1047', symbol: 'SPY', side: 'LONG', date: '2026-05-06 10:00', pnl: -700, tags: ['Chop'] },
  { id: 'T-1046', symbol: 'AMD', side: 'LONG', date: '2026-05-05 09:35', pnl: 1275, tags: ['Gap and Go'] },
  { id: 'T-1045', symbol: 'META', side: 'SHORT', date: '2026-05-04 14:30', pnl: -825, tags: ['News Catalyst'] },
];

const formatCurrency = (value: number) => `${value < 0 ? '-' : '+'}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function HomePage() {
  const [trades, setTrades] = useState<Trade[]>(fallbackTrades);
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    const savedTrades = localStorage.getItem('tradelens_trades_data');
    if (savedTrades) {
      try {
        setTrades(JSON.parse(savedTrades));
      } catch {
        setTrades(fallbackTrades);
      }
    }
    setMounted(true);
  }, []);

  const stats = useMemo(() => {
    const totalPnl = trades.reduce((sum, trade) => sum + Number(trade.pnl || 0), 0);
    const winners = trades.filter(trade => Number(trade.pnl || 0) > 0).length;
    const losses = trades.filter(trade => Number(trade.pnl || 0) < 0).length;
    const grossProfit = trades.reduce((sum, trade) => sum + Math.max(Number(trade.pnl || 0), 0), 0);
    const grossLoss = trades.reduce((sum, trade) => sum + Math.abs(Math.min(Number(trade.pnl || 0), 0)), 0);
    const equity = [...trades].reverse().reduce<{ date: string; equity: number }[]>((points, trade) => {
      const equity = (points.at(-1)?.equity || 0) + Number(trade.pnl || 0);
      points.push({ date: (trade.date || trade.open || '').split(' ')[0].slice(5) || 'Today', equity });
      return points;
    }, []);

    return { totalPnl, winners, losses, grossProfit, grossLoss, equity, winRate: trades.length ? (winners / trades.length) * 100 : 0 };
  }, [trades]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8 fade-in" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header className="flex justify-between items-center">
        <div>
          <p style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Monday, May 11, 2026</p>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Good morning, trader.</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Your execution at a glance. Stay focused on the process.</p>
        </div>
        <Link href="/journal" className="btn btn-primary">
          <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>+</span> Log Trade
        </Link>
      </header>

      <section className="dashboard-grid" style={{ marginTop: 0 }}>
        <div className="col-span-3 glass-panel stat-card">
          <span className="stat-label">Net P&L</span>
          <strong className={`stat-value ${stats.totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>{formatCurrency(stats.totalPnl)}</strong>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Across {trades.length} closed trades</span>
        </div>
        <div className="col-span-3 glass-panel stat-card">
          <span className="stat-label">Win Rate</span>
          <strong className="stat-value">{stats.winRate.toFixed(1)}%</strong>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{stats.winners} wins / {stats.losses} losses</span>
        </div>
        <div className="col-span-3 glass-panel stat-card">
          <span className="stat-label">Profit Factor</span>
          <strong className="stat-value" style={{ color: 'var(--accent-color)' }}>{stats.grossLoss ? (stats.grossProfit / stats.grossLoss).toFixed(2) : '0.00'}</strong>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Gross profit vs. loss</span>
        </div>
        <div className="col-span-3 glass-panel stat-card">
          <span className="stat-label">Best Trade</span>
          <strong className="stat-value text-success">{formatCurrency(Math.max(...trades.map(trade => Number(trade.pnl || 0)), 0))}</strong>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Highest single-session return</span>
        </div>

        <div className="col-span-8 glass-panel" style={{ minHeight: '360px' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Equity curve</h2>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Cumulative performance</span>
            </div>
            <span className="badge badge-success">Live account</span>
          </div>
          <div style={{ height: '270px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.equity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs><linearGradient id="dashboardEquity" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent-color)" stopOpacity={0.45} /><stop offset="100%" stopColor="var(--accent-color)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} tickFormatter={value => `$${value}`} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '12px' }} formatter={(value: number | undefined) => [formatCurrency(Number(value || 0)), 'Equity']} />
                <Area type="monotone" dataKey="equity" stroke="var(--accent-color)" strokeWidth={3} fill="url(#dashboardEquity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-4 glass-panel" style={{ minHeight: '360px' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.2rem' }}>Recent executions</h2>
            <Link href="/journal" style={{ color: 'var(--accent-color)', fontSize: '0.8rem' }}>View journal</Link>
          </div>
          <div className="flex flex-col gap-4">
            {trades.slice(0, 5).map(trade => {
              const pnl = Number(trade.pnl || 0);
              return <Link href={`/trade/${trade.id}`} key={trade.id} className="flex items-center justify-between" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--panel-border)' }}>
                <div className="flex items-center gap-3">
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'grid', placeItems: 'center', background: pnl >= 0 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: pnl >= 0 ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 700, fontSize: '0.75rem' }}>{trade.symbol.slice(0, 2)}</div>
                  <div><strong style={{ display: 'block', fontSize: '0.9rem' }}>{trade.symbol}</strong><span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{trade.side || 'TRADE'} · {trade.tags?.[0] || 'Un tagged'}</span></div>
                </div>
                <strong className={pnl >= 0 ? 'text-success' : 'text-danger'} style={{ fontSize: '0.85rem' }}>{formatCurrency(pnl)}</strong>
              </Link>;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}