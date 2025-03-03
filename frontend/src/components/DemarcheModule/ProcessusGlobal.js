// src/components/DemarcheModule/ProcessusGlobal.js
import React from 'react';

function ProcessusGlobal({ onSelectPhase }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-red-700 mb-6">La démarche revendicative CGT</h2>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <p className="mb-4">
          La démarche revendicative CGT est un processus démocratique en plusieurs phases qui place les salariés 
          au cœur de l'action syndicale. Cette démarche permet de construire des revendications légitimes 
          qui répondent aux besoins réels exprimés par les salariés.
        </p>
        <p>
          Elle s'appuie sur la consultation et la participation active des salariés à toutes les étapes, 
          de l'identification des besoins jusqu'à l'action pour obtenir satisfaction.
        </p>
      </div>
      
      <div className="relative mb-12 mt-16">
        {/* Représentation visuelle du processus */}
        <div className="absolute left-0 right-0 top-1/2 h-2 bg-gray-300 transform -translate-y-1/2"></div>
        
        <div className="relative flex justify-between">
          {/* Phase 1: Recueil des besoins */}
          <div className="relative w-1/4 flex flex-col items-center">
            <button 
              onClick={() => onSelectPhase('besoins')}
              className="z-10 w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl mb-4 hover:bg-red-700 transition transform hover:scale-110"
            >
              1
            </button>
            <h3 className="font-bold text-center">Recueil des besoins</h3>
            <p className="text-center text-sm mt-2">Consultation des salariés, écoute active</p>
          </div>
          
          {/* Phase 2: Construction revendicative */}
          <div className="relative w-1/4 flex flex-col items-center">
            <button 
              onClick={() => onSelectPhase('revendications')}
              className="z-10 w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl mb-4 hover:bg-red-700 transition transform hover:scale-110"
            >
              2
            </button>
            <h3 className="font-bold text-center">Construction revendicative</h3>
            <p className="text-center text-sm mt-2">Élaboration démocratique des cahiers revendicatifs</p>
          </div>
          
          {/* Phase 3: Mobilisation */}
          <div className="relative w-1/4 flex flex-col items-center">
            <button 
              onClick={() => onSelectPhase('mobilisation')}
              className="z-10 w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl mb-4 hover:bg-red-700 transition transform hover:scale-110"
            >
              3
            </button>
            <h3 className="font-bold text-center">Mobilisation</h3>
            <p className="text-center text-sm mt-2">Bataille des idées, convaincre et rassembler</p>
          </div>
          
          {/* Phase 4: Action / Lutte */}
          <div className="relative w-1/4 flex flex-col items-center">
            <button 
              onClick={() => onSelectPhase('action')}
              className="z-10 w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl mb-4 hover:bg-red-700 transition transform hover:scale-110"
            >
              4
            </button>
            <h3 className="font-bold text-center">Action / Lutte</h3>
            <p className="text-center text-sm mt-2">Moyens d'action adaptés pour gagner</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Principes fondamentaux</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-red-700 mb-2">Démocratie syndicale</h4>
            <p className="text-gray-700">
              Les syndiqués sont auteurs, acteurs et décideurs de la démarche revendicative.
              Le syndicat construit démocratiquement ses orientations et ses actions.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-red-700 mb-2">Démocratie ouvrière</h4>
            <p className="text-gray-700">
              Les salariés sont consultés et associés à toutes les étapes du processus.
              Leurs besoins et leurs aspirations sont au cœur de la démarche revendicative.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-red-700 mb-2">Bataille des idées</h4>
            <p className="text-gray-700">
              Les repères revendicatifs CGT et les valeurs du syndicalisme de classe guident
              notre démarche et notre argumentation pour convaincre.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-red-700 mb-2">Rapport de force</h4>
            <p className="text-gray-700">
              La CGT construit le rapport de force nécessaire pour faire aboutir les revendications
              des salariés, par la mobilisation et l'action collective.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Articulation avec les autres outils</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium text-red-700 mb-2">Cartographie</h4>
            <p className="text-sm text-gray-700 mb-2">
              Identifiez les zones prioritaires pour votre action syndicale
            </p>
            <a href="/cartographie" className="text-blue-600 text-sm hover:underline">
              Accéder à l'outil →
            </a>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium text-red-700 mb-2">Rétro-planning</h4>
            <p className="text-sm text-gray-700 mb-2">
              Planifiez vos actions syndicales dans le temps pour ne rien oublier
            </p>
            <a href="/retro-planning" className="text-blue-600 text-sm hover:underline">
              Accéder à l'outil →
            </a>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium text-red-700 mb-2">École de la Démocratie</h4>
            <p className="text-sm text-gray-700 mb-2">
              Apprenez les fondamentaux de la démarche démocratique CGT
            </p>
            <a href="/ecole-de-la-democratie" className="text-blue-600 text-sm hover:underline">
              Accéder à l'outil →
            </a>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium text-red-700 mb-2">Syndicalisation</h4>
            <p className="text-sm text-gray-700 mb-2">
              Renforcez votre syndicat pour augmenter votre rapport de force
            </p>
            <a href="/syndicalisation" className="text-blue-600 text-sm hover:underline">
              Accéder à l'outil →
            </a>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium text-red-700 mb-2">Assemblées</h4>
            <p className="text-sm text-gray-700 mb-2">
              Organisez des AG efficaces pour faire vivre la démocratie syndicale
            </p>
            <a href="/assemblees" className="text-blue-600 text-sm hover:underline">
              Accéder à l'outil →
            </a>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium text-red-700 mb-2">Résultats</h4>
            <p className="text-sm text-gray-700 mb-2">
              Analysez vos résultats électoraux pour ajuster votre stratégie
            </p>
            <a href="/resultats" className="text-blue-600 text-sm hover:underline">
              Accéder à l'outil →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessusGlobal;