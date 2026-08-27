"use client";

import React from 'react';
import Link from 'next/link';

export default function FrontPageFooter() {
  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: '#0e0e0e',
        padding: '80px 0 40px 0',
        borderTop: '1px solid rgba(59, 73, 76, 0.25)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #00e5ff 0%, #46fa9c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="material-symbols-outlined" style={{ color: '#00363d', fontSize: '20px' }}>
                  filter_center_focus
                </span>
              </div>
              <span style={{ fontFamily: 'Geist, sans-serif', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: '#e5e2e1' }}>
                Trade Lens
              </span>
            </div>
            <p style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', color: '#bac9cc', maxWidth: '320px', lineHeight: 1.6, marginBottom: '28px' }}>
              Precision trading tools for the modern market. Insight-driven technology built for professional authority.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ color: '#bac9cc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#00e5ff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#bac9cc')}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>public</span>
              </a>
              <a href="#" style={{ color: '#bac9cc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#00e5ff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#bac9cc')}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>hub</span>
              </a>
              <a href="#" style={{ color: '#bac9cc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#00e5ff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#bac9cc')}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>share</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', fontWeight: 600, color: '#e5e2e1', marginBottom: '20px' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'Geist, sans-serif', fontSize: '14px', color: '#bac9cc' }}>
              <li><Link href="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Terminal</Link></li>
              <li><a href="#map" style={{ color: 'inherit', textDecoration: 'none' }}>Market Data</a></li>
              <li><a href="#terminal" style={{ color: 'inherit', textDecoration: 'none' }}>API Solutions</a></li>
              <li><Link href="/replay" style={{ color: 'inherit', textDecoration: 'none' }}>Mobile App</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', fontWeight: 600, color: '#e5e2e1', marginBottom: '20px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'Geist, sans-serif', fontSize: '14px', color: '#bac9cc' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Careers</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Press</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', fontWeight: 600, color: '#e5e2e1', marginBottom: '20px' }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'Geist, sans-serif', fontSize: '14px', color: '#bac9cc' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Policy</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Risk Disclosure</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Version */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(59, 73, 76, 0.25)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
            color: 'rgba(186, 201, 204, 0.6)',
          }}
        >
          <span>© 2024 Trade Lens Technologies Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Designed for High-Performance Clarity</span>
            <span style={{ color: '#00e5ff' }}>v4.2.0-stable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
