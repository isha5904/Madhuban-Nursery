import { useParams, Link } from 'react-router-dom';
import { formatPrice, getStockBadgeClass, getCareLevelBadgeClass, categories, plantFallbackImage } from '../data/plants';
import { usePlantCatalog } from '../data/plantStore';
import WhatsAppButton, { FloatingWhatsApp } from '../components/WhatsAppButton';
import AddToCartButton from '../components/AddToCartButton';
import './PlantDetail.css';

export default function PlantDetail() {
  const { id } = useParams();
  const plants = usePlantCatalog();
  const plant = plants.find(p => String(p.id) === String(id));

  if (!plant) {
    return (
      <div className="plant-detail__not-found">
        <span className="plant-detail__nf-icon">Plant</span>
        <h2>Plant Not Found</h2>
        <p>Sorry, we could not find this plant in the catalog.</p>
        <Link to="/plants" className="btn btn--primary">Browse Plants</Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === plant.category);
  const relatedPlants = plants.filter(p => p.category === plant.category && p.id !== plant.id).slice(0, 3);

  return (
    <div className="plant-detail page-enter">
      <div className="container">
        <nav className="plant-detail__breadcrumb">
          <Link to="/">Home</Link><span className="plant-detail__sep">/</span>
          <Link to="/plants">Plants</Link><span className="plant-detail__sep">/</span>
          {category && <Link to={`/category/${category.id}`}>{category.name}</Link>}
          <span className="plant-detail__sep">/</span><span className="plant-detail__current">{plant.name}</span>
        </nav>

        <div className="plant-detail__grid">
          <div className="plant-detail__images">
            <div className="plant-detail__main-image">
              <img
                src={plant.image}
                alt={plant.name}
                onError={(event) => {
                  event.currentTarget.src = plantFallbackImage;
                }}
              />
              <span className={`badge ${getStockBadgeClass(plant.stockStatus)} plant-detail__stock`}>{plant.stockStatus}</span>
              {plant.featured && <span className="plant-detail__featured">Featured</span>}
            </div>
            <div className="plant-detail__thumbs">
              {plant.images.map((img, index) => (
                <div key={`${img}-${index}`} className="plant-detail__thumb">
                  <img
                    src={img}
                    alt={`${plant.name} view ${index + 1}`}
                    onError={(event) => {
                      event.currentTarget.src = plantFallbackImage;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="plant-detail__info">
            <div className="plant-detail__category-row">
              <span className="badge badge--category">{category?.name}</span>
              <span className={`badge ${getCareLevelBadgeClass(plant.careLevel)}`}>{plant.careLevel} Care</span>
            </div>
            <h1 className="plant-detail__name">{plant.name}</h1>
            <p className="plant-detail__scientific">{plant.botanicalName}</p>
            <p className="plant-detail__price">{formatPrice(plant.price)}</p>
            <p className="plant-detail__short-desc">{plant.description}</p>

            <div className="plant-detail__specs">
              <div className="plant-detail__spec"><span className="plant-detail__spec-icon">Sun</span><div><span className="plant-detail__spec-label">Sunlight</span><span className="plant-detail__spec-value">{plant.sunlight}</span></div></div>
              <div className="plant-detail__spec"><span className="plant-detail__spec-icon">Water</span><div><span className="plant-detail__spec-label">Watering</span><span className="plant-detail__spec-value">{plant.watering}</span></div></div>
              <div className="plant-detail__spec"><span className="plant-detail__spec-icon">Size</span><div><span className="plant-detail__spec-label">Typical Size</span><span className="plant-detail__spec-value">{plant.size}</span></div></div>
              <div className="plant-detail__spec"><span className="plant-detail__spec-icon">Pot</span><div><span className="plant-detail__spec-label">Pot Included</span><span className="plant-detail__spec-value">{plant.potIncluded ? 'Yes' : 'No'}</span></div></div>
            </div>

            <div className="plant-detail__suitable">
              <span className="plant-detail__suitable-label">Best for:</span>
              {plant.suitableFor.map(s => <span key={s} className="plant-detail__suitable-tag">{s}</span>)}
            </div>

            <div className="plant-detail__actions">
              <WhatsAppButton plantName={plant.name} size="lg" className="plant-detail__wa" />
              <AddToCartButton plant={plant} className="btn btn--secondary btn--lg plant-detail__cart" />
              <Link to="/plants" className="btn btn--outline btn--lg">Back to Plants</Link>
            </div>
          </div>
        </div>

        <div className="plant-detail__details">
          <div className="plant-detail__detail-card">
            <h3 className="plant-detail__detail-title">About This Plant</h3>
            <p className="plant-detail__description">{plant.description}</p>
          </div>
          <div className="plant-detail__detail-card">
            <h3 className="plant-detail__detail-title">Care Tips</h3>
            <p className="plant-detail__care">{plant.careTips}</p>
          </div>
        </div>

        <div className="plant-detail__table-wrap">
          <h3 className="plant-detail__table-title">Plant Details</h3>
          <table className="plant-detail__table"><tbody>
            <tr><td className="plant-detail__table-label">Plant Name</td><td>{plant.name}</td></tr>
            <tr><td className="plant-detail__table-label">Botanical Name</td><td><em>{plant.botanicalName}</em></td></tr>
            <tr><td className="plant-detail__table-label">Category</td><td>{category?.name}</td></tr>
            <tr><td className="plant-detail__table-label">Price</td><td><strong>{formatPrice(plant.price)}</strong></td></tr>
            <tr><td className="plant-detail__table-label">Care Level</td><td>{plant.careLevel}</td></tr>
            <tr><td className="plant-detail__table-label">Sunlight</td><td>{plant.sunlight}</td></tr>
            <tr><td className="plant-detail__table-label">Watering</td><td>{plant.watering}</td></tr>
            <tr><td className="plant-detail__table-label">Stock</td><td><span className={`badge ${getStockBadgeClass(plant.stockStatus)}`}>{plant.stockStatus}</span></td></tr>
          </tbody></table>
        </div>

        {relatedPlants.length > 0 && (
          <div className="section__cta">
            <Link to={`/category/${plant.category}`} className="btn btn--secondary">More {category?.name}</Link>
          </div>
        )}
      </div>
      <FloatingWhatsApp />
    </div>
  );
}
