// frontend/src/components/CartoModule/GlobalSummary.js
import React from 'react';

const GlobalSummary = ({ stats }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-bold text-red-600 mb-4">Synthèse globale</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 p-4 rounded shadow text-center">
          <div className="text-gray-600">Salariés totaux</div>
          <div className="text-2xl font-bold">{stats.totalSalaries}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow text-center">
          <div className="text-gray-600">Syndiqués totaux</div>
          <div className="text-2xl font-bold">{stats.totalSyndiques}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow text-center">
          <div className="text-gray-600">Taux global</div>
          <div className="text-2xl font-bold">{stats.globalRatio.toFixed(1)}%</div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-red-600 h-4 rounded-full"
          style={{ width: `${Math.min(stats.globalRatio, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default GlobalSummary;