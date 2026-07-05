import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome, FaRoute, FaTools, FaGraduationCap, FaVoteYea, FaUserCircle,
  FaMapMarkedAlt, FaChartPie, FaClipboardList, FaBook, FaUsers,
  FaCalendarAlt, FaChartLine, FaThLarge, FaBullhorn, FaHourglassStart,
  FaFlagCheckered, FaClipboardCheck, FaTasks, FaSeedling, FaToolbox
} from 'react-icons/fa';
import styles from './Navigation.module.css';
import cgtLogo from '../../assets/logo-cgt.png';

// Structure complète du menu : l'ordre des outils suit la démarche CGT
// (connaître ses forces → besoins → revendications → mobilisation → élections).
const menu = [
  { type: 'lien', label: 'Accueil', path: '/', icone: <FaHome /> },
  { type: 'lien', label: 'Mon parcours', path: '/parcours', icone: <FaRoute /> },
  {
    type: 'dropdown',
    id: 'outils',
    label: 'Outils',
    icone: <FaTools />,
    items: [
      { label: 'Cartographie', path: '/carto-syndicalisation?tab=cartographie', icone: <FaMapMarkedAlt /> },
      { label: 'Syndicalisation', path: '/carto-syndicalisation?tab=syndicalisation', icone: <FaChartPie /> },
      { label: 'Questionnaire des besoins', path: '/questionnaire', icone: <FaClipboardList /> },
      { label: 'Cahier revendicatif', path: '/cahier-revendicatif', icone: <FaBook /> },
      { label: 'Assemblées', path: '/assemblees', icone: <FaUsers /> },
      { label: 'Rétro-planning', path: '/retro-planning', icone: <FaCalendarAlt /> },
      { label: 'Résultats', path: '/resultats', icone: <FaChartLine /> },
      { label: "Vue d'ensemble", path: '/vue-ensemble', icone: <FaThLarge /> }
    ]
  },
  { type: 'lien', label: 'Démarche', path: '/demarche', icone: <FaGraduationCap /> },
  {
    type: 'dropdown',
    id: 'elections',
    label: 'Élections',
    icone: <FaVoteYea />,
    items: [
      { label: 'Élections CSE', path: '/elections-cse', icone: <FaVoteYea /> },
      { label: 'Campagne élections', path: '/campagne-elections', icone: <FaBullhorn /> },
      { label: 'Avant : préparer', path: '/plan-avant', icone: <FaHourglassStart /> },
      { label: 'Pendant : gagner', path: '/plan-pendant', icone: <FaFlagCheckered /> },
      { label: 'Après : le bilan', path: '/plan-apres', icone: <FaClipboardCheck /> },
      { label: "Plan d'actions", path: '/plan-actions', icone: <FaTasks /> },
      { label: 'Plan implanter', path: '/plan-implanter', icone: <FaSeedling /> },
      { label: 'Plan outils', path: '/plan-outils', icone: <FaToolbox /> }
    ]
  },
  { type: 'lien', label: 'Compte', path: '/compte', icone: <FaUserCircle /> }
];

// Un lien est actif si son chemin (sans paramètres) correspond à la page courante
function estActif(path, location) {
  const [pathname, search] = path.split('?');
  if (pathname !== location.pathname) return false;
  // Pour les liens avec ?tab=..., comparer aussi l'onglet
  if (search) return location.search.includes(search.split('=')[1]);
  return true;
}

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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
    setOpenDropdown(null);
  }, [location]);

  // Désactiver le scroll du body en mode mobile
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setOpenDropdown(null);
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
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
            <img src={cgtLogo} alt="Logo CGT Aveyron" className={styles.logo} />
            <h1 className={styles.title}>Outils CGT Aveyron</h1>
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
            {menu.map((entree) => {
              if (entree.type === 'lien') {
                const actif = estActif(entree.path, location);
                return (
                  <li key={entree.path}>
                    <Link
                      to={entree.path}
                      className={`${styles.navItem} ${actif ? styles.navItemActif : ''}`}
                      aria-current={actif ? 'page' : undefined}
                    >
                      <span className={styles.navIcon}>{entree.icone}</span>
                      {entree.label}
                    </Link>
                  </li>
                );
              }

              // Dropdown : actif si l'une de ses pages est ouverte
              const enfantActif = entree.items.some((item) => estActif(item.path, location));
              const ouvert = openDropdown === entree.id;
              return (
                <li key={entree.id} className={styles.dropdown}>
                  <button
                    type="button"
                    className={`${styles.navItem} ${enfantActif ? styles.navItemActif : ''}`}
                    onClick={() => toggleDropdown(entree.id)}
                    aria-expanded={ouvert}
                  >
                    <span className={styles.navIcon}>{entree.icone}</span>
                    {entree.label}
                    <span className={`${styles.chevron} ${ouvert ? styles.chevronOuvert : ''}`}>▾</span>
                  </button>
                  {ouvert && (
                    <ul className={styles.dropdownMenu} role="menu">
                      {entree.items.map((item) => (
                        <li role="none" key={item.path}>
                          <Link
                            to={item.path}
                            className={`${styles.dropdownItem} ${estActif(item.path, location) ? styles.dropdownItemActif : ''}`}
                            role="menuitem"
                          >
                            <span className={styles.dropdownIcon}>{item.icone}</span>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
