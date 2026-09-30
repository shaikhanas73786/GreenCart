import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiShoppingBag,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiRefreshCw
} from 'react-icons/fi';
import '../styles/Footer.css';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="footer-root">
      {/* Top Features Banner */}
      <div className="footer-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <FiTruck className="feature-icon" />
              <div>
                <h4>Free Shipping</h4>
                <p>On all orders over $50</p>
              </div>
            </div>
            <div className="feature-item">
              <FiRefreshCw className="feature-icon" />
              <div>
                <h4>30 Days Return</h4>
                <p>Hassle-free guarantee</p>
              </div>
            </div>
            <div className="feature-item">
              <FiShield className="feature-icon" />
              <div>
                <h4>Secure Payments</h4>
                <p>100% protected checkout</p>
              </div>
            </div>
            <div className="feature-item">
              <FiCheckCircle className="feature-icon" />
              <div>
                <h4>24/7 Support</h4>
                <p>Dedicated customer service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <div className="logo-icon-bg">
                <FiShoppingBag className="logo-icon" />
              </div>
              <span className="logo-text">
                Green<span className="logo-accent">Cart</span>
              </span>
            </div>
            <p className="footer-desc">
              Your destination for premium, sustainable, and modern everyday essentials.
              Quality products delivered straight to your doorstep.
            </p>
            <div className="footer-contact-info">
              <p><FiMapPin /> 100 Innovation Way, Suite 400</p>
              <p><FiPhone /> +1 (800) 555-0199</p>
              <p><FiMail /> support@greencart.example</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li><Link to="/account">My Account</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-col">
            <h4 className="footer-heading">Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#help">Help Center & FAQ</a></li>
              <li><a href="#shipping">Track Order</a></li>
              <li><a href="#returns">Returns & Refunds</a></li>
              <li><a href="#privacy">Privacy & Terms</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-heading">Join Our Newsletter</h4>
            <p className="newsletter-text">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="newsletter-success">
                <FiCheckCircle /> Thank you for subscribing! Check your inbox for 10% off.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>© {new Date().getFullYear()} GreenCart, Inc. All rights reserved.</p>
          <div className="footer-payment-tags">
            <span className="payment-tag">Visa</span>
            <span className="payment-tag">Mastercard</span>
            <span className="payment-tag">PayPal</span>
            <span className="payment-tag">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
