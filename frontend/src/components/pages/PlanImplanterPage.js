import React from 'react';
import styles from './PlanImplanter.module.css';

function PlanImplanterPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Implanter et Conquérir le Vote CGT</h1>
      <p className={styles.introText}>
        L’élection est une bataille revendicative, une lutte à part entière ! Implanter et conquérir le vote CGT pour gagner partout.
      </p>

      {/* Section 1 : Travail cible par cible */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Travail Cible par Cible</h2>
        <p className={styles.sectionText}>
          Bâti sur un principe d’efficacité électorale, le travail « cousu main » s’engage cible par cible, s’appuyant sur la coopération de toute la CGT.
        </p>
      </section>

      {/* Section 2 : Analyse de la cible */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Analyse de la Cible</h2>
        <ul className={styles.list}>
          <li>Analyse du précédent scrutin global et par collège (inscrits, participation, résultats…)</li>
          <li>Étude du KBIS pour les établissements secondaires</li>
          <li>Identification des enjeux spécifiques (ex. ICT, environnement de service)</li>
        </ul>
      </section>

      {/* Section 3 : Mobilisation et Plan d’Action */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Mobilisation et Plan d’Action</h2>
        <p className={styles.sectionText}>
          Déploiement d’un plan d’action pour mobiliser les syndicats et les syndiqués :
        </p>
        <ul className={styles.list}>
          <li>Planifier et organiser la rencontre avec UL, UD, FD, UGICT</li>
          <li>Lancer la communication auprès des syndicats du périmètre (bulletin, site, note…)</li>
          <li>Mettre en œuvre des actions de parrainage pour renforcer l’implantation locale</li>
        </ul>
      </section>

      {/* Section 4 : Confédéraliser & Valoriser */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Confédéraliser & Valoriser</h2>
        <p className={styles.sectionText}>
          Consolider le résultat obtenu en pérennisant et valorisant le vote CGT, avec un partage des bilans et perspectives à l’échelle confédérale.
        </p>
      </section>
    </div>
  );
}

export default PlanImplanterPage;
