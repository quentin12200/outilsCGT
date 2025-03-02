// src/components/pages/RetroplanningPage.js
import React from 'react';
import RetroplanningMain from '../RetroplanningModule/RetroplanningMain';

function RetroplanningPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-red-700 mb-2">Rétro-planning</h1>
        <p className="text-lg text-gray-600">
          Planifiez et organisez votre démarche syndicale dans le temps
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="mb-6">
          Le rétro-planning est un outil essentiel pour structurer votre démarche syndicale 
          en amont des élections professionnelles. Il vous permet d'identifier les étapes clés 
          et de ne manquer aucune échéance importante.
        </p>

        <RetroplanningMain />
      </div>
    </div>
  );
}

export default RetroplanningPage;