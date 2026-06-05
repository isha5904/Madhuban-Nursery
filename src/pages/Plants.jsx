import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories } from '../data/plants';
import { usePlantCatalog } from '../data/plantStore';
import PlantCard from '../components/PlantCard';
import FilterBar from '../components/FilterBar';
import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './Plants.css';

const PAGE_SIZE = 8;

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
  const [filters, setFilters] = useState({ ...defaultFilters, category: searchParams.get('category') || '' });
  const [page, setPage] = useState(1);
  const plants = usePlantCatalog();

  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      const term = filters.search.toLowerCase();
      if (term && !plant.name.toLowerCase().includes(term) && !plant.botanicalName.toLowerCase().includes(term)) return false;
      if (filters.category && plant.category !== filters.category) return false;
      if (filters.careLevel && plant.careLevel !== filters.careLevel) return false;
      if (filters.sunlight && plant.sunlight !== filters.sunlight) return false;
      if (filters.stock && plant.stockStatus !== filters.stock) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.includes('+')
          ? [parseInt(filters.priceRange, 10), Infinity]
          : filters.priceRange.split('-').map(Number);
        if (plant.price < min || plant.price > max) return false;
      }
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredPlants.length / PAGE_SIZE));
  const visiblePlants = filteredPlants.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeCategory = categories.find(c => c.id === filters.category);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <div className="plants-page page-enter">
      <div className="plants-hero">
        <div className="container">
          <span className="section__label">Madhuban Nursery Catalog</span>
          <h1 className="plants-hero__title">{activeCategory ? activeCategory.name : 'All Plants'}</h1>
          <p className="plants-hero__subtitle">Browse 7 to 8 items per page and inquire directly on WhatsApp.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <FilterBar filters={filters} onFilterChange={setFilters} onReset={() => setFilters(defaultFilters)} />
          <div className="plants-results">
            <p className="plants-results__count">
              Showing <strong>{visiblePlants.length}</strong> of <strong>{filteredPlants.length}</strong> item{filteredPlants.length !== 1 ? 's' : ''}
            </p>
            <span className="pagination__status">Page {page} of {totalPages}</span>
          </div>
          {filteredPlants.length > 0 ? (
            <>
              <div className="grid grid--auto">
                {visiblePlants.map(plant => <PlantCard key={plant.id} plant={plant} />)}
              </div>
              <div className="pagination">
                <button className="btn btn--outline" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</button>
                <span className="pagination__status">Page {page} of {totalPages}</span>
                <button className="btn btn--outline" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>
              </div>
            </>
          ) : (
            <div className="plants-empty">
              <span className="plants-empty__icon" aria-hidden="true"></span>
              <h3 className="plants-empty__title">No plants found</h3>
              <p className="plants-empty__text">Try adjusting your filters or search term.</p>
              <button className="btn btn--primary" onClick={() => setFilters(defaultFilters)}>Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      <FloatingWhatsApp />
    </div>
  );
}
