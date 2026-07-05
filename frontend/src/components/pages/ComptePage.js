// src/components/pages/ComptePage.js
// Compte militant et espace syndicat.
// - Sans Firebase configuré : explique le mode local et comment activer le partage.
// - Avec Firebase : inscription/connexion, puis création d'un espace syndicat
//   (qui génère un code d'adhésion) ou adhésion avec le code d'un camarade.

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { estAdmin } from '../../config/admin';
import AdminPanel from './AdminPanel';
import styles from './ComptePage.module.css';

// Traduit les codes d'erreur Firebase en messages compréhensibles
function messageErreur(error) {
  const code = error?.code || '';
  if (code.includes('invalid-email')) return "Adresse email invalide.";
  if (code.includes('email-already-in-use')) return "Un compte existe déjà avec cet email : connectez-vous.";
  if (code.includes('weak-password')) return "Mot de passe trop court (6 caractères minimum).";
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
    return "Email ou mot de passe incorrect.";
  }
  if (code.includes('too-many-requests')) return "Trop de tentatives, réessayez dans quelques minutes.";
  if (code.includes('operation-not-allowed')) {
    return "La connexion par email/mot de passe n'est pas activée dans la console Firebase (Authentication → Sign-in method).";
  }
  if (code.includes('not-found') || code.includes('failed-precondition')) {
    return "La base de données est introuvable : vérifiez que la base Firestore existe bien et que le site déployé est à jour. " +
      `(détail : ${code})`;
  }
  if (code.includes('permission-denied')) {
    return "Accès refusé par les règles de sécurité Firestore : vérifiez que les règles du guide FIREBASE.md sont publiées sur la bonne base. " +
      `(détail : ${code})`;
  }
  // Erreur inconnue : afficher le détail technique pour pouvoir diagnostiquer
  return `Une erreur est survenue${code ? ` (${code})` : ''} : ${error?.message || 'réessayez.'}`;
}

function ComptePage() {
  const {
    firebaseEnabled, user, syndicat, loading,
    register, login, logout, creerSyndicat, rejoindreSyndicat
  } = useAuth();

  const [mode, setMode] = useState('connexion'); // 'connexion' | 'inscription'
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [nomSyndicat, setNomSyndicat] = useState('');
  const [codeAdhesion, setCodeAdhesion] = useState('');
  const [erreur, setErreur] = useState('');
  const [info, setInfo] = useState('');
  const [enCours, setEnCours] = useState(false);

  const soumettre = async (action) => {
    setErreur('');
    setInfo('');
    setEnCours(true);
    try {
      await action();
    } catch (error) {
      console.error(error);
      setErreur(messageErreur(error));
    } finally {
      setEnCours(false);
    }
  };

  if (!firebaseEnabled) {
    return (
      <div className={styles.page}>
        <h1 className={styles.titre}>Compte et partage</h1>
        <div className={styles.carte}>
          <h2>Mode local</h2>
          <p>
            L'application fonctionne actuellement en <strong>mode local</strong> :
            vos données (cartographie, parcours, résultats...) sont enregistrées
            uniquement sur cet appareil.
          </p>
          <p>
            Pour partager les données entre les militants du syndicat (chacun sur
            son téléphone ou son ordinateur), il faut activer <strong>Firebase</strong> :
            suivez le guide <code>FIREBASE.md</code> à la racine du projet, puis
            redéployez l'application. Cette page se transformera alors en écran
            de connexion.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className={styles.page}><p className={styles.chargement}>Chargement...</p></div>;
  }

  // Connecté : gestion de l'espace syndicat
  if (user) {
    return (
      <div className={styles.page}>
        <h1 className={styles.titre}>Mon compte</h1>

        <div className={styles.carte}>
          <p>
            Connecté en tant que <strong>{user.email}</strong>
            {estAdmin(user) && <span className={styles.badgeAdmin}> 🛡️ Administrateur</span>}
          </p>
          <button className={styles.boutonSecondaire} onClick={() => soumettre(logout)} disabled={enCours}>
            Se déconnecter
          </button>
        </div>

        {estAdmin(user) && <AdminPanel />}

        {syndicat ? (
          <div className={styles.carte}>
            <h2>Espace syndicat</h2>
            <p>
              Vous faites partie de l'espace <strong>« {syndicat.nom} »</strong>.
              Toutes les données des outils sont partagées avec les militants de cet espace.
            </p>
            {syndicat.code && (
              <p className={styles.codeBloc}>
                Code d'adhésion à transmettre aux camarades :{' '}
                <strong className={styles.code}>{syndicat.code}</strong>
              </p>
            )}
          </div>
        ) : (
          <>
            <div className={styles.carte}>
              <h2>Rejoindre un espace syndicat</h2>
              <p>Un camarade a déjà créé l'espace ? Saisissez le code qu'il vous a transmis.</p>
              <div className={styles.ligneFormulaire}>
                <input
                  type="text"
                  placeholder="Code (ex: CGT-7K2M9)"
                  value={codeAdhesion}
                  onChange={(e) => setCodeAdhesion(e.target.value)}
                />
                <button
                  className={styles.bouton}
                  disabled={enCours || !codeAdhesion.trim()}
                  onClick={() => soumettre(async () => {
                    await rejoindreSyndicat(codeAdhesion);
                    setInfo('Bienvenue dans votre espace syndicat !');
                  })}
                >
                  Rejoindre
                </button>
              </div>
            </div>

            <div className={styles.carte}>
              <h2>Créer l'espace de mon syndicat</h2>
              <p>Premier militant à arriver ? Créez l'espace, un code d'adhésion sera généré pour vos camarades.</p>
              <div className={styles.ligneFormulaire}>
                <input
                  type="text"
                  placeholder="Nom du syndicat (ex: CGT Hôpital de Rodez)"
                  value={nomSyndicat}
                  onChange={(e) => setNomSyndicat(e.target.value)}
                />
                <button
                  className={styles.bouton}
                  disabled={enCours || !nomSyndicat.trim()}
                  onClick={() => soumettre(() => creerSyndicat(nomSyndicat.trim()))}
                >
                  Créer
                </button>
              </div>
            </div>
          </>
        )}

        {erreur && <p className={styles.erreur}>{erreur}</p>}
        {info && <p className={styles.info}>{info}</p>}
      </div>
    );
  }

  // Non connecté : connexion / inscription
  return (
    <div className={styles.page}>
      <h1 className={styles.titre}>
        {mode === 'connexion' ? 'Connexion' : 'Créer un compte militant'}
      </h1>

      <div className={styles.carte}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            soumettre(() =>
              mode === 'connexion' ? login(email, motDePasse) : register(email, motDePasse)
            );
          }}
        >
          <label className={styles.champ}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
          <label className={styles.champ}>
            Mot de passe
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              autoComplete={mode === 'connexion' ? 'current-password' : 'new-password'}
              minLength={6}
              required
            />
          </label>
          <button type="submit" className={styles.bouton} disabled={enCours}>
            {enCours ? 'Patientez...' : mode === 'connexion' ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        {erreur && <p className={styles.erreur}>{erreur}</p>}

        <p className={styles.bascule}>
          {mode === 'connexion' ? (
            <>Pas encore de compte ?{' '}
              <button type="button" className={styles.lien} onClick={() => { setMode('inscription'); setErreur(''); }}>
                Créer un compte
              </button>
            </>
          ) : (
            <>Déjà un compte ?{' '}
              <button type="button" className={styles.lien} onClick={() => { setMode('connexion'); setErreur(''); }}>
                Se connecter
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default ComptePage;
