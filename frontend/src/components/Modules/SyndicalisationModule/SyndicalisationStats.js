// src/components/Modules/SyndicalisationModule/SyndicalisationStats.js
import React from 'react';
import styles from './SyndicalisationStats.module.css';

function SyndicalisationStats({ data, onSetTarget }) {
  // Sort departments by syndication rate (ascending)
  const sortedDepartments = [...data.departmentData].sort((a, b) => a.ratio - b.ratio);
  
  // Calculate highest and lowest departments
  const lowestDept = sortedDepartments.length > 0 ? sortedDepartments[0] : null;
  const highestDept = sortedDepartments.length > 0 ? sortedDepartments[sortedDepartments.length - 1] : null;
  
  // Calculate color class based on ratio
  const getRatioColorClass = (ratio) => {
    if (ratio >= 50) return styles.veryHighRatio;
    if (ratio >= 30) return styles.highRatio;
    if (ratio >= 20) return styles.mediumRatio;
    return styles.lowRatio;
  };
  
  const getTextColorClass = (ratio) => {
    if (ratio >= 50) return styles.textVeryHigh;
    if (ratio >= 30) return styles.textHigh;
    if (ratio >= 20) return styles.textMedium;
    return styles.textLow;
  };

  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.statsTitle}>Analyse de la syndicalisation</h2>
      
      <div className={styles.statsGrid}>
        <div>
          <h3 className={styles.sectionTitle}>Répartition par service</h3>
          
          <div className={styles.departmentList}>
            {sortedDepartments.map((dept, idx) => (
              <div key={idx} className={styles.departmentItem}>
                <div className={styles.departmentHeader}>
                  <span className={styles.departmentName}>{dept.name}</span>
                  <span className={`${styles.departmentRatio} ${getTextColorClass(dept.ratio)}`}>{dept.ratio}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={`${getRatioColorClass(dept.ratio)}`} 
                    style={{ width: `${dept.ratio}%` }}
                  ></div>
                </div>
                <div className={styles.departmentStats}>
                  {dept.members} syndiqués sur {dept.employees} salariés
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className={styles.sectionTitle}>Points clés</h3>
          
          <div className={styles.keyStats}>
            {lowestDept && highestDept && (
              <div className={styles.keyStatCard}>
                <h4 className={styles.keyStatTitle}>Disparités entre services</h4>
                <div className={styles.departmentHeader}>
                  <div>
                    <span className={styles.departmentStats}>Plus faible</span>
                    <span className={styles.departmentName}>{lowestDept.name}</span>
                  </div>
                  <div className={getTextColorClass(lowestDept.ratio)}>
                    {lowestDept.ratio}%
                  </div>
                </div>
                <div className={styles.departmentHeader}>
                  <div>
                    <span className={styles.departmentStats}>Plus élevé</span>
                    <span className={styles.departmentName}>{highestDept.name}</span>
                  </div>
                  <div className={getTextColorClass(highestDept.ratio)}>
                    {highestDept.ratio}%
                  </div>
                </div>
              </div>
            )}
            
            <div className={styles.keyStatCard}>
              <h4 className={styles.keyStatTitle}>Potentiel de syndicalisation</h4>
              <div>
                <p>
                  Sur les {data.totalEmployees} salariés, il reste {data.totalEmployees - data.currentMembers} salariés non syndiqués à convaincre.
                </p>
                <div className="mt-2">
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.lowRatio}
                      style={{ width: `${data.currentRatio}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className={styles.keyStatTitle}>Définir un objectif</h5>
                <div className={styles.targetButtons}>
                  {[25, 35, 50, 75].map((target) => (
                    <button
                      key={target}
                      onClick={() => onSetTarget(target)}
                      className={`${styles.targetButton} ${data.targetRatio === target ? styles.targetButtonActive : ''}`}
                    >
                      {target}%
                    </button>
                  ))}
                </div>
                {data.targetRatio > 0 && (
                  <div className={styles.targetInfo}>
                    <p>Pour atteindre {data.targetRatio}% de syndicalisation:</p>
                    <p className="font-medium mt-1">
                      Il faut convaincre {Math.ceil((data.targetRatio * data.totalEmployees / 100) - data.currentMembers)} salariés supplémentaires
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.keyStatCard}>
              <h4 className={styles.keyStatTitle}>Taux global actuel</h4>
              <div className="flex items-center">
                <span className={`${styles.globalRateValue} ${getTextColorClass(data.currentRatio)}`}>
                  {data.currentRatio}%
                </span>
                <span className={styles.globalRateCount}>
                  ({data.currentMembers} syndiqués)
                </span>
              </div>
              <p className={styles.sectorAverage}>
                Moyenne nationale du secteur: {data.sectorAverage || "--"}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.actionSection}>
        <h3 className={styles.sectionTitle}>Actions recommandées</h3>
        <div className={styles.actionGrid}>
          {lowestDept && (
            <div className={`${styles.actionCard} ${styles.priorityCard}`}>
              <h4 className={styles.priorityTitle}>Priorité: {lowestDept.name}</h4>
              <p className={styles.actionText}>
                Ce service a le taux de syndicalisation le plus bas ({lowestDept.ratio}%). 
                Organiser une réunion d'information ciblée pour présenter les avantages 
                du syndicat aux {lowestDept.employees - lowestDept.members} salariés non syndiqués.
              </p>
            </div>
          )}
          <div className={`${styles.actionCard} ${styles.strategyCard}`}>
            <h4 className={styles.strategyTitle}>Stratégie globale</h4>
            <p className={styles.actionText}>
              Pour atteindre un taux de syndicalisation de {data.targetRatio || 35}%, 
              prévoir une campagne de recrutement avec documentation, 
              événements conviviaux et ambassadeurs par service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SyndicalisationStats;