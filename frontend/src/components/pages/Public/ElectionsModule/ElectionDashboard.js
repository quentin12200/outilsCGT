import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './ElectionResults.module.css';

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ElectionDashboard = ({ results = [] }) => {
  const [cycle, setCycle] = useState('c4');
  const [stats, setStats] = useState({
    totalResults: 0,
    totalPV: 0,
    totalCSE: 0,
    totalDU: 0,
    totalRegisteredVoters: 0,
    totalValidVotes: 0,
    averageParticipation: 0,
    totalCgtVotes: 0,
    totalVotes: 0,
    cgtPercentage: 0,
    cgtPresence: 0,
    cgtPresencePercentage: 0,
    collegeStats: [],
    unionStats: []
  });
  
  // Filtrer les résultats par cycle électoral
  const filteredResults = results.filter(result => 
    result.electoralCycle && result.electoralCycle.toLowerCase() === cycle.toLowerCase()
  );

  // Calculer les statistiques globales
  useEffect(() => {
    if (!filteredResults || filteredResults.length === 0) {
      setStats({
        totalResults: 0,
        totalPV: 0,
        totalCSE: 0,
        totalDU: 0,
        totalRegisteredVoters: 0,
        totalValidVotes: 0,
        averageParticipation: 0,
        totalCgtVotes: 0,
        totalVotes: 0,
        cgtPercentage: 0,
        cgtPresence: 0,
        cgtPresencePercentage: 0,
        collegeStats: [],
        unionStats: []
      });
      return;
    }

    let totalParticipation = 0;
    let totalCgtVotes = 0;
    let totalVotes = 0;
    let cgtPresenceCount = 0;
    let totalRegisteredVoters = 0;
    let totalValidVotes = 0;
    let totalCSE = 0;
    let totalDU = 0;
    
    // Pour les statistiques par collège
    const collegeMap = new Map();
    
    // Pour les statistiques par syndicat
    const unionMap = new Map();

    filteredResults.forEach(result => {
      // Compter les types d'institutions
      if (result.institution) {
        if (result.institution.toUpperCase().includes('CSE')) {
          totalCSE++;
        } else if (result.institution.toUpperCase().includes('DU')) {
          totalDU++;
        }
      }
      
      // Ajouter les inscrits et votants
      totalRegisteredVoters += result.registeredVoters || 0;
      totalValidVotes += result.validVotes || 0;
      
      // Calculer la participation
      const participation = result.registeredVoters > 0 
        ? (result.validVotes / result.registeredVoters) * 100 
        : 0;
      totalParticipation += participation;
      
      // Compter les votes par syndicat
      result.results.forEach(unionResult => {
        // Ajouter au total des votes du syndicat
        if (!unionMap.has(unionResult.union)) {
          unionMap.set(unionResult.union, {
            votes: 0,
            percentage: 0,
            presence: 0
          });
        }
        
        const unionStat = unionMap.get(unionResult.union);
        unionStat.votes += unionResult.votes || 0;
        unionStat.presence++;
        
        // Compter spécifiquement les votes CGT
        if (unionResult.union === 'CGT') {
          totalCgtVotes += unionResult.votes || 0;
          cgtPresenceCount++;
        }
      });
      
      // Compter le total des votes
      totalVotes += result.validVotes || 0;
      
      // Statistiques par collège
      const collegeKey = result.college || 'Non spécifié';
      if (!collegeMap.has(collegeKey)) {
        collegeMap.set(collegeKey, {
          count: 0,
          registeredVoters: 0,
          validVotes: 0,
          cgtVotes: 0,
          cgtPercentage: 0
        });
      }
      
      const collegeStat = collegeMap.get(collegeKey);
      collegeStat.count++;
      collegeStat.registeredVoters += result.registeredVoters || 0;
      collegeStat.validVotes += result.validVotes || 0;
      
      // Ajouter les votes CGT pour ce collège
      const cgtResult = result.results.find(r => r.union === 'CGT');
      if (cgtResult) {
        collegeStat.cgtVotes += cgtResult.votes || 0;
      }
    });

    // Calculer les pourcentages pour chaque syndicat
    unionMap.forEach((stat, union) => {
      stat.percentage = totalVotes > 0 ? (stat.votes / totalVotes) * 100 : 0;
    });
    
    // Calculer les pourcentages CGT par collège
    collegeMap.forEach(stat => {
      stat.cgtPercentage = stat.validVotes > 0 ? (stat.cgtVotes / stat.validVotes) * 100 : 0;
    });
    
    // Convertir les Maps en tableaux pour le state
    const collegeStats = Array.from(collegeMap.entries()).map(([college, stats]) => ({
      college,
      ...stats
    }));
    
    const unionStats = Array.from(unionMap.entries()).map(([union, stats]) => ({
      union,
      ...stats
    })).sort((a, b) => b.votes - a.votes);

    const cgtPercentage = totalVotes > 0 ? (totalCgtVotes / totalVotes) * 100 : 0;
    const cgtPresencePercentage = filteredResults.length > 0 ? (cgtPresenceCount / filteredResults.length) * 100 : 0;
    const averageParticipation = filteredResults.length > 0 ? totalParticipation / filteredResults.length : 0;

    setStats({
      totalResults: filteredResults.length,
      totalPV: filteredResults.length,
      totalCSE,
      totalDU,
      totalRegisteredVoters,
      totalValidVotes,
      averageParticipation,
      totalCgtVotes,
      totalVotes,
      cgtPercentage,
      cgtPresence: cgtPresenceCount,
      cgtPresencePercentage,
      collegeStats,
      unionStats
    });
  }, [filteredResults, cycle]);

  // Données pour le graphique de présence
  const presenceChartData = {
    labels: ['CGT présente', 'CGT absente'],
    datasets: [
      {
        data: [stats.cgtPresence, filteredResults.length - stats.cgtPresence],
        backgroundColor: ['#e30613', '#cccccc'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 1,
      },
    ],
  };

  // Données pour le graphique de répartition par syndicat
  const unionChartData = {
    labels: stats.unionStats.map(stat => stat.union),
    datasets: [
      {
        label: 'Pourcentage des voix',
        data: stats.unionStats.map(stat => stat.percentage.toFixed(1)),
        backgroundColor: stats.unionStats.map(stat => 
          stat.union === 'CGT' ? '#e30613' : 
          stat.union === 'CFDT' ? '#ff5f00' :
          stat.union === 'FO' ? '#ffcc00' :
          stat.union === 'CFTC' ? '#00a1de' :
          stat.union === 'CFE-CGC' ? '#ff69b4' :
          stat.union === 'UNSA' ? '#009900' :
          stat.union === 'SOLIDAIRES' ? '#993366' :
          '#999999'
        ),
      },
    ],
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h2>Tableau de bord - Élections CSE</h2>
        
        <div className={styles.cycleSelector}>
          <label>Veuillez sélectionner le cycle sur lequel vous souhaitez travailler !</label>
          <div className={styles.cycleOptions}>
            <select 
              value={cycle} 
              onChange={(e) => setCycle(e.target.value)}
              className={styles.cycleSelect}
            >
              <option value="c4">Cycle 4 - Élections du Cycle 4 (2021 - 2024)</option>
              <option value="c3">Cycle 3 - Élections du Cycle 3 (2017 - 2020)</option>
              <option value="c2">Cycle 2 - Élections du Cycle 2 (2013 - 2016)</option>
              <option value="c1">Cycle 1 - Élections du Cycle 1 (2009 - 2012)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className={styles.dashboardStats}>
        <div className={styles.statBox}>
          <div className={styles.statHeader}>
            <h3>Statistiques globales</h3>
          </div>
          <div className={styles.statGrid}>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Total des PV</div>
              <div className={styles.statValue}>{stats.totalPV}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>CSE</div>
              <div className={styles.statValue}>{stats.totalCSE}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>DU</div>
              <div className={styles.statValue}>{stats.totalDU}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Inscrits</div>
              <div className={styles.statValue}>{stats.totalRegisteredVoters}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Votants</div>
              <div className={styles.statValue}>{stats.totalValidVotes}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Participation moyenne</div>
              <div className={styles.statValue}>{stats.averageParticipation.toFixed(1)}%</div>
            </div>
          </div>
        </div>
        
        <div className={styles.statBox}>
          <div className={styles.statHeader}>
            <h3>Taux de présence</h3>
            <div className={styles.subHeader}>Par établissement</div>
          </div>
          <div className={styles.chartWrapper}>
            <Pie 
              data={presenceChartData} 
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const percentage = (value / filteredResults.length * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                      }
                    }
                  }
                }
              }}
            />
            <div className={styles.chartLabel}>
              CGT : {stats.cgtPresencePercentage.toFixed(1)}%
            </div>
          </div>
        </div>
        
        <div className={styles.statBox}>
          <div className={styles.statHeader}>
            <h3>Taux de présence</h3>
            <div className={styles.subHeader}>Par nombre d'inscrits</div>
          </div>
          <div className={styles.chartWrapper}>
            <Pie 
              data={{
                labels: ['CGT présente', 'CGT absente'],
                datasets: [
                  {
                    data: [
                      stats.unionStats.find(s => s.union === 'CGT')?.votes || 0,
                      stats.totalValidVotes - (stats.unionStats.find(s => s.union === 'CGT')?.votes || 0)
                    ],
                    backgroundColor: ['#e30613', '#cccccc'],
                    borderColor: ['#ffffff', '#ffffff'],
                    borderWidth: 1,
                  },
                ],
              }} 
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const percentage = (value / stats.totalValidVotes * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                      }
                    }
                  }
                }
              }}
            />
            <div className={styles.chartLabel}>
              CGT : {stats.cgtPercentage.toFixed(1)}%
            </div>
          </div>
        </div>
        
        <div className={styles.statBox}>
          <div className={styles.statHeader}>
            <h3>Estimation représentativité</h3>
            <div className={styles.subHeader}>Cycle {cycle.toUpperCase()}</div>
          </div>
          <div className={styles.representativityTable}>
            <div className={styles.representativityHeader}>
              <div>Syndicat</div>
              <div>Voix</div>
              <div>%</div>
            </div>
            {stats.unionStats.map((stat, index) => (
              <div 
                key={index} 
                className={`${styles.representativityRow} ${stat.union === 'CGT' ? styles.cgtRow : ''}`}
              >
                <div>{stat.union}</div>
                <div>{stat.votes}</div>
                <div>{stat.percentage.toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.statBox}>
          <div className={styles.statHeader}>
            <h3>Répartition par collège</h3>
          </div>
          <div className={styles.collegeTable}>
            <div className={styles.collegeTableHeader}>
              <div>Organisation</div>
              <div>Collège</div>
              <div>Nb. PV</div>
              <div>Pourcentage</div>
            </div>
            {stats.collegeStats.map((stat, index) => (
              <div key={index} className={styles.collegeTableRow}>
                <div>CGT</div>
                <div>{stat.college}</div>
                <div>{stat.count}</div>
                <div>{stat.cgtPercentage.toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.dashboardFooter}>
        <div className={styles.unionBarChart}>
          <h3>Répartition des voix par syndicat</h3>
          <Bar
            data={unionChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const label = context.dataset.label || '';
                      const value = context.raw || 0;
                      return `${label}: ${value}%`;
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  title: {
                    display: true,
                    text: 'Pourcentage (%)'
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ElectionDashboard;
