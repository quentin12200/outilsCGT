import React from 'react';
import styles from './ActionPlan.module.css';

function ActionPlan({ stats, services }) {
  // Find services with potential for growth (many employees, low unionization)
  const growthPotential = services
    .filter(s => s.name && s.employees > 10 && s.unionized / s.employees < 0.25)
    .sort((a, b) => (b.employees - b.unionized) - (a.employees - a.unionized))
    .slice(0, 3);
  
  // Find strong services that can help with organizing
  const strongServices = services
    .filter(s => s.name && s.employees > 5 && s.unionized / s.employees >= 0.5)
    .sort((a, b) => (b.unionized / b.employees) - (a.unionized / a.employees))
    .slice(0, 3);

  return (
    <div className={styles.actionPlanContainer}>
      <h2 className={styles.actionPlanTitle}>Plan d'action stratégique</h2>
      
      <div className={styles.sectionGrid}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <i className={styles.sectionIcon} data-type="growth"></i>
            Potentiel de croissance
          </h3>
          {growthPotential.length > 0 ? (
            <>
              <p className={styles.sectionDescription}>
                Ces services présentent le plus fort potentiel de développement syndical:
              </p>
              <ul className={styles.sectionList}>
                {growthPotential.map((service, index) => {
                  const potential = service.employees - service.unionized;
                  const ratio = (service.unionized / service.employees * 100).toFixed(1);
                  
                  return (
                    <li key={index} className={styles.sectionItem}>
                      <strong>{service.name}</strong>: {potential} salariés non-syndiqués 
                      <span className={styles.itemDetail}>({ratio}% actuellement)</span>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className={styles.sectionEmpty}>
              Aucun service ne présente de fort potentiel de développement particulier.
            </p>
          )}
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <i className={styles.sectionIcon} data-type="strength"></i>
            Forces organisatrices
          </h3>
          {strongServices.length > 0 ? (
            <>
              <p className={styles.sectionDescription}>
                Ces services à fort taux de syndicalisation peuvent être mobilisés pour aider les autres:
              </p>
              <ul className={styles.sectionList}>
                {strongServices.map((service, index) => {
                  const ratio = (service.unionized / service.employees * 100).toFixed(1);
                  
                  return (
                    <li key={index} className={styles.sectionItem}>
                      <strong>{service.name}</strong>: {service.unionized} syndiqués 
                      <span className={styles.itemDetail}>({ratio}%)</span>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className={styles.sectionEmpty}>
              Aucun service ne dispose actuellement d'un taux de syndicalisation supérieur à 50%.
            </p>
          )}
        </div>
      </div>
      
      <div className={styles.actionSteps}>
        <h3 className={styles.actionStepsTitle}>Axes de travail prioritaires</h3>
        <ol className={styles.actionStepsList}>
          <li className={styles.actionStep}>
            <h4 className={styles.actionStepTitle}>Cibler les services prioritaires</h4>
            <p className={styles.actionStepDescription}>
              Concentrer les efforts sur les services à fort potentiel identifiés ci-dessus. 
              Mettre en place une équipe dédiée pour chacun de ces services.
            </p>
          </li>
          
          <li className={styles.actionStep}>
            <h4 className={styles.actionStepTitle}>Mobiliser les syndiqués actifs</h4>
            <p className={styles.actionStepDescription}>
              S'appuyer sur les syndiqués des services à fort taux pour partager leurs expériences 
              et aider à la syndicalisation des autres services.
            </p>
          </li>
          
          <li className={styles.actionStep}>
            <h4 className={styles.actionStepTitle}>Élaborer des cahiers revendicatifs spécifiques</h4>
            <p className={styles.actionStepDescription}>
              Construire des revendications adaptées aux réalités de chaque service, en partant 
              des besoins exprimés par les salariés eux-mêmes.
            </p>
          </li>
          
          <li className={styles.actionStep}>
            <h4 className={styles.actionStepTitle}>Organiser des visites régulières</h4>
            <p className={styles.actionStepDescription}>
              Mettre en place un planning de présence syndicale dans les services ciblés avec 
              distribution de matériel d'information.
            </p>
          </li>
          
          <li className={styles.actionStep}>
            <h4 className={styles.actionStepTitle}>Suivre et évaluer les progrès</h4>
            <p className={styles.actionStepDescription}>
              Mettre à jour régulièrement cette cartographie pour mesurer l'évolution de la 
              syndicalisation et ajuster la stratégie si nécessaire.
            </p>
          </li>
        </ol>
      </div>
      
      <div className={styles.exportSection}>
        <button className={styles.exportButton}>
          Exporter en PDF
        </button>
        <button className={styles.exportButton}>
          Imprimer le plan d'action
        </button>
      </div>
    </div>
  );
}

export default ActionPlan;