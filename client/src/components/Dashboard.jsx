import React from 'react';
import { 
  Camera, 
  Utensils, 
  Compass, 
  Target, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Zap,
  HeartHandshake
} from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  const features = [
    {
      id: 'analyzer',
      title: 'Analyze My Food',
      iconEmoji: '🍎',
      icon: Camera,
      tag: 'Vision AI',
      color: '#0d9488',
      bgColor: '#f0fdfa',
      borderColor: '#ccfbf1',
      description: 'Snap or upload a photo of your meal. AI estimates calories, protein, carbs, fats, fiber, and portion size.',
      cta: 'Scan Food Now'
    },
    {
      id: 'kitchen',
      title: "What's in My Kitchen?",
      iconEmoji: '📸',
      icon: Utensils,
      tag: 'Smart Chef',
      color: '#0284c7',
      bgColor: '#f0f9ff',
      borderColor: '#e0f2fe',
      description: 'Take a photo of your fridge or type what you have. AI creates delicious recipes prioritizing ingredients at home.',
      cta: 'Cook With What I Have'
    },
    {
      id: 'discover',
      title: 'Find a Recipe',
      iconEmoji: '🍳',
      icon: Compass,
      tag: 'Quick Ideas',
      color: '#ea580c',
      bgColor: '#fff7ed',
      borderColor: '#ffedd5',
      description: 'Ask for "high protein dinner", "healthy breakfast", or "under 500 calories" for instant custom recipes.',
      cta: 'Discover Recipes'
    },
    {
      id: 'diet',
      title: 'My Diet Plan',
      iconEmoji: '🎯',
      icon: Target,
      tag: 'Personalized Goals',
      color: '#7c3aed',
      bgColor: '#f5f3ff',
      borderColor: '#ede9fe',
      description: 'Set your target weight, dietary style, and activity. Get a safe daily calorie target and 5-meal daily schedule.',
      cta: 'Calculate My Plan'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0d9488 0%, #059669 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.25rem 2rem',
        color: '#ffffff',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '0.85rem',
            letterSpacing: '0.04em'
          }}>
            <Sparkles size={14} /> SIMPLE • CLEAN • AI-POWERED
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
            Eat smarter, cook effortlessly with NutriMate AI
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            Instant food photo nutrition analysis, pantry recipe generator, and science-backed personalized meal planning tailored to your goals.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('analyzer')}
              style={{
                backgroundColor: '#ffffff',
                color: '#0d9488',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '0.75rem 1.4rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>🍎 Scan Food Photo</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setActiveTab('kitchen')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                fontWeight: 600,
                fontSize: '0.95rem',
                padding: '0.75rem 1.4rem',
                borderRadius: 'var(--radius-lg)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>📸 Kitchen Recipes</span>
            </button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div style={{
          position: 'absolute',
          right: '-50px',
          bottom: '-70px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* 4 Large Cards as Requested */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Core Features</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Choose an action to get started in seconds</p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}>
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border)',
                  padding: '1.65rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  e.currentTarget.style.borderColor = feat.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: feat.bgColor,
                      border: `1px solid ${feat.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem'
                    }}>
                      {feat.iconEmoji}
                    </div>

                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: feat.bgColor,
                      color: feat.color
                    }}>
                      {feat.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                    {feat.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                    {feat.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.9rem',
                  borderTop: '1px solid var(--border)',
                  color: feat.color,
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}>
                  <span>{feat.cta}</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wellness & Safety Banner */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: '#e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <ShieldCheck size={20} color="var(--primary)" />
        </div>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            Medical & Nutritional Disclaimer
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
            NutriMate AI is designed for general wellness, fitness estimation, and culinary inspiration only. 
            All nutritional calculations and macro values are estimates and vary depending on exact ingredient choices and cooking preparations. 
            Individuals with medical conditions, eating disorders, diabetes, kidney disease, pregnancy, or special dietary requirements should always consult a qualified healthcare professional or registered dietitian.
          </p>
        </div>
      </div>
    </div>
  );
}
