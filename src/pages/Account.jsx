import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiPackage,
  FiMapPin,
  FiLogOut,
  FiCheckCircle,
  FiShoppingBag,
  FiClock,
  FiArrowRight
} from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import '../styles/Account.css';

const Account = () => {
  const { user, logoutUser } = useProducts();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="account-page">
        <div className="container">
          <div className="account-not-logged-card">
            <div className="not-logged-icon">
              <FiUser />
            </div>
            <h2>Account Access</h2>
            <p>Please log in or register to view your account details and order history.</p>
            <div className="not-logged-actions">
              <Link to="/login" className="btn btn-primary">
                Log In
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register New Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Simulated orders
  const sampleOrders = [
    {
      id: "GC-98214",
      date: "May 14, 2026",
      status: "Delivered",
      total: 132.25,
      items: [
        { name: "Fjallraven - Foldsack No. 1 Backpack", qty: 1, price: 109.95 },
        { name: "Mens Casual Premium Slim Fit T-Shirts", qty: 1, price: 22.30 }
      ]
    },
    {
      id: "GC-87102",
      date: "April 29, 2026",
      status: "Delivered",
      total: 64.00,
      items: [
        { name: "WD 2TB Elements Portable External Hard Drive", qty: 1, price: 64.00 }
      ]
    }
  ];

  return (
    <div className="account-page">
      <div className="container">
        {/* Account Header Banner */}
        <div className="account-profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <span className="profile-badge">
              <FiCheckCircle /> Verified Member since {user.joinedDate || "2026"}
            </span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut /> Log Out
          </button>
        </div>

        {/* Account Navigation Tabs */}
        <div className="account-tabs-bar">
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FiPackage /> Order History
          </button>
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser /> Profile Details
          </button>
          <button
            className={`tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <FiMapPin /> Saved Addresses
          </button>
        </div>

        {/* Tab Contents */}
        <div className="account-tab-content">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="orders-tab-view">
              <h3 className="tab-heading">Recent Orders</h3>
              <div className="orders-list">
                {sampleOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-card-header">
                      <div className="order-meta">
                        <strong>Order #{order.id}</strong>
                        <span className="order-date">
                          <FiClock /> {order.date}
                        </span>
                      </div>
                      <div className="order-status-badge">
                        <FiCheckCircle /> {order.status}
                      </div>
                    </div>

                    <div className="order-items-list">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-item-row">
                          <span className="order-item-name">{item.name}</span>
                          <span className="order-item-qty">Qty: {item.qty}</span>
                          <span className="order-item-price">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="order-card-footer">
                      <span className="order-total-label">Total Paid:</span>
                      <span className="order-total-val">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Details Tab */}
          {activeTab === 'profile' && (
            <div className="profile-tab-view">
              <h3 className="tab-heading">Personal Information</h3>
              <div className="profile-details-grid">
                <div className="profile-detail-item">
                  <label>Full Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="profile-detail-item">
                  <label>Email Address</label>
                  <p>{user.email}</p>
                </div>
                <div className="profile-detail-item">
                  <label>Account Status</label>
                  <p className="status-active">Active (Standard Tier)</p>
                </div>
                <div className="profile-detail-item">
                  <label>Member Since</label>
                  <p>{user.joinedDate || "2026"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="addresses-tab-view">
              <h3 className="tab-heading">Saved Addresses</h3>
              <div className="addresses-grid">
                <div className="address-card default">
                  <div className="address-badge">Default Shipping</div>
                  <h4>{user.name}</h4>
                  <p>742 Evergreen Terrace</p>
                  <p>Springfield, OR 97477</p>
                  <p>United States</p>
                  <p>Phone: +1 (555) 234-5678</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
