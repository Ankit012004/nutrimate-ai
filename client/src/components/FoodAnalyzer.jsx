import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  RefreshCw,
  Zap,
  Flame,
  Award
} from 'lucide-react';
import { compressImage, getSampleFoodImage } from '../utils/imageHelper';
import CameraModal from './CameraModal';

export default function FoodAnalyzer() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPEG, PNG, WebP).');
      return;
    }

    try {
      setError(null);
      const compressed = await compressImage(file, 900, 900, 0.85);
      setSelectedImage(compressed.dataUrl);
      analyzeImage(compressed.dataUrl, compressed.mimeType);
    } catch (err) {
      console.error(err);
      setError('Failed to process the image. Please try another image.');
    }
  };

  const handleCameraCapture = (dataUrl) => {
    setSelectedImage(dataUrl);
    analyzeImage(dataUrl, 'image/jpeg');
  };

  const handleSampleSelect = (type) => {
    setError(null);
    const sampleUrl = getSampleFoodImage(type);
    setSelectedImage(sampleUrl);
    analyzeImage(sampleUrl, 'image/svg+xml');
  };

  const analyzeImage = async (base64Image, mimeType) => {
    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          mimeType: mimeType || 'image/jpeg'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Unable to analyze meal. Please check server connectivity.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="section-header">
        <span className="section-tag">
          <Sparkles size={14} /> AI Food Vision
        </span>
        <h2 className="section-title">Food Photo → Nutrition Analysis</h2>
        <p className="section-desc">
          Upload or take a photo of your meal. NutriMate AI identifies the food and breaks down estimated calories, macronutrients, and serving size.
        </p>
      </div>

      {/* Main Analysis Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedImage ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Image Upload & Preview Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📸</span> Your Food Photo
          </h3>

          {!selectedImage ? (
            <div
              style={{
                border: '2px dashed var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-subtle)',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Upload size={28} />
              </div>

              <div>
                <p style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  Upload food image or snap a photo
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Supports JPEG, PNG, WebP from your device camera or gallery
                </p>
              </div>

              {/* Upload & Camera Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary"
                >
                  <Upload size={18} /> Upload Image
                </button>

                <button
                  type="button"
                  onClick={() => setShowCamera(true)}
                  className="btn-outline"
                >
                  <Camera size={18} /> Take Photo
                </button>
              </div>

              {/* Quick Try Samples */}
              <div style={{ marginTop: '0.75rem', width: '100%', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                  Or test with 1-click sample food:
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleSampleSelect('salad')}
                    className="btn-outline"
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-full)' }}
                  >
                    🥗 Chicken Salad
                  </button>
                  <button
                    onClick={() => handleSampleSelect('oats')}
                    className="btn-outline"
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-full)' }}
                  >
                    🥣 Berry Oatmeal
                  </button>
                  <button
                    onClick={() => handleSampleSelect('salmon')}
                    className="btn-outline"
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-full)' }}
                  >
                    🐟 Grilled Salmon
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                backgroundColor: '#000000',
                maxHeight: '360px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <img
                  src={selectedImage}
                  alt="Selected food meal"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '360px',
                    objectFit: 'cover'
                  }}
                />

                {isAnalyzing && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    color: '#ffffff'
                  }}>
                    <RefreshCw size={36} className="spin" color="#14b8a6" />
                    <span style={{ fontWeight: 700, fontSize: '1rem' }}>Analyzing food photograph...</span>
                    <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Estimating macros and portion sizes</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={resetAnalysis}
                  className="btn-outline"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                  <RefreshCw size={14} /> Scan Another Photo
                </button>

                <button
                  type="button"
                  onClick={() => analyzeImage(selectedImage)}
                  disabled={isAnalyzing}
                  className="btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                  <Sparkles size={14} /> Re-analyze
                </button>
              </div>
            </div>
          )}

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
        </div>

        {/* Right Column: Nutritional Breakdown Results */}
        {result && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--primary)',
                  letterSpacing: '0.04em'
                }}>
                  Detected Meal
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.15rem' }}>
                  {result.foodName}
                </h3>
              </div>

              <span style={{
                background: 'var(--primary-light)',
                color: 'var(--primary-dark)',
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)'
              }}>
                {result.healthRating || 'Balanced Meal'}
              </span>
            </div>

            {/* Serving Size Pill */}
            <div style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.65rem 0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.88rem'
            }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Approximate Serving Size:</span>
              <strong style={{ color: 'var(--text-main)' }}>{result.servingSize || '1 standard portion'}</strong>
            </div>

            {/* Macro Badges Grid */}
            <div>
              <h4 style={{ fontSize: '0.88rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                Estimated Macronutrients
              </h4>
              
              <div className="macro-badge-grid">
                <div className="macro-badge calories">
                  <div className="macro-val">{result.calories}</div>
                  <div className="macro-label">Calories (kcal)</div>
                </div>

                <div className="macro-badge protein">
                  <div className="macro-val">{result.protein} <span className="macro-unit">g</span></div>
                  <div className="macro-label">Protein</div>
                </div>

                <div className="macro-badge carbs">
                  <div className="macro-val">{result.carbs} <span className="macro-unit">g</span></div>
                  <div className="macro-label">Carbohydrates</div>
                </div>

                <div className="macro-badge fats">
                  <div className="macro-val">{result.fats} <span className="macro-unit">g</span></div>
                  <div className="macro-label">Fats</div>
                </div>

                <div className="macro-badge fiber">
                  <div className="macro-val">{result.fiber || 0} <span className="macro-unit">g</span></div>
                  <div className="macro-label">Fiber</div>
                </div>
              </div>
            </div>

            {/* Key Ingredients Identified */}
            {result.keyIngredients && result.keyIngredients.length > 0 && (
              <div>
                <h4 style={{ fontSize: '0.88rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                  Identified Food Components
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {result.keyIngredients.map((ing, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#f1f5f9',
                        color: '#334155',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      ✓ {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Health Notes */}
            {result.healthNotes && (
              <div style={{
                background: '#f0fdfa',
                border: '1px solid #ccfbf1',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                fontSize: '0.85rem',
                color: '#0f766e',
                lineHeight: '1.45'
              }}>
                <strong style={{ display: 'block', marginBottom: '0.2rem', color: '#115e59' }}>
                  💡 Nutritional Insight:
                </strong>
                {result.healthNotes}
              </div>
            )}

            {/* Mandatory Disclaimer as Requested */}
            <div className="disclaimer-box">
              <Info size={18} style={{ flexShrink: 0, color: 'var(--primary)' }} />
              <div>
                <strong>Estimated Values:</strong> {result.disclaimer || "Nutrition values are estimates and can vary depending on exact ingredients, cooking oils, and portion size."}
              </div>
            </div>

            {result.notice && (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontStyle: 'italic', textAlign: 'center' }}>
                {result.notice}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Live Camera Modal */}
      <CameraModal
        isOpen={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
}
