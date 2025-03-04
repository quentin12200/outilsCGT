// src/components/pages/EcoleDemocratiePage.js
import React, { useState } from 'react';
import styles from './EcoleDemocratiePage.module.css';
import TabNav from '../Modules/Demarche/TabNav';
import SchemaGlobal from '../Modules/Demarche/SchemaGlobal';
import PhaseAvant from '../Modules/Demarche/Phases/PhaseAvant';
import PhasePendant from '../Modules/Demarche/Phases/PhasePendant';
import PhaseApres from '../Modules/Demarche/Phases/PhaseApres';

function EcoleDemocratiePage() {
  const [activePhase, setActivePhase] = useState('schema');
  const [activeEtape, setActiveEtape] = useState(null);

  const phases = [
    { id: 'schema', label: "Vue d'ensemble", color: 'red' },
    { id: 'avant', label: 'Avant...', color: 'yellow' },
    { id: 'pendant', label: 'Pendant...', color: 'green' },
    { id: 'apres', label: 'Après...', color: 'blue' }
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
        <h1 className={styles.title}>École de la Démocratie</h1>
        <p className={styles.subtitle}>
          La démarche démocratique CGT pour une action syndicale efficace
        </p>
      </header>

      <div className={styles.card}>
        <blockquote className={styles.quote}>
          "La démarche, c'est mener la bataille revendicative, c'est la construction de la mobilisation pour gagner!"
        </blockquote>
        <p className={styles.description}>
          C'est la capacité de chaque syndicat CGT à déployer à partir de sa force organisée sa DÉMARCHE
          DÉMOCRATIQUE pour bâtir un CAHIER REVENDICATIF répondant aux besoins exprimés au plus près des postes
          de travail et convaincre par la bataille d'idée le plus grand nombre de salariés à décider de se mobiliser au
          Vote CGT, à la syndicalisation CGT, entrer dans l'action CGT pour GAGNER !
        </p>

        {/* Navigation entre les phases */}
        <TabNav 
          tabs={phases} 
          activeTab={activePhase} 
          onTabChange={handlePhaseChange}
        />

        {/* Contenu spécifique à la phase active */}
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
    </div>
  );
}

export default EcoleDemocratiePage;
