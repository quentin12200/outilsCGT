// Initialisation de Firebase.
//
// L'application fonctionne SANS Firebase : tant que la configuration
// ci-dessous n'est pas renseignée (fichier .env.local, voir FIREBASE.md),
// toutes les données restent en localStorage comme avant.
// Dès que les clés sont présentes, l'authentification et le partage
// des données entre militants du même syndicat s'activent.

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration du projet « outilsdemarche » (clés web publiques : la
// sécurité repose sur les règles Firestore, pas sur ces valeurs).
// Des variables d'environnement REACT_APP_FIREBASE_* peuvent les remplacer
// pour pointer vers un autre projet sans toucher au code.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyDHMoRY7pSUw-e-UNNO5qqRWeiiGF-5PGA',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'outilsdemarche-e9671.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'outilsdemarche-e9671',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'outilsdemarche-e9671.firebasestorage.app',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '598409161770',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:598409161770:web:66af9f1802f0435b1c6753'
};

// La base Firestore du projet porte l'identifiant « databasedemarche »
// (et non « (default) ») : il faut le préciser à la connexion.
const FIRESTORE_DB_ID = process.env.REACT_APP_FIRESTORE_DB || 'databasedemarche';

// Firebase est considéré configuré si les deux clés essentielles sont là
export const isFirebaseEnabled = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app = null;
let auth = null;
let db = null;

if (isFirebaseEnabled) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app, FIRESTORE_DB_ID);
}

export { app, auth, db };
