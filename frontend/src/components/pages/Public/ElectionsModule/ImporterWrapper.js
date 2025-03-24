import React from 'react';
import SimpleExcelImporter from '../../../ElectionsModule/SimpleExcelImporter';
import styles from './ImporterWrapper.module.css';

const ImporterWrapper = ({ onImportComplete }) => {
  return (
    <div className={styles.importerWrapper}>
      <SimpleExcelImporter onImportComplete={onImportComplete} />
      <div className={styles.instructions}>
        <h4>Instructions pour l'importation</h4>
        <ul>
          <li>Sélectionnez un fichier Excel (.xlsx ou .xls) contenant les résultats électoraux</li>
          <li>Cliquez sur "Importer" pour traiter les données</li>
          <li>Une fois l'importation terminée, vous pouvez :
            <ul>
              <li><strong>Exporter en JSON</strong> : Télécharger les données au format JSON</li>
              <li><strong>Sauvegarder pour l'application</strong> : Enregistrer les données pour qu'elles soient chargées automatiquement au prochain démarrage</li>
              <li><strong>Sauvegarder les données</strong> : Enregistrer les données dans la base de données (si configuré)</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImporterWrapper;
