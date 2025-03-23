// src/components/RetroplanningModule/RetroplanningMain.js
import React, { useState, useEffect } from 'react';
import Timeline from './Timeline';
import PhasePlanning from './PhasePlanning';
import styles from './RetroplanningMain.module.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

function RetroplanningMain({ retroplanningType = 'elections' }) {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [dateEvenement, setDateEvenement] = useState('');
  const [joursRestants, setJoursRestants] = useState(null);
  const [phaseActuelle, setPhaseActuelle] = useState(null);
  const [customPhases, setCustomPhases] = useState({});
  const [isAddingPhase, setIsAddingPhase] = useState(false);
  const [phases, setPhases] = useState([]);
  const [newPhase, setNewPhase] = useState({
    id: '',
    title: '',
    description: '',
    color: '#3F51B5',
    joursAvant: 30,
    joursApres: 0
  });

  // Fonction pour mettre à jour les phases personnalisées
  const handleUpdatePhase = (type, phaseId, updates) => {
    setCustomPhases(prev => ({
      ...prev,
      [`${type}-${phaseId}`]: {
        ...(prev[`${type}-${phaseId}`] || {}),
        ...updates
      }
    }));
  };

  // Fonction pour ajouter une nouvelle phase
  const handleAddPhase = () => {
    if (!newPhase.id || !newPhase.title) {
      alert("Veuillez remplir au moins l'identifiant et le titre de la phase.");
      return;
    }

    // Vérifier que l'ID n'existe pas déjà
    const phaseExists = phasesConfig[retroplanningType].phases.some(p => p.id === newPhase.id);
    if (phaseExists) {
      alert("Une phase avec cet identifiant existe déjà. Veuillez choisir un autre identifiant.");
      return;
    }

    // Ajouter la nouvelle phase
    const updatedPhases = [...phasesConfig[retroplanningType].phases, newPhase];
    
    // Mettre à jour la configuration des phases
    phasesConfig[retroplanningType].phases = updatedPhases;
    
    // Réinitialiser le formulaire
    setNewPhase({
      id: '',
      title: '',
      description: '',
      color: '#3F51B5',
      joursAvant: 30,
      joursApres: 0
    });
    
    // Fermer le modal
    setIsAddingPhase(false);
    
    // Mettre à jour les phases
    setPhases(updatedPhases);
  };

  // Fonction pour ouvrir le modal d'ajout de phase
  const openAddPhaseModal = () => {
    setIsAddingPhase(true);
  };

  // Fonction pour fermer le modal d'ajout de phase
  const closeAddPhaseModal = () => {
    setIsAddingPhase(false);
  };

  // Fonction pour exporter toutes les phases en PDF
  const exportAllPhasesToPDF = () => {
    if (!dateEvenement) {
      alert("Veuillez d'abord définir une date d'événement pour générer le PDF.");
      return;
    }

    const pdf = new jsPDF();
    
    // Titre du document
    pdf.setFontSize(18);
    pdf.setTextColor(227, 6, 19); // Rouge CGT
    pdf.text(`Rétro-planning : ${phasesConfig[retroplanningType]?.title || "Démarche syndicale"}`, 14, 20);
    
    // Sous-titre avec la date de l'événement
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Date de l'événement : ${new Date(dateEvenement).toLocaleDateString('fr-FR')}`, 14, 30);
    
    // Informations sur le document
    pdf.setFontSize(10);
    pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} par Outils CGT Aveyron`, 14, 40);
    
    // Tableau des phases
    const tableColumn = ["Phase", "Période", "Description", "Statut"];
    const tableRows = [];
    
    // Préparer les données pour le tableau
    phases.forEach((phase) => {
      const dateJ = new Date(dateEvenement);
      const aujourdhui = new Date();
      const diffTime = dateJ - aujourdhui;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let statut = "";
      if (phase.joursAvant <= diffDays && phase.joursApres >= diffDays) {
        statut = "En cours";
      } else if (diffDays > phase.joursAvant) {
        statut = "À venir";
      } else {
        statut = "Terminée";
      }
      
      tableRows.push([
        phase.title,
        datesPhases[phase.id] || "Non définie",
        phase.description,
        statut
      ]);
    });
    
    // Créer le tableau
    pdf.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: { 
        fontSize: 10,
        cellPadding: 3,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [227, 6, 19],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { cellWidth: 40 },
        2: { cellWidth: 'auto' },
        3: { cellWidth: 25 }
      },
    });
    
    // Ajouter des informations sur l'utilisation
    const finalY = pdf.lastAutoTable.finalY || 50;
    pdf.setFontSize(10);
    pdf.text("Ce document présente l'ensemble des phases de votre rétro-planning avec leurs périodes.", 14, finalY + 10);
    pdf.text("Pour plus de détails sur chaque phase, consultez l'application Outils CGT Aveyron.", 14, finalY + 15);
    
    // Ajouter le logo CGT en bas de page
    pdf.setProperties({
      title: `Rétro-planning ${phasesConfig[retroplanningType]?.title}`,
      subject: 'Plan d\'action syndical',
      author: 'CGT Aveyron',
      creator: 'Outils CGT Aveyron'
    });
    
    // Sauvegarder le PDF
    pdf.save(`retroplanning-complet-${retroplanningType}.pdf`);
  };

  // Configuration des phases en fonction du type de rétro-planning
  const phasesConfig = {
    elections: {
      title: "Élections CSE",
      phases: [
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
      ]
    },
    syndicalisation: {
      title: "Campagne de syndicalisation",
      phases: [
        { 
          id: 'preparation', 
          title: 'Préparation', 
          description: 'Organisation de la campagne et formation des militants', 
          color: '#3F51B5', // bleu
          joursAvant: 90,
          joursApres: 75
        },
        { 
          id: 'cartographie', 
          title: 'Cartographie', 
          description: 'Analyse des services et identification des cibles prioritaires', 
          color: '#FFC107', // jaune
          joursAvant: 75,
          joursApres: 60
        },
        { 
          id: 'communication', 
          title: 'Communication', 
          description: 'Élaboration et diffusion des supports de communication', 
          color: '#388E3C', // vert
          joursAvant: 60,
          joursApres: 45
        },
        { 
          id: 'deploiement', 
          title: 'Déploiement', 
          description: 'Rencontres individuelles et collectives avec les salariés', 
          color: '#b91c1c', // rouge
          joursAvant: 45,
          joursApres: 15
        },
        { 
          id: 'adhesion', 
          title: 'Adhésions', 
          description: 'Recueil des adhésions et intégration des nouveaux syndiqués', 
          color: '#9C27B0', // violet
          joursAvant: 15,
          joursApres: 0
        },
        { 
          id: 'suivi', 
          title: 'Suivi et fidélisation', 
          description: 'Accueil des nouveaux adhérents et suivi de leur intégration', 
          color: '#3F51B5', // bleu
          joursAvant: -1,
          joursApres: -30
        }
      ]
    },
    nao: {
      title: "NAO Salaires",
      phases: [
        { 
          id: 'preparation', 
          title: 'Préparation', 
          description: 'Collecte des données économiques et sociales', 
          color: '#3F51B5', // bleu
          joursAvant: 60,
          joursApres: 45
        },
        { 
          id: 'consultation', 
          title: 'Consultation', 
          description: 'Recueil des attentes des salariés', 
          color: '#FFC107', // jaune
          joursAvant: 45,
          joursApres: 30
        },
        { 
          id: 'elaboration', 
          title: 'Élaboration', 
          description: 'Construction des revendications salariales', 
          color: '#388E3C', // vert
          joursAvant: 30,
          joursApres: 20
        },
        { 
          id: 'mobilisation', 
          title: 'Mobilisation', 
          description: 'Information et mobilisation des salariés', 
          color: '#b91c1c', // rouge
          joursAvant: 20,
          joursApres: 5
        },
        { 
          id: 'negociation', 
          title: 'Négociation', 
          description: 'Séances de négociation avec la direction', 
          color: '#9C27B0', // violet
          joursAvant: 5,
          joursApres: 0
        },
        { 
          id: 'bilan', 
          title: 'Bilan et communication', 
          description: 'Analyse des résultats et information aux salariés', 
          color: '#3F51B5', // bleu
          joursAvant: -1,
          joursApres: -15
        }
      ]
    },
    lutte: {
      title: "Lutte spécifique",
      phases: [
        { 
          id: 'analyse', 
          title: 'Analyse de la situation', 
          description: 'Identification du problème et des enjeux', 
          color: '#3F51B5', // bleu
          joursAvant: 45,
          joursApres: 35
        },
        { 
          id: 'revendications', 
          title: 'Élaboration des revendications', 
          description: 'Construction des revendications avec les salariés', 
          color: '#FFC107', // jaune
          joursAvant: 35,
          joursApres: 25
        },
        { 
          id: 'strategie', 
          title: 'Stratégie d\'action', 
          description: 'Définition des moyens d\'action et du calendrier', 
          color: '#388E3C', // vert
          joursAvant: 25,
          joursApres: 15
        },
        { 
          id: 'mobilisation', 
          title: 'Mobilisation', 
          description: 'Information et mobilisation des salariés', 
          color: '#b91c1c', // rouge
          joursAvant: 15,
          joursApres: 5
        },
        { 
          id: 'action', 
          title: 'Action collective', 
          description: 'Mise en œuvre de l\'action (grève, manifestation...)', 
          color: '#9C27B0', // violet
          joursAvant: 5,
          joursApres: 0
        },
        { 
          id: 'bilan', 
          title: 'Bilan et perspectives', 
          description: 'Analyse des résultats et suites à donner', 
          color: '#3F51B5', // bleu
          joursAvant: -1,
          joursApres: -15
        }
      ]
    },
    formation: {
      title: "Plan de formation",
      phases: [
        { 
          id: 'besoins', 
          title: 'Analyse des besoins', 
          description: 'Identification des besoins en formation des militants', 
          color: '#3F51B5', // bleu
          joursAvant: 90,
          joursApres: 75
        },
        { 
          id: 'programme', 
          title: 'Élaboration du programme', 
          description: 'Construction du programme de formation annuel', 
          color: '#FFC107', // jaune
          joursAvant: 75,
          joursApres: 60
        },
        { 
          id: 'organisation', 
          title: 'Organisation logistique', 
          description: 'Planification des sessions et réservation des ressources', 
          color: '#388E3C', // vert
          joursAvant: 60,
          joursApres: 30
        },
        { 
          id: 'communication', 
          title: 'Communication', 
          description: 'Information aux militants et recueil des inscriptions', 
          color: '#b91c1c', // rouge
          joursAvant: 30,
          joursApres: 15
        },
        { 
          id: 'formation', 
          title: 'Sessions de formation', 
          description: 'Réalisation des sessions de formation', 
          color: '#9C27B0', // violet
          joursAvant: 15,
          joursApres: 0
        },
        { 
          id: 'evaluation', 
          title: 'Évaluation et suivi', 
          description: 'Bilan des formations et suivi des acquis', 
          color: '#3F51B5', // bleu
          joursAvant: -1,
          joursApres: -30
        }
      ]
    }
  };

  // Sélection des phases en fonction du type de rétro-planning
  useEffect(() => {
    setPhases(phasesConfig[retroplanningType]?.phases || phasesConfig.elections.phases);
  }, [retroplanningType]);

  // Calcul des jours restants et détermination de la phase actuelle
  useEffect(() => {
    if (dateEvenement) {
      const dateJ = new Date(dateEvenement);
      const aujourdhui = new Date();
      const diffTime = dateJ - aujourdhui;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setJoursRestants(diffDays);

      // Déterminer la phase actuelle en fonction du type de rétro-planning
      let phaseId = null;
      for (let i = 0; i < phases.length; i++) {
        if (i === phases.length - 1) {
          // Dernière phase (bilan/suivi)
          if (diffDays < 0) {
            phaseId = phases[i].id;
            break;
          }
        } else if (i === phases.length - 2) {
          // Avant-dernière phase (jour J/action)
          if (diffDays === 0) {
            phaseId = phases[i].id;
            break;
          }
        } else {
          // Autres phases
          const nextPhase = phases[i + 1];
          if (diffDays > nextPhase.joursAvant) {
            phaseId = phases[i].id;
            break;
          }
        }
      }

      setPhaseActuelle(phaseId);

      if (!selectedPhase) {
        setSelectedPhase(phaseId);
      }
    }
  }, [dateEvenement, selectedPhase, phases]);

  // Génération des dates pour chaque phase en fonction de la date de l'événement
  const genererDatesPhases = () => {
    if (!dateEvenement) return {};
    
    const dateJ = new Date(dateEvenement);
    const datesPhases = {};
    
    phases.forEach(phase => {
      if (phase.joursAvant === 0 && phase.joursApres === 0) {
        // Phase du jour J
        datesPhases[phase.id] = dateJ.toLocaleDateString('fr-FR');
      } else if (phase.joursAvant < 0) {
        // Phase après le jour J
        const dateDebut = new Date(dateJ);
        dateDebut.setDate(dateJ.getDate() + 1);
        const dateFin = new Date(dateJ);
        dateFin.setDate(dateJ.getDate() + Math.abs(phase.joursApres));
        datesPhases[phase.id] = `${dateDebut.toLocaleDateString('fr-FR')} - ${dateFin.toLocaleDateString('fr-FR')}`;
      } else {
        // Phase avant le jour J
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
      <h2 className={styles.title}>Rétro-planning : {phasesConfig[retroplanningType]?.title || "Démarche syndicale"}</h2>
      
      {/* Formulaire de date */}
      <div className={styles.dateForm}>
        <h3 className={styles.formTitle}>Définir la date de votre événement</h3>
        <p className={styles.formDescription}>
          Tout le rétro-planning s'organisera à partir de cette date clé 
          {retroplanningType === 'elections' ? ' (scrutin)' : 
           retroplanningType === 'nao' ? ' (début des négociations)' : 
           retroplanningType === 'lutte' ? ' (journée d\'action)' : 
           retroplanningType === 'formation' ? ' (première session de formation)' : 
           retroplanningType === 'syndicalisation' ? ' (lancement de la campagne)' : 
           ' (action revendicative)'}.
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
        <PhasePlanning 
          phase={phases.find(p => p.id === selectedPhase)} 
          retroplanningType={retroplanningType}
          onUpdatePhases={handleUpdatePhase}
        />
      )}
      
      {/* Section d'aide et conseils */}
      <div className={styles.tipsSection}>
        <h3 className={styles.tipsTitle}>Conseils pour un rétro-planning efficace</h3>
        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <h4 className={styles.tipCardTitle}>Planification et anticipation</h4>
            <ul className={styles.tipsList}>
              <li>Commencez votre rétro-planning suffisamment tôt (idéalement {retroplanningType === 'elections' ? '4 mois' : retroplanningType === 'syndicalisation' ? '3 mois' : retroplanningType === 'nao' ? '2 mois' : '1,5 mois'} avant le Jour J)</li>
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
      
      {/* Bouton pour exporter le rétro-planning en PDF */}
      <button
        type="button"
        className={styles.exportButton}
        onClick={exportAllPhasesToPDF}
      >
        Exporter le rétro-planning en PDF
      </button>
      
      {/* Modal d'ajout de phase */}
      {isAddingPhase && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Ajouter une nouvelle phase</h3>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="phase-id" className={styles.formLabel}>
                  Identifiant de la phase
                </label>
                <input
                  type="text"
                  id="phase-id"
                  className={styles.formInput}
                  value={newPhase.id}
                  onChange={(e) => setNewPhase(prev => ({ ...prev, id: e.target.value }))}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phase-title" className={styles.formLabel}>
                  Titre de la phase
                </label>
                <input
                  type="text"
                  id="phase-title"
                  className={styles.formInput}
                  value={newPhase.title}
                  onChange={(e) => setNewPhase(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phase-description" className={styles.formLabel}>
                  Description de la phase
                </label>
                <textarea
                  id="phase-description"
                  className={styles.formInput}
                  value={newPhase.description}
                  onChange={(e) => setNewPhase(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phase-color" className={styles.formLabel}>
                  Couleur de la phase
                </label>
                <input
                  type="color"
                  id="phase-color"
                  className={styles.formInput}
                  value={newPhase.color}
                  onChange={(e) => setNewPhase(prev => ({ ...prev, color: e.target.value }))}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phase-jours-avant" className={styles.formLabel}>
                  Jours avant l'événement
                </label>
                <input
                  type="number"
                  id="phase-jours-avant"
                  className={styles.formInput}
                  value={newPhase.joursAvant}
                  onChange={(e) => setNewPhase(prev => ({ ...prev, joursAvant: parseInt(e.target.value) }))}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phase-jours-apres" className={styles.formLabel}>
                  Jours après l'événement
                </label>
                <input
                  type="number"
                  id="phase-jours-apres"
                  className={styles.formInput}
                  value={newPhase.joursApres}
                  onChange={(e) => setNewPhase(prev => ({ ...prev, joursApres: parseInt(e.target.value) }))}
                />
              </div>
              <button
                type="button"
                className={styles.modalButton}
                onClick={handleAddPhase}
              >
                Ajouter la phase
              </button>
              <button
                type="button"
                className={styles.modalButton}
                onClick={closeAddPhaseModal}
              >
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Bouton pour ajouter une nouvelle phase */}
      <button
        type="button"
        className={styles.addButton}
        onClick={openAddPhaseModal}
      >
        Ajouter une nouvelle phase
      </button>
    </div>
  );
}

export default RetroplanningMain;
