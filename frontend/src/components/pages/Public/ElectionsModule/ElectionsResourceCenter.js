import React, { useState } from 'react';
import styles from './ElectionsResourceCenter.module.css';

const ElectionsResourceCenter = () => {
  const [activeCategory, setActiveCategory] = useState('guides');
  
  // Définition des catégories de ressources
  const categories = [
    { id: 'guides', label: 'Guides pratiques', icon: '📚' },
    { id: 'kit', label: 'Kit élections CSE', icon: '🧰' },
    { id: 'communication', label: 'Communication', icon: '📝' },
    { id: 'multimedia', label: 'Multimédia', icon: '🎬' },
    { id: 'tools', label: 'Outils pratiques', icon: '🛠️' }
  ];
  
  // Définition des ressources par catégorie
  const resources = {
    guides: [
      {
        title: 'LISEZ-MOI EN PREMIER',
        description: 'Guide d\'introduction aux élections CSE',
        fileName: 'lisez_moi.pdf',
        type: 'pdf',
        featured: true
      },
      {
        title: 'Guide de négociation du PAP',
        description: 'Guide FTM 2023 pour la négociation du protocole d\'accord préélectoral',
        fileName: 'guide_negociation_pap.pdf',
        type: 'pdf'
      },
      {
        title: 'Guide du vote électronique',
        description: 'Guide FTM 2023 pour la négociation et mise en place du vote électronique',
        fileName: 'guide_vote_electronique.pdf',
        type: 'pdf'
      },
      {
        title: 'Livret élections CSE',
        description: 'Guide complet pour préparer et réussir les élections CSE',
        fileName: 'livret_elections_cse.pdf',
        type: 'pdf'
      },
      {
        title: 'Protocole modèle',
        description: 'Modèle de protocole d\'accord préélectoral (ordonnances Macron)',
        fileName: 'modele_protocole.pdf',
        type: 'pdf'
      }
    ],
    kit: [
      {
        title: '0 - Mode d\'emploi du kit',
        description: 'Instructions et notes pour utiliser efficacement le kit élections CSE',
        subResources: [
          {
            title: 'LISEZ-MOI EN PREMIER',
            description: 'Document d\'introduction au kit élections CSE',
            fileName: 'kit_cse/0_mode_emploi/lisez_moi.docx',
            type: 'docx'
          },
          {
            title: 'Note aux orgas - Élections professionnelles',
            description: 'Note d\'information sur les élections professionnelles (Juillet 2023)',
            fileName: 'kit_cse/0_mode_emploi/note_elections_pro.pdf',
            type: 'pdf'
          },
          {
            title: 'Note aux orgas - Représentativité syndicale',
            description: 'Informations sur la représentativité syndicale (Octobre 2022)',
            fileName: 'kit_cse/0_mode_emploi/note_representativite.pdf',
            type: 'pdf'
          },
          {
            title: 'Note aux orgas - C\'est maintenant, on s\'organise',
            description: 'Note sur l\'organisation des élections (Novembre 2023)',
            fileName: 'kit_cse/0_mode_emploi/note_organisation.pdf',
            type: 'pdf'
          },
          {
            title: 'Diaporama enjeux et responsabilités',
            description: 'Présentation sur les enjeux et responsabilités de la Vie Syndicale',
            fileName: 'kit_cse/0_mode_emploi/diaporama_enjeux.pdf',
            type: 'pdf'
          }
        ],
        type: 'folder',
        expanded: false
      },
      {
        title: '1 - Le ciblage',
        description: 'Outils et méthodes pour effectuer un ciblage efficace',
        subResources: [
          {
            title: 'Guide de ciblage avec les outils CGT',
            description: 'Document explicatif sur le ciblage avec les outils CGT',
            fileName: 'kit_cse/1_ciblage/guide_ciblage.pdf',
            type: 'pdf'
          },
          {
            title: 'Vidéo ciblage avec outils CGT',
            description: 'Tutoriel vidéo sur le ciblage avec les outils CGT',
            fileName: 'kit_cse/1_ciblage/video_ciblage.mp4',
            type: 'video'
          }
        ],
        type: 'folder',
        expanded: false
      },
      {
        title: '2 - Déploiement et syndicalisation',
        description: 'Stratégies et outils pour le déploiement et la syndicalisation',
        subResources: [
          {
            title: 'Guide de déploiement',
            description: 'Guide pour organiser le déploiement de la CGT dans l\'entreprise',
            fileName: 'kit_cse/2_deploiement/guide_deploiement.pdf',
            type: 'pdf'
          },
          {
            title: 'Plan de syndicalisation',
            description: 'Modèle de plan de syndicalisation pour les élections',
            fileName: 'kit_cse/2_deploiement/plan_syndicalisation.docx',
            type: 'docx'
          },
          {
            title: 'Fiche pratique - Adhésion',
            description: 'Fiche pratique pour faciliter l\'adhésion de nouveaux membres',
            fileName: 'kit_cse/2_deploiement/fiche_adhesion.pdf',
            type: 'pdf'
          }
        ],
        type: 'folder',
        expanded: false
      },
      {
        title: '3 - Négociation du PAP',
        description: 'Ressources pour la négociation du protocole d\'accord préélectoral',
        subResources: [
          {
            title: 'Qu\'est-ce que le PAP',
            description: 'Fiche explicative sur le protocole d\'accord préélectoral',
            fileName: 'kit_cse/3_nego_pap/fiche_pap_definition.docx',
            type: 'docx'
          },
          {
            title: 'Collèges, électorat et éligibilité',
            description: 'Fiche sur les collèges électoraux, l\'électorat et l\'éligibilité',
            fileName: 'kit_cse/3_nego_pap/fiche_colleges.docx',
            type: 'docx'
          },
          {
            title: 'Déroulement du scrutin',
            description: 'Fiche sur le déroulement du scrutin',
            fileName: 'kit_cse/3_nego_pap/fiche_deroulement.docx',
            type: 'docx'
          },
          {
            title: 'Campagne et propagande',
            description: 'Fiche sur la campagne électorale et la propagande',
            fileName: 'kit_cse/3_nego_pap/fiche_campagne.docx',
            type: 'docx'
          },
          {
            title: 'Dépouillement et résultats',
            description: 'Fiche sur le dépouillement et les résultats des élections',
            fileName: 'kit_cse/3_nego_pap/fiche_depouillement.docx',
            type: 'docx'
          },
          {
            title: 'Contestations élections',
            description: 'Fiche sur les contestations des élections',
            fileName: 'kit_cse/3_nego_pap/fiche_contestations.docx',
            type: 'docx'
          },
          {
            title: 'Schéma des élections professionnelles',
            description: 'Schéma explicatif du processus des élections professionnelles',
            fileName: 'kit_cse/3_nego_pap/schema_elections.docx',
            type: 'docx'
          },
          {
            title: 'Présentation - La négociation du PAP',
            description: 'Présentation PowerPoint sur la négociation du PAP',
            fileName: 'kit_cse/3_nego_pap/presentation_pap.pptx',
            type: 'pptx'
          },
          {
            title: 'Note juridique UGICT',
            description: 'Note juridique de l\'UGICT sur les élections professionnelles',
            fileName: 'kit_cse/3_nego_pap/note_juridique.pdf',
            type: 'pdf'
          },
          {
            title: 'Modèle de mandat PAP',
            description: 'Modèle de mandat pour la négociation du PAP',
            fileName: 'kit_cse/3_nego_pap/modele_mandat.docx',
            type: 'docx'
          },
          {
            title: 'Modèle réponse invitation à négocier',
            description: 'Modèle de réponse à une invitation à négocier le PAP',
            fileName: 'kit_cse/3_nego_pap/modele_reponse.docx',
            type: 'docx'
          },
          {
            title: 'Note sur le vote électronique',
            description: 'Note explicative sur le vote électronique',
            fileName: 'kit_cse/3_nego_pap/note_vote_electronique.pdf',
            type: 'pdf'
          }
        ],
        type: 'folder',
        expanded: false
      },
      {
        title: '4 - Constitution des listes',
        description: 'Ressources pour la constitution des listes de candidats',
        subResources: [
          {
            title: 'Guide de constitution des listes',
            description: 'Guide complet pour constituer des listes de candidats efficaces',
            fileName: 'kit_cse/4_listes/guide_constitution.pdf',
            type: 'pdf'
          },
          {
            title: 'Modèle de liste de candidats',
            description: 'Modèle Excel pour préparer vos listes de candidats',
            fileName: 'kit_cse/4_listes/modele_liste.xlsx',
            type: 'excel'
          },
          {
            title: 'Fiche pratique - Parité',
            description: 'Fiche sur les règles de parité dans les listes de candidats',
            fileName: 'kit_cse/4_listes/fiche_parite.pdf',
            type: 'pdf'
          },
          {
            title: 'Fiche pratique - Encadrement',
            description: 'Fiche sur la représentation de l\'encadrement dans les listes',
            fileName: 'kit_cse/4_listes/fiche_encadrement.pdf',
            type: 'pdf'
          }
        ],
        type: 'folder',
        expanded: false
      },
      {
        title: '5 - Campagne électorale',
        description: 'Outils et stratégies pour mener une campagne électorale efficace',
        subResources: [
          {
            title: 'Guide de campagne électorale',
            description: 'Guide complet pour organiser votre campagne électorale',
            fileName: 'kit_cse/5_campagne/guide_campagne.pdf',
            type: 'pdf'
          },
          {
            title: 'Modèles de tracts',
            description: 'Modèles de tracts personnalisables pour votre campagne',
            fileName: 'kit_cse/5_campagne/modeles_tracts.docx',
            type: 'docx'
          },
          {
            title: 'Planning de campagne',
            description: 'Modèle de planning pour organiser votre campagne électorale',
            fileName: 'kit_cse/5_campagne/planning_campagne.xlsx',
            type: 'excel'
          },
          {
            title: 'Argumentaire CGT',
            description: 'Argumentaire pour défendre les positions de la CGT',
            fileName: 'kit_cse/5_campagne/argumentaire.pdf',
            type: 'pdf'
          }
        ],
        type: 'folder',
        expanded: false
      },
      {
        title: '6 - Structuration post-élection',
        description: 'Ressources pour structurer l\'action syndicale après les élections',
        subResources: [
          {
            title: 'Guide de structuration post-élection',
            description: 'Guide pour organiser l\'action syndicale après les élections',
            fileName: 'kit_cse/6_post_election/guide_structuration.pdf',
            type: 'pdf'
          },
          {
            title: 'Modèle de règlement intérieur du CSE',
            description: 'Modèle de règlement intérieur pour le CSE',
            fileName: 'kit_cse/6_post_election/reglement_interieur.docx',
            type: 'docx'
          },
          {
            title: 'Fiche pratique - Commissions du CSE',
            description: 'Fiche sur la mise en place des commissions du CSE',
            fileName: 'kit_cse/6_post_election/fiche_commissions.pdf',
            type: 'pdf'
          },
          {
            title: 'Plan de travail syndical',
            description: 'Modèle de plan de travail syndical post-élection',
            fileName: 'kit_cse/6_post_election/plan_travail.docx',
            type: 'docx'
          }
        ],
        type: 'folder',
        expanded: false
      }
    ],
    communication: [
      {
        title: '10 priorités CGT',
        description: 'Affiche présentant les 10 priorités de la CGT',
        fileName: '10_priorites_cgt.pdf',
        type: 'pdf'
      },
      {
        title: 'Tract élections CSE',
        description: 'Tract 4 pages pour les élections CSE',
        fileName: 'tract_elections_cse.pdf',
        type: 'pdf'
      },
      {
        title: 'Tract spécial intérimaires',
        description: 'Communication adaptée pour les travailleurs intérimaires',
        fileName: 'tract_interimaires.pdf',
        type: 'pdf'
      },
      {
        title: 'Flyer élections TPE',
        description: 'Flyer pour les élections dans les très petites entreprises',
        fileName: 'flyer_elections_tpe.pdf',
        type: 'pdf'
      },
      {
        title: '6 bonnes raisons - Encadrement',
        description: 'Arguments pour se présenter sur une liste CGT encadrement',
        fileName: '6_bonnes_raisons_encadrement.pdf',
        type: 'pdf'
      },
      {
        title: 'Kit représentativité',
        description: 'Présentation du kit représentativité (version 2023)',
        fileName: 'kit_representativite.pdf',
        type: 'pdf'
      }
    ],
    multimedia: [
      {
        title: 'Vidéo #JevoteCGT',
        description: 'Vidéo de campagne pour les élections professionnelles',
        fileName: 'jevote_cgt.mp4',
        type: 'video'
      }
    ],
    tools: [
      {
        title: 'Calculateur de représentativité',
        description: 'Outil pour calculer la représentativité syndicale après les élections',
        component: 'RepresentativityCalculator',
        type: 'component'
      },
      {
        title: 'Résultats des élections CSE',
        description: 'Visualisation des résultats des élections CSE en Aveyron',
        component: 'ElectionResults',
        type: 'component'
      },
      {
        title: 'Modèle de liste de candidats',
        description: 'Modèle Excel pour préparer vos listes de candidats',
        fileName: 'modele_liste_candidats.xlsx',
        type: 'excel',
        comingSoon: true
      },
      {
        title: 'Calendrier préélectoral',
        description: 'Outil pour générer un calendrier préélectoral personnalisé',
        component: 'ElectionCalendar',
        type: 'component',
        comingSoon: true
      }
    ]
  };
  
  // État pour gérer l'expansion des dossiers
  const [expandedFolders, setExpandedFolders] = useState({});
  
  // Fonction pour basculer l'expansion d'un dossier
  const toggleFolderExpansion = (folderIndex) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderIndex]: !prev[folderIndex]
    }));
  };
  
  // Fonction pour générer le chemin d'accès au fichier
  const getResourcePath = (fileName) => {
    return `/ressource/electionressource/${fileName}`;
  };
  
  // Fonction pour gérer l'ouverture des ressources
  const handleResourceClick = (resource, event) => {
    // Si c'est un dossier, basculer l'expansion
    if (resource.type === 'folder') {
      event.stopPropagation();
      const folderIndex = resources[activeCategory].indexOf(resource);
      toggleFolderExpansion(folderIndex);
      return;
    }
    
    if (resource.comingSoon) {
      alert('Cette fonctionnalité sera disponible prochainement !');
      return;
    }
    
    if (resource.type === 'component') {
      // Logique pour afficher le composant (à implémenter ultérieurement)
      alert('Cette fonctionnalité sera disponible prochainement !');
      return;
    }
    
    // Ouvrir le fichier dans un nouvel onglet
    window.open(getResourcePath(resource.fileName), '_blank');
  };
  
  // Fonction pour obtenir l'icône en fonction du type de fichier
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <span className={styles.pdfIcon}>PDF</span>;
      case 'video':
        return <span className={styles.videoIcon}>▶️</span>;
      case 'excel':
      case 'xlsx':
        return <span className={styles.excelIcon}>XLS</span>;
      case 'docx':
        return <span className={styles.docxIcon}>DOC</span>;
      case 'pptx':
        return <span className={styles.pptxIcon}>PPT</span>;
      case 'component':
        return <span className={styles.componentIcon}>🔧</span>;
      case 'folder':
        return <span className={styles.folderIcon}>📁</span>;
      default:
        return <span className={styles.fileIcon}>📄</span>;
    }
  };
  
  // Rendu du composant
  return (
    <div className={styles.resourceCenter}>
      <h2 className={styles.title}>Centre de ressources - Élections CSE</h2>
      
      <div className={styles.categoryTabs}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.categoryTab} ${activeCategory === category.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className={styles.categoryIcon}>{category.icon}</span>
            <span className={styles.categoryLabel}>{category.label}</span>
          </button>
        ))}
      </div>
      
      <div className={styles.resourcesContainer}>
        {resources[activeCategory]?.map((resource, index) => (
          <div key={index}>
            <div 
              className={`${styles.resourceCard} ${resource.featured ? styles.featured : ''} ${resource.comingSoon ? styles.comingSoon : ''}`}
              onClick={(e) => handleResourceClick(resource, e)}
            >
              <div className={styles.resourceIcon}>
                {getFileIcon(resource.type)}
              </div>
              <div className={styles.resourceInfo}>
                <h3 className={styles.resourceTitle}>
                  {resource.title}
                  {resource.comingSoon && <span className={styles.comingSoonBadge}>Bientôt</span>}
                </h3>
                <p className={styles.resourceDescription}>{resource.description}</p>
              </div>
              {resource.type === 'folder' && (
                <div className={styles.folderToggle}>
                  {expandedFolders[index] ? '▼' : '▶'}
                </div>
              )}
            </div>
            
            {/* Sous-ressources pour les dossiers */}
            {resource.type === 'folder' && expandedFolders[index] && resource.subResources && (
              <div className={styles.subResourcesContainer}>
                {resource.subResources.map((subResource, subIndex) => (
                  <div 
                    key={subIndex} 
                    className={styles.subResourceCard}
                    onClick={() => handleResourceClick(subResource, { stopPropagation: () => {} })}
                  >
                    <div className={styles.subResourceIcon}>
                      {getFileIcon(subResource.type)}
                    </div>
                    <div className={styles.subResourceInfo}>
                      <h4 className={styles.subResourceTitle}>{subResource.title}</h4>
                      <p className={styles.subResourceDescription}>{subResource.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {activeCategory === 'kit' && (
        <div className={styles.resourceTip}>
          <p>
            <strong>Conseil :</strong> Le kit complet d'élections CSE est organisé chronologiquement, du ciblage initial jusqu'à la structuration post-élection.
            Chaque dossier contient les ressources nécessaires pour cette étape spécifique du processus électoral.
          </p>
        </div>
      )}
      
      {activeCategory === 'guides' && (
        <div className={styles.resourceTip}>
          <p>
            <strong>Conseil :</strong> Commencez par le document "LISEZ-MOI EN PREMIER" pour une vue d'ensemble du processus électoral.
            Pour une approche plus détaillée, consultez le kit complet d'élections CSE dans l'onglet dédié.
          </p>
        </div>
      )}
      
      {activeCategory === 'tools' && (
        <div className={styles.resourceTip}>
          <p>
            <strong>Conseil :</strong> Ces outils pratiques vous aideront à préparer vos élections et à analyser les résultats.
            Le calculateur de représentativité est particulièrement utile pour évaluer rapidement les résultats post-élections.
          </p>
        </div>
      )}
    </div>
  );
};

export default ElectionsResourceCenter;
