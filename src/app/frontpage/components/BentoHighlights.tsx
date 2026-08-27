"use client";

import React from 'react';

export default function BentoHighlights() {
  return (
    <section id="features" style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '120px 32px' }}>
      <div style={{ marginBottom: '64px', textAlign: 'center', maxWidth: '720px', margin: '0 auto 64px auto' }}>
        <h2
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            color: '#e5e2e1',
            letterSpacing: '-0.03em',
            marginBottom: '16px',
          }}
        >
          Designed for high-performance clarity
        </h2>
        <p style={{ fontFamily: 'Geist, sans-serif', fontSize: '16px', color: '#bac9cc', lineHeight: 1.6 }}>
          Every pixel serves a purpose. Trade Lens strips away the noise, presenting complex market data in a streamlined, highly legible interface tailored for rapid decision-making.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Feature Card 1: Real-Time Markets */}
        <div
          style={{
            backgroundColor: '#201f1f',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid rgba(59, 73, 76, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '320px',
            transition: 'border-color 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.4)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(59, 73, 76, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#131313',
                border: '1px solid rgba(59, 73, 76, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00e5ff',
                marginBottom: '24px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>monitoring</span>
            </div>
            <h3 style={{ fontFamily: 'Geist, sans-serif', fontSize: '20px', fontWeight: 600, color: '#e5e2e1', marginBottom: '12px' }}>
              Real-Time Markets
            </h3>
            <p style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', color: '#bac9cc', lineHeight: 1.6, marginBottom: '32px' }}>
              Streaming quotes, dynamic depth of market, and instantaneous execution reporting.
            </p>
          </div>

          {/* Micro Volume Bar Chart */}
          <div
            style={{
              width: '100%',
              height: '64px',
              backgroundColor: '#131313',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0 8px 4px 8px',
              gap: '6px',
            }}
          >
            <div style={{ flex: 1, height: '40%', backgroundColor: 'rgba(59, 73, 76, 0.4)', borderRadius: '2px 2px 0 0' }}></div>
            <div style={{ flex: 1, height: '60%', backgroundColor: 'rgba(59, 73, 76, 0.5)', borderRadius: '2px 2px 0 0' }}></div>
            <div style={{ flex: 1, height: '30%', backgroundColor: 'rgba(59, 73, 76, 0.4)', borderRadius: '2px 2px 0 0' }}></div>
            <div style={{ flex: 1, height: '80%', backgroundColor: 'rgba(59, 73, 76, 0.6)', borderRadius: '2px 2px 0 0' }}></div>
            <div
              style={{
                flex: 1,
                height: '100%',
                backgroundColor: '#00e5ff',
                borderRadius: '2px 2px 0 0',
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.6)',
              }}
            ></div>
          </div>
        </div>

        {/* Feature Card 2: Advanced Charting */}
        <div
          style={{
            backgroundColor: '#201f1f',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid rgba(59, 73, 76, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '320px',
            transition: 'border-color 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(70, 250, 156, 0.4)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(59, 73, 76, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#131313',
                border: '1px solid rgba(59, 73, 76, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#46fa9c',
                marginBottom: '24px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>ssid_chart</span>
            </div>
            <h3 style={{ fontFamily: 'Geist, sans-serif', fontSize: '20px', fontWeight: 600, color: '#e5e2e1', marginBottom: '12px' }}>
              Advanced Charting
            </h3>
            <p style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', color: '#bac9cc', lineHeight: 1.6, marginBottom: '32px' }}>
              Over 100 technical indicators, custom drawing tools, and multi-timeframe analysis.
            </p>
          </div>

          {/* Micro SVG Wave Chart */}
          <div style={{ width: '100%', height: '64px', position: 'relative' }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 100 30">
              <path
                d="M0,25 Q15,15 25,20 T50,10 T75,15 T100,5"
                fill="none"
                stroke="#46fa9c"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0px 2px 6px rgba(70, 250, 156, 0.5))' }}
              ></path>
            </svg>
          </div>
        </div>

        {/* Feature Card 3: Algorithmic Edge */}
        <div
          style={{
            backgroundColor: '#201f1f',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid rgba(59, 73, 76, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '320px',
            transition: 'border-color 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 193, 188, 0.4)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(59, 73, 76, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#131313',
                border: '1px solid rgba(59, 73, 76, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffc1bc',
                marginBottom: '24px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>memory</span>
            </div>
            <h3 style={{ fontFamily: 'Geist, sans-serif', fontSize: '20px', fontWeight: 600, color: '#e5e2e1', marginBottom: '12px' }}>
              Algorithmic Edge
            </h3>
            <p style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', color: '#bac9cc', lineHeight: 1.6, marginBottom: '32px' }}>
              Deploy quantitative strategies, backtest with historical tick data, and automate execution.
            </p>
          </div>

          {/* Mock Code Snippet */}
          <div
            style={{
              width: '100%',
              backgroundColor: '#131313',
              borderRadius: '8px',
              padding: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: 'rgba(186, 201, 204, 0.9)',
              overflow: 'hidden',
              lineHeight: 1.5,
              border: '1px solid rgba(59, 73, 76, 0.2)',
            }}
          >
            <code>
              <span style={{ color: '#00e5ff' }}>if</span> (rsi &lt; <span style={{ color: '#46fa9c' }}>30</span> &amp;&amp; macd.crossOver()) &#123;<br />
              &nbsp;&nbsp;execute.buy(<span style={{ color: '#46fa9c' }}>100</span>, <span style={{ color: '#ffc1bc' }}>&quot;MARKET&quot;</span>);<br />
              &#125;
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
