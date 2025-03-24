import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import styles from './ExcelImporter.module.css';
import axios from 'axios';

const ExcelImporter = ({ onImportComplete }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [importedData, setImportedData] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setError(null);
  };

  const handleImport = async () => {
    if (!file) {
      setError('Veuillez sélectionner un fichier Excel.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Lire le fichier Excel
      const data = await readExcelFile(file);
      
      // Nettoyer les données
      const cleanedData = cleanExcelData(data);
      
      if (cleanedData.length === 0) {
        setError('Le fichier ne contient pas de données valides.');
        setIsLoading(false);
        return;
      }

      // Traiter les données selon le type de fichier
      let processedData;
      const fileType = 'red_score';
      if (fileType === 'red_score') {
        processedData = processRedScoreData(cleanedData);
      } else {
        setError('Type de fichier non pris en charge.');
        setIsLoading(false);
        return;
      }

      if (processedData.length === 0) {
        setError('Aucune donnée valide n\'a pu être extraite du fichier.');
      } else {
        setImportedData(processedData);
        console.log('Données importées avec succès:', processedData);
      }
    } catch (error) {
      console.error('Erreur lors de l\'importation:', error);
      setError(`Erreur lors de l'importation: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const processRedScoreData = (data) => {
    console.log('Traitement des données Red Score:', data.length, 'lignes');

    const rawData = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];

      if (row && typeof row === 'object' && Object.keys(row).length >= 5) {
        console.log(`Traitement de la ligne ${i+1}:`, row.raison_sociale || row.RAISON_SOCIALE || 'Nom inconnu');

        try {
          const normalizedRow = {};
          Object.keys(row).forEach(key => {
            normalizedRow[key.toLowerCase()] = row[key];
          });
          
          const electoralCycle = normalizedRow.cycle || '';
          const siret = normalizedRow.siret ? String(normalizedRow.siret).replace(/\D/g, '') : '';
          const idPv = normalizedRow.id_pv || '';
          const federation = normalizedRow.fd || '';
          const idcc = normalizedRow.idcc || '';
          const legalName = normalizedRow.raison_sociale || 'Entreprise inconnue';
          const department = normalizedRow.departement || '';
          const city = normalizedRow.ville || '';
          const address = normalizedRow.adresse_1 || '';
          const institution = normalizedRow.institution || '';
          
          let collegeComposition = normalizedRow.compo_coll || '';
          let college = normalizedRow.deno_coll || '';
          
          if (typeof collegeComposition === 'number') {
            collegeComposition = 'Titulaires';
            college = `Collège ${collegeComposition}`;
          } else if (!collegeComposition) {
            collegeComposition = 'Titulaires';
          }
          
          if (typeof college === 'number') {
            college = `Collège ${college}`;
          } else if (!college) {
            college = 'Collège unique';
          }
          
          const rawDate = normalizedRow.date_scrutin;
          
          let mandateDuration = '';
          const rawMandateDuration = normalizedRow.duree_mandat || normalizedRow.duree_mand;
          
          if (typeof rawMandateDuration === 'string') {
            mandateDuration = rawMandateDuration.replace(/\D/g, '');
          } else {
            mandateDuration = rawMandateDuration || '';
          }
          
          const nextElectionDate = normalizedRow.date_prochain_scrutin || normalizedRow.date_prochain || '';

          let registeredVoters = 0;
          let validVotes = 0;
          let blankNullVotes = 0;
          let sveVotes = 0;
          
          try {
            registeredVoters = parseInt(String(normalizedRow.num_inscrits || normalizedRow.nb_inscrits || '0').replace(/\D/g, '')) || 0;
            validVotes = parseInt(String(normalizedRow.num_votants || '0').replace(/\D/g, '')) || 0;
            blankNullVotes = parseInt(String(normalizedRow.num_blanc_nul || '0').replace(/\D/g, '')) || 0;
            sveVotes = parseInt(String(normalizedRow.num_sve || '0').replace(/\D/g, '')) || 0;
          } catch (error) {
            console.warn(`Ligne ${i+1}: Erreur lors de la conversion des valeurs numériques:`, error);
          }

          const correctedRegisteredVoters = registeredVoters > 100000 ? 0 : registeredVoters;
          const correctedValidVotes = validVotes;
          const correctedBlankNullVotes = blankNullVotes;

          if (correctedValidVotes > correctedRegisteredVoters && correctedRegisteredVoters > 0) {
            const warning = `Ligne ${i+1}: Le nombre de votes valides (${correctedValidVotes}) est supérieur au nombre d'inscrits (${correctedRegisteredVoters}). Correction automatique appliquée.`;
            console.warn(warning);

            const adjustedRegisteredVoters = Math.max(correctedValidVotes, correctedRegisteredVoters);
            console.log(`Correction: nombre d'inscrits ajusté à ${adjustedRegisteredVoters}`);
          }

          let date = new Date();
          let formattedDate = '';
          
          if (rawDate) {
            try {
              if (typeof rawDate === 'number') {
                date = new Date((rawDate - 25569) * 86400 * 1000);
              } else if (rawDate instanceof Date) {
                date = rawDate;
              } else if (typeof rawDate === 'string') {
                if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
                  date = new Date(rawDate);
                  formattedDate = rawDate;
                } else {
                  const parts = rawDate.split(/[\/\-\.]/);
                  if (parts.length === 3) {
                    if (parts[0].length <= 2 && parts[1].length <= 2 && parts[2].length === 4) {
                      date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                    } 
                    else if (parts[2].length <= 2 && parts[1].length <= 2 && parts[0].length === 4) {
                      date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                    } 
                    else {
                      date = new Date(rawDate);
                    }
                  } else {
                    date = new Date(rawDate);
                  }
                }
              }

              if (isNaN(date.getTime())) {
                throw new Error("Date invalide");
              }

              const currentYear = new Date().getFullYear();
              if (date.getFullYear() < 2018 || date.getFullYear() > currentYear) {
                console.warn(`Ligne ${i+1}: Date hors plage raisonnable: ${date.toISOString().split('T')[0]}`);
                date = new Date(2022, 11, 31);
                console.log(`Correction: date ajustée à ${date.toISOString().split('T')[0]}`);
              }
              
              if (!formattedDate) {
                formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              }
              
            } catch (error) {
              console.error('Erreur lors de la conversion de la date:', rawDate, error);
              date = new Date(2022, 11, 31);
              formattedDate = '2022-12-31';
            }
          } else {
            date = new Date(2022, 11, 31);
            formattedDate = '2022-12-31';
          }

          let formattedNextElectionDate = null;
          
          if (nextElectionDate) {
            try {
              let nextElectionDateObj = null;
              
              if (typeof nextElectionDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(nextElectionDate)) {
                nextElectionDateObj = new Date(nextElectionDate);
                formattedNextElectionDate = nextElectionDate;
              } else if (typeof nextElectionDate === 'number') {
                nextElectionDateObj = new Date((nextElectionDate - 25569) * 86400 * 1000);
              } else if (nextElectionDate instanceof Date) {
                nextElectionDateObj = nextElectionDate;
              } else if (typeof nextElectionDate === 'string') {
                const parts = nextElectionDate.split(/[\/\-\.]/);
                if (parts.length === 3) {
                  if (parts[0].length <= 2 && parts[1].length <= 2 && parts[2].length === 4) {
                    nextElectionDateObj = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                  } 
                  else if (parts[2].length <= 2 && parts[1].length <= 2 && parts[0].length === 4) {
                    nextElectionDateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                  } 
                  else {
                    nextElectionDateObj = new Date(nextElectionDate);
                  }
                } else {
                  nextElectionDateObj = new Date(nextElectionDate);
                }
              }

              if (isNaN(nextElectionDateObj.getTime())) {
                throw new Error("Date de prochaine élection invalide");
              }

              if (nextElectionDateObj < date) {
                nextElectionDateObj = null;
              } else {
                formattedNextElectionDate = `${nextElectionDateObj.getFullYear()}-${String(nextElectionDateObj.getMonth() + 1).padStart(2, '0')}-${String(nextElectionDateObj.getDate()).padStart(2, '0')}`;
              }
            } catch (error) {
              console.error('Erreur lors de la conversion de la date de prochaine élection:', nextElectionDate, error);
            }
          }

          const correctedElectoralCycle = validateElectoralCycle(electoralCycle, date);

          const siretNumber = siret ? parseInt(siret) : 0;

          const company = legalName;
          const sector = idcc;

          rawData.push({
            company,
            legalName,
            siret: siretNumber,
            idPv,
            sector,
            federation,
            date: formattedDate,
            electoralCycle: correctedElectoralCycle,
            college,
            collegeComposition,
            department,
            city,
            address,
            institution,
            mandateDuration: parseInt(mandateDuration) || 4,
            nextElectionDate: formattedNextElectionDate,
            registeredVoters: correctedRegisteredVoters,
            validVotes: correctedValidVotes,
            blankNullVotes: correctedBlankNullVotes,
            results: []
          });
        } catch (error) {
          console.error(`Erreur lors du traitement de la ligne ${i+1}:`, error);
        }
      } else {
        console.warn(`Ligne ${i+1} ignorée: données insuffisantes`, row);
      }
    }

    console.log('Données brutes traitées:', rawData.length, 'entrées');

    for (let i = 0; i < rawData.length; i++) {
      const item = rawData[i];
      const originalRow = data[i];

      try {
        const normalizedRow = {};
        Object.keys(originalRow).forEach(key => {
          normalizedRow[key.toLowerCase()] = originalRow[key];
        });
        
        const cgtVotes = parseInt(String(normalizedRow.score_cgt || '0').replace(/\D/g, '')) || 0;
        
        if (cgtVotes > 0) {
          const cgtPercentage = item.validVotes > 0 ? (cgtVotes / item.validVotes) * 100 : 0;

          item.results.push({
            union: 'CGT',
            votes: cgtVotes,
            percentage: parseFloat(cgtPercentage.toFixed(1)),
            seats: 0
          });
        }

        const unions = [
          { name: 'CFDT', key: 'score_cfdt' },
          { name: 'FO', key: 'score_fo' },
          { name: 'CFTC', key: 'score_cftc' },
          { name: 'CFE-CGC', key: 'score_cgc', altKey: 'score_cfe_cgc' },
          { name: 'UNSA', key: 'score_unsa' },
          { name: 'SOLIDAIRES', key: 'score_solidaire', altKey: 'score_solidaires' },
          { name: 'AUTRES', key: 'score_autre', altKey: 'score_autres' }
        ];

        unions.forEach(union => {
          let votes = 0;
          
          if (normalizedRow[union.key] !== undefined && normalizedRow[union.key] !== '') {
            votes = parseInt(String(normalizedRow[union.key] || '0').replace(/\D/g, '')) || 0;
          } 
          else if (union.altKey && normalizedRow[union.altKey] !== undefined && normalizedRow[union.altKey] !== '') {
            votes = parseInt(String(normalizedRow[union.altKey] || '0').replace(/\D/g, '')) || 0;
          }

          if (votes > 0) {
            if (votes <= item.validVotes) {
              const percentage = item.validVotes > 0 ? (votes / item.validVotes) * 100 : 0;
              
              item.results.push({
                union: union.name,
                votes: votes,
                percentage: parseFloat(percentage.toFixed(1)),
                seats: 0
              });
            } else {
              const warning = `Ligne ${i+1}: Le syndicat ${union.name} a plus de voix (${votes}) que le total des votes valides (${item.validVotes}). Valeur ajustée.`;
              console.warn(warning);

              const adjustedVotes = Math.min(votes, item.validVotes);
              const percentage = item.validVotes > 0 ? (adjustedVotes / item.validVotes) * 100 : 0;
              
              item.results.push({
                union: union.name,
                votes: adjustedVotes,
                percentage: parseFloat(percentage.toFixed(1)),
                seats: 0
              });
            }
          }
        });
      } catch (error) {
        console.error(`Erreur lors du traitement des résultats pour l'entrée ${i}:`, error);
      }
    }

    return rawData;
  };

  const saveImportedData = async () => {
    if (!importedData || importedData.length === 0) {
      setError('Aucune donnée à sauvegarder.');
      return;
    }

    setIsLoading(true);
    setSaveError(null);

    try {
      // Limiter les données à envoyer pour éviter les problèmes de taille
      const simplifiedData = importedData.map(item => ({
        company: item.company,
        legalName: item.legalName,
        siret: item.siret,
        idPv: item.idPv,
        sector: item.sector,
        federation: item.federation,
        date: item.date,
        electoralCycle: item.electoralCycle,
        college: item.college,
        collegeComposition: item.collegeComposition,
        department: item.department,
        city: item.city,
        address: item.address,
        institution: item.institution,
        mandateDuration: item.mandateDuration,
        nextElectionDate: item.nextElectionDate,
        registeredVoters: item.registeredVoters,
        validVotes: item.validVotes,
        blankNullVotes: item.blankNullVotes,
        results: item.results
      }));

      // Envoyer les données au serveur
      const response = await axios.post('/api/elections/import-results', {
        data: simplifiedData
      });

      console.log('Réponse du serveur:', response.data);
      
      if (response.data.success) {
        setSaveSuccess(true);
        // Réinitialiser après quelques secondes
        setTimeout(() => {
          setSaveSuccess(false);
          setImportedData(null);
          setFile(null);
        }, 3000);
      } else {
        setSaveError(response.data.message || 'Erreur lors de la sauvegarde des données.');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setSaveError(`Erreur lors de la sauvegarde: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          console.log('Données Excel lues:', jsonData.length, 'lignes');
          console.log('Exemple de données:', jsonData.length > 0 ? jsonData[0] : 'Aucune donnée');
          
          resolve(jsonData);
        } catch (error) {
          console.error('Erreur lors de la lecture du fichier Excel:', error);
          reject(new Error(`Erreur lors de la lecture du fichier Excel: ${error.message}`));
        }
      };
      reader.onerror = (error) => {
        console.error('Erreur lors de la lecture du fichier:', error);
        reject(new Error('Erreur lors de la lecture du fichier'));
      };
      reader.readAsBinaryString(file);
    });
  };

  const cleanExcelData = (data) => {
    const filteredData = data.filter(row => {
      return row && typeof row === 'object' && Object.keys(row).length > 0;
    });
    
    console.log('Données filtrées:', filteredData.length, 'lignes');
    
    return filteredData;
  };

  return (
    <div className={styles.excelImporter}>
      <h3>Importer les résultats depuis Excel</h3>
      
      <div className={styles.fileInput}>
        <input
          type="file"
          id="pv_red_score_file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <button 
          className={styles.importButton} 
          onClick={handleImport}
          disabled={!file || isLoading}
        >
          {isLoading ? 'Importation en cours...' : 'Parcourir'}
        </button>
      </div>
      
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      
      {importedData && (
        <div className={styles.importSuccess}>
          <p>Importation réussie! {importedData.length} entrées importées.</p>
          <button 
            className={styles.saveButton} 
            onClick={saveImportedData}
            disabled={isLoading}
          >
            Importer les données
          </button>
          {saveSuccess && (
            <div className={styles.saveSuccess}>
              Données sauvegardées avec succès!
            </div>
          )}
          {saveError && (
            <div className={styles.saveError}>
              {saveError}
            </div>
          )}
        </div>
      )}
      
      {!importedData && (
        <div className={styles.formatInfo}>
          <h4>Format attendu du fichier Excel :</h4>
          <ul>
            <li>Colonne A: Cycle électoral</li>
            <li>Colonne B: SIRET</li>
            <li>Colonne C: ID PV</li>
            <li>Colonne D: Fédération</li>
            <li>Colonne E: IDCC</li>
            <li>Colonne F: Raison sociale</li>
            <li>Colonne G: Département</li>
            <li>Colonne H: Ville</li>
            <li>Colonne I: Adresse</li>
            <li>Colonne J: Institution</li>
            <li>Colonne K: Composition collège</li>
            <li>Colonne L: Dénomination collège</li>
            <li>Colonne M: Date du scrutin</li>
            <li>Colonne N: Durée du mandat</li>
            <li>Colonne O: Date du prochain scrutin</li>
            <li>Colonne P: Nombre d'inscrits</li>
            <li>Colonne Q: Nombre de votants</li>
            <li>Colonne R: Nombre de votes blancs/nuls</li>
            <li>Colonne S: Nombre de suffrages valablement exprimés (SVE)</li>
            <li>Colonne T: Score CGT</li>
            <li>Colonne U: Score CFDT</li>
            <li>Colonne V: Score FO</li>
            <li>Colonne W: Score CFTC</li>
            <li>Colonne X: Score CFE-CGC</li>
            <li>Colonne Y: Score UNSA</li>
            <li>Colonne Z: Score SOLIDAIRES</li>
            <li>Colonne AA: Score AUTRES</li>
          </ul>
          <p>
            <a href="/templates/modele_pv_red_score.xlsx" download>
              Télécharger le modèle Excel
            </a>
          </p>
        </div>
      )}
      
      <div className={styles.debugControls}>
        <label>
          <input 
            type="checkbox" 
            checked={debugMode} 
            onChange={(e) => setDebugMode(e.target.checked)} 
          />
          Mode debug
        </label>
      </div>
    </div>
  );
};

export default ExcelImporter;
