import React, { useState, useEffect } from 'react';
import TabNav from '../Modules/Demarche/TabNav';
import styles from './VueEnsemblePage.module.css';
import DashboardGrid from '../Dashboard/DashboardGrid';
import StatisticsPanel from '../Dashboard/StatisticsPanel';
import CategoryFilter from '../Dashboard/CategoryFilter';
import { tools, categories, defaultStats } from '../../data/toolsData';

function VueEnsemblePage() {
  // État pour l'onglet actif
  const [activeTab, setActiveTab] = useState('vue-ensemble');
  // État pour la catégorie active
  const [activeCategory, setActiveCategory] = useState(null);
  // État pour les statistiques
  const [stats, setStats] = useState(defaultStats);
  
  // Liste d'onglets pour la page
  const tabs = [
    { id: 'vue-ensemble', label: "Vue d'ensemble", color: 'bg-red-700' },
    { id: 'besoins', label: 'Besoins', color: 'bg-yellow-600' },
    { id: 'revendications', label: 'Revendications', color: 'bg-green-600' },
    // etc.
  ];

  // Gestion du changement d'onglet
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  
  // Gestion du changement de catégorie
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  // Simuler le chargement des statistiques (à remplacer par des données réelles)
  useEffect(() => {
    // Dans une application réelle, vous pourriez charger ces données depuis une API
    // Ceci est juste une simulation pour l'exemple
    const timer = setTimeout(() => {
      // Mise à jour des statistiques avec des données "fraîches"
      setStats(prevStats => prevStats.map(stat => ({
        ...stat,
        value: stat.value // Dans une vraie app, cette valeur serait mise à jour
      })));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Barre d'onglets */}
      <TabNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Contenu en fonction de l'onglet */}
      {activeTab === 'vue-ensemble' && (
        <div className={styles.dashboardContainer}>
          <h1 className={styles.pageTitle}>Tableau de bord syndical</h1>
          
          {/* Panneau de statistiques */}
          <section className={styles.statsSection}>
            <h2 className={styles.sectionTitle}>Statistiques clés</h2>
            <StatisticsPanel stats={stats} />
          </section>
          
          {/* Filtres de catégories */}
          <section className={styles.toolsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Boîte à outils</h2>
              <CategoryFilter 
                categories={categories} 
                activeCategory={activeCategory} 
                onCategoryChange={handleCategoryChange} 
              />
            </div>
            
            {/* Grille d'outils */}
            <DashboardGrid tools={tools} category={activeCategory} />
          </section>
        </div>
      )}
      
      {activeTab === 'besoins' && (
        <div>
          {/* Contenu de la phase Besoins */}
          <h1 className={styles.pageTitle}>Analyse des besoins</h1>
          <p className={styles.pageDescription}>
            Cette section vous permet d'identifier et d'analyser les besoins des salariés 
            pour construire des revendications pertinentes.
          </p>
          {/* Contenu spécifique à l'onglet Besoins */}
        </div>
      )}
      
      {activeTab === 'revendications' && (
        <div>
          {/* Contenu de la phase Revendications */}
          <h1 className={styles.pageTitle}>Construction des revendications</h1>
          <p className={styles.pageDescription}>
            Élaborez des revendications précises et mobilisatrices à partir de l'analyse des besoins.
          </p>
          {/* Contenu spécifique à l'onglet Revendications */}
        </div>
      )}
    </div>
  );
}

export default VueEnsemblePage;
