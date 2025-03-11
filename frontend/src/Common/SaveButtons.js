import React from 'react';
import PropTypes from 'prop-types';
import styles from './SaveButtons.module.css';

const SaveButtons = ({ onSaveLocal, onSaveServer, moduleName }) => {
  return (
    <div className={styles.saveButtons}>
      <button onClick={onSaveLocal} className={styles.saveButton}>
        Sauvegarder localement
      </button>
      <button onClick={onSaveServer} className={styles.saveButton}>
        Sauvegarder sur le serveur
      </button>
    </div>
  );
};

SaveButtons.propTypes = {
  onSaveLocal: PropTypes.func.isRequired,
  onSaveServer: PropTypes.func.isRequired,
  moduleName: PropTypes.string.isRequired,
};

export default SaveButtons;
