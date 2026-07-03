// Contexte d'authentification et d'espace syndicat.
//
// Sans Firebase configuré : user reste null et l'application fonctionne
// en mode local (localStorage), comme avant.
// Avec Firebase : connexion par email/mot de passe, et chaque utilisateur
// rejoint un « espace syndicat » (créé ou rejoint avec un code) dont les
// données sont partagées entre tous ses membres.

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db, isFirebaseEnabled } from '../firebase';

const AuthContext = createContext({
  firebaseEnabled: false,
  user: null,
  syndicat: null,
  loading: false
});

// Le syndicat courant est aussi gardé en localStorage pour que les
// services non-React (storageService) sachent où lire/écrire.
const SYNDICAT_CACHE_KEY = 'cgtSyndicatId';

function genererCode() {
  // Code d'adhésion lisible, ex: "CGT-7K2M9"
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `CGT-${code}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [syndicat, setSyndicat] = useState(null);
  const [loading, setLoading] = useState(isFirebaseEnabled);

  useEffect(() => {
    if (!isFirebaseEnabled) return undefined;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const profil = await getDoc(doc(db, 'utilisateurs', firebaseUser.uid));
          const syndicatId = profil.exists() ? profil.data().syndicatId : null;
          if (syndicatId) {
            const syndicatDoc = await getDoc(doc(db, 'syndicats', syndicatId));
            if (syndicatDoc.exists()) {
              setSyndicat({ id: syndicatDoc.id, ...syndicatDoc.data() });
              localStorage.setItem(SYNDICAT_CACHE_KEY, syndicatDoc.id);
            }
          }
        } catch (error) {
          console.error('Erreur lors du chargement du profil:', error);
        }
      } else {
        setSyndicat(null);
        localStorage.removeItem(SYNDICAT_CACHE_KEY);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const creerSyndicat = async (nom) => {
    const code = genererCode();
    const syndicatRef = doc(collection(db, 'syndicats'));
    const donnees = {
      nom,
      code,
      creePar: user.uid,
      creeLe: serverTimestamp()
    };
    await setDoc(syndicatRef, donnees);
    await setDoc(doc(db, 'syndicats', syndicatRef.id, 'membres', user.uid), {
      email: user.email,
      role: 'admin',
      ajouteLe: serverTimestamp()
    });
    await setDoc(doc(db, 'utilisateurs', user.uid), {
      email: user.email,
      syndicatId: syndicatRef.id
    });
    setSyndicat({ id: syndicatRef.id, nom, code });
    localStorage.setItem(SYNDICAT_CACHE_KEY, syndicatRef.id);
  };

  const rejoindreSyndicat = async (code) => {
    const recherche = query(
      collection(db, 'syndicats'),
      where('code', '==', code.trim().toUpperCase())
    );
    const resultats = await getDocs(recherche);
    if (resultats.empty) {
      throw new Error("Aucun syndicat trouvé avec ce code. Vérifiez-le auprès de la personne qui a créé l'espace.");
    }
    const syndicatDoc = resultats.docs[0];
    await setDoc(doc(db, 'syndicats', syndicatDoc.id, 'membres', user.uid), {
      email: user.email,
      role: 'membre',
      ajouteLe: serverTimestamp()
    });
    await setDoc(doc(db, 'utilisateurs', user.uid), {
      email: user.email,
      syndicatId: syndicatDoc.id
    });
    setSyndicat({ id: syndicatDoc.id, ...syndicatDoc.data() });
    localStorage.setItem(SYNDICAT_CACHE_KEY, syndicatDoc.id);
  };

  const value = {
    firebaseEnabled: isFirebaseEnabled,
    user,
    syndicat,
    loading,
    register,
    login,
    logout,
    creerSyndicat,
    rejoindreSyndicat
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
