"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import FrontPageNav from './components/FrontPageNav';
import HeroLens3D from './components/HeroLens3D';
import MarketTicker from './components/MarketTicker';
import BentoHighlights from './components/BentoHighlights';
import GlobalMarketMap from './components/GlobalMarketMap';
import MarketIntelligence from './components/MarketIntelligence';
import TradingPreview from './components/TradingPreview';
import PortfolioPreview from './components/PortfolioPreview';
import FrontPageFooter from './components/FrontPageFooter';

export default function FrontPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#131313',
        color: '#e5e2e1',
        fontFamily: 'Geist, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}
    >
      {/* 1. Navigation */}
      <FrontPageNav />

      <main style={{ width: '100%', paddingTop: '64px', backgroundColor: '#131313', minHeight: '100vh' }}>
        {/* 2. Hero Section */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '880px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderBottom: '1px solid rgba(59, 73, 76, 0.2)',
            paddingTop: '96px',
            paddingBottom: '64px',
          }}
        >
          {/* Decorative Gradient Orbs */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              right: '20%',
              width: '600px',
              height: '600px',
              backgroundColor: 'rgba(0, 229, 255, 0.1)',
              filter: 'blur(140px)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '20%',
              width: '800px',
              height: '400px',
              backgroundColor: 'rgba(70, 250, 156, 0.05)',
              filter: 'blur(150px)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          ></div>

          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1440px',
              margin: '0 auto',
              padding: '0 32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '48px',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            {/* Left Content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '32px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(59, 73, 76, 0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#00e5ff',
                    boxShadow: '0 0 10px #00e5ff',
                  }}
                ></span>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: '#bac9cc',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Next-Gen Terminal Live
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'Geist, sans-serif',
                  fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                  fontWeight: 700,
                  color: '#e5e2e1',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  maxWidth: '680px',
                  margin: 0,
                }}
              >
                See the Market.<br />
                <span
                  style={{
                    background: 'linear-gradient(90deg, #c3f5ff 0%, #00e5ff 40%, #46fa9c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Trade with Clarity.
                </span>
              </h1>

              <p
                style={{
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '18px',
                  color: '#bac9cc',
                  maxWidth: '560px',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Execute with precision using institutional-grade analytics, ultra-low latency data routing, and proactive market intelligence.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', paddingTop: '8px' }}>
                <Link
                  href={isAuthenticated ? '/dashboard' : '/signup'}
                  style={{
                    backgroundColor: '#00e5ff',
                    color: '#00363d',
                    fontFamily: 'Geist, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    padding: '16px 36px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    boxShadow: '0 0 25px rgba(0, 229, 255, 0.35)',
                    transition: 'all 0.3s',
                  }}
                >
                  {isAuthenticated ? 'Open Dashboard' : 'Open Terminal'}
                </Link>

                <a
                  href="#features"
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #849396',
                    color: '#e5e2e1',
                    fontFamily: 'Geist, sans-serif',
                    fontSize: '16px',
                    fontWeight: 500,
                    padding: '16px 36px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  Explore Features
                </a>
              </div>

              {/* Metrics Strip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(59, 73, 76, 0.25)',
                  width: '100%',
                  maxWidth: '460px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: 600, color: '#e5e2e1' }}>~$12.4B</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#bac9cc' }}>Daily Volume</span>
                </div>
                <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(59, 73, 76, 0.4)' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: 600, color: '#46fa9c' }}>&lt;2ms</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#bac9cc' }}>Execution Latency</span>
                </div>
                <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(59, 73, 76, 0.4)' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: 600, color: '#00e5ff' }}>99.99%</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#bac9cc' }}>Uptime SLA</span>
                </div>
              </div>
            </div>

            {/* Right 3D Visualizer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeroLens3D />
            </div>
          </div>
        </section>

        {/* 3. Market Ticker */}
        <MarketTicker />

        {/* 4. Product Experience Bento Grid */}
        <BentoHighlights />

        {/* 5. Global Market Map ("Markets without borders.") */}
        <GlobalMarketMap />

        {/* 6. Market Intelligence & Asset Radar */}
        <MarketIntelligence />

        {/* 7. Interactive Execution Terminal */}
        <TradingPreview />

        {/* 8. Portfolio Alpha Intelligence */}
        <PortfolioPreview />
      </main>

      {/* 9. Modern Fintech Footer */}
      <FrontPageFooter />
    </div>
  );
}
