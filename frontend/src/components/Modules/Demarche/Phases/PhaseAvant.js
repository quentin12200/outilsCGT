// frontend/src/components/DemarcheModule/Phases/PhaseAvant.js

import React from 'react';
import BesoinsEtape from '../Etapes/BesoinsEtape';

// Ce composant représente la phase "Avant" de la démarche démocratique CGT
// Il reçoit deux propriétés :
// - activeEtape : l'identifiant de l'étape actuellement active
// - onSelectEtape : une fonction à appeler quand l'utilisateur change d'étape
function PhaseAvant({ activeEtape, onSelectEtape }) {
  // Définir les étapes spécifiques à cette phase
  const etapes = [
    { id: 'besoins', label: '1ère Étape: BESOINS', color: 'bg-yellow-500' },
    { id: 'analyses', label: 'Analyses préparatoires', color: 'bg-orange-500' }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Phase préparatoire : Avant...</h3>
      
      {/* Introduction à la phase "Avant" */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h4 className="font-semibold mb-2">Objectifs de cette phase</h4>
        <p>
          La phase "Avant" est cruciale pour préparer le terrain. Elle consiste à analyser la situation,
          comprendre les besoins des salariés, et organiser la démarche syndicale. C'est ici que nous
          posons les fondations pour une campagne électorale réussie.
        </p>
      </div>
      
      {/* Navigation entre les étapes de cette phase */}
      <div className="flex border-b mb-4">
        {etapes.map(etape => (
          <button
            key={etape.id}
            className={`px-4 py-2 font-medium rounded-t transition ${
              activeEtape === etape.id 
                ? `${etape.color} text-white` 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onSelectEtape(etape.id)}
          >
            {etape.label}
          </button>
        ))}
      </div>
      
      {/* Affichage du contenu selon l'étape active */}
      <div className="mt-6">
        {/* Si aucune étape n'est active ou si l'étape "besoins" est active, on affiche BesoinsEtape */}
        {(!activeEtape || activeEtape === 'besoins') && (
          <BesoinsEtape />
        )}
        
        {/* Si l'étape "analyses" est active, on affiche le contenu correspondant */}
        {activeEtape === 'analyses' && (
          <div>
            <h4 className="text-lg font-semibold mb-4">Analyses stratégiques</h4>
            
            <div className="bg-white border p-4 rounded mb-4">
              <h5 className="font-bold">Analyse du dernier scrutin</h5>
              <p>Guide pour analyser les résultats précédents et en tirer des enseignements.</p>
              <button className="mt-2 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
                Télécharger l'outil d'analyse
              </button>
            </div>
            
            <div className="bg-white border p-4 rounded mb-4">
              <h5 className="font-bold">Ratio syndiqués CGT / voix CGT / salariés</h5>
              <p>Outil pour évaluer votre potentiel de progression et identifier les secteurs prioritaires.</p>
              <button className="mt-2 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
                Calculer votre potentiel
              </button>
            </div>
            
            <div className="bg-white border p-4 rounded">
              <h5 className="font-bold">Cartographie de l'entreprise</h5>
              <p>Modèle pour établir une cartographie détaillée des services et catégories professionnelles.</p>
              <button className="mt-2 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
                Télécharger le modèle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhaseAvant;