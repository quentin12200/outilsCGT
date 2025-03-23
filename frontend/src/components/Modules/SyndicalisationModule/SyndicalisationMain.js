// src/components/Modules/SyndicalisationModule/SyndicalisationMain.js
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import SyndicalisationStats from './SyndicalisationStats';
import SyndicalisationForm from './SyndicalisationForm';
import styles from './SyndicalisationMain.module.css';

const SyndicalisationMain = forwardRef((props, ref) => {
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' ou 'form'
  const [syndicalisationData, setSyndicalisationData] = useState({
    currentMembers: 0,
    totalEmployees: 0,
    currentRatio: 0,
    targetRatio: 0,
    sectorAverage: 0,
    departmentData: [
      { name: 'Administration', members: 0, employees: 0, ratio: 0 },
      { name: 'Production', members: 0, employees: 0, ratio: 0 },
      { name: 'R&D', members: 0, employees: 0, ratio: 0 },
      { name: 'Logistique', members: 0, employees: 0, ratio: 0 },
      { name: 'Commercial', members: 0, employees: 0, ratio: 0 },
      { name: 'Maintenance', members: 0, employees: 0, ratio: 0 }
    ]
  });

  const statsRef = useRef(null);
  const formRef = useRef(null);

  // Exposer les références et méthodes pour le parent
  useImperativeHandle(ref, () => ({
    getStatsRef: () => statsRef.current,
    getFormRef: () => formRef.current,
    getSyndicalisationData: () => syndicalisationData,
    getActiveTab: () => activeTab
  }));

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
          aria-pressed={activeTab === 'stats'}
        >
          <i className="fas fa-chart-pie"></i> Analyse
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'form' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('form')}
          aria-pressed={activeTab === 'form'}
        >
          <i className="fas fa-edit"></i> Saisie des données
        </button>
      </div>

      {activeTab === 'stats' ? (
        <div ref={statsRef}>
          <SyndicalisationStats 
            data={syndicalisationData} 
            onSetTarget={handleSetTarget} 
          />
        </div>
      ) : (
        <div ref={formRef}>
          <SyndicalisationForm 
            initialData={syndicalisationData}
            onSave={handleSaveFormData}
          />
        </div>
      )}
    </div>
  );
});

export default SyndicalisationMain;