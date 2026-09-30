import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import '../styles/SearchBar.css';

const SearchBar = ({ placeholder = "Search for electronics, clothes, jewelery...", onSearchSubmit }) => {
  const { searchQuery, setSearchQuery } = useProducts();
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = localQuery.trim();
    setSearchQuery(query);
    if (onSearchSubmit) {
      onSearchSubmit(query);
    } else {
      navigate('/products');
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
    if (onSearchSubmit) {
      onSearchSubmit('');
    }
  };

  return (
    <form className="search-bar-form" onSubmit={handleSearch}>
      <div className="search-input-wrapper">
        <FiSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder={placeholder}
        />
        {localQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>
      <button type="submit" className="search-submit-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
