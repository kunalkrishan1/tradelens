"use client";

import Link from 'next/link';

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md fade-in" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      
      <div className="logo flex items-center justify-center gap-2 mb-8">
        <div style={{
          width: '40px', height: '40px', 
          background: 'linear-gradient(135deg, var(--accent-color), #c084fc)',
          borderRadius: '10px',
          boxShadow: '0 0 20px var(--accent-glow)'
        }}></div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>TradeLens<span style={{color: 'var(--text-secondary)', fontWeight: 400}}>.trade</span></h2>
      </div>

      <div className="glass-panel w-full" style={{ padding: '40px' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '8px', textAlign: 'center' }}>Create an Account</h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px', fontSize: '0.9rem' }}>Start tracking your edge and protecting your psychology</p>

        <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/'; }}>
          
          <div className="flex gap-4">
            <div className="flex flex-col gap-2" style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>First Name</label>
              <input type="text" className="input-field" placeholder="John" required />
            </div>
            <div className="flex flex-col gap-2" style={{ flex: 1 }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Last Name</label>
              <input type="text" className="input-field" placeholder="Doe" required />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email Address</label>
            <input type="email" className="input-field" placeholder="trader@example.com" required />
          </div>

          <div className="flex flex-col gap-2">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Password</label>
            <input type="password" className="input-field" placeholder="••••••••" required />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Must be at least 8 characters long.</span>
          </div>

          <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '12px', marginTop: '8px' }}>
            Create Account
          </button>
        </form>

        <div style={{ position: 'relative', margin: '32px 0', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--panel-border)' }}></div>
          <span style={{ position: 'relative', background: 'var(--panel-bg)', padding: '0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>OR</span>
        </div>

        <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" stroke="none"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" stroke="none"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" stroke="none"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" stroke="none"/></svg>
          Sign up with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--accent-color)', fontWeight: 500 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
