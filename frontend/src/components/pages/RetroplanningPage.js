// src/components/pages/RetroplanningPage.js
import React from 'react';
import RetroplanningMain from '../RetroplanningModule/RetroplanningMain';
import styles from './RetroplanningPage.module.css';

function RetroplanningPage() {
  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Rétro-planning</h1>
        <p className={styles.pageSubtitle}>
          Planifiez et organisez votre démarche syndicale dans le temps
        </p>
      </header>

      <div className={styles.introSection}>
        <div className={styles.introAlert}>
          <h2 className={styles.introTitle}>Pourquoi un rétro-planning ?</h2>
          <p className={styles.introText}>
            Le rétro-planning est un outil essentiel pour structurer votre démarche syndicale 
            en amont des élections professionnelles ou d'une action revendicative importante. 
            Il vous permet d'identifier les étapes clés, de mobiliser efficacement vos forces syndicales 
            et de ne manquer aucune échéance importante.
          </p>
        </div>
        
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>3</div>
            <div className={styles.statLabel}>Étapes clés</div>
            <div className={styles.statDescription}>Besoins, Revendications, Mobilisation</div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statNumber}>6</div>
            <div className={styles.statLabel}>Phases de la démarche</div>
            <div className={styles.statDescription}>De l'analyse au bilan</div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statNumber}>120</div>
            <div className={styles.statLabel}>Jours de préparation</div>
            <div className={styles.statDescription}>Pour une campagne complète</div>
          </div>
        </div>
        
        <p className={styles.introText}>
          Avec cet outil interactif, vous pourrez déterminer le calendrier optimal en fonction 
          de votre date d'action, visualiser les différentes phases et accéder au détail des 
          actions à mener pour chaque étape. Vous pourrez également générer un planning personnalisé 
          à partager avec votre équipe syndicale.
        </p>
      </div>

      <RetroplanningMain />
      
      <div className={styles.resourcesSection}>
        <h2 className={styles.resourcesTitle}>Ressources complémentaires</h2>
        
        <div className={styles.resourcesGrid}>
          <div className={styles.resourceCard}>
            <h3 className={styles.resourceCardTitle}>Guide de l'organisateur CGT</h3>
            <p className={styles.resourceCardText}>
              Document complet sur l'organisation d'une campagne syndicale efficace.
            </p>
            <button className={styles.resourceCardButton}>Télécharger (PDF, 2.3 Mo)</button>
          </div>
          
          <div className={styles.resourceCard}>
            <h3 className={styles.resourceCardTitle}>Modèles de plannings</h3>
            <p className={styles.resourceCardText}>
              Fichiers Excel pour créer et partager votre planning personnalisé.
            </p>
            <button className={styles.resourceCardButton}>Télécharger (ZIP, 1.8 Mo)</button>
          </div>
          
          <div className={styles.resourceCard}>
            <h3 className={styles.resourceCardTitle}>Fiches pratiques par phase</h3>
            <p className={styles.resourceCardText}>
              Documents détaillés pour chaque phase du rétro-planning.
            </p>
            <button className={styles.resourceCardButton}>Consulter en ligne</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetroplanningPage;