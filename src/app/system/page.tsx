"use client";

export default function SystemPhilosophy() {
  return (
    <div className="flex flex-col gap-8 fade-in" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Core Philosophy & System Architecture</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Most traders do not fail because the strategy is bad. They fail because behavior becomes emotional.</p>
      </header>

      <div className="glass-panel" style={{ padding: '40px', overflowX: 'auto' }}>
        {/* CSS Tree / Mindmap visualization */}
        <div style={{ minWidth: '800px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          
          <div className="mindmap-node root-node" style={{ background: 'linear-gradient(135deg, var(--accent-color), #c084fc)', padding: '16px 32px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 0 20px var(--accent-glow)' }}>
            TradeLens Behavioral Engine
          </div>

          <div style={{ width: '2px', height: '30px', background: 'var(--panel-border)' }}></div>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', width: '100%', position: 'relative' }}>
             {/* Connecting horizontal line */}
             <div style={{ position: 'absolute', top: 0, left: '12.5%', right: '87.5%', height: '2px', background: 'var(--panel-border)' }}></div>

             {/* Node 1 */}
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
               <div style={{ width: '2px', height: '20px', background: 'var(--panel-border)' }}></div>
               <div className="mindmap-node section-node" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', padding: '12px 24px', borderRadius: '12px', fontWeight: 600, width: '90%', textAlign: 'center', marginBottom: '20px' }}>
                 User Preferences
               </div>
               <div className="flex flex-col gap-2 w-full px-4">
                 <div className="mindmap-leaf">Risk Limits</div>
                 <div className="mindmap-leaf">Max Daily Loss</div>
                 <div className="mindmap-leaf">Preferred Sessions</div>
                 <div className="mindmap-leaf">Trading Style</div>
               </div>
             </div>

             {/* Node 2 */}
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
               <div style={{ width: '2px', height: '20px', background: 'var(--panel-border)' }}></div>
               <div className="mindmap-node section-node" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', padding: '12px 24px', borderRadius: '12px', fontWeight: 600, width: '90%', textAlign: 'center', marginBottom: '20px' }}>
                 Trade Entry Checklist
               </div>
               <div className="flex flex-col gap-2 w-full px-4">
                 <div className="mindmap-leaf border-accent">HTF Alignment</div>
                 <div className="mindmap-leaf border-accent">Liquidity Sweep</div>
                 <div className="mindmap-leaf border-warning">Psychological State</div>
                 <div className="mindmap-leaf border-warning">Revenge/FOMO Check</div>
               </div>
             </div>

             {/* Node 3 */}
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
               <div style={{ width: '2px', height: '20px', background: 'var(--panel-border)' }}></div>
               <div className="mindmap-node section-node" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', padding: '12px 24px', borderRadius: '12px', fontWeight: 600, width: '90%', textAlign: 'center', marginBottom: '20px' }}>
                 Behavioral Analysis
               </div>
               <div className="flex flex-col gap-2 w-full px-4">
                 <div className="mindmap-leaf border-danger">Revenge Detection</div>
                 <div className="mindmap-leaf border-danger">Overtrading Warnings</div>
                 <div className="mindmap-leaf border-success">Consistency Score</div>
                 <div className="mindmap-leaf border-success">Auto-Grading (A/B/C)</div>
               </div>
             </div>

             {/* Node 4 */}
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
               <div style={{ width: '2px', height: '20px', background: 'var(--panel-border)' }}></div>
               <div className="mindmap-node section-node" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', padding: '12px 24px', borderRadius: '12px', fontWeight: 600, width: '90%', textAlign: 'center', marginBottom: '20px' }}>
                 Insights & Analytics
               </div>
               <div className="flex flex-col gap-2 w-full px-4">
                 <div className="mindmap-leaf">Session Heatmaps</div>
                 <div className="mindmap-leaf">Emotional PnL Impact</div>
                 <div className="mindmap-leaf">Trade Duration Habits</div>
                 <div className="mindmap-leaf">Buy vs Sell Analysis</div>
               </div>
             </div>

          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .mindmap-leaf {
          background: rgba(0,0,0,0.3);
          border-left: 3px solid var(--panel-border);
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        .mindmap-leaf:hover {
          background: rgba(255,255,255,0.05);
          color: white;
          transform: translateX(4px);
        }
        .border-accent { border-left-color: var(--accent-color); }
        .border-warning { border-left-color: #eab308; }
        .border-danger { border-left-color: var(--danger-color); }
        .border-success { border-left-color: var(--success-color); }
      `}} />

    </div>
  );
}
