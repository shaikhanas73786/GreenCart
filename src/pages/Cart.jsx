import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiShoppingBag,
  FiArrowRight,
  FiTrash2,
  FiShield,
  FiCheckCircle,
  FiTag,
  FiArrowLeft
} from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import CartItem from '../components/CartItem';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, cartSubtotal, clearCart, user } = useProducts();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Free shipping threshold: $50
  const shippingFee = cartSubtotal > 50 || cartSubtotal === 0 ? 0 : 9.99;
  const estimatedTax = Number((cartSubtotal * 0.08).toFixed(2));
  const finalTotal = Math.max(
    0,
    Number((cartSubtotal + shippingFee + estimatedTax - promoDiscount).toFixed(2))
  );

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'GREENCART20') {
      const discountVal = Number((cartSubtotal * 0.2).toFixed(2));
      setPromoDiscount(discountVal);
      setPromoSuccess(`20% discount applied! You saved $${discountVal.toFixed(2)}.`);
    } else {
      setPromoError('Invalid code. Try using GREENCART20');
      setPromoDiscount(0);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  return (
    <div className="cart-page">
      <div className="container">
        {/* Order Complete Success Modal */}
        {orderComplete && (
          <div className="order-modal-backdrop">
            <div className="order-modal-card">
              <div className="order-modal-icon">
                <FiCheckCircle />
              </div>
              <h2>Order Placed Successfully!</h2>
              <p>
                Thank you{user ? `, ${user.name}` : ''}! Your order has been confirmed. A receipt
                and tracking link have been dispatched.
              </p>
              <div className="order-modal-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setOrderComplete(false);
                    navigate('/products');
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          {cart.length > 0 && (
            <button className="clear-cart-btn" onClick={clearCart}>
              <FiTrash2 /> Clear Entire Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="empty-cart-card">
            <div className="empty-cart-icon">
              <FiShoppingBag />
            </div>
            <h2>Your cart is empty</h2>
            <p>
              Looks like you haven't added anything to your cart yet. Discover trending
              items in our store today!
            </p>
            <Link to="/products" className="btn btn-primary start-shopping-btn">
              Explore Products <FiArrowRight />
            </Link>
          </div>
        ) : (
          /* Cart Grid */
          <div className="cart-layout-grid">
            {/* Left: Cart Items List */}
            <div className="cart-items-column">
              <div className="cart-items-header">
                <span>Products ({cart.length})</span>
                <span>Price & Quantity</span>
              </div>
              <div className="cart-items-list">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="cart-back-shopping">
                <Link to="/products">
                  <FiArrowLeft /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right: Summary Box */}
            <div className="cart-summary-column">
              <div className="summary-card">
                <h3 className="summary-title">Order Summary</h3>

                {/* Subtotal */}
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="free-shipping-text">FREE</strong>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {cartSubtotal < 50 && (
                  <p className="free-shipping-hint">
                    Add ${(50 - cartSubtotal).toFixed(2)} more to qualify for Free Shipping!
                  </p>
                )}

                {/* Estimated Tax */}
                <div className="summary-row">
                  <span>Estimated Tax (8%)</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>

                {/* Discount */}
                {promoDiscount > 0 && (
                  <div className="summary-row discount-row">
                    <span>Promo Discount (20%)</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-divider"></div>

                {/* Total */}
                <div className="summary-row total-row">
                  <span>Total Amount</span>
                  <span className="final-total">${finalTotal.toFixed(2)}</span>
                </div>

                {/* Promo Code Input */}
                <form className="promo-code-form" onSubmit={handleApplyPromo}>
                  <div className="promo-input-group">
                    <FiTag className="promo-icon" />
                    <input
                      type="text"
                      placeholder="Promo Code (GREENCART20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="promo-input"
                    />
                    <button type="submit" className="promo-btn">
                      Apply
                    </button>
                  </div>
                </form>

                {promoSuccess && <p className="promo-msg success">{promoSuccess}</p>}
                {promoError && <p className="promo-msg error">{promoError}</p>}

                {/* Checkout Button */}
                <button
                  className="btn btn-primary checkout-btn"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : `Checkout ($${finalTotal.toFixed(2)})`}
                </button>

                <div className="summary-security">
                  <FiShield /> <span>Guaranteed Safe & Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
