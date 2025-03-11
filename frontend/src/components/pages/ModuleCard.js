import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ModuleCard.module.css';

function ModuleCard({ module }) {
  return (
    <Link to={`/${module.id}`} className={`${styles.moduleCard} ${module.color}`}>
      <div className={styles.moduleIcon}>{module.icon}</div>
      <h3 className={styles.moduleTitle}>{module.title}</h3>
      <p className={styles.moduleDescription}>{module.description}</p>
      <div className={styles.moduleButtonContainer}>
        <span className={styles.moduleButton}>
          Accéder →
        </span>
      </div>
    </Link>
  );
}

ModuleCard.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired
};
export default ModuleCard;