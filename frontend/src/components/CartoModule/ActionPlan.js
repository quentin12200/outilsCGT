import React from 'react';
import styles from './ActionPlan.module.css';

function ActionPlan({ stats, services }) {
  // Calcul des services prioritaires (faible taux de syndicalisation)
  const priorityServices = [...stats.below25];

  // Calcul du potentiel de croissance
  const potentialGrowth = services
    .filter(s => s.salaries > 0)
    .map(s => ({
      name: s.name,
      current: s.syndiques,
      potential: s.salaries - s.syndiques,
      ratio: s.syndiques / s.salaries
    }))
    .sort((a, b) => b.potential - a.potential)
    .slice(0, 3);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Plan d'action stratégique</h3>

      <div className={styles.grid}>
        {/* Panneau de gauche : Priorités d'intervention */}
        <div className={styles.leftPanel}>
          <h4 className={styles.subtitle}>Priorités d'intervention</h4>
          {priorityServices.length > 0 ? (
            <>
              <p className={styles.paragraph}>
                Services à faible taux de syndicalisation (moins de 25%) :
              </p>
              <ul className={styles.list}>
                {priorityServices.map((service, idx) => (
                  <li key={idx}>{service}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className={styles.paragraph}>
              Aucun service n'est en dessous de 25% de syndicalisation. Continuez vos efforts pour augmenter le taux global.
            </p>
          )}
        </div>

        {/* Panneau de droite : Potentiel de croissance */}
        <div className={styles.rightPanel}>
          <h4 className={styles.subtitle}>Potentiel de croissance</h4>
          <p className={styles.paragraph}>
            Services présentant le plus fort potentiel de progression :
          </p>
          <ul className={styles.list}>
            {potentialGrowth.map((service, idx) => (
              <li key={idx}>
                {service.name} : {service.potential} salariés non-syndiqués ({(service.ratio * 100).toFixed(1)}% actuellement)
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section des modèles de réussite */}
      {stats.above50.length > 0 && (
        <div className={styles.successPanel}>
          <h4 className={styles.subtitle}>Modèles de réussite</h4>
          <p className={styles.paragraph}>
            Services à fort taux de syndicalisation (plus de 50%) pouvant servir d'exemple :
          </p>
          <ul className={styles.list}>
            {stats.above50.map((service, idx) => (
              <li key={idx}>{service}</li>
            ))}
          </ul>
          <p className={styles.note}>
            Ces services peuvent être mobilisés pour aider à syndiquer les autres secteurs.
          </p>
        </div>
      )}

      {/* Section des axes de travail prioritaires */}
      <div className={styles.recommandationBox}>
        <h4 className={styles.subtitle}>Axes de travail prioritaires</h4>
        <ol className={styles.olList}>
          <li className={styles.listItem}>
            Organiser des AG de syndiqués dans les {stats.below25.length > 0 ? 'services prioritaires' : 'services à fort potentiel'}
          </li>
          <li className={styles.listItem}>
            Développer un cahier revendicatif par service en partant des besoins exprimés
          </li>
          <li className={styles.listItem}>
            Mettre en place un plan de visites de services et tournées systématiques
          </li>
          <li className={styles.listItem}>
            Déployer les syndiqués dans leur proximité immédiate avec des outils de pointage nominatifs
          </li>
        </ol>
      </div>
    </div>
  );
}

export default ActionPlan;
