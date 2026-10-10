import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  RefreshCw,
  Flame,
  ChevronRight
} from 'lucide-react';

export default function RecipeDiscovery() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);

  const presetQueries = [
    { label: '🍗 Chicken recipe', query: 'Chicken recipe' },
    { label: '🥑 Healthy breakfast', query: 'Healthy breakfast' },
    { label: '💪 High protein dinner', query: 'High protein dinner' },
    { label: '🥗 Something under 500 calories', query: 'Something under 500 calories' },
    { label: '⚡ 15-minute quick lunch', query: '15-minute quick lunch' },
    { label: '🌱 Vegetarian meal prep', query: 'Vegetarian meal prep' }
  ];

  const handleSearch = async (searchTerm) => {
    const q = searchTerm || query;
    if (!q.trim()) {
      setError('Please type what kind of recipe you are craving.');
      return;
    }

    setQuery(q);
    setIsSearching(true);
    setError(null);
    setRecipes(null);

    try {
      const response = await fetch('/api/discover-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q.trim() })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned error ${response.status}`);
      }

      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to discover recipes. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="section-header">
        <span className="section-tag">
          <Compass size={14} /> Recipe Discovery
        </span>
        <h2 className="section-title">"What Should I Eat?"</h2>
        <p className="section-desc">
          Craving something specific or looking for healthy inspiration? Ask for anything from high-protein dinners to meals under 500 calories.
        </p>
      </div>

      {/* Search Input Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div style={{
            flex: 1,
            minWidth: '260px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search 
              size={20} 
              style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} 
            />
            <input
              type="text"
              placeholder="e.g. Chicken recipe, healthy breakfast, high protein dinner..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.85rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-subtle)',
                fontSize: '1rem',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="btn-primary"
            style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
          >
            {isSearching ? <RefreshCw size={18} className="spin" /> : <Sparkles size={18} />}
            <span>Find Recipes</span>
          </button>
        </form>

        {/* Suggestion Chips */}
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.45rem' }}>
            Popular Suggestions:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {presetQueries.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSearch(p.query)}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-main)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>{p.label}</span>
                <ChevronRight size={14} color="var(--text-subtle)" />
              </button>
            ))}
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
      </div>

      {/* Results Grid */}
      {recipes && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
            Recommended For: <span style={{ color: 'var(--primary)' }}>"{query}"</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {recipes.map((recipe, idx) => (
              <div
                key={recipe.id || idx}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {recipe.tags?.map((t, i) => (
                        <span
                          key={i}
                          style={{
                            background: '#f0fdfa',
                            color: '#0f766e',
                            fontSize: '0.72rem',
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
                      color: 'var(--text-muted)'
                    }}>
                      <Clock size={14} />
                      <span>{recipe.cookingTime || '20 mins'}</span>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.45rem' }}>
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

                  {/* Ingredients */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                      Ingredients:
                    </strong>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {recipe.ingredients?.map((ing, i) => (
                        <li 
                          key={i} 
                          style={{
                            fontSize: '0.85rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0.2rem 0',
                            borderBottom: '1px dashed #f1f5f9'
                          }}
                        >
                          <span style={{ fontWeight: 600 }}>• {ing.item}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{ing.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div>
                    <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                      Instructions:
                    </strong>
                    <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', color: '#334155' }}>
                      {recipe.instructions?.map((step, sIdx) => (
                        <li key={sIdx} style={{ lineHeight: '1.45' }}>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
