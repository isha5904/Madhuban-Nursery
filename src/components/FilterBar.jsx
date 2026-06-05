import { useState } from 'react';
import { categories, careLevels, priceRange } from './FilterBar.data';
import './FilterBar.css';

export default function FilterBar({ filters, onFilterChange, onReset }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const activeCount = Object.values(filters).filter(v => v !== '' && v !== null).length;

  return (
    <div className="filter-bar">
      <button className="filter-bar__toggle btn btn--outline" onClick={() => setMobileOpen(v => !v)}>
        <span>🔍</span> Filters {activeCount > 0 && <span className="filter-bar__count">{activeCount}</span>}
      </button>

      <div className={`filter-bar__panel ${mobileOpen ? 'filter-bar__panel--open' : ''}`}>
        <div className="filter-bar__header">
          <h3 className="filter-bar__title">Filter Plants</h3>
          <div className="filter-bar__header-actions">
            {activeCount > 0 && (
              <button className="filter-bar__reset" onClick={onReset}>Clear all</button>
            )}
            <button className="filter-bar__close" onClick={() => setMobileOpen(false)} aria-label="Close filters">✕</button>
          </div>
        </div>

        <div className="filter-bar__grid">
          <div className="filter-bar__group">
            <label className="filter-bar__label">Search</label>
            <input
              type="text"
              className="filter-bar__input"
              placeholder="Search by plant name..."
              value={filters.search}
              onChange={e => handleChange('search', e.target.value)}
            />
          </div>

          <div className="filter-bar__group">
            <label className="filter-bar__label">Category</label>
            <select
              className="filter-bar__select"
              value={filters.category}
              onChange={e => handleChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-bar__group">
            <label className="filter-bar__label">Care Level</label>
            <select
              className="filter-bar__select"
              value={filters.careLevel}
              onChange={e => handleChange('careLevel', e.target.value)}
            >
              <option value="">All Levels</option>
              {careLevels.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="filter-bar__group">
            <label className="filter-bar__label">Sunlight</label>
            <select
              className="filter-bar__select"
              value={filters.sunlight}
              onChange={e => handleChange('sunlight', e.target.value)}
            >
              <option value="">All</option>
              <option value="Low">Low Light</option>
              <option value="Partial">Partial Light</option>
              <option value="Bright Indirect">Bright Indirect</option>
              <option value="Full Sun">Full Sun</option>
            </select>
          </div>

          <div className="filter-bar__group">
            <label className="filter-bar__label">Price Range</label>
            <select
              className="filter-bar__select"
              value={filters.priceRange}
              onChange={e => handleChange('priceRange', e.target.value)}
            >
              <option value="">All Prices</option>
              {priceRange.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-bar__group">
            <label className="filter-bar__label">Stock</label>
            <select
              className="filter-bar__select"
              value={filters.stock}
              onChange={e => handleChange('stock', e.target.value)}
            >
              <option value="">All Stock</option>
              <option value="In Stock">In Stock</option>
              <option value="Limited Stock">Limited Stock</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}