import { Link } from 'react-router-dom';
import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './About.css';

const values = [
  {
    icon: '🌱',
    title: 'Healthy Plants Guarantee',
    desc: 'Every plant at GreenVerse is hand-inspected for health and vitality. We nurture each one with organic methods, so you receive a plant that\'s ready to thrive in your space.',
  },
  {
    icon: '🧑‍🌾',
    title: 'Expert Plant Guidance',
    desc: 'Our team includes certified horticulturists and experienced plant parents who provide personalized care tips, helping even complete beginners grow confident with their plants.',
  },
  {
    icon: '🚚',
    title: 'Safe Local Delivery',
    desc: 'We deliver across the city with special care — each plant is packaged to minimize stress during transit. No more worrying about damaged plants arriving at your door.',
  },
  {
    icon: '🤝',
    title: 'Bulk & Corporate Orders',
    desc: 'Need plants for an office, event, or landscaping project? We offer special bulk pricing, customized selections, and dedicated coordination for large orders.',
  },
];

const timeline = [
  { year: '2020', title: 'Started from a small garden', desc: 'What began as a backyard hobby grew into a passion to share plants with the community.' },
  { year: '2021', title: 'Opened our nursery', desc: 'Launched our physical nursery with over 100 varieties and a loyal local customer base.' },
  { year: '2022', title: 'Expanded to 200+ varieties', desc: 'Grew our collection significantly, adding rare and exotic plants alongside local favorites.' },
  { year: '2023', title: 'Launched online catalog', desc: 'Made it easier for plant lovers to browse and inquire about plants before visiting.' },
  { year: '2024', title: 'Serving 1000+ customers', desc: 'Proud to have helped over a thousand customers bring green into their spaces.' },
];

export default function About() {
  return (
    <div className="about page-enter">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <span className="section__label">Our Story</span>
          <h1 className="about-hero__title">Rooted in Love for Plants</h1>
          <p className="about-hero__subtitle">
            GreenVerse Nursery was born from a simple belief — that every home, office, and garden deserves the touch of nature. We're here to make that happen.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container container--narrow about-mission">
          <div className="about-mission__icon">🌿</div>
          <h2 className="about-mission__title">Our Mission</h2>
          <p className="about-mission__text">
            To make healthy, beautiful plants accessible to everyone — from seasoned gardeners to complete beginners. We believe plants transform spaces, improve wellbeing, and connect us with nature. Our mission is to be the bridge between you and the green life you deserve.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <span className="section__label">What Makes Us Different</span>
            <h2 className="section__title">Why Choose GreenVerse</h2>
          </div>
          <div className="about-values">
            {values.map(v => (
              <div key={v.title} className="about-value">
                <span className="about-value__icon">{v.icon}</span>
                <h3 className="about-value__title">{v.title}</h3>
                <p className="about-value__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Our Journey</span>
            <h2 className="section__title">Growing Together</h2>
          </div>
          <div className="about-timeline">
            {timeline.map((item, i) => (
              <div key={item.year} className="about-timeline__item">
                <div className="about-timeline__dot" />
                <div className="about-timeline__content">
                  <span className="about-timeline__year">{item.year}</span>
                  <h3 className="about-timeline__title">{item.title}</h3>
                  <p className="about-timeline__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta__content">
            <h2 className="about-cta__title">Come Visit Our Nursery</h2>
            <p className="about-cta__text">
              We'd love to show you around! Visit us to see our plants in person, or reach out on WhatsApp for personalized recommendations.
            </p>
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