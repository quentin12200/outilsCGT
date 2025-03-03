// src/components/SyndicalisationModule/SyndicalisationDashboard.js
import React from 'react';

function SyndicalisationDashboard({ data, targetRatio, onReset }) {
  const calculateRequired = () => {
    if (!targetRatio) return 0;
    
    const targetMembers = Math.ceil(data.totalEmployees * (targetRatio / 100));
    return Math.max(0, targetMembers - data.currentMembers);
  };

  // Calculate members needed to reach target
  const requiredNewMembers = calculateRequired();

  // Helper function to determine color based on syndication rate
  const getSyndicalisationColor = (ratio) => {
    if (ratio >= 50) return 'text-green-700';
    if (ratio >= 30) return 'text-blue-700';
    if (ratio >= 20) return 'text-yellow-700';
    return 'text-red-700';
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-red-700">Tableau de bord de la syndicalisation</h2>
        <button
          onClick={onReset}
          className="text-gray-600 hover:text-gray-800 border border-gray-300 rounded px-3 py-1"
        >
          Modifier les données
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">État actuel</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Salariés:</span>
              <span className="font-bold">{data.totalEmployees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Syndiqués:</span>
              <span className="font-bold">{data.currentMembers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taux:</span>
              <span className={`font-bold ${getSyndicalisationColor(data.currentRatio)}`}>
                {data.currentRatio}%
              </span>
            </div>
          </div>
        </div>
        
        {targetRatio && (
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-3">Objectif fixé</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Taux cible:</span>
                <span className="font-bold text-green-600">{targetRatio}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Syndiqués attendus:</span>
                <span className="font-bold">
                  {Math.ceil(data.totalEmployees * (targetRatio / 100))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">À syndiquer:</span>
                <span className="font-bold text-blue-600">{requiredNewMembers}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Progression</h3>
          
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Actuel</span>
              <span className="text-sm text-gray-600">{targetRatio ? `Objectif ${targetRatio}%` : 'Objectif 30%'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 relative">
              <div 
                className="bg-red-600 h-2.5 rounded-full" 
                style={{ width: `${data.currentRatio}%` }}
              ></div>
              {targetRatio && (
                <div 
                  className="absolute top-0 h-2.5 border-l-2 border-green-500"
                  style={{ left: `${targetRatio}%` }}
                ></div>
              )}
            </div>
          </div>
          
          {targetRatio && (
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">
                Il reste {requiredNewMembers} salariés à syndiquer pour atteindre l'objectif
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SyndicalisationDashboard;