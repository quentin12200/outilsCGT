// src/components/pages/ResultatsPage.js
import React from 'react';
import ResultatsMain from '../Modules/ResultatsModule/ResultatsMain';

function ResultatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-red-700 mb-2">Résultats électoraux</h1>
        <p className="text-lg text-gray-600">
          Analyse des élections professionnelles
        </p>
      </header>

      <ResultatsMain />
    </div>
  );
}

export default ResultatsPage;