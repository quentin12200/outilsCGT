# Activer le partage des données avec Firebase

Sans configuration, l'application fonctionne en **mode local** : chaque
militant garde ses données sur son propre appareil (localStorage).

En activant Firebase (gratuit pour cet usage), vous obtenez :

- **Comptes militants** : connexion par email / mot de passe ;
- **Espace syndicat** : un militant crée l'espace, les autres le rejoignent
  avec un code d'adhésion (ex. `CGT-7K2M9`) affiché sur la page Compte ;
- **Données partagées** : le parcours, la cartographie avancée et les
  résultats sont synchronisés entre tous les membres de l'espace
  (le bouton « Envoyer au serveur » des outils enregistre dans Firestore).

## 1. Créer le projet Firebase (~10 minutes)

1. Allez sur <https://console.firebase.google.com> avec un compte Google.
2. **Créer un projet** → nommez-le par exemple `outils-cgt-aveyron`
   (Google Analytics : inutile, vous pouvez décocher).
3. Dans le projet, cliquez sur l'icône **Web `</>`** (« Ajouter Firebase à
   votre application Web »), nommez l'app `outils-cgt`, puis **copiez le bloc
   `firebaseConfig`** affiché — vous en aurez besoin à l'étape 3.
4. Menu **Création > Authentication** → *Commencer* → onglet
   **Sign-in method** → activez **Adresse e-mail/Mot de passe**.
5. Menu **Création > Firestore Database** → *Créer une base de données* →
   choisissez l'emplacement `europe-west` → démarrez en **mode production**.

## 2. Mettre en place les règles de sécurité Firestore

Dans **Firestore Database > Règles**, remplacez le contenu par :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Profil de l'utilisateur : lisible/modifiable par lui seul
    match /utilisateurs/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    match /syndicats/{syndicatId} {
      // Tout utilisateur connecté peut lire une fiche syndicat
      // (nécessaire pour rejoindre avec un code) et en créer une.
      allow read: if request.auth != null;
      allow create: if request.auth != null;

      // Membres : chacun peut s'ajouter lui-même, les membres se lisent
      match /membres/{uid} {
        allow read: if request.auth != null;
        allow write: if request.auth != null && request.auth.uid == uid;
      }

      // Données des outils : réservées aux membres de l'espace
      match /donnees/{document} {
        allow read, write: if request.auth != null &&
          exists(/databases/$(database)/documents/syndicats/$(syndicatId)/membres/$(request.auth.uid));
      }
    }
  }
}
```

Cliquez sur **Publier**.

## 3. Donner la configuration à l'application

**Déjà fait** : la configuration du projet `outilsdemarche-e9671` est intégrée
dans `frontend/src/firebase.js` (ces clés web ne sont pas des secrets : la
sécurité repose sur les règles Firestore de l'étape 2).

Pour pointer un jour vers un autre projet Firebase sans toucher au code,
définissez les variables `REACT_APP_FIREBASE_*` (fichier `frontend/.env.local`
en local, ou **Settings > Environment Variables** sur Vercel) — elles ont
priorité sur les valeurs intégrées. Modèle dans `frontend/.env.example`.

> ⚠️ Ne jamais mettre dans le code ou dans git une clé de **compte de
> service** (fichier JSON contenant `private_key`) : celle-là est un vrai
> secret d'administration, et l'application n'en a pas besoin.

## 4. Rebuilder et déployer

```bash
cd frontend
npm run build
```

C'est tout : la page **Compte** propose maintenant l'inscription, la création
d'un espace syndicat et l'adhésion par code, et la page **Mon parcours**
affiche « Progression partagée avec le syndicat ».

## Premiers pas côté militant

1. Chaque militant crée son compte sur la page **Compte** ;
2. Le premier crée l'espace du syndicat → un code `CGT-XXXXX` est généré ;
3. Il transmet le code aux camarades, qui cliquent sur **Rejoindre** ;
4. À partir de là, parcours, cartographie avancée et résultats sont communs.
