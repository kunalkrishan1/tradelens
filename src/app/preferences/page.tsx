"use client";

export default function Preferences() {
  return (
    <div className="flex flex-col gap-8 fade-in" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      
      <header>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>User Preferences</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Configure your risk parameters, session rules, and trading style.</p>
      </header>

      <div className="dashboard-grid" style={{ marginTop: 0 }}>
        
        {/* Capital & Risk Section */}
        <div className="col-span-6 glass-panel flex flex-col gap-6">
          <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px' }}>Capital & Risk</h3>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Initial Capital ($)</label>
              <input type="number" className="input-field" defaultValue={10000} />
            </div>
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Risk Per Trade (%)</label>
              <input type="number" step="0.1" className="input-field" defaultValue={1.0} />
            </div>
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Max Daily Loss (%)</label>
              <input type="number" step="0.1" className="input-field" defaultValue={3.0} />
            </div>
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Preferred Risk/Reward Ratio</label>
              <input type="text" className="input-field" defaultValue="1:2" />
            </div>
          </div>
        </div>

        {/* Trading Rules & Style Section */}
        <div className="col-span-6 glass-panel flex flex-col gap-6">
          <h3 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px' }}>Trading Rules & Style</h3>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Maximum Trades Per Day</label>
              <input type="number" className="input-field" defaultValue={3} />
            </div>
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Trading Style</label>
              <select className="input-field" defaultValue="Intraday">
                <option>Scalping</option>
                <option>Intraday</option>
                <option>Swing</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Preferred Trading Session</label>
              <select className="input-field" defaultValue="New York">
                <option>Asia</option>
                <option>London</option>
                <option>New York</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Preferred Pairs/Symbols (Comma separated)</label>
              <input type="text" className="input-field" defaultValue="BTCUSD, ETHUSD, NQ, ES" />
            </div>
          </div>
        </div>

        <div className="col-span-12 flex justify-end gap-4 mt-4">
          <button className="btn btn-outline">Discard Changes</button>
          <button className="btn btn-primary">Save Preferences</button>
        </div>

      </div>
    </div>
  );
}
