import { useState } from 'react';
import { categories, careLevels, priceRange, seasons, suggestions } from './FilterBar.data';
import './FilterBar.css';

export default function FilterBar({ filters, onFilterChange, onReset }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState(filters.search || '');

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleSearch = () => {
    onFilterChange({ ...filters, search: searchDraft });
  };

  const activeCount = Object.values(filters).filter(v => v !== '' && v !== null).length;

  return (
    <div className="filter-bar">
      <button className="filter-bar__toggle btn btn--outline" onClick={() => setMobileOpen(v => !v)}>
        Filters {activeCount > 0 && <span className="filter-bar__count">{activeCount}</span>}
      </button>

      <div className={`filter-bar__panel ${mobileOpen ? 'filter-bar__panel--open' : ''}`}>
        <div className="filter-bar__header">
          <h3 className="filter-bar__title">Find Plants</h3>
          <div className="filter-bar__header-actions">
            {activeCount > 0 && <button className="filter-bar__reset" onClick={onReset}>Clear all</button>}
            <button className="filter-bar__close" onClick={() => setMobileOpen(false)} aria-label="Close filters">x</button>
          </div>
        </div>

        <div className="filter-bar__search-row">
          <input
            type="text"
            className="filter-bar__input"
            placeholder="Search snake plant, summer plants, less care..."
            value={searchDraft}
            onChange={e => setSearchDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button type="button" className="btn btn--primary" onClick={handleSearch}>Search</button>
        </div>

        <div className="filter-bar__suggestions">
          {suggestions.map(item => (
            <button
              key={item.value}
              type="button"
              className={`filter-chip ${filters.suggestion === item.value ? 'filter-chip--active' : ''}`}
              onClick={() => handleChange('suggestion', filters.suggestion === item.value ? '' : item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="filter-bar__grid">
          <div className="filter-bar__group">
            <label className="filter-bar__label">Category</label>
            <select className="filter-bar__select" value={filters.category} onChange={e => handleChange('category', e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="filter-bar__group">
            <label className="filter-bar__label">Season</label>
            <select className="filter-bar__select" value={filters.season} onChange={e => handleChange('season', e.target.value)}>
              <option value="">All Seasons</option>
              {seasons.map(season => <option key={season} value={season}>{season}</option>)}
            </select>
          </div>

          <div className="filter-bar__group">
            <label className="filter-bar__label">Care Level</label>
            <select className="filter-bar__select" value={filters.careLevel} onChange={e => handleChange('careLevel', e.target.value)}>
              <option value="">All Levels</option>
              {careLevels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="filter-bar__group">
            <label className="filter-bar__label">Sunlight</label>
            <select className="filter-bar__select" value={filters.sunlight} onChange={e => handleChange('sunlight', e.target.value)}>
              <option value="">All</option>
              <option value="Low">Low Light</option>
              <option value="Partial">Partial Light</option>
              <option value="Bright Indirect">Bright Indirect</option>
              <option value="Full Sun">Full Sun</option>
            </select>
          </div>

          <div className="filter-bar__group">
            <label className="filter-bar__label">Budget</label>
            <select className="filter-bar__select" value={filters.priceRange} onChange={e => handleChange('priceRange', e.target.value)}>
              <option value="">All Budgets</option>
              {priceRange.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>

          <div className="filter-bar__group">
            <label className="filter-bar__label">Stock</label>
            <select className="filter-bar__select" value={filters.stock} onChange={e => handleChange('stock', e.target.value)}>
              <option value="">All Stock</option>
              <option value="In Stock">In Stock</option>
              <option value="Limited Stock">Limited Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
