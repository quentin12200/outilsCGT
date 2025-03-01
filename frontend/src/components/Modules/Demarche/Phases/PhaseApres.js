// frontend/src/components/DemarcheModule/Phases/PhaseApres.js

import React from 'react';

// Version simplifiée du composant PhaseApres
function PhaseApres() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Phase de bilan : Après...</h3>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h4 className="font-semibold mb-2">À propos de cette phase</h4>
        <p>
          La phase "Après" permet de faire le bilan de la démarche, d'analyser les résultats obtenus
          et de préparer les prochaines étapes. C'est un moment crucial pour capitaliser sur l'expérience
          acquise et renforcer la CGT.
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

export default PhaseApres;