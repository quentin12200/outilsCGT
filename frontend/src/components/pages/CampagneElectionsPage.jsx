// src/components/pages/CampagneElectionsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
              La campagne s’appuie sur la démarche CGT : partir des besoins des salariés,
              construire les revendications, mobiliser puis agir. Chaque onglet renvoie
              vers les outils correspondants de l’application.
            </p>
            <ul>
              <li><Link to="/elections-cse">Élections CSE : ressources, calculateur et résultats</Link></li>
              <li><Link to="/carto-syndicalisation?tab=cartographie">Cartographie stratégique : identifier les services prioritaires</Link></li>
              <li><Link to="/retro-planning">Rétro-planning : caler les échéances de la campagne</Link></li>
              <li><Link to="/plan-actions">Plan d’actions : organiser et suivre les actions</Link></li>
            </ul>
          </div>
        )}

        {activeTab === 'besoins' && (
          <div className={styles.tabPane}>
            <h2 className={styles.sectionTitle}>Recueil des besoins</h2>
            <p>
              Recueillez les besoins et attentes des salariés pour ancrer la campagne
              dans leurs préoccupations réelles.
            </p>
            <ul>
              <li><Link to="/questionnaire">Questionnaire : construire et diffuser une consultation</Link></li>
              <li><Link to="/demarche?tab=besoins">Démarche CGT : méthodes de recueil des besoins</Link></li>
            </ul>
          </div>
        )}

        {activeTab === 'revendications' && (
          <div className={styles.tabPane}>
            <h2 className={styles.sectionTitle}>Construction revendicative</h2>
            <p>
              Transformez les besoins exprimés en revendications claires et partagées.
            </p>
            <ul>
              <li><Link to="/cahier-revendicatif">Cahier revendicatif : élaborer le document revendicatif</Link></li>
              <li><Link to="/demarche?tab=revendications">Démarche CGT : repères et validation démocratique</Link></li>
            </ul>
          </div>
        )}

        {activeTab === 'mobilisation' && (
          <div className={styles.tabPane}>
            <h2 className={styles.sectionTitle}>Mobilisation</h2>
            <p>
              Communiquez, convainquez et construisez le rapport de force autour des
              revendications validées.
            </p>
            <ul>
              <li><Link to="/demarche?tab=mobilisation">Démarche CGT : communication et rapport de force</Link></li>
              <li><Link to="/assemblees">Assemblées : préparer et animer les AG</Link></li>
            </ul>
          </div>
        )}

        {activeTab === 'action' && (
          <div className={styles.tabPane}>
            <h2 className={styles.sectionTitle}>Action / Lutte</h2>
            <p>
              Passez à l’action : moyens de lutte, suivi des actions et bilan pour
              préparer la suite.
            </p>
            <ul>
              <li><Link to="/demarche?tab=action">Démarche CGT : types d’actions et organisation de la lutte</Link></li>
              <li><Link to="/plan-actions">Plan d’actions : suivre les actions engagées</Link></li>
              <li><Link to="/resultats">Résultats : analyser les résultats électoraux</Link></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CampagneElectionsPage;
