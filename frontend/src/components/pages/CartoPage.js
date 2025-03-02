// src/components/pages/CartoPage.js
import React from 'react';
import CartoMain from '../CartoModule/CartoMain';

function CartoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-red-700 mb-2">Cartographie Stratégique</h1>
        <p className="text-lg text-gray-600">
          Visualisez le taux de syndicalisation par service et identifiez les zones prioritaires
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="mb-6">
          Cet outil vous permet de réaliser une cartographie stratégique de votre établissement 
          en analysant la répartition des syndiqués par service. Vous obtiendrez un plan d'action 
          personnalisé pour renforcer la présence CGT dans les zones prioritaires.
        </p>

        <CartoMain />
      </div>
    </div>
  );
}

export default CartoPage;