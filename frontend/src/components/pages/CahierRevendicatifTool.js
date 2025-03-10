import React from 'react';
import styles from './CahierRevendicatifTool.module.css';

function CahierRevendicatifTool() {
  return (
    <div className={styles.toolContainer}>
      <div className={styles.toolHeader}>
        <span className={styles.toolIcon}>📖</span>
        <h2 className={styles.toolTitle}>Cahier Revendicatif</h2>
      </div>
      <p className={styles.toolDescription}>
        Cet outil vous permet de synthétiser les revendications issues du recueil des besoins, de les organiser par service et catégorie, et de préparer un argumentaire solide pour mobiliser les salariés.
      </p>
      <div className={styles.toolDetails}>
        <h3>Fonctionnalités</h3>
        <ul>
          <li>Compilation des besoins exprimés lors des AG et questionnaires</li>
          <li>Synthèse des revendications par service et catégorie</li>
          <li>Création collaborative et évolutive du document</li>
          <li>Mise à jour en temps réel pour adapter l’argumentaire</li>
        </ul>
      </div>
    </div>
  );
}

export default CahierRevendicatifTool;
