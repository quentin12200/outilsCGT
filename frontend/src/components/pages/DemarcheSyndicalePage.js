// src/components/pages/DemarchePage.js
import React, { useState } from 'react';
import styles from './DemarcheSyndicalePage.module.css';
import TabNav from '../Modules/Demarche/TabNav';
import PhaseBesoins from '../DemarcheModule/PhaseBesoins';

function DemarchePage() {
  // États pour gérer les onglets et les phases
  const [activeTab, setActiveTab] = useState('vue-ensemble');
  const [selectedTools, setSelectedTools] = useState([]);

  // Définition des onglets principaux
  const tabs = [
    { id: 'vue-ensemble', label: "Vue d'ensemble", color: 'bg-red-700' },
    { id: 'besoins', label: 'Recueil des besoins', color: 'bg-yellow-600' },
    { id: 'revendications', label: 'Construction revendicative', color: 'bg-green-600' },
    { id: 'mobilisation', label: 'Mobilisation', color: 'bg-blue-600' },
    { id: 'action', label: 'Action / Lutte', color: 'bg-purple-600' }
  ];

  // Fonction de changement d'onglet
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Fonction pour ajouter un outil à la boîte à outils
  const handleAddTool = (tool) => {
    if (!selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool]);
      // Afficher une notification ou un message de confirmation
      alert(`Outil "${tool}" ajouté à votre boîte à outils`);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>La démarche revendicative CGT</h1>
        <p className={styles.subtitle}>
          Construire, mobiliser et gagner ensemble
        </p>
      </header>

      <div className={styles.mainContent}>
        {/* Navigation entre les onglets */}
        <TabNav 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
        />

        {/* Contenu spécifique à l'onglet actif */}
        <div className={styles.tabContent}>
          {activeTab === 'vue-ensemble' && (
            <div className={styles.vueEnsemble}>
              <h2 className={styles.sectionTitle}>Vue d'ensemble de la démarche revendicative</h2>
              
              <div className={styles.introBox}>
                <p>
                  La démarche revendicative CGT est un processus démocratique qui place les salariés 
                  au cœur de l'action syndicale. Elle permet de construire des revendications 
                  légitimes qui répondent aux besoins réels exprimés par les salariés.
                </p>
                <p>
                  En suivant cette démarche, vous renforcez la démocratie syndicale, la mobilisation 
                  des salariés et l'efficacité de vos actions.
                </p>
              </div>
              
              <div className={styles.processTimeline}>
                <div className={styles.timelineStep}>
                  <div className={styles.timelineIcon}>1</div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>Recueil des besoins</h3>
                    <p className={styles.timelineDesc}>
                      Consultation des salariés, écoute active, questionnaires et tournées
                    </p>
                  </div>
                </div>
                
                <div className={styles.timelineStep}>
                  <div className={styles.timelineIcon}>2</div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>Construction revendicative</h3>
                    <p className={styles.timelineDesc}>
                      Élaboration démocratique du cahier revendicatif en AG des syndiqués
                    </p>
                  </div>
                </div>
                
                <div className={styles.timelineStep}>
                  <div className={styles.timelineIcon}>3</div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>Mobilisation</h3>
                    <p className={styles.timelineDesc}>
                      Communication, conviction, construction du rapport de force
                    </p>
                  </div>
                </div>
                
                <div className={styles.timelineStep}>
                  <div className={styles.timelineIcon}>4</div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>Action / Lutte</h3>
                    <p className={styles.timelineDesc}>
                      Mise en œuvre des moyens d'action adaptés pour gagner
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={styles.principesBox}>
                <h3 className={styles.principesTitle}>Principes fondamentaux</h3>
                <div className={styles.principesGrid}>
                  <div className={styles.principeCard}>
                    <h4>Démocratie syndicale</h4>
                    <p>Les syndiqués sont auteurs, acteurs et décideurs</p>
                  </div>
                  <div className={styles.principeCard}>
                    <h4>Démocratie ouvrière</h4>
                    <p>Consultation et mobilisation de tous les salariés</p>
                  </div>
                  <div className={styles.principeCard}>
                    <h4>Bataille des idées</h4>
                    <p>Convaincre par l'argumentation et le débat</p>
                  </div>
                  <div className={styles.principeCard}>
                    <h4>Rapport de force</h4>
                    <p>Construction d'une mobilisation massive et unitaire</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.outilsBox}>
                <h3 className={styles.outilsTitle}>Boîte à outils</h3>
                <p className={styles.outilsIntro}>
                  Explorez chaque phase pour découvrir les outils adaptés à chaque étape de la démarche.
                  Vous pouvez les ajouter à votre boîte à outils personnalisée.
                </p>
                
                <div className={styles.selectedTools}>
                  <h4>Vos outils sélectionnés ({selectedTools.length})</h4>
                  {selectedTools.length > 0 ? (
                    <ul className={styles.toolsList}>
                      {selectedTools.map((tool, index) => (
                        <li key={index} className={styles.toolItem}>{tool}</li>
                      ))}
                    </ul>
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
              <div className={styles.comingSoon}>
                <p>Cette section est en cours de développement. Revenez bientôt pour découvrir les contenus sur la construction revendicative.</p>
              </div>
            </div>
          )}

          {activeTab === 'mobilisation' && (
            <div className={styles.mobilisation}>
              <h2 className={styles.sectionTitle}>Mobilisation</h2>
              <div className={styles.comingSoon}>
                <p>Cette section est en cours de développement. Revenez bientôt pour découvrir les contenus sur la mobilisation.</p>
              </div>
            </div>
          )}

          {activeTab === 'action' && (
            <div className={styles.action}>
              <h2 className={styles.sectionTitle}>Action / Lutte</h2>
              <div className={styles.comingSoon}>
                <p>Cette section est en cours de développement. Revenez bientôt pour découvrir les contenus sur les formes d'action et de lutte.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <footer className={styles.footer}>
        <p>
          La démarche revendicative est au cœur du fonctionnement démocratique de la CGT. 
          Pour plus d'informations, contactez votre Union Locale ou Fédération.
        </p>
      </footer>
    </div>
  );
}

export default DemarchePage;