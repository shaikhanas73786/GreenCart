import React from 'react';
import '../styles/Loader.css';

const Loader = ({ message = "Loading products..." }) => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      {message && <p className="loader-text">{message}</p>}
    </div>
  );
};

export default Loader;
