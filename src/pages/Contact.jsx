import { useState } from 'react';
import { business, directionsUrl, getWhatsAppLink } from '../data/business';
import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Phase 2: send this inquiry to backend/API or admin panel.
    setSubmitted(true);
  };

  return (
    <div className="contact page-enter">
      <section className="contact-hero">
        <div className="container">
          <span className="section__label">Get in Touch</span>
          <h1 className="contact-hero__title">Contact {business.name}</h1>
          <p className="contact-hero__subtitle">Call, WhatsApp, or get directions to our plant nursery in Mansarovar, Jaipur.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="contact-info__title">Visit Our Nursery</h2>
              <p className="contact-info__text">{business.status}. Browse the catalog online and inquire before visiting.</p>

              <div className="contact-info__cards">
                <div className="contact-info__card"><span className="contact-info__card-icon contact-info__card-icon--map" aria-hidden="true"></span><div><h4>Address</h4><p>{business.address}</p></div></div>
                <div className="contact-info__card"><span className="contact-info__card-icon contact-info__card-icon--call" aria-hidden="true"></span><div><h4>Phone</h4><p><a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a></p></div></div>
                <div className="contact-info__card"><span className="contact-info__card-icon contact-info__card-icon--open" aria-hidden="true"></span><div><h4>Business Hours</h4><p>{business.hours}<br />{business.status}</p></div></div>
                <div className="contact-info__card"><span className="contact-info__card-icon contact-info__card-icon--star" aria-hidden="true"></span><div><h4>Rating</h4><p>{business.rating} stars with {business.reviewCount} reviews</p></div></div>
              </div>

              <div className="contact-info__actions">
                <a href={`tel:${business.phoneHref}`} className="btn btn--primary"><span className="btn-icon btn-icon--call" aria-hidden="true"></span>Call Now</a>
                <a href={getWhatsAppLink('your plants')} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp"><span className="btn-icon btn-icon--wa" aria-hidden="true"></span>WhatsApp Inquiry</a>
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--secondary"><span className="btn-icon btn-icon--route" aria-hidden="true"></span>Get Directions</a>
              </div>

              <div className="contact-map">
                <div className="contact-map__placeholder">
                  <span className="contact-map__logo" aria-hidden="true">M</span>
                  <p>Madhuban Nursery Location</p>
                  <p className="contact-map__hint">{business.address}</p>
                </div>
              </div>
            </div>

            <div className="contact-form-wrap">
              <h2 className="contact-form__title">Send Us a Message</h2>
              <p className="contact-form__subtitle">This Phase 1 form is ready for backend connection in Phase 2.</p>

              {submitted ? (
                <div className="contact-form__success">
                  <span className="contact-form__success-icon" aria-hidden="true"></span>
                  <h3>Thank You</h3>
                  <p>We received your message. For faster response, contact Madhuban Nursery on WhatsApp.</p>
                  <button className="btn btn--primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label htmlFor="name" className="contact-form__label">Full Name *</label>
                      <input type="text" id="name" name="name" value={form.name} onChange={handleChange} className="contact-form__input" placeholder="Your name" required />
                    </div>
                    <div className="contact-form__group">
                      <label htmlFor="email" className="contact-form__label">Email *</label>
                      <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className="contact-form__input" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label htmlFor="phone" className="contact-form__label">Phone</label>
                      <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} className="contact-form__input" placeholder={business.phoneDisplay} />
                    </div>
                    <div className="contact-form__group">
                      <label htmlFor="subject" className="contact-form__label">Subject *</label>
                      <select id="subject" name="subject" value={form.subject} onChange={handleChange} className="contact-form__input" required>
                        <option value="">Select a subject</option>
                        <option value="plant-inquiry">Plant Inquiry</option>
                        <option value="bulk-order">Bulk Order</option>
                        <option value="directions">Directions</option>
                        <option value="plant-care">Plant Care Help</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="contact-form__group">
                    <label htmlFor="message" className="contact-form__label">Message *</label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange} className="contact-form__input contact-form__textarea" placeholder="Tell us about the plants you need..." rows="5" required />
                  </div>
                  <button type="submit" className="btn btn--primary btn--lg contact-form__submit">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <FloatingWhatsApp />
    </div>
  );
}
