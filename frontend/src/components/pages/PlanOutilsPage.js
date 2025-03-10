import React, { useState } from 'react';
import styles from './PlanOutils.module.css';

const outils = [
  {
    id: 'questionnaire',
    title: 'Questionnaire',
    description: "Outil pour recueillir les besoins et attentes des salariés."
  },
  {
    id: 'cahierRevendicatif',
    title: 'Cahier Revendicatif',
    description: "Document synthétique pour consolider les revendications issues du recueil des besoins."
  },
  {
    id: 'listes',
    title: 'Listes',
    description: "Préparation des listes électorales et des candidats selon les spécificités des services."
  },
  {
    id: 'tournées',
    title: 'Tournées de Services',
    description: "Planification et organisation des visites sur le terrain pour renforcer la mobilisation."
  },
  {
    id: 'communication',
    title: 'Communication',
    description: "Supports de communication (tracts, affiches, e-mails) pour diffuser et valoriser la campagne."
  },
  {
    id: 'formation',
    title: 'Formation',
    description: "Sessions de formation pour préparer les équipes et renforcer l'action syndicale."
  },
];

function PlanOutilsPage() {
  const [selectedTool, setSelectedTool] = useState(null);

  const handleToolClick = (id) => {
    setSelectedTool(id);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Outils de Campagne</h1>
      <p className={styles.introText}>
        Sélectionnez un outil pour obtenir plus de détails sur sa fonction et son utilisation dans la campagne.
      </p>
      <div className={styles.toolsGrid}>
        {outils.map(tool => (
          <div
            key={tool.id}
            className={`${styles.toolCard} ${selectedTool === tool.id ? styles.activeTool : ''}`}
            onClick={() => handleToolClick(tool.id)}
          >
            <div className={styles.toolIcon}>
              {tool.id === 'questionnaire' && '📝'}
              {tool.id === 'cahierRevendicatif' && '📖'}
              {tool.id === 'listes' && '📋'}
              {tool.id === 'tournées' && '🚶'}
              {tool.id === 'communication' && '📢'}
              {tool.id === 'formation' && '🎓'}
            </div>
            <h2 className={styles.toolTitle}>{tool.title}</h2>
            <p className={styles.toolDescription}>{tool.description}</p>
          </div>
        ))}
      </div>
      {selectedTool && (
        <div className={styles.toolDetails}>
          <p>
            Vous avez sélectionné : <strong>{selectedTool}</strong>
          </p>
          {/* Ici, vous pouvez intégrer plus de détails ou un sous-composant pour l'outil sélectionné */}
        </div>
      )}
    </div>
  );
}

export default PlanOutilsPage;
