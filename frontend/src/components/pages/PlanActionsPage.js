import React, { useState } from 'react';
import styles from './PlanActions.module.css';

const options = [
  {
    id: 'syndicalisations',
    title: 'Syndicalisations',
    description: 'Suivez et gérez les actions de syndicalisation de vos équipes.'
  },
  {
    id: 'lutte',
    title: 'Lutte',
    description: 'Organisez vos actions de lutte et mobilisez vos troupes pour le changement.'
  },
  {
    id: 'elections',
    title: 'Elections',
    description: 'Planifiez et suivez les campagnes électorales pour renforcer votre représentativité.'
  },
];

function PlanActionsPage() {
  const [activeOption, setActiveOption] = useState(null);

  const handleOptionClick = (id) => {
    setActiveOption(id);
  };

  return (
    <div className={styles.planActionsContainer}>
      <h1 className={styles.planActionsHeader}>Plan d'actions</h1>
      <div className={styles.actionsGrid}>
        {options.map(option => (
          <div
            key={option.id}
            className={`${styles.actionOption} ${activeOption === option.id ? styles.actionOptionActive : ''}`}
            onClick={() => handleOptionClick(option.id)}
          >
            <div className={styles.actionIcon}>
              {option.id === 'syndicalisations' && '🤝'}
              {option.id === 'lutte' && '✊'}
              {option.id === 'elections' && '🗳️'}
            </div>
            <h2 className={styles.actionTitle}>{option.title}</h2>
            <p className={styles.actionDescription}>{option.description}</p>
          </div>
        ))}
      </div>
      {activeOption && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p>
            Vous avez sélectionné : <strong>{activeOption}</strong>
          </p>
          {/* Vous pouvez ici intégrer d'autres composants ou contenus spécifiques selon l'option active */}
        </div>
      )}
    </div>
  );
}

export default PlanActionsPage;
