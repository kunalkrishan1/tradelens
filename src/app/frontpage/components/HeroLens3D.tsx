"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function HeroLens3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 5, y: -10 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 15;

    setRotate({ x: rotX, y: rotY });
  }, [prefersReducedMotion]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 5, y: -10 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '540px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '2000px',
        userSelect: 'none',
      }}
    >
      {/* Decorative Gradient Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: '450px',
          height: '450px',
          backgroundColor: 'rgba(0, 229, 255, 0.12)',
          filter: 'blur(120px)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: `translate(${rotate.y * 2}px, ${rotate.x * 2}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      ></div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          height: '460px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* Floating Terminal Card 1 (AAPL Monitor) */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '10px',
            width: '380px',
            backgroundColor: 'rgba(19, 19, 19, 0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(59, 73, 76, 0.45)',
            borderRadius: '16px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 229, 255, 0.1)',
            padding: '24px',
            transform: 'rotateY(-12deg) rotateX(5deg) translateZ(60px)',
            transition: 'transform 0.5s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '6px',
                  backgroundColor: '#e5e2e1',
                  color: '#131313',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '15px',
                }}
              >
                A
              </div>
              <div>
                <h3 style={{ fontFamily: 'Geist, sans-serif', fontSize: '16px', fontWeight: 600, color: '#e5e2e1', margin: 0 }}>
                  AAPL
                </h3>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#bac9cc', margin: 0 }}>
                  Apple Inc.
                </p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: 600, color: '#e5e2e1' }}>
                $184.92
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#00DC82', fontWeight: 600 }}>
                +1.24 (0.68%)
              </div>
            </div>
          </div>

          {/* Glowing Green Chart SVG */}
          <svg style={{ width: '100%', height: '96px', marginTop: '16px', overflow: 'visible' }} preserveAspectRatio="none" viewBox="0 0 200 60">
            <defs>
              <linearGradient id="heroChartGrad1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#00DC82" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00DC82" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,50 L20,45 L40,48 L60,35 L80,38 L100,20 L120,25 L140,15 L160,18 L180,5 L200,10 L200,60 L0,60 Z" fill="url(#heroChartGrad1)" />
            <path
              d="M0,50 L20,45 L40,48 L60,35 L80,38 L100,20 L120,25 L140,15 L160,18 L180,5 L200,10"
              fill="none"
              stroke="#00DC82"
              strokeWidth="2.5"
              style={{ filter: 'drop-shadow(0px 2px 6px rgba(0, 220, 130, 0.5))' }}
            />
          </svg>
        </div>

        {/* Floating Terminal Card 2 (Order Book BTC/USD) */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '10px',
            width: '320px',
            backgroundColor: 'rgba(32, 31, 31, 0.92)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(59, 73, 76, 0.35)',
            borderRadius: '16px',
            boxShadow: '0 30px 60px rgba(0, 229, 255, 0.08), 0 20px 40px rgba(0,0,0,0.7)',
            padding: '20px',
            transform: 'rotateY(14deg) rotateX(-8deg) translateZ(110px)',
            transition: 'transform 0.5s ease',
          }}
        >
          <h4
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              fontWeight: 600,
              color: '#bac9cc',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '14px',
              borderBottom: '1px solid rgba(59, 73, 76, 0.3)',
              paddingBottom: '8px',
            }}
          >
            Order Book (BTC/USD)
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FF4B4B' }}>
              <span>64,231.50</span>
              <span>0.4120</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FF4B4B' }}>
              <span>64,230.10</span>
              <span>1.0500</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FF4B4B' }}>
              <span>64,228.90</span>
              <span>0.1500</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                margin: '4px 0',
                borderTop: '1px solid rgba(59, 73, 76, 0.3)',
                borderBottom: '1px solid rgba(59, 73, 76, 0.3)',
              }}
            >
              <span style={{ fontSize: '15px', color: '#e5e2e1', fontWeight: 700 }}>64,227.40</span>
              <span style={{ color: '#bac9cc', fontSize: '12px' }}>$64,227.40</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00DC82' }}>
              <span>64,226.00</span>
              <span>2.4050</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00DC82' }}>
              <span>64,225.20</span>
              <span>0.8000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00DC82' }}>
              <span>64,221.80</span>
              <span>1.2000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
