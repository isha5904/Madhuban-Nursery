import { Link } from 'react-router-dom';
import { categories, getFeaturedPlants, formatPrice } from '../data/plants';
import PlantCard from '../components/PlantCard';
import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './Home.css';

const featuredPlants = getFeaturedPlants();

const whyChooseUs = [
  { icon: '🌱', title: 'Healthy Plants', desc: 'Every plant is nurtured with care, inspected for health, and comes with a freshness guarantee.' },
  { icon: '🧑‍🌾', title: 'Expert Guidance', desc: 'Our horticulturists provide personalized care tips to help your plants thrive.' },
  { icon: '🚚', title: 'Local Delivery', desc: 'Fast and safe delivery to your doorstep. We handle plants with the care they deserve.' },
  { icon: '💎', title: 'Best Quality', desc: 'Hand-picked, premium-grade plants sourced from trusted growers and our own nursery.' },
  { icon: '💰', title: 'Fair Pricing', desc: 'Transparent pricing with no hidden costs. Great plants don\'t have to break the bank.' },
  { icon: '🤝', title: 'Bulk Orders', desc: 'Special pricing for landscape projects, offices, and event decorations.' },
];

const careTips = [
  { icon: '☀️', title: 'Light Matters', desc: 'Different plants need different light levels. Check our care guides for each plant\'s ideal spot.' },
  { icon: '💧', title: 'Water Wisely', desc: 'Overwatering kills more plants than underwatering. Always check the soil before watering.' },
  { icon: '🌡️', title: 'Temperature Check', desc: 'Keep tropical plants warm and away from cold drafts. Most indoor plants prefer 15–30°C.' },
  { icon: '✂️', title: 'Prune Regularly', desc: 'Remove dead leaves and spent blooms to redirect the plant\'s energy to healthy growth.' },
];

const reviews = [
  { name: 'Priya Sharma', location: 'Mumbai', text: 'I ordered an Areca Palm and Snake Plant — both arrived in perfect condition. The care card that came with each plant was so helpful! Will definitely order again.', rating: 5 },
  { name: 'Rajesh Kumar', location: 'Delhi', text: 'The team at GreenVerse really knows their plants. They helped me choose the right indoor plants for my low-light apartment. Two months later, all thriving!', rating: 5 },
  { name: 'Ananya Patel', location: 'Ahmedabad', text: 'Ordered a Fiddle Leaf Fig as a gift. It arrived beautifully packaged with a handwritten care note. My friend absolutely loved it. Such a thoughtful touch.', rating: 5 },
  { name: 'Vikram Reddy', location: 'Hyderabad', text: 'Great selection of medicinal plants. Got Tulsi, Aloe Vera, and Lemongrass. All healthy and well-rooted. The WhatsApp inquiry was super convenient too.', rating: 4 },
  { name: 'Meera Joshi', location: 'Pune', text: 'The bonsai collection is incredible. Ordered a Ficus Bonsai that looks even better than the photos. Packaging was excellent and delivery was quick.', rating: 5 },
];

