import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiShoppingBag,
  FiTv,
  FiWatch,
  FiSmile,
  FiTag,
  FiShield,
  FiTruck,
  FiPercent,
  FiAward
} from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import '../styles/Home.css';

const Home = () => {
  const { products, loading } = useProducts();

  // Featured products: slice first 8 items
  const featuredProducts = products.slice(0, 8);

  const categories = [
    { title: "Men's Fashion", key: "men's clothing", icon: FiSmile, count: 4 },
    { title: "Women's Fashion", key: "women's clothing", icon: FiShoppingBag, count: 6 },
    { title: "Electronics", key: "electronics", icon: FiTv, count: 6 },
    { title: "Jewelery & Gold", key: "jewelery", icon: FiWatch, count: 4 },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">
              <FiTag /> Summer Sale 2026 Live
            </span>
            <h1 className="hero-title">
              Shop Smarter, <br />
              Live <span className="hero-highlight">Greener.</span>
            </h1>
            <p className="hero-subtitle">
              Discover premium everyday fashion, lifestyle gadgets, and fine jewelry
              crafted for sustainable living. Fast shipping, guaranteed quality.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary hero-btn">
                Shop Now <FiArrowRight />
              </Link>
              <a href="#categories" className="btn btn-secondary hero-btn">
                Explore Categories
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Happy Shoppers</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Curated Items</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">99.8%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-glow"></div>
            <div className="hero-banner-card">
              <img
                src="/hero-product.svg"
                alt="Featured Hero Product"
                className="hero-featured-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-product.svg';
                }}
              />
              <div className="hero-floating-badge top">
                <FiAward className="badge-icon" />
                <div>
                  <strong>Top Rated</strong>
                  <span>4.8 / 5.0 Stars</span>
                </div>
              </div>
              <div className="hero-floating-badge bottom">
                <FiPercent className="badge-icon green" />
                <div>
                  <strong>Save 20%</strong>
                  <span>On your first order</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Search Section */}
      <section className="home-search-section">
        <div className="container">
          <div className="search-card">
            <h2 className="search-headline">Find exactly what you are looking for</h2>
            <SearchBar placeholder="Try 'jacket', 'SSD', 'gold ring', 'backpack'..." />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="section categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Collections</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Browse through our handpicked collections to find essentials that suit your style.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.key}
                title={cat.title}
                categoryKey={cat.key}
                count={cat.count}
                icon={cat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Trending</span>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Explore our best-rated essentials loved by thousands of conscious shoppers.
            </p>
          </div>

          {loading ? (
            <Loader message="Loading popular products..." />
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="featured-view-all">
            <Link to="/products" className="btn btn-secondary">
              View All Products ({products.length}) <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Discount / Promotional Banner */}
      <section className="promo-banner-section">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-content">
              <span className="promo-tag">LIMITED TIME OFFER</span>
              <h2 className="promo-title">Get 20% Off Your Entire Cart</h2>
              <p className="promo-desc">
                Use code <span className="promo-code">GREENCART20</span> at checkout to claim your discount.
                Valid on all electronics, accessories, and apparel.
              </p>
              <Link to="/products" className="btn btn-primary promo-btn">
                Claim Offer Now
              </Link>
            </div>
            <div className="promo-graphics">
              <div className="discount-pill">
                <span className="pill-big">20%</span>
                <span className="pill-small">DISCOUNT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-us-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Promise</span>
            <h2 className="section-title">Why Choose GreenCart?</h2>
            <p className="section-subtitle">
              We provide seamless online shopping backed by sustainable practices and unmatched reliability.
            </p>
          </div>

          <div className="why-us-grid">
            <div className="why-us-card">
              <div className="why-icon-wrapper">
                <FiTruck />
              </div>
              <h3>Fast & Free Delivery</h3>
              <p>Enjoy free express shipping on all orders over $50 with live tracking updates.</p>
            </div>

            <div className="why-us-card">
              <div className="why-icon-wrapper">
                <FiShield />
              </div>
              <h3>Secure Encrypted Checkout</h3>
              <p>Your payment information is processed through 256-bit bank-level SSL encryption.</p>
            </div>

            <div className="why-us-card">
              <div className="why-icon-wrapper">
                <FiAward />
              </div>
              <h3>Curated Premium Quality</h3>
              <p>Every single product in our catalog passes rigorous durability and ethical standards.</p>
            </div>

            <div className="why-us-card">
              <div className="why-icon-wrapper">
                <FiSmile />
              </div>
              <h3>30-Day Money Back</h3>
              <p>Not 100% satisfied? Return your items hassle-free within 30 days for a full refund.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Elevate Your Shopping Experience?</h2>
            <p>Join thousands of satisfied shoppers who trust GreenCart every day.</p>
            <Link to="/products" className="btn btn-primary cta-btn">
              Explore Catalog Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
