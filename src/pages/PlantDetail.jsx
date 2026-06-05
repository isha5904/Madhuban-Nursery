import { useParams, Link } from 'react-router-dom';
import { getPlantById, plants, formatPrice, getStockBadgeClass, getCareLevelBadgeClass, categories } from '../data/plants';
import WhatsAppButton, { FloatingWhatsApp } from '../components/WhatsAppButton';
import './PlantDetail.css';

export default function PlantDetail() {
  const { id } = useParams();
  const plant = getPlantById(id);

  if (!plant) {
    return (
      <div className="plant-detail__not-found">
        <span className="plant-detail__nf-icon">🌱</span>
        <h2>Plant Not Found</h2>
        <p>Sorry, we couldn't find this plant in our collection.</p>
        <Link to="/plants" className="btn btn--primary">Browse Plants</Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === plant.category);
  const relatedPlants = category
    ? plants
        .filter(p => p.category === plant.category && p.id !== plant.id)
        .slice(0, 3)
    : [];

  return (
    <div className="plant-detail page-enter">
      <div className="container">
        <nav className="plant-detail__breadcrumb">
          <Link to="/">Home</Link>
          <span className="plant-detail__sep">›</span>
          <Link to="/plants">Plants</Link>
          <span className="plant-detail__sep">›</span>
          {category && <Link to={`/plants?category=${category.id}`}>{category.name}</Link>}
          <span className="plant-detail__sep">›</span>
          <span className="plant-detail__current">{plant.name}</span>
        </nav>

        <div className="plant-detail__grid">
          {/* Images */}
          <div className="plant-detail__images">
            <div className="plant-detail__main-image">
              <img src={plant.images[0]} alt={plant.name} />
              <span className={`badge ${getStockBadgeClass(plant.stock)} plant-detail__stock`}>
                {plant.stock}
              </span>
              {plant.featured && <span className="plant-detail__featured">⭐ Featured</span>}
            </div>
            {plant.images.length > 1 && (
              <div className="plant-detail__thumbs">
                {plant.images.map((img, i) => (
                  <div key={i} className="plant-detail__thumb">
                    <img src={img} alt={`${plant.name} ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="plant-detail__info">
            <div className="plant-detail__category-row">
              <span className="badge badge--category">
                {category?.icon} {category?.name}
              </span>
              <span className={`badge ${getCareLevelBadgeClass(plant.careLevel)}`}>
                {plant.careLevel} Care
              </span>
            </div>

            <h1 className="plant-detail__name">{plant.name}</h1>
            <p className="plant-detail__scientific">{plant.scientificName}</p>
            <p className="plant-detail__price">{formatPrice(plant.price)}</p>
            <p className="plant-detail__short-desc">{plant.shortDescription}</p>

            {/* Quick specs */}
            <div className="plant-detail__specs">
              <div className="plant-detail__spec">
                <span className="plant-detail__spec-icon">☀️</span>
                <div>
                  <span className="plant-detail__spec-label">Sunlight</span>
                  <span className="plant-detail__spec-value">{plant.sunlight}</span>
                </div>
              </div>
              <div className="plant-detail__spec">
                <span className="plant-detail__spec-icon">💧</span>
                <div>
                  <span className="plant-detail__spec-label">Water</span>
                  <span className="plant-detail__spec-value">{plant.water}</span>
                </div>
              </div>
              <div className="plant-detail__spec">
                <span className="plant-detail__spec-icon">📐</span>
                <div>
                  <span className="plant-detail__spec-label">Size</span>
                  <span className="plant-detail__spec-value">{plant.size}</span>
                </div>
              </div>
              <div className="plant-detail__spec">
                <span className="plant-detail__spec-icon">🪴</span>
                <div>
                  <span className="plant-detail__spec-label">Pot Included</span>
                  <span className="plant-detail__spec-value">{plant.potIncluded ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            {/* Suitable for */}
            <div className="plant-detail__suitable">
              <span className="plant-detail__suitable-label">Best for:</span>
              {plant.suitableFor.map(s => (
                <span key={s} className="plant-detail__suitable-tag">{s}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="plant-detail__actions">
              <WhatsAppButton plantName={plant.name} size="lg" className="plant-detail__wa" />
              <Link to="/plants" className="btn btn--outline btn--lg">← Back to Plants</Link>
            </div>
          </div>
        </div>

        {/* Description & Care */}
        <div className="plant-detail__details">
          <div className="plant-detail__detail-card">
            <h3 className="plant-detail__detail-title">About This Plant</h3>
            <p className="plant-detail__description">{plant.description}</p>
          </div>
          <div className="plant-detail__detail-card">
            <h3 className="plant-detail__detail-title">🪴 Care Tips</h3>
            <p className="plant-detail__care">{plant.careTips}</p>
          </div>
        </div>

        {/* Quick reference table */}
        <div className="plant-detail__table-wrap">
          <h3 className="plant-detail__table-title">Plant Details</h3>
          <table className="plant-detail__table">
            <tbody>
              <tr><td className="plant-detail__table-label">Plant Name</td><td>{plant.name}</td></tr>
              <tr><td className="plant-detail__table-label">Scientific Name</td><td><em>{plant.scientificName}</em></td></tr>
              <tr><td className="plant-detail__table-label">Category</td><td>{category?.name}</td></tr>
              <tr><td className="plant-detail__table-label">Price</td><td><strong>{formatPrice(plant.price)}</strong></td></tr>
              <tr><td className="plant-detail__table-label">Care Level</td><td>{plant.careLevel}</td></tr>
              <tr><td className="plant-detail__table-label">Sunlight</td><td>{plant.sunlight}</td></tr>
              <tr><td className="plant-detail__table-label">Water</td><td>{plant.water}</td></tr>
              <tr><td className="plant-detail__table-label">Size</td><td>{plant.size}</td></tr>
              <tr><td className="plant-detail__table-label">Pot Included</td><td>{plant.potIncluded ? 'Yes' : 'No'}</td></tr>
              <tr><td className="plant-detail__table-label">Best For</td><td>{plant.suitableFor.join(', ')}</td></tr>
              <tr><td className="plant-detail__table-label">Stock</td><td><span className={`badge ${getStockBadgeClass(plant.stock)}`}>{plant.stock}</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <FloatingWhatsApp />
    </div>
  );
}

