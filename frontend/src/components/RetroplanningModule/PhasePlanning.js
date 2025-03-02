// src/components/RetroplanningModule/PhasePlanning.js
import React from 'react';

function PhasePlanning({ phase }) {
  // Contenu spécifique à chaque phase
  const phaseContent = {
    analyse: {
      title: "Analyse et Organisation",
      description: "Cette phase préparatoire consiste à analyser la situation actuelle, identifier les enjeux et cibler les priorités.",
      actions: [
        "Faire l'état des lieux de la syndicalisation par service",
        "Analyser les résultats du précédent scrutin",
        "Établir une cartographie de l'établissement",
        "Identifier les zones prioritaires d'intervention",
        "Préparer un calendrier d'actions"
      ]
    },
    besoins: {
      title: "1ère Étape: Recueil des besoins",
      description: "Cette étape consiste à aller à la rencontre des salariés pour recueillir leurs attentes et préoccupations.",
      actions: [
        "Organiser une AG des syndiqués pour présenter la démarche",
        "Distribuer des questionnaires par service et catégorie",
        "Organiser des tournées de services avec les élus",
        "Compiler et synthétiser les besoins exprimés"
      ]
    },
    // Autres phases à compléter selon le même modèle
  };

  const content = phaseContent[phase.id] || {
    title: phase.title,
    description: "Contenu en cours de développement.",
    actions: []
  };

  return (
    <div className={`border-l-4 ${phase.color} rounded-r-lg bg-white p-6 shadow-lg`}>
      <h3 className="text-xl font-bold mb-4">{content.title}</h3>
      <p className="mb-6 text-gray-700">{content.description}</p>
      
      {content.actions.length > 0 && (
        <div>
          <h4 className="font-bold mb-3">Actions à mener :</h4>
          <ul className="list-disc pl-5 space-y-2">
            {content.actions.map((action, index) => (
              <li key={index} className="text-gray-800">{action}</li>
            ))}
          </ul>
        </div>
      )}
      
      <button className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Télécharger le planning détaillé
      </button>
    </div>
  );
}

export default PhasePlanning;