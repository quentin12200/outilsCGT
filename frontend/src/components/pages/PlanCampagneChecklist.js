// src/components/pages/PlanCampagneChecklist.js
// Composant partagé par les pages Plan Avant / Plan Pendant / etc. :
// des sections de checklist persistantes (localStorage + espace syndicat).

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import storageService from '../services/storageService';
import styles from './PlanCampagneChecklist.module.css';

function PlanCampagneChecklist({ cleStockage, titre, sousTitre, sections }) {
  const [faites, setFaites] = useState({});
  const chargeRef = useRef(false);

  useEffect(() => {
    const charger = async () => {
      const local = storageService.loadFromLocal(cleStockage);
      if (local?.faites) setFaites(local.faites);
      const partage = await storageService.loadFromServer(cleStockage);
      if (partage?.faites) setFaites(partage.faites);
      chargeRef.current = true;
    };
    charger();
  }, [cleStockage]);

  const basculer = (id) => {
    setFaites((precedent) => {
      const suivant = { ...precedent, [id]: !precedent[id] };
      if (chargeRef.current) {
        const donnees = { faites: suivant, majLe: new Date().toISOString() };
        storageService.saveLocally(cleStockage, donnees);
        storageService.saveToServer(cleStockage, donnees);
      }
      return suivant;
    });
  };

  const total = sections.reduce((somme, s) => somme + s.items.length, 0);
  const nbFaites = sections.reduce(
    (somme, s) => somme + s.items.filter((i) => faites[i.id]).length,
    0
  );
  const pourcentage = total > 0 ? Math.round((nbFaites / total) * 100) : 0;

  return (
    <div className={styles.page}>
      <header className={styles.entete}>
        <h1 className={styles.titre}>{titre}</h1>
        <p className={styles.sousTitre}>{sousTitre}</p>
        <div className={styles.progression}>
          <div className={styles.barre}>
            <div className={styles.barreRemplie} style={{ width: `${pourcentage}%` }} />
          </div>
          <span className={styles.progressionTexte}>{nbFaites}/{total} — {pourcentage}%</span>
        </div>
      </header>

      {sections.map((section) => {
        const faitesSection = section.items.filter((i) => faites[i.id]).length;
        return (
          <section key={section.id} className={styles.section} style={{ '--couleur': section.couleur }}>
            <h2 className={styles.sectionTitre}>
              {section.icone} {section.titre}
              <span className={styles.sectionCompteur}>{faitesSection}/{section.items.length}</span>
            </h2>
            {section.description && <p className={styles.sectionDescription}>{section.description}</p>}
            <ul className={styles.liste}>
              {section.items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <label className={styles.itemLabel}>
                    <input
                      type="checkbox"
                      checked={Boolean(faites[item.id])}
                      onChange={() => basculer(item.id)}
                    />
                    <span className={faites[item.id] ? styles.itemFait : ''}>
                      <strong>{item.label}</strong>
                      {item.detail && <span className={styles.itemDetail}> — {item.detail}</span>}
                    </span>
                  </label>
                  {item.lien && (
                    <Link to={item.lien} className={styles.itemLien}>outil →</Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export default PlanCampagneChecklist;
