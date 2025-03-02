// PhaseAvant.js
import React from 'react';
import styles from './PhaseAvant.module.css';

const PhaseAvant = () => {
  return (
    <div className={styles.phaseContainer}>
      <h2 className={styles.phaseTitle}>Phase Avant</h2>
      <div className={styles.phaseContent}>
        <div className={styles.etapeCard}>
          <h3>1. Préparation et analyse</h3>
          <ul>
            <li>Analyse de la situation locale</li>
            <li>Identification des enjeux spécifiques</li>
            <li>Recensement des adhérents et sympathisants</li>
            <li>Cartographie des services et secteurs</li>
          </ul>
        </div>

        <div className={styles.etapeCard}>
          <h3>2. Consultation des syndiqués</h3>
          <ul>
            <li>Élaboration des questionnaires</li>
            <li>Organisation de réunions préparatoires</li>
            <li>Recueil des besoins et revendications</li>
            <li>Synthèse des consultations</li>
          </ul>
        </div>

        <div className={styles.etapeCard}>
          <h3>3. Élaboration du cahier revendicatif</h3>
          <ul>
            <li>Rédaction collective des revendications</li>
            <li>Hiérarchisation des priorités</li>
            <li>Validation par les syndiqués</li>
            <li>Préparation des arguments et supports</li>
          </ul>
        </div>

        <div className={styles.etapeCard}>
          <h3>4. Plan de communication</h3>
          <ul>
            <li>Création des supports d'information</li>
            <li>Planification des actions de sensibilisation</li>
            <li>Formation des militants communicants</li>
            <li>Préparation des canaux de diffusion</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhaseAvant;