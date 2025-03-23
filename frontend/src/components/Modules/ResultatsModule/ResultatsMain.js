// src/components/Modules/ResultatsModule/ResultatsMain.js
import React, { useState, useEffect, useRef } from 'react';
import ResultatsForm from './ResultatsForm';
import SaveButtons from '../../Common/Savebuttons/SaveButtons';
import storageService from '../../services/storageService';
import styles from './ResultatsMain.module.css';
import { FaVoteYea, FaUsers, FaChair, FaChartPie } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function ResultatsMain() {
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' ou 'form'
  const [resultatsData, setResultatsData] = useState({
    participation: 0,
    cgtVotes: 0,
    totalVotes: 0,
    percentage: 0,
    seats: 0,
    totalSeats: 0,
    evolution: +0,
    previousVotes: 312,
    date: '2023-11-15',
    colleges: [
      { name: 'Premier collège (Ouvriers/Employés)', inscriptions: 0, votants: 0, voixCGT: 0, participation: 0, pourcentageCGT: 75 },
      { name: 'Deuxième collège (Techniciens/Agents de maîtrise)', inscriptions: 0, votants: 0, voixCGT: 0, participation: 0, pourcentageCGT: 0 },
      { name: 'Troisième collège (Cadres)', inscriptions: 0, votants: 0, voixCGT: 0, participation: 0, pourcentageCGT: 0 }
    ],
    departments: [
      { name: 'Administration', votes: 0, total: 0, percentage: 0 },
      { name: 'Production', votes: 0, total: 0, percentage: 0 },
      { name: 'R&D', votes: 0, total: 0, percentage: 0 },
      { name: 'Logistique', votes: 0, total: 0, percentage: 0 },
      { name: 'Commercial', votes: 0, total: 0, percentage: 0 },
      { name: 'Maintenance', votes: 0, total: 0, percentage: 0 }
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
      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
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
      const canvas = await html2canvas(fullResultsRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 40, imgWidth, imgHeight);
      
      // Ajouter les informations de bas de page
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Document généré par les outils CGT - Confidentiel - Usage syndical uniquement`, 105, 280, { align: 'center' });
      
      // Enregistrer le PDF
      pdf.save(`Résultats_électoraux_${today.replace(/\//g, '-')}.pdf`);
      
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur est survenue lors de la génération du PDF.");
    }
  };

  return (
    <div className={styles.resultatsContainer}>
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'stats' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <FaChartPie className={styles.tabIcon} /> Résultats
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'form' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <FaVoteYea className={styles.tabIcon} /> Saisie des résultats
        </button>
      </div>
      
      {activeTab === 'stats' ? (
        <div>
          <div className={styles.actionsBar}>
            <button 
              className={styles.pdfButton}
              onClick={generatePDF}
            >
              Exporter en PDF
            </button>
            <SaveButtons 
              onSaveLocal={handleSaveLocal} 
              onSaveServer={handleSaveServer}
              localLabel="Sauvegarder localement"
              serverLabel="Envoyer au serveur"
            />
          </div>
          
          <div className={styles.resultsContent} ref={fullResultsRef}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>Résultats électoraux</h2>
              <p className={styles.resultsDate}>
                Élections du {new Date(resultatsData.date).toLocaleDateString('fr-FR')}
              </p>
            </div>
            
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FaVoteYea />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{resultatsData.percentage}%</div>
                  <div className={styles.statLabel}>Score CGT</div>
                  <div className={styles.statDetail}>
                    {resultatsData.cgtVotes} voix sur {resultatsData.totalVotes} suffrages
                  </div>
                  <div className={styles.statEvolution}>
                    {resultatsData.evolution > 0 ? '+' : ''}{resultatsData.evolution}% par rapport aux élections précédentes
                    <div className={styles.statDetail}>
                      ({resultatsData.previousVotes} voix aux élections précédentes)
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FaUsers />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{resultatsData.participation}%</div>
                  <div className={styles.statLabel}>Participation</div>
                  <div className={styles.statDetail}>
                    {resultatsData.totalVotes} votants
                  </div>
                </div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FaChair />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{resultatsData.seats}/{resultatsData.totalSeats}</div>
                  <div className={styles.statLabel}>Sièges obtenus</div>
                  <div className={styles.statDetail}>
                    {Math.round((resultatsData.seats / resultatsData.totalSeats) * 100)}% des sièges
                  </div>
                </div>
              </div>
            </div>
            
            {/* Résultats par collège */}
            <div className={styles.sectionTitle}>
              <h3>Résultats par collège</h3>
              <p className={styles.sectionSubtitle}>Données officielles du PV d'élection</p>
            </div>
            
            <div className={styles.collegesTable}>
              <div className={styles.tableHeader}>
                <div className={styles.tableHeaderCell}>Collège</div>
                <div className={styles.tableHeaderCell}>Inscrits</div>
                <div className={styles.tableHeaderCell}>Votants</div>
                <div className={styles.tableHeaderCell}>Participation</div>
                <div className={styles.tableHeaderCell}>Voix CGT</div>
                <div className={styles.tableHeaderCell}>Score CGT</div>
              </div>
              
              {resultatsData.colleges && resultatsData.colleges.map((college, index) => (
                <div key={index} className={styles.tableRow}>
                  <div className={styles.tableCell}>{college.name}</div>
                  <div className={styles.tableCell}>{college.inscriptions}</div>
                  <div className={styles.tableCell}>{college.votants}</div>
                  <div className={styles.tableCell}>{college.participation}%</div>
                  <div className={styles.tableCell}>{college.voixCGT}</div>
                  <div className={styles.tableCell}>{college.pourcentageCGT}%</div>
                </div>
              ))}
              
              <div className={styles.tableFooter}>
                <div className={styles.tableCell}>Total</div>
                <div className={styles.tableCell}>
                  {resultatsData.colleges ? resultatsData.colleges.reduce((sum, college) => sum + parseInt(college.inscriptions || 0), 0) : 0}
                </div>
                <div className={styles.tableCell}>
                  {resultatsData.colleges ? resultatsData.colleges.reduce((sum, college) => sum + parseInt(college.votants || 0), 0) : 0}
                </div>
                <div className={styles.tableCell}>
                  {resultatsData.colleges ? Math.round(resultatsData.colleges.reduce((sum, college) => sum + parseInt(college.votants || 0), 0) / resultatsData.colleges.reduce((sum, college) => sum + parseInt(college.inscriptions || 0), 1) * 100) : 0}%
                </div>
                <div className={styles.tableCell}>
                  {resultatsData.colleges ? resultatsData.colleges.reduce((sum, college) => sum + parseInt(college.voixCGT || 0), 0) : 0}
                </div>
                <div className={styles.tableCell}>
                  {resultatsData.colleges ? Math.round(resultatsData.colleges.reduce((sum, college) => sum + parseInt(college.voixCGT || 0), 0) / resultatsData.colleges.reduce((sum, college) => sum + parseInt(college.votants || 0), 1) * 100) : 0}%
                </div>
              </div>
            </div>
            
            {/* Répartition par service */}
            <div className={styles.sectionTitle}>
              <h3>Répartition par service</h3>
              <p className={styles.sectionSubtitle}>Estimation interne (ne figure pas sur le PV officiel)</p>
            </div>
            
            <div className={styles.departmentsGrid}>
              {resultatsData.departments.map((dept, index) => (
                <div key={index} className={styles.departmentCard}>
                  <div className={styles.departmentName}>{dept.name}</div>
                  <div className={styles.departmentScore}>
                    <div className={styles.scoreValue}>{dept.percentage}%</div>
                    <div className={styles.scoreBar}>
                      <div 
                        className={styles.scoreBarFill} 
                        style={{ width: `${dept.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.departmentDetail}>
                    {dept.votes} voix sur {dept.total} votants
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ResultatsForm 
          onSave={handleSaveFormData}
          initialData={resultatsData}
        />
      )}
    </div>
  );
}

export default ResultatsMain;