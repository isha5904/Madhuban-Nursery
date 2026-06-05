import { Link } from 'react-router-dom';
import { business } from '../data/business';
import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './About.css';

const values = [
  { icon: 'expert', title: 'Plant Nursery Expertise', desc: 'A focused local nursery for healthy plants suited to Jaipur homes, balconies and gardens.' },
  { icon: 'quality', title: 'Healthy Plant Selection', desc: 'Every catalog item is presented with care level, sunlight, watering and stock status.' },
  { icon: 'inquiry', title: 'Direct Inquiry First', desc: 'Phase 1 keeps ordering simple with call and WhatsApp inquiry instead of cart or payment flow.' },
  { icon: 'future', title: 'Future Ready', desc: 'The code is structured for Phase 2 features like cart, online order, login, payment gateway and admin panel.' },
];

export default function About() {
  return (
    <div className="about page-enter">
      <section className="about-hero">
        <div className="container">
          <span className="section__label">{business.category}</span>
          <h1 className="about-hero__title">About {business.name}</h1>
          <p className="about-hero__subtitle">A trusted plant nursery in Mansarovar, Jaipur for indoor, outdoor, flowering, medicinal, fruit, bonsai and decorative plants.</p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow about-mission">
          <div className="about-mission__icon">M</div>
          <h2 className="about-mission__title">Our Mission</h2>
          <p className="about-mission__text">To help Jaipur plant lovers bring home healthy plants with clear care guidance, transparent catalog browsing and quick inquiry support.</p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section__label">What Makes Us Different</span>
            <h2 className="section__title">Why Choose {business.name}</h2>
          </div>
          <div className="about-values">
            {values.map(v => (
              <div key={v.title} className="about-value">
                <span className={`about-value__icon about-value__icon--${v.icon}`} aria-hidden="true"></span>
                <h3 className="about-value__title">{v.title}</h3>
                <p className="about-value__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="about-cta__content">
            <h2 className="about-cta__title">Come Visit Our Nursery</h2>
            <p className="about-cta__text">{business.address}</p>
            <div className="about-cta__actions">
              <Link to="/plants" className="btn btn--primary btn--lg">Browse Plants</Link>
              <Link to="/contact" className="btn btn--secondary btn--lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
      <FloatingWhatsApp />
    </div>
  );
}
