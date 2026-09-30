import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiStar,
  FiShoppingBag,
  FiCheck,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiMinus,
  FiPlus
} from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products, loading, addToCart } = useProducts();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = getProductById(id);

  // Reset quantity when id changes
  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-loading container">
        <Loader message="Loading product details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container not-found-wrapper">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary">
          <FiArrowLeft /> Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  // Related products from same category, excluding current product
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="details-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>
          <span>/</span>
          <span className="breadcrumb-current">{product.title}</span>
        </div>

        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>

        {/* Main Details Layout */}
        <div className="details-grid">
          {/* Image Showcase */}
          <div className="details-image-card">
            <div className="details-image-wrapper">
              <img
                src={product.image}
                alt={product.title}
                className="details-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-product.svg';
                }}
              />
              {product.discount && (
                <span className="details-discount-pill">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Product Info & Actions */}
          <div className="details-info-card">
            <div className="details-category-tag">{product.category}</div>
            <h1 className="details-title">{product.title}</h1>

            {/* Ratings */}
            <div className="details-rating-bar">
              <div className="rating-stars">
                <FiStar className="star-filled" />
                <strong>{product.rating?.rate || '4.5'}</strong>
              </div>
              <span className="rating-separator">•</span>
              <span className="rating-reviews">
                {product.rating?.count || 120} Customer Reviews
              </span>
              <span className="rating-separator">•</span>
              <span className="in-stock-badge">In Stock & Ready to Ship</span>
            </div>

            {/* Pricing */}
            <div className="details-pricing">
              <span className="details-current-price">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="details-old-price">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="details-savings-text">
                  Save ${(product.oldPrice - product.price).toFixed(2)} ({product.discount}%)
                </span>
              )}
            </div>

            {/* Description */}
            <div className="details-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Quantity Stepper & Buttons */}
            <div className="details-actions-section">
              <div className="quantity-control-wrapper">
                <label className="qty-label">Quantity:</label>
                <div className="details-qty-stepper">
                  <button
                    className="stepper-btn"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <FiMinus />
                  </button>
                  <span className="stepper-value">{quantity}</span>
                  <button
                    className="stepper-btn"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="Increase quantity"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              <div className="details-btn-group">
                <button
                  className={`btn btn-primary add-cart-btn ${isAdded ? 'success' : ''}`}
                  onClick={handleAddToCart}
                >
                  {isAdded ? (
                    <>
                      <FiCheck /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <FiShoppingBag /> Add to Cart
                    </>
                  )}
                </button>
                <button className="btn btn-secondary buy-now-btn" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="details-trust-badges">
              <div className="trust-item">
                <FiTruck className="trust-icon" />
                <span>Free delivery on orders over $50</span>
              </div>
              <div className="trust-item">
                <FiRefreshCw className="trust-icon" />
                <span>30-day hassle-free return guarantee</span>
              </div>
              <div className="trust-item">
                <FiShield className="trust-icon" />
                <span>Certified authentic & quality checked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="related-title">Related Products</h2>
            <div className="products-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
