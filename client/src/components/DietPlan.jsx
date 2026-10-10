import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  AlertCircle, 
  RefreshCw, 
  Flame, 
  Calendar, 
  ShieldAlert, 
  Heart, 
  Check, 
  Coffee, 
  Apple, 
  UtensilsCrossed, 
  Cookie, 
  Moon,
  Info
} from 'lucide-react';

export default function DietPlan() {
  const [formData, setFormData] = useState({
    currentWeight: 72,
    targetWeight: 68,
    height: 172,
    age: 26,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'lose',
    preferredDiet: 'non-vegetarian',
    dietaryRestrictions: ''
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  const mealIcons = {
    'Breakfast': Coffee,
    'Mid-Morning Snack': Apple,
    'Lunch': UtensilsCrossed,
    'Evening Snack': Cookie,
    'Dinner': Moon
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsCalculating(true);
    setError(null);

    try {
      const response = await fetch('/api/diet-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setPlan(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to generate diet plan. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="section-header">
        <span className="section-tag">
          <Target size={14} /> Personalized Goal Planner
        </span>
        <h2 className="section-title">Personal Goal → Diet Plan</h2>
        <p className="section-desc">
          Tell us about your body metrics and lifestyle. NutriMate AI calculates your safe daily caloric and protein targets, and generates a personalized 5-meal daily plan.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.65rem' }}>
            1. Your Physical Metrics & Activity
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {/* Current Weight */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Current Weight (kg)
              </label>
              <input
                type="number"
                min="35"
                max="250"
                step="0.5"
                value={formData.currentWeight}
                onChange={(e) => handleInputChange('currentWeight', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.7rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {/* Target Weight */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Target Weight (kg)
              </label>
              <input
                type="number"
                min="35"
                max="250"
                step="0.5"
                value={formData.targetWeight}
                onChange={(e) => handleInputChange('targetWeight', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.7rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {/* Height */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Height (cm)
              </label>
              <input
                type="number"
                min="100"
                max="250"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.7rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {/* Age */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Age
              </label>
              <input
                type="number"
                min="16"
                max="100"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.7rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {/* Gender */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.95rem'
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Activity Level */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Activity Level
              </label>
              <select
                value={formData.activityLevel}
                onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.95rem'
                }}
              >
                <option value="sedentary">Sedentary (Desk job, little exercise)</option>
                <option value="light">Lightly Active (1-3 workouts / week)</option>
                <option value="moderate">Moderately Active (3-5 workouts / week)</option>
                <option value="active">Very Active (6-7 intense workouts / week)</option>
              </select>
            </div>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.65rem', marginTop: '0.5rem' }}>
            2. Goal & Dietary Style
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem'
          }}>
            {/* Goal Toggle */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Primary Goal
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[
                  { id: 'lose', label: 'Lose Weight' },
                  { id: 'maintain', label: 'Maintain' },
                  { id: 'gain', label: 'Gain Muscle/Weight' }
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => handleInputChange('goal', g.id)}
                    style={{
                      flex: 1,
                      padding: '0.65rem 0.5rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      backgroundColor: formData.goal === g.id ? 'var(--primary-light)' : 'var(--bg-subtle)',
                      color: formData.goal === g.id ? 'var(--primary-dark)' : 'var(--text-muted)',
                      border: `1px solid ${formData.goal === g.id ? 'var(--primary)' : 'var(--border)'}`
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Diet */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Preferred Diet
              </label>
              <select
                value={formData.preferredDiet}
                onChange={(e) => handleInputChange('preferredDiet', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.95rem'
                }}
              >
                <option value="non-vegetarian">Non-Vegetarian (Chicken, Fish, Eggs, Veggies)</option>
                <option value="vegetarian">Vegetarian (Dairy, Legumes, Tofu, Veggies)</option>
                <option value="eggetarian">Eggetarian (Eggs + Vegetarian)</option>
              </select>
            </div>
          </div>

          {/* Optional Dietary Restrictions */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Optional Dietary Restrictions / Food Allergies:
            </label>
            <input
              type="text"
              placeholder="e.g. Dairy-free, gluten-free, no peanuts, low sodium..."
              value={formData.dietaryRestrictions}
              onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-subtle)',
                fontSize: '0.95rem'
              }}
            />
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

          <button
            type="submit"
            disabled={isCalculating}
            className="btn-primary btn-large"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {isCalculating ? (
              <>
                <RefreshCw size={20} className="spin" /> Calculating Safe Diet Plan...
              </>
            ) : (
              <>
                <Sparkles size={20} /> Calculate My Safe Diet Plan
              </>
            )}
          </button>
        </form>
      </div>

      {/* Generated Diet Plan Results */}
      {plan && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Target Overview Cards */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)',
            border: '1px solid #ccfbf1'
          }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--primary-dark)' }}>
              🎯 Your Personalized Nutritional Blueprint
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              Scientifically calculated based on Mifflin-St Jeor metabolic expenditure and safe rate of progress.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.85rem',
              marginBottom: '1.25rem'
            }}>
              <div className="macro-badge" style={{ background: '#ffffff' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CURRENT</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{plan.overview.currentWeight}</div>
              </div>

              <div className="macro-badge" style={{ background: '#ffffff' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TARGET</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>{plan.overview.targetWeight}</div>
              </div>

              <div className="macro-badge" style={{ background: '#ffffff' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>DIFFERENCE</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#d97706' }}>{plan.overview.weightDifference}</div>
              </div>

              <div className="macro-badge calories" style={{ background: '#ffffff' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>DAILY CALORIES</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{plan.overview.estimatedDailyCalories} <span style={{ fontSize: '0.8rem' }}>kcal</span></div>
              </div>

              <div className="macro-badge protein" style={{ background: '#ffffff' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>DAILY PROTEIN</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{plan.overview.estimatedDailyProtein}</div>
              </div>
            </div>

            {/* Realistic Estimated Time Required Notice as requested */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <Calendar size={22} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  Estimated Time Required: <span style={{ color: 'var(--primary)' }}>{plan.overview.estimatedTimeRange}</span>
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                  <strong>Important Notice:</strong> We do NOT promise an exact number of days. This is a realistic estimated range based on a safe, medically reasonable rate of weight change ({plan.overview.safeWeeklyRate}). Actual results vary based on metabolism, hydration, physical activity, and adherence.
                </p>
              </div>
            </div>
          </div>

          {/* 5-Meal Daily Plan Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
              📅 Daily 5-Meal Plan Breakdown
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {plan.meals?.map((meal, idx) => {
                const Icon = mealIcons[meal.mealName] || Coffee;
                return (
                  <div
                    key={idx}
                    className="card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      padding: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--primary-light)',
                          color: 'var(--primary-dark)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                            {meal.mealName}
                          </h4>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            Recommended Time: {meal.time}
                          </span>
                        </div>
                      </div>

                      {/* Meal Macro Pills */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)', background: '#f0fdf4', color: '#166534' }}>
                          {meal.calories} kcal
                        </span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)', background: '#f0f9ff', color: '#0369a1' }}>
                          {meal.protein}g protein
                        </span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)', background: '#fefce8', color: '#854d0e' }}>
                          {meal.carbs}g carbs
                        </span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)', background: '#fff1f2', color: '#9f1239' }}>
                          {meal.fats}g fats
                        </span>
                      </div>
                    </div>

                    <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                        🍽️ {meal.food}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <strong>Portion:</strong> {meal.portion}
                      </div>
                    </div>

                    {meal.prepNotes && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        💡 {meal.prepNotes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Totals Comparison */}
          {plan.dailyTotals && (
            <div className="card" style={{ background: '#f8fafc', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                  📊 Daily Meal Plan Totals
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Sum of all 5 meals matches target intake
                </span>
              </div>

              <div className="macro-badge-grid">
                <div className="macro-badge calories">
                  <div className="macro-val">{plan.dailyTotals.calories}</div>
                  <div className="macro-label">Total Calories (kcal)</div>
                </div>

                <div className="macro-badge protein">
                  <div className="macro-val">{plan.dailyTotals.protein}g</div>
                  <div className="macro-label">Total Protein</div>
                </div>

                <div className="macro-badge carbs">
                  <div className="macro-val">{plan.dailyTotals.carbs}g</div>
                  <div className="macro-label">Total Carbs</div>
                </div>

                <div className="macro-badge fats">
                  <div className="macro-val">{plan.dailyTotals.fats}g</div>
                  <div className="macro-label">Total Fats</div>
                </div>
              </div>
            </div>
          )}

          {/* Wellness Tips */}
          {plan.wellnessTips && plan.wellnessTips.length > 0 && (
            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.6rem' }}>
                🌿 Nutritionist Wellness Habits:
              </h4>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {plan.wellnessTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Medical Safety Disclaimer Alert */}
          <div className="medical-alert-banner">
            <ShieldAlert size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                Healthcare & Wellness Safety Advisory
              </strong>
              <p style={{ lineHeight: '1.45' }}>
                {plan.safetyDisclaimer || "NutriMate AI provides general nutritional and caloric estimates for educational and wellness purposes only. It is NOT medical advice. Individuals with medical conditions, pregnancy, eating disorders, or special dietary requirements should consult a qualified physician or registered dietitian before undertaking any diet plan."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
