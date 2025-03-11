import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import cgtLogo from '../../assets/logo-cgt.png';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Gère le changement d'apparence de la barre de navigation lors du défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Ferme le menu mobile lorsqu'on change de page
  useEffect(() => {
    setIsMenuOpen(false);
    setToolsDropdownOpen(false);
    setActionsDropdownOpen(false);
  }, [location]);

  // Désactive le défilement du corps quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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

  // Ferme tout quand on clique sur l'overlay (en mode mobile)
  const handleOverlayClick = () => {
    setIsMenuOpen(false);
    setToolsDropdownOpen(false);
    setActionsDropdownOpen(false);
  };

  return (
    <>
      {/* Overlay pour fermer le menu en cliquant à l'extérieur (mobile) */}
      {isMenuOpen && (
        <div 
          className={`${styles.overlay} ${isMenuOpen ? styles.overlayActive : ''}`} 
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
      
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Logo + Titre */}
          <Link to="/" className={styles.logoContainer}>
            <img src={cgtLogo} alt="Logo CGT" className={styles.logo} />
            <h1 className={styles.title}>Outils CGT</h1>
          </Link>

          {/* Bouton hamburger (mobile) */}
          <button 
            className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
            onClick={toggleMenu}
            aria-label="Menu principal"
            aria-expanded={isMenuOpen}
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
                aria-expanded={toolsDropdownOpen}
              >
                <i className={`${styles.icon} ${styles.mapIcon}`}></i>
                Outils
              </button>
              {toolsDropdownOpen && (
                <ul className={styles.dropdownMenu} role="menu">
                  <li role="none">
                    <Link to="/cartographie" className={styles.dropdownItem} role="menuitem">
                      Cartographie
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/retro-planning" className={styles.dropdownItem} role="menuitem">
                      Rétro-planning
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/ecole-de-la-democratie" className={styles.dropdownItem} role="menuitem">
                      École Démocratie
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/assemblees" className={styles.dropdownItem} role="menuitem">
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
                aria-expanded={actionsDropdownOpen}
              >
                <i className={`${styles.icon} ${styles.flagIcon}`}></i>
                Actions
              </button>
              {actionsDropdownOpen && (
                <ul className={styles.dropdownMenu} role="menu">
                  <li role="none">
                    <Link to="/syndicalisation" className={styles.dropdownItem} role="menuitem">
                      Syndicalisation
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/resultats" className={styles.dropdownItem} role="menuitem">
                      Résultats
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/demarche" className={styles.dropdownItem} role="menuitem">
                      Démarche
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navigation;