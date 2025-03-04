// src/components/RetroplanningModule/Timeline.js
import React from 'react';
import styles from './Timeline.module.css';

function Timeline({ phases, selectedPhase, onSelectPhase }) {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineLine}></div>
      <div className={styles.timelineSteps}>
        {phases.map((phase, index) => {
          const isActive = selectedPhase === phase.id;
          
          // Utiliser directement la couleur hexadécimale
          const circleStyle = {
            backgroundColor: phase.color
          };

          return (
            <div key={phase.id} className={styles.timelineStep}>
              {index > 0 && (
                <div className={styles.timelineConnector}></div>
              )}
              <button 
                className={`${styles.timelineCircle} ${isActive ? styles.timelineCircleActive : ''}`}
                style={circleStyle}
                onClick={() => onSelectPhase(phase.id)}
                aria-label={`Sélectionner la phase ${phase.title}`}
              >
                {index + 1}
              </button>
              <div className={styles.timelineInfo}>
                <div className={`${styles.timelineTitle} ${isActive ? styles.timelineTitleActive : ''}`}>
                  {phase.title}
                </div>
                <div className={styles.timelineDescription}>
                  {phase.description.length > 50 
                    ? phase.description.substring(0, 50) + '...' 
                    : phase.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.timelineNav}>
        {phases.map((phase) => (
          <button
            key={phase.id}
            className={`${styles.timelineDot} ${selectedPhase === phase.id ? styles.timelineDotActive : ''}`}
            onClick={() => onSelectPhase(phase.id)}
            aria-label={`Aller à la phase ${phase.title}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
