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

Créez le fichier `frontend/.env.local` (il n'est pas committé dans git)
avec les valeurs du bloc `firebaseConfig` copié à l'étape 1.3 :

```
REACT_APP_FIREBASE_API_KEY=AIza...
REACT_APP_FIREBASE_AUTH_DOMAIN=outils-cgt-aveyron.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=outils-cgt-aveyron
REACT_APP_FIREBASE_STORAGE_BUCKET=outils-cgt-aveyron.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1234567890
REACT_APP_FIREBASE_APP_ID=1:1234567890:web:abcdef
```

> Ces clés web ne sont pas des secrets : la sécurité repose sur les règles
> Firestore de l'étape 2. Sur Netlify, ajoutez les mêmes variables dans
> **Site settings > Environment variables** pour que le site déployé les ait.

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
