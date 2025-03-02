// DemarchePage.js
import React, { useState } from 'react';
import styles from './DemarchePage.module.css';
import TabNav from '../../components/DemarcheModule/TabNav';
import SchemaGlobal from '../../components/DemarcheModule/SchemaGlobal';
import PhaseAvant from '../../components/DemarcheModule/Phases/PhaseAvant';
import PhasePendant from '../../components/DemarcheModule/Phases/PhasePendant';
import PhaseApres from '../../components/DemarcheModule/Phases/PhaseApres';

function DemarchePage() {
  const [activePhase, setActivePhase] = useState('schema');
  const [activeEtape, setActiveEtape] = useState(null);

  // Définition des phases
  const phases = [
    { id: 'schema', label: 'Vue d\'ensemble', color: 'bg-red-700' },
    { id: 'avant', label: 'Avant...', color: 'bg-yellow-600' },
    { id: 'pendant', label: 'Pendant...', color: 'bg-green-600' },
    { id: 'apres', label: 'Après...', color: 'bg-blue-600' }
  ];

  const handlePhaseChange = (phaseId) => {
    setActivePhase(phaseId);
    setActiveEtape(null);
  };

  const handleEtapeChange = (etapeId) => {
    setActiveEtape(etapeId);
    
    if (etapeId === 'besoins') {
      setActivePhase('avant');
    } else if (['revendications', 'mobilisation'].includes(etapeId)) {
      setActivePhase('pendant');
    }
  };

  return (
    <div className={styles.demarchePage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>École de la Démocratie Syndicale</h1>
          <p className={styles.subtitle}>
            Guide pour une démarche syndicale démocratique en trois phases
          </p>
        </div>
        
        <div className={styles.quote}>
          <blockquote>
            "La démarche, c'est mener la bataille revendicative, c'est la construction de la mobilisation pour gagner!"
          </blockquote>
        </div>
        
        <div className={styles.description}>
          <p>
            C'est la capacité de chaque syndicat CGT à déployer à partir de sa force organisée sa DÉMARCHE DÉMOCRATIQUE pour bâtir un CAHIER REVENDICATIF répondant aux besoins exprimés au plus près des postes de travail et convaincre par la bataille d'idée le plus grand nombre de salariés à décider de se mobiliser au Vote CGT, à la syndicalisation CGT, entrer dans l'action CGT pour GAGNER !
          </p>
        </div>
        
        <div className={styles.content}>
          <TabNav 
            tabs={phases} 
            activeTab={activePhase} 
            onTabChange={handlePhaseChange}
          />
          
          <div className={styles.phaseContent}>
            {activePhase === 'schema' && (
              <SchemaGlobal onSelectEtape={handleEtapeChange} />
            )}
            
            {activePhase === 'avant' && (
              <PhaseAvant activeEtape={activeEtape} onSelectEtape={handleEtapeChange} />
            )}
            
            {activePhase === 'pendant' && (
              <PhasePendant activeEtape={activeEtape} onSelectEtape={handleEtapeChange} />
            )}
            
            {activePhase === 'apres' && (
              <PhaseApres />
            )}
          </div>
        </div>
        
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Documents et ressources</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📄</div>
              <h3 className={styles.infoCardTitle}>Guide complet</h3>
              <p className={styles.infoCardDescription}>
                Téléchargez le guide complet de la démarche démocratique CGT au format PDF.
              </p>
              <button className={styles.infoButton}>Télécharger</button>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🗂️</div>
              <h3 className={styles.infoCardTitle}>Fiches pratiques</h3>
              <p className={styles.infoCardDescription}>
                Accédez à l'ensemble des fiches pratiques pour chaque étape de la démarche.
              </p>
              <button className={styles.infoButton}>Voir les fiches</button>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📊</div>
              <h3 className={styles.infoCardTitle}>Modèles de documents</h3>
              <p className={styles.infoCardDescription}>
                Téléchargez des modèles de documents pour chacune des étapes.
              </p>
              <button className={styles.infoButton}>Accéder aux modèles</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemarchePage;