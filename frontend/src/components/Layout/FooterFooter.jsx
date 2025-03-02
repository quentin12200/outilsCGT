import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FooterFooter.module.css';
import cgtLogo from '../../assets/logo-cgt.png'; // Ensure this path is correct

function FooterFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.logoSection}>
            <img src={cgtLogo} alt="Logo CGT" className={styles.footerLogo} />
            <h3 className={styles.footerTitle}>Outils CGT</h3>
            <p className={styles.footerTagline}>L'informatique au service du militantisme CGT</p>
          </div>
          
          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Navigation</h4>
              <ul className={styles.linkList}>
                <li><Link to="/" className={styles.footerLink}>Accueil</Link></li>
                <li><Link to="/cartographie" className={styles.footerLink}>Cartographie</Link></li>
                <li><Link to="/retro-planning" className={styles.footerLink}>Rétro-planning</Link></li>
                <li><Link to="/ecole-de-la-democratie" className={styles.footerLink}>École de la Démocratie</Link></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Outils</h4>
              <ul className={styles.linkList}>
                <li><Link to="/assemblees" className={styles.footerLink}>Assemblées</Link></li>
                <li><Link to="/syndicalisation" className={styles.footerLink}>Syndicalisation</Link></li>
                <li><Link to="/resultats" className={styles.footerLink}>Résultats</Link></li>
                <li><Link to="/demarche" className={styles.footerLink}>Démarche</Link></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Informations</h4>
              <ul className={styles.linkList}>
                <li><Link to="/mentions-legales" className={styles.footerLink}>Mentions légales</Link></li>
                <li><Link to="/contact" className={styles.footerLink}>Contact</Link></li>
                <li><Link to="/aide" className={styles.footerLink}>Aide</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Outils CGT. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterFooter;