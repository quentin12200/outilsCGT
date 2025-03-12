// src/components/DemarcheModule/PhaseRevendications.js
import React from 'react';
import styles from './PhaseRevendications.module.css';

function PhaseRevendications({ onAddTool }) {
  // Outils associés à cette phase
  const tools = [
    'Modèle de cahier revendicatif',
    'Guide d\'animation d\'AG',
    'Matrices de priorisation',
    'Fiche de synthèse des besoins'
  ];

  return (
    <div>
      <h2 className={styles.phaseTitle}>Phase 2 : Construction revendicative</h2>
      
      <div className={styles.phaseIntro}>
        <h3 className={styles.subTitle}>Objectifs de cette phase</h3>
        <ul className={styles.objectivesList}>
          <li>Transformer les besoins recueillis en revendications précises et mobilisatrices</li>
          <li>Impliquer les syndiqués dans l'élaboration démocratique du cahier revendicatif</li>
          <li>Construire des argumentaires solides pour convaincre les salariés</li>
          <li>Prioriser les revendications pour une action syndicale efficace</li>
        </ul>
      </div>
      
      <div className={styles.grid}>
        <div>
          <h3 className={styles.subTitle}>Démarche méthodologique</h3>
          
          <div className={styles.methodSteps}>
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>1. Préparation de l'AG des syndiqués</h4>
              <ul className={styles.stepList}>
                <li>Compiler et synthétiser les besoins recueillis par thématiques</li>
                <li>Préparer les documents de travail pour l'AG</li>
                <li>Inviter tous les syndiqués en précisant l'objectif</li>
                <li>Prévoir une animation dynamique favorisant l'expression de tous</li>
              </ul>
            </div>
            
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>2. Animation de l'AG constructive</h4>
              <ul className={styles.stepList}>
                <li>Présenter la synthèse des besoins recueillis</li>
                <li>Organiser des ateliers par thématiques</li>
                <li>Débattre collectivement des priorités</li>
                <li>Formuler précisément les revendications</li>
              </ul>
            </div>
            
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>3. Élaboration du cahier revendicatif</h4>
              <ul className={styles.stepList}>
                <li>Structurer les revendications par thèmes</li>
                <li>Rédiger clairement chaque revendication</li>
                <li>Préparer un argumentaire pour chaque point</li>
                <li>Valider collectivement le document final</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className={styles.subTitle}>Conseils pratiques</h3>
          
          <div className={styles.tipsCard}>
            <h4 className={styles.tipsTitle}>Points d'attention</h4>
            <ul className={styles.tipsList}>
              <li><strong>Formulation précise</strong> - Des revendications claires et mesurables</li>
              <li><strong>Hiérarchisation</strong> - Ne pas hésiter à prioriser les revendications</li>
              <li><strong>Réalisme et ambition</strong> - Équilibre entre revendications immédiates et perspectives</li>
              <li><strong>Cohérence</strong> - Lien entre les revendications locales et les repères CGT</li>
            </ul>
          </div>
          
          <div className={styles.toolsBox}>
            <h4 className={styles.toolsTitle}>Outils recommandés</h4>
            <div className={styles.toolsList}>
              {tools.map(tool => (
                <div key={tool} className={styles.toolItem}>
                  <span>{tool}</span>
                  <button
                    onClick={() => onAddTool(tool)}
                    className={styles.addButton}
                  >
                    + Ajouter à ma boîte
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.successBox}>
            <h4 className={styles.successTitle}>Indicateurs de réussite</h4>
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
        <h3 className={styles.subTitle}>Structure type d'un cahier revendicatif</h3>
        
        <div className={styles.exampleGrid}>
          <div className={styles.exampleCard}>
            <h4 className={styles.exampleTitle}>Introduction</h4>
            <ul className={styles.exampleList}>
              <li>Contexte de l'entreprise/établissement</li>
              <li>Démarche syndicale et méthodologie</li>
              <li>Présentation générale des enjeux</li>
              <li>Objectifs du cahier revendicatif</li>
            </ul>
          </div>
          
          <div className={styles.exampleCard}>
            <h4 className={styles.exampleTitle}>Thématiques principales</h4>
            <ul className={styles.exampleList}>
              <li>Salaires et rémunérations</li>
              <li>Conditions de travail</li>
              <li>Emploi et formation</li>
              <li>Organisation du travail</li>
              <li>Égalité professionnelle</li>
              <li>Protection sociale</li>
            </ul>
          </div>
          
          <div className={styles.exampleCard}>
            <h4 className={styles.exampleTitle}>Structure par revendication</h4>
            <ul className={styles.exampleList}>
              <li>Constat et diagnostic</li>
              <li>Proposition précise</li>
              <li>Argumentaire (économique, social, juridique...)</li>
              <li>Bénéfices attendus pour les salariés</li>
            </ul>
          </div>
          
          <div className={styles.exampleCard}>
            <h4 className={styles.exampleTitle}>Conclusion et perspectives</h4>
            <ul className={styles.exampleList}>
              <li>Synthèse des revendications prioritaires</li>
              <li>Calendrier de mobilisation</li>
              <li>Propositions d'actions</li>
              <li>Invitation à se mobiliser collectivement</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.downloadSection}>
        <h3 className={styles.downloadTitle}>Télécharger des modèles et exemples</h3>
        <div className={styles.downloadButtons}>
          <button 
            className={styles.downloadButton}
            onClick={() => onAddTool('Modèle de cahier revendicatif')}
          >
            Modèle de cahier revendicatif
          </button>
          <button 
            className={styles.downloadButton}
            onClick={() => onAddTool('Guide d\'animation d\'AG')}
          >
            Guide d'animation d'AG constructive
          </button>
          <button 
            className={styles.downloadButton}
            onClick={() => onAddTool('Matrices de priorisation')}
          >
            Matrices de priorisation des revendications
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhaseRevendications;