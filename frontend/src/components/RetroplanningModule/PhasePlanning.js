import React, { useState, useRef, useEffect } from 'react';
import styles from './PhasePlanning.module.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function PhasePlanning({ phase, retroplanningType = 'elections', onUpdatePhases }) {
  const [actionOuverte, setActionOuverte] = useState(null);
  const [isEditingPeriod, setIsEditingPeriod] = useState(false);
  const [customPeriode, setCustomPeriode] = useState("");
  const [editedPhases, setEditedPhases] = useState({});
  const [isEditingPhase, setIsEditingPhase] = useState(false);
  const contentRef = useRef(null);

  // Initialiser la période personnalisée quand la phase change
  useEffect(() => {
    if (contenuPhases[retroplanningType]?.[phase.id]) {
      const savedPeriod = editedPhases[`${retroplanningType}-${phase.id}`]?.periode;
      setCustomPeriode(savedPeriod || contenuPhases[retroplanningType][phase.id].periode);
    }
  }, [phase.id, retroplanningType, editedPhases]);

  // Fonction pour sauvegarder la période modifiée
  const savePeriod = () => {
    if (customPeriode && customPeriode !== contenuPhases[retroplanningType][phase.id].periode) {
      const updatedPhases = {
        ...editedPhases,
        [`${retroplanningType}-${phase.id}`]: {
          ...editedPhases[`${retroplanningType}-${phase.id}`],
          periode: customPeriode
        }
      };
      setEditedPhases(updatedPhases);
      
      // Si une fonction de callback est fournie, l'appeler pour mettre à jour le parent
      if (onUpdatePhases) {
        onUpdatePhases(retroplanningType, phase.id, { periode: customPeriode });
      }
    }
    setIsEditingPeriod(false);
  };

  // Fonction pour ouvrir le modal d'édition de phase
  const openPhaseEditor = () => {
    setIsEditingPhase(true);
  };

  // Fonction pour fermer le modal d'édition de phase
  const closePhaseEditor = () => {
    setIsEditingPhase(false);
  };

  // Contenu détaillé pour chaque phase selon le type de rétro-planning
  const contenuPhases = {
    // Contenu pour les élections CSE
    elections: {
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
              "Quantifier les occurrences par service",
              "Présenter les résultats aux syndiqués"
            ],
            ressources: ["Outil de compilation", "Modèle de rapport de synthèse"]
          },
          {
            titre: "Rédaction du cahier revendicatif",
            description: "Élaborer un document structuré présentant les revendications de la CGT pour l'entreprise.",
            taches: [
              "Rédiger des revendications claires et précises",
              "Structurer le document par thématiques",
              "Illustrer avec des exemples concrets",
              "Faire valider collectivement le contenu"
            ],
            ressources: ["Modèle de cahier revendicatif", "Guide de rédaction", "Exemples de revendications"]
          },
          {
            titre: "Préparation des supports de communication",
            description: "Créer les supports nécessaires pour diffuser efficacement les revendications auprès des salariés.",
            taches: [
              "Concevoir des tracts synthétiques par thématique",
              "Préparer une présentation visuelle",
              "Élaborer des fiches pratiques",
              "Créer des supports pour les réseaux sociaux"
            ],
            ressources: ["Modèles de tracts", "Logiciel de mise en page", "Banque d'images"]
          }
        ]
      },
      mobilisation: {
        title: "3ème Étape: Mobilisation",
        description: "Cette phase vise à mobiliser les salariés autour des revendications et à préparer le scrutin.",
        periode: "J-40 à J-10",
        actions: [
          {
            titre: "Diffusion du cahier revendicatif",
            description: "Déployer une stratégie de communication pour faire connaître les revendications à tous les salariés.",
            taches: [
              "Organiser des distributions de tracts",
              "Tenir des permanences d'information",
              "Diffuser le cahier revendicatif complet",
              "Publier sur les réseaux sociaux"
            ],
            ressources: ["Planning de distribution", "Kit de communication", "Supports numériques"]
          },
          {
            titre: "Organisation de réunions d'information",
            description: "Planifier et animer des réunions avec les salariés pour présenter les revendications et répondre aux questions.",
            taches: [
              "Réserver des salles adaptées",
              "Préparer un planning de réunions par service",
              "Créer un support de présentation",
              "Former les animateurs"
            ],
            ressources: ["Guide d'animation", "Support de présentation", "Fiche de questions/réponses"]
          },
          {
            titre: "Constitution des listes de candidats",
            description: "Finaliser les listes de candidats pour chaque collège en veillant à la représentativité et à la parité.",
            taches: [
              "Identifier les candidats potentiels",
              "Vérifier l'éligibilité de chaque candidat",
              "Respecter les règles de parité",
              "Préparer les professions de foi"
            ],
            ressources: ["Modèle de liste", "Guide juridique", "Modèle de profession de foi"]
          }
        ]
      },
      jourj: {
        title: "Jour J",
        description: "Le jour du scrutin est l'aboutissement de toute la démarche. Il nécessite une organisation précise pour assurer le bon déroulement du vote.",
        periode: "Jour J",
        actions: [
          {
            titre: "Mobilisation des électeurs",
            description: "Mettre en œuvre les dernières actions pour inciter les salariés à voter.",
            taches: [
              "Distribuer un tract d'appel au vote",
              "Contacter individuellement les syndiqués",
              "Organiser des tournées dans les services",
              "Rappeler les modalités de vote"
            ],
            ressources: ["Tract d'appel au vote", "Liste des électeurs", "Planning de tournées"]
          },
          {
            titre: "Présence aux bureaux de vote",
            description: "Assurer une présence CGT dans les bureaux de vote pour veiller au bon déroulement du scrutin.",
            taches: [
              "Désigner les assesseurs et délégués de liste",
              "Préparer un planning de présence",
              "Former les assesseurs sur leurs droits et devoirs",
              "Prévoir un système de relais"
            ],
            ressources: ["Guide de l'assesseur", "Planning de présence", "Fiche de procédure"]
          },
          {
            titre: "Suivi du taux de participation",
            description: "Suivre l'évolution du taux de participation tout au long de la journée pour ajuster les actions de mobilisation.",
            taches: [
              "Mettre en place un système de remontée d'information",
              "Analyser l'évolution par service et par collège",
              "Cibler les relances en fonction des taux",
              "Informer régulièrement l'équipe syndicale"
            ],
            ressources: ["Tableau de suivi", "Outil de communication interne"]
          }
        ]
      },
      bilan: {
        title: "Bilan et Perspectives",
        description: "Cette phase essentielle permet d'analyser les résultats, de tirer les enseignements de la démarche et de préparer les prochaines étapes.",
        periode: "J+1 à J+30",
        actions: [
          {
            titre: "Analyse des résultats",
            description: "Réaliser une analyse détaillée des résultats du scrutin pour en comprendre les enseignements.",
            taches: [
              "Compiler les résultats par collège et par service",
              "Comparer avec les objectifs fixés",
              "Identifier les points forts et les points faibles",
              "Analyser l'évolution par rapport au scrutin précédent"
            ],
            ressources: ["Outil d'analyse électorale", "Résultats détaillés", "Historique des scrutins"]
          },
          {
            titre: "Communication des résultats",
            description: "Informer les salariés et les syndiqués des résultats et de leurs implications.",
            taches: [
              "Rédiger un communiqué de remerciement",
              "Présenter les résultats de manière pédagogique",
              "Organiser une réunion de bilan avec les syndiqués",
              "Communiquer sur les prochaines étapes"
            ],
            ressources: ["Modèle de communiqué", "Support de présentation", "Planning de communication"]
          },
          {
            titre: "Élaboration du plan d'action",
            description: "Définir les actions à mener suite aux élections pour renforcer la présence syndicale.",
            taches: [
              "Organiser une réunion de planification",
              "Définir des objectifs à court et moyen terme",
              "Répartir les responsabilités",
              "Établir un calendrier de suivi"
            ],
            ressources: ["Outil de planification", "Guide du délégué syndical", "Modèle de plan d'action"]
          }
        ]
      }
    },
    // Contenu pour la campagne de syndicalisation
    syndicalisation: {
      preparation: {
        title: "Préparation",
        description: "Cette phase initiale consiste à organiser la campagne et à former les militants qui y participeront.",
        periode: "J-90 à J-75",
        actions: [
          {
            titre: "Constitution de l'équipe de campagne",
            description: "Former une équipe dédiée à la campagne de syndicalisation avec des rôles clairement définis.",
            taches: [
              "Identifier les militants disponibles",
              "Définir les rôles et responsabilités",
              "Établir un calendrier de réunions",
              "Créer des outils de suivi partagés"
            ],
            ressources: ["Organigramme de l'équipe", "Planning de disponibilité", "Outils collaboratifs"]
          },
          {
            titre: "Formation des militants",
            description: "Former les militants aux techniques de syndicalisation et aux arguments spécifiques à l'entreprise.",
            taches: [
              "Organiser une journée de formation",
              "Préparer les supports pédagogiques",
              "Réaliser des jeux de rôle",
              "Fournir un kit militant complet"
            ],
            ressources: ["Guide du syndicaliste", "Argumentaire CGT", "Fiches pratiques"]
          },
          {
            titre: "Définition des objectifs",
            description: "Fixer des objectifs clairs, mesurables et réalistes pour la campagne de syndicalisation.",
            taches: [
              "Analyser le potentiel de syndicalisation par service",
              "Fixer un objectif global d'adhésions",
              "Définir des objectifs intermédiaires",
              "Établir des indicateurs de suivi"
            ],
            ressources: ["Outil de planification", "Historique des adhésions", "Modèle d'objectifs"]
          }
        ]
      },
      cartographie: {
        title: "Cartographie",
        description: "Cette phase consiste à analyser précisément la structure de l'entreprise pour cibler efficacement les actions.",
        periode: "J-75 à J-60",
        actions: [
          {
            titre: "Analyse des services",
            description: "Réaliser une cartographie détaillée des services avec leurs caractéristiques spécifiques.",
            taches: [
              "Recenser tous les services et leurs effectifs",
              "Identifier les horaires et contraintes spécifiques",
              "Analyser la composition socio-professionnelle",
              "Cartographier les lieux de travail"
            ],
            ressources: ["Plan de l'établissement", "Organigramme", "Base de données RH"]
          },
          {
            titre: "Identification des cibles prioritaires",
            description: "Déterminer les services ou catégories de personnel à cibler en priorité.",
            taches: [
              "Analyser le taux de syndicalisation actuel par service",
              "Identifier les services à fort potentiel",
              "Repérer les leaders d'opinion",
              "Établir un ordre de priorité"
            ],
            ressources: ["Matrice de priorisation", "Liste des syndiqués actuels", "Outil d'analyse"]
          },
          {
            titre: "Analyse des problématiques spécifiques",
            description: "Identifier les problématiques propres à chaque service pour adapter le discours syndical.",
            taches: [
              "Recueillir les informations sur les conditions de travail",
              "Identifier les revendications spécifiques",
              "Analyser les conflits récents",
              "Recenser les attentes particulières"
            ],
            ressources: ["Questionnaire d'analyse", "Historique des conflits", "Fiches de remontées"]
          }
        ]
      },
      argumentaire: {
        title: "Élaboration de l'argumentaire",
        description: "Cette phase consiste à construire un argumentaire solide et adapté aux spécificités de l'entreprise.",
        periode: "J-60 à J-45",
        actions: [
          {
            titre: "Analyse des attentes des salariés",
            description: "Identifier précisément les attentes et préoccupations des salariés pour y répondre dans l'argumentaire.",
            taches: [
              "Réaliser une enquête auprès des salariés",
              "Analyser les résultats par service et catégorie",
              "Identifier les thématiques prioritaires",
              "Hiérarchiser les préoccupations"
            ],
            ressources: ["Modèle d'enquête", "Outil d'analyse statistique", "Guide d'entretien"]
          },
          {
            titre: "Construction des arguments",
            description: "Élaborer des arguments percutants et adaptés aux différentes catégories de personnel.",
            taches: [
              "Rédiger des fiches argumentaires par thématique",
              "Préparer des réponses aux objections courantes",
              "Adapter le discours aux différents publics",
              "Illustrer par des exemples concrets"
            ],
            ressources: ["Guide argumentaire CGT", "Fiches thématiques", "Exemples de réussite"]
          },
          {
            titre: "Élaboration des supports",
            description: "Créer des supports de communication efficaces pour diffuser l'argumentaire.",
            taches: [
              "Concevoir des tracts synthétiques",
              "Préparer une présentation visuelle",
              "Élaborer des fiches pratiques",
              "Créer des supports pour les réseaux sociaux"
            ],
            ressources: ["Modèles de tracts", "Logiciel de mise en page", "Banque d'images"]
          }
        ]
      },
      deploiement: {
        title: "Déploiement",
        description: "Cette phase consiste à aller à la rencontre des salariés pour présenter la CGT et proposer l'adhésion.",
        periode: "J-45 à J-15",
        actions: [
          {
            titre: "Organisation des tournées",
            description: "Planifier méthodiquement les tournées dans les services pour optimiser la couverture.",
            taches: [
              "Établir un planning de tournées par service",
              "Constituer des binômes de militants",
              "Prévoir les horaires adaptés à chaque service",
              "Préparer le matériel nécessaire"
            ],
            ressources: ["Planning de déploiement", "Kit militant", "Cartes de visite"]
          },
          {
            titre: "Permanences syndicales",
            description: "Organiser des permanences régulières pour accueillir les salariés intéressés.",
            taches: [
              "Réserver des salles adaptées",
              "Établir un planning de permanences",
              "Préparer l'aménagement et la documentation",
              "Communiquer sur les horaires et lieux"
            ],
            ressources: ["Planning de permanences", "Documentation syndicale", "Formulaires d'adhésion"]
          },
          {
            titre: "Suivi des contacts",
            description: "Mettre en place un système efficace de suivi des contacts établis lors des tournées.",
            taches: [
              "Créer une base de données des contacts",
              "Établir un processus de relance",
              "Organiser des réunions de suivi hebdomadaires",
              "Analyser les résultats par service"
            ],
            ressources: ["Outil de suivi des contacts", "Fiches de reporting", "Tableau de bord"]
          }
        ]
      },
      bilan: {
        title: "Bilan et pérennisation",
        description: "Cette phase finale vise à évaluer les résultats de la campagne et à mettre en place des actions pour fidéliser les nouveaux adhérents.",
        periode: "J-15 à J+15",
        actions: [
          {
            titre: "Analyse des résultats",
            description: "Évaluer précisément les résultats de la campagne de syndicalisation.",
            taches: [
              "Comptabiliser les nouvelles adhésions par service",
              "Comparer avec les objectifs fixés",
              "Analyser les facteurs de réussite ou d'échec",
              "Identifier les bonnes pratiques"
            ],
            ressources: ["Tableau de suivi des adhésions", "Outil d'analyse statistique", "Modèle de rapport"]
          },
          {
            titre: "Accueil des nouveaux syndiqués",
            description: "Organiser l'accueil et l'intégration des nouveaux adhérents dans le syndicat.",
            taches: [
              "Organiser une réunion d'accueil",
              "Remettre un kit du nouvel adhérent",
              "Présenter le fonctionnement du syndicat",
              "Identifier les centres d'intérêt et compétences"
            ],
            ressources: ["Guide d'accueil", "Kit du nouvel adhérent", "Planning de formation"]
          },
          {
            titre: "Plan d'action permanent",
            description: "Élaborer un plan d'action pour pérenniser la dynamique de syndicalisation.",
            taches: [
              "Définir un calendrier d'actions régulières",
              "Répartir les responsabilités de suivi",
              "Programmer des formations continues",
              "Établir un processus d'intégration permanent"
            ],
            ressources: ["Modèle de plan d'action", "Calendrier syndical", "Guide du délégué syndical"]
          }
        ]
      }
    },
    // Contenu pour les NAO salaires
    nao: {
      preparation: {
        title: "Préparation",
        description: "Cette phase consiste à collecter toutes les données économiques et sociales nécessaires pour construire des revendications solides.",
        periode: "J-60 à J-45",
        actions: [
          {
            titre: "Collecte des données économiques",
            description: "Rassembler les informations sur la situation économique de l'entreprise pour étayer les revendications.",
            taches: [
              "Analyser les comptes annuels",
              "Étudier la répartition des bénéfices",
              "Comparer avec les entreprises du secteur",
              "Identifier les marges de manœuvre"
            ],
            ressources: ["Bilan social", "Comptes annuels", "Rapports d'activité", "Base de données économiques et sociales"]
          },
          {
            titre: "Analyse de la politique salariale",
            description: "Étudier en détail la politique salariale actuelle de l'entreprise et son évolution.",
            taches: [
              "Analyser l'évolution des salaires sur 3 ans",
              "Étudier les écarts entre catégories",
              "Identifier les inégalités femmes/hommes",
              "Comparer avec l'inflation et le coût de la vie"
            ],
            ressources: ["Grilles salariales", "Rapport égalité F/H", "Indicateurs INSEE"]
          },
          {
            titre: "Constitution de l'équipe de négociation",
            description: "Former une équipe de négociation compétente et préparée pour les NAO.",
            taches: [
              "Désigner les négociateurs titulaires et suppléants",
              "Répartir les rôles et expertises",
              "Former aux techniques de négociation",
              "Établir un calendrier de préparation"
            ],
            ressources: ["Guide du négociateur", "Formations spécifiques", "Fiches techniques"]
          }
        ]
      },
      consultation: {
        title: "Consultation des salariés",
        description: "Cette phase essentielle consiste à recueillir les attentes des salariés pour construire des revendications légitimes et mobilisatrices.",
        periode: "J-45 à J-30",
        actions: [
          {
            titre: "Élaboration du questionnaire",
            description: "Concevoir un questionnaire efficace pour recueillir les attentes des salariés en matière de rémunération.",
            taches: [
              "Définir les thématiques à aborder",
              "Formuler des questions claires et précises",
              "Prévoir des questions ouvertes et fermées",
              "Tester le questionnaire avant diffusion"
            ],
            ressources: ["Modèle de questionnaire", "Guide méthodologique", "Outil de sondage en ligne"]
          },
          {
            titre: "Déploiement de l'enquête",
            description: "Organiser la diffusion du questionnaire et la collecte des réponses dans tous les services.",
            taches: [
              "Planifier les distributions par service",
              "Former les militants au recueil",
              "Assurer une communication efficace",
              "Suivre le taux de participation"
            ],
            ressources: ["Planning de distribution", "Urnes ou formulaires en ligne", "Tableau de suivi"]
          },
          {
            titre: "Analyse des résultats",
            description: "Compiler et analyser les réponses pour dégager les priorités et attentes principales.",
            taches: [
              "Saisir et traiter les données",
              "Analyser les résultats par catégorie et service",
              "Identifier les priorités communes",
              "Préparer une synthèse visuelle"
            ],
            ressources: ["Outil d'analyse statistique", "Modèles de graphiques", "Support de présentation"]
          }
        ]
      },
      revendications: {
        title: "Élaboration des revendications",
        description: "Cette phase consiste à transformer les attentes recueillies en revendications précises, chiffrées et argumentées.",
        periode: "J-30 à J-15",
        actions: [
          {
            titre: "Rédaction du cahier revendicatif",
            description: "Élaborer un document structuré présentant les revendications salariales de la CGT.",
            taches: [
              "Formuler des revendications précises et chiffrées",
              "Structurer par thématiques (salaires, primes, etc.)",
              "Hiérarchiser les revendications",
              "Rédiger l'argumentaire pour chaque point"
            ],
            ressources: ["Modèle de cahier revendicatif", "Guide de rédaction", "Fiches argumentaires"]
          },
          {
            titre: "Validation collective",
            description: "Soumettre les revendications à la validation des syndiqués et des salariés.",
            taches: [
              "Organiser une AG des syndiqués",
              "Présenter le projet de revendications",
              "Recueillir et intégrer les amendements",
              "Valider la version définitive"
            ],
            ressources: ["Support de présentation", "Méthode d'animation participative", "Fiche de validation"]
          },
          {
            titre: "Préparation des supports de communication",
            description: "Créer les supports nécessaires pour diffuser efficacement les revendications.",
            taches: [
              "Concevoir un tract synthétique",
              "Préparer une présentation visuelle",
              "Élaborer des fiches thématiques détaillées",
              "Créer des supports pour les réseaux sociaux"
            ],
            ressources: ["Modèles de tracts", "Logiciel de mise en page", "Banque d'images"]
          }
        ]
      },
      mobilisation: {
        title: "Mobilisation",
        description: "Cette phase vise à informer les salariés des revendications et à créer un rapport de force favorable avant les négociations.",
        periode: "J-15 à J-1",
        actions: [
          {
            titre: "Communication large",
            description: "Déployer une stratégie de communication pour faire connaître les revendications à tous les salariés.",
            taches: [
              "Distribuer des tracts dans tous les services",
              "Afficher sur les panneaux syndicaux",
              "Diffuser par mail et réseaux sociaux",
              "Organiser des points d'information"
            ],
            ressources: ["Planning de distribution", "Kit de communication", "Argumentaire flash"]
          },
          {
            titre: "Réunions d'information",
            description: "Organiser des réunions avec les salariés pour présenter les revendications et répondre aux questions.",
            taches: [
              "Planifier des réunions par service",
              "Préparer l'animation et les supports",
              "Anticiper les questions et objections",
              "Recueillir les signatures de soutien"
            ],
            ressources: ["Planning de réunions", "Support de présentation", "Feuilles de soutien"]
          },
          {
            titre: "Actions symboliques",
            description: "Organiser des actions visibles pour manifester la détermination des salariés.",
            taches: [
              "Imaginer des actions adaptées au contexte",
              "Préparer le matériel nécessaire",
              "Informer les salariés et les médias",
              "Coordonner le déroulement"
            ],
            ressources: ["Guide d'actions syndicales", "Matériel militant", "Contacts presse"]
          }
        ]
      },
      negociation: {
        title: "Négociation",
        description: "Cette phase centrale des NAO consiste à porter les revendications face à la direction et à négocier pour obtenir des avancées.",
        periode: "Jour J",
        actions: [
          {
            titre: "Préparation des séances",
            description: "Préparer minutieusement chaque séance de négociation pour optimiser l'efficacité.",
            taches: [
              "Analyser les propositions de la direction",
              "Préparer les contre-propositions",
              "Anticiper les arguments adverses",
              "Définir les lignes rouges et marges de manœuvre"
            ],
            ressources: ["Dossier de négociation", "Fiches techniques", "Calculateur d'impact"]
          },
          {
            titre: "Conduite des négociations",
            description: "Mener les séances de négociation avec méthode et détermination.",
            taches: [
              "Présenter clairement les revendications",
              "Argumenter avec des données précises",
              "Prendre des notes détaillées",
              "Demander des suspensions de séance si nécessaire"
            ],
            ressources: ["Guide du négociateur", "Argumentaire détaillé", "Fiche de suivi"]
          },
          {
            titre: "Communication pendant les négociations",
            description: "Maintenir une communication régulière avec les salariés pendant tout le processus.",
            taches: [
              "Rédiger des comptes rendus après chaque séance",
              "Diffuser l'information rapidement",
              "Consulter les salariés sur les évolutions",
              "Maintenir la mobilisation si nécessaire"
            ],
            ressources: ["Modèle de compte rendu", "Canaux de communication rapide", "Planning d'information"]
          }
        ]
      },
      bilan: {
        title: "Bilan et mise en œuvre",
        description: "Cette phase finale consiste à évaluer les résultats des négociations, à les communiquer aux salariés et à veiller à leur application.",
        periode: "J+1 à J+30",
        actions: [
          {
            titre: "Analyse des résultats",
            description: "Évaluer précisément les résultats obtenus par rapport aux revendications initiales.",
            taches: [
              "Comparer les résultats aux objectifs",
              "Calculer l'impact concret pour les salariés",
              "Identifier les points forts et les points faibles",
              "Préparer une synthèse claire"
            ],
            ressources: ["Grille d'analyse", "Calculateur d'impact", "Modèle de synthèse"]
          },
          {
            titre: "Communication des résultats",
            description: "Informer les salariés des résultats des négociations de manière claire et transparente.",
            taches: [
              "Rédiger un communiqué détaillé",
              "Organiser des réunions d'information",
              "Préparer des supports pédagogiques",
              "Expliquer la position de la CGT"
            ],
            ressources: ["Modèle de communiqué", "Support de présentation", "Fiches explicatives"]
          },
          {
            titre: "Suivi de l'application",
            description: "Veiller à la bonne application des mesures négociées et préparer les prochaines étapes.",
            taches: [
              "Mettre en place un comité de suivi",
              "Vérifier l'application sur les fiches de paie",
              "Recueillir les retours des salariés",
              "Préparer les prochaines négociations"
            ],
            ressources: ["Tableau de suivi", "Calendrier social", "Fiche de signalement"]
          }
        ]
      }
    },
    // Contenu pour lutte spécifique
    lutte: {
      analyse: {
        title: "Analyse de la situation",
        description: "Cette phase consiste à analyser précisément la problématique et le contexte pour définir une stratégie adaptée.",
        periode: "J-60 à J-45",
        actions: [
          {
            titre: "Identification du problème",
            description: "Définir clairement la problématique qui justifie l'engagement d'une lutte spécifique.",
            taches: [
              "Recueillir les témoignages des salariés concernés",
              "Analyser les documents pertinents (notes de service, etc.)",
              "Consulter les textes légaux et conventionnels applicables",
              "Évaluer l'impact sur les conditions de travail"
            ],
            ressources: ["Guide juridique", "Conventions collectives", "Code du travail", "Fiches pratiques"]
          },
          {
            titre: "Cartographie des acteurs",
            description: "Identifier tous les acteurs concernés par la problématique et leur positionnement.",
            taches: [
              "Lister les salariés directement concernés",
              "Identifier les décideurs et leur niveau de responsabilité",
              "Analyser les positions des autres organisations syndicales",
              "Repérer les alliés potentiels (externes et internes)"
            ],
            ressources: ["Organigramme de l'entreprise", "Contacts syndicaux", "Réseau d'experts"]
          },
          {
            titre: "Évaluation du rapport de forces",
            description: "Analyser le rapport de forces initial pour déterminer la stratégie la plus adaptée.",
            taches: [
              "Évaluer le niveau de mobilisation potentiel",
              "Analyser les précédentes luttes sur des sujets similaires",
              "Identifier les leviers d'action disponibles",
              "Anticiper les réactions de la direction"
            ],
            ressources: ["Historique des luttes", "Bilan des actions précédentes", "Fiches stratégiques"]
          }
        ]
      },
      objectifs: {
        title: "Définition des objectifs",
        description: "Cette phase permet de définir précisément les objectifs de la lutte et d'élaborer une stratégie cohérente.",
        periode: "J-45 à J-30",
        actions: [
          {
            titre: "Formulation des revendications",
            description: "Élaborer des revendications claires, précises et réalisables.",
            taches: [
              "Formuler des revendications concrètes et mesurables",
              "Hiérarchiser les revendications (essentielles/négociables)",
              "Vérifier leur conformité juridique",
              "Évaluer leur coût pour l'employeur"
            ],
            ressources: ["Modèles de cahiers revendicatifs", "Fiches juridiques", "Calculateurs"]
          },
          {
            titre: "Élaboration de la stratégie",
            description: "Définir la stratégie globale pour atteindre les objectifs fixés.",
            taches: [
              "Déterminer les étapes progressives de la mobilisation",
              "Choisir les modes d'action adaptés au contexte",
              "Définir un calendrier réaliste",
              "Prévoir des scénarios alternatifs"
            ],
            ressources: ["Guide des modes d'action", "Fiches stratégiques", "Calendrier social"]
          },
          {
            titre: "Construction des alliances",
            description: "Identifier et construire les alliances nécessaires pour renforcer la lutte.",
            taches: [
              "Prendre contact avec les autres organisations syndicales",
              "Identifier les convergences possibles",
              "Proposer une plateforme commune",
              "Définir les modalités de coordination"
            ],
            ressources: ["Annuaire syndical", "Modèles de plateformes unitaires", "Fiches de contacts"]
          }
        ]
      },
      mobilisation: {
        title: "Mobilisation des salariés",
        description: "Cette phase vise à informer, convaincre et mobiliser les salariés autour des revendications définies.",
        periode: "J-30 à J-15",
        actions: [
          {
            titre: "Communication interne",
            description: "Informer l'ensemble des salariés sur la problématique et les revendications.",
            taches: [
              "Rédiger et diffuser des tracts explicatifs",
              "Organiser des réunions d'information par service",
              "Créer des supports visuels percutants",
              "Utiliser les réseaux sociaux et mails"
            ],
            ressources: ["Modèles de tracts", "Guide de communication", "Outils numériques"]
          },
          {
            titre: "Sensibilisation progressive",
            description: "Mettre en place des actions progressives pour sensibiliser et impliquer les salariés.",
            taches: [
              "Organiser des actions symboliques visibles",
              "Collecter des signatures de soutien",
              "Mettre en place des badges ou signes distinctifs",
              "Créer des moments de convivialité militante"
            ],
            ressources: ["Kit de mobilisation", "Pétitions en ligne", "Matériel militant"]
          },
          {
            titre: "Préparation logistique",
            description: "Préparer tous les aspects logistiques nécessaires aux actions prévues.",
            taches: [
              "Constituer des équipes par secteur/service",
              "Préparer le matériel nécessaire",
              "Organiser les plannings de présence",
              "Prévoir les aspects financiers (caisse de grève, etc.)"
            ],
            ressources: ["Check-list logistique", "Modèle de caisse de grève", "Planning type"]
          }
        ]
      },
      action: {
        title: "Action collective",
        description: "Cette phase correspond au déploiement des actions collectives pour faire aboutir les revendications.",
        periode: "J-15 à J+15",
        actions: [
          {
            titre: "Lancement de l'action",
            description: "Mettre en œuvre les premières actions collectives selon le plan établi.",
            taches: [
              "Organiser l'assemblée générale de lancement",
              "Déployer les premières actions prévues",
              "Assurer une présence syndicale continue",
              "Coordonner les équipes sur le terrain"
            ],
            ressources: ["Guide de l'AG", "Fiches actions", "Outils de coordination"]
          },
          {
            titre: "Communication externe",
            description: "Assurer la visibilité externe de la lutte pour renforcer le rapport de forces.",
            taches: [
              "Rédiger et diffuser des communiqués de presse",
              "Contacter les médias locaux et spécialisés",
              "Alimenter les réseaux sociaux",
              "Organiser des actions visibles médiatiquement"
            ],
            ressources: ["Modèles de communiqués", "Contacts presse", "Guide des réseaux sociaux"]
          },
          {
            titre: "Négociation",
            description: "Mener les négociations avec la direction sur la base des revendications établies.",
            taches: [
              "Constituer l'équipe de négociation",
              "Préparer les arguments et contre-arguments",
              "Tenir des points réguliers avec les salariés",
              "Rédiger des comptes-rendus précis"
            ],
            ressources: ["Guide du négociateur", "Fiches argumentaires", "Modèles de protocole"]
          }
        ]
      },
      evaluation: {
        title: "Évaluation et suivi",
        description: "Cette phase finale permet d'évaluer les résultats obtenus et d'assurer leur mise en œuvre effective.",
        periode: "J+15 à J+30",
        actions: [
          {
            titre: "Analyse des résultats",
            description: "Évaluer précisément les résultats obtenus par rapport aux objectifs initiaux.",
            taches: [
              "Comparer les résultats aux revendications initiales",
              "Identifier les avancées obtenues",
              "Analyser les points non satisfaits",
              "Évaluer l'évolution du rapport de forces"
            ],
            ressources: ["Grille d'analyse", "Tableau comparatif", "Questionnaire d'évaluation"]
          },
          {
            titre: "Communication des résultats",
            description: "Informer l'ensemble des salariés des résultats obtenus et de leur mise en œuvre.",
            taches: [
              "Organiser une assemblée générale de bilan",
              "Diffuser un document de synthèse",
              "Valoriser les avancées obtenues",
              "Expliquer honnêtement les limites"
            ],
            ressources: ["Modèle de bilan", "Support de présentation", "Tracts de synthèse"]
          },
          {
            titre: "Suivi de l'application",
            description: "Mettre en place un dispositif de suivi pour garantir l'application effective des avancées obtenues.",
            taches: [
              "Constituer un comité de suivi",
              "Établir un calendrier de vérification",
              "Prévoir des points réguliers avec la direction",
              "Informer régulièrement les salariés"
            ],
            ressources: ["Tableau de suivi", "Fiche de signalement", "Calendrier de contrôle"]
          }
        ]
      }
    },
    // Contenu pour le plan de formation
    formation: {
      diagnostic: {
        title: "Diagnostic des besoins",
        description: "Cette phase consiste à identifier les besoins en formation des syndiqués et militants pour renforcer l'organisation syndicale.",
        periode: "J-90 à J-60",
        actions: [
          {
            titre: "Évaluation des compétences existantes",
            description: "Réaliser un état des lieux des compétences déjà présentes dans la section syndicale.",
            taches: [
              "Recenser les formations déjà suivies par les militants",
              "Identifier les compétences spécifiques de chacun",
              "Repérer les domaines d'expertise et les lacunes",
              "Évaluer les besoins de renouvellement des connaissances"
            ],
            ressources: ["Questionnaire d'auto-évaluation", "Fiches de compétences", "Historique des formations"]
          },
          {
            titre: "Analyse des besoins collectifs",
            description: "Déterminer les besoins en formation en fonction des objectifs syndicaux et du contexte de l'entreprise.",
            taches: [
              "Analyser le contexte spécifique de l'entreprise",
              "Identifier les enjeux syndicaux prioritaires",
              "Évaluer les besoins liés aux mandats et responsabilités",
              "Anticiper les évolutions législatives et conventionnelles"
            ],
            ressources: ["Grille d'analyse contextuelle", "Calendrier social", "Veille juridique"]
          },
          {
            titre: "Consultation des syndiqués",
            description: "Recueillir les souhaits et besoins exprimés par les syndiqués eux-mêmes.",
            taches: [
              "Élaborer un questionnaire sur les besoins ressentis",
              "Organiser des entretiens individuels avec les militants",
              "Discuter collectivement des priorités de formation",
              "Identifier les freins et motivations"
            ],
            ressources: ["Modèle de questionnaire", "Guide d'entretien", "Fiche de synthèse collective"]
          }
        ]
      },
      planification: {
        title: "Élaboration du plan",
        description: "Cette phase permet de construire un plan de formation structuré et adapté aux besoins identifiés.",
        periode: "J-60 à J-45",
        actions: [
          {
            titre: "Définition des objectifs pédagogiques",
            description: "Formuler clairement les objectifs à atteindre pour chaque formation envisagée.",
            taches: [
              "Définir les compétences à acquérir ou renforcer",
              "Formuler des objectifs mesurables et réalistes",
              "Hiérarchiser les priorités de formation",
              "Adapter les objectifs aux différents profils de militants"
            ],
            ressources: ["Guide de formulation d'objectifs", "Référentiels de compétences", "Fiches méthodologiques"]
          },
          {
            titre: "Sélection des formations",
            description: "Identifier les formations disponibles correspondant aux besoins et objectifs définis.",
            taches: [
              "Consulter le catalogue des formations CGT",
              "Rechercher des formations spécifiques si nécessaire",
              "Évaluer la qualité et la pertinence des formations",
              "Vérifier la disponibilité et les conditions d'accès"
            ],
            ressources: ["Catalogue de formation CGT", "Offres de formation externes", "Critères d'évaluation"]
          },
          {
            titre: "Planification temporelle",
            description: "Établir un calendrier réaliste pour la mise en œuvre du plan de formation.",
            taches: [
              "Répartir les formations sur l'année",
              "Tenir compte des contraintes professionnelles",
              "Prévoir des sessions de rattrapage",
              "Coordonner avec le calendrier syndical global"
            ],
            ressources: ["Calendrier annuel", "Outil de planification", "Modèle de rétro-planning"]
          }
        ]
      },
      organisation: {
        title: "Organisation logistique",
        description: "Cette phase vise à mettre en place tous les aspects pratiques nécessaires à la réalisation des formations.",
        periode: "J-45 à J-30",
        actions: [
          {
            titre: "Gestion administrative",
            description: "Gérer tous les aspects administratifs liés aux formations.",
            taches: [
              "Inscrire les participants aux formations",
              "Constituer les dossiers de congé de formation",
              "Gérer les conventions avec les organismes",
              "Suivre les financements et remboursements"
            ],
            ressources: ["Formulaires d'inscription", "Guide des droits à la formation", "Modèles de courriers"]
          },
          {
            titre: "Logistique matérielle",
            description: "Préparer les aspects matériels nécessaires aux formations internes.",
            taches: [
              "Réserver les salles adaptées",
              "Préparer le matériel pédagogique",
              "Organiser les repas et pauses",
              "Prévoir l'hébergement si nécessaire"
            ],
            ressources: ["Check-list logistique", "Contacts prestataires", "Budget prévisionnel"]
          },
          {
            titre: "Communication interne",
            description: "Informer l'ensemble des syndiqués sur le plan de formation et ses modalités.",
            taches: [
              "Diffuser le calendrier des formations",
              "Communiquer sur les objectifs et contenus",
              "Rappeler les droits à la formation",
              "Motiver les syndiqués à participer"
            ],
            ressources: ["Support de présentation", "Fiches descriptives", "Guide des droits à la formation"]
          }
        ]
      },
      realisation: {
        title: "Mise en œuvre",
        description: "Cette phase correspond à la réalisation effective des formations prévues dans le plan.",
        periode: "J-30 à J+30",
        actions: [
          {
            titre: "Suivi des participations",
            description: "Assurer le suivi des participations aux formations programmées.",
            taches: [
              "Confirmer les présences avant chaque session",
              "Gérer les désistements et remplacements",
              "Tenir à jour le registre des formations",
              "Relancer les participants si nécessaire"
            ],
            ressources: ["Tableau de suivi", "Modèles de confirmation", "Liste de contacts"]
          },
          {
            titre: "Animation des formations internes",
            description: "Organiser et animer les formations réalisées en interne par la section.",
            taches: [
              "Préparer les supports pédagogiques",
              "Adapter les méthodes aux participants",
              "Animer de façon interactive et participative",
              "Distribuer les documents ressources"
            ],
            ressources: ["Supports de formation", "Guide d'animation", "Fiches pédagogiques"]
          },
          {
            titre: "Accompagnement des participants",
            description: "Soutenir les participants pendant leur parcours de formation.",
            taches: [
              "Organiser des points d'étape réguliers",
              "Répondre aux questions et difficultés",
              "Faciliter les départs en formation",
              "Assurer le lien avec les formateurs"
            ],
            ressources: ["Guide d'accompagnement", "Fiche de liaison", "Contacts formateurs"]
          }
        ]
      },
      evaluation: {
        title: "Évaluation et capitalisation",
        description: "Cette phase finale permet d'évaluer l'efficacité du plan de formation et de capitaliser sur les acquis.",
        periode: "J+30 à J+60",
        actions: [
          {
            titre: "Évaluation des formations",
            description: "Évaluer la qualité et l'impact des formations réalisées.",
            taches: [
              "Recueillir les retours des participants",
              "Évaluer l'acquisition des compétences",
              "Analyser la pertinence des contenus",
              "Identifier les points d'amélioration"
            ],
            ressources: ["Questionnaire d'évaluation", "Grille d'auto-évaluation", "Guide d'entretien"]
          },
          {
            titre: "Mise en pratique des acquis",
            description: "Favoriser la mise en application des compétences acquises.",
            taches: [
              "Organiser des ateliers de mise en pratique",
              "Confier des missions en lien avec les formations",
              "Créer des binômes d'entraide",
              "Valoriser les nouvelles compétences"
            ],
            ressources: ["Fiches de mission", "Guide de tutorat", "Outils collaboratifs"]
          },
          {
            titre: "Capitalisation et transmission",
            description: "Assurer la capitalisation et la transmission des connaissances au sein de la section.",
            taches: [
              "Constituer une bibliothèque de ressources",
              "Organiser des sessions de partage d'expérience",
              "Rédiger des synthèses accessibles",
              "Mettre en place un système de tutorat"
            ],
            ressources: ["Base documentaire", "Guide de transmission", "Fiches synthétiques"]
          }
        ]
      }
    }
  };

  // Fonction pour exporter en PDF
  const exportToPDF = () => {
    const input = contentRef.current;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add multiple pages if content is long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Add metadata
      pdf.setProperties({
        title: `Rétro-planning ${retroplanningType} - ${phase.title}`,
        subject: 'Plan d\'action syndical',
        author: 'CGT Outils',
        creator: 'Application Outils CGT'
      });
      
      pdf.save(`retroplanning-${retroplanningType}-${phase.id}.pdf`);
    });
  };

  // Fonction pour imprimer
  const printContent = () => {
    window.print();
  };

  // Sélection du contenu en fonction du type de rétro-planning et de la phase
  const contenuPhase = contenuPhases[retroplanningType]?.[phase.id] || {
    title: phase.title,
    description: phase.description,
    periode: "Période non définie",
    actions: []
  };

  const toggleAction = (index) => {
    if (actionOuverte === index) {
      setActionOuverte(null);
    } else {
      setActionOuverte(index);
    }
  };

  return (
    <div ref={contentRef} className={styles.container}>
      <div className={styles.header} style={{ backgroundColor: phase.color + '20', borderColor: phase.color }}>
        <h3 className={styles.title}>{contenuPhase.title}</h3>
        <p className={styles.description}>{contenuPhase.description}</p>
        <div className={styles.periode}>
          <span className={styles.periodeLabel}>Période : </span>
          <span className={styles.periodeValue}>{isEditingPeriod ? (
            <input 
              type="text" 
              value={customPeriode} 
              onChange={(e) => setCustomPeriode(e.target.value)} 
              onBlur={savePeriod}
            />
          ) : (
            <span onClick={() => setIsEditingPeriod(true)}>{customPeriode}</span>
          )}</span>
        </div>
      </div>

      <div className={styles.actionsContainer}>
        <h4 className={styles.actionsTitle}>Actions à mener durant cette phase</h4>
        
        {contenuPhase.actions.length > 0 ? (
          <div className={styles.actionsList}>
            {contenuPhase.actions.map((action, index) => (
              <div key={index} className={styles.actionCard}>
                <div 
                  className={styles.actionHeader} 
                  onClick={() => toggleAction(index)}
                >
                  <h5 className={styles.actionTitle}>{action.titre}</h5>
                  <button 
                    className={`${styles.actionToggle} ${actionOuverte === index ? styles.actionToggleOpen : ''}`}
                    aria-label={actionOuverte === index ? "Réduire" : "Développer"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={actionOuverte === index ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </button>
                </div>
                
                {actionOuverte === index && (
                  <div className={styles.actionContent}>
                    <p className={styles.actionDescription}>{action.description}</p>
                    
                    <div className={styles.actionSection}>
                      <h6 className={styles.actionSectionTitle}>Tâches à réaliser</h6>
                      <ul className={styles.actionList}>
                        {action.taches.map((tache, i) => (
                          <li key={i} className={styles.actionItem}>{tache}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={styles.actionSection}>
                      <h6 className={styles.actionSectionTitle}>Ressources disponibles</h6>
                      <ul className={styles.actionList}>
                        {action.ressources.map((ressource, i) => (
                          <li key={i} className={styles.actionItem}>{ressource}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className={styles.actionButton}>
                      Télécharger la fiche détaillée
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyMessage}>
            Le contenu détaillé pour cette phase est en cours d'élaboration. 
            Revenez prochainement pour consulter les actions recommandées.
          </p>
        )}
      </div>
      
      <div className={styles.navigationButtons}>
        <button className={styles.printButton} onClick={printContent}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Imprimer cette phase
        </button>
        
        <button className={styles.exportButton} onClick={exportToPDF}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exporter en PDF
        </button>
        
        <button className={styles.editButton} onClick={openPhaseEditor}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Éditer la phase
        </button>
      </div>
      
      {isEditingPhase && (
        <div className={styles.phaseEditor}>
          <h4 className={styles.phaseEditorTitle}>Éditer la phase</h4>
          <form>
            <label className={styles.phaseEditorLabel}>Titre de la phase :</label>
            <input 
              type="text" 
              value={contenuPhase.title} 
              onChange={(e) => {
                const updatedPhase = { ...contenuPhase, title: e.target.value };
                setEditedPhases({ ...editedPhases, [`${retroplanningType}-${phase.id}`]: updatedPhase });
              }}
            />
            
            <label className={styles.phaseEditorLabel}>Description de la phase :</label>
            <textarea 
              value={contenuPhase.description} 
              onChange={(e) => {
                const updatedPhase = { ...contenuPhase, description: e.target.value };
                setEditedPhases({ ...editedPhases, [`${retroplanningType}-${phase.id}`]: updatedPhase });
              }}
            />
            
            <label className={styles.phaseEditorLabel}>Période de la phase :</label>
            <input 
              type="text" 
              value={contenuPhase.periode} 
              onChange={(e) => {
                const updatedPhase = { ...contenuPhase, periode: e.target.value };
                setEditedPhases({ ...editedPhases, [`${retroplanningType}-${phase.id}`]: updatedPhase });
              }}
            />
            
            <button className={styles.phaseEditorButton} onClick={closePhaseEditor}>
              Enregistrer les modifications
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PhasePlanning;