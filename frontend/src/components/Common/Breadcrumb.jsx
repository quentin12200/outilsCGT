// src/components/Common/Breadcrumb.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumb.module.css'; // Optionnel si vous voulez du CSS module

function Breadcrumb() {
  const location = useLocation();
  
  // Exemple : "/cartographie/etape1" -> ["cartographie", "etape1"]
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <nav className={styles.breadcrumbContainer}>
      <ol className={styles.breadcrumbList}>
        {/* Lien vers l'accueil */}
        <li>
          <Link to="/">Accueil</Link>
        </li>

        {/* Construction dynamique des segments */}
        {pathSegments.map((segment, index) => {
          // Construit l'URL cumulatif jusqu'à ce segment
          const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={url}>
              {isLast ? (
                // Dernier segment : simple texte (ou style différent)
                <span>{segment}</span>
              ) : (
                // Autres segments : lien cliquable
                <Link to={url}>{segment}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
