"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function FrontPageNav() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTheme, setActiveTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('tradelens_theme') || 'dark';
    setActiveTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    setActiveTheme(theme);
    localStorage.setItem('tradelens_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        backgroundColor: 'rgba(19, 19, 19, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(59, 73, 76, 0.3)',
        boxShadow: '0 1px 12px rgba(0, 229, 255, 0.08)',
      }}
    >
      <div
        style={{
          height: '64px',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <Link href="/frontpage" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#e5e2e1' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #00e5ff 0%, #46fa9c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.35)',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#00363d', fontSize: '22px', fontWeight: 'bold' }}>
              filter_center_focus
            </span>
          </div>
          <span style={{ fontFamily: 'Geist, sans-serif', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.03em', color: '#e5e2e1' }}>
            Trade Lens
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <a
            href="#markets"
            style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', color: '#bac9cc', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e5e2e1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#bac9cc')}
          >
            Markets
          </a>
          <a
            href="#map"
            style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', color: '#bac9cc', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e5e2e1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#bac9cc')}
          >
            Trading
          </a>
          <a
            href="#features"
            style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', color: '#bac9cc', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e5e2e1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#bac9cc')}
          >
            Features
          </a>
          <a
            href="#terminal"
            style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', color: '#bac9cc', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e5e2e1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#bac9cc')}
          >
            Terminal
          </a>
          <a
            href="#portfolio"
            style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', color: '#bac9cc', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e5e2e1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#bac9cc')}
          >
            Insights
          </a>
        </nav>

        {/* Right CTA / Auth Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Theme Quick Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#bac9cc' }}>
            <button
              onClick={() => changeTheme('light')}
              style={{ background: 'none', border: 'none', color: activeTheme === 'light' ? '#00e5ff' : '#bac9cc', cursor: 'pointer', display: 'flex' }}
              title="Light Mode"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>light_mode</span>
            </button>
            <button
              onClick={() => changeTheme('dark')}
              style={{ background: 'none', border: 'none', color: activeTheme === 'dark' ? '#00e5ff' : '#bac9cc', cursor: 'pointer', display: 'flex' }}
              title="Dark Mode"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>dark_mode</span>
            </button>
            <button
              onClick={() => changeTheme('midnight')}
              style={{ background: 'none', border: 'none', color: activeTheme === 'midnight' ? '#00e5ff' : '#bac9cc', cursor: 'pointer', display: 'flex' }}
              title="Midnight Mode"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>desktop_windows</span>
            </button>
          </div>

          <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(59, 73, 76, 0.5)', margin: '0 4px' }}></div>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                href="/dashboard"
                style={{
                  backgroundColor: '#00e5ff',
                  color: '#00363d',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 0 20px rgba(0, 229, 255, 0.35)',
                  transition: 'all 0.2s',
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={() => logout()}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(59, 73, 76, 0.4)',
                  color: '#e5e2e1',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Logout ({user?.username})
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link
                href="/login"
                style={{
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '15px',
                  color: '#bac9cc',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e5e2e1')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#bac9cc')}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                style={{
                  backgroundColor: '#00e5ff',
                  color: '#00363d',
                  padding: '8px 22px',
                  borderRadius: '9999px',
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 0 20px rgba(0, 229, 255, 0.35)',
                  transition: 'all 0.2s',
                }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
