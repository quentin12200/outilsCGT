// src/components/pages/EcoleDemocratiePage.js
import React, { useState } from 'react';
import styles from './EcoleDemocratiePage.module.css';  // Import avec le nom "styles"
import TabNav from '../Modules/Demarche/TabNav';
import SchemaGlobal from '../Modules/Demarche/SchemaGlobal';
import PhaseAvant from '../Modules/Demarche/Phases/PhaseAvant';
import PhasePendant from '../Modules/Demarche/Phases/PhasePendant';
import PhaseApres from '../Modules/Demarche/Phases/PhaseApres';

function EcoleDemocratiePage() {
  const [activePhase, setActivePhase] = useState('schema');
  const [activeEtape, setActiveEtape] = useState(null);

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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>École de la Démocratie</h1>
        <p className={styles.pageSubtitle}>
          La démarche démocratique CGT pour une action syndicale efficace
        </p>
      </header>

      <div className={styles.mainContent}>
        <div>
          <blockquote className={styles.quote}>
            "La démarche, c'est mener la bataille revendicative, c'est la construction de la mobilisation pour gagner!"
          </blockquote>
          <p className={styles.description}>
            C'est la capacité de chaque syndicat CGT à déployer à partir de sa force organisée sa DÉMARCHE 
            DÉMOCRATIQUE pour bâtir un CAHIER REVENDICATIF répondant aux besoins exprimés au plus près des postes 
            de travail et convaincre par la bataille d'idée le plus grand nombre de salariés à décider de se mobiliser au 
            Vote CGT, à la syndicalisation CGT, entrer dans l'action CGT pour GAGNER !
          </p>
        </div>

        <div className={styles.tabContainer}>
          <TabNav 
            tabs={phases} 
            activeTab={activePhase} 
            onTabChange={handlePhaseChange}
          />
        </div>

        <div className={styles.contentSection}>
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
    </div>
  );
}

export default EcoleDemocratiePage;