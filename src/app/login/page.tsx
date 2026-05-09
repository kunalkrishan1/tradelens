"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LoginLandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const themeGreen = '#22c55e'; // Bright vibrant green from screenshot

  return (
    <div className="w-full fade-in flex flex-col items-center" style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', animation: 'fadeIn 0.5s ease-out', overflowX: 'hidden' }}>
      
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center" style={{ maxWidth: '1200px', padding: '24px', zIndex: 10 }}>
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={themeGreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>TradeLens Pro</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsLoginModalOpen(true)}
            style={{ fontWeight: 500, fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', background: 'none', border: 'none', cursor: 'pointer' }}
            className="hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button 
            style={{ background: themeGreen, color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
            className="hover:scale-105"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center" style={{ flex: 1, maxWidth: '900px', padding: '0 24px', marginTop: '60px' }}>
        
        {/* Pill Badge */}
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '8px', 
          background: 'rgba(34, 197, 94, 0.1)', border: `1px solid rgba(34, 197, 94, 0.2)`, 
          padding: '6px 16px', borderRadius: '999px', marginBottom: '32px' 
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={themeGreen} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span style={{ color: themeGreen, fontSize: '0.85rem', fontWeight: 500 }}>Professional Trading Journal</span>
        </div>

        {/* Massive Headline */}
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px' }}>
          Track, Analyze, and Improve <br />
          <span style={{ color: themeGreen }}>Your Trading Performance</span>
        </h1>

        {/* Subheadline */}
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: 1.6, marginBottom: '40px' }}>
          Connect your MetaTrader 5 account and get instant access to powerful analytics, AI-driven insights, and professional risk management tools.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mb-24">
          <button 
            style={{ 
              background: themeGreen, color: '#000', padding: '16px 32px', 
              borderRadius: '8px', fontWeight: 600, fontSize: '1rem', border: 'none', 
              cursor: 'pointer', transition: 'all 0.2s', boxShadow: `0 0 20px rgba(34, 197, 94, 0.4)`
            }}
            className="hover:scale-105"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Start Free Trial
          </button>
          <button 
            style={{ 
              background: 'rgba(255,255,255,0.05)', color: 'white', padding: '15px 32px', 
              borderRadius: '8px', fontWeight: 600, fontSize: '1rem', border: '1px solid rgba(255,255,255,0.1)', 
              cursor: 'pointer', transition: 'all 0.2s' 
            }}
            className="hover:bg-white hover:bg-opacity-10"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Sign In
          </button>
        </div>

        {/* Bottom Teaser */}
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '60px' }}>
          Everything You Need to Trade Smarter
        </h2>
      </main>

      {/* Login Modal Overlay */}
      {isLoginModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center fade-in"
          style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(12px)', animation: 'fadeIn 0.2s ease-out' }}
          onClick={() => setIsLoginModalOpen(false)}
        >
          <div 
            className="glass-panel relative flex flex-col items-center" 
            style={{ 
              width: '100%', maxWidth: '420px', padding: '40px', 
              background: '#111', border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
              className="hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="flex items-center gap-2 mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={themeGreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>TradeLens Pro</h2>
            </div>

            <h1 style={{ fontSize: '1.25rem', marginBottom: '8px', textAlign: 'center', width: '100%' }}>Welcome Back</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '32px', fontSize: '0.9rem' }}>Log in to your professional trading journal</p>

            <form className="flex flex-col gap-5 w-full" onSubmit={(e) => { e.preventDefault(); window.location.href = '/'; }}>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Email Address</label>
                <input type="email" className="input-field" placeholder="trader@example.com" style={{ background: 'rgba(0,0,0,0.4)' }} required />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Password</label>
                  <a href="#" style={{ fontSize: '0.8rem', color: themeGreen }}>Forgot password?</a>
                </div>
                <input type="password" className="input-field" placeholder="••••••••" style={{ background: 'rgba(0,0,0,0.4)' }} required />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Remember for 30 days</label>
              </div>

              <button type="submit" style={{ background: themeGreen, color: '#000', padding: '12px', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: 'pointer', marginTop: '8px', width: '100%' }}>
                Sign In
              </button>
            </form>

            <div style={{ position: 'relative', margin: '32px 0', textAlign: 'center', width: '100%' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <span style={{ position: 'relative', background: '#111', padding: '0 16px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>OR</span>
            </div>

            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" stroke="none"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" stroke="none"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" stroke="none"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" stroke="none"/></svg>
              Sign in with Google
            </button>

            <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
              Don&apos;t have an account? <Link href="/signup" style={{ color: themeGreen, fontWeight: 500 }}>Sign Up</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
