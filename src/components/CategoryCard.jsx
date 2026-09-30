import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryCard.css';

const CategoryCard = ({ title, count, icon: Icon, categoryKey }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products?category=${encodeURIComponent(categoryKey)}`);
  };

  return (
    <div className="category-card" onClick={handleClick} role="button" tabIndex="0">
      <div className="category-icon-wrapper">
        {Icon && <Icon className="category-icon" />}
      </div>
      <div className="category-info">
        <h3 className="category-title">{title}</h3>
        {count && <span className="category-count">{count} Items</span>}
      </div>
    </div>
  );
};

export default CategoryCard;
