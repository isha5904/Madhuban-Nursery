import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categories } from '../data/plants';
import { usePlantCatalog } from '../data/plantStore';
import PlantCard from '../components/PlantCard';
import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './Plants.css';

const PAGE_SIZE = 8;

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [page, setPage] = useState(1);
  const allPlants = usePlantCatalog();
  const category = categories.find(c => c.id === categoryId);
  const categoryPlants = useMemo(() => allPlants.filter(plant => plant.category === categoryId), [allPlants, categoryId]);
  const totalPages = Math.max(1, Math.ceil(categoryPlants.length / PAGE_SIZE));
  const visiblePlants = categoryPlants.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (!category) {
    return (
      <div className="plants-page page-enter">
        <div className="plants-hero">
          <div className="container">
            <span className="section__label">Category</span>
            <h1 className="plants-hero__title">Category Not Found</h1>
            <p className="plants-hero__subtitle">Please choose another Madhuban Nursery category.</p>
          </div>
        </div>
        <section className="section">
          <div className="container plants-empty">
            <Link className="btn btn--primary" to="/plants">Browse All Plants</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="plants-page page-enter">
      <div className="plants-hero plants-hero--category">
        <div className="container plants-hero__category-layout">
          <div>
            <span className="section__label">Madhuban Nursery Category</span>
            <h1 className="plants-hero__title">{category.name}</h1>
            <p className="plants-hero__subtitle">{category.description}</p>
          </div>
          <img className="plants-hero__image" src={category.image} alt="" />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="plants-results">
            <p className="plants-results__count">
              Showing <strong>{visiblePlants.length}</strong> of <strong>{categoryPlants.length}</strong> items
            </p>
            <Link to="/plants" className="btn btn--outline btn--sm">All Plants</Link>
          </div>

          <div className="grid grid--auto">
            {visiblePlants.map(plant => <PlantCard key={plant.id} plant={plant} />)}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="btn btn--outline" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</button>
              <span className="pagination__status">Page {page} of {totalPages}</span>
              <button className="btn btn--outline" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>
            </div>
          )}
        </div>
      </section>

      <FloatingWhatsApp />
    </div>
  );
}
