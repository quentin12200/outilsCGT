import React from 'react';
import styles from './PlanAvant.module.css';

function PlanAvantPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>AVANT : L'ORGA PRÉALABLE À L'ACTION POUR GAGNER</h1>

      {/* 1) Réunion de la direction du syndicat */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Réunion de la direction du syndicat</h2>
        <p className={styles.sectionText}>
          Placer la direction de l'organisation en ordre de bataille, appréhender les « éléments 
          d’organisation » et bâtir une équipe de campagne. Après une <strong>formation</strong> 
          (accompagnée par l’UD/FD), il s’agit d’engager le collectif de direction le plus large 
          dans l’action :
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Présentation des enjeux :</strong> salariat, syndiqués, bilan du précédent 
            scrutin, points forts et faibles.
          </li>
          <li>
            <strong>Processus électoral :</strong> articulation avec la démarche syndicale 
            (besoins, revendications, mobilisation), et <em>rétroplanning</em>.
          </li>
          <li>
            <strong>Place et rôle du syndiqué :</strong> construire et déployer la démarche, 
            démocratie et enjeux des AG, communication, direction syndicale.
          </li>
          <li>
            <strong>Apport des organisations (UD/FD) :</strong> renforcer le contenu local, 
            professionnel et spécifique, amorcer l’accompagnement.
          </li>
        </ul>
      </section>

      {/* 2) Points du tableau de bord (critères, cartographie, etc.) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Points du tableau de bord</h2>
        <p className={styles.sectionText}>
          Plusieurs éléments sont à vérifier ou à mettre à jour pour respecter les critères de
          représentativité et disposer d’une vision précise de l’entreprise et du syndicat :
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Critères de représentativité :</strong> statuts à jour, publication des comptes, 
            paiement des cotisations, etc.
          </li>
          <li>
            <strong>Cartographie du salariat :</strong> connaissance fine du nombre de salariés, 
            répartition par service, catégorie (H/F, âge, statut), environnement (sous-traitants…).
          </li>
          <li>
            <strong>Analyse du dernier scrutin :</strong> taux de syndicalisation par service, 
            bilan qualitatif et quantitatif de l’activité CGT sur le mandat (IRP, commissions, 
            luttes, accords…).
          </li>
          <li>
            <strong>État des lieux / bilan :</strong> actualité, enjeux, prospective pour 
            nourrir la bataille d’idées, consolider l’argumentaire et mobiliser.
          </li>
        </ul>
      </section>

      {/* 3) Méthodologie / Rétroplanning */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Méthodologie et Rétroplanning</h2>
        <p className={styles.sectionText}>
          Cette méthodologie constitue le <em>rétroplanning</em> de la démarche de campagne 
          dans l’ensemble de ses dimensions : 
        </p>
        <ul className={styles.list}>
          <li>Présentation de la démarche <strong>étape par étape</strong> (Avant, Pendant, Après).</li>
          <li>Place et rôle du syndiqué, de la communication, des élus, de la direction syndicale.</li>
          <li>
            Articulation avec le <strong>processus électoral</strong> et les repères 
            revendicatifs de la CGT (local, professionnel, spécifique, confédéral).
          </li>
        </ul>
      </section>

      {/* 4) Pourquoi ? Qui ? Comment ? */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Pourquoi ? Qui ? Comment ?</h2>
        <div className={styles.subSection}>
          <h3 className={styles.subSectionTitle}>Pourquoi : Gagner !</h3>
          <p className={styles.sectionText}>
            L’objectif est de mobiliser le plus grand nombre de salariés au vote CGT pour 
            renforcer l’audience, le rapport de force et, in fine, gagner sur nos revendications.
          </p>
        </div>
        <div className={styles.subSection}>
          <h3 className={styles.subSectionTitle}>Qui : Le syndicat</h3>
          <p className={styles.sectionText}>
            Respect des critères de représentativité (statuts, comptes, cotisations). Les 
            syndiqués sont auteurs, acteurs et décideurs de la démarche.
          </p>
        </div>
        <div className={styles.subSection}>
          <h3 className={styles.subSectionTitle}>Comment : En mobilisant les salariés</h3>
          <p className={styles.sectionText}>
            Par la cartographie (serv./cat./H/F/âge…), l’analyse du dernier scrutin, l’état 
            organisationnel, le bilan du mandat, et la construction du <strong>cahier 
            revendicatif</strong>. On s’appuie sur des <em>pratiques d’organisation</em> 
            (tournées, plan de communication, droit syndical) pour compenser nos faiblesses 
            et toucher tous les secteurs.
          </p>
        </div>
      </section>

      {/* 5) Moyens et soutiens (communication, finances, juridique, UL/UD/FD/UGICT) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Moyens et soutiens</h2>
        <ul className={styles.list}>
          <li>
            <strong>Militant / Droits syndicaux :</strong> moyens militants pour déployer nos forces 
            (tournées, réunions, etc.).
          </li>
          <li>
            <strong>Communication :</strong> supports et pratiques (bilan, questionnaires, 
            profession de foi, trombinoscope, affichage, diffusion de masse).
          </li>
          <li>
            <strong>Financiers :</strong> budget de campagne, prise en charge possible dans la 
            négociation, etc.
          </li>
          <li>
            <strong>Juridique :</strong> connaissances indispensables pour articuler la démarche 
            avec le processus électoral (guides NVO, RPDS, etc.).
          </li>
          <li>
            <strong>UL / UD / FD / UGICT :</strong> coopérations pour renforcer l’action, 
            le contenu revendicatif, l’histoire et les luttes locales, professionnelles ou 
            spécifiques.
          </li>
          <li>
            <strong>Direction syndicale :</strong> animer, organiser et piloter la campagne 
            dans toutes ses dimensions.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default PlanAvantPage;
