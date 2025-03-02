// src/components/RetroplanningModule/Timeline.js
import React from 'react';
import styles from './Timeline.module.css';

function Timeline({ phases, selectedPhase, onSelectPhase }) {
  return (
    <div className={styles.timelineContainer}>
      {/* Ligne de temps horizontale - visible uniquement sur les écrans moyens et grands */}
      <div className={styles.timelineLine}></div>
      
      {/* Phases */}
      <div className={styles.timelineSteps}>
        {phases.map((phase, index) => {
          // Détermine si cette phase est active, passée ou future
          const isActive = selectedPhase === phase.id;
          const isPast = phases.findIndex(p => p.id === selectedPhase) > index;
          
          // Style pour le cercle de la phase
          const circleStyle = {};
          if (phase.color) {
            // Extrait la couleur du format "bg-color-600" pour l'appliquer directement
            const colorMatch = phase.color.match(/bg-([a-z]+)-([0-9]+)/);
            if (colorMatch) {
              const colorName = colorMatch[1];
              const colorIntensity = colorMatch[2];
              // Cela suppose que les variables CSS sont définies dans votre thème 
              // (par exemple avec Tailwind CSS)
              circleStyle.backgroundColor = `var(--${colorName}-${colorIntensity}, ${phase.color.replace('bg-', '')})`;
            } else {
              circleStyle.backgroundColor = phase.color.replace('bg-', '');
            }
          }
          
          return (
            <div 
              key={phase.id}
              className={styles.timelineStep}
            >
              {/* Si ce n'est pas la première phase, afficher une ligne de connexion (version mobile) */}
              {index > 0 && (
                <div className={styles.timelineConnector}></div>
              )}
              
              {/* Cercle de la phase */}
              <button 
                className={`${styles.timelineCircle} ${isActive ? styles.timelineCircleActive : ''}`}
                style={circleStyle}
                onClick={() => onSelectPhase(phase.id)}
                aria-label={`Sélectionner la phase ${phase.title}`}
              >
                {index + 1}
              </button>
              
              {/* Titre et description */}
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
      
      {/* Navigation complémentaire */}
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