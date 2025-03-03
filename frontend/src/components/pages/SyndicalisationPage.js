// src/components/pages/SyndicalisationPage.js
import React from 'react';
import SyndicalisationMain from '../Modules/SyndicalisationModule/SyndicalisationMain';

function SyndicalisationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-red-700 mb-2">Taux de syndicalisation</h1>
        <p className="text-lg text-gray-600">
          Analyse et stratégie de développement de la syndicalisation
        </p>
      </header>

      <SyndicalisationMain />
    </div>
  );
}

export default SyndicalisationPage;