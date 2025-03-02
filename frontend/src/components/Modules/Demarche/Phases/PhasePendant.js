// PhasePendant.js
import React from 'react';
import styles from './PhasePendant.module.css';

const PhasePendant = () => {
  return (
    <div className={styles.phaseContainer}>
      <h2 className={styles.phaseTitle}>Phase Pendant</h2>
      <div className={styles.phaseContent}>
        <div className={styles.etapeCard}>
          <h3>1. Information des salariés</h3>
          <ul>
            <li>Distribution des tracts et documents</li>
            <li>Organisation d'assemblées générales</li>
            <li>Permanences d'information</li>
            <li>Communication numérique (mails, réseaux sociaux)</li>
          </ul>
        </div>

        <div className={styles.etapeCard}>
          <h3>2. Actions collectives</h3>
          <ul>
            <li>Rassemblements et manifestations</li>
            <li>Débrayages et grèves</li>
            <li>Actions symboliques</li>
            <li>Rencontres avec les médias</li>
          </ul>
        </div>

        <div className={styles.etapeCard}>
          <h3>3. Négociations</h3>
          <ul>
            <li>Préparation des réunions de négociation</li>
            <li>Participation aux instances représentatives</li>
            <li>Compte-rendus aux syndiqués</li>
            <li>Ajustement de la stratégie selon l'avancement</li>
          </ul>
        </div>

        <div className={styles.etapeCard}>
          <h3>4. Mobilisation continue</h3>
          <ul>
            <li>Maintien de la dynamique collective</li>
            <li>Rotation des équipes militantes</li>
            <li>Élargissement du mouvement</li>
            <li>Adaptation aux réactions de la direction</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhasePendant;
