// Composant GlobalSummary amélioré pour correspondre à votre design
import React from 'react';

const GlobalSummary = ({ stats }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold text-red-700 mb-4">Synthèse globale</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded shadow text-center">
          <div className="text-gray-600 mb-1">Salariés totaux</div>
          <div className="text-2xl font-bold">{stats.totalSalaries}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow text-center">
          <div className="text-gray-600 mb-1">Syndiqués totaux</div>
          <div className="text-2xl font-bold">{stats.totalSyndiques}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow text-center">
          <div className="text-gray-600 mb-1">Taux global</div>
          <div className="text-2xl font-bold">{stats.globalRatio.toFixed(1)}%</div>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="font-medium">Taux de syndicalisation</span>
          <span className="font-medium">{stats.globalRatio.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-red-600 h-4 rounded-full"
            style={{ width: `${Math.min(stats.globalRatio, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-6 p-4 border-l-4 border-red-600 bg-red-50">
        <h4 className="font-semibold mb-2">Analyse et recommandations:</h4>
        <p className="text-gray-700">
          {stats.globalRatio > 50 
            ? "Position favorable ! Maintenez une dynamique de syndicalisation pour renforcer cette position."
            : "La marge de progression est importante. Concentrez vos efforts sur les services à faible taux de syndicalisation."}
        </p>
      </div>
    </div>
  );
};

export default GlobalSummary;