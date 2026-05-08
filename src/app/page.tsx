"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import CSVImportModal, { ParsedTrade } from './CSVImportModal';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, BarChart, Bar, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { ResponsiveGridLayout, Layout } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Mock Data
const data = [
  { pnl: 400, daily: 400 }, { pnl: 300, daily: -100 }, { pnl: 600, daily: 300 },
  { pnl: 800, daily: 200 }, { pnl: 500, daily: -300 }, { pnl: 900, daily: 400 },
  { pnl: 1100, daily: 200 }
];

const radarData = [
  { subject: 'Discipline', A: 90, fullMark: 100 },
  { subject: 'Patience', A: 85, fullMark: 100 },
  { subject: 'Risk Mgmt', A: 95, fullMark: 100 },
  { subject: 'Execution', A: 80, fullMark: 100 },
  { subject: 'Review', A: 75, fullMark: 100 },
];

const gaugeData = [
  { name: 'Win', value: 68, fill: 'var(--success-color)' },
  { name: 'Loss', value: 32, fill: 'var(--danger-color)' }
];

const scatterData = [
  { x: 9.5, y: 120, z: 20 }, { x: 10.2, y: -50, z: 20 }, { x: 11.5, y: 300, z: 20 },
  { x: 14.0, y: 150, z: 20 }, { x: 15.5, y: -100, z: 20 }, { x: 10.0, y: 400, z: 20 },
  { x: 9.8, y: 250, z: 20 }, { x: 13.5, y: -20, z: 20 }, { x: 14.8, y: 180, z: 20 }
];

const recentTrades = [
  { id: 't1', date: 'May 07, 2026', symbol: 'NQ1!', type: 'LONG', pnl: 450.00 },
  { id: 't2', date: 'May 07, 2026', symbol: 'ES1!', type: 'SHORT', pnl: -150.00 },
  { id: 't3', date: 'May 06, 2026', symbol: 'AAPL', type: 'LONG', pnl: 820.50 },
  { id: 't4', date: 'May 06, 2026', symbol: 'TSLA', type: 'SHORT', pnl: 340.00 },
  { id: 't5', date: 'May 05, 2026', symbol: 'GC1!', type: 'LONG', pnl: -210.00 },
];

