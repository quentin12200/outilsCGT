// src/components/pages/DemarcheSyndicalePage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styles from './DemarchePage.module.css';
import TabNav from '../Modules/Demarche/TabNav';
import PhaseBesoins from '../DemarcheModule/PhaseBesoins';
import PhaseRevendications from '../DemarcheModule/PhaseRevendications';
import SchemaGlobal from '../Modules/Demarche/SchemaGlobal';

// Chaque « outil recommandé » de la démarche ouvre le vrai outil
// de l'application qui lui correspond.
function routePourOutil(nomOutil) {
  const nom = nomOutil.toLowerCase();
  if (nom.includes('questionnaire') || nom.includes('besoins') || nom.includes('consultation')) {
    return '/questionnaire';
  }
  if (nom.includes('cahier') || nom.includes('revendica') || nom.includes('priorisation') || nom.includes('argument')) {
    return '/cahier-revendicatif';
  }
  if (nom.includes('ag') || nom.includes('animation') || nom.includes('bilan participatif') || nom.includes('démocrat')) {
    return '/assemblees';
  }
  if (nom.includes('communication') || nom.includes('mobilisation') || nom.includes('rapport de force') || nom.includes('action')) {
    return '/plan-actions';
  }
  return '/parcours';
}

function DemarcheSyndicalePage() {
  // Récupérer les paramètres d'URL
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');

  // États pour gérer les onglets et les sous-onglets
  const [activeTab, setActiveTab] = useState(tabParam || 'ecole-democratie');
  const [activeSubTab, setActiveSubTab] = useState(null);

  // Définition des onglets principaux avec leurs couleurs
  const tabs = [
    { id: 'ecole-democratie', label: 'École de la démocratie', color: 'bg-indigo-600' },
    { id: 'vue-ensemble', label: "Vue d'ensemble", color: 'bg-red-700' },
    { id: 'besoins', label: 'Recueil des besoins', color: 'bg-yellow-600' },
    { id: 'revendications', label: 'Construction revendicative', color: 'bg-green-600' },
    { id: 'mobilisation', label: 'Mobilisation', color: 'bg-blue-600' },
    { id: 'action', label: 'Action / Lutte', color: 'bg-purple-600' }
  ];

  // Réinitialisation du sous-onglet en fonction de l'onglet principal sélectionné
  useEffect(() => {
    switch(activeTab) {
      case 'vue-ensemble':
        setActiveSubTab(null);
        break;
      case 'besoins':
        setActiveSubTab('methodes');
        break;
      case 'revendications':
        setActiveSubTab('reperes');
        break;
      case 'mobilisation':
        setActiveSubTab('communication');
        break;
      case 'action':
        setActiveSubTab('types');
        break;
      case 'ecole-democratie':
        // La démarche s'ouvre directement sur le schéma global :
        // c'est lui qui explique l'école de la démocratie d'un coup d'œil
        setActiveSubTab('schema');
        break;
      default:
        setActiveSubTab(null);
    }
  }, [activeTab]);

  // Fonctions de gestion
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSubTabChange = (subTabId) => {
    setActiveSubTab(subTabId);
  };

  // Ouvre le vrai outil de l'application correspondant à l'outil recommandé
  const handleAddTool = (tool) => {
    navigate(routePourOutil(tool));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>La démarche CGT</h1>
        <p className={styles.subtitle}>
          Une école de la démocratie pour construire, mobiliser et gagner ensemble
        </p>
      </header>

      <div className={styles.mainContent}>
        {/* Barre de navigation des onglets */}
        <TabNav 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
        />

        {/* Contenu en fonction de l'onglet principal sélectionné */}
        <div className={styles.tabContent}>
          {activeTab === 'vue-ensemble' && (
            <div className={styles.vueEnsemble}>
              <h2 className={styles.sectionTitle}>Vue d'ensemble de la démarche CGT</h2>
              <div className={styles.introBox}>
                <p>
                  La démarche CGT est un processus démocratique qui place les salariés au cœur de l'action syndicale. 
                  Elle permet de construire des revendications légitimes répondant aux besoins réels exprimés.
                </p>
                <p>
                  En suivant cette démarche, vous renforcez la démocratie syndicale et mobilisez efficacement vos équipes.
                </p>
                <blockquote className={styles.quote}>
                  "L'émancipation des travailleurs sera l'œuvre des travailleurs eux-mêmes"
                </blockquote>
              </div>
              <div className={styles.outilsBox}>
                <h3 className={styles.outilsTitle}>Les outils de la démarche</h3>
                <p className={styles.outilsIntro}>
                  Chaque phase de la démarche s'appuie sur un outil concret de l'application :
                </p>
                <ul className={styles.toolsList}>
                  <li className={styles.toolItem}>
                    <Link to="/carto-syndicalisation?tab=cartographie">🗺️ Cartographie — connaître ses forces</Link>
                  </li>
                  <li className={styles.toolItem}>
                    <Link to="/questionnaire">🗣️ Questionnaire — recueillir les besoins</Link>
                  </li>
                  <li className={styles.toolItem}>
                    <Link to="/cahier-revendicatif">📖 Cahier revendicatif — construire les revendications</Link>
                  </li>
                  <li className={styles.toolItem}>
                    <Link to="/assemblees">👥 Assemblées — faire vivre la démocratie</Link>
                  </li>
                  <li className={styles.toolItem}>
                    <Link to="/retro-planning">📅 Rétro-planning — organiser l'action</Link>
                  </li>
                  <li className={styles.toolItem}>
                    <Link to="/parcours">🧭 Mon parcours — suivre la démarche pas à pas</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'besoins' && (
            <PhaseBesoins onAddTool={handleAddTool} />
          )}

          {activeTab === 'revendications' && (
            <div className={styles.revendications}>
              <h2 className={styles.sectionTitle}>Construction revendicative</h2>
              <div className={styles.subNavContainer}>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'processus' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('processus')}
                >
                  Processus
                </button>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'cahier' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('cahier')}
                >
                  Cahier
                </button>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'reperes' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('reperes')}
                >
                  Repères
                </button>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'validation' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('validation')}
                >
                  Validation
                </button>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'outils-revendicatifs' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('outils-revendicatifs')}
                >
                  Outils
                </button>
              </div>
              <div className={styles.subTabContent}>
                {activeSubTab === 'processus' && (
                  <div className={styles.processusContent}>
                    <h3 className={styles.subSectionTitle}>Processus de construction</h3>
                    <p className={styles.contentText}>
                      Transformation des besoins en revendications claires et mobilisatrices.
                    </p>
                    <div className={styles.toolPromo}>
                      <p>
                        <strong>Outil recommandé :</strong> Guide d'organisation et de suivi d'une action
                      </p>
                      <button className={styles.addToolButton} onClick={() => handleAddTool("Guide d'organisation et de suivi d'une action")}>
                        Ouvrir l'outil →
                      </button>
                    </div>
                  </div>
                )}
                {activeSubTab === 'cahier' && (
                  <div className={styles.cahierContent}>
                    <h3 className={styles.subSectionTitle}>Le cahier revendicatif</h3>
                    <p className={styles.contentText}>
                      Document structurant l'ensemble des revendications.
                    </p>
                    <div className={styles.toolPromo}>
                      <p>
                        <strong>Outil recommandé :</strong> Modèle de cahier revendicatif
                      </p>
                      <button className={styles.addToolButton} onClick={() => handleAddTool("Modèle de cahier revendicatif")}>
                        Ouvrir l'outil →
                      </button>
                    </div>
                  </div>
                )}
                {activeSubTab === 'reperes' && (
                  <div className={styles.reperesContent}>
                    <h3 className={styles.subSectionTitle}>Repères revendicatifs</h3>
                    <p className={styles.contentIntro}>
                      Les repères revendicatifs de la CGT sont des outils précieux pour construire vos revendications locales.
                    </p>
                    <PhaseRevendications />
                  </div>
                )}
                {activeSubTab === 'validation' && (
                  <div className={styles.validationContent}>
                    <h3 className={styles.subSectionTitle}>Validation démocratique</h3>
                    <p className={styles.contentText}>
                      Processus de validation collective des revendications.
                    </p>
                    <div className={styles.toolPromo}>
                      <p>
                        <strong>Outil recommandé :</strong> Guide d'organisation d'une AG de validation
                      </p>
                      <button className={styles.addToolButton} onClick={() => handleAddTool("Guide d'organisation d'une AG de validation")}>
                        Ouvrir l'outil →
                      </button>
                    </div>
                  </div>
                )}
                {activeSubTab === 'outils-revendicatifs' && (
                  <div className={styles.outilsRevendicatifsContent}>
                    <h3 className={styles.subSectionTitle}>Outils pour la construction revendicative</h3>
                    <div className={styles.outilsGrid}>
                      <div className={styles.outilCard}>
                        <div className={styles.outilIcon}>📊</div>
                        <h4 className={styles.outilTitle}>Matrice de priorisation</h4>
                        <p className={styles.outilDesc}>
                          Hiérarchisez les revendications selon leur impact.
                        </p>
                        <button className={styles.addToolButton} onClick={() => handleAddTool("Matrice de priorisation des revendications")}>
                          Ouvrir l'outil →
                        </button>
                      </div>
                      <div className={styles.outilCard}>
                        <div className={styles.outilIcon}>🔍</div>
                        <h4 className={styles.outilTitle}>Guide d'analyse des besoins</h4>
                        <p className={styles.outilDesc}>
                          Synthétisez et analysez les besoins exprimés.
                        </p>
                        <button className={styles.addToolButton} onClick={() => handleAddTool("Guide d'analyse des besoins")}>
                          Ouvrir l'outil →
                        </button>
                      </div>
                      <div className={styles.outilCard}>
                        <div className={styles.outilIcon}>💡</div>
                        <h4 className={styles.outilTitle}>Fiches argumentaires</h4>
                        <p className={styles.outilDesc}>
                          Exemples d'argumentaires pour soutenir les revendications.
                        </p>
                        <button className={styles.addToolButton} onClick={() => handleAddTool("Fiches argumentaires types")}>
                          Ouvrir l'outil →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'mobilisation' && (
            <div className={styles.mobilisation}>
              <h2 className={styles.sectionTitle}>Mobilisation</h2>
              <div className={styles.subNavContainer}>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'communication' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('communication')}
                >
                  Communication
                </button>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'conviction' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('conviction')}
                >
                  Convaincre
                </button>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'rapport-force' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('rapport-force')}
                >
                  Rapport de force
                </button>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'outils-mobilisation' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('outils-mobilisation')}
                >
                  Outils
                </button>
              </div>
              <div className={styles.subTabContent}>
                {activeSubTab === 'communication' && (
                  <div className={styles.communicationContent}>
                    <h3 className={styles.subSectionTitle}>Communication efficace</h3>
                    <p className={styles.contentText}>
                      Diffusez clairement vos revendications et mobilisez les salariés.
                    </p>
                    <div className={styles.infoCard}>
                      <h4 className={styles.infoCardTitle}>Principes clés</h4>
                      <ul className={styles.bulletList}>
                        <li>Message clair et concis</li>
                        <li>Multiplicité des canaux</li>
                        <li>Adaptation au public cible</li>
                      </ul>
                    </div>
                    <div className={styles.toolPromo}>
                      <p>
                        <strong>Outil recommandé :</strong> Guide de communication de mobilisation
                      </p>
                      <button className={styles.addToolButton} onClick={() => handleAddTool("Guide de communication de mobilisation")}>
                        Ouvrir l'outil →
                      </button>
                    </div>
                  </div>
                )}
                {activeSubTab === 'conviction' && (
                  <div className={styles.convictionContent}>
                    <h3 className={styles.subSectionTitle}>Convaincre par la persuasion</h3>
                    <p className={styles.contentText}>
                      Adaptez votre discours et utilisez des témoignages forts pour convaincre.
                    </p>
                    <div className={styles.toolPromo}>
                      <p>
                        <strong>Outil recommandé :</strong> Kit d'argumentation persuasive
                      </p>
                      <button className={styles.addToolButton} onClick={() => handleAddTool("Kit d'argumentation persuasive")}>
                        Ouvrir l'outil →
                      </button>
                    </div>
                  </div>
                )}
                {activeSubTab === 'rapport-force' && (
                  <div className={styles.rapportForceContent}>
                    <h3 className={styles.subSectionTitle}>Construction du rapport de force</h3>
                    <p className={styles.contentText}>
                      Mobilisation collective et coordination pour renforcer votre rapport de force.
                    </p>
                    <div className={styles.toolPromo}>
                      <p>
                        <strong>Outil recommandé :</strong> Méthode de consolidation du rapport de force
                      </p>
                      <button className={styles.addToolButton} onClick={() => handleAddTool("Méthode de consolidation du rapport de force")}>
                        Ouvrir l'outil →
                      </button>
                    </div>
                  </div>
                )}
                {activeSubTab === 'outils-mobilisation' && (
                  <div className={styles.outilsMobilisationContent}>
                    <h3 className={styles.subSectionTitle}>Outils de mobilisation</h3>
                    <div className={styles.outilsGrid}>
                      <div className={styles.outilCard}>
                        <div className={styles.outilIcon}>📢</div>
                        <h4 className={styles.outilTitle}>Kit de communication de crise</h4>
                        <p className={styles.outilDesc}>
                          Pour gérer la communication en période de crise.
                        </p>
                        <button className={styles.addToolButton} onClick={() => handleAddTool("Kit de communication de crise")}>
                          Ouvrir l'outil →
                        </button>
                      </div>
                      <div className={styles.outilCard}>
                        <div className={styles.outilIcon}>🤝</div>
                        <h4 className={styles.outilTitle}>Fiches de mobilisation</h4>
                        <p className={styles.outilDesc}>
                          Organisez des sessions de mobilisation efficaces.
                        </p>
                        <button className={styles.addToolButton} onClick={() => handleAddTool("Fiches de mobilisation")}>
                          Ouvrir l'outil →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'action' && (
            <div className={styles.action}>
              <h2 className={styles.sectionTitle}>Action / Lutte</h2>
              <p className={styles.contentText}>
                Cette section est en cours de développement. Revenez bientôt pour découvrir les outils d'action.
              </p>
            </div>
          )}

          {activeTab === 'ecole-democratie' && (
            <div className={styles.ecoleDemocratie}>
              <h2 className={styles.sectionTitle}>École de la démocratie</h2>
              <div className={styles.subNavContainer}>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'concept' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('concept')}
                >
                  Concept
                </button>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'principes' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('principes')}
                >
                  Principes
                </button>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'schema' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('schema')}
                >
                  Schéma global
                </button>
                <button 
                  className={`${styles.subNavButton} ${activeSubTab === 'outils-democratie' && styles.activeSubNav}`}
                  onClick={() => handleSubTabChange('outils-democratie')}
                >
                  Outils
                </button>
              </div>
              <div className={styles.subTabContent}>
                {activeSubTab === 'concept' && (
                  <div className={styles.conceptContent}>
                    <h3 className={styles.subSectionTitle}>Le concept de démocratie syndicale</h3>
                    <p className={styles.contentText}>
                      L'École de la démocratie représente l'approche fondamentale de la CGT pour structurer la démarche syndicale.
                      Elle repose sur un processus démocratique en trois phases : Avant, Pendant et Après.
                    </p>
                    <div className={styles.infoCard}>
                      <h4 className={styles.infoCardTitle}>Principes fondamentaux</h4>
                      <ul className={styles.bulletList}>
                        <li>Les syndiqués sont auteurs, acteurs et décideurs</li>
                        <li>Consultation systématique des salariés</li>
                        <li>Élaboration démocratique des revendications</li>
                        <li>Mobilisation collective</li>
                        <li>Négociation transparente</li>
                        <li>Bilan des actions</li>
                      </ul>
                    </div>
                    <div className={styles.toolPromo}>
                      <p>
                        <strong>Outil recommandé :</strong> Guide des principes démocratiques
                      </p>
                      <button className={styles.addToolButton} onClick={() => handleAddTool("Guide des principes démocratiques")}>
                        Ouvrir l'outil →
                      </button>
                    </div>
                  </div>
                )}
                
                {activeSubTab === 'principes' && (
                  <div className={styles.principesContent}>
                    <h3 className={styles.subSectionTitle}>Les principes de la démocratie syndicale</h3>
                    <p className={styles.contentText}>
                      La démocratie syndicale est au cœur de l'action CGT et s'articule autour de plusieurs principes essentiels.
                    </p>
                    
                    <div className={styles.outilsGrid}>
                      <div className={styles.principeCard}>
                        <div className={styles.outilIcon}>🗣️</div>
                        <h4>Consultation des salariés</h4>
                        <p>Recueillir systématiquement les besoins et attentes des salariés pour construire des revendications légitimes.</p>
                      </div>
                      
                      <div className={styles.principeCard}>
                        <div className={styles.outilIcon}>🗳️</div>
                        <h4>Vote démocratique</h4>
                        <p>Soumettre les décisions importantes au vote des syndiqués et consulter les salariés.</p>
                      </div>
                      
                      <div className={styles.principeCard}>
                        <div className={styles.outilIcon}>👥</div>
                        <h4>Mobilisation collective</h4>
                        <p>Impliquer l'ensemble des salariés dans les actions et construire un rapport de force favorable.</p>
                      </div>
                      
                      <div className={styles.principeCard}>
                        <div className={styles.outilIcon}>🤝</div>
                        <h4>Négociation</h4>
                        <p>Négocier sur la base des revendications validées collectivement et rendre compte régulièrement.</p>
                      </div>
                      
                      <div className={styles.principeCard}>
                        <div className={styles.outilIcon}>📊</div>
                        <h4>Bilan des actions</h4>
                        <p>Évaluer collectivement les résultats obtenus et ajuster la stratégie en conséquence.</p>
                      </div>
                      
                      <div className={styles.principeCard}>
                        <div className={styles.outilIcon}>📢</div>
                        <h4>Communication transparente</h4>
                        <p>Informer régulièrement les syndiqués et les salariés des avancées et des décisions.</p>
                      </div>
                    </div>
                    
                    <div className={styles.toolPromo}>
                      <p>
                        <strong>Outil recommandé :</strong> Kit d'animation démocratique
                      </p>
                      <button className={styles.addToolButton} onClick={() => handleAddTool("Kit d'animation démocratique")}>
                        Ouvrir l'outil →
                      </button>
                    </div>
                  </div>
                )}
                
                {activeSubTab === 'schema' && (
                  <div className={styles.schemaContent}>
                    <h3 className={styles.subSectionTitle}>Schéma global de la démarche syndicale</h3>
                    <p className={styles.contentText}>
                      Ce schéma illustre les différentes phases de la démarche syndicale CGT et leurs interactions.
                    </p>
                    <SchemaGlobal onSelectEtape={(etape) => {
                      setActiveTab(etape);
                      window.scrollTo(0, 0);
                    }} />
                    
                    <div className={styles.phasesExplication}>
                      <h4 className={styles.subSubSectionTitle}>Structure "Avant / Pendant / Après"</h4>
                      <p>
                        La démarche syndicale s'articule autour de trois phases temporelles, chacune avec ses enjeux spécifiques :
                      </p>
                      <ul className={styles.bulletList}>
                        <li><strong>Avant :</strong> Organisation, recueil des besoins, élaboration des revendications</li>
                        <li><strong>Pendant :</strong> Mobilisation, action, lutte</li>
                        <li><strong>Après :</strong> Bilan, suivi, préparation des futures actions</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {activeSubTab === 'outils-democratie' && (
                  <div className={styles.outilsDemocratieContent}>
                    <h3 className={styles.subSectionTitle}>Outils pour la démocratie syndicale</h3>
                    <div className={styles.outilsGrid}>
                      <div className={styles.outilCard}>
                        <div className={styles.outilIcon}>📋</div>
                        <h4 className={styles.outilTitle}>Guide d'organisation d'AG</h4>
                        <p className={styles.outilDesc}>
                          Méthodes et conseils pour organiser des assemblées générales efficaces et démocratiques.
                        </p>
                        <button className={styles.addToolButton} onClick={() => handleAddTool("Guide d'organisation d'AG")}>
                          Ouvrir l'outil →
                        </button>
                      </div>
                      
                      <div className={styles.outilCard}>
                        <div className={styles.outilIcon}>📝</div>
                        <h4 className={styles.outilTitle}>Modèles de consultation</h4>
                        <p className={styles.outilDesc}>
                          Questionnaires et formulaires pour recueillir efficacement les besoins des salariés.
                        </p>
                        <button className={styles.addToolButton} onClick={() => handleAddTool("Modèles de consultation")}>
                          Ouvrir l'outil →
                        </button>
                      </div>
                      
                      <div className={styles.outilCard}>
                        <div className={styles.outilIcon}>🔄</div>
                        <h4 className={styles.outilTitle}>Méthode de bilan participatif</h4>
                        <p className={styles.outilDesc}>
                          Techniques pour évaluer collectivement les actions et en tirer des enseignements.
                        </p>
                        <button className={styles.addToolButton} onClick={() => handleAddTool("Méthode de bilan participatif")}>
                          Ouvrir l'outil →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        <p>
          La démarche CGT est au cœur du fonctionnement démocratique de la CGT. Pour plus d'informations, contactez votre Union Locale ou Fédération.
        </p>
      </footer>
    </div>
  );
}

export default DemarcheSyndicalePage;
