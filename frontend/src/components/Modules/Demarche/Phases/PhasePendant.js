// frontend/src/components/DemarcheModule/Phases/PhasePendant.js

import React from 'react';

// Version simplifiée du composant PhasePendant
function PhasePendant({ activeEtape, onSelectEtape }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Phase d'exécution : Pendant...</h3>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h4 className="font-semibold mb-2">À propos de cette phase</h4>
        <p>
          La phase "Pendant" est le moment où l'on traduit les besoins recueillis en revendications concrètes,
          puis où l'on mobilise les salariés autour de ces revendications. C'est le cœur de l'action syndicale.
        </p>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
        <p className="italic">
          Ce contenu sera développé dans une prochaine version de l'application.
        </p>
      </div>
    </div>
  );
}

export default PhasePendant;