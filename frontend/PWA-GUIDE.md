# Guide de transformation en PWA - Outils CGT

Ce document détaille les modifications apportées pour transformer l'application React "Outils CGT" en Progressive Web App (PWA) et explique comment la déployer sur Vercel.

## Modifications réalisées

### 1. Activation des Service Workers

- Création du fichier `serviceWorker.js` dans le dossier `src/`
- Modification de `src/index.tsx` pour importer et activer le service worker :
  ```typescript
  import * as serviceWorker from './serviceWorker';
  // ...
  serviceWorker.register();
  ```

### 2. Personnalisation du manifest.json

Le fichier `public/manifest.json` a été modifié avec les valeurs suivantes :
- Nom court : "OutilsCGT"
- Nom complet : "Outils CGT"
- Thème couleur : "#b71c1c" (rouge CGT)
- Mode d'affichage : "standalone"

### 3. Configuration pour Vercel

Un fichier `vercel.json` a été créé à la racine du projet pour faciliter le déploiement sur Vercel.

## Checklist de vérification PWA

Après le déploiement, vérifiez que votre application :

- [ ] Est installable depuis Chrome (une icône "Installer" apparaît dans la barre d'adresse)
- [ ] Est installable depuis Safari sur iOS (via le bouton "Partager" puis "Sur l'écran d'accueil")
- [ ] Affiche l'icône personnalisée sur l'écran d'accueil
- [ ] S'ouvre sans barre d'URL en mode autonome
- [ ] Fonctionne hors ligne (après la première visite)

## Instructions de déploiement sur Vercel

### 1. Pousser le projet sur GitHub

```bash
# Initialiser Git si ce n'est pas déjà fait
git init

# Ajouter tous les fichiers modifiés
git add .

# Créer un commit
git commit -m "Transformation en PWA"

# Ajouter votre dépôt GitHub distant
git remote add origin https://github.com/votre-username/outilscgt.git

# Pousser les modifications
git push -u origin main
```

### 2. Déployer sur Vercel

1. Connectez-vous sur [Vercel](https://vercel.com/)
2. Cliquez sur "New Project"
3. Importez votre dépôt GitHub
4. Configurez le projet :
   - Framework Preset : React
   - Root Directory : `frontend` (si votre projet est dans un sous-dossier)
   - Build Command : laissez la valeur par défaut
   - Output Directory : laissez la valeur par défaut
5. Cliquez sur "Deploy"

Le fichier `vercel.json` s'occupera automatiquement de la configuration correcte pour une application React.

## Notes importantes

- Assurez-vous que les fichiers d'icônes (`logo192.png` et `logo512.png`) existent dans le dossier `public/`
- Pour tester localement la PWA, utilisez `npm run build` puis servez le dossier `build` avec un serveur statique
- Les service workers ne fonctionnent qu'en production, pas en développement