const pfData = [
  { name: 'PF', value: 75, fill: 'var(--accent-color)' },
  { name: 'Rest', value: 25, fill: 'rgba(255,255,255,0.05)' }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '12px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>{label}</p>
        <div className="flex justify-between gap-6 mb-1">
          <span style={{ fontSize: '0.9rem' }}>Cumulative P&L:</span>
          <span style={{ fontWeight: 600, color: data.pnl >= 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
            ${data.pnl.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between gap-6">
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Daily Net:</span>
          <span style={{ fontSize: '0.9rem', color: data.daily >= 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
            {data.daily >= 0 ? '+' : '-'}${Math.abs(data.daily).toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const hour = Math.floor(data.x);
    const minutes = Math.floor((data.x - hour) * 60);
    const timeStr = `${hour}:${minutes.toString().padStart(2, '0')}`;
    
    return (
      <div style={{ backgroundColor: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Time: {timeStr}</p>
        <div className="flex justify-between gap-6">
          <span style={{ fontSize: '0.9rem' }}>P&L:</span>
          <span style={{ fontWeight: 600, color: data.y >= 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
            {data.y >= 0 ? '+' : '-'}${Math.abs(data.y).toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const defaultLayout: Layout = [
  { i: '1', x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
  { i: '2', x: 2, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
  { i: '3', x: 4, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: '4', x: 7, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: '5', x: 10, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
  { i: '6', x: 0, y: 2, w: 3, h: 4, minW: 3, minH: 3 },
  { i: '7', x: 3, y: 2, w: 5, h: 4, minW: 4, minH: 3 },
  { i: '8', x: 8, y: 2, w: 4, h: 4, minW: 3, minH: 3 },
  { i: '9', x: 0, y: 6, w: 5, h: 5, minW: 4, minH: 3 },
  { i: '10', x: 5, y: 6, w: 7, h: 5, minW: 4, minH: 3 }
];

const pnlLayout: Layout = [
  { i: '1', x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: '4', x: 3, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: '2', x: 6, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: '5', x: 9, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: '7', x: 0, y: 2, w: 8, h: 6, minW: 4, minH: 4 },
  { i: '8', x: 8, y: 2, w: 4, h: 6, minW: 3, minH: 4 },
  { i: '9', x: 0, y: 8, w: 12, h: 4, minW: 6, minH: 3 },
  { i: '3', x: 0, y: 12, w: 4, h: 3 },
  { i: '6', x: 4, y: 12, w: 4, h: 4 },
  { i: '10', x: 8, y: 12, w: 4, h: 4 }
];

const analyticsLayout: Layout = [
  { i: '10', x: 0, y: 0, w: 8, h: 5 },
  { i: '6', x: 8, y: 0, w: 4, h: 5 },
  { i: '7', x: 0, y: 5, w: 6, h: 4 },
  { i: '8', x: 6, y: 5, w: 6, h: 4 },
  { i: '3', x: 0, y: 9, w: 3, h: 2 },
  { i: '4', x: 3, y: 9, w: 3, h: 2 },
  { i: '5', x: 6, y: 9, w: 3, h: 2 },
  { i: '2', x: 9, y: 9, w: 3, h: 2 },
  { i: '1', x: 0, y: 11, w: 4, h: 2 },
  { i: '9', x: 4, y: 11, w: 8, h: 4 }
];

const minimalLayout: Layout = [
  { i: '1', x: 0, y: 0, w: 4, h: 3 },
  { i: '4', x: 4, y: 0, w: 4, h: 3 },
  { i: '3', x: 8, y: 0, w: 4, h: 3 },
  { i: '7', x: 0, y: 3, w: 12, h: 6 },
  { i: '9', x: 0, y: 9, w: 12, h: 5 },
  { i: '2', x: 0, y: 14, w: 3, h: 2 },
  { i: '5', x: 3, y: 14, w: 3, h: 2 },
  { i: '6', x: 6, y: 14, w: 3, h: 3 },
  { i: '8', x: 9, y: 14, w: 3, h: 3 },
  { i: '10', x: 0, y: 17, w: 6, h: 4 }
];

const logLayout: Layout = [
  { i: '9', x: 0, y: 0, w: 12, h: 8 },
  { i: '1', x: 0, y: 8, w: 3, h: 2 },
  { i: '4', x: 3, y: 8, w: 3, h: 2 },
  { i: '7', x: 6, y: 8, w: 6, h: 4 },
  { i: '3', x: 0, y: 10, w: 3, h: 2 },
  { i: '5', x: 3, y: 10, w: 3, h: 2 },
  { i: '8', x: 0, y: 12, w: 6, h: 4 },
  { i: '6', x: 6, y: 12, w: 3, h: 4 },
  { i: '10', x: 9, y: 12, w: 3, h: 4 },
  { i: '2', x: 0, y: 16, w: 3, h: 2 }
];

const performanceLayout: Layout = [
  { i: '1', x: 0, y: 0, w: 4, h: 3 },
  { i: '3', x: 4, y: 0, w: 4, h: 3 },
  { i: '5', x: 8, y: 0, w: 4, h: 3 },
  { i: '6', x: 0, y: 3, w: 4, h: 5 },
  { i: '10', x: 4, y: 3, w: 8, h: 5 },
  { i: '7', x: 0, y: 8, w: 6, h: 4 },
  { i: '8', x: 6, y: 8, w: 6, h: 4 },
  { i: '9', x: 0, y: 12, w: 12, h: 4 },
  { i: '2', x: 0, y: 16, w: 3, h: 2 },
  { i: '4', x: 3, y: 16, w: 3, h: 2 }
];

const psychologyLayout: Layout = [
  { i: '6', x: 0, y: 0, w: 6, h: 6 },
  { i: '4', x: 6, y: 0, w: 6, h: 3 },
  { i: '3', x: 6, y: 3, w: 6, h: 3 },
  { i: '10', x: 0, y: 6, w: 12, h: 5 },
  { i: '1', x: 0, y: 11, w: 4, h: 2 },
  { i: '2', x: 4, y: 11, w: 4, h: 2 },
  { i: '5', x: 8, y: 11, w: 4, h: 2 },
  { i: '7', x: 0, y: 13, w: 6, h: 4 },
  { i: '8', x: 6, y: 13, w: 6, h: 4 },
  { i: '9', x: 0, y: 17, w: 12, h: 4 }
];

const scalperLayout: Layout = [
  { i: '1', x: 0, y: 0, w: 3, h: 2 },
  { i: '4', x: 3, y: 0, w: 3, h: 2 },
  { i: '8', x: 6, y: 0, w: 6, h: 4 },
  { i: '3', x: 0, y: 2, w: 3, h: 2 },
  { i: '5', x: 3, y: 2, w: 3, h: 2 },
  { i: '9', x: 0, y: 4, w: 12, h: 4 },
  { i: '7', x: 0, y: 8, w: 8, h: 4 },
  { i: '6', x: 8, y: 8, w: 4, h: 4 },
  { i: '10', x: 0, y: 12, w: 8, h: 4 },
  { i: '2', x: 8, y: 12, w: 4, h: 2 }
];

const multiMonitorLayout: Layout = [
  { i: '7', x: 0, y: 0, w: 8, h: 5 },
  { i: '10', x: 8, y: 0, w: 4, h: 5 },
  { i: '1', x: 0, y: 5, w: 2, h: 2 },
  { i: '4', x: 2, y: 5, w: 2, h: 2 },
  { i: '3', x: 4, y: 5, w: 2, h: 2 },
  { i: '5', x: 6, y: 5, w: 2, h: 2 },
  { i: '2', x: 8, y: 5, w: 2, h: 2 },
  { i: '6', x: 10, y: 5, w: 2, h: 4 },
  { i: '8', x: 0, y: 7, w: 5, h: 4 },
  { i: '9', x: 5, y: 7, w: 5, h: 4 }
];

const customPresets: Record<string, Layout> = {
  'Default': defaultLayout,
  'P&L Focused': pnlLayout,
  'Analytics Heavy': analyticsLayout,
  'Minimal Clean': minimalLayout,
  'Trade Log Focused': logLayout,
  'Performance Review': performanceLayout,
  'Psychology Dashboard': psychologyLayout,
  'Scalper Workspace': scalperLayout,
  'Multi-Monitor Pro': multiMonitorLayout
};

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<'1W' | '1M' | 'YTD'>('1M');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  
  // Layout state
  const [layout, setLayout] = useState<Layout>(defaultLayout);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLayoutMenuOpen, setIsLayoutMenuOpen] = useState(false);
  const [activeLayoutName, setActiveLayoutName] = useState('Default');

  const applyLayoutPreset = (name: string, newLayout: Layout) => {
    setLayout(newLayout);
    setActiveLayoutName(name);
    setIsLayoutMenuOpen(false);
    localStorage.setItem('tradelens_dashboard_layout', JSON.stringify(newLayout));
    localStorage.setItem('tradelens_dashboard_preset', name);
  };

  const [trades, setTrades] = useState(recentTrades);

  const { totalPnL, winRate, profitFactor, expectancy, avgWinLossRatio, winRateNum, grossLossNum, grossProfitNum } = useMemo(() => {
    let wins = 0;
    let losses = 0;
    let grossProfit = 0;
    let grossLoss = 0;
    let totalPnl = 0;

    trades.forEach(t => {
      totalPnl += t.pnl;
      if (t.pnl >= 0) {
        wins++;
        grossProfit += t.pnl;
      } else {
        losses++;
        grossLoss += Math.abs(t.pnl);
      }
    });

    const total = trades.length;
    const wr = total > 0 ? (wins / total) : 0;
    const wrStr = Math.round(wr * 100) + '%';
    const pf = grossLoss > 0 ? (grossProfit / grossLoss) : (grossProfit > 0 ? 99 : 0);
    const avgW = wins > 0 ? grossProfit / wins : 0;
    const avgL = losses > 0 ? grossLoss / losses : 0;
    const exp = (wr * avgW) - ((1 - wr) * avgL);
    
    const awl = avgL > 0 ? (avgW / avgL).toFixed(1) : (avgW > 0 ? '∞' : '0');

    return {
      totalPnL: totalPnl,
      winRate: wrStr,
      winRateNum: Math.round(wr * 100),
      profitFactor: pf.toFixed(2),
      expectancy: exp,
      avgWinLossRatio: awl,
      grossProfitNum: grossProfit,
      grossLossNum: grossLoss
    };
  }, [trades]);

  const allChartData = useMemo(() => {
    if (trades === recentTrades) {
      let cumulative = 0;
      return Array.from({ length: 90 }).map((_, i) => {
        const date = new Date(2026, 2, 10 + i);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const dailyPnl = Math.random() > 0.4 ? Math.floor(Math.random() * 800) : -Math.floor(Math.random() * 600);
        cumulative += dailyPnl;
        return { date: dateStr, daily: dailyPnl, pnl: cumulative };
      });                             
    }

    const dailyMap: Record<string, number> = {};
    // Iterate without reverse, just accumulate daily totals
    trades.forEach(t => {
      const d = t.date;
      dailyMap[d] = (dailyMap[d] || 0) + t.pnl;
    });

    let cumulative = 0;
    // Sort dates chronologically to ensure equity curve draws left-to-right correctly
    const sortedDates = Object.keys(dailyMap).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    
    return sortedDates.map(date => {
      const daily = dailyMap[date];
      cumulative += daily;
      return { date, daily, pnl: cumulative };
    });
  }, [trades]);

  const dynamicGaugeData = [
    { name: 'Win', value: winRateNum, fill: 'var(--success-color)' },
    { name: 'Loss', value: 100 - winRateNum, fill: 'var(--danger-color)' }
  ];

  const dynamicPfData = [
    { name: 'PF', value: Math.min(parseFloat(profitFactor) * 20, 100), fill: 'var(--accent-color)' },
    { name: 'Rest', value: 100 - Math.min(parseFloat(profitFactor) * 20, 100), fill: 'rgba(255,255,255,0.05)' }
  ];

  const handleImportSuccess = (importedTrades: ParsedTrade[]) => {
    // Always sort trades newest-first so the "Recent Trades" table shows today's trades at the top
    const sortedTrades = [...importedTrades].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTrades(sortedTrades);
    setIsImportModalOpen(false);
  };

  const filteredData = useMemo(() => {
    if (timeRange === '1W') return allChartData.slice(-7);
    if (timeRange === '1M') return allChartData.slice(-30);
    return allChartData;
  }, [allChartData, timeRange]);

  const exportToCsv = () => {
    const headers = ['Date', 'Daily P&L', 'Cumulative P&L'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => `${row.date},${row.daily},${row.pnl}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tradelens_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Load saved layout from localStorage if it exists
    const savedLayout = localStorage.getItem('tradelens_dashboard_layout_v2');
    const savedPreset = localStorage.getItem('tradelens_dashboard_preset_v2');
    if (savedPreset) {
      setActiveLayoutName(savedPreset);
    }
    if (savedLayout) {
      try {
        setLayout(JSON.parse(savedLayout));
      } catch (e) {
        console.error("Failed to parse saved layout");
      }
    }
    setMounted(true);
  }, []);

  const onLayoutChange = (newLayout: Layout) => {
    setLayout(newLayout);
    localStorage.setItem('tradelens_dashboard_layout_v2', JSON.stringify(newLayout));
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6 fade-in" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      
      {/* Header */}
      <header className="flex justify-between items-center mb-2">
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '4px' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Welcome back. Here is your performance overview.</p>
        </div>
        <div className="flex gap-4 items-center">
          <div style={{ position: 'relative' }}>
            <button className="btn btn-outline" onClick={() => setIsLayoutMenuOpen(!isLayoutMenuOpen)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              Layout: {activeLayoutName}
            </button>
            {isLayoutMenuOpen && (
              <div className="glass-panel" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', zIndex: 50, width: '220px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '400px', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', padding: '4px 8px', marginBottom: '4px', textTransform: 'uppercase' }}>Layout Templates</div>
                {Object.keys(customPresets).map((preset) => (
                  <button 
                    key={preset}
                    onClick={() => applyLayoutPreset(preset, customPresets[preset])} 
                    className="text-left px-3 py-2 rounded hover:bg-white/5 text-sm w-full transition-colors" 
                    style={{ background: activeLayoutName === preset ? 'rgba(59,130,246,0.1)' : 'transparent', color: activeLayoutName === preset ? '#60a5fa' : 'white' }}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            className={`btn ${isEditMode ? 'btn-primary' : 'btn-outline'}`} 
            onClick={() => setIsEditMode(!isEditMode)}
            style={{ border: isEditMode ? '1px solid var(--accent-color)' : undefined }}
          >
            {isEditMode ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Lock Layout</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg> Edit Layout</>
            )}
          </button>
          
          <div style={{ width: '1px', background: 'var(--panel-border)', margin: '0 8px' }}></div>

          <button className="btn btn-primary" onClick={() => setIsImportModalOpen(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Import
          </button>
          <button className="btn btn-outline" onClick={exportToCsv}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export
          </button>
          <button className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Trade
          </button>
        </div>
      </header>

      {/* Draggable Dashboard Grid Container */}
      <div style={{ margin: '0 -10px' }}>
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
          rowHeight={80}
          onLayoutChange={onLayoutChange}
          draggableHandle=".drag-handle"
          {...({ isDraggable: isEditMode, isResizable: isEditMode } as any)}
          margin={[20, 20]}
          containerPadding={[10, 10]}
        >
          
          {/* 1. Net P&L */}
          <div key="1" className={`glass-panel relative ${isEditMode ? 'ring-2 ring-indigo-500' : ''}`} style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {isEditMode && (
              <div className="drag-handle" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24px', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', zIndex: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
            )}
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Net P&L</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: totalPnL >= 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
              {totalPnL >= 0 ? '+' : '-'}${Math.abs(totalPnL).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
            <div className="flex justify-start gap-4 mt-2 text-xs text-gray-400">
              <span>Gross Profit: <span className="text-white">${grossProfitNum.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></span>
            </div>
          </div>

          {/* 2. Trade Expectancy */}
          <div key="2" className={`glass-panel relative ${isEditMode ? 'ring-2 ring-indigo-500' : ''}`} style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {isEditMode && (
              <div className="drag-handle" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24px', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', zIndex: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
            )}
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Trade Expectancy</span>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>${expectancy.toFixed(2)}</div>
          </div>

          {/* 3. Profit Factor */}
          <div key="3" className={`glass-panel relative flex justify-between items-center ${isEditMode ? 'ring-2 ring-indigo-500' : ''}`} style={{ padding: '20px' }}>
            {isEditMode && (
              <div className="drag-handle" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24px', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', zIndex: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
            )}
            <div className="flex flex-col">
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Profit Factor</span>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>{profitFactor}</div>
            </div>
            <div style={{ width: '80px', height: '80px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dynamicPfData} cx="50%" cy="50%" innerRadius={30} outerRadius={40} dataKey="value" stroke="none" cornerRadius={4} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. Win Rate */}
          <div key="4" className={`glass-panel relative flex justify-between items-center ${isEditMode ? 'ring-2 ring-indigo-500' : ''}`} style={{ padding: '20px' }}>
            {isEditMode && (
              <div className="drag-handle" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24px', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', zIndex: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
            )}
             <div className="flex flex-col">
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Win Rate</span>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>{winRate}</div>
            </div>
            <div style={{ width: '100px', height: '60px', marginTop: '20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dynamicGaugeData} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius={40} outerRadius={50} dataKey="value" stroke="none" cornerRadius={4} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 5. Avg Win/Loss */}
          <div key="5" className={`glass-panel relative ${isEditMode ? 'ring-2 ring-indigo-500' : ''}`} style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {isEditMode && (
              <div className="drag-handle" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24px', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', zIndex: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
            )}
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Avg Win / Loss</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '8px' }}>{avgWinLossRatio} : 1</div>
            <div style={{ width: '100%', display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${winRateNum}%`, background: 'var(--success-color)' }}></div>
              <div style={{ width: `${100 - winRateNum}%`, background: 'var(--danger-color)' }}></div>
            </div>
          </div>

          {/* 6. Zella Score Radar */}
          <div key="6" className={`glass-panel relative flex flex-col items-center ${isEditMode ? 'ring-2 ring-indigo-500' : ''}`} style={{ overflow: 'hidden' }}>
            {isEditMode && (
              <div className="drag-handle" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24px', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', zIndex: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
            )}
            <div className="w-full flex justify-between items-center mb-4">
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Consistency Score</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>84.96</span>
            </div>
            <div style={{ flex: 1, width: '100%', minHeight: '150px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} />
                  <Radar name="Score" dataKey="A" stroke="var(--accent-color)" fill="var(--accent-color)" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ width: '80%', height: '4px', background: 'var(--panel-border)', borderRadius: '2px', marginTop: '16px' }}>
              <div style={{ width: '84.96%', height: '100%', background: 'linear-gradient(90deg, #ec4899, #8b5cf6)', borderRadius: '2px', boxShadow: '0 0 10px var(--accent-glow)' }}></div>
            </div>
          </div>

          {/* 7. Cumulative Area Chart */}
          <div key="7" className={`glass-panel relative flex flex-col ${isEditMode ? 'ring-2 ring-indigo-500' : ''}`}>
            {isEditMode && (
              <div className="drag-handle" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24px', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', zIndex: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Daily net cumulative P&L</span>
              <div className="flex gap-2">
                <button onClick={() => setTimeRange('1W')} style={{ padding: '2px 8px', background: timeRange === '1W' ? 'var(--accent-color)' : 'transparent', border: timeRange === '1W' ? 'none' : '1px solid var(--panel-border)', borderRadius: '4px', fontSize: '0.75rem', color: timeRange === '1W' ? 'white' : 'var(--text-secondary)' }}>1W</button>
                <button onClick={() => setTimeRange('1M')} style={{ padding: '2px 8px', background: timeRange === '1M' ? 'var(--accent-color)' : 'transparent', border: timeRange === '1M' ? 'none' : '1px solid var(--panel-border)', borderRadius: '4px', fontSize: '0.75rem', color: timeRange === '1M' ? 'white' : 'var(--text-secondary)' }}>1M</button>
                <button onClick={() => setTimeRange('YTD')} style={{ padding: '2px 8px', background: timeRange === 'YTD' ? 'var(--accent-color)' : 'transparent', border: timeRange === 'YTD' ? 'none' : '1px solid var(--panel-border)', borderRadius: '4px', fontSize: '0.75rem', color: timeRange === 'YTD' ? 'white' : 'var(--text-secondary)' }}>YTD</button>
              </div>
            </div>
            <div style={{ flex: 1, width: '100%', marginLeft: '-20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData}>
                  <defs>
                    <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--success-color)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--success-color)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} minTickGap={20} />
                  <YAxis stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                  <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="pnl" stroke="var(--success-color)" strokeWidth={2} fillOpacity={1} fill="url(#colorPnl)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 8. Daily Net Bar Chart */}
          <div key="8" className={`glass-panel relative flex flex-col ${isEditMode ? 'ring-2 ring-indigo-500' : ''}`}>
            {isEditMode && (
              <div className="drag-handle" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24px', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', zIndex: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Net daily P&L</span>
            </div>
            <div style={{ flex: 1, width: '100%', marginLeft: '-20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData.slice(-14)}> {/* Show last 14 days for clarity */}
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                  <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                  <Bar dataKey="daily" radius={[2, 2, 2, 2]}>
                    {filteredData.slice(-14).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.daily >= 0 ? 'var(--success-color)' : 'var(--danger-color)'} opacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 9. Recent Trades */}
          <div key="9" className={`glass-panel relative ${isEditMode ? 'ring-2 ring-indigo-500' : ''}`} style={{ overflowY: 'auto' }}>
            {isEditMode && (
              <div className="drag-handle" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24px', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', zIndex: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
            )}
            <div className="flex gap-6 mb-6" style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px' }}>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'white', borderBottom: '2px solid var(--accent-color)', paddingBottom: '12px', marginBottom: '-13px' }}>Recent trades</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Open positions</span>
            </div>
            
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', borderBottom: '1px solid var(--panel-border)' }}>
                  <th style={{ paddingBottom: '12px', fontWeight: 400 }}>Close Date</th>
                  <th style={{ paddingBottom: '12px', fontWeight: 400 }}>Symbol</th>
                  <th style={{ paddingBottom: '12px', fontWeight: 400 }}>Type</th>
                  <th style={{ paddingBottom: '12px', fontWeight: 400, textAlign: 'right' }}>Net P&L</th>
                </tr>
              </thead>
              <tbody>
                {trades.slice(0, 20).map(trade => (
                  <tr 
                    key={trade.id} 
                    onClick={() => !isEditMode && router.push(`/trade/${trade.id}`)}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: isEditMode ? 'move' : 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px 0', fontSize: '0.9rem' }}>{trade.date}</td>
                    <td style={{ padding: '16px 0', fontWeight: 600 }}>{trade.symbol}</td>
                    <td style={{ padding: '16px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{trade.type}</td>
                    <td style={{ padding: '16px 0', textAlign: 'right', fontWeight: 600, color: trade.pnl >= 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
                      {trade.pnl >= 0 ? '+' : '-'}${Math.abs(trade.pnl).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 10. Trade Time Scatter Plot */}
          <div key="10" className={`glass-panel relative flex flex-col ${isEditMode ? 'ring-2 ring-indigo-500' : ''}`}>
            {isEditMode && (
              <div className="drag-handle" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '24px', cursor: 'move', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', zIndex: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Trade time performance</span>
            </div>
            <div style={{ flex: 1, width: '100%', marginLeft: '-20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis type="number" dataKey="x" name="Hour" domain={[9, 16]} tickFormatter={(val) => `${val}:00`} stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis type="number" dataKey="y" name="P&L" stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                  <ZAxis type="number" dataKey="z" range={[50, 50]} />
                  <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />
                  <Tooltip content={<ScatterTooltip />} cursor={{strokeDasharray: '3 3'}} />
                  <Scatter name="Trades" data={scatterData}>
                    {scatterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.y >= 0 ? 'var(--success-color)' : 'var(--danger-color)'} opacity={0.7} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

        </ResponsiveGridLayout>
      </div>

      <CSVImportModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} onImportSuccess={handleImportSuccess} />
    </div>
  );
}
