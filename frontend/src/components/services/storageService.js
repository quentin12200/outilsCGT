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
    try {
      const response = await fetch(`/api/save/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.ok;
    } catch (error) {
      console.error("Erreur lors de la sauvegarde sur le serveur:", error);
      return false;
    }
  },

  loadFromServer: async (key) => {
    try {
      const response = await fetch(`/api/load/${key}`);
      if (response.ok) {
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
