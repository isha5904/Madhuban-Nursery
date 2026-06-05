import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { plants, categories } from '../data/plants';
import PlantCard from '../components/PlantCard';
import FilterBar from '../components/FilterBar';
import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './Plants.css';

const defaultFilters = {
  search: '',
  category: '',
  careLevel: '',
  sunlight: '',
  priceRange: '',
  stock: '',
};

export default function Plants() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [filters, setFilters] = useState({ ...defaultFilters, category: initialCategory });

  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      if (filters.search && !plant.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !plant.scientificName.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.category && plant.category !== filters.category) return false;
      if (filters.careLevel && plant.careLevel !== filters.careLevel) return false;
      if (filters.sunlight && plant.sunlight !== filters.sunlight) return false;
      if (filters.stock && plant.stock !== filters.stock) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.includes('+')
          ? [parseInt(filters.priceRange), Infinity]
          : filters.priceRange.split('-').map(Number);
        if (plant.price < min || plant.price > max) return false;
      }
      return true;
    });
  }, [filters]);

  const activeCategory = categories.find(c => c.id === filters.category);

  return (
    <div className="plants-page page-enter">
      <div className="plants-hero">
        <div className="container">
          <span className="section__label">Our Collection</span>
          <h1 className="plants-hero__title">
            {activeCategory ? activeCategory.icon + ' ' + activeCategory.name : '🌿 All Plants'}
          </h1>
          <p className="plants-hero__subtitle">
            Browse our curated collection of healthy, nursery-fresh plants
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
          />

          <div className="plants-results">
            <p className="plants-results__count">
              Showing <strong>{filteredPlants.length}</strong> plant{filteredPlants.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredPlants.length > 0 ? (
            <div className="grid grid--auto">
              {filteredPlants.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          ) : (
            <div className="plants-empty">
              <span className="plants-empty__icon">🔍</span>
              <h3 className="plants-empty__title">No plants found</h3>
              <p className="plants-empty__text">
                Try adjusting your filters or search term to find what you're looking for.
              </p>
              <button className="btn btn--primary" onClick={() => setFilters(defaultFilters)}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <FloatingWhatsApp />
    </div>
  );
}