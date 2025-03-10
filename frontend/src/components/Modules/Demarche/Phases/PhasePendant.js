import React from 'react';
import styles from './PlanPendant.module.css';

/**
 * Exemple de composant React qui présente la phase "PENDANT"
 * en plusieurs sections. Chaque section correspond à une grande
 * partie du tableau visible dans votre capture d'écran.
 *
 * N'hésitez pas à adapter la structure, le style et le contenu
 * selon vos besoins.
 */

function PlanPendantPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>PENDANT : "Une école de la Démocratie"</h1>

      {/* 1) DEMARCHE CAHIER REVENDICATIF */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Démarche Cahier Revendicatif</h2>
        <p className={styles.sectionText}>
          Démarche s'appuyant sur la bataille d’idées et sur la force organisée pour convaincre
          et mobiliser le plus grand nombre de salariés. On recense les besoins à partir d’un
          questionnaire et d’AG Syndiqués, puis on élabore le Cahier Revendicatif (service par service,
          catégorie par catégorie).
        </p>
        <ul className={styles.list}>
          <li>
            <strong>AG Syndiqués :</strong> Présentation des enjeux (contexte, rôle du CSE, bilan du mandat, etc.),
            explication de la démarche étape par étape, rôle et place de chaque syndiqué.
          </li>
          <li>
            <strong>Questionnaire Besoins :</strong> Outil pour recueillir les besoins concrets des salariés.
          </li>
          <li>
            <strong>Tournées de services :</strong> Soutenir les syndiqués sur le terrain, repérer les secteurs
            stratégiques, renforcer la confiance et développer la démarche dans les services clés.
          </li>
          <li>
            <strong>Ébauche de Cahier Revendicatif :</strong> Synthèse des besoins recueillis, point de départ pour
            la construction revendicative.
          </li>
          <li>
            <strong>Listes :</strong> Réflexion sur la constitution des listes électorales, en parallèle de
            l’émergence de nouveaux militants et de la cartographie des services.
          </li>
        </ul>
      </section>

      {/* 2) CAHIER REVENDICATIF (AG Syndiqués) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Élaboration du Cahier Revendicatif</h2>
        <p className={styles.sectionText}>
          Les syndiqués, réunis en AG, passent à l’étape de la formalisation du Cahier Revendicatif. 
          On construit un argumentaire pour mobiliser largement les salariés autour des revendications,
          tout en liant ces revendications à des repères plus globaux (revendications locales, fédérales,
          nationales, etc.).
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Déploiement du Cahier Revendicatif :</strong> Communication de terrain (tournées de
            services, affichage, réunions) pour convaincre et mobiliser.
          </li>
          <li>
            <strong>Planification des actions :</strong> Organisation d’AG, préparation du jour J (ou période P)
            pour le vote (physique, correspondance ou électronique).
          </li>
          <li>
            <strong>Listes de candidats :</strong> Mise en avant des futurs élus et de leur rôle, lien avec le bilan
            du mandat précédent.
          </li>
        </ul>
      </section>

      {/* 3) MOBILISATION (AG Salariés) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Mobilisation : AG Salariés</h2>
        <p className={styles.sectionText}>
          L’AG Salariés permet de démontrer la force de la CGT à l’approche du vote. Chaque syndiqué
          invite ses collègues, on présente le Cahier Revendicatif final, les candidats, et on fait
          le lien avec les revendications globales (fédérales, nationales, etc.).
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Tournées de services :</strong> Appuyer le travail de conviction, valoriser les syndiqués,
            couvrir les zones stratégiques.
          </li>
          <li>
            <strong>Matériel de communication :</strong> Tracts, affiches, trombinoscope des candidats, etc.
          </li>
          <li>
            <strong>Suivi du vote :</strong> Organisation pratique pour le vote par correspondance ou électronique,
            relances, pointages nominatifs.
          </li>
        </ul>
      </section>

      {/* 4) Jour J (ou Période P) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Le Jour J (ou Période P)</h2>
        <p className={styles.sectionText}>
          Le moment clé : vote physique, électronique ou par correspondance. Il s’agit de mobiliser
          jusqu’au bout, d’occuper le terrain et de ne perdre aucune voix.
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Présence militante :</strong> Tournées de service, permanences, relances téléphoniques et SMS
            pour s’assurer de la participation des syndiqués et sympathisants.
          </li>
          <li>
            <strong>Pointage du vote :</strong> Suivi des engagements de vote, vérification de l’émargement
            (électronique ou physique), ajustements de dernière minute.
          </li>
          <li>
            <strong>Pot de la victoire :</strong> Invitation des syndiqués et camarades pour célébrer la fin
            du scrutin et préparer la suite.
          </li>
        </ul>
      </section>

      {/* 5) Plan de Com */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Plan de Communication</h2>
        <p className={styles.sectionText}>
          Faire vivre la campagne dans l’entreprise pour favoriser la participation : diffusion
          de masse, affichage, tournées de service, etc. Communiquer aussi en interne pour rappeler
          l’enjeu de l’élection à l’ensemble des forces organisées CGT (UL, UD, FD, etc.).
        </p>
        <p className={styles.sectionText}>
          Dans la dernière ligne droite, on intensifie la mobilisation générale pour occuper le terrain
          et s’assurer du vote CGT.
        </p>
      </section>

      {/* 6) Confédéraliser, Valoriser */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Confédéraliser & Valoriser</h2>
        <p className={styles.sectionText}>
          Saisie des résultats dans la plateforme confédérale pour alimenter le pot commun de la CGT.
          Valoriser l’action du syndicat et la coopération avec l’UL, l’UD, la FD, l’UGICT. 
        </p>
        <p className={styles.sectionText}>
          Après le scrutin, analyser la campagne et le résultat, puis prolonger la démarche : 
          convertir les voix acquises en syndicalisation et continuer la lutte pour gagner les
          revendications du cahier.
        </p>
      </section>
    </div>
  );
}

export default PlanPendantPage;
