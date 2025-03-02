import React from 'react';
import styles from './GlobalSummary.module.css';

function GlobalSummary({ stats }) {
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.summaryTitle}>Synthèse globale</h2>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Salariés totaux</div>
          <div className={styles.statValue}>{stats.totalEmployees}</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Syndiqués CGT</div>
          <div className={styles.statValue}>{stats.totalUnionized}</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Taux global</div>
          <div className={styles.statValue}>{stats.globalRatio.toFixed(1)}%</div>
        </div>
      </div>
      
      <div className={styles.progressContainer}>
        <div className={styles.progressLabel}>
          <span>Taux de syndicalisation CGT</span>
          <span>{stats.globalRatio.toFixed(1)}%</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${Math.min(100, stats.globalRatio)}%` }}
          ></div>
        </div>
      </div>
      
      <div className={styles.thresholdsContainer}>
        <div className={styles.threshold}>
          <h3 className={styles.thresholdTitle}>
            <span className={styles.thresholdDot} style={{ backgroundColor: '#66bb6a' }}></span>
            Services à fort taux (&gt; 50%)
          </h3>
          {stats.above50.length > 0 ? (
            <ul className={styles.thresholdList}>
              {stats.above50.map((service, index) => (
                <li key={index} className={styles.thresholdItem}>{service}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.thresholdEmpty}>Aucun service ne dépasse 50% de syndicalisation</p>
          )}
        </div>
        
        <div className={styles.threshold}>
          <h3 className={styles.thresholdTitle}>
            <span className={styles.thresholdDot} style={{ backgroundColor: '#ef5350' }}></span>
            Services à faible taux (&lt; 25%)
          </h3>
          {stats.below25.length > 0 ? (
            <ul className={styles.thresholdList}>
              {stats.below25.map((service, index) => (
                <li key={index} className={styles.thresholdItem}>{service}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.thresholdEmpty}>Aucun service n'est en dessous de 25% de syndicalisation</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GlobalSummary;