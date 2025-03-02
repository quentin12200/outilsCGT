import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import heroImage from '../../assets/hero-image.png'; // Add a strong image showing union advocacy

function HomePage() {
  // Define modules data
  const modules = [
    {
      id: 'cartographie',
      title: 'Cartographie Stratégique',
      description: 'Visualisez le taux de syndicalisation par service et identifiez les zones prioritaires pour vos actions de développement.',
      icon: '🗺️',
      color: styles.blueModule
    },
    {
      id: 'ecole-de-la-democratie',
      title: 'École de la Démocratie',
      description: 'Guide complet pour une démarche syndicale démocratique en trois phases : avant, pendant et après l\'action.',
      icon: '🎓',
      color: styles.yellowModule
    },
    {
      id: 'retro-planning',
      title: 'Rétro-planning',
      description: 'Planifiez efficacement vos actions syndicales avec un calendrier interactif adapté aux échéances importantes.',
      icon: '📅',
      color: styles.greenModule
    },
    {
      id: 'assemblees',
      title: 'Assemblées',
      description: 'Outils pour préparer et animer efficacement vos assemblées générales et renforcer la participation des adhérents.',
      icon: '👥',
      color: styles.purpleModule
    },
    {
      id: 'syndicalisation',
      title: 'Syndicalisation',
      description: 'Suivez et développez la syndicalisation dans votre établissement avec des outils de suivi et d\'analyse.',
      icon: '📊',
      color: styles.redModule
    },
    {
      id: 'resultats',
      title: 'Résultats',
      description: 'Analysez les résultats des actions menées et tirez des enseignements pour améliorer votre stratégie syndicale.',
      icon: '📈',
      color: styles.indigoModule
    },
    {
      id: 'demarche',
      title: 'Démarche Revendicative',
      description: 'Construisez des cahiers revendicatifs répondant aux besoins réels des salariés et mobilisez autour de vos propositions.',
      icon: '📝',
      color: styles.orangeModule
    }
  ];

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Mobilisez, Organisez, Gagnez!</h2>
          <p className={styles.heroSubtitle}>
            Application de suivi et d'organisation de la syndicalisation CGT
          </p>
          <Link to="/cartographie" className={styles.heroButton}>
            Commencer maintenant
          </Link>
        </div>
        <div className={styles.heroImageContainer}>
          <img src={heroImage} alt="CGT en action" className={styles.heroImage} />
        </div>
      </section>

      {/* Quote Section */}
      <section className={styles.quoteSection}>
        <blockquote className={styles.quote}>
          <p>"La démarche, c'est mener la bataille revendicative, c'est la construction de la mobilisation pour gagner!"</p>
        </blockquote>
      </section>
      
      {/* Description Section */}
      <section className={styles.descriptionSection}>
        <div className={styles.container}>
          <p className={styles.description}>
            Cette application vous propose différents outils pour renforcer votre action syndicale.
            Chaque module a été conçu pour faciliter et structurer les différentes étapes de la démarche CGT,
            depuis l'analyse de votre implantation jusqu'à la mobilisation des salariés.
          </p>
        </div>
      </section>

      {/* Modules Section */}
      <section className={styles.modulesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nos modules</h2>
          <div className={styles.modulesGrid}>
            {modules.map(module => (
              <Link 
                key={module.id} 
                to={`/${module.id}`} 
                className={`${styles.moduleCard} ${module.color}`}
              >
                <div className={styles.moduleIcon}>{module.icon}</div>
                <h3 className={styles.moduleTitle}>{module.title}</h3>
                <p className={styles.moduleDescription}>{module.description}</p>
                <div className={styles.moduleButtonContainer}>
                  <span className={styles.moduleButton}>
                    Accéder →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Renforcez votre syndicat avec nos outils</h2>
          <p className={styles.ctaDescription}>
            Les outils numériques au service de la lutte syndicale et de la défense des travailleurs.
          </p>
          <Link to="/cartographie" className={styles.ctaButton}>
            Commencer avec la cartographie
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;