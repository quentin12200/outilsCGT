import React from 'react';
import styles from '../pages/DemarcheSyndicalePage.module.css';

const ImplantationTab = ({ activeSubTab, setActiveSubTab }) => {
  const implantationSubTabs = [
    { id: 'analyse-cible', label: 'Analyse de cible' },
    { id: 'plan-action', label: 'Plan daction' },
    { id: 'mobilisation', label: 'Mobilisation' },
    { id: 'synthese', label: 'Synthèse étapes' }
  ];

  return (
    <div>
      <div className={styles.subTabNav}>
        {implantationSubTabs.map(tab => (
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
        {activeSubTab === 'analyse-cible' && (
          <div>
            <h2 className={styles.sectionTitle}>Analyse de cible</h2>
            {/* Contenu pour l'analyse de cible */}
          </div>
        )}
        {activeSubTab === 'plan-action' && (
          <div>
            <h2 className={styles.sectionTitle}>Plan d'action d'implantation</h2>
            {/* Contenu pour le plan d'action */}
          </div>
        )}
        {activeSubTab === 'mobilisation' && (
          <div>
            <h2 className={styles.sectionTitle}>Mobilisation pour l'implantation</h2>
            {/* Contenu pour la mobilisation */}
          </div>
        )}
        {activeSubTab === 'synthese' && (
          <div>
            <h2 className={styles.sectionTitle}>Synthèse des étapes</h2>
            {/* Contenu synthétique */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImplantationTab;
