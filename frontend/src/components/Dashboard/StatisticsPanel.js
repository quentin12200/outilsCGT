import React from 'react';
import PropTypes from 'prop-types';
import styles from './StatisticsPanel.module.css';

const StatisticsPanel = ({ stats }) => {
  return (
    <div className={styles.statsContainer}>
      {stats.map((stat, index) => (
        <div key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
          <div className={styles.statIcon}>{stat.icon}</div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stat.value}</h3>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

StatisticsPanel.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string
    })
  ).isRequired
};

export default StatisticsPanel;
