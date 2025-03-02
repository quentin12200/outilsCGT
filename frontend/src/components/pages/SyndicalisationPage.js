// src/components/pages/SyndicalisationPage.js
import React from 'react';
import PageHeader from '../Common/PageHeader';
import SyndicalisationMain from '../Modules/SyndicalisationModule/SyndicalisationMain';

function SyndicalisationPage() {
  return (
    <div>
      <PageHeader 
        title="Taux de syndicalisation" 
        subtitle="Analyse et stratégie de développement" 
        icon="users-group" 
      />
      <SyndicalisationMain />
    </div>
  );
}

export default SyndicalisationPage;