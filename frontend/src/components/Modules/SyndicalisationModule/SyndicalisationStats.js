// src/components/Modules/SyndicalisationModule/SyndicalisationStats.js
import React from 'react';
import styles from './SyndicalisationStats.module.css';
import { FaUsers, FaUserCheck, FaPercentage, FaChartLine } from 'react-icons/fa';

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
        <div className={styles.statsColumn}>
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
        
        <div className={styles.statsColumn}>
          <h3 className={styles.sectionTitle}>Taux de syndicalisation global</h3>
          
          <div className={styles.globalStatsContainer}>
            {/* Graphique circulaire amélioré */}
            <div className={styles.pieChartWrapper}>
              <div className={styles.pieChart}>
                <div className={styles.pieBackground}></div>
                <div 
                  className={styles.pieForeground} 
                  style={{ 
                    transform: `rotate(${data.currentRatio * 3.6}deg)`,
                    backgroundColor: data.currentRatio >= 30 ? '#b91c1c' : '#ef4444'
                  }}
                ></div>
                <div className={styles.pieCenter}>
                  <span className={styles.pieValue}>{data.currentRatio}%</span>
                  <span className={styles.pieLabel}>Taux global</span>
                </div>
              </div>
              
              {/* Annotations */}
              <div className={styles.pieAnnotations}>
                {data.currentRatio >= 5 && data.currentRatio <= 95 && (
                  <>
                    <div className={styles.syndiquesAnnotation} style={{ 
                      transform: `rotate(${data.currentRatio / 100 * Math.PI}rad) translate(80px, 0)` 
                    }}>
                      <span className={styles.annotationText}>Syndiqués</span>
                    </div>
                    <div className={styles.nonSyndiquesAnnotation} style={{ 
                      transform: `rotate(${(data.currentRatio / 100 + 1) * Math.PI}rad) translate(80px, 0)` 
                    }}>
                      <span className={styles.annotationText}>Non-syndiqués</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Statistiques détaillées */}
            <div className={styles.detailedStats}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <FaUsers />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{data.totalEmployees}</div>
                  <div className={styles.statLabel}>Salariés totaux</div>
                </div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <FaUserCheck />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{data.currentMembers}</div>
                  <div className={styles.statLabel}>Syndiqués</div>
                </div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <FaPercentage />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{data.currentRatio}%</div>
                  <div className={styles.statLabel}>Taux actuel</div>
                </div>
              </div>
              
              <div className={styles.statItem}>
                <div className={styles.statIcon}>
                  <FaChartLine />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{data.sectorAverage}%</div>
                  <div className={styles.statLabel}>Moyenne du secteur</div>
                </div>
              </div>
            </div>
          </div>
          
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
                  <div className="mt-2">
                    <p>
                      Pour atteindre {data.targetRatio}%, il faut convaincre {Math.ceil((data.targetRatio / 100 * data.totalEmployees) - data.currentMembers)} salariés supplémentaires.
                    </p>
                    <div className={styles.progressBarContainer}>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.currentProgress}
                          style={{ width: `${data.currentRatio}%` }}
                        ></div>
                        <div 
                          className={styles.targetProgress}
                          style={{ 
                            width: `${data.targetRatio - data.currentRatio}%`,
                            left: `${data.currentRatio}%`
                          }}
                        ></div>
                      </div>
                      <div className={styles.progressLabels}>
                        <span className={styles.currentLabel}>{data.currentRatio}%</span>
                        <span className={styles.targetLabel} style={{ left: `${data.targetRatio}%` }}>
                          {data.targetRatio}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SyndicalisationStats;