import React from 'react';
import PropTypes from 'prop-types';
import styles from './CategoryFilter.module.css';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className={styles.filterContainer}>
      <button
        className={`${styles.filterButton} ${!activeCategory ? styles.active : ''}`}
        onClick={() => onCategoryChange(null)}
      >
        Tous les outils
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          className={`${styles.filterButton} ${activeCategory === category.id ? styles.active : ''} ${styles[category.color]}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string
    })
  ).isRequired,
  activeCategory: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired
};

export default CategoryFilter;
