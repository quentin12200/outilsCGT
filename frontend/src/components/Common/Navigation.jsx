import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import cgtLogo from '../../assets/logo-cgt.png';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);
  const [campagneDropdownOpen, setCampagneDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Gestion du scroll pour modifier l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer tous les menus lors d'un changement de page
  useEffect(() => {
    setIsMenuOpen(false);
    setToolsDropdownOpen(false);
    setActionsDropdownOpen(false);
    setCampagneDropdownOpen(false);
  }, [location]);

  // Désactiver le scroll du body en mode mobile
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setToolsDropdownOpen(false);
      setActionsDropdownOpen(false);
      setCampagneDropdownOpen(false);
    }
  };

  const toggleToolsDropdown = () => {
    setToolsDropdownOpen(!toolsDropdownOpen);
    if (actionsDropdownOpen) setActionsDropdownOpen(false);
    if (campagneDropdownOpen) setCampagneDropdownOpen(false);
  };

  const toggleActionsDropdown = () => {
    setActionsDropdownOpen(!actionsDropdownOpen);
    if (toolsDropdownOpen) setToolsDropdownOpen(false);
    if (campagneDropdownOpen) setCampagneDropdownOpen(false);
  };

  const toggleCampagneDropdown = () => {
    setCampagneDropdownOpen(!campagneDropdownOpen);
    if (toolsDropdownOpen) setToolsDropdownOpen(false);
    if (actionsDropdownOpen) setActionsDropdownOpen(false);
  };

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
    setToolsDropdownOpen(false);
    setActionsDropdownOpen(false);
    setCampagneDropdownOpen(false);
  };

  return (
    <>
      {isMenuOpen && (
        <div 
          className={`${styles.overlay} ${isMenuOpen ? styles.overlayActive : ''}`} 
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
      
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logoContainer}>
            <img src={cgtLogo} alt="Logo CGT" className={styles.logo} />
            <h1 className={styles.title}>Outils CGT</h1>
          </Link>

          <button 
            className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
            onClick={toggleMenu}
            aria-label="Menu principal"
            aria-expanded={isMenuOpen}
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

            {/* Dropdown Outils */}
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
                    <Link to="/carto-syndicalisation" className={styles.dropdownItem} role="menuitem">
                      <span className={styles.newFeature}>Nouveau</span> Carto-Syndicalisation
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

            {/* Dropdown Actions */}
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

            {/* Nouveau dropdown Campagne */}
            <li className={styles.dropdown}>
              <button 
                type="button" 
                className={styles.navItem}
                onClick={toggleCampagneDropdown}
                aria-expanded={campagneDropdownOpen}
              >
                <i className={`${styles.icon} ${styles.campagneIcon}`}></i>
                Campagne
              </button>
              {campagneDropdownOpen && (
                <ul className={styles.dropdownMenu} role="menu">
                  <li role="none">
                    <Link to="/plan-actions" className={styles.dropdownItem} role="menuitem">
                      Plan d'action
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/plan-pendant" className={styles.dropdownItem} role="menuitem">
                      Plan pendant
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/plan-avant" className={styles.dropdownItem} role="menuitem">
                      Plan avant
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/plan-apres" className={styles.dropdownItem} role="menuitem">
                      Plan après
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/plan-implanter" className={styles.dropdownItem} role="menuitem">
                      Plan implanter
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/plan-outils" className={styles.dropdownItem} role="menuitem">
                      Plan outils
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/cahier-revendicatif" className={styles.dropdownItem} role="menuitem">
                      Cahier revendicatif
                    </Link>
                  </li>
                  <li role="none">
                    <Link to="/questionnaire" className={styles.dropdownItem} role="menuitem">
                      Questionnaire
                    </Link>
                  </li>
                  <li>
  <Link to="/vue-ensemble" className={styles.navItem}>
    Vue d'ensemble
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
