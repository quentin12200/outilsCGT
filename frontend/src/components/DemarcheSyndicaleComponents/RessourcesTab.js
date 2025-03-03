// src/components/DemarcheSyndicaleComponents/RessourcesTab.js
import React from 'react';
import styles from '../../pages/DemarcheSyndicalePage.module.css';

const RessourcesTab = ({ activeSubTab, setActiveSubTab }) => {
  const ressourcesSubTabs = [
    { id: 'documents', label: 'Documents' }
    // Vous pouvez ajouter d'autres sous-onglets si besoin (ex. Vidéos, Articles, etc.)
  ];

  return (
    <div>
      <div className={styles.subTabNav}>
        {ressourcesSubTabs.map(tab => (
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
        {activeSubTab === 'documents' && (
          <div>
            <h2 className={styles.sectionTitle}>Documents à télécharger</h2>
            <div className={styles.downloadSection}>
              <div className={styles.downloadGrid}>
                <div className={styles.downloadItem}>
                  <div className={styles.downloadIcon}>📄</div>
                  <span className={styles.downloadName}>Guide de la démarche revendicative</span>
                  <button className={styles.downloadButton}>Télécharger</button>
                </div>
                <div className={styles.downloadItem}>
                  <div className={styles.downloadIcon}>📄</div>
                  <span className={styles.downloadName}>Kit de communication</span>
                  <button className={styles.downloadButton}>Télécharger</button>
                </div>
                <div className={styles.downloadItem}>
                  <div className={styles.downloadIcon}>📄</div>
                  <span className={styles.downloadName}>Modèle de rétroplanning</span>
                  <button className={styles.downloadButton}>Télécharger</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RessourcesTab;
