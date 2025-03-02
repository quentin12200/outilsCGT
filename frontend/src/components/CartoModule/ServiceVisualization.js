// src/components/CartoModule/ServiceVisualization.js
import React from 'react';
import styles from './ServiceVisualization.module.css';

const ServiceVisualization = ({ services }) => {
  // Fonction pour calculer les statistiques globales
  const calculateStats = (services) => {
    if (!services || services.length === 0) {
      return {
        totalEmployees: 0,
        unionizedEmployees: 0,
        unionRatio: 0
      };
    }

    const totalEmployees = services.reduce((sum, service) => sum + service.salaries, 0);
    const unionizedEmployees = services.reduce((sum, service) => sum + service.syndiques, 0);
    const unionRatio = totalEmployees > 0 ? unionizedEmployees / totalEmployees : 0;

    return {
      totalEmployees,
      unionizedEmployees,
      unionRatio
    };
  };

  // Fonction pour déterminer la couleur en fonction du taux de syndicalisation
  const getColorByRatio = (ratio) => {
    if (ratio >= 0.5) return styles.high;
    if (ratio >= 0.25) return styles.medium;
    return styles.low;
  };

  // Fonction pour générer les carrés représentant les employés
  const generateSquares = (total, unionized) => {
    const squares = [];
    const squareCount = Math.min(total, 100); // Maximum 100 carrés pour l'affichage
    const unionizedCount = Math.round((unionized / total) * squareCount);

    for (let i = 0; i < squareCount; i++) {
      squares.push(
        <div 
          key={i} 
          className={`${styles.square} ${i < unionizedCount ? styles.unionized : styles.nonUnionized}`}
        />
      );
    }

    return squares;
  };

  // Calculer les statistiques globales
  const { totalEmployees, unionizedEmployees, unionRatio } = calculateStats(services);

  // Identifier les services par catégorie
  const highRatioServices = services.filter(s => s.salaries > 0 && s.syndiques / s.salaries >= 0.5);
  const mediumRatioServices = services.filter(s => s.salaries > 0 && s.syndiques / s.salaries >= 0.25 && s.syndiques / s.salaries < 0.5);
  const lowRatioServices = services.filter(s => s.salaries > 0 && s.syndiques / s.salaries < 0.25);

  return (
    <div className={styles.container}>
      <div className={styles.globalStats}>
        <h3 className={styles.title}>Synthèse globale</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Salariés totaux</span>
            <span className={styles.statValue}>{totalEmployees}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Syndiqués totaux</span>
            <span className={styles.statValue}>{unionizedEmployees}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Taux global</span>
            <span className={styles.statValue}>{(unionRatio * 100).toFixed(1)}%</span>
          </div>
        </div>
        
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBarLabel}>
            <span>Taux de syndicalisation</span>
            <span>{(unionRatio * 100).toFixed(1)}%</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${Math.min(unionRatio * 100, 100)}%` }}
            />
          </div>
        </div>
        
        <div className={styles.globalVisualization}>
          <div className={styles.visualizationTitle}>Représentation des syndiqués</div>
          <div className={styles.squaresContainer}>
            {generateSquares(totalEmployees, unionizedEmployees)}
          </div>
        </div>
        
        <div className={styles.analysisMessage}>
          {unionRatio > 0.5 
            ? "Position favorable ! Maintenez une dynamique de syndicalisation pour renforcer cette position."
            : "La marge de progression est importante. Concentrez vos efforts sur les services à faible taux de syndicalisation."}
        </div>
      </div>
      
      <div className={styles.servicesContainer}>
        <h3 className={styles.title}>Cartographie des services</h3>
        
        <div className={styles.servicesGrid}>
          {services.map((service, index) => {
            if (service.salaries <= 0) return null;
            
            const ratio = service.syndiques / service.salaries;
            const colorClass = getColorByRatio(ratio);
            
            return (
              <div key={index} className={`${styles.serviceCard} ${colorClass}`}>
                <h4 className={styles.serviceName}>{service.name}</h4>
                <div className={styles.serviceStats}>
                  <span>Salariés: {service.salaries}</span>
                  <span>Syndiqués: {service.syndiques}</span>
                </div>
                <div className={styles.serviceRatio}>
                  Taux: {(ratio * 100).toFixed(1)}%
                </div>
                <div className={styles.serviceBar}>
                  <div 
                    className={styles.serviceBarFill}
                    style={{ width: `${ratio * 100}%` }}
                  />
                </div>
                <div className={styles.serviceVisualization}>
                  {generateSquares(service.salaries, service.syndiques)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className={styles.categories}>
        <div className={styles.categorySection}>
          <h4 className={`${styles.categoryTitle} ${styles.highTitle}`}>
            Services à fort taux de syndicalisation
          </h4>
          <p className={styles.categoryDescription}>
            {highRatioServices.length > 0
              ? `${highRatioServices.length} service(s) avec un taux supérieur à 50%. Ces services peuvent servir de modèle.`
              : "Aucun service n'a encore atteint un taux de syndicalisation supérieur à 50%."}
          </p>
          <ul className={styles.categoryList}>
            {highRatioServices.map((service, index) => (
              <li key={index} className={styles.categoryItem}>
                {service.name} ({(service.syndiques / service.salaries * 100).toFixed(1)}%)
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.categorySection}>
          <h4 className={`${styles.categoryTitle} ${styles.mediumTitle}`}>
            Services à taux moyen de syndicalisation
          </h4>
          <p className={styles.categoryDescription}>
            {mediumRatioServices.length > 0
              ? `${mediumRatioServices.length} service(s) avec un taux entre 25% et 50%. Ces services sont en progression.`
              : "Aucun service n'a un taux de syndicalisation moyen (entre 25% et 50%)."}
          </p>
          <ul className={styles.categoryList}>
            {mediumRatioServices.map((service, index) => (
              <li key={index} className={styles.categoryItem}>
                {service.name} ({(service.syndiques / service.salaries * 100).toFixed(1)}%)
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.categorySection}>
          <h4 className={`${styles.categoryTitle} ${styles.lowTitle}`}>
            Services à faible taux de syndicalisation
          </h4>
          <p className={styles.categoryDescription}>
            {lowRatioServices.length > 0
              ? `${lowRatioServices.length} service(s) avec un taux inférieur à 25%. Ces services sont prioritaires.`
              : "Aucun service n'a un taux de syndicalisation faible (inférieur à 25%)."}
          </p>
          <ul className={styles.categoryList}>
            {lowRatioServices.map((service, index) => (
              <li key={index} className={styles.categoryItem}>
                {service.name} ({(service.syndiques / service.salaries * 100).toFixed(1)}%)
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceVisualization;