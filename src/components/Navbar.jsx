import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FiShoppingBag,
  FiUser,
  FiSearch,
  FiMenu,
  FiX,
  FiHeart
} from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { cartCount, user } = useProducts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearchOpen, setNavSearchOpen] = useState(false);
  const [navSearchInput, setNavSearchInput] = useState('');
  const { setSearchQuery } = useProducts();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (navSearchInput.trim()) {
      setSearchQuery(navSearchInput.trim());
      navigate('/products');
      setNavSearchOpen(false);
      closeMobileMenu();
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <div className="logo-icon-bg">
            <FiShoppingBag className="logo-icon" />
          </div>
          <span className="logo-text">
            Green<span className="logo-accent">Cart</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links-desktop">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Products
          </NavLink>
        </nav>

        {/* Right Actions (Search, Account, Cart, Mobile Toggle) */}
        <div className="navbar-actions">
          {/* Quick Search Toggle */}
          <div className="nav-search-desktop">
            <form onSubmit={handleNavSearch} className="nav-search-form">
              <input
                type="text"
                placeholder="Search..."
                value={navSearchInput}
                onChange={(e) => setNavSearchInput(e.target.value)}
                className="nav-search-input"
              />
              <button type="submit" className="nav-search-btn" aria-label="Search">
                <FiSearch />
              </button>
            </form>
          </div>

          {/* Account / Login Link */}
          <Link
            to={user ? "/account" : "/login"}
            className="navbar-action-btn"
            title={user ? `Account (${user.name})` : "Login"}
          >
            <FiUser className="action-icon" />
            <span className="action-label">
              {user ? user.name : "Login"}
            </span>
          </Link>

          {/* Cart Link with Badge */}
          <Link to="/cart" className="navbar-action-btn cart-btn" title="Shopping Cart">
            <div className="cart-icon-wrapper">
              <FiShoppingBag className="action-icon" />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
            <span className="action-label">Cart</span>
          </Link>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            className="navbar-hamburger"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-search-wrapper">
          <form onSubmit={handleNavSearch} className="mobile-search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={navSearchInput}
              onChange={(e) => setNavSearchInput(e.target.value)}
              className="mobile-search-input"
            />
            <button type="submit" className="mobile-search-btn" aria-label="Search">
              <FiSearch />
            </button>
          </form>
        </div>

        <nav className="mobile-nav-links">
          <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link to="/products" className="mobile-nav-link" onClick={closeMobileMenu}>
            Products
          </Link>
          <Link to="/cart" className="mobile-nav-link" onClick={closeMobileMenu}>
            Cart ({cartCount})
          </Link>
          <Link
            to={user ? "/account" : "/login"}
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            {user ? `My Account (${user.name})` : "Login / Register"}
          </Link>
        </nav>
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={closeMobileMenu}></div>
      )}
    </header>
  );
};

export default Navbar;
