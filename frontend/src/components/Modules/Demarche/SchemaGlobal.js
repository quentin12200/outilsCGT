// SchemaGlobal.js
import React from 'react';
import styles from './SchemaGlobal.module.css';

const SchemaGlobal = () => {
  return (
    <div className={styles.schemaContainer}>
      <h2 className={styles.schemaTitle}>Schéma Global de la Démarche Démocratique CGT</h2>
      
      <div className={styles.schemaContent}>
        <div className={styles.phasesFlow}>
          <div className={`${styles.phaseBox} ${styles.phaseAvant}`}>
            <h3>Phase AVANT</h3>
            <div className={styles.phaseDescription}>
              <p>Préparation et consultation</p>
              <ul>
                <li>Analyse de la situation</li>
                <li>Consultation des syndiqués</li>
                <li>Élaboration du cahier revendicatif</li>
                <li>Plan de communication</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.arrow}>→</div>
          
          <div className={`${styles.phaseBox} ${styles.phasePendant}`}>
            <h3>Phase PENDANT</h3>
            <div className={styles.phaseDescription}>
              <p>Action et mobilisation</p>
              <ul>
                <li>Information des salariés</li>
                <li>Actions collectives</li>
                <li>Négociations</li>
                <li>Mobilisation continue</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.arrow}>→</div>
          
          <div className={`${styles.phaseBox} ${styles.phaseApres}`}>
            <h3>Phase APRÈS</h3>
            <div className={styles.phaseDescription}>
              <p>Bilan et renforcement</p>
              <ul>
                <li>Analyse des résultats</li>
                <li>Communication</li>
                <li>Suivi des engagements</li>
                <li>Renforcement de l'organisation</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.cycleDiagram}>
          <div className={styles.cycleTitle}>Cycle démocratique continu</div>
          <div className={styles.cycleGraphic}>
            <div className={styles.cycleElement}>Décider ensemble</div>
            <div className={styles.cycleElement}>Agir collectivement</div>
            <div className={styles.cycleElement}>Évaluer et apprendre</div>
            <div className={styles.cycleConnector}></div>
          </div>
        </div>
        
        <div className={styles.principesBox}>
          <h3>Principes fondamentaux</h3>
          <ul>
            <li><span className={styles.principeTitre}>Démocratie syndicale</span>: Les syndiqués sont au cœur des décisions à chaque étape</li>
            <li><span className={styles.principeTitre}>Transparence</span>: Information complète et accessible à tous moments</li>
            <li><span className={styles.principeTitre}>Solidarité</span>: Actions collectives basées sur l'intérêt général</li>
            <li><span className={styles.principeTitre}>Formation</span>: Développement des compétences des militants</li>
            <li><span className={styles.principeTitre}>Évaluation continue</span>: Analyse et adaptation de nos pratiques</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SchemaGlobal;