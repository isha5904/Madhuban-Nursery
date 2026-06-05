import { Link } from 'react-router-dom';
import { formatPrice, getStockBadgeClass, getCareLevelBadgeClass } from '../data/plants';
import WhatsAppButton from './WhatsAppButton';
import './PlantCard.css';

export default function PlantCard({ plant }) {
  return (
    <article className="plant-card card">
      <Link to={`/plants/${plant.id}`} className="plant-card__link">
        <div className="plant-card__image-wrap">
          <img
            src={plant.images[0]}
            alt={plant.name}
            className="plant-card__image"
            loading="lazy"
          />
          <span className={`badge ${getStockBadgeClass(plant.stock)} plant-card__stock`}>
            {plant.stock}
          </span>
          {plant.featured && (
            <span className="plant-card__featured">⭐ Featured</span>
          )}
        </div>
        <div className="plant-card__body">
          <span className="badge badge--category plant-card__category">
            {plant.category.replace('-', ' & ')}
          </span>
          <h3 className="plant-card__name">{plant.name}</h3>
          <p className="plant-card__scientific">{plant.scientificName}</p>
          <p className="plant-card__desc">{plant.shortDescription}</p>

          <div className="plant-card__meta">
            <div className="plant-card__meta-item">
              <span className="plant-card__meta-icon">☀️</span>
              <span>{plant.sunlight}</span>
            </div>
            <div className="plant-card__meta-item">
              <span className="plant-card__meta-icon">💧</span>
              <span>{plant.water}</span>
            </div>
            <div className="plant-card__meta-item">
              <span className={`badge ${getCareLevelBadgeClass(plant.careLevel)} plant-card__care`}>
                {plant.careLevel}
              </span>
            </div>
          </div>

          <div className="plant-card__footer">
            <span className="plant-card__price">{formatPrice(plant.price)}</span>
          </div>
        </div>
      </Link>
      <div className="plant-card__actions">
        <Link to={`/plants/${plant.id}`} className="btn btn--outline btn--sm plant-card__view">
          View Details
        </Link>
        <WhatsAppButton plantName={plant.name} size="sm" />
      </div>
    </article>
  );
}