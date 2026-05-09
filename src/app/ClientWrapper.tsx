"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const [activeAccount, setActiveAccount] = useState('Exness MT5');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [activeTheme, setActiveTheme] = useState('dark');
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('tradelens_theme') || 'dark';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    setActiveTheme(theme);
    setIsThemeMenuOpen(false);
    localStorage.setItem('tradelens_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  if (isAuthPage || pathname.startsWith('/trade/')) {
    return (
      <div 
        className="flex" 
        style={{ 
          minHeight: '100vh', 
          width: '100vw', 
          background: 'var(--bg-color)',
          alignItems: isAuthPage ? 'center' : 'stretch',
          justifyContent: isAuthPage ? 'center' : 'stretch',
          padding: isAuthPage ? '0' : '40px'
        }}
      >
        <div style={{ width: '100%', maxWidth: isAuthPage ? 'none' : '1400px', margin: '0 auto' }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        borderRight: '1px solid var(--panel-border)',
        background: 'var(--panel-bg)',
        backdropFilter: 'blur(20px)',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        position: 'fixed',
        height: '100vh',
        zIndex: 10
      }}>
        <div className="logo flex items-center gap-2">
          <div style={{
            width: '32px', height: '32px', 
            background: 'linear-gradient(135deg, var(--accent-color), #c084fc)',
            borderRadius: '8px',
            boxShadow: '0 0 15px var(--accent-glow)'
          }}></div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>TradeLens<span style={{color: 'var(--text-secondary)', fontWeight: 400}}>.trade</span></h2>
        </div>

        {/* Account Switcher */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between" 
            style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', cursor: 'pointer', border: '1px solid var(--panel-border)' }}
          >
            <div className="flex items-center gap-3">
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
                {activeAccount.charAt(0)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{activeAccount}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Live Account</span>
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          
          {isDropdownOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '12px', marginTop: '8px', padding: '8px', zIndex: 20 }}>
              {['Exness MT5', 'Exness MT4', 'Personal IBKR', 'Apex Prop 50k'].map(acc => (
                <div 
                  key={acc}
                  onClick={() => { setActiveAccount(acc); setIsDropdownOpen(false); }}
                  style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', background: activeAccount === acc ? 'rgba(255,255,255,0.1)' : 'transparent', fontSize: '0.85rem' }}
                  className="hover:bg-white/5"
                >
                  {acc}
                </div>
              ))}
              <div style={{ height: '1px', background: 'var(--panel-border)', margin: '8px 0' }}></div>
              <div style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="hover:bg-white/5">
                + Add Account
              </div>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-2">
          <Link href="/" className="nav-item" style={navItemStyle(pathname === '/')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect></svg>
            Dashboard
          </Link>
          <Link href="/calendar" className="nav-item" style={navItemStyle(pathname === '/calendar')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Calendar
          </Link>
          <Link href="/journal" className="nav-item" style={navItemStyle(pathname === '/journal')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Journal
          </Link>
          <Link href="/replay" className="nav-item" style={navItemStyle(pathname === '/replay')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Replay Engine
          </Link>
          <Link href="/playbook" className="nav-item" style={navItemStyle(pathname === '/playbook')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            Playbook
          </Link>
          <Link href="/analytics" className="nav-item" style={navItemStyle(pathname === '/analytics')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
            Analytics
          </Link>
          <Link href="/connections" className="nav-item" style={navItemStyle(pathname === '/connections')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            Connections
          </Link>
          <Link href="/preferences" className="nav-item" style={navItemStyle(pathname === '/preferences')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Preferences
          </Link>
          <Link href="/system" className="nav-item" style={navItemStyle(pathname === '/system')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            System Architecture
          </Link>
        </nav>
        
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="glass-panel" style={{ padding: '16px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Broker Status</div>
            <div className="flex items-center gap-2">
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-color)', boxShadow: '0 0 8px var(--success-glow)' }}></div>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{activeAccount.includes('Prop') ? 'Rithmic (Live)' : 'Interactive Brokers'}</span>
            </div>
          </div>

          {/* Theme Switcher */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="flex items-center justify-between" 
              style={{ padding: '8px 12px', background: 'var(--panel-bg)', borderRadius: '8px', cursor: 'pointer', border: '1px solid var(--panel-border)' }}
            >
              <div className="flex items-center gap-2" style={{ fontSize: '0.85rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                Theme: <span style={{ textTransform: 'capitalize' }}>{activeTheme}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isThemeMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            
            {isThemeMenuOpen && (
              <div style={{ position: 'absolute', bottom: '100%', left: 0, width: '100%', background: 'var(--bg-color)', border: '1px solid var(--panel-border)', borderRadius: '12px', marginBottom: '8px', padding: '8px', zIndex: 20 }}>
                {['dark', 'light', 'midnight', 'cyberpunk'].map(theme => (
                  <div 
                    key={theme}
                    onClick={() => changeTheme(theme)}
                    style={{ padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', background: activeTheme === theme ? 'rgba(100,100,100,0.2)' : 'transparent', fontSize: '0.85rem', textTransform: 'capitalize' }}
                    className="hover:bg-white/5"
                  >
                    {theme}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/login" className="flex items-center gap-2" style={{ padding: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer', transition: 'color 0.2s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Log Out
          </Link>

        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '260px', width: 'calc(100% - 260px)', padding: '40px' }}>
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
}

function navItemStyle(isActive: boolean) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    color: isActive ? 'white' : 'var(--text-secondary)',
    background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    fontWeight: 500,
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
  };
}
