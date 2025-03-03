// src/components/CartoModule/GlobalSummary.js
import React from 'react';
import styles from './GlobalSummary.module.css';

const GlobalSummary = ({ stats }) => {
  // Détermine la classe de couleur en fonction du taux global
  const getRatioColorClass = () => {
    if (stats.globalRatio >= 50) return styles.highRatio;
    if (stats.globalRatio >= 25) return styles.mediumRatio;
    return styles.lowRatio;
  };

  // Message d'analyse en fonction du taux global
  const getAnalysisMessage = () => {
    if (stats.globalRatio > 50) {
      return "Position favorable ! Maintenez une dynamique de syndicalisation pour renforcer cette position.";
    } else if (stats.globalRatio > 30) {
      return "Bonne position avec une marge de progression. Concentrez vos efforts sur les services à faible taux.";
    } else {
      return "La marge de progression est importante. Concentrez vos efforts sur les services à faible taux de syndicalisation.";
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.summaryTitle}>Synthèse globale</h3>
      
      <div className={styles.grid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Salariés totaux</div>
          <div className={styles.statValue}>{stats.totalSalaries}</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Syndiqués totaux</div>
          <div className={styles.statValue}>{stats.totalSyndiques}</div>
        </div>
        
        <div className={`${styles.statCard} ${getRatioColorClass()}`}>
          <div className={styles.statLabel}>Taux global</div>
          <div className={styles.statValue}>{stats.globalRatio.toFixed(1)}%</div>
        </div>
      </div>
      
      <div className={styles.progressSection}>
        <div className={styles.progressLabels}>
          <span className={styles.progressLabel}>Taux de syndicalisation</span>
          <span className={styles.progressValue}>{stats.globalRatio.toFixed(1)}%</span>
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${getRatioColorClass()}`}
              style={{ width: `${Math.min(stats.globalRatio, 100)}%` }}
            ></div>
          </div>
        </div>
        <div className={styles.progressScale}>
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
      
      <div className={`${styles.analysisBox} ${getRatioColorClass()}`}>
        <h4 className={styles.analysisTitle}>Analyse et recommandations :</h4>
        <p className={styles.analysisText}>{getAnalysisMessage()}</p>
      </div>
      
      {/* Graphique de répartition (représentation visuelle) */}
      <div className={styles.chartSection}>
        <h4 className={styles.chartTitle}>Répartition des salariés</h4>
        <div className={styles.pieChartContainer}>
          <div className={styles.pieChart}>
            <div 
              className={styles.pieSlice} 
              style={{ 
                transform: `rotate(0deg)`, 
                backgroundColor: '#b91c1c',
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(stats.globalRatio / 100 * Math.PI * 2)}% ${50 - 50 * Math.sin(stats.globalRatio / 100 * Math.PI * 2)}%, 50% 50%)`
              }}
            ></div>
            <div className={styles.pieCenter}>
              <div className={styles.pieCenterText}>{stats.globalRatio.toFixed(1)}%</div>
            </div>
          </div>
          <div className={styles.pieLegend}>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: '#b91c1c' }}></div>
              <div className={styles.legendText}>Syndiqués ({stats.totalSyndiques})</div>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: '#e5e7eb' }}></div>
              <div className={styles.legendText}>Non-syndiqués ({stats.totalSalaries - stats.totalSyndiques})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSummary;