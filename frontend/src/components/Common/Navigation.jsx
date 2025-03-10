import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import cgtLogo from '../../assets/logo-cgt.png';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);

  // Ouvre/ferme le menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Si on referme le menu mobile, on referme aussi les sous-menus
    if (isMenuOpen) {
      setToolsDropdownOpen(false);
      setActionsDropdownOpen(false);
    }
  };

  // Ouvre/ferme le sous-menu "Outils"
  const toggleToolsDropdown = () => {
    setToolsDropdownOpen(!toolsDropdownOpen);
    // Ferme l'autre dropdown si ouvert
    if (actionsDropdownOpen) setActionsDropdownOpen(false);
  };

  // Ouvre/ferme le sous-menu "Actions"
  const toggleActionsDropdown = () => {
    setActionsDropdownOpen(!actionsDropdownOpen);
    // Ferme l'autre dropdown si ouvert
    if (toolsDropdownOpen) setToolsDropdownOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>

        {/* Logo + Titre */}
        <div className={styles.logoContainer}>
          <img src={cgtLogo} alt="Logo CGT" className={styles.logo} />
          <h1 className={styles.title}>Outils CGT</h1>
        </div>

        {/* Bouton hamburger (mobile) */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-label="Menu principal"
        >
          <span className={styles.hamburgerIcon}></span>
        </button>

        {/* Liste principale */}
        <ul className={`${styles.navList} ${isMenuOpen ? styles.menuOpen : ''}`}>
          {/* Lien Accueil */}
          <li>
            <Link to="/" className={styles.navItem}>
              <i className={`${styles.icon} ${styles.homeIcon}`}></i>
              Accueil
            </Link>
          </li>

          {/* Sous-menu Outils */}
          <li className={styles.dropdown}>
            <button 
              type="button" 
              className={styles.navItem} 
              onClick={toggleToolsDropdown}
            >
              <i className={`${styles.icon} ${styles.mapIcon}`}></i>
              Outils
            </button>
            {toolsDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/cartographie" className={styles.dropdownItem}>
                    Cartographie
                  </Link>
                </li>
                <li>
                  <Link to="/retro-planning" className={styles.dropdownItem}>
                    Rétro-planning
                  </Link>
                </li>
                <li>
                  <Link to="/ecole-de-la-democratie" className={styles.dropdownItem}>
                    École Démocratie
                  </Link>
                </li>
                <li>
                  <Link to="/assemblees" className={styles.dropdownItem}>
                    Assemblées
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Sous-menu Actions */}
          <li className={styles.dropdown}>
            <button 
              type="button" 
              className={styles.navItem} 
              onClick={toggleActionsDropdown}
            >
              <i className={`${styles.icon} ${styles.flagIcon}`}></i>
              Actions
            </button>
            {actionsDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/syndicalisation" className={styles.dropdownItem}>
                    Syndicalisation
                  </Link>
                </li>
                <li>
                  <Link to="/resultats" className={styles.dropdownItem}>
                    Résultats
                  </Link>
                </li>
                <li>
                  <Link to="/demarche" className={styles.dropdownItem}>
                    Démarche
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
