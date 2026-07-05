// src/hooks/useSyncTempsReel.js
// Synchronisation temps réel des données partagées du syndicat.
//
// S'abonne au document Firestore syndicats/{id}/donnees/{cle} : dès qu'un
// camarade modifie la donnée (coche une étape, ajoute une revendication...),
// le callback reçoit la nouvelle version sans recharger la page.
//
// - Ne fait rien si Firebase n'est pas configuré ou si l'utilisateur n'est
//   pas dans un espace syndicat (l'application reste en mode local).
// - Ignore l'écho de nos propres écritures (metadata.hasPendingWrites),
//   sinon deux appareils ouverts se renverraient la donnée en boucle.

import { useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseEnabled } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function useSyncTempsReel(cle, onDonnees) {
  const { user, syndicat } = useAuth();

  // Le callback est gardé dans une ref pour ne pas se réabonner à chaque rendu
  const callbackRef = useRef(onDonnees);
  callbackRef.current = onDonnees;

  useEffect(() => {
    if (!isFirebaseEnabled || !user || !syndicat?.id) return undefined;

    const reference = doc(db, 'syndicats', syndicat.id, 'donnees', cle);
    const desabonner = onSnapshot(
      reference,
      (instantane) => {
        // Nos propres écritures reviennent aussi par ce canal : on les ignore
        if (instantane.metadata.hasPendingWrites) return;
        if (instantane.exists()) {
          callbackRef.current(instantane.data().data);
        }
      },
      (erreur) => {
        console.error(`Synchronisation temps réel (${cle}):`, erreur);
      }
    );
    return desabonner;
  }, [cle, user, syndicat?.id]);
}