function StarRating({ count }) {
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= count ? 'star star--filled' : 'star'}>★</span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="container hero__content">
          <span className="hero__badge">🌿 Welcome to GreenVerse Nursery</span>
          <h1 className="hero__title">
            Fresh Plants for Your<br />
            <span className="hero__highlight">Home, Garden & Office</span>
          </h1>
          <p className="hero__subtitle">
            Explore healthy indoor, outdoor, flowering, medicinal and fruit plants with expert care guidance.
          </p>
          <div className="hero__actions">
            <Link to="/plants" className="btn btn--primary btn--lg">Explore Plants</Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp btn--lg">
              💬 Contact on WhatsApp
            </a>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">50+</span>
              <span className="hero__stat-label">Plant Varieties</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">6</span>
              <span className="hero__stat-label">Categories</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">1000+</span>
              <span className="hero__stat-label">Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Browse by Category</span>
            <h2 className="section__title">Plant Categories</h2>
            <p className="section__subtitle">Find the perfect plant for every space and purpose</p>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link to={`/plants?category=${cat.id}`} key={cat.id} className="category-card">
                <span className="category-card__icon">{cat.icon}</span>
                <h3 className="category-card__name">{cat.name}</h3>
                <p className="category-card__desc">{cat.description}</p>
                <span className="category-card__link">Browse →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Hand-Picked for You</span>
            <h2 className="section__title">Featured Plants</h2>
            <p className="section__subtitle">Our most popular and recommended plants, curated by our experts</p>
          </div>
          <div className="grid grid--3">
            {featuredPlants.slice(0, 6).map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
          <div className="section__cta">
            <Link to="/plants" className="btn btn--secondary btn--lg">View All Plants →</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Why GreenVerse</span>
            <h2 className="section__title">Why Choose Us</h2>
            <p className="section__subtitle">We're more than a plant shop — we're your plant partners</p>
          </div>
          <div className="why-grid">
            {whyChooseUs.map(item => (
              <div key={item.title} className="why-card">
                <span className="why-card__icon">{item.icon}</span>
                <h3 className="why-card__title">{item.title}</h3>
                <p className="why-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plant Care Tips */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Green Thumb Tips</span>
            <h2 className="section__title">Plant Care Tips</h2>
            <p className="section__subtitle">Quick guides to keep your plants happy and healthy</p>
          </div>
          <div className="tips-grid">
            {careTips.map(tip => (
              <div key={tip.title} className="tip-card">
                <span className="tip-card__icon">{tip.icon}</span>
                <h3 className="tip-card__title">{tip.title}</h3>
                <p className="tip-card__desc">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Visit Our Nursery</span>
            <h2 className="section__title">Nursery Gallery</h2>
            <p className="section__subtitle">A glimpse of our green paradise</p>
          </div>
          <div className="gallery-preview">
            {[
              { seed: 'nursery-green', label: 'Our Greenhouse' },
              { seed: 'tropical-plants', label: 'Tropical Collection' },
              { seed: 'indoor-garden', label: 'Indoor Display' },
              { seed: 'bonsai-display', label: 'Bonsai Corner' },
              { seed: 'flower-beds', label: 'Flower Beds' },
              { seed: 'herb-garden', label: 'Herb Garden' },
            ].map((img, i) => (
              <Link to="/gallery" key={i} className="gallery-preview__item">
                <img
                  src={`https://images.unsplash.com/photo-1585320801235-${i + 10}?w=400&h=300&fit=crop`}
                  alt={img.label}
                  loading="lazy"
                />
                <div className="gallery-preview__overlay">
                  <span>{img.label}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="section__cta">
            <Link to="/gallery" className="btn btn--secondary">View Full Gallery →</Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">What Our Customers Say</span>
            <h2 className="section__title">Customer Reviews</h2>
            <p className="section__subtitle">Real feedback from plant lovers like you</p>
          </div>
          <div className="reviews-grid">
            {reviews.map((review, i) => (
              <div key={i} className="review-card">
                <StarRating count={review.rating} />
                <p className="review-card__text">"{review.text}"</p>
                <div className="review-card__author">
                  <div className="review-card__avatar">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="review-card__name">{review.name}</p>
                    <p className="review-card__location">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-section__content">
            <h2 className="cta-section__title">Ready to Bring Plants Home?</h2>
            <p className="cta-section__text">
              Browse our collection or reach out on WhatsApp for personalized recommendations. We're here to help you find the perfect plant!
            </p>
            <div className="cta-section__actions">
              <Link to="/plants" className="btn btn--primary btn--lg">Browse Plants</Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp btn--lg">
                💬 Chat on WhatsApp
              </a>
              <Link to="/contact" className="btn btn--secondary btn--lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <FloatingWhatsApp />
    </div>
  );
}