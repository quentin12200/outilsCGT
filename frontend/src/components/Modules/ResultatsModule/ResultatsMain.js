// src/components/Modules/ResultatsModule/ResultatsMain.js
import React, { useState, useEffect, useRef } from 'react';
import ResultatsForm from './ResultatsForm';
import SaveButtons from '../../Common/Savebuttons/SaveButtons';
import storageService from '../../services/storageService';
import styles from './ResultatsMain.module.css';
import { FaVoteYea, FaUsers, FaChair, FaChartPie } from 'react-icons/fa';

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
  
  const fullResultsRef = useRef(null);

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

  // Fonction pour générer un PDF des résultats
  const generatePDF = async () => {
    if (!fullResultsRef.current) {
      alert('Impossible de générer le PDF pour le moment.');
      return;
    }
    
    try {
      // Importer dynamiquement les modules nécessaires pour le PDF
      const html2canvas = await import('html2canvas');
      const jsPDF = await import('jspdf');
      
      // Créer le PDF
      const pdf = new jsPDF.default('p', 'mm', 'a4');
      
      // Ajouter l'en-tête
      pdf.setFontSize(18);
      pdf.setTextColor(185, 28, 28); // Rouge CGT
      pdf.text(`Résultats électoraux`, 105, 15, { align: 'center' });
      
      // Ajouter la date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100); // Gris
      const today = new Date().toLocaleDateString('fr-FR');
      pdf.text(`Généré le ${today}`, 190, 35, { align: 'right' });
      
      // Capturer la section complète des résultats
      const canvas = await html2canvas.default(fullResultsRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        foreignObjectRendering: false,
        onclone: (document, clone) => {
          // Ajuster le clone pour une meilleure capture
          const element = clone.querySelector('.resultsSection');
          if (element) {
            element.style.width = '1100px';
            element.style.margin = '0';
            element.style.padding = '20px';
            element.style.boxShadow = 'none';
            
            // S'assurer que les éléments du graphique sont correctement capturés
            const pieCharts = clone.querySelectorAll('.pieChart, .pieChartWrapper');
            pieCharts.forEach(chart => {
              chart.style.overflow = 'visible';
              chart.style.zIndex = '1';
            });
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 170; // Largeur de l'image en mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // Ajouter l'image au PDF
      pdf.addImage(imgData, 'PNG', 20, 40, imgWidth, imgHeight);
      
      // Sauvegarder le PDF
      pdf.save(`resultats_electoraux_${today.replace(/\//g, '-')}.pdf`);
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'stats' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('stats')}
            aria-pressed={activeTab === 'stats'}
          >
            <FaChartPie className={styles.tabIcon} /> Résultats
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'form' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('form')}
            aria-pressed={activeTab === 'form'}
          >
            <FaVoteYea className={styles.tabIcon} /> Saisie des résultats
          </button>
        </div>
        
        {activeTab === 'form' && (
          <SaveButtons 
            onSaveLocal={handleSaveLocal}
            onSaveServer={handleSaveServer}
            localLabel="Sauvegarder localement"
            serverLabel="Sauvegarder sur le serveur"
          />
        )}
        
        {activeTab === 'stats' && (
          <button 
            className={styles.pdfButton}
            onClick={generatePDF}
            title="Générer un PDF des résultats"
          >
            <i className="fas fa-file-pdf"></i> Exporter en PDF
          </button>
        )}
      </div>

      {activeTab === 'stats' ? (
        <div className={styles.card} ref={fullResultsRef}>
          <div className={`${styles.resultsSection} resultsSection`}>
            <h2 className={styles.title}>Résultats des élections professionnelles</h2>
            <p className={styles.electionDate}>Élections du {new Date(resultatsData.date).toLocaleDateString('fr-FR')}</p>
            
            <div className={styles.statsGrid}>
              <div className={styles.scoreCard}>
                <h3 className={styles.sectionTitle}>Score global CGT</h3>
                
                {/* Graphique circulaire amélioré */}
                <div className={styles.pieChartWrapper}>
                  <div className={styles.pieChart}>
                    <div className={styles.pieBackground}></div>
                    <div 
                      className={styles.pieForeground} 
                      style={{ 
                        transform: `rotate(${resultatsData.percentage * 3.6}deg)`,
                        backgroundColor: resultatsData.percentage >= 50 ? '#b91c1c' : '#ef4444'
                      }}
                    ></div>
                    <div className={styles.pieCenter}>
                      <span className={styles.pieValue}>{resultatsData.percentage}%</span>
                      <span className={styles.pieLabel}>des suffrages</span>
                    </div>
                  </div>
                  
                  {/* Annotations */}
                  <div className={styles.pieAnnotations}>
                    {resultatsData.percentage >= 5 && resultatsData.percentage <= 95 && (
                      <>
                        <div className={styles.cgtAnnotation} style={{ 
                          transform: `rotate(${resultatsData.percentage / 100 * Math.PI}rad) translate(80px, 0)` 
                        }}>
                          <span className={styles.annotationText}>CGT</span>
                        </div>
                        <div className={styles.autresAnnotation} style={{ 
                          transform: `rotate(${(resultatsData.percentage / 100 + 1) * Math.PI}rad) translate(80px, 0)` 
                        }}>
                          <span className={styles.annotationText}>Autres</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className={styles.evolution}>
                  <span className={resultatsData.evolution > 0 ? styles.evolutionPositive : styles.evolutionNegative}>
                    {resultatsData.evolution > 0 ? '↑' : '↓'} {Math.abs(resultatsData.evolution)}%
                  </span>
                  <span className={styles.evolutionNote}>vs élections précédentes ({resultatsData.previousPercentage}%)</span>
                </div>
                
                {/* Statistiques détaillées */}
                <div className={styles.detailedStats}>
                  <div className={styles.statItem}>
                    <div className={styles.statIcon}>
                      <FaVoteYea />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statValue}>{resultatsData.cgtVotes}</div>
                      <div className={styles.statLabel}>Voix CGT</div>
                    </div>
                  </div>
                  
                  <div className={styles.statItem}>
                    <div className={styles.statIcon}>
                      <FaUsers />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statValue}>{resultatsData.totalVotes}</div>
                      <div className={styles.statLabel}>Votants</div>
                    </div>
                  </div>
                  
                  <div className={styles.statItem}>
                    <div className={styles.statIcon}>
                      <FaChair />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statValue}>{resultatsData.seats}/{resultatsData.totalSeats}</div>
                      <div className={styles.statLabel}>Sièges</div>
                    </div>
                  </div>
                  
                  <div className={styles.statItem}>
                    <div className={styles.statIcon}>
                      <FaUsers />
                    </div>
                    <div className={styles.statContent}>
                      <div className={styles.statValue}>{resultatsData.participation}%</div>
                      <div className={styles.statLabel}>Participation</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.departmentsCard}>
                <h3 className={styles.sectionTitle}>Répartition par service</h3>
                
                <div className={styles.departmentList}>
                  {resultatsData.departments
                    .sort((a, b) => b.percentage - a.percentage)
                    .map((dept, idx) => (
                    <div key={idx} className={styles.departmentItem}>
                      <div className={styles.departmentHeader}>
                        <span className={styles.departmentName}>{dept.name}</span>
                        <span className={styles.departmentPercentage}>{dept.percentage}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill} 
                          style={{ 
                            width: `${dept.percentage}%`,
                            backgroundColor: dept.percentage >= 50 ? '#b91c1c' : '#ef4444'
                          }}
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
              <h3 className={styles.sectionTitle}>Analyse des résultats</h3>
              
              <div className={styles.analysisGrid}>
                <div className={styles.analysisCard}>
                  <h4 className={styles.analysisTitle}>Points forts</h4>
                  <ul className={styles.analysisList}>
                    {resultatsData.departments
                      .filter(dept => dept.percentage >= 50)
                      .sort((a, b) => b.percentage - a.percentage)
                      .slice(0, 3)
                      .map((dept, idx) => (
                        <li key={idx}>
                          <strong>{dept.name}</strong>: {dept.percentage}% des voix, position dominante
                        </li>
                      ))
                    }
                    {resultatsData.evolution > 0 && (
                      <li>
                        <strong>Progression globale</strong> de {resultatsData.evolution}% par rapport aux élections précédentes
                      </li>
                    )}
                    {(resultatsData.seats / resultatsData.totalSeats) >= 0.5 && (
                      <li>
                        <strong>Majorité au CSE</strong> avec {resultatsData.seats} sièges sur {resultatsData.totalSeats}
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className={styles.analysisCard}>
                  <h4 className={styles.analysisTitle}>Axes d'amélioration</h4>
                  <ul className={styles.analysisList}>
                    {resultatsData.departments
                      .filter(dept => dept.percentage < 40)
                      .sort((a, b) => a.percentage - b.percentage)
                      .slice(0, 3)
                      .map((dept, idx) => (
                        <li key={idx}>
                          <strong>{dept.name}</strong>: Seulement {dept.percentage}% des voix, à renforcer
                        </li>
                      ))
                    }
                    {resultatsData.evolution < 0 && (
                      <li>
                        <strong>Recul</strong> de {Math.abs(resultatsData.evolution)}% par rapport aux élections précédentes
                      </li>
                    )}
                    {resultatsData.participation < 70 && (
                      <li>
                        <strong>Participation</strong> de {resultatsData.participation}% à améliorer lors des prochaines élections
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
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