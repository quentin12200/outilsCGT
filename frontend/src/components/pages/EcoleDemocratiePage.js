// src/components/pages/EcoleDemocratiePage.js
import React, { useState } from 'react';
import TabNav from '../Modules/Demarche/TabNav';
import SchemaGlobal from '../Modules/Demarche/SchemaGlobal';
import PhaseAvant from '../Modules/Demarche/Phases/PhaseAvant';
import PhasePendant from '../Modules/Demarche/Phases/PhasePendant';
import PhaseApres from '../Modules/Demarche/Phases/PhaseApres';

function EcoleDemocratiePage() {
  // États pour gérer la navigation entre les phases et les étapes
  const [activePhase, setActivePhase] = useState('schema');
  const [activeEtape, setActiveEtape] = useState(null);

  // Définition des phases disponibles avec leurs propriétés
  const phases = [
    { id: 'schema', label: 'Vue d\'ensemble', color: 'bg-red-700' },
    { id: 'avant', label: 'Avant...', color: 'bg-yellow-600' },
    { id: 'pendant', label: 'Pendant...', color: 'bg-green-600' },
    { id: 'apres', label: 'Après...', color: 'bg-blue-600' }
  ];

  // Fonction appelée quand l'utilisateur change de phase
  const handlePhaseChange = (phaseId) => {
    setActivePhase(phaseId);
    setActiveEtape(null);
  };

  // Fonction appelée quand l'utilisateur change d'étape
  const handleEtapeChange = (etapeId) => {
    setActiveEtape(etapeId);
    
    // Si on sélectionne une étape, on bascule aussi vers la phase correspondante
    if (etapeId === 'besoins') {
      setActivePhase('avant');
    } else if (['revendications', 'mobilisation'].includes(etapeId)) {
      setActivePhase('pendant');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-red-700 mb-2">École de la Démocratie</h1>
        <p className="text-lg text-gray-600">
          La démarche démocratique CGT pour une action syndicale efficace
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8">
          <blockquote className="border-l-4 border-red-600 pl-4 italic">
            "La démarche, c'est mener la bataille revendicative, c'est la construction de la mobilisation pour gagner!"
          </blockquote>
          <p className="mt-2">
            C'est la capacité de chaque syndicat CGT à déployer à partir de sa force organisée sa DÉMARCHE 
            DÉMOCRATIQUE pour bâtir un CAHIER REVENDICATIF répondant aux besoins exprimés au plus près des postes 
            de travail et convaincre par la bataille d'idée le plus grand nombre de salariés à décider de se mobiliser au 
            Vote CGT, à la syndicalisation CGT, entrer dans l'action CGT pour GAGNER !
          </p>
        </div>

        {/* Navigation entre les phases */}
        <TabNav 
          tabs={phases} 
          activeTab={activePhase} 
          onTabChange={handlePhaseChange}
        />

        {/* Contenu spécifique à la phase active */}
        <div className="mt-6">
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