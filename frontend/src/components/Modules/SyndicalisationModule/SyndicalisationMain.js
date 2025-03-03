// src/components/Modules/SyndicalisationModule/SyndicalisationMain.js
import React, { useState } from 'react';
import SyndicalisationStats from './SyndicalisationStats';
import SyndicalisationForm from './SyndicalisationForm';
import styles from './SyndicalisationMain.module.css';

function SyndicalisationMain() {
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' ou 'form'
  const [syndicalisationData, setSyndicalisationData] = useState({
    currentMembers: 245,
    totalEmployees: 980,
    currentRatio: 25,
    targetRatio: 35,
    sectorAverage: 27,
    departmentData: [
      { name: 'Administration', members: 15, employees: 45, ratio: 33 },
      { name: 'Production', members: 95, employees: 380, ratio: 25 },
      { name: 'R&D', members: 22, employees: 110, ratio: 20 },
      { name: 'Logistique', members: 58, employees: 195, ratio: 30 },
      { name: 'Commercial', members: 32, employees: 180, ratio: 18 },
      { name: 'Maintenance', members: 23, employees: 70, ratio: 33 }
    ]
  });

  const handleSetTarget = (targetValue) => {
    setSyndicalisationData(prevData => ({
      ...prevData,
      targetRatio: targetValue
    }));
  };

  const handleSaveFormData = (formData) => {
    setSyndicalisationData(formData);
    setActiveTab('stats'); // Revenir à l'affichage des statistiques après la sauvegarde
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'stats' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <i className="fas fa-chart-pie"></i> Analyse
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'form' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <i className="fas fa-edit"></i> Saisie des données
        </button>
      </div>

      {activeTab === 'stats' ? (
        <SyndicalisationStats 
          data={syndicalisationData} 
          onSetTarget={handleSetTarget} 
        />
      ) : (
        <SyndicalisationForm 
          initialData={syndicalisationData}
          onSave={handleSaveFormData}
        />
      )}
    </div>
  );
}

export default SyndicalisationMain;