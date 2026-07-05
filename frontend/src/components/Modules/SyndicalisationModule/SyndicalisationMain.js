// src/components/Modules/SyndicalisationModule/SyndicalisationMain.js
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import SyndicalisationStats from './SyndicalisationStats';
import SyndicalisationForm from './SyndicalisationForm';
import storageService from '../../services/storageService';
import useSyncTempsReel from '../../../hooks/useSyncTempsReel';
import styles from './SyndicalisationMain.module.css';

const SYNDICALISATION_KEY = 'syndicalisation';

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
  const chargeRef = useRef(false);
  // Vrai quand la dernière modification vient d'un camarade (temps réel) :
  // on ne re-sauvegarde pas pour éviter une boucle entre appareils.
  const distantRef = useRef(false);

  // Chargement des données sauvegardées (locales puis partagées)
  useEffect(() => {
    const charger = async () => {
      const local = storageService.loadFromLocal(SYNDICALISATION_KEY);
      if (local?.currentMembers !== undefined) setSyndicalisationData(local);
      const partage = await storageService.loadFromServer(SYNDICALISATION_KEY);
      if (partage?.currentMembers !== undefined) setSyndicalisationData(partage);
      chargeRef.current = true;
    };
    charger();
  }, []);

  // Temps réel : les données saisies par un camarade apparaissent en direct
  useSyncTempsReel(SYNDICALISATION_KEY, (donnees) => {
    if (donnees?.currentMembers === undefined) return;
    distantRef.current = true;
    setSyndicalisationData(donnees);
  });

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    if (!chargeRef.current) return;
    if (distantRef.current) {
      distantRef.current = false;
      return;
    }
    storageService.saveLocally(SYNDICALISATION_KEY, syndicalisationData);
    storageService.saveToServer(SYNDICALISATION_KEY, syndicalisationData);
  }, [syndicalisationData]);

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