// src/components/DemarcheModule/PhaseBesoins.js
import React from 'react';

function PhaseBesoins({ onAddTool }) {
  // Outils associés à cette phase
  const tools = [
    'Questionnaire besoins',
    'Planning de tournées',
    'Fiche de synthèse',
    'Module Cartographie'
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-red-700 mb-6">Phase 1 : Recueil des besoins</h2>
      
      <div className="bg-red-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium mb-3">Objectifs de cette phase</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Recueillir les préoccupations, les attentes et les besoins des salariés</li>
          <li>Établir un contact direct et régulier avec tous les salariés, syndiqués ou non</li>
          <li>Analyser et synthétiser les besoins exprimés pour préparer la phase suivante</li>
          <li>Renforcer l'image d'un syndicat à l'écoute et proche des salariés</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Démarche méthodologique</h3>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-red-700 mb-2">1. Préparation</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Tenir une AG des syndiqués pour présenter la démarche</li>
                <li>Réaliser une cartographie de l'établissement (services, catégories...)</li>
                <li>Préparer les outils de recueil (questionnaires, grilles d'entretien...)</li>
                <li>Planifier les tournées de services</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-red-700 mb-2">2. Déploiement sur le terrain</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Organiser des tournées de services régulières</li>
                <li>Réaliser des entretiens individuels ou collectifs</li>
                <li>Distribuer et collecter des questionnaires</li>
                <li>Tenir des permanences syndicales</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-red-700 mb-2">3. Analyse et synthèse</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Compiler et classer les besoins par thématiques</li>
                <li>Identifier les problématiques communes et récurrentes</li>
                <li>Prioriser les sujets selon leur importance pour les salariés</li>
                <li>Préparer une synthèse pour la phase de construction revendicative</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Conseils pratiques</h3>
          
          <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-200 mb-6">
            <h4 className="font-medium text-yellow-800 mb-2">Points d'attention</h4>
            <ul className="list-disc pl-5 space-y-2 text-yellow-800">
              <li>Veiller à toucher <strong>tous les services</strong> et <strong>toutes les catégories</strong> de personnel</li>
              <li>Écouter <strong>sans a priori</strong>, même si certaines expressions peuvent paraître éloignées des positions CGT</li>
              <li>Prendre en compte les <strong>spécificités</strong> (jeunes, femmes, précaires, cadres...)</li>
              <li>Être <strong>régulier</strong> dans les visites et les contacts</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
            <h4 className="font-medium text-red-700 mb-2">Outils recommandés</h4>
            <div className="space-y-2">
              {tools.map(tool => (
                <div key={tool} className="flex items-center justify-between">
                  <span>{tool}</span>
                  <button
                    onClick={() => onAddTool(tool)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    + Ajouter à ma boîte
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Indicateurs de réussite</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800">
              <li>Nombre de salariés consultés / Taux de couverture de l'établissement</li>
              <li>Richesse et diversité des besoins exprimés</li>
              <li>Qualité de la documentation et de la synthèse des besoins</li>
              <li>Impact sur l'image du syndicat (nouveaux contacts, adhésions...)</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Exemples de questionnaires</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-red-700 mb-2">Questionnaire général</h4>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-800 mb-3">
                <strong>Conditions de travail</strong>
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Comment évaluez-vous votre charge de travail actuelle ?</li>
                <li>Disposez-vous des moyens nécessaires pour réaliser votre travail correctement ?</li>
                <li>Quels sont les principaux facteurs de stress dans votre activité ?</li>
                <li>Quelles améliorations prioritaires souhaiteriez-vous concernant vos conditions de travail ?</li>
              </ul>
              
              <p className="text-sm text-gray-800 mt-4 mb-3">
                <strong>Rémunération</strong>
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Votre rémunération vous semble-t-elle en adéquation avec votre travail ?</li>
                <li>Quelle évolution de carrière envisagez-vous ?</li>
                <li>Quelles mesures permettraient de mieux reconnaître votre travail ?</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-red-700 mb-2">Questionnaire spécifique</h4>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-800 mb-3">
                <strong>Télétravail</strong>
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Combien de jours de télétravail effectuez-vous actuellement ?</li>
                <li>Quels sont les avantages et inconvénients du télétravail pour vous ?</li>
                <li>Quelles améliorations souhaiteriez-vous concernant l'organisation du télétravail ?</li>
                <li>Quelles mesures vous aideraient à mieux concilier vie professionnelle et vie personnelle ?</li>
              </ul>
              
              <p className="text-sm text-gray-800 mt-4 mb-3">
                <strong>Égalité professionnelle</strong>
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Avez-vous constaté des inégalités de traitement dans votre service ?</li>
                <li>Quelles mesures permettraient de mieux garantir l'égalité femmes/hommes ?</li>
                <li>Quelles actions pour favoriser l'évolution professionnelle de tous et toutes ?</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button 
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
            onClick={() => onAddTool('Questionnaire besoins')}
          >
            Télécharger les modèles de questionnaires
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhaseBesoins;
