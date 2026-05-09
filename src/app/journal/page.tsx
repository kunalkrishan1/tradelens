"use client";

import { useState, useEffect, useMemo } from 'react';

const mockTradeHistory = [
  { id: 'T-1049', symbol: 'NVDA', side: 'LONG', open: '2026-05-08 09:30', close: '2026-05-08 09:45', size: 200, entry: 945.20, exit: 958.40, pnl: 2640.00, return: 1.39, rr: '2.5R', tags: ['Breakout'], note: 'Perfect entry on the 5m pullback.', hasChart: true },
  { id: 'T-1048', symbol: 'TSLA', side: 'SHORT', open: '2026-05-07 13:15', close: '2026-05-07 14:15', size: 500, entry: 178.50, exit: 175.20, pnl: 1650.00, return: 1.84, rr: '3.1R', tags: ['VWAP Reject'], note: 'Held through minor chop, adhered to plan.', hasChart: true },
  { id: 'T-1047', symbol: 'SPY', side: 'LONG', open: '2026-05-06 10:00', close: '2026-05-06 10:30', size: 1000, entry: 512.10, exit: 511.40, pnl: -700.00, return: -0.13, rr: '-1.0R', tags: ['Chop', 'Early Entry'], note: 'Forced the trade. Need to be more patient.', hasChart: false },
  { id: 'T-1046', symbol: 'AMD', side: 'LONG', open: '2026-05-05 09:35', close: '2026-05-05 11:20', size: 300, entry: 160.25, exit: 164.50, pnl: 1275.00, return: 2.65, rr: '2.1R', tags: ['Gap and Go'], note: 'Good momentum capture.', hasChart: false },
  { id: 'T-1045', symbol: 'META', side: 'SHORT', open: '2026-05-04 14:30', close: '2026-05-04 15:45', size: 150, entry: 480.00, exit: 485.50, pnl: -825.00, return: -1.14, rr: '-1.0R', tags: ['News Catalyst', 'FOMO'], note: 'Squeezed out. Stop loss was too tight.', hasChart: false },
  { id: 'T-1044', symbol: 'AAPL', side: 'LONG', open: '2026-05-03 10:15', close: '2026-05-03 12:00', size: 400, entry: 175.80, exit: 178.10, pnl: 920.00, return: 1.30, rr: '1.5R', tags: ['Mean Reversion'], note: 'Standard reversion play.', hasChart: false },
  { id: 'T-1043', symbol: 'MSFT', side: 'LONG', open: '2026-05-02 09:40', close: '2026-05-02 10:10', size: 250, entry: 410.50, exit: 414.20, pnl: 925.00, return: 0.90, rr: '1.2R', tags: ['Breakout'], note: 'Hit profit target perfectly.', hasChart: true },
  { id: 'T-1042', symbol: 'NFLX', side: 'SHORT', open: '2026-05-01 13:00', close: '2026-05-01 15:30', size: 100, entry: 605.20, exit: 590.10, pnl: 1510.00, return: 2.49, rr: '4.2R', tags: ['Trend Line Break'], note: 'A+ Setup.', hasChart: false },
];

