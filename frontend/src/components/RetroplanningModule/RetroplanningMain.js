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

  // Définition des phases avec des codes couleur hexadécimaux
  const phases = [
    { 
      id: 'analyse', 
      title: 'Analyse et Organisation', 
      description: 'État des lieux, ciblage, anticipation', 
      color: '#3F51B5', // bleu
      joursAvant: 120,
      joursApres: 90
    },
    { 
      id: 'besoins', 
      title: '1ère Étape: Besoins', 
      description: 'Recueil des besoins auprès des salariés', 
      color: '#FFC107', // jaune
      joursAvant: 90,
      joursApres: 60
    },
    { 
      id: 'revendications', 
      title: '2ème Étape: Revendications', 
      description: 'Élaboration du cahier revendicatif', 
      color: '#388E3C', // vert
      joursAvant: 60,
      joursApres: 40
    },
    { 
      id: 'mobilisation', 
      title: '3ème Étape: Mobilisation', 
      description: 'Organisation de la mobilisation', 
      color: '#b91c1c', // rouge
      joursAvant: 40,
      joursApres: 10
    },
    { 
      id: 'jourj', 
      title: 'Jour J', 
      description: 'Jour du scrutin ou journée de lutte', 
      color: '#9C27B0', // violet
      joursAvant: 0,
      joursApres: 0
    },
    { 
      id: 'bilan', 
      title: 'Bilan et Perspectives', 
      description: 'Analyse des résultats et préparation des prochaines étapes', 
      color: '#3F51B5', // bleu (modifiable)
      joursAvant: -1,
      joursApres: -30
    }
  ];

  // Calcul des jours restants et détermination de la phase actuelle
  useEffect(() => {
    if (dateEvenement) {
      const dateJ = new Date(dateEvenement);
      const aujourdhui = new Date();
      const diffTime = dateJ - aujourdhui;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setJoursRestants(diffDays);

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

      if (!selectedPhase) {
        setSelectedPhase(phaseActuelle);
      }
    }
  }, [dateEvenement, selectedPhase, phaseActuelle]);

  // Génération des dates pour chaque phase en fonction de la date de l'événement
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

  const datesPhases = genererDatesPhases();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Rétro-planning de la démarche syndicale</h2>
      
      {/* Formulaire de date */}
      <div className={styles.dateForm}>
        <h3 className={styles.formTitle}>Définir la date de votre événement</h3>
        <p className={styles.formDescription}>
          Tout le rétro-planning s'organisera à partir de cette date clé (scrutin, action revendicative, etc.).
        </p>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="date-evenement" className={styles.formLabel}>
              Date de l'événement (Jour J)
            </label>
            <input
              type="date"
              id="date-evenement"
              className={styles.formInput}
              value={dateEvenement}
              onChange={(e) => setDateEvenement(e.target.value)}
            />
          </div>
          {joursRestants !== null && (
            <div className={styles.dayCounter}>
              {joursRestants > 0 ? (
                <span className={styles.fontSemibold}>J-{joursRestants} avant l'événement</span>
              ) : joursRestants === 0 ? (
                <span className={styles.fontSemibold}>C'est aujourd'hui !</span>
              ) : (
                <span className={styles.fontSemibold}>J+{Math.abs(joursRestants)} après l'événement</span>
              )}
            </div>
          )}
        </div>
        {phaseActuelle && (
          <div className={styles.currentPhaseAlert}>
            <p className={styles.currentPhaseText}>
              <span className={styles.fontSemibold}>Phase actuelle : </span>
              {phases.find(p => p.id === phaseActuelle)?.title} - Vous êtes dans la bonne période pour cette phase.
            </p>
          </div>
        )}
      </div>
      
      {/* Tableau des phases */}
      <div className={styles.calendarSection}>
        <div className={styles.tableContainer}>
          <table className={styles.phasesTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Phase</th>
                <th className={styles.tableHeaderCell}>Période</th>
                <th className={styles.tableHeaderCell}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {phases.map(phase => {
                let statut = "";
                let statusClass = "";
                if (phase.id === phaseActuelle) {
                  statut = "En cours";
                  statusClass = styles.statusActive;
                } else if (phases.findIndex(p => p.id === phase.id) < phases.findIndex(p => p.id === phaseActuelle)) {
                  statut = "Terminée";
                  statusClass = styles.statusCompleted;
                } else {
                  statut = "À venir";
                  statusClass = styles.statusUpcoming;
                }
                return (
                  <tr
                    key={phase.id}
                    className={phase.id === selectedPhase ? styles.tableRowActive : styles.tableRow}
                    onClick={() => setSelectedPhase(phase.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className={styles.tableCell}>
                      <div className={styles.phaseBadge}>
                        <div
                          className={styles.phaseCircle}
                          style={{ backgroundColor: phase.color }}
                        >
                          {phases.findIndex(p => p.id === phase.id) + 1}
                        </div>
                        <div className={styles.phaseInfo}>
                          <div className={styles.phaseName}>{phase.title}</div>
                          <div className={styles.phaseDesc}>{phase.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tableCell}>{datesPhases[phase.id]}</td>
                    <td className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${statusClass}`}>
                        {statut}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className={styles.formDescription}>
        Le rétro-planning vous permet d'organiser votre action syndicale dans le temps, en préparant chaque étape nécessaire à la réussite de votre démarche. Sélectionnez une phase pour afficher les actions correspondantes.
      </div>
      
      <Timeline 
        phases={phases} 
        selectedPhase={selectedPhase} 
        onSelectPhase={setSelectedPhase} 
      />
      
      {selectedPhase && (
        <PhasePlanning phase={phases.find(p => p.id === selectedPhase)} />
      )}
      
      {/* Section d'aide et conseils */}
      <div className={styles.tipsSection}>
        <h3 className={styles.tipsTitle}>Conseils pour un rétro-planning efficace</h3>
        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <h4 className={styles.tipCardTitle}>Planification et anticipation</h4>
            <ul className={styles.tipsList}>
              <li>Commencez votre rétro-planning suffisamment tôt (idéalement 4 mois avant le Jour J)</li>
              <li>Identifiez les étapes critiques qui nécessitent plus de temps</li>
              <li>Prévoyez des marges de sécurité pour chaque phase</li>
              <li>Adaptez le calendrier aux spécificités de votre établissement</li>
            </ul>
          </div>
          <div className={styles.tipCard}>
            <h4 className={styles.tipCardTitle}>Mobilisation des équipes</h4>
            <ul className={styles.tipsList}>
              <li>Partagez le rétro-planning avec tous les syndiqués</li>
              <li>Répartissez clairement les responsabilités pour chaque action</li>
              <li>Organisez des points d'étape réguliers pour suivre l'avancement</li>
              <li>Valorisez chaque réussite pour maintenir la dynamique</li>
            </ul>
          </div>
        </div>
        <div className={styles.downloadButton}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Télécharger le guide complet du rétro-planning CGT
        </div>
      </div>
    </div>
  );
}

export default RetroplanningMain;
