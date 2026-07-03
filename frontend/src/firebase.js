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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

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
  db = getFirestore(app);
}

export { app, auth, db };
