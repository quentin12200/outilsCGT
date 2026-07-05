// src/components/pages/AdminPanel.js
// Panneau d'administration (visible uniquement pour les comptes admin,
// voir src/config/admin.js) : vue d'ensemble des espaces syndicats créés
// et des comptes militants, avec leur rattachement.

import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import styles from './AdminPanel.module.css';

function AdminPanel() {
  const [syndicats, setSyndicats] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  const charger = useCallback(async () => {
    setChargement(true);
    setErreur('');
    try {
      // Tous les espaces syndicats, avec leurs membres
      const syndicatsSnap = await getDocs(collection(db, 'syndicats'));
      const listeSyndicats = await Promise.all(
        syndicatsSnap.docs.map(async (docSyndicat) => {
          let membres = [];
          try {
            const membresSnap = await getDocs(collection(db, 'syndicats', docSyndicat.id, 'membres'));
            membres = membresSnap.docs.map((m) => ({ uid: m.id, ...m.data() }));
          } catch (e) {
            // Les membres restent vides si la lecture échoue
          }
          return { id: docSyndicat.id, ...docSyndicat.data(), membres };
        })
      );
      listeSyndicats.sort((a, b) => (b.creeLe?.seconds || 0) - (a.creeLe?.seconds || 0));
      setSyndicats(listeSyndicats);

      // Tous les comptes militants
      const utilisateursSnap = await getDocs(collection(db, 'utilisateurs'));
      setUtilisateurs(utilisateursSnap.docs.map((u) => ({ uid: u.id, ...u.data() })));
    } catch (error) {
      console.error('Erreur du panneau admin:', error);
      setErreur(
        "Impossible de charger les données d'administration. Vérifiez que les règles Firestore " +
        "incluent la fonction estAdmin() avec votre adresse email (voir FIREBASE.md). " +
        `Détail : ${error.code || error.message}`
      );
    } finally {
      setChargement(false);
    }
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  const nomSyndicat = (syndicatId) =>
    syndicats.find((s) => s.id === syndicatId)?.nom || '—';

  const formatDate = (timestamp) =>
    timestamp?.seconds ? new Date(timestamp.seconds * 1000).toLocaleDateString('fr-FR') : '—';

  return (
    <div className={styles.panneau}>
      <div className={styles.entete}>
        <h2 className={styles.titre}>🛡️ Administration</h2>
        <button className={styles.boutonRafraichir} onClick={charger} disabled={chargement}>
          {chargement ? 'Chargement...' : '↻ Actualiser'}
        </button>
      </div>

      {erreur && <p className={styles.erreur}>{erreur}</p>}

      {!chargement && !erreur && (
        <>
          <h3 className={styles.sousTitre}>
            Espaces syndicats <span className={styles.compteur}>{syndicats.length}</span>
          </h3>
          {syndicats.length === 0 ? (
            <p className={styles.vide}>Aucun espace syndicat créé pour l'instant.</p>
          ) : (
            <div className={styles.tableauScroll}>
              <table className={styles.tableau}>
                <thead>
                  <tr>
                    <th>Syndicat</th>
                    <th>Code</th>
                    <th>Membres</th>
                    <th>Créé le</th>
                  </tr>
                </thead>
                <tbody>
                  {syndicats.map((s) => (
                    <tr key={s.id}>
                      <td><strong>{s.nom}</strong></td>
                      <td><code className={styles.code}>{s.code}</code></td>
                      <td>
                        {s.membres.length > 0
                          ? s.membres.map((m) => `${m.email}${m.role === 'admin' ? ' ★' : ''}`).join(', ')
                          : '—'}
                      </td>
                      <td>{formatDate(s.creeLe)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <h3 className={styles.sousTitre}>
            Comptes militants <span className={styles.compteur}>{utilisateurs.length}</span>
          </h3>
          {utilisateurs.length === 0 ? (
            <p className={styles.vide}>Aucun compte n'a encore rejoint d'espace syndicat.</p>
          ) : (
            <div className={styles.tableauScroll}>
              <table className={styles.tableau}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Syndicat</th>
                  </tr>
                </thead>
                <tbody>
                  {utilisateurs.map((u) => (
                    <tr key={u.uid}>
                      <td>{u.email}</td>
                      <td>{nomSyndicat(u.syndicatId)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className={styles.note}>
            ★ = créateur de l'espace. Les comptes qui se sont inscrits sans créer ni
            rejoindre d'espace n'apparaissent que dans Firebase Console → Authentication.
          </p>
        </>
      )}
    </div>
  );
}

export default AdminPanel;
