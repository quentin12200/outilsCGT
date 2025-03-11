import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './HomePage.module.css';
import heroImage from '../../assets/hero-image.png';
import ModuleCard from './ModuleCard';

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

// Citations sur le syndicalisme et la lutte des travailleurs
const quotes = [
  {
    text: "La démarche, c'est mener la bataille revendicative, c'est la construction de la mobilisation pour gagner!",
    author: "CGT"
  },
  {
    text: "L'émancipation des travailleurs sera l'œuvre des travailleurs eux-mêmes.",
    author: "Karl Marx"
  },
  {
    text: "La solidarité n'est pas un sentiment, c'est une nécessité.",
    author: "CGT"
  }
];

function HomePage() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Effet pour changer la citation toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prevQuote) => (prevQuote + 1) % quotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Effet pour animer les éléments lors du défilement
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.homePage}>
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

      <section className={styles.quoteSection}>
        <blockquote className={styles.quote}>
          <p>{quotes[activeQuote].text}</p>
          {quotes[activeQuote].author && (
            <footer className={styles.quoteAuthor}>— {quotes[activeQuote].author}</footer>
          )}
        </blockquote>
      </section>
      
      <section className={styles.descriptionSection}>
        <div className={styles.container}>
          <p className={styles.description}>
            Cette application vous propose différents outils pour renforcer votre action syndicale.
            Chaque module a été conçu pour faciliter et structurer les différentes étapes de la démarche CGT,
            depuis l'analyse de votre implantation jusqu'à la mobilisation des salariés.
          </p>
        </div>
      </section>

      <section className={`${styles.modulesSection} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nos modules</h2>
          <div className={styles.modulesGrid}>
            {modules.map((module, index) => (
              <div 
                key={module.id} 
                className={styles.moduleWrapper}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <ModuleCard module={module} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Renforcez votre syndicat avec nos outils</h2>
          <p className={styles.ctaDescription}>
            Les outils numériques au service de la lutte syndicale et de la défense des travailleurs.
            Ensemble, construisons un syndicat plus fort et plus efficace pour défendre les droits de tous.
          </p>
          <Link to="/cartographie" className={styles.ctaButton}>
            Commencer avec la cartographie
          </Link>
        </div>
      </section>
    </div>
  );
}

HomePage.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }))
};

export default HomePage;