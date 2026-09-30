import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import '../styles/Products.css';

const Products = () => {
  const { products, loading, searchQuery, setSearchQuery } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('default');
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  // Keep selectedCategory in sync when URL changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Keep local search in sync with context
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const categories = [
    { label: 'All Products', value: 'all' },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Jewelery', value: 'jewelery' },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch.trim());
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSortBy('default');
    setLocalSearch('');
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="products-page">
      <div className="container">
        {/* Header Bar */}
        <div className="products-header">
          <div>
            <h1 className="products-title">Our Products</h1>
            <p className="products-subtitle">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {/* Search bar inside products page */}
          <form className="products-search-box" onSubmit={handleSearchSubmit}>
            <FiSearch className="search-box-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="products-search-input"
            />
            {localSearch && (
              <button
                type="button"
                className="search-reset-btn"
                onClick={() => {
                  setLocalSearch('');
                  setSearchQuery('');
                }}
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Filter Controls Bar */}
        <div className="products-controls-bar">
          {/* Categories Pill Buttons */}
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`pill-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown & Reset */}
          <div className="sort-controls">
            <label htmlFor="sortSelect" className="sort-label">
              Sort by:
            </label>
            <select
              id="sortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Featured / Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {(selectedCategory !== 'all' || searchQuery || sortBy !== 'default') && (
              <button
                className="btn-reset-filters"
                onClick={handleResetFilters}
                title="Reset All Filters"
              >
                <FiRefreshCw /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Products Grid / Loading / Empty State */}
        {loading ? (
          <Loader message="Loading catalog..." />
        ) : filteredProducts.length > 0 ? (
          <div className="products-catalog-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products-state">
            <div className="empty-icon-circle">
              <FiFilter />
            </div>
            <h3>No products found</h3>
            <p>
              We could not find any items matching your current filters or search term.
            </p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
