// src/components/Common/Navigation.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import cgtLogo from '../../assets/logo-cgt.png';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src={cgtLogo} alt="Logo CGT" className={styles.logo} />
          <h1 className={styles.title}>Outils CGT</h1>
        </div>

        <button 
          className={styles.mobileMenuButton} 
          onClick={toggleMenu}
          aria-label="Menu principal"
        >
          <span className={styles.hamburgerIcon}></span>
        </button>

        <ul className={`${styles.navList} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <li>
            <Link to="/" className={styles.navItem}>
              <i className={`${styles.icon} ${styles.homeIcon}`}></i>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/cartographie" className={styles.navItem}>
              <i className={`${styles.icon} ${styles.mapIcon}`}></i>
              Cartographie
            </Link>
          </li>
          <li>
            <Link to="/retro-planning" className={styles.navItem}>
              <i className={`${styles.icon} ${styles.calendarIcon}`}></i>
              Rétro-planning
            </Link>
          </li>
          <li>
            <Link to="/ecole-de-la-democratie" className={styles.navItem}>
              <i className={`${styles.icon} ${styles.schoolIcon}`}></i>
              École Démocratie
            </Link>
          </li>
          <li>
            <Link to="/assemblees" className={styles.navItem}>
              <i className={`${styles.icon} ${styles.usersIcon}`}></i>
              Assemblées
            </Link>
          </li>
          <li>
            <Link to="/syndicalisation" className={styles.navItem}>
              <i className={`${styles.icon} ${styles.userplusIcon}`}></i>
              Syndicalisation
            </Link>
          </li>
          <li>
            <Link to="/resultats" className={styles.navItem}>
              <i className={`${styles.icon} ${styles.chartIcon}`}></i>
              Résultats
            </Link>
          </li>
          <li>
            <Link to="/demarche" className={styles.navItem}>
              <i className={`${styles.icon} ${styles.flagIcon}`}></i>
              Démarche
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
