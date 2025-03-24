import React, { useState } from 'react';
import TabNav from './Public/TabNav';
import ElectionsResourceCenter from './Public/ElectionsModule/ElectionsResourceCenter';
import RepresentativityCalculator from './Public/ElectionsModule/RepresentativityCalculator';
import ElectionResults from './Public/ElectionsModule/ElectionResults';
import styles from './ElectionsCSEPage.module.css';

function ElectionsCSEPage() {
  // État pour l'onglet actif
  const [activeTab, setActiveTab] = useState('resources');
  
  // Liste d'onglets pour la page
  const tabs = [
    { id: 'resources', label: 'Ressources', color: 'bg-red-700' },
    { id: 'calculator', label: 'Calculateur', color: 'bg-blue-600' },
    { id: 'results', label: 'Résultats', color: 'bg-purple-600' },
    { id: 'calendar', label: 'Calendrier', color: 'bg-green-600' },
    { id: 'templates', label: 'Modèles', color: 'bg-yellow-600' }
  ];
  
  // Gestion du changement d'onglet
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Élections CSE</h1>
        <p className={styles.pageDescription}>
          Tous les outils nécessaires pour préparer et réussir vos élections professionnelles.
        </p>
      </div>
      
      {/* Barre d'onglets */}
      <TabNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      {/* Contenu en fonction de l'onglet */}
      <div className={styles.tabContent}>
        {activeTab === 'resources' && (
          <div>
            <ElectionsResourceCenter />
          </div>
        )}
        
        {activeTab === 'calculator' && (
          <div>
            <RepresentativityCalculator />
          </div>
        )}
        
        {activeTab === 'results' && (
          <div>
            <ElectionResults />
          </div>
        )}
        
        {activeTab === 'calendar' && (
          <div className={styles.comingSoonContainer}>
            <div className={styles.comingSoonContent}>
              <div className={styles.comingSoonIcon}>🗓️</div>
              <h2 className={styles.comingSoonTitle}>Calendrier préélectoral</h2>
              <p className={styles.comingSoonDescription}>
                Cet outil vous permettra de générer un calendrier personnalisé pour vos élections CSE.
                Il vous aidera à respecter tous les délais légaux et à planifier efficacement votre campagne.
              </p>
              <div className={styles.comingSoonBadge}>Bientôt disponible</div>
            </div>
          </div>
        )}
        
        {activeTab === 'templates' && (
          <div className={styles.comingSoonContainer}>
            <div className={styles.comingSoonContent}>
              <div className={styles.comingSoonIcon}>📄</div>
              <h2 className={styles.comingSoonTitle}>Modèles de documents</h2>
              <p className={styles.comingSoonDescription}>
                Cette section contiendra des modèles prêts à l'emploi pour vos élections CSE :
                listes de candidats, professions de foi, tracts, affiches, etc.
              </p>
              <div className={styles.comingSoonBadge}>Bientôt disponible</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Conseils et astuces */}
      <div className={styles.tipsSection}>
        <h3 className={styles.tipsTitle}>Conseils pour réussir vos élections</h3>
        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>📊</div>
            <h4 className={styles.tipTitle}>Analysez le terrain</h4>
            <p className={styles.tipDescription}>
              Utilisez la cartographie pour identifier les services prioritaires et adapter votre stratégie électorale.
            </p>
          </div>
          
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>📝</div>
            <h4 className={styles.tipTitle}>Négociez le PAP</h4>
            <p className={styles.tipDescription}>
              Soyez vigilant lors de la négociation du protocole d'accord préélectoral, c'est une étape cruciale.
            </p>
          </div>
          
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>👥</div>
            <h4 className={styles.tipTitle}>Constituez vos listes</h4>
            <p className={styles.tipDescription}>
              Veillez à la parité et à la représentativité des différents services dans vos listes de candidats.
            </p>
          </div>
          
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>📣</div>
            <h4 className={styles.tipTitle}>Communiquez efficacement</h4>
            <p className={styles.tipDescription}>
              Utilisez les supports de communication adaptés à chaque public (tracts, affiches, réseaux sociaux).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectionsCSEPage;
