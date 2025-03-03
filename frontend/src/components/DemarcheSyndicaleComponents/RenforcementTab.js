// src/components/DemarcheSyndicaleComponents/RenforcementTab.js
import React from 'react';
import styles from '../../pages/DemarcheSyndicalePage.module.css';

const RenforcementTab = ({ activeSubTab, setActiveSubTab, setActiveTab }) => {
  const renforcementSubTabs = [
    { id: 'analyse', label: 'Analyse préalable' },
    { id: 'formation', label: 'Formation syndicale' },
    { id: 'demarche', label: 'Démarche en 3 étapes' },
    { id: 'outils', label: 'Outils pratiques' }
  ];

  return (
    <div>
      <div className={styles.subTabNav}>
        {renforcementSubTabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.subTabButton} ${activeSubTab === tab.id ? styles.activeSubTab : ''}`}
            onClick={() => setActiveSubTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.subTabContent}>
        {activeSubTab === 'analyse' && (
          <div>
            <h2 className={styles.sectionTitle}>Analyse préalable à l'action</h2>
            {/* Contenu spécifique pour l'analyse */}
          </div>
        )}
        {activeSubTab === 'formation' && (
          <div>
            <h2 className={styles.sectionTitle}>Formation syndicale</h2>
            {/* Contenu spécifique pour la formation */}
          </div>
        )}
        {activeSubTab === 'demarche' && (
          <div>
            <h2 className={styles.sectionTitle}>Démarche en 3 étapes</h2>
            {/* Contenu spécifique pour la démarche */}
          </div>
        )}
        {activeSubTab === 'outils' && (
          <div>
            <h2 className={styles.sectionTitle}>Outils pratiques</h2>
            {/* Contenu spécifique pour les outils pratiques */}
          </div>
        )}
      </div>
    </div>
  );
};

export default RenforcementTab;
