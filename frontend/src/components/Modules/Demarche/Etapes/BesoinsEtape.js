// frontend/src/components/DemarcheModule/Etapes/BesoinsEtape.js

import React from 'react';

// Ce composant représente l'étape "Besoins" de la démarche démocratique CGT
function BesoinsEtape() {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">1ère Étape : BESOINS</h4>
      
      {/* Encadré d'introduction avec fond jaune clair */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <p className="font-medium">
          Cette étape cruciale consiste à aller à la rencontre des salariés pour recueillir leurs besoins,
          leurs attentes et leurs préoccupations. C'est le fondement d'une démarche CGT authentiquement démocratique.
        </p>
      </div>
      
      {/* Deux cartes côte à côte (ou l'une sous l'autre sur mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Première carte : AG Syndiqués */}
        <div className="bg-white border rounded-lg shadow p-4">
          <h5 className="font-bold text-red-700 mb-3">AG Syndiqués : auteurs, acteurs, décideurs</h5>
          <p className="mb-3">
            L'Assemblée Générale des syndiqués est le moment clé pour présenter la démarche et organiser le recueil des besoins.
          </p>
          <ul className="list-disc pl-5 mb-3">
            <li>Présentation des enjeux du contexte</li>
            <li>Présentation de la démarche</li>
            <li>Présentation des outils</li>
          </ul>
          <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
            Guide d'animation d'AG
          </button>
        </div>
        
        {/* Deuxième carte : Déploiement sur le terrain */}
        <div className="bg-white border rounded-lg shadow p-4">
          <h5 className="font-bold text-red-700 mb-3">Déploiement sur le terrain</h5>
          <p className="mb-3">
            Organisation du déploiement des syndiqués avec les outils appropriés pour aller au plus près des salariés.
          </p>
          <ul className="list-disc pl-5 mb-3">
            <li>Outils de questionnaires besoins</li>
            <li>Tournées de services avec les élus</li>
            <li>Rencontres individuelles</li>
          </ul>
          <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
            Outils de déploiement
          </button>
        </div>
      </div>
      
      {/* Section des outils pratiques */}
      <div className="bg-white border rounded-lg shadow p-4">
        <h5 className="font-bold text-red-700 mb-3">Outils pratiques pour le recueil des besoins</h5>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Outil 1 */}
          <div className="border p-3 rounded">
            <h6 className="font-semibold">Questionnaire besoins</h6>
            <p className="text-sm mt-2">Modèle de questionnaire à adapter par service et catégorie.</p>
            <button className="mt-2 text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
              Télécharger
            </button>
          </div>
          
          {/* Outil 2 */}
          <div className="border p-3 rounded">
            <h6 className="font-semibold">Check-list tournées</h6>
            <p className="text-sm mt-2">Organisation des tournées de services avec les points à aborder.</p>
            <button className="mt-2 text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
              Télécharger
            </button>
          </div>
          
          {/* Outil 3 */}
          <div className="border p-3 rounded">
            <h6 className="font-semibold">Fiche synthèse besoins</h6>
            <p className="text-sm mt-2">Pour compiler et analyser les besoins recueillis.</p>
            <button className="mt-2 text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
              Télécharger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BesoinsEtape;