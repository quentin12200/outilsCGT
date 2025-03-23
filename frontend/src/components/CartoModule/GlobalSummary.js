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
        <div className={`${styles.statCard} ${getRatioColorClass()}`}>
          <div className={styles.statIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
          </div>
          <div className={styles.statValue}>{stats.totalSalaries}</div>
          <div className={styles.statLabel}>Total Salariés</div>
        </div>
        
        <div className={`${styles.statCard} ${getRatioColorClass()}`}>
          <div className={styles.statIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
              <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
              <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
            </svg>
          </div>
          <div className={styles.statValue}>{stats.totalSyndiques}</div>
          <div className={styles.statLabel}>Total Syndiqués</div>
        </div>
        
        <div className={`${styles.statCard} ${getRatioColorClass()}`}>
          <div className={styles.statIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
              <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className={styles.statValue}>{stats.globalRatio.toFixed(1)}%</div>
          <div className={styles.statLabel}>Taux de syndicalisation</div>
        </div>
      </div>
      
      <div className={`${styles.progressSection} ${getRatioColorClass()}`}>
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
      
      {/* Graphique de répartition amélioré */}
      <div className={styles.chartSection}>
        <h4 className={styles.chartTitle}>Répartition des salariés</h4>
        <div className={styles.pieChartContainer}>
          <div className={styles.pieChartWrapper}>
            <div className={styles.pieChart}>
              {/* Cercle de fond */}
              <div className={styles.pieBackground}></div>
              
              {/* Portion syndiqués */}
              <div 
                className={styles.pieSlice} 
                style={{ 
                  backgroundColor: 'var(--cgt-red)',
                  transform: `rotate(0deg) skew(${90 - (stats.globalRatio * 3.6)}deg)`
                }}
              ></div>
              
              {/* Centre du graphique */}
              <div className={styles.pieCenter}>
                <div className={styles.pieCenterValue}>{stats.globalRatio.toFixed(1)}%</div>
                <div className={styles.pieCenterLabel}>Taux de syndicalisation</div>
              </div>
            </div>
          </div>
          
          <div className={styles.pieDetails}>
            <div className={styles.pieAnnotations}>
              <div className={`${styles.pieAnnotation} ${styles.syndiquesAnnotation}`}>
                <div className={styles.annotationColor}></div>
                <span className={styles.annotationLabel}>Syndiqués</span>
                <span className={styles.annotationValue}>{stats.totalSyndiques}</span>
                <span className={styles.annotationPercentage}>({stats.globalRatio.toFixed(1)}%)</span>
              </div>
              
              <div className={`${styles.pieAnnotation} ${styles.nonSyndiquesAnnotation}`}>
                <div className={styles.annotationColor}></div>
                <span className={styles.annotationLabel}>Non-syndiqués</span>
                <span className={styles.annotationValue}>{stats.totalSalaries - stats.totalSyndiques}</span>
                <span className={styles.annotationPercentage}>({(100 - stats.globalRatio).toFixed(1)}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sections fortes et faibles */}
      {(stats.above50.length > 0 || stats.below25.length > 0) && (
        <div className={styles.strengthsWeaknesses}>
          {stats.above50.length > 0 && (
            <div className={`${styles.strengthsSection} ${styles.highRatio}`}>
              <h4 className={styles.sectionTitle}>Points forts (&gt;50%)</h4>
              <ul className={styles.servicesList}>
                {stats.above50.map((service, index) => (
                  <li key={index} className={styles.serviceItem}>
                    <span className={styles.serviceName}>{service.name}</span>
                    <span className={styles.serviceRatio}>{((service.syndiques / service.salaries) * 100).toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {stats.below25.length > 0 && (
            <div className={`${styles.weaknessesSection} ${styles.lowRatio}`}>
              <h4 className={styles.sectionTitle}>Points faibles (&lt;25%)</h4>
              <ul className={styles.servicesList}>
                {stats.below25.map((service, index) => (
                  <li key={index} className={styles.serviceItem}>
                    <span className={styles.serviceName}>{service.name}</span>
                    <span className={styles.serviceRatio}>{((service.syndiques / service.salaries) * 100).toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSummary;