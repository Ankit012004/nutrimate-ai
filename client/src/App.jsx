import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FoodAnalyzer from './components/FoodAnalyzer';
import KitchenRecipes from './components/KitchenRecipes';
import RecipeDiscovery from './components/RecipeDiscovery';
import DietPlan from './components/DietPlan';
import { ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiStatus, setApiStatus] = useState({ aiConfigured: false, status: 'connecting' });

  useEffect(() => {
    fetchApiHealth();
  }, []);

  const fetchApiHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setApiStatus(data);
      } else {
        setApiStatus({ aiConfigured: false, status: 'offline' });
      }
    } catch {
      setApiStatus({ aiConfigured: false, status: 'offline' });
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        apiStatus={apiStatus}
      />

      {/* Main View Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'analyzer' && <FoodAnalyzer />}
        {activeTab === 'kitchen' && <KitchenRecipes />}
        {activeTab === 'discover' && <RecipeDiscovery />}
        {activeTab === 'diet' && <DietPlan />}
      </main>

      {/* Persistent Footer */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border)',
        padding: '1.75rem 1rem',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1140px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.85rem',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}>
            <ShieldCheck size={16} color="var(--primary)" />
            <span>
              <strong>NutriMate AI</strong> — General wellness & nutrition companion. Not a medical diagnosis tool.
            </span>
          </div>

          <p style={{
            fontSize: '0.78rem',
            color: 'var(--text-subtle)',
            maxWidth: '750px',
            lineHeight: 1.45
          }}>
            Estimates provided for calories, macronutrients, and timelines are approximate. Individuals with pre-existing medical conditions, pregnancy, or eating disorders should consult a qualified physician or registered dietitian before changing their dietary habits.
          </p>

          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            <span>Crafted with</span>
            <Heart size={12} color="#e11d48" fill="#e11d48" />
            <span>for healthy, delicious everyday living</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
