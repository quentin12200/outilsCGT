// src/components/RetroplanningModule/RetroplanningMain.js
import React, { useState } from 'react';
import Timeline from './Timeline';
import PhasePlanning from './PhasePlanning';

function RetroplanningMain() {
  const [selectedPhase, setSelectedPhase] = useState(null);
  
  // Définition des phases du rétro-planning selon le document
  const phases = [
    { 
      id: 'analyse', 
      title: 'Analyse et Organisation', 
      description: 'État des lieux, ciblage, anticipation', 
      color: 'bg-blue-500' 
    },
    { 
      id: 'besoins', 
      title: '1ère Étape: Besoins', 
      description: 'Recueil des besoins auprès des salariés', 
      color: 'bg-yellow-500' 
    },
    { 
      id: 'revendications', 
      title: '2ème Étape: Revendications', 
      description: 'Élaboration du cahier revendicatif', 
      color: 'bg-green-500' 
    },
    { 
      id: 'mobilisation', 
      title: '3ème Étape: Mobilisation', 
      description: 'Organisation de la mobilisation', 
      color: 'bg-red-600' 
    },
    { 
      id: 'jourj', 
      title: 'Jour J', 
      description: 'Jour du scrutin, remise des timbres ou journée de lutte', 
      color: 'bg-purple-600' 
    },
    { 
      id: 'bilan', 
      title: 'Bilan et Perspectives', 
      description: 'Analyse des résultats et préparation des prochaines étapes', 
      color: 'bg-indigo-500' 
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-red-600 mb-4">Rétro-planning de la démarche syndicale</h2>
      
      <div className="mb-8">
        <p className="text-gray-700 mb-4">
          Le rétro-planning vous permet d'organiser votre action syndicale dans le temps, 
          en préparant chaque étape nécessaire à la réussite de votre démarche. 
          Sélectionnez une phase pour afficher les actions correspondantes.
        </p>
        
        <Timeline 
          phases={phases} 
          selectedPhase={selectedPhase} 
          onSelectPhase={setSelectedPhase} 
        />
      </div>
      
      {selectedPhase && (
        <PhasePlanning phase={phases.find(p => p.id === selectedPhase)} />
      )}
    </div>
  );
}

export default RetroplanningMain;