import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">🌿</span>
              <span className="footer__logo-text">Green<span>Verse</span></span>
            </Link>
            <p className="footer__desc">
              Your trusted neighborhood nursery, bringing healthy plants and expert guidance to your home, garden, and office since 2020.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook">📘</a>
              <a href="#" className="footer__social-link" aria-label="Instagram">📷</a>
              <a href="#" className="footer__social-link" aria-label="YouTube">🎬</a>
              <a href="https://wa.me/919876543210" className="footer__social-link" aria-label="WhatsApp">💬</a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/plants">All Plants</Link></li>
              <li><Link to="/plants?category=indoor">Indoor Plants</Link></li>
              <li><Link to="/plants?category=outdoor">Outdoor Plants</Link></li>
              <li><Link to="/plants?category=flowering">Flowering Plants</Link></li>
              <li><Link to="/plants?category=medicinal">Medicinal Plants</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">More</h4>
            <ul className="footer__links">
              <li><Link to="/plants?category=fruit">Fruit Plants</Link></li>
              <li><Link to="/plants?category=bonsai-decorative">Bonsai & Decorative</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Contact Us</h4>
            <ul className="footer__contact">
              <li>
                <span className="footer__contact-icon">📍</span>
                <span>123 Green Lane, Garden City, IN 380001</span>
              </li>
              <li>
                <span className="footer__contact-icon">📞</span>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li>
                <span className="footer__contact-icon">✉️</span>
                <a href="mailto:hello@greenverse.in">hello@greenverse.in</a>
              </li>
              <li>
                <span className="footer__contact-icon">🕐</span>
                <span>Mon–Sat: 8 AM – 7 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} GreenVerse Nursery. All rights reserved.</p>
          <p className="footer__tagline">Made with 🌱 for plant lovers</p>
        </div>
      </div>
    </footer>
  );
}