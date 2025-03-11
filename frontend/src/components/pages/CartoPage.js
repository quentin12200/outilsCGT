import React from 'react';
import CartoMain from '../CartoModule/CartoMain';
import CartographieAvancee from '../CartoModule/CartographieAvancee';
import styles from './CartoPage.module.css';

function CartoPage() {
  return (
    <div className={styles.cartoContainer}>
      <header className={styles.cartoHeader}>
        <h1 className={styles.cartoTitle}>Cartographie Stratégique</h1>
        <p className={styles.cartoSubtitle}>
          Visualisez le taux de syndicalisation par service et identifiez les zones prioritaires
        </p>
      </header>

      <div className={styles.cartoContent}>
        <p className={styles.cartoParagraph}>
          Cet outil vous permet de réaliser une cartographie stratégique de votre établissement 
          en analysant la répartition des syndiqués par service. Vous obtiendrez un plan d'action 
          personnalisé pour renforcer la présence CGT dans les zones prioritaires.
        </p>

        <CartoMain />
        
        <div className={styles.cartoSectionDivider}>
          <span>Cartographie Avancée</span>
        </div>
        
        <CartographieAvancee />
      </div>
    </div>
  );
}

export default CartoPage;