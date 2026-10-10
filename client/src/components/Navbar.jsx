import React, { useState } from 'react';
import { Apple, Utensils, Sparkles, Target, Compass, Info, X, CheckCircle2, Key } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, apiStatus }) {
  const [showApiModal, setShowApiModal] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Apple },
    { id: 'analyzer', label: 'Analyze Food', icon: Apple },
    { id: 'kitchen', label: "Kitchen Recipes", icon: Utensils },
    { id: 'discover', label: 'Find Recipe', icon: Compass },
    { id: 'diet', label: 'My Goal', icon: Target },
  ];

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="brand" onClick={() => setActiveTab('dashboard')}>
            <div className="brand-icon-wrapper">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="brand-title">
                NutriMate <span className="brand-ai-badge">AI</span>
              </div>
            </div>
          </div>

          <nav className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`nav-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setShowApiModal(true)}
              className="api-status-pill"
              title="Click to view AI API Configuration"
            >
              <span className={`status-dot ${apiStatus?.aiConfigured ? 'connected' : 'fallback'}`} />
              <span>{apiStatus?.aiConfigured ? 'Gemini AI Active' : 'Smart Demo Mode'}</span>
              <Info size={12} style={{ color: 'var(--text-subtle)' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* AI Configuration Info Modal */}
      {showApiModal && (
        <div className="modal-overlay" onClick={() => setShowApiModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Key size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.2rem' }}>AI Engine Status</h3>
              </div>
              <button 
                onClick={() => setShowApiModal(false)}
                style={{ padding: '0.4rem', borderRadius: '50%', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{
              background: apiStatus?.aiConfigured ? '#f0fdf4' : '#fffbeb',
              border: `1px solid ${apiStatus?.aiConfigured ? '#bbf7d0' : '#fef08a'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center'
            }}>
              <CheckCircle2 size={24} color={apiStatus?.aiConfigured ? '#16a34a' : '#d97706'} />
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: apiStatus?.aiConfigured ? '#166534' : '#854d0e' }}>
                  {apiStatus?.aiConfigured ? 'Google Gemini Vision & Flash API Connected' : 'Running in Smart Demonstration Mode'}
                </strong>
                <span style={{ fontSize: '0.82rem', color: apiStatus?.aiConfigured ? '#15803d' : '#a16207' }}>
                  {apiStatus?.aiConfigured 
                    ? 'All food scans and recipe requests use live Google Generative AI.'
                    : 'The app works 100% reliably out of the box using realistic nutrition and recipe generators.'}
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                To enable live Google Gemini AI:
              </h4>
              <ol style={{ paddingLeft: '1.25rem', marginBottom: '1rem', display: 'flex', flexDirect: 'column', gap: '0.35rem' }}>
                <li>Get a free Gemini API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Google AI Studio</a>.</li>
                <li>Open the <code style={{ background: '#f1f5f9', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>server/.env</code> file in this project.</li>
                <li>Set <code style={{ background: '#f1f5f9', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>GEMINI_API_KEY=your_key_here</code>.</li>
                <li>Restart the server. All requests will automatically switch to live Gemini AI!</li>
              </ol>
            </div>

            <button
              onClick={() => setShowApiModal(false)}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
