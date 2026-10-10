import React, { useState, useRef } from 'react';
import { 
  Utensils, 
  Camera, 
  Upload, 
  Plus, 
  X, 
  Sparkles, 
  Clock, 
  Flame, 
  Check, 
  AlertCircle,
  RefreshCw,
  ChefHat
} from 'lucide-react';
import { compressImage } from '../utils/imageHelper';
import CameraModal from './CameraModal';

export default function KitchenRecipes() {
  const [ingredients, setIngredients] = useState(['Eggs', 'Spinach', 'Tomatoes']);
  const [currentInput, setCurrentInput] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState(['High Protein', 'Quick Recipe']);
  const [kitchenImage, setKitchenImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);

  const availablePreferences = [
    { id: 'High Protein', label: '💪 High Protein' },
    { id: 'Low Calorie', label: '🥗 Low Calorie' },
    { id: 'Quick Recipe', label: '⚡ Quick Recipe (<20m)' },
    { id: 'Vegetarian', label: '🌱 Vegetarian' }
  ];

  const quickStaples = [
    'Eggs', 'Tomatoes', 'Onions', 'Spinach', 'Garlic', 
    'Rice', 'Oats', 'Paneer', 'Chicken Breast', 'Lentils', 'Bell Peppers', 'Greek Yogurt'
  ];

  const handleAddIngredient = (e) => {
    e?.preventDefault();
    const trimmed = currentInput.trim();
    if (!trimmed) return;
    if (!ingredients.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      setIngredients([...ingredients, trimmed]);
    }
    setCurrentInput('');
  };

  const handleQuickAdd = (item) => {
    if (!ingredients.some(i => i.toLowerCase() === item.toLowerCase())) {
      setIngredients([...ingredients, item]);
    }
  };

  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, idx) => idx !== indexToRemove));
  };

  const togglePreference = (pref) => {
    if (selectedPreferences.includes(pref)) {
      setSelectedPreferences(selectedPreferences.filter(p => p !== pref));
    } else {
      setSelectedPreferences([...selectedPreferences, pref]);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 900, 900, 0.85);
      setKitchenImage(compressed.dataUrl);
    } catch (err) {
      console.error(err);
      setError('Could not process kitchen photo.');
    }
  };

  const handleCameraCapture = (dataUrl) => {
    setKitchenImage(dataUrl);
  };

  const generateRecipes = async () => {
    if (ingredients.length === 0 && !kitchenImage) {
      setError('Please add at least one ingredient or upload a photo of your kitchen/fridge.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setRecipes(null);

    try {
      const response = await fetch('/api/kitchen-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients,
          preferences: selectedPreferences,
          image: kitchenImage || null
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setRecipes(data.recipes || []);
      if (data.detectedIngredients && data.detectedIngredients.length > 0 && kitchenImage) {
        // Merge detected ingredients
        const merged = Array.from(new Set([...ingredients, ...data.detectedIngredients]));
        setIngredients(merged);
      }
    } catch (err) {
      console.error('Recipe generation error:', err);
      setError(err.message || 'Failed to generate recipes. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="section-header">
        <span className="section-tag">
          <ChefHat size={14} /> Pantry Chef
        </span>
        <h2 className="section-title">What's in My Kitchen?</h2>
        <p className="section-desc">
          Tell us or snap a picture of what ingredients you have in your fridge and pantry. NutriMate AI crafts healthy, delicious meals prioritizing what's already at home.
        </p>
      </div>

      {/* Main Input Configuration Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Ingredient Tags & Manual Input */}
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
            Ingredients You Have:
          </label>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            padding: '0.75rem',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            minHeight: '52px',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            {ingredients.map((item, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: '#ffffff',
                  color: 'var(--text-main)',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  style={{ color: 'var(--text-subtle)', display: 'flex', alignItems: 'center' }}
                  title="Remove"
                >
                  <X size={14} />
                </button>
              </span>
            ))}

            <form onSubmit={handleAddIngredient} style={{ display: 'inline-flex', flex: 1, minWidth: '160px' }}>
              <input
                type="text"
                placeholder={ingredients.length === 0 ? "e.g. Eggs, chicken, spinach..." : "Type ingredient + Enter..."}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '0.9rem',
                  padding: '0.3rem 0.5rem'
                }}
              />
            </form>
          </div>

          {/* Quick staple suggestion chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>+ Quick Add:</span>
            {quickStaples.map((staple) => (
              <button
                key={staple}
                type="button"
                onClick={() => handleQuickAdd(staple)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                +{staple}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Upload or Camera Capture Row */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
              📸 Kitchen or Fridge Photo (Optional)
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Snap your pantry or fridge shelf, AI will scan ingredients automatically!
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />

            {kitchenImage ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img
                  src={kitchenImage}
                  alt="Kitchen preview"
                  style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                />
                <button
                  type="button"
                  onClick={() => setKitchenImage(null)}
                  className="btn-outline"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                >
                  <X size={12} /> Remove Photo
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-outline"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem' }}
                >
                  <Upload size={14} /> Upload Photo
                </button>

                <button
                  type="button"
                  onClick={() => setShowCamera(true)}
                  className="btn-outline"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem' }}
                >
                  <Camera size={14} /> Camera
                </button>
              </>
            )}
          </div>
        </div>

        {/* Recipe Preference Toggles */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
            Preferences & Diet Filters:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {availablePreferences.map((pref) => {
              const active = selectedPreferences.includes(pref.id);
              return (
                <button
                  key={pref.id}
                  type="button"
                  onClick={() => togglePreference(pref.id)}
                  style={{
                    backgroundColor: active ? 'var(--primary-light)' : 'var(--bg-subtle)',
                    color: active ? 'var(--primary-dark)' : 'var(--text-muted)',
                    border: `1px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-full)',
                    padding: '0.45rem 0.95rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  {active && <Check size={14} />}
                  <span>{pref.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#991b1b',
            fontSize: '0.88rem'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={generateRecipes}
          disabled={isGenerating}
          className="btn-primary btn-large"
          style={{ width: '100%', marginTop: '0.5rem' }}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={20} className="spin" /> Generating Chef Recipes...
            </>
          ) : (
            <>
              <Sparkles size={20} /> Generate Recipes From My Kitchen
            </>
          )}
        </button>
      </div>

      {/* Generated Recipes Grid */}
      {recipes && recipes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              Recipes You Can Make Right Now ({recipes.length})
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Prioritizing your available ingredients
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {recipes.map((recipe, index) => (
              <div 
                key={recipe.id || index}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  {/* Tags & Time */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {recipe.tags?.map((t, i) => (
                        <span
                          key={i}
                          style={{
                            background: 'var(--primary-light)',
                            color: 'var(--primary-dark)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.5rem',
                            borderRadius: 'var(--radius-full)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      flexShrink: 0
                    }}>
                      <Clock size={14} />
                      <span>{recipe.cookingTime || '15 mins'}</span>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.45rem', color: 'var(--text-main)' }}>
                    {recipe.name}
                  </h4>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '1.2rem' }}>
                    {recipe.description}
                  </p>

                  {/* Macronutrient Pills */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.4rem',
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '0.65rem 0.5rem',
                    textAlign: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1rem' }}>{recipe.calories}</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)' }}>KCAL</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '1rem' }}>{recipe.protein}g</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)' }}>PROTEIN</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#854d0e', fontSize: '1rem' }}>{recipe.carbs}g</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)' }}>CARBS</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#9f1239', fontSize: '1rem' }}>{recipe.fats}g</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)' }}>FATS</div>
                    </div>
                  </div>

                  {/* Ingredients List */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                      Ingredients & Quantities:
                    </strong>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {recipe.ingredients?.map((ing, i) => (
                        <li 
                          key={i} 
                          style={{
                            fontSize: '0.85rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.25rem 0',
                            borderBottom: '1px dashed #f1f5f9'
                          }}
                        >
                          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>• {ing.item}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{ing.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Step by Step Instructions */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                      Step-by-Step Instructions:
                    </strong>
                    <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#334155' }}>
                      {recipe.instructions?.map((step, sIdx) => (
                        <li key={sIdx} style={{ lineHeight: '1.45' }}>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {recipe.tip && (
                  <div style={{
                    background: '#f0fdfa',
                    border: '1px solid #ccfbf1',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.8rem',
                    color: '#0f766e',
                    marginTop: '0.75rem'
                  }}>
                    <strong>Chef Tip:</strong> {recipe.tip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Camera Modal */}
      <CameraModal
        isOpen={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
}
