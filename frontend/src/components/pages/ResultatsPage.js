// src/components/pages/ResultatsPage.js
import React from 'react';
import ResultatsMain from '../Modules/ResultatsModule/ResultatsMain';
import styles from './ResultatsPage.module.css';

function ResultatsPage() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Résultats électoraux</h1>
        <p className={styles.pageSubtitle}>
          Analyse des élections professionnelles
        </p>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.resultsContainer}>
          <ResultatsMain />
        </div>
      </main>
    </div>
  );
}

export default ResultatsPage;