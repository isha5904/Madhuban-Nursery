import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { business, directionsUrl, getWhatsAppLink } from '../data/business';
import { categories } from '../data/plants';
import { usePlantCatalog } from '../data/plantStore';
import PlantCard from '../components/PlantCard';
import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './Home.css';

const bannerImages = [
  '/images/banners/banner-1.webp',
  '/images/banners/banner-2.webp',
  '/images/banners/banner-3.webp',
  '/images/banners/banner-4.webp',
  '/images/banners/banner-5.webp',
  '/images/banners/banner-6.webp',
];

const whyChooseUs = [
  { icon: 'stock', title: 'Healthy Nursery Stock', desc: 'Plants are selected for healthy roots, strong foliage and Jaipur weather suitability.' },
  { icon: 'guidance', title: 'Local Plant Guidance', desc: 'Get practical care advice for Mansarovar homes, balconies, gardens and offices.' },
  { icon: 'range', title: 'Wide Category Range', desc: 'Indoor, outdoor, flowering, medicinal, fruit, bonsai and gardening accessories in one place.' },
  { icon: 'chat', title: 'Easy Inquiry', desc: 'Ask price and availability instantly on WhatsApp before visiting the nursery.' },
];

const reviews = [
  { name: 'Google Rating', location: 'Mansarovar, Jaipur', text: `${business.name} is rated ${business.rating} stars with ${business.reviewCount} customer reviews.`, rating: 5 },
];

function StarRating({ count }) {
  return <div className="stars" aria-label={`${count} out of 5 stars`}>{[1, 2, 3, 4, 5].map(i => <span key={i} className={i <= count ? 'star star--filled' : 'star'}>*</span>)}</div>;
}

export default function Home() {
  const allPlants = usePlantCatalog();
  const featuredPlants = allPlants.filter(plant => plant.featured).slice(0, 6);
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBanner(index => (index + 1) % bannerImages.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="home page-enter">
      <section className="hero">
        <div className="hero__carousel" aria-hidden="true">
          {bannerImages.map((image, index) => (
            <div
              key={image}
              className={`hero__slide ${index === activeBanner ? 'hero__slide--active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <div className="hero__overlay" />
        <div className="container hero__content">
          <span className="hero__badge">{business.category} in Mansarovar, Jaipur</span>
          <h1 className="hero__title">Bring Nature Home with <span className="hero__highlight">Madhuban Nursery</span></h1>
          <p className="hero__subtitle">Healthy indoor, outdoor, flowering, medicinal and fruit plants in Mansarovar, Jaipur.</p>
          <div className="hero__actions">
            <Link to="/plants" className="btn btn--primary btn--lg">Browse Plants</Link>
            <a href={`tel:${business.phoneHref}`} className="btn btn--secondary btn--lg">Call Now</a>
            <a href={getWhatsAppLink('your plants')} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp btn--lg">WhatsApp Inquiry</a>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--lg">Get Directions</a>
          </div>
          <div className="hero__stats">
            <div className="hero__stat"><span className="hero__stat-num">{business.rating}</span><span className="hero__stat-label">Star Rating</span></div>
            <div className="hero__stat"><span className="hero__stat-num">{business.reviewCount}</span><span className="hero__stat-label">Reviews</span></div>
            <div className="hero__stat"><span className="hero__stat-num">{allPlants.length}</span><span className="hero__stat-label">Catalog Items</span></div>
          </div>
          <div className="hero__dots" aria-hidden="true">
            {bannerImages.map((image, index) => (
              <button
                key={image}
                className={`hero__dot ${index === activeBanner ? 'hero__dot--active' : ''}`}
                onClick={() => setActiveBanner(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Browse by Category</span>
            <h2 className="section__title">Plant Categories</h2>
            <p className="section__subtitle">Find plants for every corner of your home, garden and balcony.</p>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link to={`/category/${cat.id}`} key={cat.id} className="category-card">
                <span className="category-card__media">
                  <img src={cat.image} alt="" loading="lazy" />
                </span>
                <h3 className="category-card__name">{cat.name}</h3>
                <p className="category-card__desc">{cat.description}</p>
                <span className="category-card__link">Browse</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Popular Picks</span>
            <h2 className="section__title">Featured Plants</h2>
            <p className="section__subtitle">Best-selling plants and essentials available for inquiry.</p>
          </div>
          <div className="grid grid--3">
            {featuredPlants.slice(0, 6).map(plant => <PlantCard key={plant.id} plant={plant} />)}
          </div>
          <div className="section__cta"><Link to="/plants" className="btn btn--secondary btn--lg">View All Plants</Link></div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Why Madhuban Nursery</span>
            <h2 className="section__title">Premium Plants, Local Expertise</h2>
          </div>
          <div className="why-grid">
            {whyChooseUs.map(item => (
              <div key={item.title} className="why-card">
                <span className={`why-card__icon why-card__icon--${item.icon}`} aria-hidden="true"></span>
                <h3 className="why-card__title">{item.title}</h3>
                <p className="why-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Visit Us</span>
            <h2 className="section__title">{business.name}</h2>
            <p className="section__subtitle">{business.address}</p>
          </div>
          <div className="reviews-grid">
            {reviews.map((review, i) => (
              <div key={i} className="review-card">
                <StarRating count={review.rating} />
                <p className="review-card__text">"{review.text}"</p>
                <div className="review-card__author">
                  <div className="review-card__avatar">M</div>
                  <div><p className="review-card__name">{review.name}</p><p className="review-card__location">{review.location}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-section__content">
            <h2 className="cta-section__title">Need Plant Price or Availability?</h2>
            <p className="cta-section__text">Call {business.phoneDisplay}, message us on WhatsApp, or get directions to visit Madhuban Nursery.</p>
            <div className="cta-section__actions">
              <Link to="/plants" className="btn btn--primary btn--lg">Browse Plants</Link>
              <a href={getWhatsAppLink('your plants')} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp btn--lg">WhatsApp Inquiry</a>
              <Link to="/contact" className="btn btn--secondary btn--lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <FloatingWhatsApp />
    </div>
  );
}
