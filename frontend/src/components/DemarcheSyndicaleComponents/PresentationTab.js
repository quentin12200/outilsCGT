// src/components/DemarcheSyndicaleComponents/PresentationTab.js
import React from 'react';
import styles from '../pages/DemarcheSyndicalePage.module.css';

const PresentationTab = ({ activeSubTab, setActiveSubTab, setActiveTab }) => {
  const presentationSubTabs = [
    { id: 'apercu', label: 'Aperçu général' },
    { id: 'principes', label: 'Principes fondamentaux' },
    { id: 'schema', label: 'Schéma global' }
  ];

  return (
    <div>
      <div className={styles.subTabNav}>
        {presentationSubTabs.map(tab => (
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
        {activeSubTab === 'apercu' && (
          <div>
            <h2 className={styles.sectionTitle}>La démarche syndicale CGT</h2>
            {/* Contenu spécifique pour "Aperçu général" */}
          </div>
        )}
        {activeSubTab === 'principes' && (
          <div>
            <h2 className={styles.sectionTitle}>Principes fondamentaux de la démarche syndicale</h2>
            {/* Contenu spécifique pour "Principes fondamentaux" */}
          </div>
        )}
        {activeSubTab === 'schema' && (
          <div>
            <h2 className={styles.sectionTitle}>Schéma global de la démarche syndicale</h2>
            {/* Contenu spécifique pour "Schéma global" */}
          </div>
        )}
      </div>
      <div className={styles.linkButtons}>
        <button
          className={styles.linkButton}
          onClick={() => {
            setActiveTab('renforcement');
            setActiveSubTab('analyse');
          }}
        >
          Découvrir l'axe Renforcement →
        </button>
        <button
          className={styles.linkButton}
          onClick={() => {
            setActiveTab('implantation');
            setActiveSubTab('analyse-cible');
          }}
        >
          Découvrir l'axe Implantation →
        </button>
        <div className="schema-container">
  <img 
    src="/assets/images/schema-demarche-syndicale.svg" 
    alt="Schéma global de la démarche syndicale CGT" 
    className="schema-image"
  />
</div>
      </div>
    </div>
  );
};

export default PresentationTab;