export default function Journal() {
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [trades, setTrades] = useState<any[]>(mockTradeHistory);

  useEffect(() => {
    const saved = localStorage.getItem('tradelens_trades_data');
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTrades(JSON.parse(saved));
    }
  }, []);

  const updateTradeNote = (id: string, newNote: string) => {
    const updatedTrades = trades.map((t: any) => t.id === id ? { ...t, note: newNote } : t);
    setTrades(updatedTrades);
    localStorage.setItem('tradelens_trades_data', JSON.stringify(updatedTrades));
  };

  const normalizedTrades = useMemo(() => {
    return trades.map(t => ({
      id: t.id,
      symbol: t.symbol,
      side: t.side || t.type || 'UNKNOWN',
      open: t.open || t.date || '-',
      close: t.close || '-',
      size: t.size || '-',
      entry: t.entry || 0,
      exit: t.exit || 0,
      pnl: t.pnl || 0,
      return: t.return || 0,
      rr: t.rr || '-',
      tags: t.tags || [],
      note: t.note || '',
      hasChart: t.hasChart || false
    }));
  }, [trades]);

  const filteredTrades = filter === 'All' 
    ? normalizedTrades 
    : normalizedTrades.filter(t => t.side === filter || (t.pnl > 0 && filter === 'Winning') || (t.pnl < 0 && filter === 'Losing'));

  return (
    <div className="flex flex-col gap-8 fade-in" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      
      <header className="flex justify-between items-center">
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Trade History</h1>
          <p style={{ color: 'var(--text-secondary)' }}>A comprehensive log of all your executions and journal notes.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            Search
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Manual Trade
          </button>
        </div>
      </header>

      <div className="glass-panel flex flex-col gap-6">
        
        {/* Filters */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {['All', 'LONG', 'SHORT', 'Winning', 'Losing'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                style={{ 
                  padding: '6px 16px', 
                  borderRadius: '20px', 
                  fontSize: '0.85rem', 
                  fontWeight: 500,
                  background: filter === f ? 'var(--accent-color)' : 'transparent',
                  color: filter === f ? 'white' : 'var(--text-secondary)',
                  border: filter === f ? '1px solid var(--accent-color)' : '1px solid var(--panel-border)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4 items-center">
             <select className="input-field" style={{ padding: '6px 12px', fontSize: '0.85rem', width: 'auto' }}>
               <option>Last 30 Days</option>
               <option>This Week</option>
               <option>Year to Date</option>
             </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Trade ID</th>
                <th>Symbol</th>
                <th>Side</th>
                <th>Open Time</th>
                <th>Close Time</th>
                <th>Size</th>
                <th>Entry Price</th>
                <th>Exit Price</th>
                <th>Net P&L</th>
                <th>R:R</th>
                <th>Return %</th>
                <th>Tags</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade) => (
                <tr key={trade.id}>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{trade.id}</td>
                  <td><div style={{ fontWeight: 600 }}>{trade.symbol}</div></td>
                  <td>
                    <span className={trade.side === 'LONG' ? 'badge badge-success' : 'badge badge-danger'}>
                      {trade.side}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{trade.open}</td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{trade.close}</td>
                  <td>{trade.size === '-' ? '-' : trade.size}</td>
                  <td>{trade.entry ? '$' + Number(trade.entry).toFixed(2) : '-'}</td>
                  <td>{trade.exit ? '$' + Number(trade.exit).toFixed(2) : '-'}</td>
                  <td className={trade.pnl > 0 ? 'text-success' : 'text-danger'} style={{ fontWeight: 600 }}>
                    {trade.pnl > 0 ? '+' : '-'}${Math.abs(trade.pnl).toFixed(2)}
                  </td>
                  <td style={{ fontWeight: 500, color: trade.pnl > 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>{trade.rr}</td>
                  <td className={trade.pnl > 0 ? 'text-success' : 'text-danger'}>
                    {trade.return > 0 ? '+' : ''}{trade.return}%
                  </td>
                  <td>
                    <div className="flex gap-1 flex-wrap">
                      {trade.tags.map((tag: string) => (
                        <span key={tag} className="badge" style={{ background: 'rgba(255,255,255,0.05)' }}>{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ maxWidth: '250px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text"
                        defaultValue={trade.note}
                        placeholder="Click to add note..."
                        onBlur={(e) => updateTradeNote(trade.id, e.target.value)}
                        style={{ 
                          background: 'transparent', 
                          border: '1px solid transparent', 
                          color: 'inherit', 
                          width: '100%', 
                          outline: 'none', 
                          padding: '4px 8px', 
                          borderRadius: '6px', 
                          transition: 'all 0.2s' 
                        }}
                        onFocus={(e) => {
                          e.target.style.border = '1px solid var(--accent-color)';
                          e.target.style.background = 'rgba(255,255,255,0.05)';
                        }}
                      />
                      {trade.hasChart && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" style={{ flexShrink: 0, cursor: 'pointer' }}><title>View Chart Screenshot</title><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      )}
                    </div>
                  </td>
                  <td>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Mock */}
        <div className="flex justify-between items-center" style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          <div>Showing 1 to 8 of 142 trades</div>
          <div className="flex gap-2">
            <button className="btn btn-outline" style={{ padding: '4px 12px' }}>Previous</button>
            <button className="btn btn-outline" style={{ padding: '4px 12px' }}>Next</button>
          </div>
        </div>

      </div>

      {/* Add Trade Modal Mockup */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '32px' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ fontSize: '1.5rem' }}>Add Manual Trade</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="flex flex-col gap-6" style={{ maxHeight: '75vh', overflowY: 'auto', paddingRight: '8px' }}>
               
               {/* Basic Execution */}
               <div className="flex flex-col gap-4">
                 <h3 style={{ fontSize: '1rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '8px' }}>1. Execution Details</h3>
                 <div className="flex gap-4">
                   <div className="flex flex-col gap-2" style={{ flex: 1 }}>
                     <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Symbol</label>
                     <input type="text" className="input-field" placeholder="e.g. AAPL" />
                   </div>
                   <div className="flex flex-col gap-2" style={{ flex: 1 }}>
                     <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Side</label>
                     <select className="input-field">
                       <option>LONG</option>
                       <option>SHORT</option>
                     </select>
                   </div>
                   <div className="flex flex-col gap-2" style={{ flex: 1 }}>
                     <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Session</label>
                     <select className="input-field">
                       <option>New York</option>
                       <option>London</option>
                       <option>Asia</option>
                     </select>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="flex flex-col gap-2" style={{ flex: 1 }}>
                     <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Entry Price</label>
                     <input type="number" className="input-field" placeholder="0.00" />
                   </div>
                   <div className="flex flex-col gap-2" style={{ flex: 1 }}>
                     <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Stop Loss</label>
                     <input type="number" className="input-field" placeholder="0.00" />
                   </div>
                   <div className="flex flex-col gap-2" style={{ flex: 1 }}>
                     <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Take Profit</label>
                     <input type="number" className="input-field" placeholder="0.00" />
                   </div>
                 </div>
               </div>

               {/* Setup Checklist */}
               <div className="flex flex-col gap-4">
                 <h3 style={{ fontSize: '1rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '8px' }}>2. Setup Checklist</h3>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                   <label className="flex items-center gap-2" style={{ fontSize: '0.85rem' }}><input type="checkbox" /> HTF Trend Aligned</label>
                   <label className="flex items-center gap-2" style={{ fontSize: '0.85rem' }}><input type="checkbox" /> Liquidity Sweep Present</label>
                   <label className="flex items-center gap-2" style={{ fontSize: '0.85rem' }}><input type="checkbox" /> Structure Break Confirmed</label>
                   <label className="flex items-center gap-2" style={{ fontSize: '0.85rem' }}><input type="checkbox" /> Momentum Aligned</label>
                   <label className="flex items-center gap-2" style={{ fontSize: '0.85rem' }}><input type="checkbox" /> RR &ge; 1:2</label>
                   <label className="flex items-center gap-2" style={{ fontSize: '0.85rem' }}><input type="checkbox" /> Entry Near Key Level</label>
                 </div>
               </div>

               {/* Psychology */}
               <div className="flex flex-col gap-4">
                 <h3 style={{ fontSize: '1rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '8px' }}>3. Psychology</h3>
                 <div className="flex flex-col gap-2">
                   <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Emotional State Before Trade</label>
                   <select className="input-field" style={{ borderColor: 'var(--panel-border)' }}>
                     <option value="Calm">Calm & Focused</option>
                     <option value="Confident">Confident</option>
                     <option value="Hesitant">Hesitant</option>
                     <option value="Bored">Bored</option>
                     <option value="FOMO">FOMO / Impulsive</option>
                     <option value="Frustrated">Frustrated</option>
                     <option value="Revenge">Revenge / Angry</option>
                     <option value="Fearful">Fearful</option>
                   </select>
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>TradingView Chart Screenshot</label>
                 <div style={{ border: '2px dashed var(--panel-border)', borderRadius: '12px', padding: '24px', textAlign: 'center', background: 'rgba(0,0,0,0.2)', cursor: 'pointer' }}>
                   <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Drag and drop or click to upload</p>
                 </div>
               </div>

               <button className="btn btn-primary" style={{ marginTop: '8px', justifyContent: 'center', width: '100%', padding: '12px' }} onClick={() => setIsModalOpen(false)}>
                 Grade & Save Trade
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
