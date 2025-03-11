// src/services/storageService.js

/**
 * Service pour gérer la sauvegarde des données
 */
const storageService = {
    /**
     * Sauvegarde des données localement (localStorage)
     * @param {string} moduleName - Nom du module pour la sauvegarde
     * @param {Object} data - Données à sauvegarder
     * @returns {Promise} - Promesse résolue une fois la sauvegarde effectuée
     */
    saveLocally: (moduleName, data) => {
      return new Promise((resolve, reject) => {
        try {
          localStorage.setItem(`${moduleName}Data`, JSON.stringify(data));
          console.log(`Données ${moduleName} sauvegardées localement`);
          // Simuler un délai pour l'effet visuel
          setTimeout(() => resolve(), 300);
        } catch (error) {
          console.error(`Erreur lors de la sauvegarde locale des données ${moduleName}:`, error);
          reject(error);
        }
      });
    },
  
    /**
     * Sauvegarde des données sur le serveur (API)
     * @param {string} moduleName - Nom du module pour la sauvegarde
     * @param {Object} data - Données à sauvegarder
     * @returns {Promise} - Promesse résolue une fois la sauvegarde effectuée
     */
    saveToServer: (moduleName, data) => {
      return new Promise((resolve, reject) => {
        // Simuler un appel API pour l'instant
        // À remplacer par un vrai appel API quand votre backend sera prêt
        console.log(`Sauvegarde serveur ${moduleName} simulation`, data);
        
        // Simuler un délai et une réponse serveur
        setTimeout(() => {
          // Simuler 90% de succès, 10% d'échec pour le test
          if (Math.random() < 0.9) {
            resolve({ success: true, message: 'Données sauvegardées avec succès' });
          } else {
            reject(new Error('Erreur de connexion au serveur'));
          }
        }, 800);
        
        // Implémentation réelle pour plus tard:
        /*
        fetch(`/api/${moduleName}/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erreur HTTP ${response.status}`);
            }
            return response.json();
          })
          .then(responseData => resolve(responseData))
          .catch(error => reject(error));
        */
      });
    },
  
    /**
     * Charge des données depuis le stockage local
     * @param {string} moduleName - Nom du module à charger
     * @returns {Object|null} - Données chargées ou null si aucune donnée
     */
    loadFromLocal: (moduleName) => {
      try {
        const savedData = localStorage.getItem(`${moduleName}Data`);
        if (savedData) {
          return JSON.parse(savedData);
        }
        return null;
      } catch (error) {
        console.error(`Erreur lors du chargement des données ${moduleName}:`, error);
        return null;
      }
    },
  
    /**
     * Charge des données depuis le serveur
     * @param {string} moduleName - Nom du module à charger
     * @returns {Promise} - Promesse résolue avec les données chargées
     */
    loadFromServer: (moduleName) => {
      return new Promise((resolve, reject) => {
        // Simuler un appel API pour l'instant
        console.log(`Chargement serveur ${moduleName} simulation`);
        
        // Simuler un délai et une réponse serveur
        setTimeout(() => {
          // Simuler 90% de succès, 10% d'échec pour le test
          if (Math.random() < 0.9) {
            // Essayer d'abord de charger les données locales pour la simulation
            const localData = storageService.loadFromLocal(moduleName);
            resolve(localData || { message: 'Aucune donnée disponible' });
          } else {
            reject(new Error('Erreur de connexion au serveur'));
          }
        }, 800);
        
        // Implémentation réelle pour plus tard:
        /*
        fetch(`/api/${moduleName}/load`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erreur HTTP ${response.status}`);
            }
            return response.json();
          })
          .then(data => resolve(data))
          .catch(error => reject(error));
        */
      });
    }
  };
  
  export default storageService;