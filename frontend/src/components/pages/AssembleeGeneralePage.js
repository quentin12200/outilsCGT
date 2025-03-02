// AssembleeGeneralePage.js
import React, { useState } from 'react';
import styles from './AssembleeGeneralePage.module.css';

const AssembleeGeneralePage = () => {
  const [activeTab, setActiveTab] = useState('avant');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.titleSection}>
        <h1 className={styles.pageTitle}>Assemblée Générale des Syndiqués</h1>
        <p className={styles.pageDescription}>
          L'Assemblée Générale des syndiqués est un moment fondamental de la démocratie syndicale CGT. 
          Elle permet aux syndiqués d'être les auteurs, acteurs et décideurs de la vie du syndicat, 
          conformément à nos principes de démocratie ouvrière et à notre démarche revendicative.
        </p>
      </div>

      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'avant' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('avant')}
        >
          AVANT
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'pendant' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('pendant')}
        >
          PENDANT
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'apres' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('apres')}
        >
          APRÈS
        </button>
      </div>

      <div className={styles.contentContainer}>
        {activeTab === 'avant' && (
          <div className={styles.phaseContainer}>
            <h2 className={styles.phaseTitle}>Phase AVANT - Préparation de l'Assemblée Générale</h2>
            
            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>1. Analyse de la situation</h3>
              <ul className={styles.etapeList}>
                <li>Analyse fine du salariat, force organisée, résultats électoraux</li>
                <li>Bilan des pratiques démocratiques</li>
                <li>Bilan de l'activité des élus et représentants</li>
                <li>Bilan des formations et de l'émergence de syndiqués dans la période</li>
                <li>Bilan financier et des droits syndicaux</li>
                <li>Analyse du contexte économique et social de l'entreprise</li>
              </ul>
            </div>

            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>2. Organisation matérielle et logistique</h3>
              <ul className={styles.etapeList}>
                <li>Choix d'une date et d'un horaire facilitant la participation</li>
                <li>Réservation d'une salle adaptée</li>
                <li>Préparation des documents et supports</li>
                <li>Organisation de l'accueil (café, collation, supports d'information)</li>
                <li>Répartition des rôles (animation, prise de notes, etc.)</li>
              </ul>
            </div>

            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>3. Communication et mobilisation</h3>
              <ul className={styles.etapeList}>
                <li>Envoi des convocations individuelles aux syndiqués</li>
                <li>Relances personnalisées pour assurer une forte participation</li>
                <li>Communication sur les enjeux de l'AG</li>
                <li>Diffusion de l'ordre du jour et des documents préparatoires</li>
                <li>Préparation des visuels et outils de présentation</li>
              </ul>
            </div>

            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>4. Préparation du contenu</h3>
              <ul className={styles.etapeList}>
                <li>Élaboration de l'ordre du jour</li>
                <li>Préparation des rapports (activité, financier, etc.)</li>
                <li>Identification des enjeux revendicatifs prioritaires</li>
                <li>Conception des questionnaires de recueil des besoins</li>
                <li>Préparation des interventions et animations</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'pendant' && (
          <div className={styles.phaseContainer}>
            <h2 className={styles.phaseTitle}>Phase PENDANT - Déroulement de l'Assemblée Générale</h2>
            
            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>1. Accueil et introduction</h3>
              <ul className={styles.etapeList}>
                <li>Émargement et accueil des participants</li>
                <li>Introduction et présentation des enjeux</li>
                <li>Désignation du président de séance et du secrétaire</li>
                <li>Adoption de l'ordre du jour</li>
                <li>Rappel de la démarche démocratique CGT</li>
              </ul>
            </div>

            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>2. Bilan et état des lieux</h3>
              <ul className={styles.etapeList}>
                <li>Présentation du rapport d'activité</li>
                <li>Présentation du rapport financier</li>
                <li>Analyse du contexte social et économique</li>
                <li>Échanges et débat avec les syndiqués</li>
                <li>Vote sur les rapports</li>
              </ul>
            </div>

            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>3. Construction du cahier revendicatif</h3>
              <ul className={styles.etapeList}>
                <li>Présentation des besoins recueillis auprès des salariés</li>
                <li>Débat collectif sur les revendications à porter</li>
                <li>Hiérarchisation des priorités revendicatives</li>
                <li>Élaboration de la plateforme revendicative</li>
                <li>Adoption démocratique du cahier revendicatif</li>
              </ul>
            </div>

            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>4. Organisation de l'action syndicale</h3>
              <ul className={styles.etapeList}>
                <li>Définition des moyens d'action pour porter les revendications</li>
                <li>Construction du plan de mobilisation</li>
                <li>Organisation du "pontage" des salariés</li>
                <li>Constitution des collectifs militants</li>
                <li>Répartition des tâches et des responsabilités</li>
                <li>Vote des orientations et du plan d'action</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'apres' && (
          <div className={styles.phaseContainer}>
            <h2 className={styles.phaseTitle}>Phase APRÈS - Suivi et valorisation</h2>
            
            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>1. Communication sur les décisions</h3>
              <ul className={styles.etapeList}>
                <li>Rédaction et diffusion du compte-rendu aux syndiqués</li>
                <li>Communication auprès des salariés sur les décisions prises</li>
                <li>Valorisation des positions et revendications adoptées</li>
                <li>Information aux structures syndicales (UL, UD, Fédération)</li>
                <li>Communication externe si nécessaire (médias, réseaux sociaux)</li>
              </ul>
            </div>

            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>2. Mise en œuvre du plan d'action</h3>
              <ul className={styles.etapeList}>
                <li>Lancement des actions décidées selon le calendrier</li>
                <li>Mobilisation effective des syndiqués</li>
                <li>Déploiement des supports de communication</li>
                <li>Coordination des initiatives militantes</li>
                <li>Suivi et adaptation des actions en fonction du contexte</li>
              </ul>
            </div>

            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>3. Évaluation et ajustements</h3>
              <ul className={styles.etapeList}>
                <li>Points réguliers sur l'avancement des actions</li>
                <li>Mesure de l'efficacité des initiatives</li>
                <li>Recueil des retours des syndiqués et des salariés</li>
                <li>Ajustements tactiques si nécessaire</li>
                <li>Communication sur les résultats obtenus</li>
              </ul>
            </div>

            <div className={styles.etapeCard}>
              <h3 className={styles.etapeTitle}>4. Renforcement de l'organisation</h3>
              <ul className={styles.etapeList}>
                <li>Accueil et intégration des nouveaux adhérents</li>
                <li>Formation des syndiqués</li>
                <li>Élargissement de la participation militante</li>
                <li>Préparation des futures échéances</li>
                <li>Archivage et capitalisation des expériences</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className={styles.resourcesSection}>
        <h2 className={styles.resourcesTitle}>Outils et ressources</h2>
        
        <div className={styles.resourcesGrid}>
          <div className={styles.resourcesColumn}>
            <h3 className={styles.resourcesSubtitle}>Modèles de documents</h3>
            <ul className={styles.resourcesList}>
              <li>Convocation à l'AG</li>
              <li>Questionnaire de recueil des besoins</li>
              <li>Trame de compte-rendu</li>
              <li>Feuille d'émargement</li>
            </ul>
          </div>
          
          <div className={styles.resourcesColumn}>
            <h3 className={styles.resourcesSubtitle}>Supports de formation</h3>
            <ul className={styles.resourcesList}>
              <li>Animation d'une AG</li>
              <li>Prise de parole en public</li>
              <li>Rédaction d'un cahier revendicatif</li>
            </ul>
          </div>
          
          <div className={styles.resourcesColumn}>
            <h3 className={styles.resourcesSubtitle}>Fiches pratiques</h3>
            <ul className={styles.resourcesList}>
              <li>Organisation logistique</li>
              <li>Techniques d'animation</li>
              <li>Mobilisation des syndiqués</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssembleeGeneralePage;