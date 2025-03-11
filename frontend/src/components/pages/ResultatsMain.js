import React, { useState, useEffect } from 'react';
import ResultatsForm from './ResultatsForm';
import SaveButtons from '../../../components/Common/Savebuttons/SaveButtons'; // Corrected path
import storageService from '../../../services/storageService';
import styles from './ResultatsMain.module.css';

function ResultatsMain() {
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' ou 'form'
  const [resultatsData, setResultatsData] = useState({
    participation: 78,
    cgtVotes: 345,
    totalVotes: 650,
    percentage: 53,
    seats: 4,
    totalSeats: 7,
    evolution: +5,
    previousPercentage: 48,
    date: '2023-11-15',
    departments: [
      { name: 'Administration', votes: 32, total: 40, percentage: 80 },
      { name: 'Production', votes: 155, total: 280, percentage: 55 },
      { name: 'R&D', votes: 45, total: 95, percentage: 47 },
      { name: 'Logistique', votes: 65, total: 140, percentage: 46 },
      { name: 'Commercial', votes: 28, total: 65, percentage: 43 },
      { name: 'Maintenance', votes: 20, total: 30, percentage: 67 }
    ]
  });

  // Charger les données au démarrage
  useEffect(() => {
    const loadData = async () => {
      try {
        // Essayer de charger depuis le localStorage d'abord
        const localData = storageService.loadFromLocal('resultats');
        if (localData) {
          setResultatsData(localData);
          console.log('Données de résultats chargées localement');
          return;
        }
        
        // Si aucune donnée locale, essayer de charger depuis le serveur
        const serverData = await storageService.loadFromServer('resultats');
        if (serverData && Object.keys(serverData).length > 0) {
          setResultatsData(serverData);
          console.log('Données de résultats chargées depuis le serveur');
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données de résultats:", error);
      }
    };
    
    loadData();
  }, []);

  // Fonction pour sauvegarder localement
  const handleSaveLocal = async () => {
    return storageService.saveLocally('resultats', resultatsData);
  };

  // Fonction pour sauvegarder sur le serveur
  const handleSaveServer = async () => {
    return storageService.saveToServer('resultats', resultatsData);
  };

  // Fonction pour enregistrer les données du formulaire
  const handleSaveFormData = (formData) => {
    setResultatsData(formData);
    setActiveTab('stats'); // Revenir à l'affichage des statistiques après la sauvegarde
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'stats' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <i className="fas fa-chart-bar"></i> Résultats
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'form' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <i className="fas fa-edit"></i> Saisie des résultats
        </button>
      </div>

      {activeTab === 'stats' ? (
        <div className={styles.card}>
          <h2 className={styles.title}>Résultats des élections professionnelles</h2>
          
          <div className={styles.statsGrid}>
            <div className={styles.scoreCard}>
              <h3 className={styles.sectionTitle}>Score global</h3>
              
              <div className={styles.centerContent}>
                <div className={styles.scoreValue}>
                  <span className={styles.scorePercentage}>{resultatsData.percentage}%</span>
                  <span className={styles.scoreLabel}>des suffrages exprimés</span>
                  
                  <div className={styles.evolution}>
                    <span className={resultatsData.evolution > 0 ? styles.evolutionPositive : styles.evolutionNegative}>
                      {resultatsData.evolution > 0 ? '↑' : '↓'} {Math.abs(resultatsData.evolution)}%
                    </span>
                    <span className={styles.evolutionNote}>vs élections précédentes</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.statsCards}>
                <div className={styles.statsCard}>
                  <span className={styles.statsValue}>{resultatsData.seats}</span>
                  <span className={styles.statsLabel}>sièges obtenus</span>
                  <span className={styles.statsSubLabel}>sur {resultatsData.totalSeats}</span>
                </div>
                
                <div className={styles.statsCard}>
                  <span className={styles.statsValue}>{resultatsData.participation}%</span>
                  <span className={styles.statsLabel}>participation</span>
                  <span className={styles.statsSubLabel}>{resultatsData.totalVotes} votants</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className={styles.sectionTitle}>Répartition par service</h3>
              
              <div className={styles.departmentList}>
                {resultatsData.departments.map((dept, idx) => (
                  <div key={idx} className={styles.departmentItem}>
                    <div className={styles.departmentHeader}>
                      <span className={styles.departmentName}>{dept.name}</span>
                      <span className={styles.departmentPercentage}>{dept.percentage}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${dept.percentage}%` }}
                      ></div>
                    </div>
                    <div className={styles.departmentStats}>
                      {dept.votes} voix sur {dept.total} suffrages
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.analysisSection}>
            <h3 className={styles.sectionTitle}>Analyse et recommandations</h3>
            <div className={styles.analysisGrid}>
              <div className={styles.strengthsCard}>
                <h4 className={styles.strengthsTitle}>Points forts</h4>
                <p className={styles.analysisText}>
                  Excellents résultats dans les services Administration et Maintenance avec plus de 65% des suffrages.
                  La progression globale de +{resultatsData.evolution}% témoigne d'une bonne dynamique syndicale.
                </p>
              </div>
              <div className={styles.improvementsCard}>
                <h4 className={styles.improvementsTitle}>Points d'amélioration</h4>
                <p className={styles.analysisText}>
                  Les services Commercial et R&D restent en-dessous de 50%. Mettre en place un plan d'action
                  spécifique pour ces services avec des référents dédiés.
                </p>
              </div>
            </div>
          </div>

          {/* Ajout des boutons de sauvegarde */}
          <SaveButtons
            onSaveLocal={handleSaveLocal}
            onSaveServer={handleSaveServer}
            moduleName="resultats"
          />
        </div>
      ) : (
        <ResultatsForm 
          initialData={resultatsData}
          onSave={handleSaveFormData}
        />
      )}
    </div>
  );
}

export default ResultatsMain;