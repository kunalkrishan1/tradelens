"use client";

import { useState, useRef } from 'react';

type ImportState = 'idle' | 'processing' | 'success';

export interface ParsedTrade {
  id: string;
  date: string;
  symbol: string;
  type: string;
  pnl: number;
}

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (trades: ParsedTrade[]) => void;
}

export default function CSVImportModal({ isOpen, onClose, onImportSuccess }: CSVImportModalProps) {
  const [importState, setImportState] = useState<ImportState>('idle');
  const [progress, setProgress] = useState(0);
  const [parsedTrades, setParsedTrades] = useState<ParsedTrade[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isCents, setIsCents] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const processFile = (file: File) => {
    setImportState('processing');
    setProgress(0);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const rawLines = text.split('\n').map(l => l.trim()).filter(l => l);
        if (rawLines.length < 2) throw new Error("CSV has no data rows");

        // Robust CSV row parser to handle commas inside quotes (e.g. "$1,000.00")
        const parseCSVRow = (str: string) => {
          const result = [];
          let inQuotes = false;
          let current = '';
          for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              result.push(current);
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current);
          return result.map(s => s.trim().replace(/^"|"$/g, ''));
        };

        // Scan the first 50 lines to find the actual header row (useful for broker exports like TOS that have preamble)
        let headerRowIdx = 0;
        let bestScore = -1;
        let headers: string[] = [];

        for (let i = 0; i < Math.min(rawLines.length, 50); i++) {
          const cols = parseCSVRow(rawLines[i]).map(h => h.toLowerCase());
          let score = 0;
          if (cols.some(c => c.includes('date') || c.includes('time'))) score++;
          if (cols.some(c => c.includes('symbol') || c.includes('ticker') || c.includes('asset') || c.includes('instrument'))) score++;
          if (cols.some(c => c.includes('type') || c.includes('side') || c.includes('action'))) score++;
          if (cols.some(c => c.includes('pnl') || c.includes('profit') || c.includes('net') || c.includes('realized'))) score++;
          
          if (score > bestScore) {
            bestScore = score;
            headerRowIdx = i;
            headers = cols;
          }
        }

        if (bestScore === 0) {
          throw new Error("Could not detect trade columns (Date, Symbol, Type, PnL) in CSV.");
        }

        let dateIdx = headers.findIndex(h => h.includes('date') || h.includes('time'));
        let symbolIdx = headers.findIndex(h => h.includes('symbol') || h.includes('ticker') || h.includes('asset') || h.includes('instrument'));
        let typeIdx = headers.findIndex(h => h.includes('type') || h.includes('side') || h.includes('action'));
        let pnlIdx = headers.findIndex(h => h.includes('pnl') || h.includes('profit') || h.includes('net') || h.includes('realized'));

        // Fallbacks if some columns are vaguely named
        if (dateIdx === -1) dateIdx = 0;
        if (symbolIdx === -1) symbolIdx = Math.max(1, headers.findIndex(h => h === '')); // guess
        if (typeIdx === -1) typeIdx = 2;
        if (pnlIdx === -1) pnlIdx = headers.length - 1;

        const trades: ParsedTrade[] = [];
        for (let i = headerRowIdx + 1; i < rawLines.length; i++) {
          const row = parseCSVRow(rawLines[i]);
          if (row.length < Math.max(dateIdx, symbolIdx, typeIdx, pnlIdx)) continue;
          if (!row[dateIdx] && !row[symbolIdx]) continue; // Skip empty summary rows
          
          let rawPnl = row[pnlIdx] || "0";
          // Handle accounting format e.g. "(1,200.50)" -> "-1200.50"
          if (rawPnl.includes('(') && rawPnl.includes(')')) {
            rawPnl = '-' + rawPnl.replace(/[()]/g, '');
          }
          const pnlStr = rawPnl.replace(/[^0-9.-]+/g, "");
          const pnlVal = parseFloat(pnlStr);
          if (isNaN(pnlVal)) continue; // Skip rows where PnL isn't a number (e.g. subheaders)

          let rawType = (row[typeIdx] || "UNKNOWN").toUpperCase();
          if (rawType.includes('BUY') || rawType === 'B' || rawType === 'BOT') rawType = 'LONG';
          else if (rawType.includes('SELL') || rawType === 'S' || rawType === 'SLD') rawType = 'SHORT';

          let rawDate = row[dateIdx] || new Date().toISOString().split('T')[0];
          const parsedDate = new Date(rawDate);
          if (!isNaN(parsedDate.getTime())) {
             rawDate = parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          }

          trades.push({
            id: `imp-${Date.now()}-${i}`,
            date: rawDate,
            symbol: (row[symbolIdx] || "UNKNOWN").toUpperCase(),
            type: rawType,
            pnl: isCents ? pnlVal / 100 : pnlVal
          });
        }

        if (trades.length === 0) {
          throw new Error("No valid trades found. Please ensure your CSV contains PnL values.");
        }

        setParsedTrades(trades);

        const interval = setInterval(() => {
          setProgress((prev) => {
            const next = prev + 15;
            if (next >= 100) {
              clearInterval(interval);
              setTimeout(() => setImportState('success'), 0);
              return 100;
            }
            return next;
          });
        }, 150);

      } catch (err) {
        setImportState('idle');
        alert(err instanceof Error ? err.message : "Failed to parse CSV");
      }
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.toLowerCase().endsWith('.csv')) {
        processFile(file);
      } else {
        alert("Please upload a .csv file");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const resetAndClose = () => {
    if (importState === 'success' && parsedTrades.length > 0) {
      onImportSuccess(parsedTrades);
    }
    setImportState('idle');
    setProgress(0);
    setParsedTrades([]);
    onClose();
  };

  return (
    <div 
      className="fade-in"
      style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.2s ease-out' 
      }}
      onClick={importState !== 'processing' ? resetAndClose : undefined}
    >
      <div 
        className="glass-panel relative flex flex-col items-center" 
        style={{ position: 'relative', width: '100%', maxWidth: '500px', padding: '40px', textAlign: 'center', margin: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {importState !== 'processing' && (
          <button 
            onClick={resetAndClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}

        {importState === 'idle' && (
          <>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Import Broker Data</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Upload your CSV export from ThinkOrSwim, Webull, or Interactive Brokers to automatically track your progress.
            </p>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <input type="checkbox" checked={isCents} onChange={(e) => setIsCents(e.target.checked)} style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: 'var(--accent-color)' }} />
              My broker exports P&L in cents (e.g., 85050 = $850.50)
            </label>

            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{ 
                width: '100%', padding: '40px 20px', 
                border: `2px dashed ${dragActive ? 'var(--accent-color)' : 'var(--panel-border)'}`, 
                borderRadius: '16px', background: dragActive ? 'rgba(99, 102, 241, 0.05)' : 'rgba(0,0,0,0.2)',
                cursor: 'pointer', transition: 'all 0.2s ease'
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" style={{ margin: '0 auto 16px auto' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              <span style={{ fontWeight: 600, display: 'block', marginBottom: '4px' }}>Click to upload or drag and drop</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CSV up to 10MB</span>
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".csv" 
                style={{ display: 'none' }} 
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {importState === 'processing' && (
          <div className="flex flex-col items-center w-full py-8">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Processing Trades</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '32px' }}>
              {progress < 30 ? "Reading CSV format..." : progress < 70 ? "Mapping columns & parsing data..." : "Calculating behavioral metrics..."}
            </p>

            <div style={{ width: '100%', height: '8px', background: 'var(--panel-border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ width: `${Math.min(progress, 100)}%`, height: '100%', background: 'var(--accent-color)', transition: 'width 0.3s ease-out' }}></div>
            </div>
            
            <div className="flex justify-between w-full" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span>Importing</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
          </div>
        )}

        {importState === 'success' && (
          <div className="flex flex-col items-center w-full py-4">
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--success-color)" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Import Successful!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '32px' }}>
              Your dashboard has been updated with the latest broker data.
            </p>

            <div style={{ width: '100%', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '16px', textAlign: 'left', marginBottom: '32px' }}>
              <div className="flex justify-between mb-3">
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Trades Imported</span>
                <span style={{ fontWeight: 600 }}>{parsedTrades.length}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>New P&L Tracked</span>
                <span style={{ fontWeight: 600, color: parsedTrades.reduce((sum, t) => sum + t.pnl, 0) >= 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>
                  {parsedTrades.reduce((sum, t) => sum + t.pnl, 0) >= 0 ? '+' : '-'}${Math.abs(parsedTrades.reduce((sum, t) => sum + t.pnl, 0)).toFixed(2)}
                </span>
              </div>
            </div>

            <button onClick={resetAndClose} className="btn btn-primary" style={{ width: '100%' }}>
              View Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
