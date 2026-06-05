import { useState } from 'react';
import { FloatingWhatsApp } from '../components/WhatsAppButton';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Phase 2: Send to backend API
    setSubmitted(true);
  };

  return (
    <div className="contact page-enter">
      <section className="contact-hero">
        <div className="container">
          <span className="section__label">Get in Touch</span>
          <h1 className="contact-hero__title">Contact Us</h1>
          <p className="contact-hero__subtitle">
            Have questions about a plant? Need bulk order pricing? We'd love to hear from you!
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h2 className="contact-info__title">Visit Our Nursery</h2>
              <p className="contact-info__text">
                Come see our plants in person! Our team is always ready to help you pick the perfect plant.
              </p>

              <div className="contact-info__cards">
                <div className="contact-info__card">
                  <span className="contact-info__card-icon">📍</span>
                  <div>
                    <h4>Address</h4>
                    <p>123 Green Lane, Garden City,<br/>Nursery District, IN 380001</p>
                  </div>
                </div>

                <div className="contact-info__card">
                  <span className="contact-info__card-icon">📞</span>
                  <div>
                    <h4>Phone</h4>
                    <p><a href="tel:+919876543210">+91 98765 43210</a></p>
                  </div>
                </div>

                <div className="contact-info__card">
                  <span className="contact-info__card-icon">✉️</span>
                  <div>
                    <h4>Email</h4>
                    <p><a href="mailto:hello@greenverse.in">hello@greenverse.in</a></p>
                  </div>
                </div>

                <div className="contact-info__card">
                  <span className="contact-info__card-icon">🕐</span>
                  <div>
                    <h4>Business Hours</h4>
                    <p>Mon – Sat: 8:00 AM – 7:00 PM<br/>Sunday: 9:00 AM – 2:00 PM</p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp contact-info__wa"
              >
                💬 Chat on WhatsApp
              </a>

              {/* Map Placeholder */}
              <div className="contact-map">
                <div className="contact-map__placeholder">
                  <span className="contact-map__pin">📍</span>
                  <p>Google Map</p>
                  <p className="contact-map__hint">Map embed will be displayed here</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrap">
              <h2 className="contact-form__title">Send Us a Message</h2>
              <p className="contact-form__subtitle">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="contact-form__success">
                  <span className="contact-form__success-icon">✅</span>
                  <h3>Thank You!</h3>
                  <p>We've received your message and will get back to you soon. You can also reach us directly on WhatsApp for faster responses.</p>
                  <button className="btn btn--primary" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label htmlFor="name" className="contact-form__label">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="contact-form__input"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="contact-form__group">
                      <label htmlFor="email" className="contact-form__label">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="contact-form__input"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label htmlFor="phone" className="contact-form__label">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="contact-form__input"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="contact-form__group">
                      <label htmlFor="subject" className="contact-form__label">Subject *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="contact-form__input"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="plant-inquiry">Plant Inquiry</option>
                        <option value="bulk-order">Bulk Order</option>
                        <option value="delivery">Delivery Information</option>
                        <option value="plant-care">Plant Care Help</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="contact-form__group">
                    <label htmlFor="message" className="contact-form__label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="contact-form__input contact-form__textarea"
                      placeholder="Tell us about your question or requirements..."
                      rows="5"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn--primary btn--lg contact-form__submit">
                    Send Message →
                  </button>
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