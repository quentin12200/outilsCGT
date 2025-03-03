// src/components/pages/DemarcheRevendicativePage.js
import React from 'react';


function DemarcheRevendicativePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-red-700 mb-2">Démarche Revendicative</h1>
        <p className="text-lg text-gray-600">
          Guide méthodologique pour construire une démarche revendicative efficace
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <blockquote className="italic border-l-4 border-red-700 pl-4 py-2 mb-6">
          "La démarche revendicative, c'est mener la bataille des idées, 
          c'est la construction de la mobilisation pour gagner !"
        </blockquote>

        <DemarcheMain />
      </div>
    </div>
  );
}

export default DemarcheRevendicativePage;
