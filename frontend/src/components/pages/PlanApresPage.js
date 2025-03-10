import React from 'react';
import styles from './PlanApres.module.css';

function PlanApresPage() {
  // Liste des thèmes à aborder dans la section Bilan/Perspectives
  const themes = [
    'DEMARCHE CAHIER REVENDICATIF',
    'SALARIES SYNDIQUES (COGITIEL)',
    'PRATIQUES DEMOCRATIQUE',
    'FORMATION',
    'SYNDICALISATION',
    'POLITIQUE FINANCIERE',
    'COMMUNICATION',
    'IRP',
    'ELUS ET MANDATES',
    'LIENS CGT',
    'DIRECTION SYNDICALE',
    'AUTRES'
  ];

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>APRÈS</h1>

      {/* 1) Visite du Syndicat */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Visite du Syndicat</h2>
        <div className={styles.visitContainer}>
          <div className={styles.visitRow}>
            <div className={styles.visitLabel}>Présents (UL, UD, FD, UGICT) :</div>
            <div className={styles.visitValue}>Ex. UL, UD</div>
          </div>
          <div className={styles.visitRow}>
            <div className={styles.visitLabel}>Date :</div>
            <div className={styles.visitValue}>JJ/MM/AAAA</div>
          </div>
          <div className={styles.visitRow}>
            <div className={styles.visitLabel}>Lieu :</div>
            <div className={styles.visitValue}>Ex. Salle de réunion</div>
          </div>
          <div className={styles.visitRow}>
            <div className={styles.visitLabel}>Remarques :</div>
            <div className={styles.visitValue}>
              (Notes, particularités, etc.)
            </div>
          </div>
        </div>
      </section>

      {/* 2) Bilan / Perspectives */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Bilan et Perspectives</h2>
        <table className={styles.bilanTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Thématique</th>
              <th className={styles.tableHeader}>Bilan</th>
              <th className={styles.tableHeader}>Perspectives</th>
            </tr>
          </thead>
          <tbody>
            {themes.map((theme) => (
              <tr key={theme}>
                <td className={styles.tableCellTitle}>{theme}</td>
                <td className={styles.tableCell}>
                  {/* Espace pour décrire le bilan, par ex. zone de texte, résumé, etc. */}
                  <div>À compléter (Bilan)</div>
                </td>
                <td className={styles.tableCell}>
                  {/* Espace pour décrire les perspectives, par ex. zone de texte, résumé, etc. */}
                  <div>À compléter (Perspectives)</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default PlanApresPage;
