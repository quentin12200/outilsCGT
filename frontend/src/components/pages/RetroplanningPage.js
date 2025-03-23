// src/components/pages/RetroplanningPage.js
import React, { useState } from 'react';
import RetroplanningMain from '../RetroplanningModule/RetroplanningMain';
import styles from './RetroplanningPage.module.css';

function RetroplanningPage() {
  const [selectedType, setSelectedType] = useState(null);
  
  // Types de rétro-planning disponibles
  const retroplanningTypes = [
    {
      id: 'elections',
      title: 'Élections CSE',
      description: 'Planifiez votre campagne électorale pour les élections professionnelles',
      icon: '🗳️',
      color: '#b91c1c'
    },
    {
      id: 'syndicalisation',
      title: 'Campagne de syndicalisation',
      description: 'Organisez une campagne pour développer la syndicalisation dans votre établissement',
      icon: '📈',
      color: '#0891b2'
    },
    {
      id: 'nao',
      title: 'NAO Salaires',
      description: 'Préparez les négociations annuelles obligatoires sur les salaires',
      icon: '💰',
      color: '#15803d'
    },
    {
      id: 'lutte',
      title: 'Lutte spécifique',
      description: 'Organisez une mobilisation sur un sujet précis (restructuration, conditions de travail...)',
      icon: '✊',
      color: '#7e22ce'
    },
    {
      id: 'formation',
      title: 'Plan de formation',
      description: 'Planifiez la formation des militants et des élus',
      icon: '🎓',
      color: '#0369a1'
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Rétro-planning</h1>
        <p className={styles.pageSubtitle}>
          Planifiez et organisez votre démarche syndicale dans le temps
        </p>
      </header>

      {!selectedType ? (
        <div className={styles.typeSelectionContainer}>
          <div className={styles.introAlert}>
            <h2 className={styles.introTitle}>Quel type de rétro-planning souhaitez-vous créer ?</h2>
            <p className={styles.introText}>
              Sélectionnez le type d'action pour lequel vous souhaitez établir un rétro-planning.
              Chaque type propose un calendrier et des actions adaptés à votre objectif.
            </p>
          </div>
          
          <div className={styles.typeGrid}>
            {retroplanningTypes.map(type => (
              <div 
                key={type.id}
                className={styles.typeCard}
                onClick={() => setSelectedType(type.id)}
                style={{ borderColor: type.color }}
              >
                <div className={styles.typeIcon} style={{ backgroundColor: type.color }}>
                  {type.icon}
                </div>
                <h3 className={styles.typeTitle}>{type.title}</h3>
                <p className={styles.typeDescription}>{type.description}</p>
                <button 
                  className={styles.typeButton}
                  style={{ backgroundColor: type.color }}
                  onClick={() => setSelectedType(type.id)}
                >
                  Sélectionner
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className={styles.selectedTypeHeader}>
            <div className={styles.selectedTypeInfo}>
              <span className={styles.selectedTypeIcon}>
                {retroplanningTypes.find(t => t.id === selectedType).icon}
              </span>
              <h2 className={styles.selectedTypeTitle}>
                Rétro-planning : {retroplanningTypes.find(t => t.id === selectedType).title}
              </h2>
            </div>
            <button 
              className={styles.changeTypeButton}
              onClick={() => setSelectedType(null)}
            >
              Changer de type
            </button>
          </div>

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

          <RetroplanningMain retroplanningType={selectedType} />
          
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
        </>
      )}
    </div>
  );
}

export default RetroplanningPage;