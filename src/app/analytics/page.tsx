"use client";

import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, AreaChart, Area, ReferenceLine } from 'recharts';

const COLORS = ['#10b981', '#ef4444'];

export default function Analytics() {
  const [mounted, setMounted] = useState(false);
  const [trades, setTrades] = useState<any[]>([]);
  const [currency, setCurrency] = useState('$');

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('tradelens_trades_data');
    if (saved) setTrades(JSON.parse(saved));
    const savedCurrency = localStorage.getItem('tradelens_currency');
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  const formatCurrency = (val: number, hideSign = false) => {
    const absVal = Math.abs(val).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    const sign = val < 0 && !hideSign ? '-' : (val > 0 && !hideSign ? '+' : '');
    return currency === '$' ? `${sign}$${absVal}` : `${sign}${absVal}¢`;
  };

  const stats = useMemo(() => {
    const pnlByDayMap: Record<string, number> = { 'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0 };
    const dateMap: Record<string, number> = {};
    let wins = 0;
    let losses = 0;
    let totalWinAmt = 0;
    let totalLossAmt = 0;

    trades.forEach(t => {
      const d = new Date(t.date);
      if (!isNaN(d.getTime())) {
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        if (pnlByDayMap[dayName] !== undefined) {
          pnlByDayMap[dayName] += t.pnl;
        }
        dateMap[dateStr] = (dateMap[dateStr] || 0) + t.pnl;
      }
      
      if (t.pnl > 0) {
        wins++;
        totalWinAmt += t.pnl;
      } else if (t.pnl < 0) {
        losses++;
        totalLossAmt += Math.abs(t.pnl);
      }
    });

    const pnlByDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      .map(day => ({ day, pnl: pnlByDayMap[day] }))
      .filter(d => (d.day !== 'Sun' && d.day !== 'Sat') || d.pnl !== 0);

    const winLossData = [
      { name: 'Winning Trades', value: wins || (losses === 0 ? 1 : 0) },
      { name: 'Losing Trades', value: losses }
    ];

    let cumulative = 0;
    const sortedDates = Object.keys(dateMap).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const dateWisePnl = sortedDates.map(date => {
      cumulative += dateMap[date];
      return { date, daily: dateMap[date], pnl: cumulative };
    });

    const avgWin = wins > 0 ? totalWinAmt / wins : 0;
    const avgLoss = losses > 0 ? totalLossAmt / losses : 0;
    const profitFactor = totalLossAmt > 0 ? (totalWinAmt / totalLossAmt).toFixed(2) : (totalWinAmt > 0 ? '∞' : '0.00');
    const rrRatio = avgLoss > 0 ? (avgWin / avgLoss).toFixed(2) : (avgWin > 0 ? '∞' : '0.00');

    return {
      pnlByDay,
      dateWisePnl,
      winLossData,
      avgWin,
      avgLoss,
      profitFactor,
      rrRatio
    };
  }, [trades]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8 fade-in" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      
      <header>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Deep Analytics</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Identify your edge and eliminate your weaknesses.</p>
      </header>

      <div className="dashboard-grid" style={{ marginTop: 0 }}>
        
        {/* Date Wise Cumulative P&L */}
        <div className="col-span-12 glass-panel flex flex-col gap-4">
          <h3 style={{ fontSize: '1.2rem' }}>Cumulative P&L (Date Wise)</h3>
          <div style={{ flex: 1, minHeight: '300px', width: '100%', padding: '10px 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.dateWisePnl} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDatePnl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--text-secondary)" tickLine={false} axisLine={false} minTickGap={20} />
                <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} tickFormatter={(val) => currency === '$' ? `$${val}` : `${val}¢`} />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
                <RechartsTooltip 
                  cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                  contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                  formatter={(value: any) => [formatCurrency(Number(value), true), 'Cumulative P&L']}
                  labelStyle={{ color: 'var(--text-secondary)', marginBottom: '8px' }}
                />
                <Area type="monotone" dataKey="pnl" stroke="var(--accent-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorDatePnl)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* P&L by Day of Week */}
        <div className="col-span-8 glass-panel flex flex-col gap-4">
          <h3 style={{ fontSize: '1.2rem' }}>P&L by Day of Week</h3>
          <div style={{ flex: 1, minHeight: '300px', width: '100%', padding: '10px 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.pnlByDay} margin={{ top: 20, right: 30, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="barWin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--success-color)" stopOpacity={1}/>
                    <stop offset="100%" stopColor="var(--success-color)" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="barLoss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--danger-color)" stopOpacity={1}/>
                    <stop offset="100%" stopColor="var(--danger-color)" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} tickFormatter={(val) => currency === '$' ? `$${val}` : `${val}¢`} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                  formatter={(value: any) => [formatCurrency(Number(value), true), 'Net P&L']}
                  labelStyle={{ color: 'var(--text-secondary)', marginBottom: '8px' }}
                />
                <Bar dataKey="pnl" radius={[6, 6, 6, 6]} barSize={40}>
                  {stats.pnlByDay.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? 'url(#barWin)' : 'url(#barLoss)'} />
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
                  data={stats.winLossData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="rgba(0,0,0,0.2)"
                  strokeWidth={2}
                >
                  {stats.winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ filter: `drop-shadow(0px 0px 10px ${COLORS[index % COLORS.length]}40)` }} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: 'white', fontWeight: 600 }}
                  formatter={(value: any) => [`${value} Trades`, 'Count']}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
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
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#c084fc' }}>{stats.profitFactor}</div>
            </div>

            <div className="col-span-3" style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Risk / Reward Ratio</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{stats.rrRatio} : 1</div>
            </div>
            
            <div className="col-span-3" style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Average Winning Trade</div>
              <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--success-color)' }}>
                {formatCurrency(stats.avgWin)}
              </div>
            </div>
            
            <div className="col-span-3" style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Average Losing Trade</div>
              <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--danger-color)' }}>
                {formatCurrency(stats.avgLoss)}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}