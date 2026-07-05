// src/components/DemarcheModule/PhaseMobilisation.js
import React from 'react';
import styles from './PhaseMobilisation.module.css';

function PhaseMobilisation({ onAddTool }) {
  // Outils associés à cette phase
  const tools = [
    'Plan de communication',
    'Fiches argumentaires',
    'Modèles de tracts',
    'Guide d\'animation d\'AG des salariés'
  ];

  return (
    <div>
      <h2 className={styles.phaseTitle}>Phase 3 : Mobilisation</h2>
      
      <div className={styles.phaseIntro}>
        <h3 className={styles.subTitle}>Objectifs de cette phase</h3>
        <ul className={styles.objectivesList}>
          <li>Convaincre les salariés de se mobiliser autour des revendications</li>
          <li>Mener la bataille des idées pour développer un large soutien</li>
          <li>Construire un rapport de force favorable pour gagner</li>
          <li>Préparer l'action collective qui permettra d'aboutir aux revendications</li>
        </ul>
      </div>
      
      <div className={styles.grid}>
        <div>
          <h3 className={styles.subTitle}>Démarche méthodologique</h3>
          
          <div className={styles.methodSteps}>
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>1. Préparation de la campagne</h4>
              <ul className={styles.stepList}>
                <li>Élaborer un plan de communication cohérent</li>
                <li>Créer des supports adaptés (tracts, affiches, numériques...)</li>
                <li>Préparer des argumentaires précis pour chaque revendication</li>
                <li>Former les syndiqués au dialogue et au débat</li>
              </ul>
            </div>
            
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>2. Déploiement sur le terrain</h4>
              <ul className={styles.stepList}>
                <li>Organiser des tournées de services régulières</li>
                <li>Tenir des permanences syndicales</li>
                <li>Distribuer des tracts et afficher sur les panneaux</li>
                <li>Organiser des réunions d'information ciblées</li>
              </ul>
            </div>
            
            <div className={styles.methodStep}>
              <h4 className={styles.stepTitle}>3. Assemblée Générale des salariés</h4>
              <ul className={styles.stepList}>
                <li>Présenter le cahier revendicatif aux salariés</li>
                <li>Susciter le débat et apporter des réponses aux questions</li>
                <li>Proposer des formes d'action adaptées</li>
                <li>Recueillir l'engagement des salariés</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className={styles.subTitle}>Conseils pratiques</h3>
          
          <div className={styles.tipsCard}>
            <h4 className={styles.tipsTitle}>Principes d'efficacité</h4>
            <ul className={styles.tipsList}>
              <li><strong>Régularité</strong> - Une présence constante auprès des salariés</li>
              <li><strong>Proximité</strong> - Aller au-devant des salariés sur leur lieu de travail</li>
              <li><strong>Écoute</strong> - Être attentif aux réactions et objections</li>
              <li><strong>Pédagogie</strong> - Expliquer clairement les enjeux et les propositions</li>
              <li><strong>Unité</strong> - Rechercher l'unité syndicale quand c'est possible</li>
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
                    Ouvrir →
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.successBox}>
            <h4 className={styles.successTitle}>Indicateurs de réussite</h4>
            <ul className={styles.successList}>
              <li>Participation importante aux AG et réunions</li>
              <li>Retours positifs des salariés lors des tournées</li>
              <li>Niveau d'engagement exprimé par les salariés</li>
              <li>Nouvelles adhésions syndicales</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.communicationSection}>
        <h3 className={styles.subTitle}>Plan de communication efficace</h3>
        
        <div className={styles.communicationGrid}>
          <div className={styles.comCard}>
            <div className={styles.comIcon}>📝</div>
            <h4 className={styles.comTitle}>Tracts et affiches</h4>
            <ul className={styles.comList}>
              <li>Messages courts et percutants</li>
              <li>Revendications concrètes</li>
              <li>Visuels attractifs</li>
              <li>Informations pratiques</li>
            </ul>
          </div>
          
          <div className={styles.comCard}>
            <div className={styles.comIcon}>💬</div>
            <h4 className={styles.comTitle}>Discussions en face-à-face</h4>
            <ul className={styles.comList}>
              <li>Écoute active</li>
              <li>Arguments adaptés</li>
              <li>Réponses aux objections</li>
              <li>Dialogue constructif</li>
            </ul>
          </div>
          
          <div className={styles.comCard}>
            <div className={styles.comIcon}>👥</div>
            <h4 className={styles.comTitle}>Réunions et AG</h4>
            <ul className={styles.comList}>
              <li>Animation dynamique</li>
              <li>Expression de tous</li>
              <li>Propositions claires</li>
              <li>Décisions collectives</li>
            </ul>
          </div>
          
          <div className={styles.comCard}>
            <div className={styles.comIcon}>📱</div>
            <h4 className={styles.comTitle}>Communication numérique</h4>
            <ul className={styles.comList}>
              <li>Mails et newsletters</li>
              <li>Réseaux sociaux</li>
              <li>Site web syndical</li>
              <li>Messages ciblés</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.tacticsSection}>
        <h3 className={styles.tacticsTitle}>Techniques de mobilisation</h3>
        
        <div className={styles.tacticsGrid}>
          <div className={styles.tacticCard}>
            <h4 className={styles.tacticTitle}>La méthode du pointage nominatif</h4>
            <p className={styles.tacticDesc}>
              Technique permettant d'identifier systématiquement les salariés selon leur niveau 
              d'adhésion aux revendications et leur disposition à agir. Elle permet de cibler 
              les efforts de conviction et de mesurer la progression de la mobilisation.
            </p>
            <div className={styles.tacticTip}>
              Créez un tableau avec tous les salariés et évaluez leur positionnement : 
              favorable, neutre, opposé, et leur degré d'engagement potentiel.
            </div>
          </div>
          
          <div className={styles.tacticCard}>
            <h4 className={styles.tacticTitle}>La construction par paliers</h4>
            <p className={styles.tacticDesc}>
              Approche progressive qui permet d'engager les salariés dans des actions de 
              plus en plus engageantes, en commençant par des formes simples de mobilisation
              pour aller vers des actions plus déterminées.
            </p>
            <div className={styles.tacticTip}>
              Commencez par des pétitions ou port de badges, puis proposez des actions 
              plus engageantes comme des débrayages ou grèves.
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.downloadSection}>
        <h3 className={styles.downloadTitle}>Télécharger les outils de mobilisation</h3>
        <div className={styles.downloadButtons}>
          <button 
            className={styles.downloadButton}
            onClick={() => onAddTool('Plan de communication')}
          >
            Modèle de plan de communication
          </button>
          <button 
            className={styles.downloadButton}
            onClick={() => onAddTool('Fiches argumentaires')}
          >
            Fiches argumentaires
          </button>
          <button 
            className={styles.downloadButton}
            onClick={() => onAddTool('Guide d\'animation d\'AG des salariés')}
          >
            Guide d'animation d'AG des salariés
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhaseMobilisation;