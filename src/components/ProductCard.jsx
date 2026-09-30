import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiCheck, FiStar } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useProducts();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-product.svg';
            }}
          />
          {product.discount && (
            <span className="product-discount-tag">
              {product.discount}% OFF
            </span>
          )}
        </div>

        <div className="product-card-body">
          <span className="product-category">{product.category}</span>
          <h3 className="product-title" title={product.title}>
            {product.title}
          </h3>

          <div className="product-rating">
            <div className="rating-stars">
              <FiStar className="star-filled" />
              <span>{product.rating?.rate || '4.2'}</span>
            </div>
            <span className="rating-count">({product.rating?.count || 85})</span>
          </div>

          <div className="product-pricing">
            <div className="price-wrapper">
              <span className="product-current-price">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="product-old-price">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <button
              className={`product-cart-btn ${isAdded ? 'added' : ''}`}
              onClick={handleAddToCart}
              aria-label="Add to cart"
              title="Add to Cart"
            >
              {isAdded ? (
                <>
                  <FiCheck /> Added
                </>
              ) : (
                <>
                  <FiShoppingBag /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
