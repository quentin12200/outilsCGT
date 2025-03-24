import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './DashboardCard.module.css';

const DashboardCard = ({ title, description, icon, path, color, isPinned, onTogglePin }) => {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          {icon}
        </div>
        <button 
          className={`${styles.pinButton} ${isPinned ? styles.pinned : ''}`} 
          onClick={() => onTogglePin(path)}
          aria-label={isPinned ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isPinned ? "currentColor" : "none"} 
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
          </svg>
        </button>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <Link to={path} className={styles.cardLink}>
        Accéder à l'outil
      </Link>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element,
  path: PropTypes.string.isRequired,
  color: PropTypes.string,
  isPinned: PropTypes.bool,
  onTogglePin: PropTypes.func.isRequired
};

DashboardCard.defaultProps = {
  color: 'red',
  isPinned: false,
  icon: null
};

export default DashboardCard;
