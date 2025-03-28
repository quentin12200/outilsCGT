import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './ElectionResults.module.css';
import ElectionResultForm from './ElectionResultForm';
import ExcelImporter from './ExcelImporter';
import ElectionDashboard from './ElectionDashboard';

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ElectionResults = ({ results = [], onAddResult }) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [expandedResults, setExpandedResults] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [federationFilter, setFederationFilter] = useState('');
  const [cgtPresenceFilter, setCgtPresenceFilter] = useState('all'); // 'all', 'present', 'absent'
  const [sortOption, setSortOption] = useState('date-desc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImporter, setShowImporter] = useState(false);
  const [localResults, setLocalResults] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' ou 'dashboard'

  // Statistiques globales
  const [stats, setStats] = useState({
    totalResults: 0,
    averageParticipation: 0,
    totalCgtVotes: 0,
    totalVotes: 0,
    totalCgtSeats: 0,
    cgtPercentage: 0,
    cgtPresence: 0,
    cgtPresencePercentage: 0
  });

  // Basculer l'état d'expansion d'un résultat
  const toggleExpand = (id) => {
    setExpandedResults(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Fonction pour calculer les statistiques
  const calculateStats = (results) => {
    if (!results || results.length === 0) {
      setStats({
        totalResults: 0,
        averageParticipation: 0,
        totalCgtVotes: 0,
        totalVotes: 0,
        totalCgtSeats: 0,
        cgtPercentage: 0,
        cgtPresence: 0,
        cgtPresencePercentage: 0
      });
      return;
    }

    let totalParticipation = 0;
    let totalCgtVotes = 0;
    let totalVotes = 0;
    let totalCgtSeats = 0;
    let cgtPresenceCount = 0;

    results.forEach(result => {
      // Calculer la participation
      const participation = result.registeredVoters > 0 
        ? (result.validVotes / result.registeredVoters) * 100 
        : 0;
      totalParticipation += participation;
      
      // Compter les votes CGT
      const cgtResult = result.results.find(r => r.union === 'CGT');
      if (cgtResult) {
        totalCgtVotes += cgtResult.votes;
        totalCgtSeats += cgtResult.seats;
        cgtPresenceCount++;
      }
      
      // Compter le total des votes
      totalVotes += result.validVotes;
    });

    const cgtPercentage = totalVotes > 0 ? (totalCgtVotes / totalVotes) * 100 : 0;
    const cgtPresencePercentage = results.length > 0 ? (cgtPresenceCount / results.length) * 100 : 0;

    setStats({
      totalResults: results.length,
      averageParticipation: results.length > 0 ? totalParticipation / results.length : 0,
      totalCgtVotes,
      totalVotes,
      totalCgtSeats,
      cgtPercentage,
      cgtPresence: cgtPresenceCount,
      cgtPresencePercentage
    });
  };

  // Fonction pour appliquer les filtres et le tri
  const applyFiltersAndSort = (data) => {
    if (!data || data.length === 0) {
      setFilteredResults([]);
      return;
    }

    let filtered = [...data];
    
    // Appliquer le filtre de secteur
    if (sectorFilter) {
      filtered = filtered.filter(result => result.sector === sectorFilter);
    }
    
    // Appliquer le filtre de fédération
    if (federationFilter) {
      filtered = filtered.filter(result => result.federation === federationFilter);
    }
    
    // Appliquer le filtre de présence de la CGT
    if (cgtPresenceFilter === 'present') {
      filtered = filtered.filter(result => result.results.find(r => r.union === 'CGT'));
    } else if (cgtPresenceFilter === 'absent') {
      filtered = filtered.filter(result => !result.results.find(r => r.union === 'CGT'));
    }
    
    // Appliquer la recherche par terme
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(result => 
        result.company.toLowerCase().includes(searchLower) ||
        result.siret?.toLowerCase().includes(searchLower) ||
        result.department?.toLowerCase().includes(searchLower) ||
        result.city?.toLowerCase().includes(searchLower)
      );
    }
    
    // Appliquer le tri
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'company-asc':
          return a.company.localeCompare(b.company);
        case 'company-desc':
          return b.company.localeCompare(a.company);
        case 'cgt-asc': {
          const cgtA = a.results.find(r => r.union === 'CGT');
          const cgtB = b.results.find(r => r.union === 'CGT');
          return (cgtA?.percentage || 0) - (cgtB?.percentage || 0);
        }
        case 'cgt-desc': {
          const cgtA = a.results.find(r => r.union === 'CGT');
          const cgtB = b.results.find(r => r.union === 'CGT');
          return (cgtB?.percentage || 0) - (cgtA?.percentage || 0);
        }
        default:
          return 0;
      }
    });
    
    setFilteredResults(filtered);
  };

  // Charger les données depuis localStorage au montage du composant
  useEffect(() => {
    const loadData = () => {
      // Utiliser les résultats passés en props s'ils existent
      let dataToUse = [];
      
      if (results && results.length > 0) {
        dataToUse = results;
        console.log('Utilisation des données des props:', results.length, 'résultats');
      } else if (localStorage.getItem('importedElectionResults')) {
        try {
          const savedResults = JSON.parse(localStorage.getItem('importedElectionResults'));
          if (Array.isArray(savedResults) && savedResults.length > 0) {
            dataToUse = savedResults;
            console.log('Données chargées depuis localStorage:', savedResults.length, 'résultats');
          }
        } catch (error) {
          console.error('Erreur lors du chargement des données depuis localStorage:', error);
        }
      }
      
      setLocalResults(dataToUse);
    };
    
    loadData();
  }, [results]); // Dépendance uniquement sur results

  // Appliquer les filtres et calculer les statistiques lorsque les données ou les filtres changent
  useEffect(() => {
    if (localResults && localResults.length > 0) {
      applyFiltersAndSort(localResults);
      calculateStats(localResults);
    }
  }, [localResults, searchTerm, sectorFilter, federationFilter, cgtPresenceFilter, sortOption]); // Dépendances explicites

  // Liste des secteurs d'activité uniques
  const sectors = [...new Set(localResults.filter(r => r.sector).map(result => result.sector))].sort();
  
  // Liste des fédérations uniques
  const federations = [...new Set(localResults.filter(r => r.federation).map(result => result.federation))].sort();
  
  // Formater une date au format français
  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Fonction pour afficher un résultat d'élection
  const renderResult = (result, index) => {
    const isExpanded = expandedResults[index] || false;
    
    // Vérifier si la CGT est présente dans cette entreprise
    const cgtResult = result.results.find(r => r.union === 'CGT');
    const cgtPresent = !!cgtResult;
    
    // Calculer la participation
    const participation = result.registeredVoters > 0 
      ? (result.validVotes / result.registeredVoters) * 100 
      : 0;
    
    return (
      <div key={index} className={styles.resultCard}>
        <div className={styles.resultHeader}>
          <div className={styles.resultInfo}>
            <h3 className={styles.legalName}>{result.legalName}</h3>
            {result.company !== result.legalName && (
              <div className={styles.commercialName}>{result.company}</div>
            )}
            <div className={styles.resultMeta}>
              <div className={styles.resultDate}>
                <i className="fas fa-calendar-alt"></i> {formatDate(result.date)}
              </div>
              {result.electoralCycle && (
                <div className={styles.resultCycle}>
                  <i className="fas fa-sync-alt"></i> Cycle {result.electoralCycle}
                </div>
              )}
              {result.sector && (
                <div className={styles.resultSector}>
                  <i className="fas fa-industry"></i> IDCC: {result.sector}
                </div>
              )}
              {result.department && (
                <div className={styles.resultSector}>
                  <i className="fas fa-map-marker-alt"></i> {result.department}
                </div>
              )}
              {result.siret && (
                <div className={styles.resultSector}>
                  <i className="fas fa-id-card"></i> SIRET: {result.siret}
                </div>
              )}
            </div>
          </div>
          <div className={styles.resultSummary}>
            <div className={styles.resultCGT}>
              {cgtPresent ? (
                <>
                  <div className={styles.resultValue}>{cgtResult.percentage.toFixed(1)}%</div>
                  <div className={styles.resultLabel}>CGT</div>
                </>
              ) : (
                <span className={styles.cgtAbsent}>CGT non implantée</span>
              )}
            </div>
            <button 
              className={styles.expandButton} 
              onClick={() => toggleExpand(index)}
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Réduire' : 'Détails'}
              <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
            </button>
          </div>
        </div>
        
        {isExpanded && (
          <div className={styles.resultDetails}>
            <div className={styles.resultColumns}>
              <div className={styles.resultColumn}>
                <h4>Informations générales</h4>
                <div className={styles.infoGrid}>
                  {result.institution && (
                    <div className={styles.infoRow}>
                      <div className={styles.infoLabel}>Institution :</div>
                      <div className={styles.infoValue}>{result.institution}</div>
                    </div>
                  )}
                  {result.college && (
                    <div className={styles.infoRow}>
                      <div className={styles.infoLabel}>Collège :</div>
                      <div className={styles.infoValue}>{result.college}</div>
                    </div>
                  )}
                  {result.collegeComposition && (
                    <div className={styles.infoRow}>
                      <div className={styles.infoLabel}>Composition :</div>
                      <div className={styles.infoValue}>{result.collegeComposition}</div>
                    </div>
                  )}
                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>Inscrits :</div>
                    <div className={styles.infoValue}>{result.registeredVoters}</div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>Votants :</div>
                    <div className={styles.infoValue}>{result.validVotes}</div>
                  </div>
                  {result.blankNullVotes > 0 && (
                    <div className={styles.infoRow}>
                      <div className={styles.infoLabel}>Blancs/Nuls :</div>
                      <div className={styles.infoValue}>{result.blankNullVotes}</div>
                    </div>
                  )}
                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>Participation :</div>
                    <div className={styles.infoValue}>
                      {result.registeredVoters > 0 
                        ? ((result.validVotes / result.registeredVoters) * 100).toFixed(1) 
                        : 0}%
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>Quorum :</div>
                    <div className={styles.infoValue}>
                      {participation > 50 
                        ? <span className={styles.quorumReached}>Atteint</span> 
                        : <span className={styles.quorumNotReached}>Non atteint</span>}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.resultColumn}>
                <h4>Résultats détaillés</h4>
                <div className={styles.resultTable}>
                  <div className={styles.resultTableHeader}>
                    <div className={styles.resultTableCell}>Syndicat</div>
                    <div className={styles.resultTableCell}>Voix</div>
                    <div className={styles.resultTableCell}>%</div>
                    <div className={styles.resultTableCell}>Sièges</div>
                  </div>
                  <div className={styles.resultTableBody}>
                    {/* Si la CGT n'est pas dans les résultats, ajouter une ligne indiquant qu'elle n'est pas implantée */}
                    {!result.results.find(r => r.union === 'CGT') && (
                      <div className={`${styles.resultTableRow} ${styles.cgtNotPresent}`}>
                        <div className={styles.resultTableCell}>CGT</div>
                        <div className={styles.resultTableCell}>-</div>
                        <div className={styles.resultTableCell}>Non implantée</div>
                        <div className={styles.resultTableCell}>-</div>
                      </div>
                    )}
                    {result.results.map((unionResult, idx) => (
                      <div 
                        key={idx} 
                        className={`${styles.resultTableRow} ${unionResult.union === 'CGT' ? styles.cgtRow : ''}`}
                      >
                        <div className={styles.resultTableCell}>{unionResult.union}</div>
                        <div className={styles.resultTableCell}>{unionResult.votes}</div>
                        <div className={styles.resultTableCell}>{unionResult.percentage.toFixed(1)}%</div>
                        <div className={styles.resultTableCell}>{unionResult.seats}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Graphique des résultats */}
            <div className={styles.chartContainer}>
              {result.results.length > 0 ? (
                <Bar
                  data={{
                    labels: result.results.map(r => r.union),
                    datasets: [
                      {
                        label: 'Pourcentage des voix',
                        data: result.results.map(r => r.percentage),
                        backgroundColor: result.results.map(r => 
                          r.union === 'CGT' ? '#e30613' : 
                          r.union === 'CFDT' ? '#ff5f00' :
                          r.union === 'FO' ? '#ffcc00' :
                          r.union === 'CFTC' ? '#00a1de' :
                          r.union === 'CFE-CGC' ? '#0055a4' :
                          r.union === 'UNSA' ? '#009ee0' :
                          r.union === 'SOLIDAIRES' ? '#ff0000' :
                          '#aaaaaa'
                        ),
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: 'Pourcentage (%)'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `${context.dataset.label}: ${context.raw.toFixed(1)}%`;
                          }
                        }
                      }
                    }
                  }}
                />
              ) : (
                <div className={styles.noResultsChart}>
                  <p>Aucun syndicat présent dans cette entreprise</p>
                </div>
              )}
            </div>
            
            {/* Adresse complète si disponible */}
            {(result.address || result.city) && (
              <div className={styles.addressSection}>
                <h4>Adresse</h4>
                <p>
                  {result.address && <span>{result.address}<br /></span>}
                  {result.city && <span>{result.city}</span>}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  // Générer les données pour le graphique
  const getChartData = (result) => {
    const labels = result.results.map(r => r.union);
    const data = result.results.map(r => r.percentage);
    const backgroundColor = result.results.map(r => 
      r.union === 'CGT' ? 'rgba(183, 28, 28, 0.8)' : 'rgba(54, 162, 235, 0.6)'
    );
    
    return {
      labels,
      datasets: [
        {
          label: '% des voix',
          data,
          backgroundColor,
          borderColor: backgroundColor.map(color => color.replace('0.6', '1').replace('0.8', '1')),
          borderWidth: 1
        }
      ]
    };
  };
  
  // Options du graphique
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };
  
  // Gérer l'ajout d'un nouveau résultat
  const handleAddResult = (formData) => {
    if (typeof onAddResult === 'function') {
      onAddResult(formData);
    } else {
      // Si onAddResult n'est pas défini, mettre à jour directement l'état local
      setFilteredResults(prevResults => [...prevResults, formData]);
      
      // Mettre à jour les statistiques avec les nouvelles données
      calculateStats([...results, formData]);
    }
    setShowAddForm(false);
  };
  
  // Gérer l'importation de données
  const handleImportComplete = (importedData) => {
    if (importedData && importedData.length > 0) {
      if (typeof onAddResult === 'function') {
        onAddResult(importedData);
      } else {
        // Si onAddResult n'est pas défini, mettre à jour directement l'état local
        setFilteredResults(prevResults => [...importedData, ...prevResults]);
        
        // Mettre à jour les statistiques avec les nouvelles données
        calculateStats([...results, ...importedData]);
      }
      setShowImporter(false);
    }
  };
  
  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsHeader}>
        <h2>Résultats des élections</h2>
        <div className={styles.resultsCount}>{filteredResults.length} résultats</div>
      </div>
      
      <div className={styles.viewToggle}>
        <button 
          className={`${styles.viewToggleButton} ${viewMode === 'list' ? styles.viewToggleActive : ''}`}
          onClick={() => setViewMode('list')}
        >
          <i className="fas fa-list"></i> Vue détaillée
        </button>
        <button 
          className={`${styles.viewToggleButton} ${viewMode === 'dashboard' ? styles.viewToggleActive : ''}`}
          onClick={() => setViewMode('dashboard')}
        >
          <i className="fas fa-chart-pie"></i> Tableau de bord
        </button>
      </div>
      
      {/* Statistiques globales */}
      {viewMode === 'list' && (
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statTitle}>Total des résultats</div>
            <div className={styles.statValue}>{stats.totalResults}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statTitle}>Participation moyenne</div>
            <div className={styles.statValue}>{stats.averageParticipation.toFixed(1)}%</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statTitle}>Total des voix CGT</div>
            <div className={styles.statValue}>{stats.totalCgtVotes}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statTitle}>Total des sièges CGT</div>
            <div className={styles.statValue}>{stats.totalCgtSeats}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statTitle}>Présence CGT</div>
            <div className={styles.statValue}>{stats.cgtPresence} ({stats.cgtPresencePercentage.toFixed(1)}%)</div>
          </div>
        </div>
      )}
      
      {/* Boutons d'action */}
      <div className={styles.actionsContainer}>
        <button 
          className={styles.addButton} 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowImporter(false);
          }}
        >
          {showAddForm ? 'Annuler' : 'Ajouter un résultat'}
        </button>
        <button 
          className={styles.importButton} 
          onClick={() => {
            setShowImporter(!showImporter);
            setShowAddForm(false);
          }}
        >
          {showImporter ? 'Annuler' : 'Importer des résultats'}
        </button>
      </div>
      
      {/* Formulaires */}
      <div className={styles.formsContainer}>
        {showAddForm && (
          <div className={styles.formWrapper}>
            <ElectionResultForm onSubmit={handleAddResult} />
          </div>
        )}
        
        {showImporter && (
          <div className={styles.formWrapper}>
            <ExcelImporter onImportComplete={handleImportComplete} />
          </div>
        )}
      </div>
      
      {/* Tableau de bord */}
      {viewMode === 'dashboard' && (
        <ElectionDashboard results={filteredResults.length > 0 ? filteredResults : localResults} />
      )}
      
      {/* Vue détaillée des résultats */}
      {viewMode === 'list' && (
        <>
          {/* Filtres */}
          <div className={styles.filtersContainer}>
            <div className={styles.filterGroup}>
              <label htmlFor="search">Rechercher une entreprise</label>
              <input
                id="search"
                type="text"
                placeholder="Nom de l'entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filterGroup}>
              <label htmlFor="sectorFilter">Secteur d'activité</label>
              <select
                id="sectorFilter"
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">Tous les secteurs</option>
                {sectors.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label htmlFor="federationFilter">Fédération</label>
              <select
                id="federationFilter"
                value={federationFilter}
                onChange={(e) => setFederationFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">Toutes les fédérations</option>
                {federations.map((federation, index) => (
                  <option key={index} value={federation}>{federation}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label>Présence CGT</label>
              <div className={styles.cgtPresenceFilter}>
                <button 
                  className={`${styles.cgtPresenceButton} ${cgtPresenceFilter === 'all' ? styles.active : ''}`}
                  onClick={() => setCgtPresenceFilter('all')}
                >
                  Tous
                </button>
                <button 
                  className={`${styles.cgtPresenceButton} ${styles.present} ${cgtPresenceFilter === 'present' ? styles.active : ''}`}
                  onClick={() => setCgtPresenceFilter('present')}
                >
                  CGT présente
                </button>
                <button 
                  className={`${styles.cgtPresenceButton} ${styles.absent} ${cgtPresenceFilter === 'absent' ? styles.active : ''}`}
                  onClick={() => setCgtPresenceFilter('absent')}
                >
                  CGT absente
                </button>
              </div>
            </div>
            
            <div className={styles.filterGroup}>
              <label htmlFor="sortOption">Trier par</label>
              <select
                id="sortOption"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="date-desc">Date (récent → ancien)</option>
                <option value="date-asc">Date (ancien → récent)</option>
                <option value="company-asc">Entreprise (A → Z)</option>
                <option value="company-desc">Entreprise (Z → A)</option>
                <option value="cgt-desc">Score CGT (haut → bas)</option>
                <option value="cgt-asc">Score CGT (bas → haut)</option>
              </select>
            </div>
          </div>
          
          {/* Liste des résultats */}
          <div className={styles.resultsList}>
            {filteredResults.length > 0 ? (
              filteredResults.map((result, index) => renderResult(result, index))
            ) : (
              <div className={styles.noResults}>
                <p>Aucun résultat ne correspond à votre recherche.</p>
                <p>Essayez de modifier vos critères de recherche ou d'ajouter de nouveaux résultats.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ElectionResults;
