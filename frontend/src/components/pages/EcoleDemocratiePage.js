// src/components/pages/EcoleDemocratiePage.js
import React, { useState } from 'react';
import styles from './EcoleDemocratiePage.module.css';
import TabNav from '../Modules/Demarche/TabNav';
import SchemaGlobal from '../Modules/Demarche/SchemaGlobal';
import BesoinsEtape from '../Modules/Demarche/Etapes/BesoinsEtape';

function EcoleDemocratiePage() {
  const [activePhase, setActivePhase] = useState('schema');
  const [activeEtape, setActiveEtape] = useState(null);

  const phases = [
    { id: 'schema', label: "Vue d'ensemble", color: 'bg-red-700' },
    { id: 'democratie', label: 'École de la démocratie', color: 'bg-yellow-600' },
    { id: 'processus', label: 'Processus démocratique', color: 'bg-green-600' },
    { id: 'principes', label: 'Principes fondamentaux', color: 'bg-blue-600' }
  ];

  const handlePhaseChange = (phaseId) => {
    setActivePhase(phaseId);
    setActiveEtape(null);
  };

  const handleEtapeChange = (etapeId) => {
    setActiveEtape(etapeId);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>La démarche : une école de la démocratie</h1>
        <p className={styles.subtitle}>
          La démarche démocratique CGT pour construire les revendications et mobiliser collectivement
        </p>
      </header>

      <div className={styles.card}>
        <blockquote className={styles.quote}>
          "L'émancipation des travailleurs sera l'œuvre des travailleurs eux-mêmes"
        </blockquote>
        <p className={styles.description}>
          La démarche démocratique de la CGT est un processus qui place les salariés au cœur de l'action syndicale.
          C'est la capacité de chaque syndicat CGT à déployer, à partir de sa force organisée, une DÉMARCHE
          DÉMOCRATIQUE pour bâtir un CAHIER REVENDICATIF répondant aux besoins exprimés au plus près des postes
          de travail et convaincre par la bataille d'idées le plus grand nombre de salariés à se mobiliser.
        </p>

        {/* Navigation entre les phases */}
        <TabNav 
          tabs={phases} 
          activeTab={activePhase} 
          onTabChange={handlePhaseChange}
        />

        {/* Contenu spécifique à la phase active */}
        <div className={styles.phaseContent}>
          {activePhase === 'schema' && (
            <SchemaGlobal onSelectEtape={handleEtapeChange} />
          )}
          {activePhase === 'democratie' && (
            <div className={styles.democratieSection}>
              <h2 className={styles.sectionTitle}>L'école de la démocratie</h2>
              <div className={styles.democratieGrid}>
                <div className={styles.democratieCard}>
                  <h3 className={styles.cardTitle}>Qu'est-ce que la démocratie syndicale ?</h3>
                  <p>
                    La démocratie syndicale CGT repose sur plusieurs principes fondamentaux :
                  </p>
                  <ul className={styles.democratieList}>
                    <li><strong>Les syndiqués sont auteurs, acteurs et décideurs</strong> de la démarche syndicale</li>
                    <li>Les <strong>décisions sont prises collectivement</strong> et démocratiquement</li>
                    <li>La démarche part des <strong>besoins réels exprimés par les salariés</strong></li>
                    <li>Le <strong>syndicat est une école</strong> d'apprentissage de la démocratie</li>
                  </ul>
                </div>
                <div className={styles.democratieCard}>
                  <h3 className={styles.cardTitle}>Pourquoi une école de la démocratie ?</h3>
                  <p>
                    La démarche CGT est une école de la démocratie car elle permet :
                  </p>
                  <ul className={styles.democratieList}>
                    <li>D'<strong>apprendre collectivement</strong> à porter la parole des salariés</li>
                    <li>De <strong>former des militants</strong> aux pratiques démocratiques</li>
                    <li>De <strong>construire collectivement</strong> des revendications légitimes</li>
                    <li>De <strong>donner à chacun les moyens</strong> de participer à la vie syndicale</li>
                  </ul>
                </div>
              </div>
              <div className={styles.democratieCard}>
                <h3 className={styles.cardTitle}>Les bénéfices de la démarche démocratique</h3>
                <div className={styles.benefitsGrid}>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitIcon}>🔍</div>
                    <div className={styles.benefitText}>
                      <h4>Légitimité</h4>
                      <p>Des revendications construites à partir des besoins réels des salariés</p>
                    </div>
                  </div>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitIcon}>👥</div>
                    <div className={styles.benefitText}>
                      <h4>Mobilisation</h4>
                      <p>Un plus grand nombre de salariés impliqués dans l'action syndicale</p>
                    </div>
                  </div>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitIcon}>💪</div>
                    <div className={styles.benefitText}>
                      <h4>Rapport de force</h4>
                      <p>Une capacité accrue à faire aboutir les revendications</p>
                    </div>
                  </div>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitIcon}>🤝</div>
                    <div className={styles.benefitText}>
                      <h4>Syndicalisation</h4>
                      <p>Un renforcement du syndicat par l'adhésion de nouveaux membres</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activePhase === 'processus' && (
            <div className={styles.processusSection}>
              <h2 className={styles.sectionTitle}>Le processus démocratique CGT</h2>
              <div className={styles.etapesContainer}>
                <div className={styles.etapeCard} onClick={() => handleEtapeChange('besoins')}>
                  <div className={styles.etapeNumber}>1</div>
                  <div className={styles.etapeContent}>
                    <h3 className={styles.etapeTitle}>Recueil des besoins</h3>
                    <p className={styles.etapeDesc}>Consultation des salariés, tournées de services, questionnaires</p>
                  </div>
                </div>
                <div className={styles.etapeCard} onClick={() => handleEtapeChange('revendications')}>
                  <div className={styles.etapeNumber}>2</div>
                  <div className={styles.etapeContent}>
                    <h3 className={styles.etapeTitle}>Élaboration des revendications</h3>
                    <p className={styles.etapeDesc}>Construction du cahier revendicatif en AG des syndiqués</p>
                  </div>
                </div>
                <div className={styles.etapeCard} onClick={() => handleEtapeChange('mobilisation')}>
                  <div className={styles.etapeNumber}>3</div>
                  <div className={styles.etapeContent}>
                    <h3 className={styles.etapeTitle}>Mobilisation</h3>
                    <p className={styles.etapeDesc}>Convaincre, rassembler, construire le rapport de force</p>
                  </div>
                </div>
              </div>
              
              {activeEtape === 'besoins' && (
                <BesoinsEtape />
              )}
              {activeEtape === 'revendications' && (
                <div className={styles.etapeDetail}>
                  <h3 className={styles.etapeDetailTitle}>L'élaboration des revendications</h3>
                  <p>
                    Cette étape consiste à synthétiser les besoins exprimés par les salariés et à les transformer
                    en revendications précises et mobilisatrices. Elle se déroule principalement en assemblée générale
                    des syndiqués.
                  </p>
                  <div className={styles.democratieGrid}>
                    <div className={styles.processusPrincipes}>
                      <h4>Principes démocratiques</h4>
                      <ul>
                        <li>Présenter la synthèse des besoins recueillis</li>
                        <li>Débattre collectivement des priorités</li>
                        <li>Construire des revendications précises</li>
                        <li>Valider le cahier revendicatif</li>
                      </ul>
                    </div>
                    <div className={styles.processusOutils}>
                      <h4>Outils et méthodes</h4>
                      <ul>
                        <li>AG des syndiqués</li>
                        <li>Tableau de synthèse des besoins</li>
                        <li>Matrice de priorisation</li>
                        <li>Modèle de cahier revendicatif</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {activeEtape === 'mobilisation' && (
                <div className={styles.etapeDetail}>
                  <h3 className={styles.etapeDetailTitle}>La mobilisation</h3>
                  <p>
                    Cette étape consiste à convaincre le plus grand nombre de salariés de se mobiliser
                    autour des revendications. C'est la bataille des idées pour construire un rapport
                    de force favorable.
                  </p>
                  <div className={styles.democratieGrid}>
                    <div className={styles.processusPrincipes}>
                      <h4>Principes démocratiques</h4>
                      <ul>
                        <li>Présenter le cahier revendicatif aux salariés</li>
                        <li>Organiser des AG de salariés</li>
                        <li>Débattre et convaincre</li>
                        <li>Décider collectivement des actions</li>
                      </ul>
                    </div>
                    <div className={styles.processusOutils}>
                      <h4>Outils et méthodes</h4>
                      <ul>
                        <li>Tracts et affiches</li>
                        <li>Réunions d'information</li>
                        <li>Tournées de services</li>
                        <li>AG des salariés</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {activePhase === 'principes' && (
            <div className={styles.principesSection}>
              <h2 className={styles.sectionTitle}>Les principes fondamentaux</h2>
              <div className={styles.principesGrid}>
                <div className={styles.principeCard}>
                  <h3 className={styles.principeTitle}>Les syndiqués auteurs, acteurs, décideurs</h3>
                  <p className={styles.principeDesc}>
                    Les syndiqués sont au cœur de la démarche démocratique CGT. Ils participent à toutes les étapes,
                    de la définition des besoins à la mise en œuvre des actions. Ils sont les véritables acteurs
                    de l'action syndicale.
                  </p>
                </div>
                <div className={styles.principeCard}>
                  <h3 className={styles.principeTitle}>Le syndicat lieu de formation</h3>
                  <p className={styles.principeDesc}>
                    Le syndicat est un lieu d'apprentissage collectif où se forment les militants et où se transmettent
                    les valeurs et les pratiques démocratiques. C'est une véritable école de la démocratie.
                  </p>
                </div>
                <div className={styles.principeCard}>
                  <h3 className={styles.principeTitle}>La démocratie au service de l'efficacité</h3>
                  <p className={styles.principeDesc}>
                    La démarche démocratique n'est pas seulement une question de principes, c'est aussi une question
                    d'efficacité. Des revendications construites démocratiquement sont plus mobilisatrices et ont
                    plus de chances d'aboutir.
                  </p>
                </div>
                <div className={styles.principeCard}>
                  <h3 className={styles.principeTitle}>L'unité dans la diversité</h3>
                  <p className={styles.principeDesc}>
                    La démarche démocratique permet de construire l'unité tout en respectant la diversité des points
                    de vue. Elle vise à rassembler les salariés au-delà de leurs différences pour construire des
                    revendications communes.
                  </p>
                </div>
              </div>
              <div className={styles.valeursSection}>
                <h3 className={styles.valeursSectionTitle}>Les valeurs au cœur de la démarche</h3>
                <div className={styles.valeursGrid}>
                  <div className={styles.valeurItem}>
                    <div className={styles.valeurTitle}>Solidarité</div>
                    <div className={styles.valeurDesc}>Entre tous les salariés, quelles que soient leurs différences</div>
                  </div>
                  <div className={styles.valeurItem}>
                    <div className={styles.valeurTitle}>Fraternité</div>
                    <div className={styles.valeurDesc}>Relations de camaraderie et d'entraide entre militants</div>
                  </div>
                  <div className={styles.valeurItem}>
                    <div className={styles.valeurTitle}>Justice sociale</div>
                    <div className={styles.valeurDesc}>Lutte contre les inégalités et pour les droits de tous</div>
                  </div>
                  <div className={styles.valeurItem}>
                    <div className={styles.valeurTitle}>Émancipation</div>
                    <div className={styles.valeurDesc}>Libération collective des travailleurs par leur action propre</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.actionsSection}>
        <h2 className={styles.actionsSectionTitle}>Pour aller plus loin</h2>
        <div className={styles.actionsGrid}>
          <div className={styles.actionCard}>
            <h3 className={styles.actionTitle}>Guide de la démarche démocratique</h3>
            <p className={styles.actionDesc}>
              Un guide complet pour mettre en œuvre la démarche démocratique dans votre syndicat
            </p>
            <button className={styles.actionButton}>Télécharger le guide</button>
          </div>
          <div className={styles.actionCard}>
            <h3 className={styles.actionTitle}>Formation "Démocratie syndicale"</h3>
            <p className={styles.actionDesc}>
              Des modules de formation pour les militants sur les pratiques démocratiques
            </p>
            <button className={styles.actionButton}>Accéder aux formations</button>
          </div>
          <div className={styles.actionCard}>
            <h3 className={styles.actionTitle}>Outils pratiques</h3>
            <p className={styles.actionDesc}>
              Des outils concrets pour mener à bien chaque étape de la démarche
            </p>
            <button className={styles.actionButton}>Consulter les outils</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EcoleDemocratiePage;