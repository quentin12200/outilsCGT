// frontend/src/components/DemarcheModule/SchemaGlobal.js

import React from 'react';

// Ce composant représente le schéma global de la démarche démocratique CGT
// Il reçoit une propriété :
// - onSelectEtape : une fonction à appeler quand l'utilisateur clique sur une étape
function SchemaGlobal({ onSelectEtape }) {
  return (
    <div className="relative">
      {/* Titres des phases */}
      <div className="flex justify-between mb-8 text-xl font-bold">
        <div className="w-1/3 text-center">Avant...</div>
        <div className="w-1/3 text-center">Pendant...</div>
        <div className="w-1/3 text-center">Après...</div>
      </div>
      
      {/* Contenu principal */}
      <div className="flex">
        {/* Colonne Vie Syndicale */}
        <div className="w-1/6 bg-purple-700 text-white p-4 rounded-l-lg">
          <div className="transform -rotate-90 origin-center text-2xl font-bold h-64 flex items-center justify-center">
            VIE SYNDICALE
          </div>
        </div>
        
        {/* Phases du processus */}
        <div className="w-5/6">
          {/* Organisation */}
          <div className="bg-green-200 p-4 mb-4 rounded-r-lg">
            <h3 className="font-bold text-lg mb-2">ORGANISATION</h3>
            <ul className="list-disc pl-5">
              <li>Critères représentativité</li>
              <li>Connaissance fine salariat</li>
              <li>Bilan Pratiques démocratiques</li>
              <li>Bilan informations formation</li>
              <li>Bilan activité IRP élus</li>
              <li>Bilan Droits planning militant</li>
              <li>Bilan financiers</li>
              <li>Analyse dernier scrutin</li>
              <li>Analyse dernière campagne</li>
              <li>Bilan communication</li>
              <li>Liens UL UD FD</li>
            </ul>
          </div>
          
          {/* Les trois étapes clés */}
          <div className="flex space-x-4 mb-4">
            {/* Étape 1 : Besoins */}
            <button 
              onClick={() => onSelectEtape('besoins')}
              className="w-1/3 bg-yellow-500 hover:bg-yellow-600 p-4 rounded-lg text-white transition"
            >
              <h3 className="font-bold text-lg mb-2">1ère Étape BESOINS</h3>
              <div className="text-left">
                <p>AG Syndiqués auteurs acteurs décideurs</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Présentation des enjeux, du contexte...</li>
                  <li>Déploiement avec outils...</li>
                </ul>
              </div>
            </button>
            
            {/* Étape 2 : Revendications */}
            <button 
              onClick={() => onSelectEtape('revendications')}
              className="w-1/3 bg-green-500 hover:bg-green-600 p-4 rounded-lg text-white transition"
            >
              <h3 className="font-bold text-lg mb-2">2ème Étape REVENDICATIONS</h3>
              <div className="text-left">
                <p>AG Syndiqués auteurs acteurs décideurs</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Bilan besoins</li>
                  <li>Élaboration démocratique du cahier revendicatif</li>
                </ul>
              </div>
            </button>
            
            {/* Étape 3 : Mobilisation */}
            <button 
              onClick={() => onSelectEtape('mobilisation')}
              className="w-1/3 bg-blue-500 hover:bg-blue-600 p-4 rounded-lg text-white transition"
            >
              <h3 className="font-bold text-lg mb-2">3ème étape MOBILISATION</h3>
              <div className="text-left">
                <p>AG salariés</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Pointage des syndiqués</li>
                  <li>Rappel des salariés soutenus</li>
                </ul>
              </div>
            </button>
          </div>
          
          {/* Sections transversales */}
          <div className="bg-yellow-100 p-4 mb-4 rounded-lg">
            <h3 className="font-bold">COMMUNICATION</h3>
            <p>actions et outils pour soutenir et faire vivre la bataille des idées pour convaincre</p>
          </div>
          
          <div className="bg-orange-100 p-4 mb-4 rounded-lg">
            <h3 className="font-bold">IRP PREROGATIVES</h3>
            <p>pour renforcer notre argumentation et la bataille des idées dans nos AG nos tracts</p>
          </div>
          
          <div className="bg-red-100 p-4 mb-4 rounded-lg">
            <h3 className="font-bold">DROITS ET MOYENS</h3>
            <p>Pour faire vivre la démarche</p>
          </div>
          
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-bold">UL UD FD UGICT</h3>
            <p>pour soutenir l'action et renforcer les Contenus REVENDICATIFS sur les enjeux Locaux Interpro Pro Spécifiques</p>
          </div>
        </div>
      </div>
      
      {/* Jour J */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-700 text-white p-6 rounded-l-full shadow-lg">
        <div className="font-bold text-2xl">JOUR J</div>
        <div>DE LUTTE</div>
      </div>
    </div>
  );
}

export default SchemaGlobal;