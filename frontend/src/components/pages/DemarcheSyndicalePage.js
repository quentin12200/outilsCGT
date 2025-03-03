// src/components/pages/DemarcheSyndicalePage.js
import React, { useState } from 'react';
import TabNav from '../../Modules/Demarche/TabNav';
import PresentationTab from '../DemarcheSyndicaleComponents/PresentationTab';
import RenforcementTab from '../DemarcheSyndicaleComponents/RenforcementTab';
import ImplantationTab from '../DemarcheSyndicaleComponents/ImplantationTab';
import RessourcesTab from '../DemarcheSyndicaleComponents/RessourcesTab';
import styles from './DemarcheSyndicalePage.module.css';

function DemarcheSyndicalePage() {
  const [activeTab, setActiveTab] = useState('presentation');
  const [activeSubTab, setActiveSubTab] = useState('apercu');

  const tabs = [
    { id: 'presentation', label: 'Présentation', color: 'bg-red-700' },
    { id: 'renforcement', label: 'Renforcement', color: 'bg-blue-600' },
    { id: 'implantation', label: 'Implantation', color: 'bg-green-600' },
    { id: 'ressources', label: 'Ressources', color: 'bg-purple-600' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'presentation':
        return (
          <PresentationTab 
            activeSubTab={activeSubTab} 
            setActiveSubTab={setActiveSubTab} 
            setActiveTab={setActiveTab} 
          />
        );
      case 'renforcement':
        return (
          <RenforcementTab 
            activeSubTab={activeSubTab} 
            setActiveSubTab={setActiveSubTab} 
            setActiveTab={setActiveTab} 
          />
        );
      case 'implantation':
        return (
          <ImplantationTab 
            activeSubTab={activeSubTab} 
            setActiveSubTab={setActiveSubTab} 
          />
        );
      case 'ressources':
        return (
          <RessourcesTab 
            activeSubTab={activeSubTab} 
            setActiveSubTab={setActiveSubTab} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      {renderActiveTab()}
    </div>
  );
}

export default DemarcheSyndicalePage;
