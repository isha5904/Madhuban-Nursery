import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { business } from '../data/business';
import { ComingSoonBadge } from './LockedFeature';
import './Header.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/plants', label: 'Plants' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label={`${business.name} home`}>
          <span className="header__logo-icon" aria-hidden="true">M</span>
          <span className="header__logo-text">{business.name}</span>
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`header__link ${location.pathname === link.path ? 'header__link--active' : ''}`}
            >
              <span>{link.label}</span>
              {link.phase2 && <ComingSoonBadge />}
            </Link>
          ))}
          <Link to="/plants" className="btn btn--primary btn--sm header__cta">
            Browse Plants
          </Link>
        </nav>

        <button
          className={`header__hamburger ${menuOpen ? 'header__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
