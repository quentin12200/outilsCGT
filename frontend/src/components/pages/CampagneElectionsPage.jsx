// src/components/pages/CampagneElectionsPage.jsx
import React, { useState } from 'react';
import TabNav from '../Modules/Demarche/TabNav';
import styles from './CampagneElectionsPage.module.css';

function CampagneElectionsPage() {
  // État pour l’onglet actif
  const [activeTab, setActiveTab] = useState('vue-ensemble');

  // Liste d’onglets
  const tabs = [
    { id: 'vue-ensemble', label: "Vue d'ensemble" },
    { id: 'besoins', label: 'Besoins' },
    { id: 'revendications', label: 'Revendications' },
    { id: 'mobilisation', label: 'Mobilisation' },
    { id: 'action', label: 'Action / Lutte' },
  ];

  // Gestion du changement d’onglet
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Campagne Élections</h1>
        <p className={styles.subtitle}>
          Un espace dédié pour regrouper toutes les phases de la campagne
        </p>
      </header>

      {/* Barre d’onglets */}
      <TabNav 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
      />

      <div className={styles.tabContent}>
        {activeTab === 'vue-ensemble' && (
          <div className={styles.tabPane}>
            <h2 className={styles.sectionTitle}>Vue d’ensemble</h2>
            <p>
              Contenu de la vue d’ensemble : présentation générale, grands axes de la campagne,
              objectifs, etc.
            </p>
          </div>
        )}

        {activeTab === 'besoins' && (
          <div className={styles.tabPane}>
            <h2 className={styles.sectionTitle}>Recueil des besoins</h2>
            <p>
              Contenu relatif à la phase « Besoins ». On peut y insérer votre composant
              <code>PhaseBesoins</code>, par exemple.
            </p>
          </div>
        )}

        {activeTab === 'revendications' && (
          <div className={styles.tabPane}>
            <h2 className={styles.sectionTitle}>Construction revendicative</h2>
            <p>
              Contenu de la phase « Revendications ». On peut y insérer la logique ou les
              sous-onglets pour le cahier revendicatif, etc.
            </p>
          </div>
        )}

        {activeTab === 'mobilisation' && (
          <div className={styles.tabPane}>
            <h2 className={styles.sectionTitle}>Mobilisation</h2>
            <p>
              Contenu relatif à la phase « Mobilisation » : communication, conviction,
              rapport de force, etc.
            </p>
          </div>
        )}

        {activeTab === 'action' && (
          <div className={styles.tabPane}>
            <h2 className={styles.sectionTitle}>Action / Lutte</h2>
            <p>
              Contenu relatif à la phase « Action » : moyens de lutte, grèves, manifestations,
              négociations, etc.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CampagneElectionsPage;
