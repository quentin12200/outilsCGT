// src/components/ResultatsModule/ElectionComparison.js
import React from 'react';

function ElectionComparison({ currentResults, previousResults }) {
  // Calculate differences
  const calculateDifference = (current, previous) => {
    return (current - previous).toFixed(2);
  };

  // Format difference with + or - sign
  const formatDifference = (diff) => {
    const numDiff = parseFloat(diff);
    if (numDiff > 0) return `+${diff}`;
    return diff;
  };

  // Determine color class based on difference value
  const getDifferenceClass = (diff) => {
    const numDiff = parseFloat(diff);
    if (numDiff > 0) return 'text-green-600';
    if (numDiff < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Calculate differences for key metrics
  const differences = {
    participation: calculateDifference(currentResults.participation, previousResults.participation),
    cgtScore: calculateDifference(currentResults.cgtScore, previousResults.cgtScore),
    cgtVotes: currentResults.cgtVotes - previousResults.cgtVotes,
    totalVoters: currentResults.totalVoters - previousResults.totalVoters
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-red-700 mb-4">
        Comparaison des résultats électoraux
      </h2>
      
      <div className="bg-blue-50 p-4 rounded mb-6">
        <p className="text-blue-800">
          Comparaison entre l'élection de <strong>{formatDate(currentResults.date)}</strong> et 
          celle de <strong>{formatDate(previousResults.date)}</strong>
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Évolution des résultats CGT</h3>
          
          <div className="bg-white border rounded shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Score CGT</span>
              <div className="flex items-center">
                <span className="text-gray-600 mr-3">{previousResults.cgtScore}% → {currentResults.cgtScore}%</span>
                <span className={`font-bold ${getDifferenceClass(differences.cgtScore)}`}>
                  {formatDifference(differences.cgtScore)}%
                </span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
              <div 
                className="bg-gray-400 h-full rounded-full relative"
                style={{ width: `${previousResults.cgtScore}%` }}
              >
                <div 
                  className={`h-full rounded-full absolute top-0 left-0 ${parseFloat(differences.cgtScore) > 0 ? 'bg-green-600' : 'bg-red-600'}`}
                  style={{ width: `${currentResults.cgtScore}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Nombre de voix CGT</span>
              <div className="flex items-center">
                <span className="text-gray-600 mr-3">{previousResults.cgtVotes} → {currentResults.cgtVotes}</span>
                <span className={`font-bold ${getDifferenceClass(differences.cgtVotes)}`}>
                  {formatDifference(differences.cgtVotes)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border rounded shadow p-4">
            <h4 className="font-medium mb-3">Tendance</h4>
            <div className="flex items-center">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full mr-4 ${
                parseFloat(differences.cgtScore) > 2 ? 'bg-green-100 text-green-700' :
                parseFloat(differences.cgtScore) > 0 ? 'bg-green-50 text-green-600' :
                parseFloat(differences.cgtScore) < -2 ? 'bg-red-100 text-red-700' :
                parseFloat(differences.cgtScore) < 0 ? 'bg-red-50 text-red-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {parseFloat(differences.cgtScore) > 0 ? '↑' : 
                 parseFloat(differences.cgtScore) < 0 ? '↓' : '→'}
              </div>
              <div>
                <p className={parseFloat(differences.cgtScore) > 0 ? 'text-green-700' : 
                               parseFloat(differences.cgtScore) < 0 ? 'text-red-700' : 
                               'text-gray-600'}>
                  {parseFloat(differences.cgtScore) > 2 ? 'Progression significative' :
                   parseFloat(differences.cgtScore) > 0 ? 'Légère progression' :
                   parseFloat(differences.cgtScore) < -2 ? 'Recul significatif' :
                   parseFloat(differences.cgtScore) < 0 ? 'Léger recul' :
                   'Stabilité des résultats'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Évolution de la participation</h3>
          
          <div className="bg-white border rounded shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Taux de participation</span>
              <div className="flex items-center">
                <span className="text-gray-600 mr-3">{previousResults.participation}% → {currentResults.participation}%</span>
                <span className={`font-bold ${getDifferenceClass(differences.participation)}`}>
                  {formatDifference(differences.participation)}%
                </span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
              <div 
                className="bg-gray-400 h-full rounded-full relative"
                style={{ width: `${previousResults.participation}%` }}
              >
                <div 
                  className={`h-full rounded-full absolute top-0 left-0 ${parseFloat(differences.participation) > 0 ? 'bg-green-600' : 'bg-red-600'}`}
                  style={{ width: `${currentResults.participation}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Nombre d'inscrits</span>
              <div className="flex items-center">
                <span className="text-gray-600 mr-3">{previousResults.totalVoters} → {currentResults.totalVoters}</span>
                <span className={`font-bold ${getDifferenceClass(differences.totalVoters)}`}>
                  {formatDifference(differences.totalVoters)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border rounded shadow p-4">
            <h4 className="font-medium mb-3">Analyse de l'évolution</h4>
            <p className="text-gray-700 mb-3">
              {parseFloat(differences.participation) > 5 ? 
                'La forte hausse de la participation témoigne d\'une meilleure mobilisation des salariés.' :
                parseFloat(differences.participation) > 0 ?
                'La légère hausse de participation montre un maintien de l\'intérêt des salariés.' :
                parseFloat(differences.participation) < -5 ?
                'La baisse significative de participation nécessite une analyse des facteurs de démobilisation.' :
                parseFloat(differences.participation) < 0 ?
                'La légère baisse de participation reste dans la norme d\'évolution habituelle.' :
                'La stabilité de la participation montre une constance dans la mobilisation des salariés.'}
            </p>
            <p className="text-gray-700">
              {parseFloat(differences.cgtScore) > 0 && parseFloat(differences.participation) > 0 ?
                'La progression simultanée du score CGT et de la participation est un signal très positif.' :
                parseFloat(differences.cgtScore) > 0 && parseFloat(differences.participation) < 0 ?
                'La progression du score CGT malgré la baisse de participation témoigne d\'une consolidation de notre influence.' :
                parseFloat(differences.cgtScore) < 0 && parseFloat(differences.participation) > 0 ?
                'La baisse du score CGT dans un contexte de participation en hausse nécessite une analyse approfondie.' :
                'Cette évolution nécessite un ajustement de notre stratégie.'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recommandations stratégiques</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-red-700 mb-2">Points forts à consolider</h4>
            <ul className="list-disc pl-5 space-y-2">
              {parseFloat(differences.cgtScore) > 0 && (
                <li>Maintenir et amplifier la dynamique de progression du vote CGT</li>
              )}
              {parseFloat(differences.participation) > 0 && (
                <li>Capitaliser sur la bonne mobilisation des salariés</li>
              )}
              <li>
                {currentResults.cgtScore > previousResults.cgtScore 
                  ? "Renforcer notre communication sur les succès obtenus"
                  : "Renforcer notre présence sur le terrain"}
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-red-700 mb-2">Axes d'amélioration</h4>
            <ul className="list-disc pl-5 space-y-2">
              {parseFloat(differences.cgtScore) < 0 && (
                <li>Analyser les causes du recul et ajuster notre stratégie syndicale</li>
              )}
              {parseFloat(differences.participation) < 0 && (
                <li>Renforcer les actions de mobilisation et de sensibilisation des salariés</li>
              )}
              <li>
                {currentResults.cgtScore < 30 
                  ? "Développer un plan de syndicalisation ciblé"
                  : "Transformer le vote en adhésions pour renforcer notre présence"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectionComparison;