// src/components/pages/DemarcheSyndicalePage.js
import React, { useState, useEffect } from 'react';
import styles from './DemarchePage.module.css';
import TabNav from '../Modules/Demarche/TabNav';
import PhaseBesoins from '../DemarcheModule/PhaseBesoins';
import SchemaGlobal from '../Modules/Demarche/SchemaGlobal';

function DemarcheSyndicalePage() {
  // États pour gérer les onglets, les sous-onglets et la sélection d'outils
  const [activeTab, setActiveTab] = useState('vue-ensemble');
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [selectedTools, setSelectedTools] = useState([]);

  // Définition des onglets principaux avec leurs couleurs
  const tabs = [
    { id: 'vue-ensemble', label: "Vue d'ensemble", color: 'bg-red-700' },
    { id: 'besoins', label: 'Recueil des besoins', color: 'bg-yellow-600' },
    { id: 'revendications', label: 'Construction revendicative', color: 'bg-green-600' },
    { id: 'mobilisation', label: 'Mobilisation', color: 'bg-blue-600' },
    { id: 'action', label: 'Action / Lutte', color: 'bg-purple-600' },
    { id: 'ecole-democratie', label: 'École de la démocratie', color: 'bg-indigo-600' }
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
        setActiveSubTab('processus');
        break;
      case 'mobilisation':
        setActiveSubTab('communication');
        break;
      case 'action':
        setActiveSubTab('types');
        break;
      case 'ecole-democratie':
        setActiveSubTab('concept');
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

  const handleAddTool = (tool) => {
    if (!selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool]);
      alert(`Outil "${tool}" ajouté à votre boîte à outils`);
    }
  };

  const handleExportTools = () => {
    alert("Fonctionnalité d'exportation à venir");
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
                <h3 className={styles.outilsTitle}>Boîte à outils</h3>
                <p className={styles.outilsIntro}>
                  Sélectionnez et exportez les outils qui vous aideront dans chaque phase.
                </p>
                <div className={styles.selectedTools}>
                  <h4>Vos outils sélectionnés ({selectedTools.length})</h4>
                  {selectedTools.length > 0 ? (
                    <>
                      <ul className={styles.toolsList}>
                        {selectedTools.map((tool, index) => (
                          <li key={index} className={styles.toolItem}>{tool}</li>
                        ))}
                      </ul>
                      <button className={styles.exportButton} onClick={handleExportTools}>
                        Exporter ma boîte à outils
                      </button>
                    </>
                  ) : (
                    <p className={styles.emptyTools}>
                      Aucun outil sélectionné. Explorez les différentes phases pour ajouter des outils.
                    </p>
                  )}
                </div>
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
                        Ajouter à ma boîte à outils
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
                        Ajouter à ma boîte à outils
                      </button>
                    </div>
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
                        Ajouter à ma boîte à outils
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
                          Ajouter à ma boîte à outils
                        </button>
                      </div>
                      <div className={styles.outilCard}>
                        <div className={styles.outilIcon}>🔍</div>
                        <h4 className={styles.outilTitle}>Guide d'analyse des besoins</h4>
                        <p className={styles.outilDesc}>
                          Synthétisez et analysez les besoins exprimés.
                        </p>
                        <button className={styles.addToolButton} onClick={() => handleAddTool("Guide d'analyse des besoins")}>
                          Ajouter à ma boîte à outils
                        </button>
                      </div>
                      <div className={styles.outilCard}>
                        <div className={styles.outilIcon}>💡</div>
                        <h4 className={styles.outilTitle}>Fiches argumentaires</h4>
                        <p className={styles.outilDesc}>
                          Exemples d'argumentaires pour soutenir les revendications.
                        </p>
                        <button className={styles.addToolButton} onClick={() => handleAddTool("Fiches argumentaires types")}>
                          Ajouter à ma boîte à outils
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
                        Ajouter à ma boîte à outils
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
                        Ajouter à ma boîte à outils
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
                        Ajouter à ma boîte à outils
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
                          Ajouter à ma boîte à outils
                        </button>
                      </div>
                      <div className={styles.outilCard}>
                        <div className={styles.outilIcon}>🤝</div>
                        <h4 className={styles.outilTitle}>Fiches de mobilisation</h4>
                        <p className={styles.outilDesc}>
                          Organisez des sessions de mobilisation efficaces.
                        </p>
                        <button className={styles.addToolButton} onClick={() => handleAddTool("Fiches de mobilisation")}>
                          Ajouter à ma boîte à outils
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
              <SchemaGlobal onSelectEtape={(etape) => alert(`Étape sélectionnée : ${etape}`)} />
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
