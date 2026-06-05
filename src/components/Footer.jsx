import { Link } from 'react-router-dom';
import { business, directionsUrl, getWhatsAppLink } from '../data/business';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">M</span>
              <span className="footer__logo-text">{business.name}</span>
            </Link>
            <p className="footer__desc">
              Premium plant nursery in Mansarovar, Jaipur with healthy indoor, outdoor, flowering, medicinal and fruit plants.
            </p>
            <div className="footer__social">
              <a href={getWhatsAppLink('your plants')} className="footer__social-link footer__social-link--wa" aria-label="WhatsApp"></a>
              <a href={directionsUrl} className="footer__social-link footer__social-link--map" aria-label="Directions"></a>
              <a href={`tel:${business.phoneHref}`} className="footer__social-link footer__social-link--call" aria-label="Call"></a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/plants">All Plants</Link></li>
              <li><Link to="/category/indoor">Indoor Plants</Link></li>
              <li><Link to="/category/outdoor">Outdoor Plants</Link></li>
              <li><Link to="/category/flowering">Flowering Plants</Link></li>
              <li><Link to="/category/medicinal">Medicinal Plants</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">More</h4>
            <ul className="footer__links">
              <li><Link to="/category/fruit">Fruit Plants</Link></li>
              <li><Link to="/category/bonsai-decorative">Bonsai & Decorative</Link></li>
              <li><Link to="/category/pots-accessories">Pots & Accessories</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/cart">Cart / Checkout</Link></li>
              <li><Link to="/admin">Admin Panel</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Contact Us</h4>
            <ul className="footer__contact">
              <li><span className="footer__contact-icon footer__contact-icon--map" aria-hidden="true"></span><span>{business.address}</span></li>
              <li><span className="footer__contact-icon footer__contact-icon--call" aria-hidden="true"></span><a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a></li>
              <li><span className="footer__contact-icon footer__contact-icon--star" aria-hidden="true"></span><span>{business.rating} stars from {business.reviewCount} reviews</span></li>
              <li><span className="footer__contact-icon footer__contact-icon--open" aria-hidden="true"></span><span>{business.status}</span></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p className="footer__tagline">Phase 1 catalog and inquiry website</p>
        </div>
      </div>
    </footer>
  );
}
