// src/components/CartoModule/ServiceCard.js
import React from 'react';
import styles from './ServiceCard.module.css';

const ServiceCard = ({ service }) => {
  // Calcul du ratio de syndicalisation
  const ratio = service.salaries > 0 ? (service.syndiques / service.salaries) * 100 : 0;
  
  // Détermine la classe CSS en fonction du taux de syndicalisation
  const getRatioClass = () => {
    if (service.salaries <= 0) return '';
    if (ratio >= 50) return styles.highRatio;
    if (ratio >= 25) return styles.mediumRatio;
    return styles.lowRatio;
  };
  
  return (
    <div className={`${styles.card} ${getRatioClass()}`}>
      <h4 className={styles.cardTitle}>{service.name}</h4>
      
      <div className={styles.infoRow}>
        <span>Salariés: {service.salaries}</span>
        <span>Syndiqués: {service.syndiques}</span>
      </div>
      
      <div className={styles.ratioText}>
        Taux: {ratio.toFixed(1)}%
      </div>
      
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${ratio}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ServiceCard;