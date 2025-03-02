// src/components/pages/ResultatsPage.js
import React from 'react';
import PageHeader from '../Common/PageHeader';
import ResultatsMain from '../Modules/ResultatsModule/ResultatsMain';

function ResultatsPage() {
  return (
    <div>
      <PageHeader 
        title="Résultats électoraux" 
        subtitle="Analyse des élections professionnelles" 
        icon="chart-bar" 
      />
      <ResultatsMain />
    </div>
  );
}

export default ResultatsPage;