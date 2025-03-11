// src/components/Common/SaveButtons.js
import React, { useState } from 'react';
import styles from './SaveButtons.module.css';

/**
 * Composant réutilisable pour les boutons de sauvegarde
 * @param {Object} props - Les propriétés du composant
 * @param {Function} props.onSaveLocal - Fonction appelée lors de la sauvegarde locale
 * @param {Function} props.onSaveServer - Fonction appelée lors de la sauvegarde sur le serveur
 * @param {string} props.moduleName - Nom du module pour la sauvegarde (ex: "cartographie", "retroplanning")
 */
const SaveButtons = ({ onSaveLocal, onSaveServer, moduleName }) => {
  const [savedMessage, setSavedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveLocal = async () => {
    try {
      setIsLoading(true);
      await onSaveLocal();
      setSavedMessage('Données sauvegardées localement');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde locale:', error);
      setSavedMessage('Erreur lors de la sauvegarde locale');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveServer = async () => {
    try {
      setIsLoading(true);
      await onSaveServer();
      setSavedMessage('Données envoyées au serveur');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde sur le serveur:', error);
      setSavedMessage('Erreur lors de la sauvegarde sur le serveur');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.saveContainer}>
      <div className={styles.messageContainer}>
        {savedMessage && <div className={styles.saveMessage}>{savedMessage}</div>}
      </div>
      <div className={styles.buttonsContainer}>
        <button 
          className={`${styles.saveButton} ${styles.localButton}`}
          onClick={handleSaveLocal}
          disabled={isLoading}
        >
          {isLoading ? 'Sauvegarde...' : 'Sauvegarder localement'}
        </button>
        <button 
          className={`${styles.saveButton} ${styles.serverButton}`}
          onClick={handleSaveServer}
          disabled={isLoading}
        >
          {isLoading ? 'Sauvegarde...' : 'Envoyer au serveur'}
        </button>
      </div>
    </div>
  );
};

export default SaveButtons;