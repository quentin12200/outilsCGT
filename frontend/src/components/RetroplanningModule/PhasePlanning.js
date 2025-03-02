// src/components/RetroplanningModule/PhasePlanning.js
import React, { useState } from 'react';
import styles from './PhasePlanning.module.css';

function PhasePlanning({ phase }) {
  const [actionOuverte, setActionOuverte] = useState(null);

  // Contenu détaillé pour chaque phase
  const contenuPhases = {
    analyse: {
      title: "Analyse et Organisation",
      description: "Cette phase préparatoire consiste à analyser la situation actuelle, identifier les enjeux et cibler les priorités pour renforcer la syndicalisation.",
      periode: "J-120 à J-90",
      actions: [
        {
          titre: "Cartographie de l'établissement",
          description: "Réaliser une cartographie précise de l'établissement par service, avec le nombre de salariés et de syndiqués.",
          taches: [
            "Collecter les données sur l'effectif de chaque service",
            "Recenser les syndiqués actuels par service",
            "Calculer le taux de syndicalisation par service",
            "Identifier les zones de force et de faiblesse"
          ],
          ressources: ["Outil de cartographie", "Fichier Excel de suivi", "Base de données des adhérents"]
        },
        {
          titre: "Analyse du scrutin précédent",
          description: "Analyser en détail les résultats du précédent scrutin pour identifier les tendances et les points d'amélioration.",
          taches: [
            "Compiler les résultats par collège et par service",
            "Comparer les résultats CGT avec les autres syndicats",
            "Identifier les services où la CGT a progressé ou reculé",
            "Analyser les facteurs explicatifs des résultats"
          ],
          ressources: ["Résultats électoraux", "Modèle d'analyse électorale"]
        },
        {
          titre: "Définition des objectifs",
          description: "Fixer des objectifs clairs et réalistes pour la démarche syndicale à venir.",
          taches: [
            "Définir un objectif global de syndicalisation",
            "Fixer des objectifs spécifiques par service",
            "Établir un calendrier prévisionnel",
            "Identifier les moyens nécessaires"
          ],
          ressources: ["Outil de planification", "Modèle de document d'objectifs"]
        }
      ]
    },
    besoins: {
      title: "1ère Étape: Recueil des besoins",
      description: "Cette étape fondamentale consiste à aller à la rencontre des salariés pour recueillir leurs besoins réels et construire des revendications adaptées.",
      periode: "J-90 à J-60",
      actions: [
        {
          titre: "Préparation de l'AG des syndiqués",
          description: "Organiser une assemblée générale des syndiqués pour présenter la démarche et mobiliser l'ensemble des forces.",
          taches: [
            "Définir la date et le lieu de l'AG",
            "Préparer l'ordre du jour et les supports",
            "Contacter tous les syndiqués",
            "Organiser la logistique"
          ],
          ressources: ["Guide d'animation d'AG", "Modèle de convocation", "Support de présentation"]
        },
        {
          titre: "Élaboration des outils de recueil",
          description: "Créer et adapter les outils nécessaires pour recueillir efficacement les besoins des salariés.",
          taches: [
            "Adapter le questionnaire type aux spécificités de l'établissement",
            "Concevoir une fiche de synthèse pour compiler les retours",
            "Préparer un planning de déploiement",
            "Former les syndiqués aux techniques d'entretien"
          ],
          ressources: ["Modèle de questionnaire", "Outil de compilation", "Guide d'entretien"]
        },
        {
          titre: "Déploiement sur le terrain",
          description: "Organiser le déploiement des militants pour aller au contact des salariés dans tous les services.",
          taches: [
            "Répartir les équipes par service",
            "Organiser des tournées quotidiennes",
            "Tenir un tableau de bord du déploiement",
            "Organiser des points d'étape réguliers"
          ],
          ressources: ["Planning de déploiement", "Fiches de suivi", "Kit militant"]
        }
      ]
    },
    revendications: {
      title: "2ème Étape: Élaboration des revendications",
      description: "Cette phase consiste à transformer les besoins recueillis en revendications concrètes et mobilisatrices.",
      periode: "J-60 à J-40",
      actions: [
        {
          titre: "Synthèse des besoins recueillis",
          description: "Compiler et analyser l'ensemble des besoins exprimés par les salariés pour en dégager les grandes tendances.",
          taches: [
            "Créer un tableau de synthèse par thématique",
            "Identifier les besoins prioritaires",
            "Quantifier les occurrences de chaque besoin",
            "Croiser les données par service et catégorie"
          ],
          ressources: ["Outil d'analyse statistique", "Grille de lecture thématique"]
        },
        {
          titre: "AG d'élaboration du cahier revendicatif",
          description: "Organiser une assemblée générale avec les syndiqués pour construire démocratiquement le cahier revendicatif.",
          taches: [
            "Présenter la synthèse des besoins recueillis",
            "Animer des ateliers thématiques",
            "Mettre en débat les propositions de revendications",
            "Valider collectivement le cahier revendicatif"
          ],
          ressources: ["Méthode d'animation participative", "Modèle de cahier revendicatif"]
        },
        {
          titre: "Finalisation et mise en forme",
          description: "Formaliser le cahier revendicatif pour le rendre accessible et percutant.",
          taches: [
            "Rédiger les revendications de façon claire et précise",
            "Hiérarchiser les revendications",
            "Concevoir une mise en page attractive",
            "Préparer les supports de communication"
          ],
          ressources: ["Modèles de mise en page", "Outils de communication visuelle"]
        }
      ]
    },
    mobilisation: {
      title: "3ème Étape: Mobilisation",
      description: "Cette phase vise à mobiliser les salariés autour des revendications pour construire un rapport de force favorable.",
      periode: "J-40 à J-10",
      actions: [
        {
          titre: "Campagne de communication",
          description: "Déployer une campagne de communication pour faire connaître les revendications et créer une dynamique collective.",
          taches: [
            "Concevoir des tracts et affiches",
            "Organiser des réunions d'information par service",
            "Utiliser les réseaux sociaux et canaux numériques",
            "Planifier des distributions régulières"
          ],
          ressources: ["Kit de communication", "Planning de distribution", "Modèles graphiques"]
        },
        {
          titre: "AG des salariés",
          description: "Organiser des assemblées générales ouvertes à tous les salariés pour présenter et débattre des revendications.",
          taches: [
            "Planifier les AG par service ou catégorie",
            "Préparer l'animation et les supports",
            "Organiser la prise de parole des salariés",
            "Recueillir les engagements"
          ],
          ressources: ["Guide d'animation d'AG", "Fiches argumentaires", "Feuilles d'engagement"]
        },
        {
          titre: "Suivi et renforcement",
          description: "Assurer un suivi régulier de la mobilisation et ajuster la stratégie en fonction des retours.",
          taches: [
            "Mettre en place un tableau de bord de la mobilisation",
            "Organiser des points d'étape avec les équipes syndicales",
            "Identifier et lever les freins rencontrés",
            "Adapter la communication selon les besoins"
          ],
          ressources: ["Tableau de suivi", "Fiches de reporting", "Outils d'évaluation"]
        }
      ]
    },
    jourj: {
      title: "Jour J",
      description: "Le jour de l'action collective, qu'il s'agisse d'un scrutin, d'une journée de mobilisation ou d'une action revendicative.",
      periode: "J-0",
      actions: [
        {
          titre: "Organisation logistique",
          description: "Assurer toute la logistique nécessaire au bon déroulement de la journée d'action.",
          taches: [
            "Installer les points d'information ou bureaux de vote",
            "Distribuer le matériel aux équipes",
            "Assurer une présence dans tous les services",
            "Coordonner les équipes sur le terrain"
          ],
          ressources: ["Check-list logistique", "Kit matériel", "Plan de déploiement"]
        },
        {
          titre: "Communication en temps réel",
          description: "Maintenir une communication active tout au long de la journée pour dynamiser la participation.",
          taches: [
            "Diffuser des messages d'encouragement",
            "Communiquer sur la participation en temps réel",
            "Répondre aux questions et objections",
            "Relancer les services à faible participation"
          ],
          ressources: ["Canaux de communication rapide", "Messages types", "Argumentaire flash"]
        },
        {
          titre: "Suivi et réactivité",
          description: "Suivre le déroulement de la journée et réagir rapidement aux situations imprévues.",
          taches: [
            "Tenir un tableau de bord heure par heure",
            "Identifier et résoudre les problèmes rencontrés",
            "Réaffecter les ressources selon les besoins",
            "Préparer la communication de fin de journée"
          ],
          ressources: ["Poste de coordination", "Tableau de suivi", "Procédures d'urgence"]
        }
      ]
    },
    bilan: {
      title: "Bilan et Perspectives",
      description: "Analyser les résultats, tirer les enseignements et préparer les prochaines étapes pour renforcer la CGT.",
      periode: "J+1 à J+30",
      actions: [
        {
          titre: "Analyse des résultats",
          description: "Réaliser une analyse détaillée des résultats obtenus pour comprendre les forces et faiblesses.",
          taches: [
            "Compiler les données quantitatives",
            "Analyser les résultats par service et catégorie",
            "Comparer avec les objectifs fixés",
            "Identifier les facteurs de réussite ou d'échec"
          ],
          ressources: ["Grille d'analyse", "Outil statistique", "Modèle de rapport"]
        },
        {
          titre: "AG de bilan avec les syndiqués",
          description: "Organiser une assemblée générale pour partager le bilan et recueillir les retours d'expérience.",
          taches: [
            "Présenter les résultats obtenus",
            "Animer un débat sur l'expérience vécue",
            "Recueillir les propositions d'amélioration",
            "Valoriser l'engagement des militants"
          ],
          ressources: ["Support de présentation", "Méthode d'animation participative"]
        },
        {
          titre: "Définition des prochaines étapes",
          description: "Élaborer un plan d'action pour capitaliser sur la démarche et renforcer durablement la CGT.",
          taches: [
            "Planifier le suivi des revendications portées",
            "Établir un plan de syndicalisation",
            "Programmer les prochaines actions revendicatives",
            "Améliorer les outils et méthodes pour la prochaine campagne"
          ],
          ressources: ["Template de plan d'action", "Calendrier social", "Outils de planification"]
        }
      ]
    }
  };

  const contenu = contenuPhases[phase.id] || {
    title: phase.title,
    description: "Contenu en cours de développement.",
    periode: "",
    actions: []
  };

  return (
    <div className={`${styles.phaseContainer}`} style={{borderLeftColor: phase.color.replace('bg-', '')}}>
      <h3 className={styles.phaseTitle}>{contenu.title}</h3>
      <div className={styles.phasePeriod}>
        {contenu.periode}
      </div>
      <p className={styles.phaseDescription}>{contenu.description}</p>
      
      {contenu.actions.length > 0 && (
        <div>
          <h4 className={styles.actionsTitle}>Actions à mener :</h4>
          <div className={styles.actionsList}>
            {contenu.actions.map((action, index) => (
              <div key={index} className={styles.actionItem}>
                <div 
                  className={`${styles.actionHeader} ${actionOuverte === index ? styles.actionHeaderActive : ''}`}
                  onClick={() => setActionOuverte(actionOuverte === index ? null : index)}
                >
                  <h5 className={styles.actionTitle}>{action.titre}</h5>
                  <span className={styles.actionIcon}>
                    {actionOuverte === index ? '▲' : '▼'}
                  </span>
                </div>
                
                {actionOuverte === index && (
                  <div className={styles.actionContent}>
                    <p className={styles.actionDescription}>{action.description}</p>
                    
                    <div className={styles.taskSection}>
                      <h6 className={styles.taskTitle}>Tâches à réaliser :</h6>
                      <ul className={styles.taskList}>
                        {action.taches.map((tache, idx) => (
                          <li key={idx} className={styles.taskItem}>{tache}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={styles.resourceSection}>
                      <h6 className={styles.resourceTitle}>Ressources disponibles :</h6>
                      <div className={styles.resourceTags}>
                        {action.ressources.map((ressource, idx) => (
                          <span key={idx} className={styles.resourceTag}>
                            {ressource}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className={styles.actionsButtons}>
        <button className={styles.primaryButton}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Télécharger le planning détaillé
        </button>
        <button className={styles.secondaryButton}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter au calendrier
        </button>
      </div>
    </div>
  );
}

export default PhasePlanning;