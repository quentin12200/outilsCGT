import React, { useState } from 'react';
import TabNav from '../Modules/Demarche/TabNav';
import styles from './CampagneElectionsPage.module.css';

function VueEnsemblePage() {
  // État pour l’onglet actif
  const [activeTab, setActiveTab] = useState('vue-ensemble');

  // Liste d’onglets pour la page
  const tabs = [
    { id: 'vue-ensemble', label: "Vue d'ensemble", color: 'bg-red-700' },
    { id: 'besoins', label: 'Besoins', color: 'bg-yellow-600' },
    { id: 'revendications', label: 'Revendications', color: 'bg-green-600' },
    // etc.
  ];

  // Gestion du changement d’onglet
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Barre d’onglets */}
      <TabNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Contenu en fonction de l’onglet */}
      {activeTab === 'vue-ensemble' && (
        <div>
          {/* Contenu de la vue d’ensemble */}
        </div>
      )}
      {activeTab === 'besoins' && (
        <div>
          {/* Contenu de la phase Besoins */}
        </div>
      )}
      {/* ... */}
    </div>
  );
}

export default VueEnsemblePage;
