// src/components/RetroplanningModule/RetroplanningMain.js
import React, { useState, useEffect } from 'react';
import Timeline from './Timeline';
import PhasePlanning from './PhasePlanning';
import styles from './RetroplanningMain.module.css';

function RetroplanningMain() {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [dateEvenement, setDateEvenement] = useState('');
  const [joursRestants, setJoursRestants] = useState(null);
  const [phaseActuelle, setPhaseActuelle] = useState(null);
  
  // Définition des phases du rétro-planning selon le document
  const phases = [
    { 
      id: 'analyse', 
      title: 'Analyse et Organisation', 
      description: 'État des lieux, ciblage, anticipation', 
      color: 'bg-blue-600',
      joursAvant: 120,
      joursApres: 90
    },
    { 
      id: 'besoins', 
      title: '1ère Étape: Besoins', 
      description: 'Recueil des besoins auprès des salariés', 
      color: 'bg-yellow-600',
      joursAvant: 90,
      joursApres: 60
    },
    { 
      id: 'revendications', 
      title: '2ème Étape: Revendications', 
      description: 'Élaboration du cahier revendicatif', 
      color: 'bg-green-600',
      joursAvant: 60,
      joursApres: 40
    },
    { 
      id: 'mobilisation', 
      title: '3ème Étape: Mobilisation', 
      description: 'Organisation de la mobilisation', 
      color: 'bg-red-600',
      joursAvant: 40,
      joursApres: 10
    },
    { 
      id: 'jourj', 
      title: 'Jour J', 
      description: 'Jour du scrutin, remise des timbres ou journée de lutte', 
      color: 'bg-purple-700',
      joursAvant: 0,
      joursApres: 0
    },
    { 
      id: 'bilan', 
      title: 'Bilan et Perspectives', 
      description: 'Analyse des résultats et préparation des prochaines étapes', 
      color: 'bg-indigo-600',
      joursAvant: -1,
      joursApres: -30
    }
  ];

  // Générer les dates pour chaque phase en fonction de la date de l'événement
  const genererDatesPhases = () => {
    if (!dateEvenement) return {};
    
    const dateJ = new Date(dateEvenement);
    const datesPhases = {};
    
    phases.forEach(phase => {
      if (phase.id === 'jourj') {
        datesPhases[phase.id] = dateJ.toLocaleDateString('fr-FR');
      } else if (phase.id === 'bilan') {
        const dateDebut = new Date(dateJ);
        dateDebut.setDate(dateJ.getDate() + 1);
        const dateFin = new Date(dateJ);
        dateFin.setDate(dateJ.getDate() + 30);
        datesPhases[phase.id] = `${dateDebut.toLocaleDateString('fr-FR')} - ${dateFin.toLocaleDateString('fr-FR')}`;
      } else {
        const dateDebut = new Date(dateJ);
        dateDebut.setDate(dateJ.getDate() - phase.joursAvant);
        const dateFin = new Date(dateJ);
        dateFin.setDate(dateJ.getDate() - phase.joursApres);
        datesPhases[phase.id] = `${dateDebut.toLocaleDateString('fr-FR')} - ${dateFin.toLocaleDateString('fr-FR')}`;
      }
    });
    
    return datesPhases;
  };

  // Fonction pour calculer les jours restants et déterminer la phase actuelle
  useEffect(() => {
    if (dateEvenement) {
      const dateJ = new Date(dateEvenement);
      const aujourdhui = new Date();
      
      // Calculer la différence en jours
      const diffTime = dateJ - aujourdhui;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setJoursRestants(diffDays);
      
      // Déterminer la phase actuelle en fonction des jours restants
      if (diffDays > 90) {
        setPhaseActuelle('analyse');
      } else if (diffDays > 60) {
        setPhaseActuelle('besoins');
      } else if (diffDays > 40) {
        setPhaseActuelle('revendications');
      } else if (diffDays > 0) {
        setPhaseActuelle('mobilisation');
      } else if (diffDays === 0) {
        setPhaseActuelle('jourj');
      } else {
        setPhaseActuelle('bilan');
      }
      
      // Sélectionner automatiquement la phase actuelle si aucune phase n'est sélectionnée
      if (!selectedPhase && phaseActuelle) {
        setSelectedPhase(phaseActuelle);
      }
    }
  }, [dateEvenement, selectedPhase, phaseActuelle]);

  // Générer les phases avec leurs dates pour la timeline
  const getPhasesWithDates = () => {
    if (!dateEvenement) return phases;
    
    return phases.map(phase => {
      let periodText = "";
      const dateJ = new Date(dateEvenement);
      
      if (phase.id === 'jourj') {
        periodText = dateJ.toLocaleDateString('fr-FR');
      } else if (phase.id === 'bilan') {
        const dateDebut = new Date(dateJ);
        dateDebut.setDate(dateJ.getDate() + 1);
        const dateFin = new Date(dateJ);
        dateFin.setDate(dateJ.getDate() + 30);
        periodText = `${dateDebut.toLocaleDateString('fr-FR')} - ${dateFin.toLocaleDateString('fr-FR')}`;
      } else {
        const dateDebut = new Date(dateJ);
        dateDebut.setDate(dateJ.getDate() - phase.joursAvant);
        const dateFin = new Date(dateJ);
        dateFin.setDate(dateJ.getDate() - phase.joursApres);
        periodText = `${dateDebut.toLocaleDateString('fr-FR')} - ${dateFin.toLocaleDateString('fr-FR')}`;
      }
      
      return {
        ...phase,
        periodText
      };
    });
  };

  // Obtenir les phases avec leurs dates
  const phasesWithDates = getPhasesWithDates();

  // NOUVELLE LIGNE IMPORTANTE : Calculer les dates des phases
  const datesPhases = genererDatesPhases();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Rétro-planning de la démarche syndicale</h2>
      
      {/* Le reste du code reste identique */}
      <div className={styles.tableContainer}>
        <table className={styles.phasesTable}>
          <thead className={styles.tableHeader}>
            <tr>
              <th scope="col" className={styles.tableHeaderCell}>Phase</th>
              <th scope="col" className={styles.tableHeaderCell}>Période</th>
              <th scope="col" className={styles.tableHeaderCell}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {phases.map(phase => {
              // Déterminer le statut de la phase
              let phaseStatus = "";
              let phaseStatusClass = "";
              
              if (phase.id === phaseActuelle) {
                phaseStatus = "En cours";
                phaseStatusClass = styles.statusActive;
              } else if ((phases.findIndex(p => p.id === phase.id) < phases.findIndex(p => p.id === phaseActuelle))) {
                phaseStatus = "Terminée";
                phaseStatusClass = styles.statusCompleted;
              } else {
                phaseStatus = "À venir";
                phaseStatusClass = styles.statusUpcoming;
              }
              
              // Style pour le cercle de la phase
              const circleStyle = {};
              if (phase.color) {
                // Extrait la couleur du format "bg-color-600" 
                const colorMatch = phase.color.match(/bg-([a-z]+)-([0-9]+)/);
                if (colorMatch) {
                  const colorName = colorMatch[1];
                  const colorIntensity = colorMatch[2];
                  circleStyle.backgroundColor = `var(--${colorName}-${colorIntensity}, ${phase.color.replace('bg-', '')})`;
                } else {
                  circleStyle.backgroundColor = phase.color.replace('bg-', '');
                }
              }
              
              return (
                <tr 
                  key={phase.id}
                  className={`${styles.tableRow} ${phase.id === selectedPhase ? styles.tableRowActive : ''}`}
                  onClick={() => setSelectedPhase(phase.id)}
                  style={{cursor: "pointer"}}
                >
                  <td className={styles.tableCell}>
                    <div className={styles.phaseBadge}>
                      <div className={styles.phaseCircle} style={circleStyle}>
                        {phases.findIndex(p => p.id === phase.id) + 1}
                      </div>
                      <div className={styles.phaseInfo}>
                        <div className={styles.phaseName}>{phase.title}</div>
                        <div className={styles.phaseDesc}>{phase.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.phasePeriod}>{datesPhases[phase.id]}</div>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${phaseStatusClass}`}>
                      {phaseStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Reste de votre code */}
      <div className="mb-8">
        <p className={styles.description}>
          Le rétro-planning vous permet d'organiser votre action syndicale dans le temps, 
          en préparant chaque étape nécessaire à la réussite de votre démarche. 
          Sélectionnez une phase pour afficher les actions correspondantes.
        </p>
        
        <Timeline 
          phases={phasesWithDates}
          selectedPhase={selectedPhase} 
          onSelectPhase={setSelectedPhase} 
        />
      </div>
      
      {selectedPhase && (
        <PhasePlanning phase={phases.find(p => p.id === selectedPhase)} />
      )}
      
      {/* Section d'aide et conseils */}
      <div className={styles.tipsSection}>
        <h3 className={styles.tipsTitle}>Conseils pour un rétro-planning efficace</h3>
        
        <div className={styles.tipsGrid}>
          <div className={styles.tipOrgCard}>
            <h4 className={styles.tipCardTitle}>Planification et anticipation</h4>
            <ul className={styles.tipsList}>
              <li className={styles.tipOrgItem}>Commencez votre rétro-planning suffisamment tôt (idéalement 4 mois avant le Jour J)</li>
              <li className={styles.tipOrgItem}>Identifiez les étapes critiques qui nécessitent plus de temps</li>
              <li className={styles.tipOrgItem}>Prévoyez des marges de sécurité pour chaque phase</li>
              <li className={styles.tipOrgItem}>Adaptez le calendrier aux spécificités de votre établissement</li>
            </ul>
          </div>
          
          <div className={styles.tipMobCard}>
            <h4 className={styles.tipMobCardTitle}>Mobilisation des équipes</h4>
            <ul className={styles.tipsList}>
              <li className={styles.tipMobItem}>Partagez le rétro-planning avec tous les syndiqués</li>
              <li className={styles.tipMobItem}>Répartissez clairement les responsabilités pour chaque action</li>
              <li className={styles.tipMobItem}>Organisez des points d'étape réguliers pour suivre l'avancement</li>
              <li className={styles.tipMobItem}>Valorisez chaque réussite pour maintenir la dynamique</li>
            </ul>
          </div>
        </div>
        
        <button className={styles.downloadButton}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Télécharger le guide complet du rétro-planning CGT
        </button>
      </div>
    </div>
  );
}

export default RetroplanningMain;