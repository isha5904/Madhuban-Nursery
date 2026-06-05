import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './Gallery.css';

const galleryItems = [
  { title: 'Nursery Entrance', category: 'Nursery', desc: 'Madhuban Nursery visit area and plant display.', image: '/images/gallery/nursery-entrance.svg' },
  { title: 'Indoor Plant Display', category: 'Indoor', desc: 'Indoor plants arranged for easy browsing.', image: '/images/plants/indoor-plant.svg' },
  { title: 'Outdoor Garden Plants', category: 'Outdoor', desc: 'Hardy outdoor plants for Mansarovar homes.', image: '/images/plants/outdoor-plant.svg' },
  { title: 'Flowering Plants', category: 'Flowers', desc: 'Colorful seasonal and evergreen flowering plants.', image: '/images/plants/flowering-plant.svg' },
  { title: 'Medicinal Herbs', category: 'Medicinal', desc: 'Tulsi, mint, aloe vera, lemongrass and more.', image: '/images/plants/medicinal-plant.svg' },
  { title: 'Fruit Plant Area', category: 'Fruit', desc: 'Lemon, guava, mango, papaya and fruit saplings.', image: '/images/plants/fruit-plant.svg' },
  { title: 'Bonsai Corner', category: 'Decorative', desc: 'Decorative bonsai and premium tabletop plants.', image: '/images/plants/bonsai-decorative.svg' },
  { title: 'Pots & Accessories', category: 'Accessories', desc: 'Planters and gardening essentials for plant care.', image: '/images/plants/gardening-pots.svg' },
];

export default function Gallery() {
  return (
    <div className="gallery page-enter">
      <section className="gallery-hero">
        <div className="container">
          <span className="section__label">Nursery Gallery</span>
          <h1 className="gallery-hero__title">Madhuban Nursery Gallery</h1>
          <p className="gallery-hero__subtitle">A cleaner visual showcase for nursery spaces, plant sections and gardening essentials.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {galleryItems.map((item, i) => (
              <div key={i} className="gallery-item">
                <div className="gallery-item__image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = '/images/plant-placeholder.jpg';
                    }}
                  />
                  <div className="gallery-item__overlay">
                    <span className="gallery-item__category">{item.category}</span>
                    <h3 className="gallery-item__title">{item.title}</h3>
                    <p className="gallery-item__desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FloatingWhatsApp />
    </div>
  );
}
