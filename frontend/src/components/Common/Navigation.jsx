// src/components/Common/Navigation.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navLogo}>
          <img src="/logo-cgt.png" alt="CGT Logo" className={styles.logo} />
          <span className={styles.appTitle}>Outils CGT</span>
        </Link>

        <button className={styles.menuButton} onClick={toggleMenu}>
          <span className={styles.menuIcon}></span>
        </button>

        <div className={`${styles.navMenu} ${menuOpen ? styles.active : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link 
                to="/syndicalisation" 
                className={`${styles.navLink} ${location.pathname === '/syndicalisation' ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-users"></i>
                <span>Syndicalisation</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                to="/resultats" 
                className={`${styles.navLink} ${location.pathname === '/resultats' ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-chart-bar"></i>
                <span>Résultats Électoraux</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                to="/cartographie" 
                className={`${styles.navLink} ${location.pathname === '/cartographie' ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-map"></i>
                <span>Cartographie</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                to="/demarche" 
                className={`${styles.navLink} ${location.pathname === '/demarche' ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-tasks"></i>
                <span>Démarche</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                to="/demarche-revendicative" 
                className={`${styles.navLink} ${location.pathname === '/demarche-revendicative' ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-bullhorn"></i>
                <span>Démarche Revendicative</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                to="/retroplanning" 
                className={`${styles.navLink} ${location.pathname === '/retroplanning' ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-calendar-alt"></i>
                <span>Retroplanning</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link 
                to="/tableau-nav" 
                className={`${styles.navLink} ${location.pathname === '/tableau-nav' ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <i className="fas fa-clipboard-list"></i>
                <span>Tableau de Bord</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;