"use client";

const playbooks = [
  {
    id: 1,
    name: "Breakout Retest",
    description: "Waiting for a stock to break a key resistance level, then buying the first pullback (retest) of that level as new support.",
    winRate: "72.5%",
    profitFactor: 2.8,
    status: "Active",
    tradesCount: 142
  },
  {
    id: 2,
    name: "VWAP Mean Reversion",
    description: "Fading extreme moves away from the VWAP (Volume Weighted Average Price) when RSI is overbought/oversold.",
    winRate: "60.0%",
    profitFactor: 1.5,
    status: "Review",
    tradesCount: 85
  },
  {
    id: 3,
    name: "News Catalyst Momentum",
    description: "Trading pre-market earnings gaps with high relative volume. Buying the open if it breaks the pre-market high.",
    winRate: "45.0%",
    profitFactor: 0.8,
    status: "Suspended",
    tradesCount: 34
  }
];

export default function Playbook() {
  return (
    <div className="flex flex-col gap-8 fade-in" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      
      <header className="flex justify-between items-center">
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Trading Playbook</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Document your exact edge. Track which setups have the best Profit Factor.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Create New Setup
          </button>
        </div>
      </header>

      <div className="dashboard-grid" style={{ marginTop: 0 }}>
        {playbooks.map(playbook => (
          <div key={playbook.id} className="col-span-4 glass-panel flex flex-col gap-4" style={{ borderTop: `4px solid ${playbook.profitFactor > 2 ? 'var(--success-color)' : playbook.profitFactor > 1 ? '#eab308' : 'var(--danger-color)'}` }}>
            <div className="flex justify-between items-start">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{playbook.name}</h3>
              <span className={`badge ${playbook.status === 'Active' ? 'badge-success' : playbook.status === 'Review' ? '' : 'badge-danger'}`} style={{ background: playbook.status === 'Review' ? 'rgba(234, 179, 8, 0.2)' : undefined, color: playbook.status === 'Review' ? '#eab308' : undefined }}>
                {playbook.status}
              </span>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>
              {playbook.description}
            </p>

            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <div className="flex flex-col gap-1">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>WIN RATE</span>
                <span style={{ fontWeight: 600 }}>{playbook.winRate}</span>
              </div>
              <div className="flex flex-col gap-1 text-center">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>TRADES</span>
                <span style={{ fontWeight: 600 }}>{playbook.tradesCount}</span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PROFIT FACTOR</span>
                <span style={{ fontWeight: 600, color: playbook.profitFactor > 1.5 ? 'var(--success-color)' : playbook.profitFactor > 1 ? 'white' : 'var(--danger-color)' }}>{playbook.profitFactor.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn btn-outline" style={{ width: '100%', marginTop: '8px' }}>
              View Trade Examples
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
