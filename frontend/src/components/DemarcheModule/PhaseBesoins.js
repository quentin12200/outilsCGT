// src/components/DemarcheModule/PhaseBesoins.js
import React from 'react';
import styles from './PhaseBesoins.module.css';
import { FaCheckCircle, FaBook, FaInfoCircle, FaTools, FaClipboardList, FaChartBar } from 'react-icons/fa';

function PhaseBesoins({ onAddTool }) {
  // Outils associés à cette phase
  const tools = [
    'Questionnaire besoins',
    'Planning de tournées',
    'Fiche de synthèse',
    'Module Cartographie'
  ];

  return (
    <div className={styles.phaseContainer}>
      <h2 className={styles.phaseTitle}>Phase 1 : Recueil des besoins</h2>
      
      <div className={styles.objectifsContainer}>
        <h3 className={styles.objectifsTitle}>
          <FaCheckCircle className={styles.iconObjectif} />
          Objectifs de cette phase
        </h3>
        <ul className={styles.objectifsList}>
          {[
            "Recueillir les préoccupations, les attentes et les besoins des salariés",
            "Établir un contact direct et régulier avec tous les salariés, syndiqués ou non",
            "Analyser et synthétiser les besoins exprimés pour préparer la phase suivante",
            "Renforcer l'image d'un syndicat à l'écoute et proche des salariés"
          ].map((item, index) => (
            <li key={index} className={styles.objectifsItem}>
              <span className={styles.objectifsNumber}>{index + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <h3 className={styles.sectionTitle}>
            <FaBook className={styles.iconSection} />
            Démarche méthodologique
          </h3>
          
          <div className={styles.methodSteps}>
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>
                <span className={styles.stepNumber}>1</span>
                Préparation
              </h4>
              <ul className={styles.stepList}>
                <li>Tenir une AG des syndiqués pour présenter la démarche</li>
                <li>Réaliser une cartographie de l'établissement (services, catégories...)</li>
                <li>Préparer les outils de recueil (questionnaires, grilles d'entretien...)</li>
                <li>Planifier les tournées de services</li>
              </ul>
            </div>
            
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>
                <span className={styles.stepNumber}>2</span>
                Déploiement sur le terrain
              </h4>
              <ul className={styles.stepList}>
                <li>Organiser des tournées de services régulières</li>
                <li>Réaliser des entretiens individuels ou collectifs</li>
                <li>Distribuer et collecter des questionnaires</li>
                <li>Tenir des permanences syndicales</li>
              </ul>
            </div>
            
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>
                <span className={styles.stepNumber}>3</span>
                Analyse et synthèse
              </h4>
              <ul className={styles.stepList}>
                <li>Compiler et classer les besoins par thématiques</li>
                <li>Identifier les problématiques communes et récurrentes</li>
                <li>Prioriser les sujets selon leur importance pour les salariés</li>
                <li>Préparer une synthèse pour la phase de construction revendicative</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.gridItem}>
          <h3 className={styles.sectionTitle}>
            <FaInfoCircle className={styles.iconSection} />
            Conseils pratiques
          </h3>
          
          <div className={styles.alertBox}>
            <h4 className={styles.alertTitle}>
              <FaInfoCircle className={styles.alertIcon} />
              Points d'attention
            </h4>
            <ul className={styles.alertList}>
              <li>Veiller à toucher <strong>tous les services</strong> et <strong>toutes les catégories</strong> de personnel</li>
              <li>Écouter <strong>sans a priori</strong>, même si certaines expressions peuvent paraître éloignées des positions CGT</li>
              <li>Prendre en compte les <strong>spécificités</strong> (jeunes, femmes, précaires, cadres...)</li>
              <li>Être <strong>régulier</strong> dans les visites et les contacts</li>
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
                    className={styles.toolButton}
                  >
                    + Ajouter
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>
              <FaChartBar className={styles.infoIcon} />
              Indicateurs de réussite
            </h4>
            <ul className={styles.infoList}>
              <li>Nombre de salariés consultés / Taux de couverture de l'établissement</li>
              <li>Richesse et diversité des besoins exprimés</li>
              <li>Qualité de la documentation et de la synthèse des besoins</li>
              <li>Impact sur l'image du syndicat (nouveaux contacts, adhésions...)</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.examplesSection}>
        <h3 className={styles.sectionTitle}>
          <FaClipboardList className={styles.iconSection} />
          Exemples de questionnaires
        </h3>
        
        <div className={styles.examplesGrid}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleHeader}>
              <h4 className={styles.exampleTitle}>Questionnaire général</h4>
            </div>
            <div className={styles.exampleContent}>
              <p className={styles.exampleSubtitle}>
                Conditions de travail
              </p>
              <ul className={styles.exampleList}>
                <li>Comment évaluez-vous votre charge de travail actuelle ?</li>
                <li>Disposez-vous des moyens nécessaires pour réaliser votre travail correctement ?</li>
                <li>Quels sont les principaux facteurs de stress dans votre activité ?</li>
                <li>Quelles améliorations prioritaires souhaiteriez-vous concernant vos conditions de travail ?</li>
              </ul>
              
              <p className={styles.exampleSubtitle}>
                Rémunération
              </p>
              <ul className={styles.exampleList}>
                <li>Votre rémunération vous semble-t-elle en adéquation avec votre travail ?</li>
                <li>Quelle évolution de carrière envisagez-vous ?</li>
                <li>Quelles mesures permettraient de mieux reconnaître votre travail ?</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.exampleCard}>
            <div className={styles.exampleHeader}>
              <h4 className={styles.exampleTitle}>Questionnaire spécifique</h4>
            </div>
            <div className={styles.exampleContent}>
              <p className={styles.exampleSubtitle}>
                Télétravail
              </p>
              <ul className={styles.exampleList}>
                <li>Combien de jours de télétravail effectuez-vous actuellement ?</li>
                <li>Quels sont les avantages et inconvénients du télétravail pour vous ?</li>
                <li>Quelles améliorations souhaiteriez-vous concernant l'organisation du télétravail ?</li>
                <li>Quelles mesures vous aideraient à mieux concilier vie professionnelle et vie personnelle ?</li>
              </ul>
              
              <p className={styles.exampleSubtitle}>
                Égalité professionnelle
              </p>
              <ul className={styles.exampleList}>
                <li>Avez-vous constaté des inégalités de traitement dans votre service ?</li>
                <li>Quelles mesures permettraient de mieux garantir l'égalité femmes/hommes ?</li>
                <li>Quelles actions pour favoriser l'évolution professionnelle de tous et toutes ?</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.downloadContainer}>
          <button 
            className={styles.downloadButton}
            onClick={() => onAddTool('Questionnaire besoins')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.downloadIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Télécharger les modèles de questionnaires
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhaseBesoins;