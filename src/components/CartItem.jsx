import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import '../styles/CartItem.css';

const CartItem = ({ item }) => {
  const { increaseQty, decreaseQty, removeFromCart } = useProducts();

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <Link to={`/product/${item.id}`} className="cart-item-image-wrapper">
        <img src={item.image} alt={item.title} className="cart-item-image" />
      </Link>

      <div className="cart-item-info">
        <Link to={`/product/${item.id}`} className="cart-item-title">
          {item.title}
        </Link>
        <div className="cart-item-category">{item.category}</div>
        <div className="cart-item-price-unit">${item.price.toFixed(2)} each</div>
      </div>

      <div className="cart-item-quantity-controls">
        <button
          className="qty-btn"
          onClick={() => decreaseQty(item.id)}
          aria-label="Decrease quantity"
          disabled={item.quantity <= 1}
        >
          <FiMinus />
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => increaseQty(item.id)}
          aria-label="Increase quantity"
        >
          <FiPlus />
        </button>
      </div>

      <div className="cart-item-subtotal">
        <span className="subtotal-label">Subtotal:</span>
        <span className="subtotal-price">${itemTotal}</span>
      </div>

      <button
        className="cart-item-remove-btn"
        onClick={() => removeFromCart(item.id)}
        aria-label="Remove item"
        title="Remove item"
      >
        <FiTrash2 />
      </button>
    </div>
  );
};

export default CartItem;
