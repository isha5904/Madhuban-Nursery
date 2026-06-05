import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './Gallery.css';

const galleryItems = [
  { title: 'Our Greenhouse', category: 'Nursery', desc: 'A walk through our lush greenhouse where plants thrive under optimal conditions.', seed: 'greenhouse-nursery' },
  { title: 'Tropical Collection', category: 'Plants', desc: 'A curated display of tropical beauties from our collection.', seed: 'tropical-collection' },
  { title: 'Indoor Display Area', category: 'Display', desc: 'Our indoor showroom where you can see plants in styled settings.', seed: 'indoor-display' },
  { title: 'Bonsai Corner', category: 'Bonsai', desc: 'Hand-trained bonsai specimens displayed in our dedicated bonsai section.', seed: 'bonsai-corner' },
  { title: 'Flowering Section', category: 'Flowers', desc: 'Seasonal blooms creating a riot of color in our flowering plants area.', seed: 'flowering-section' },
  { title: 'Herb Garden', category: 'Medicinal', desc: 'Our herb and medicinal plant garden with Tulsi, Mint, and more.', seed: 'herb-garden-plants' },
  { title: 'Succulent Collection', category: 'Succulents', desc: 'A diverse collection of succulents in beautiful arrangements.', seed: 'succulent-garden' },
  { title: 'Pot Selection', category: 'Pots', desc: 'Choose from our wide range of pots, planters, and decorative containers.', seed: 'plant-pots' },
  { title: 'Fruit Plant Area', category: 'Fruit', desc: 'Dwarf mango, lemon, guava and other fruit plants ready for your garden.', seed: 'fruit-plants-nursery' },
  { title: 'Plant Care Workshop', category: 'Events', desc: 'Our weekend workshops where we teach plant care techniques.', seed: 'plant-workshop' },
  { title: 'Packaging Station', category: 'Delivery', desc: 'Where we carefully package each plant for safe delivery to your doorstep.', seed: 'plant-packaging' },
  { title: 'Outdoor Garden Display', category: 'Display', desc: 'Our outdoor garden showcasing how plants look in a real garden setting.', seed: 'outdoor-garden' },
];

export default function Gallery() {
  return (
    <div className="gallery page-enter">
      <section className="gallery-hero">
        <div className="container">
          <span className="section__label">🌿 Take a Look Around</span>
          <h1 className="gallery-hero__title">Nursery Gallery</h1>
          <p className="gallery-hero__subtitle">
            Step into our green world — from our lush greenhouse to curated display areas, see where your plants grow before they reach you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {galleryItems.map((item, i) => (
              <div key={i} className="gallery-item">
                <div className="gallery-item__image-wrap">
                  <img
                    src={`https://images.unsplash.com/photo-${1585320801235 + i * 317}?w=600&h=400&fit=crop`}
                    alt={item.title}
                    loading="lazy"
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