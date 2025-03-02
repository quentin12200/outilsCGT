// PhaseApres.js
import React from 'react';
import styles from './PhaseApres.module.css';

const PhaseApres = () => {
  return (
    <div className={styles.phaseContainer}>
      <h2 className={styles.phaseTitle}>Phase Après</h2>
      <div className={styles.phaseContent}>
        <div className={styles.etapeCard}>
          <h3>1. Bilan et analyse</h3>
          <ul>
            <li>Évaluation des résultats obtenus</li>
            <li>Analyse des points forts et des difficultés</li>
            <li>Recueil des retours des participants</li>
            <li>Mesure de l'impact sur la syndicalisation</li>
          </ul>
        </div>

        <div className={styles.etapeCard}>
          <h3>2. Communication des résultats</h3>
          <ul>
            <li>Diffusion du bilan aux salariés</li>
            <li>Valorisation des acquis</li>
            <li>Transparence sur les points non obtenus</li>
            <li>Remerciements aux participants</li>
          </ul>
        </div>

        <div className={styles.etapeCard}>
          <h3>3. Suivi des engagements</h3>
          <ul>
            <li>Mise en place de commissions de suivi</li>
            <li>Veille sur l'application des accords</li>
            <li>Alerte en cas de non-respect</li>
            <li>Publication régulière de l'état d'avancement</li>
          </ul>
        </div>

        <div className={styles.etapeCard}>
          <h3>4. Renforcement de l'organisation</h3>
          <ul>
            <li>Accueil des nouveaux adhérents</li>
            <li>Formation des militants</li>
            <li>Préparation des futures actions</li>
            <li>Archivage et documentation de l'expérience</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhaseApres;
