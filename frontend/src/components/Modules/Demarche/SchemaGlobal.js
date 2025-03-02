// SchemaGlobal.js
import React from 'react';
import styles from './SchemaGlobal.module.css';

function SchemaGlobal({ onSelectEtape }) {
  return (
    <div className={styles.schemaContainer}>
      <div className={styles.phasesTitles}>
        <div className={styles.phaseTitle}>Avant...</div>
        <div className={styles.phaseTitle}>Pendant...</div>
        <div className={styles.phaseTitle}>Après...</div>
      </div>
      
      <div className={styles.schemaContent}>
        <div className={styles.sideColumn}>
          <div className={styles.sideTitle}>VIE SYNDICALE</div>
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.organisationSection}>
            <h3 className={styles.sectionTitle}>ORGANISATION</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>Critères représentativité</li>
              <li className={styles.listItem}>Connaissance fine salariat</li>
              <li className={styles.listItem}>Bilan Pratiques démocratiques</li>
              <li className={styles.listItem}>Bilan informations formation</li>
              <li className={styles.listItem}>Bilan activité IRP élus</li>
              <li className={styles.listItem}>Bilan Droits planning militant</li>
              <li className={styles.listItem}>Bilan financiers</li>
              <li className={styles.listItem}>Analyse dernier scrutin</li>
              <li className={styles.listItem}>Analyse dernière campagne</li>
              <li className={styles.listItem}>Bilan communication</li>
              <li className={styles.listItem}>Liens UL UD FD</li>
            </ul>
          </div>
          
          <div className={styles.stepsContainer}>
            <div 
              className={`${styles.step} ${styles.stepBesoins}`}
              onClick={() => onSelectEtape('besoins')}
            >
              <h4 className={styles.stepTitle}>1ère Étape BESOINS</h4>
              <div className={styles.stepContent}>
                <p>AG Syndiqués auteurs acteurs décideurs</p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Présentation des enjeux, du contexte...</li>
                  <li className={styles.listItem}>Déploiement avec outils...</li>
                </ul>
              </div>
            </div>
            
            <div 
              className={`${styles.step} ${styles.stepRevendications}`}
              onClick={() => onSelectEtape('revendications')}
            >
              <h4 className={styles.stepTitle}>2ème Étape REVENDICATIONS</h4>
              <div className={styles.stepContent}>
                <p>AG Syndiqués auteurs acteurs décideurs</p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Bilan besoins</li>
                  <li className={styles.listItem}>Élaboration démocratique du cahier revendicatif</li>
                </ul>
              </div>
            </div>
            
            <div 
              className={`${styles.step} ${styles.stepMobilisation}`}
              onClick={() => onSelectEtape('mobilisation')}
            >
              <h4 className={styles.stepTitle}>3ème étape MOBILISATION</h4>
              <div className={styles.stepContent}>
                <p>AG salariés</p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>Pointage des syndiqués</li>
                  <li className={styles.listItem}>Rappel des salariés soutenus</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={`${styles.crossSection} ${styles.communicationSection}`}>
            <h3 className={styles.sectionTitle}>COMMUNICATION</h3>
            <p>actions et outils pour soutenir et faire vivre la bataille des idées pour convaincre</p>
          </div>
          
          <div className={`${styles.crossSection} ${styles.irpSection}`}>
            <h3 className={styles.sectionTitle}>IRP PREROGATIVES</h3>
            <p>pour renforcer notre argumentation et la bataille des idées dans nos AG nos tracts</p>
          </div>
          
          <div className={`${styles.crossSection} ${styles.droitsSection}`}>
            <h3 className={styles.sectionTitle}>DROITS ET MOYENS</h3>
            <p>Pour faire vivre la démarche</p>
          </div>
          
          <div className={`${styles.crossSection} ${styles.federationSection}`}>
            <h3 className={styles.sectionTitle}>UL UD FD UGICT</h3>
            <p>pour soutenir l'action et renforcer les Contenus REVENDICATIFS sur les enjeux Locaux Interpro Pro Spécifiques</p>
          </div>
        </div>
      </div>
      
      <div className={styles.jourJ}>
        <div className={styles.jourJTitle}>JOUR J</div>
        <div>DE LUTTE</div>
      </div>
    </div>
  );
}

export default SchemaGlobal;