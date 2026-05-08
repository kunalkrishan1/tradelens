"use client";

import { useState } from 'react';

export default function Connections() {
  const [activeTab, setActiveTab] = useState<'universal' | 'direct' | 'mt5'>('universal');

  return (
    <div className="flex flex-col gap-8 fade-in" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      
      <header>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Broker Connections</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Connect your brokerage accounts for automated, real-time trade syncing.</p>
      </header>

      <div className="flex gap-4" style={{ borderBottom: '1px solid var(--panel-border)', paddingBottom: '16px' }}>
        <button 
          onClick={() => setActiveTab('universal')}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: activeTab === 'universal' ? 'white' : 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '1.1rem',
            cursor: 'pointer',
            padding: '8px 16px',
            position: 'relative'
          }}
        >
          Universal Sync (Recommended)
          {activeTab === 'universal' && <div style={{ position: 'absolute', bottom: '-17px', left: 0, width: '100%', height: '2px', background: 'var(--accent-color)' }}></div>}
        </button>
        <button 
          onClick={() => setActiveTab('direct')}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: activeTab === 'direct' ? 'white' : 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '1.1rem',
            cursor: 'pointer',
            padding: '8px 16px',
            position: 'relative'
          }}
        >
          Direct API Keys
          {activeTab === 'direct' && <div style={{ position: 'absolute', bottom: '-17px', left: 0, width: '100%', height: '2px', background: 'var(--accent-color)' }}></div>}
        </button>
        <button 
          onClick={() => setActiveTab('mt5')}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: activeTab === 'mt5' ? 'white' : 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '1.1rem',
            cursor: 'pointer',
            padding: '8px 16px',
            position: 'relative'
          }}
        >
          MetaTrader 5
          {activeTab === 'mt5' && <div style={{ position: 'absolute', bottom: '-17px', left: 0, width: '100%', height: '2px', background: 'var(--accent-color)' }}></div>}
        </button>
      </div>

      {activeTab === 'universal' && (
        <div className="dashboard-grid" style={{ marginTop: 0 }}>
          <div className="col-span-8 glass-panel flex flex-col gap-6">
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>SnapTrade Integration</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Securely connect to over 20+ brokerages including TD Ameritrade, Robinhood, E*Trade, and Webull. 
                We use SnapTrade to securely fetch your execution data without ever seeing your login credentials.
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', borderRadius: '12px', padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Bank-Grade Security</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto', fontSize: '0.9rem' }}>Your data is encrypted end-to-end. We only request read-only access to your trade history and balances.</p>
              </div>
              <button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1rem', marginTop: '8px' }}>
                Connect a Brokerage
              </button>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Supported Brokers</h3>
              <div className="flex flex-wrap gap-3">
                {['Interactive Brokers', 'TD Ameritrade', 'Robinhood', 'E*Trade', 'Webull', 'Charles Schwab', 'Fidelity', '+ 15 more'].map(broker => (
                  <span key={broker} style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {broker}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-6">
             <div className="glass-panel">
               <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Active Connections</h3>
               
               <div className="flex items-center justify-between" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <div className="flex items-center gap-3">
                   <div style={{ width: '40px', height: '40px', background: '#e31837', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>IB</div>
                   <div>
                     <div style={{ fontWeight: 600 }}>Interactive Brokers</div>
                     <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Account: U****8392</div>
                   </div>
                 </div>
                 <span className="badge badge-success">Synced</span>
               </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'direct' && (
        <div className="dashboard-grid" style={{ marginTop: 0 }}>
          <div className="col-span-8 glass-panel flex flex-col gap-6">
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Direct API Integration</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                For power users who prefer providing their own read-only API keys directly to their exchanges or brokers.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Select Platform</label>
                <select className="input-field" style={{ appearance: 'none', background: 'rgba(0,0,0,0.4)' }}>
                  <option>Binance</option>
                  <option>Bybit</option>
                  <option>Alpaca</option>
                  <option>Tradier</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>API Key</label>
                <input type="text" className="input-field" placeholder="Enter your read-only API Key" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>API Secret</label>
                <input type="password" className="input-field" placeholder="Enter your API Secret" />
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '16px', borderRadius: '8px', color: '#fca5a5', fontSize: '0.85rem', display: 'flex', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                <p>Security Warning: Ensure that you only provide <strong>READ-ONLY</strong> API keys. Disable all withdrawal or trading permissions on your API key before entering it here.</p>
              </div>

              <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                Securely Save API Keys
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'mt5' && (
        <div className="dashboard-grid" style={{ marginTop: 0 }}>
          <div className="col-span-8 glass-panel flex flex-col gap-6">
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>MetaTrader 5 Integration</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Connect directly to your MT5 terminal. We provide a custom MQL5 Expert Advisor (EA) that automatically pushes your closed trades to your journal via a secure Webhook.
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Step 1: Download the EA</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>Download our lightweight MQL5 Expert Advisor and place it in your MT5 `Experts` folder.</p>
                <button className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download TradeLensTracker.ex5
                </button>
              </div>

              <div style={{ height: '1px', background: 'var(--panel-border)', width: '100%' }}></div>

              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Step 2: Enter Webhook Secret</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>Attach the EA to any chart in MT5, and paste this secure Webhook Secret into the EA inputs.</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" className="input-field" value="aura_sec_9k2m4x8b7v1q" readOnly style={{ flex: 1, fontFamily: 'monospace' }} />
                  <button className="btn btn-primary">Copy</button>
                </div>
              </div>

            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '16px', borderRadius: '8px', color: '#6ee7b7', fontSize: '0.85rem', display: 'flex', gap: '12px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <p>Waiting for connection... Start the EA in your MT5 terminal to link your account.</p>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
