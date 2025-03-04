// src/components/pages/DemarcheSyndicalePage.js
import React, { useState } from 'react';
import TabNav from '../Modules/Demarche/TabNav';
import styles from './DemarcheSyndicalePage.module.css';
import PresentationTab from '../DemarcheSyndicaleComponents/PresentationTab';
import RenforcementTab from '../DemarcheSyndicaleComponents/RenforcementTab';
import ImplantationTab from '../DemarcheSyndicaleComponents/ImplantationTab';
import RessourcesTab from '../DemarcheSyndicaleComponents/RessourcesTab';

function DemarcheSyndicalePage() {
  // États pour gérer la navigation principale et les sous-sections
  const [activeTab, setActiveTab] = useState('presentation');
  const [activeSubTab, setActiveSubTab] = useState('apercu');

  // Définition des onglets principaux
  const tabs = [
    { id: 'presentation', label: 'Présentation', color: 'bg-red-700' },
    { id: 'renforcement', label: 'Renforcement', color: 'bg-blue-600' },
    { id: 'implantation', label: 'Implantation', color: 'bg-green-600' },
    { id: 'ressources', label: 'Ressources', color: 'bg-purple-600' }
  ];

  // Fonction de changement d'onglet principal
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // Réinitialiser les sous-onglets selon la section
    if (tabId === 'presentation') {
      setActiveSubTab('apercu');
    } else if (tabId === 'renforcement') {
      setActiveSubTab('analyse');
    } else if (tabId === 'implantation') {
      setActiveSubTab('analyse-cible');
    } else if (tabId === 'ressources') {
      setActiveSubTab('documents');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Démarche Syndicale</h1>

      {/* Navigation principale */}
      <TabNav 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Contenu de l'onglet actif */}
      <div className={styles.tabContent}>
        {activeTab === 'presentation' && (
          <PresentationTab 
            activeSubTab={activeSubTab} 
            setActiveSubTab={setActiveSubTab} 
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'renforcement' && (
          <RenforcementTab 
            activeSubTab={activeSubTab} 
            setActiveSubTab={setActiveSubTab} 
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'implantation' && (
          <ImplantationTab 
            activeSubTab={activeSubTab} 
            setActiveSubTab={setActiveSubTab}
          />
        )}
        {activeTab === 'ressources' && (
          <RessourcesTab 
            activeSubTab={activeSubTab} 
            setActiveSubTab={setActiveSubTab}
          />
        )}
      </div>
    </div>
  );
}

export default DemarcheSyndicalePage;