// src/components/DemarcheModule/PhaseRevendications.js
import React, { useState } from 'react';
import styles from './PhaseRevendications.module.css';
import { FaFileAlt, FaSearch, FaDownload, FaInfoCircle, FaChevronDown, FaChevronUp, FaClipboardList, FaTools, FaChartBar, FaBook, FaCheckCircle, FaListUl } from 'react-icons/fa';

function PhaseRevendications({ onAddTool }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedRepere, setExpandedRepere] = useState(null);

  // Outils associés à cette phase
  const tools = [
    'Modèle de cahier revendicatif',
    'Guide d\'animation d\'AG',
    'Matrices de priorisation',
    'Fiche de synthèse des besoins'
  ];

  // Catégories de repères revendicatifs
  const categories = [
    { id: 'droits_fondamentaux', name: 'Droits fondamentaux', color: '#e74c3c' },
    { id: 'travail_emploi', name: 'Travail et emploi', color: '#3498db' },
    { id: 'protection_sociale', name: 'Protection sociale', color: '#2ecc71' },
    { id: 'services_publics', name: 'Services publics', color: '#f39c12' },
    { id: 'economie', name: 'Économie et développement', color: '#9b59b6' }
  ];

  // Repères revendicatifs organisés par catégorie
  const reperes = {
    droits_fondamentaux: [
      { 
        id: 'fiche1', 
        title: 'Normes sociales européennes et internationales', 
        file: 'Fiche1 - Normes sociales européennes et internationales (1).pdf',
        summary: 'Défend l\'application de normes sociales protectrices au niveau européen et international pour garantir les droits fondamentaux des travailleurs face à la mondialisation.'
      },
      { 
        id: 'fiche2', 
        title: 'Droit à la paix et à la sécurité', 
        file: 'Fiche 2 - Droit à la paix, à la sécurité (1).pdf',
        summary: 'Affirme que la paix est un droit fondamental et que la sécurité collective doit être garantie par des politiques de désarmement et de coopération internationale.'
      },
      { 
        id: 'fiche3', 
        title: 'Égalité d\'accès et bénéfice des droits sans discrimination', 
        file: 'Fiche3 - Egalité d\'accès et bénéfice des droits sans discrimination.pdf',
        summary: 'Revendique l\'égalité effective d\'accès aux droits pour tous, sans discrimination liée à l\'origine, au genre, à l\'orientation sexuelle, au handicap ou à tout autre critère.'
      },
      { 
        id: 'fiche4', 
        title: 'Égalité femmes-hommes', 
        file: 'FICHE4_egalite_femmes-Hommes.pdf',
        summary: 'Propose des mesures concrètes pour atteindre l\'égalité réelle entre les femmes et les hommes dans tous les domaines : travail, salaires, responsabilités, vie personnelle.'
      }
    ],
    travail_emploi: [
      { 
        id: 'fiche5', 
        title: 'Droit à l\'emploi pour toutes et tous', 
        file: 'Fiche5 - Pour le droits à l\'emploi pour toutes et tous.pdf',
        summary: 'Défend le droit à un emploi stable, correctement rémunéré et de qualité pour chaque personne en âge de travailler, comme fondement de la dignité et de l\'autonomie.'
      },
      { 
        id: 'fiche6', 
        title: 'Nouveau statut du travail salarié', 
        file: 'Fiche6 - Pour un nouveau statut du travail salariés - Droits individuels et collectifs et transferabilité.pdf',
        summary: 'Propose un socle de droits attachés à la personne, cumulables et transférables d\'une entreprise à l\'autre, pour sécuriser les parcours professionnels.'
      },
      { 
        id: 'fiche12', 
        title: 'Droit à un salaire', 
        file: 'Fiche12 - Droit à un salaire.pdf',
        summary: 'Revendique un salaire juste qui reconnaisse les qualifications, l\'expérience et permette de vivre dignement, avec un SMIC revalorisé et des grilles de salaires cohérentes.'
      },
      { 
        id: 'fiche16', 
        title: 'Temps de travail', 
        file: 'Fiche16 - Temps de travail.pdf',
        summary: 'Défend la réduction du temps de travail à 32h hebdomadaires sans perte de salaire, pour créer des emplois et améliorer la qualité de vie des travailleurs.'
      }
    ],
    protection_sociale: [
      { 
        id: 'fiche21', 
        title: 'Droit à la Sécurité sociale intégrale', 
        file: 'Fiche 21 - Droit à la Sécurité sociale intégrale.pdf',
        summary: 'Défend une Sécurité sociale financée par les cotisations, couvrant l\'ensemble des risques sociaux et assurant un haut niveau de protection pour tous.'
      },
      { 
        id: 'fiche22', 
        title: 'Droit à la santé', 
        file: 'Fiche22 - Droit à la santé.pdf',
        summary: 'Revendique un système de santé public, accessible à tous, avec une prise en charge à 100% des soins médicalement nécessaires par la Sécurité sociale.'
      },
      { 
        id: 'fiche23', 
        title: 'Droit à la retraite', 
        file: 'Fiche23 - Droit à la retraite.pdf',
        summary: 'Défend le droit à une retraite à 60 ans à taux plein, avec un niveau de pension d\'au moins 75% du revenu net d\'activité et jamais inférieur au SMIC.'
      }
    ],
    services_publics: [
      { 
        id: 'fiche28', 
        title: 'Droit au logement', 
        file: 'Fiche 28 - Droit au logement.pdf',
        summary: 'Revendique un droit au logement effectif pour tous, avec une politique ambitieuse de construction de logements sociaux et un encadrement des loyers.'
      },
      { 
        id: 'fiche30', 
        title: 'Droit aux services publics', 
        file: 'Fiche30 - Droit aux services publics.pdf',
        summary: 'Défend des services publics de qualité, accessibles à tous sur l\'ensemble du territoire, comme outils essentiels de satisfaction des besoins et de réduction des inégalités.'
      },
      { 
        id: 'fiche36', 
        title: 'Droit à l\'énergie', 
        file: 'Fiche36 - Droit à l\'énergie.pdf',
        summary: 'Propose un service public de l\'énergie garantissant l\'accès de tous à cette ressource essentielle, avec une politique de transition énergétique socialement juste.'
      }
    ],
    economie: [
      { 
        id: 'fiche31', 
        title: 'Développement humain durable', 
        file: 'Fiche31 - Développement humain durable.pdf',
        summary: 'Promeut un modèle économique respectueux de l\'environnement et des droits sociaux, plaçant l\'humain au centre des choix de développement.'
      },
      { 
        id: 'fiche34', 
        title: 'Droit à la justice fiscale', 
        file: 'Fiche34 - Droit à la justice fiscale.pdf',
        summary: 'Revendique une fiscalité progressive et redistributive, taxant davantage le capital et les hauts revenus pour financer les services publics et réduire les inégalités.'
      },
      { 
        id: 'fiche35', 
        title: 'Financement de l\'économie', 
        file: 'Fiche35 - Financement de l\'économie.pdf',
        summary: 'Propose une réorientation du système financier au service de l\'économie réelle, de l\'emploi et de l\'investissement productif plutôt que de la spéculation.'
      }
    ]
  };

  // Filtrer les repères en fonction de la recherche
  const filteredReperes = Object.keys(reperes).reduce((acc, categoryId) => {
    const filtered = reperes[categoryId].filter(repere => 
      repere.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      repere.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[categoryId] = filtered;
    }
    return acc;
  }, {});

  // Gérer l'expansion des catégories
  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
    setExpandedRepere(null);
  };

  // Gérer l'expansion des repères
  const toggleRepere = (repereId) => {
    if (expandedRepere === repereId) {
      setExpandedRepere(null);
    } else {
      setExpandedRepere(repereId);
    }
  };

  // Télécharger un repère
  const downloadRepere = (file) => {
    // Utiliser le chemin relatif correct vers le dossier des ressources
    const path = `${process.env.PUBLIC_URL}/ressource/${file}`;
    console.log("Tentative de téléchargement:", path);
    const link = document.createElement('a');
    link.href = path;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.phaseContainer}>
      <h2 className={styles.phaseTitle}>
        <FaClipboardList className={styles.titleIcon} />
        Phase 2 : Construction revendicative
      </h2>
      
      <div className={styles.phaseIntro}>
        <h3 className={styles.subTitle}>
          <FaCheckCircle className={styles.subtitleIcon} />
          Objectifs de cette phase
        </h3>
        <ul className={styles.objectivesList}>
          <li>Transformer les besoins recueillis en revendications précises et mobilisatrices</li>
          <li>Impliquer les syndiqués dans l'élaboration démocratique du cahier revendicatif</li>
          <li>Construire des argumentaires solides pour convaincre les salariés</li>
          <li>Prioriser les revendications pour une action syndicale efficace</li>
        </ul>
      </div>
      
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <h3 className={styles.subTitle}>
            <FaBook className={styles.subtitleIcon} />
            Démarche méthodologique
          </h3>
          
          <div className={styles.methodSteps}>
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>
                <span className={styles.stepNumber}>1</span>
                Préparation de l'AG des syndiqués
              </h4>
              <ul className={styles.stepList}>
                <li>Compiler et synthétiser les besoins recueillis par thématiques</li>
                <li>Préparer les documents de travail pour l'AG</li>
                <li>Inviter tous les syndiqués en précisant l'objectif</li>
                <li>Prévoir une animation dynamique favorisant l'expression de tous</li>
              </ul>
            </div>
            
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>
                <span className={styles.stepNumber}>2</span>
                Animation de l'AG constructive
              </h4>
              <ul className={styles.stepList}>
                <li>Présenter la synthèse des besoins recueillis</li>
                <li>Organiser des ateliers par thématiques</li>
                <li>Débattre collectivement des priorités</li>
                <li>Formuler précisément les revendications</li>
              </ul>
            </div>
            
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>
                <span className={styles.stepNumber}>3</span>
                Élaboration du cahier revendicatif
              </h4>
              <ul className={styles.stepList}>
                <li>Structurer les revendications par thèmes</li>
                <li>Rédiger clairement chaque revendication</li>
                <li>Préparer un argumentaire pour chaque point</li>
                <li>Valider collectivement le document final</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.gridItem}>
          <h3 className={styles.subTitle}>
            <FaInfoCircle className={styles.subtitleIcon} />
            Conseils pratiques
          </h3>
          
          <div className={styles.tipsCard}>
            <h4 className={styles.tipsTitle}>
              <FaInfoCircle className={styles.tipsIcon} />
              Points d'attention
            </h4>
            <ul className={styles.tipsList}>
              <li><strong>Formulation précise</strong> - Des revendications claires et mesurables</li>
              <li><strong>Hiérarchisation</strong> - Ne pas hésiter à prioriser les revendications</li>
              <li><strong>Réalisme et ambition</strong> - Équilibre entre revendications immédiates et perspectives</li>
              <li><strong>Cohérence</strong> - Lien entre les revendications locales et les repères CGT</li>
            </ul>
          </div>
          
          <div className={styles.toolsBox}>
            <h4 className={styles.toolsTitle}>
              <FaTools className={styles.toolsIcon} />
              Outils recommandés
            </h4>
            <div className={styles.toolsList}>
              {tools.map(tool => (
                <div key={tool} className={styles.toolItem}>
                  <span className={styles.toolName}>
                    <FaClipboardList className={styles.toolIcon} />
                    {tool}
                  </span>
                  <button
                    onClick={() => onAddTool(tool)}
                    className={styles.addButton}
                  >
                    + Ajouter
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.successBox}>
            <h4 className={styles.successTitle}>
              <FaChartBar className={styles.successIcon} />
              Indicateurs de réussite
            </h4>
            <ul className={styles.successList}>
              <li>Participation active des syndiqués à l'élaboration</li>
              <li>Cahier revendicatif reflétant les besoins exprimés par les salariés</li>
              <li>Document clair, accessible et mobilisateur</li>
              <li>Appropriation collective des revendications par les syndiqués</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.exampleSection}>
        <h3 className={styles.subTitle}>
          <FaListUl className={styles.subtitleIcon} />
          Structure type d'un cahier revendicatif
        </h3>
        
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleHeader}>
              <h4 className={styles.exampleTitle}>Introduction</h4>
            </div>
            <div className={styles.exampleContent}>
              <ul className={styles.exampleList}>
                <li>Contexte de l'entreprise/établissement</li>
                <li>Démarche syndicale et méthodologie</li>
                <li>Présentation générale des enjeux</li>
                <li>Objectifs du cahier revendicatif</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.exampleCard}>
            <div className={styles.exampleHeader}>
              <h4 className={styles.exampleTitle}>Thématiques principales</h4>
            </div>
            <div className={styles.exampleContent}>
              <ul className={styles.exampleList}>
                <li>Salaires et rémunérations</li>
                <li>Conditions de travail</li>
                <li>Emploi et formation</li>
                <li>Organisation du travail</li>
                <li>Égalité professionnelle</li>
                <li>Protection sociale</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.exampleCard}>
            <div className={styles.exampleHeader}>
              <h4 className={styles.exampleTitle}>Structure par revendication</h4>
            </div>
            <div className={styles.exampleContent}>
              <ul className={styles.exampleList}>
                <li>Constat et diagnostic</li>
                <li>Proposition précise</li>
                <li>Argumentaire (économique, social, juridique...)</li>
                <li>Bénéfices attendus pour les salariés</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.exampleCard}>
            <div className={styles.exampleHeader}>
              <h4 className={styles.exampleTitle}>Conclusion et perspectives</h4>
            </div>
            <div className={styles.exampleContent}>
              <ul className={styles.exampleList}>
                <li>Synthèse des revendications prioritaires</li>
                <li>Calendrier de mobilisation</li>
                <li>Propositions d'actions</li>
                <li>Invitation à se mobiliser collectivement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.reperesSection}>
        <h3 className={styles.reperesTitle}>
          <FaFileAlt className={styles.titleIcon} />
          Repères revendicatifs de la CGT
        </h3>
        
        <div className={styles.reperesIntroBox}>
          <p className={styles.reperesIntro}>
            <strong>Les repères revendicatifs sont des outils essentiels pour construire vos revendications locales.</strong> Ils constituent le socle commun des analyses et propositions de la CGT sur de nombreux sujets. Utilisez-les pour :
          </p>
          <ul className={styles.reperesIntroList}>
            <li><strong>Enrichir vos arguments</strong> avec des analyses économiques et sociales</li>
            <li><strong>Élargir vos revendications</strong> au-delà des problématiques immédiates</li>
            <li><strong>Articuler le local et le national</strong> pour une démarche cohérente</li>
            <li><strong>Former les militants</strong> sur les positions de la CGT</li>
          </ul>
        </div>
        
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Rechercher un repère revendicatif par mot-clé (ex: salaire, temps de travail...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.reperesGuide}>
          <FaInfoCircle className={styles.guideIcon} />
          <p>Cliquez sur une thématique puis sur un repère pour afficher son résumé et le télécharger</p>
        </div>
        
        <div className={styles.reperesContainer}>
          {categories.map(category => {
            // Ne pas afficher les catégories vides après filtrage
            if (searchTerm && (!filteredReperes[category.id] || filteredReperes[category.id].length === 0)) {
              return null;
            }
            
            const categoryReperes = searchTerm ? filteredReperes[category.id] : reperes[category.id];
            
            return (
              <div 
                key={category.id} 
                className={styles.categoryCard}
                style={{ borderLeftColor: category.color }}
              >
                <div 
                  className={styles.categoryHeader}
                  onClick={() => toggleCategory(category.id)}
                >
                  <h4 className={styles.categoryTitle}>{category.name}</h4>
                  {expandedCategory === category.id ? 
                    <FaChevronUp className={styles.toggleIcon} /> : 
                    <FaChevronDown className={styles.toggleIcon} />
                  }
                </div>
                
                {expandedCategory === category.id && (
                  <div className={styles.reperesList}>
                    {categoryReperes.map(repere => (
                      <div key={repere.id} className={styles.repereItem}>
                        <div 
                          className={styles.repereHeader}
                          onClick={() => toggleRepere(repere.id)}
                        >
                          <h5 className={styles.repereTitle}>{repere.title}</h5>
                          {expandedRepere === repere.id ? 
                            <FaChevronUp className={styles.toggleIcon} /> : 
                            <FaChevronDown className={styles.toggleIcon} />
                          }
                        </div>
                        
                        {expandedRepere === repere.id && (
                          <div className={styles.repereContent}>
                            <p className={styles.repereSummary}>
                              <FaInfoCircle className={styles.infoIcon} />
                              {repere.summary}
                            </p>
                            <div className={styles.repereActions}>
                              <button 
                                className={styles.downloadRepereButton}
                                onClick={() => downloadRepere(repere.file)}
                              >
                                <FaDownload className={styles.downloadIcon} />
                                Télécharger le repère complet
                              </button>
                              <button 
                                className={styles.useRepereButton}
                                onClick={() => onAddTool(`Repère: ${repere.title}`)}
                              >
                                <FaClipboardList className={styles.useIcon} />
                                Utiliser dans mes revendications
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className={styles.reperesHelp}>
          <h4 className={styles.helpTitle}>Comment utiliser les repères revendicatifs ?</h4>
          <div className={styles.helpGrid}>
            <div className={styles.helpItem}>
              <div className={styles.helpNumber}>1</div>
              <p>Identifiez les repères en lien avec vos problématiques locales</p>
            </div>
            <div className={styles.helpItem}>
              <div className={styles.helpNumber}>2</div>
              <p>Extrayez les analyses et propositions pertinentes</p>
            </div>
            <div className={styles.helpItem}>
              <div className={styles.helpNumber}>3</div>
              <p>Adaptez-les au contexte spécifique de votre entreprise</p>
            </div>
            <div className={styles.helpItem}>
              <div className={styles.helpNumber}>4</div>
              <p>Intégrez-les dans votre cahier revendicatif local</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.downloadSection}>
        <h3 className={styles.downloadTitle}>
          <FaDownload className={styles.titleIcon} />
          Télécharger des modèles et exemples
        </h3>
        <div className={styles.downloadButtons}>
          <button 
            className={styles.downloadButton}
            onClick={() => onAddTool('Modèle de cahier revendicatif')}
          >
            <FaFileAlt className={styles.buttonIcon} />
            Modèle de cahier revendicatif
          </button>
          <button 
            className={styles.downloadButton}
            onClick={() => onAddTool('Guide d\'animation d\'AG')}
          >
            <FaFileAlt className={styles.buttonIcon} />
            Guide d'animation d'AG constructive
          </button>
          <button 
            className={styles.downloadButton}
            onClick={() => onAddTool('Matrices de priorisation')}
          >
            <FaFileAlt className={styles.buttonIcon} />
            Matrices de priorisation des revendications
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhaseRevendications;