import React from 'react';
import styles from './DemarchePage.module.css'; // Votre fichier CSS module
import schemaDemarche from '../../assets/schema-demarche-syndicale.svg';
/**
 * Composant interne pour afficher le schéma inline (optionnel).
 * Vous pouvez aussi l'importer depuis un autre fichier si vous préférez.
 */
export function SchemaDemarcheSyndicaleInline() {
  return (
    <div className={styles.inlineSchemaContainer}>
      <h2>Schéma de la démarche syndicale (inline)</h2>
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 1000 600"
        aria-label="Schéma de la démarche syndicale"
      >
        {/* Contenu SVG : vous pouvez ajuster les couleurs, positions, etc. */}
        <rect width="1000" height="600" fill="#f8f8f8" />
        <text
          x="500"
          y="40"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
          fill="#b91c1c"
        >
          SCHÉMA GLOBAL DE LA DÉMARCHE SYNDICALE CGT
        </text>
        {/* ... reste du code SVG ... */}
      </svg>
    </div>
  );
}

/**
 * Page principale "École de la démocratie".
 * Affiche la structure Avant/Pendant/Après + la colonne "Vie syndicale"
 * + quelques blocs transversaux, puis éventuellement le schéma inline.
 */
function EcoleDemocratiePage() {
  return (
    <div className={styles.ecoleDemocratieContainer}>
      {/* En-tête de la page */}
      <header className={styles.header}>
        <h1 className={styles.title}>École de la démocratie</h1>
        <p className={styles.subtitle}>
          Un aperçu global pour structurer la démarche syndicale : Avant, Pendant, Après
        </p>

      </header>

      {/* Bloc principal */}
      <div className={styles.mainContent}>
        {/* Timeline / Structure "Avant / Pendant / Après" */}
        <div className={styles.phasesContainer}>
          {/* En-tête indiquant les trois phases */}
          <div className={styles.phasesHeader}>
            <span>Avant...</span>
            <span>Pendant...</span>
            <span>Après...</span>
          </div>

          {/* Colonne Vie Syndicale */}
          <div className={styles.vieSyndicaleColumn}>
            <div className={styles.rotatedTitle}>VIE SYNDICALE</div>
          </div>

          {/* Contenu principal des phases */}
          <div className={styles.phasesContent}>
            {/* Organisation */}
            <div className={styles.orgaBox}>
              <h3 className={styles.orgaTitle}>ORGANISATION</h3>
              <ul className={styles.bulletList}>
                <li>Critères représentativité</li>
                <li>Connaissance fine du salariat</li>
                <li>Bilan Pratiques démocratiques</li>
                <li>Bilan informations formation</li>
                <li>Bilan activité IRP élus</li>
                <li>Bilan Droits planning militant</li>
                <li>Bilan financiers</li>
                <li>Analyse dernier scrutin</li>
                <li>Analyse dernière campagne</li>
                <li>Bilan communication</li>
                <li>Liens UL, UD, FD</li>
              </ul>
            </div>

            {/* Les trois étapes : BESOINS, REVENDICATIONS, MOBILISATION */}
            <div className={styles.stepsRow}>
              <div className={styles.etapeBox}>
                <h4 className={styles.etapeTitle}>1ère étape BESOINS</h4>
                <p>AG syndiqués : auteurs, acteurs, décideurs</p>
              </div>
              <div className={styles.etapeBox}>
                <h4 className={styles.etapeTitle}>2ème étape REVENDICATIONS</h4>
                <p>Élaboration démocratique du cahier revendicatif en AG</p>
              </div>
              <div className={styles.etapeBox}>
                <h4 className={styles.etapeTitle}>3ème étape MOBILISATION</h4>
                <p>Convaincre, construire le rapport de force</p>
              </div>
            </div>

            {/* Blocs transversaux : Communication, IRP, Droits, etc. */}
            <div className={styles.transversalBlocks}>
              <div className={styles.transversalItem}>
                <h4>COMMUNICATION</h4>
                <p>
                  Actions et outils pour soutenir et faire vivre la bataille des idées 
                  pour convaincre
                </p>
              </div>
              <div className={styles.transversalItem}>
                <h4>IRP PREROGATIVES</h4>
                <p>
                  Pour renforcer notre argumentation et la bataille des idées 
                  dans nos AG, nos tracts
                </p>
              </div>
              <div className={styles.transversalItem}>
                <h4>DROITS ET MOYENS</h4>
                <p>Pour faire vivre la démarche</p>
              </div>
              <div className={styles.transversalItem}>
                <h4>UL UD FD UGICT</h4>
                <p>
                  Pour soutenir l'action et renforcer les contenus revendicatifs 
                  sur les enjeux Locaux Interpro Pro Spécifiques
                </p>
              </div>
            </div>
          </div>

          {/* Jour J (Lutte) */}
          <div className={styles.jourJBox}>
            <div className={styles.jourJTitle}>JOUR J</div>
            <div>DE LUTTE</div>
          </div>
        </div>
      </div>

      {/* Exemple : insertion du schéma inline si vous le souhaitez */}
      <SchemaDemarcheSyndicaleInline />
    </div>
  );
}

export default EcoleDemocratiePage;
