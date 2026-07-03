// Service de sauvegarde des données des outils.
//
// - saveLocally / loadFromLocal : localStorage (toujours disponible)
// - saveToServer / loadFromServer :
//     * si Firebase est configuré ET que l'utilisateur appartient à un
//       espace syndicat, les données sont partagées dans Firestore
//       (syndicats/{id}/donnees/{cle}) entre tous les militants ;
//     * sinon, repli sur l'ancienne API /api (inexistante en hébergement
//       statique : la fonction renvoie alors false/null proprement).

import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseEnabled } from '../../firebase';

const SYNDICAT_CACHE_KEY = 'cgtSyndicatId';

function syndicatCourantId() {
  return localStorage.getItem(SYNDICAT_CACHE_KEY);
}

function firestoreDisponible() {
  return isFirebaseEnabled && auth?.currentUser && syndicatCourantId();
}

const storageService = {
  saveLocally: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Erreur lors de la sauvegarde locale:", error);
      return false;
    }
  },

  loadFromLocal: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Erreur lors du chargement des données locales:", error);
      return null;
    }
  },

  saveToServer: async (key, data) => {
    if (firestoreDisponible()) {
      try {
        await setDoc(doc(db, 'syndicats', syndicatCourantId(), 'donnees', key), {
          data: JSON.parse(JSON.stringify(data)),
          majPar: auth.currentUser.email,
          majLe: serverTimestamp()
        });
        return true;
      } catch (error) {
        console.error("Erreur lors de la sauvegarde partagée (Firestore):", error);
        return false;
      }
    }
    try {
      const response = await fetch(`/api/save/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      // Sur un hébergement statique, la redirection SPA renvoie index.html avec un
      // statut 200 : une réponse HTML signifie que l'API n'existe pas réellement.
      const contentType = response.headers.get('content-type') || '';
      return response.ok && !contentType.includes('text/html');
    } catch (error) {
      console.error("Erreur lors de la sauvegarde sur le serveur:", error);
      return false;
    }
  },

  loadFromServer: async (key) => {
    if (firestoreDisponible()) {
      try {
        const snapshot = await getDoc(doc(db, 'syndicats', syndicatCourantId(), 'donnees', key));
        return snapshot.exists() ? snapshot.data().data : null;
      } catch (error) {
        console.error("Erreur lors du chargement partagé (Firestore):", error);
        return null;
      }
    }
    try {
      const response = await fetch(`/api/load/${key}`);
      if (response.ok) {
        // Sur un hébergement statique, /api/* renvoie index.html (HTML, pas du JSON) :
        // on considère alors qu'aucune donnée serveur n'est disponible.
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          return null;
        }
        return await response.json();
      } else {
        console.error("Erreur lors du chargement des données depuis le serveur:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données depuis le serveur:", error);
      return null;
    }
  }
};

export default storageService;
