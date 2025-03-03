// src/components/ResultatsModule/ElectionAnalysis.js
import React from 'react';

function ElectionAnalysis({ results }) {
  // Analyze CGT performance
  const analyzePerformance = () => {
    if (results.cgtScore >= 50) {
      return {
        status: 'excellent',
        message: 'Position majoritaire! La CGT a obtenu une majorité absolue, ce qui renforce considérablement le rapport de force en faveur des salariés.',
        recommendations: [
          'Consolider cette position en renforçant la syndicalisation',
          'Transformer ce capital électoral en avancées concrètes pour les salariés',
          'Communiquer régulièrement sur les actions du syndicat pour maintenir la confiance'
        ]
      };
    } else if (results.cgtScore >= 30) {
      return {
        status: 'good',
        message: 'Bonne performance! La CGT dispose d\'une influence significative dans l\'établissement.',
        recommendations: [
          'Élargir la base syndicale en ciblant les services moins syndiqués',
          'Renforcer les actions de terrain pour consolider ce score',
          'Analyser les secteurs où la CGT est moins présente pour adapter la stratégie'
        ]
      };
    } else if (results.cgtScore >= 20) {
      return {
        status: 'average',
        message: 'Résultat encourageant mais avec une marge de progression importante.',
        recommendations: [
          'Renforcer la visibilité des actions CGT auprès des salariés',
          'Développer un plan de syndicalisation ciblé',
          'Améliorer la communication sur les positions et propositions CGT'
        ]
      };
    } else {
      return {
        status: 'weak',
        message: 'Une position à consolider rapidement pour renforcer la CGT dans l\'établissement.',
        recommendations: [
          'Établir un diagnostic précis des freins au vote CGT',
          'Mettre en place un plan d\'urgence de déploiement sur le terrain',
          'Renouveler les méthodes de consultation des salariés',
          'Former les militants à la démarche démocratique CGT'
        ]
      };
    }
  };

  // Analyze participation rate
  const analyzeParticipation = () => {
    if (results.participation >= 70) {
      return {
        status: 'high',
        message: 'Excellente participation! Les salariés se sont fortement mobilisés.',
        impact: 'Cette forte participation renforce la légitimité des élus et du syndicat.'
      };
    } else if (results.participation >= 50) {
      return {
        status: 'medium',
        message: 'Participation satisfaisante mais perfectible.',
        impact: 'Une majorité de salariés s\'est exprimée, ce qui donne une légitimité correcte aux élus.'
      };
    } else {
      return {
        status: 'low',
        message: 'Participation faible qui interroge sur la mobilisation des salariés.',
        impact: 'Cette faible participation peut fragiliser la légitimité des élus et nécessite une réflexion sur les moyens de mobiliser davantage les salariés.'
      };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 border-green-500 text-green-700';
      case 'good': return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'average': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'weak': return 'bg-red-100 border-red-500 text-red-700';
      case 'high': return 'bg-green-100 border-green-500 text-green-700';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'low': return 'bg-red-100 border-red-500 text-red-700';
      default: return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  const performance = analyzePerformance();
  const participation = analyzeParticipation();

  // Calculate representation
  const calculateRepresentation = () => {
    if (results.cgtScore >= 10) {
      return {
        message: 'La CGT est représentative dans l\'établissement avec un score supérieur au seuil de 10%.',
        status: 'represented'
      };
    } else {
      return {
        message: 'La CGT n\'atteint pas le seuil de représentativité de 10%. Un plan d\'action urgent est nécessaire.',
        status: 'not-represented'
      };
    }
  };

  const representation = calculateRepresentation();

  return (
    <div className="bg-white rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-red-700 mb-4">Analyse des résultats</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Représentativité</h3>
        <div className={`p-4 border-l-4 rounded ${
          representation.status === 'represented' 
            ? 'bg-green-50 border-green-500' 
            : 'bg-red-50 border-red-500'
        }`}>
          <p className={representation.status === 'represented' ? 'text-green-700' : 'text-red-700'}>
            {representation.message}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Performance CGT</h3>
          <div className={`p-4 border-l-4 rounded ${getStatusColor(performance.status)}`}>
            <p className="mb-2">{performance.message}</p>
            <div className="mt-3">
              <strong>Recommandations :</strong>
              <ul className="list-disc pl-5 mt-1">
                {performance.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Analyse de la participation</h3>
          <div className={`p-4 border-l-4 rounded ${getStatusColor(participation.status)}`}>
            <p className="mb-2">{participation.message}</p>
            <p><strong>Impact :</strong> {participation.impact}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded">
        <h3 className="text-lg font-semibold mb-4">Points clés pour la prochaine campagne</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium text-red-700 mb-2">Priorité 1</h4>
            <p>
              {results.cgtScore < 20 
                ? 'Renforcer la présence CGT sur le terrain' 
                : 'Consolider et élargir la base syndicale'}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium text-red-700 mb-2">Priorité 2</h4>
            <p>
              {results.participation < 50 
                ? 'Améliorer la mobilisation des salariés lors des scrutins' 
                : 'Transformer le vote en adhésions'}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-medium text-red-700 mb-2">Priorité 3</h4>
            <p>
              {Object.keys(results.otherUnionVotes).length > 0 
                ? 'Clarifier les positions CGT face aux autres organisations' 
                : 'Développer la présence CGT dans tous les collèges'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectionAnalysis;