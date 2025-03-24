import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import styles from './ExcelImporter.module.css';

const ExcelImporter = ({ onImportComplete }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setError(null);
    setWarnings([]);
    setSuccess(false);
  };

  const handleImport = async () => {
    if (!file) {
      setError('Veuillez sélectionner un fichier Excel.');
      return;
    }

    // Vérifier l'extension du fichier
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
      setError('Le fichier doit être au format Excel (.xlsx ou .xls).');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setWarnings([]);
      setSuccess(false);

      console.log('Début de l\'importation du fichier:', file.name);
      
      // Lire le fichier Excel
      const data = await readExcelFile(file);

      if (data && data.length > 0) {
        console.log('Données brutes lues:', data.length, 'lignes');
        
        // Nettoyer les données avant traitement
        const cleanedData = cleanExcelData(data);

        // Vérifier si nous avons des données après nettoyage
        if (cleanedData.length === 0) {
          setError('Aucune donnée valide n\'a été trouvée dans le fichier après nettoyage.');
          setIsLoading(false);
          return;
        }

        console.log('Données nettoyées:', cleanedData.length, 'lignes');

        // Collecter les avertissements pendant le traitement
        const collectedWarnings = [];

        try {
          // Traiter les données selon le format attendu
          let processedData = processRedScoreData(cleanedData, collectedWarnings);
          console.log('Données traitées avant validation:', processedData.length, 'entrées');

          if (processedData.length > 0) {
            try {
              // Vérification supplémentaire des dates avant sauvegarde
              processedData = processedData.map(item => {
                try {
                  // Vérifier que la date est au format YYYY-MM-DD
                  if (!item.date || typeof item.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
                    const warning = `Date invalide pour ${item.company}: ${item.date}. Utilisation de la date par défaut.`;
                    console.warn(warning);
                    collectedWarnings.push(warning);
                    return {
                      ...item,
                      date: '2022-12-31' // Date par défaut
                    };
                  }
                  
                  // Vérifier que nextElectionDate est soit null soit au format YYYY-MM-DD
                  if (item.nextElectionDate && (typeof item.nextElectionDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item.nextElectionDate))) {
                    const warning = `Date de prochaine élection invalide pour ${item.company}: ${item.nextElectionDate}. Mise à null.`;
                    console.warn(warning);
                    collectedWarnings.push(warning);
                    return {
                      ...item,
                      nextElectionDate: null
                    };
                  }
                  
                  return item;
                } catch (err) {
                  console.error('Erreur lors de la validation des dates pour', item.company, err);
                  collectedWarnings.push(`Erreur lors de la validation des dates pour ${item.company}: ${err.message}`);
                  return {
                    ...item,
                    date: '2022-12-31',
                    nextElectionDate: null
                  };
                }
              });
              
              console.log('Données après validation des dates:', processedData.length, 'entrées');
              
              // Vérifier que toutes les données requises sont présentes et valides
              processedData = processedData.filter(item => {
                try {
                  if (!item.company || !item.date || !item.registeredVoters || !item.validVotes) {
                    const warning = `Données incomplètes pour ${item.company || 'une entreprise'}. Entrée ignorée.`;
                    console.warn(warning);
                    collectedWarnings.push(warning);
                    return false;
                  }
                  return true;
                } catch (err) {
                  console.error('Erreur lors du filtrage des données pour', item, err);
                  return false;
                }
              });
              
              console.log('Données après filtrage:', processedData.length, 'entrées');
              
              if (processedData.length === 0) {
                setError('Après validation, aucun résultat valide n\'a pu être extrait du fichier.');
                setWarnings(collectedWarnings);
                setIsLoading(false);
                return;
              }

              // Convertir les données en JSON pour vérifier qu'elles sont sérialisables
              try {
                const jsonString = JSON.stringify(processedData);
                console.log('Données JSON valides, longueur:', jsonString.length);
                
                // Vérifier si le JSON contient des valeurs problématiques
                if (jsonString.includes('Invalid Date') || jsonString.includes('NaN')) {
                  console.warn('Le JSON contient des valeurs problématiques:', 
                    jsonString.includes('Invalid Date') ? 'Invalid Date' : '', 
                    jsonString.includes('NaN') ? 'NaN' : '');
                  
                  // Nettoyer les valeurs problématiques
                  processedData = JSON.parse(jsonString.replace(/"Invalid Date"/g, 'null').replace(/NaN/g, '0'));
                  console.log('Données nettoyées après conversion JSON');
                }
              } catch (jsonError) {
                console.error('Erreur lors de la conversion en JSON:', jsonError);
                collectedWarnings.push(`Erreur lors de la sérialisation des données: ${jsonError.message}`);
                
                // Tentative de correction des données non sérialisables
                processedData = processedData.map(item => {
                  const cleanItem = { ...item };
                  
                  // Vérifier et corriger les dates
                  if (cleanItem.date && (typeof cleanItem.date !== 'string' || cleanItem.date === 'Invalid Date')) {
                    cleanItem.date = '2022-12-31';
                  }
                  
                  if (cleanItem.nextElectionDate && (typeof cleanItem.nextElectionDate !== 'string' || cleanItem.nextElectionDate === 'Invalid Date')) {
                    cleanItem.nextElectionDate = null;
                  }
                  
                  // Vérifier et corriger les valeurs numériques
                  cleanItem.registeredVoters = parseInt(cleanItem.registeredVoters) || 0;
                  cleanItem.validVotes = parseInt(cleanItem.validVotes) || 0;
                  cleanItem.blankNullVotes = parseInt(cleanItem.blankNullVotes) || 0;
                  
                  // Vérifier et corriger les résultats
                  if (Array.isArray(cleanItem.results)) {
                    cleanItem.results = cleanItem.results.map(result => ({
                      union: result.union || 'Inconnu',
                      votes: parseInt(result.votes) || 0,
                      percentage: parseFloat(result.percentage) || 0,
                      seats: parseInt(result.seats) || 0
                    }));
                  } else {
                    cleanItem.results = [];
                  }
                  
                  return cleanItem;
                });
                
                // Vérifier à nouveau la sérialisation
                try {
                  JSON.stringify(processedData);
                  console.log('Données corrigées et maintenant sérialisables');
                } catch (secondJsonError) {
                  console.error('Impossible de corriger les données pour la sérialisation:', secondJsonError);
                  setError('Les données contiennent des valeurs qui ne peuvent pas être sauvegardées. Veuillez vérifier le format du fichier.');
                  setWarnings(collectedWarnings);
                  setIsLoading(false);
                  return;
                }
              }

              if (typeof onImportComplete === 'function') {
                onImportComplete(processedData);
              }

              // Sauvegarder dans localStorage
              try {
                localStorage.setItem('importedElectionResults', JSON.stringify(processedData));
                console.log('Données sauvegardées dans localStorage');
              } catch (e) {
                console.error('Erreur lors de la sauvegarde dans localStorage:', e);
                collectedWarnings.push('Erreur lors de la sauvegarde des données. Certaines données pourraient ne pas être persistantes.');
              }

              setSuccess(true);
              setWarnings(collectedWarnings);
              console.log('Importation réussie:', processedData.length, 'résultats');
            } catch (validationError) {
              console.error('Erreur lors de la validation des données:', validationError);
              setError(`Erreur lors de la validation des données: ${validationError.message}`);
              setWarnings(collectedWarnings);
            }
          } else {
            setError('Aucun résultat valide n\'a pu être extrait du fichier.');
          }
        } catch (processingError) {
          console.error('Erreur lors du traitement des données:', processingError);
          setError(`Erreur lors du traitement des données: ${processingError.message}`);
          setWarnings(collectedWarnings);
        }
      } else {
        setError('Le fichier ne contient pas de données.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'importation:', error);
      setError(`Erreur lors de l'importation: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour lire le fichier Excel
  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);

          // Options de lecture pour gérer correctement les dates
          const workbook = XLSX.read(data, { 
            type: 'array', 
            cellDates: true,
            dateNF: 'yyyy-mm-dd',
            cellNF: true,
            cellStyles: true
          });

          // Prendre la première feuille du classeur
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convertir la feuille en tableau JSON avec des options spécifiques
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
            header: 1,           // Utiliser des indices numériques pour les colonnes
            defval: '',          // Valeur par défaut pour les cellules vides
            raw: false,          // Ne pas convertir les valeurs (garder les dates comme dates)
            dateNF: 'yyyy-mm-dd' // Format de date
          });

          // Ignorer la première ligne (en-têtes)
          const dataWithoutHeaders = jsonData.slice(1);

          console.log('Fichier Excel lu avec succès:', dataWithoutHeaders.length, 'lignes');
          resolve(dataWithoutHeaders);
        } catch (error) {
          console.error('Erreur détaillée lors de la lecture du fichier Excel:', error);
          reject(new Error(`Erreur lors de la lecture du fichier Excel: ${error.message}`));
        }
      };

      reader.onerror = (error) => {
        console.error('Erreur de lecture du fichier:', error);
        reject(new Error('Erreur lors de la lecture du fichier.'));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  // Fonction pour nettoyer les données Excel avant traitement
  const cleanExcelData = (data) => {
    console.log('Nettoyage des données Excel...');

    // Filtrer les lignes vides ou invalides
    const filteredData = data.filter(row => {
      // Vérifier si la ligne contient au moins quelques données essentielles
      return row && 
             row.length > 5 && 
             (row[1] || row[5]); // Au moins un SIRET ou un nom d'entreprise
    });

    // Nettoyer chaque cellule des données
    const cleanedData = filteredData.map(row => {
      return row.map(cell => {
        // Si la cellule est undefined ou null, la remplacer par une chaîne vide
        if (cell === undefined || cell === null) {
          return '';
        }

        // Si c'est une chaîne, supprimer les espaces en début et fin
        if (typeof cell === 'string') {
          return cell.trim();
        }

        // Si c'est une date invalide, la remplacer par null
        if (cell instanceof Date && isNaN(cell.getTime())) {
          return null;
        }

        return cell;
      });
    });

    console.log(`Données nettoyées: ${cleanedData.length} lignes valides sur ${data.length} lignes totales`);
    return cleanedData;
  };

  // Fonction pour valider et corriger le cycle électoral
  const validateElectoralCycle = (cycle, date) => {
    // Les cycles électoraux valides récents
    const validCycles = ['c1', 'c2', 'c3', 'c4'];
    const currentYear = new Date().getFullYear();

    // Si le cycle n'est pas valide ou est vide
    if (!cycle || !validCycles.includes(cycle.toLowerCase())) {
      // Déterminer le cycle en fonction de l'année
      const year = date.getFullYear();

      // Logique pour déterminer le cycle en fonction de l'année
      if (year >= 2021 && year <= 2024) {
        return 'c4'; // Cycle 4 pour 2021-2024
      } else if (year >= 2017 && year <= 2020) {
        return 'c3'; // Cycle 3 pour 2017-2020
      } else {
        return 'c4'; // Par défaut, cycle actuel
      }
    }

    return cycle.toLowerCase();
  };

  const processRedScoreData = (data, warningsCollector = []) => {
    console.log('Traitement des données Red Score:', data.length, 'lignes');

    const rawData = [];

    // Parcourir les lignes de données
    for (let i = 0; i < data.length; i++) {
      const row = data[i];

      // Vérifier si la ligne a suffisamment de colonnes
      if (row && row.length >= 20) {
        console.log(`Traitement de la ligne ${i+1}:`, row[5]); // Afficher la raison sociale

        // Mappage des colonnes selon le format PV Red Score
        // Colonne A (0): cycle
        // Colonne B (1): siret
        // Colonne C (2): id_pv
        // Colonne D (3): FD
        // Colonne E (4): idcc
        // Colonne F (5): raison_sociale
        // Colonne G (6): departement
        // Colonne H (7): ville
        // Colonne I (8): adresse_1
        // Colonne J (9): institution
        // Colonne K (10): compo_coll
        // Colonne L (11): deno_coll
        // Colonne M (12): date_scrutin
        // Colonne N (13): duree_mand
        // Colonne O (14): date_prochain
        // Colonne P (15): nb_inscrits
        // Colonne Q (16): num_votants
        // Colonne R (17): num_blanc_nul
        // Colonne S (18): num_sve
        // Colonne T (19): score_CGT
        // Colonne U (20): score_CFDT
        // Colonne V (21): score_FO
        // Colonne W (22): score_CFTC
        // Colonne X (23): score_CFE_CGC
        // Colonne Y (24): score_UNSA
        // Colonne Z (25): score_SOLIDAIRES
        // Colonne AA (26): score_AUTRES

        const electoralCycle = row[0] || '';
        const siret = row[1] ? String(row[1]).replace(/\D/g, '') : '';
        const idPv = row[2] || '';
        const federation = row[3] || '';
        const idcc = row[4] || '';
        const legalName = row[5] || 'Entreprise inconnue';
        const department = row[6] || '';
        const city = row[7] || '';
        const address = row[8] || '';
        const institution = row[9] || '';
        const collegeComposition = row[10] || '';
        const college = row[11] || 'Collège unique';
        const rawDate = row[12];
        const mandateDuration = row[13] || '';
        const nextElectionDate = row[14] || '';

        // Convertir les valeurs numériques en s'assurant qu'elles sont des nombres
        const registeredVoters = parseInt(String(row[15]).replace(/\D/g, '')) || 0;
        const validVotes = parseInt(String(row[16]).replace(/\D/g, '')) || 0;
        const blankNullVotes = parseInt(String(row[17]).replace(/\D/g, '')) || 0;
        const sveVotes = parseInt(String(row[18]).replace(/\D/g, '')) || 0;

        // Vérifier que les valeurs sont bien des nombres et dans des plages raisonnables
        const correctedRegisteredVoters = registeredVoters > 100000 ? 0 : registeredVoters; // Limite à 100 000 inscrits max
        const correctedValidVotes = validVotes;
        const correctedBlankNullVotes = blankNullVotes;

        // Vérifier la cohérence des données
        if (correctedValidVotes > correctedRegisteredVoters && correctedRegisteredVoters > 0) {
          const warning = `Ligne ${i+1}: Le nombre de votes valides (${correctedValidVotes}) est supérieur au nombre d'inscrits (${correctedRegisteredVoters})`;
          console.warn(warning);
          warningsCollector.push(warning);

          // Corriger si possible
          const adjustedValidVotes = Math.min(correctedValidVotes, correctedRegisteredVoters);
          console.log(`Correction: votes valides ajustés à ${adjustedValidVotes}`);
        }

        // Convertir la date Excel en format YYYY-MM-DD
        let date = new Date();
        let formattedDate = '';
        
        if (rawDate) {
          try {
            // Essayer de convertir la date Excel
            if (typeof rawDate === 'number') {
              // Conversion d'une date Excel (nombre de jours depuis le 1/1/1900)
              date = new Date((rawDate - 25569) * 86400 * 1000);
            } else if (rawDate instanceof Date) {
              date = rawDate;
            } else if (typeof rawDate === 'string') {
              // Essayer différents formats de date
              const parts = rawDate.split(/[\/\-\.]/);
              if (parts.length === 3) {
                // Essayer d'abord le format JJ/MM/AAAA
                if (parts[0].length <= 2 && parts[1].length <= 2 && parts[2].length === 4) {
                  date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                } 
                // Sinon essayer le format AAAA-MM-JJ
                else if (parts[2].length <= 2 && parts[1].length <= 2 && parts[0].length === 4) {
                  date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                } 
                // Sinon essayer la conversion standard
                else {
                  date = new Date(rawDate);
                }
              } else {
                date = new Date(rawDate);
              }
            }

            // Vérifier que la date est valide
            if (isNaN(date.getTime())) {
              throw new Error("Date invalide");
            }

            // Vérifier que la date est dans une plage raisonnable (entre 2018 et maintenant)
            const currentYear = new Date().getFullYear();
            if (date.getFullYear() < 2018 || date.getFullYear() > currentYear) {
              console.warn(`Ligne ${i+1}: Date hors plage raisonnable: ${date.toISOString().split('T')[0]}`);
              // Utiliser une date par défaut récente
              date = new Date(2022, 11, 31); // 31 décembre 2022 par défaut
              console.log(`Correction: date ajustée à ${date.toISOString().split('T')[0]}`);
            }
            
            // Formater la date au format YYYY-MM-DD
            formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            
          } catch (error) {
            console.error('Erreur lors de la conversion de la date:', rawDate, error);
            date = new Date(2022, 11, 31); // Date par défaut en cas d'erreur
            formattedDate = '2022-12-31';
          }
        } else {
          // Si pas de date, utiliser le 31 décembre 2022 par défaut
          date = new Date(2022, 11, 31);
          formattedDate = '2022-12-31';
        }

        // Traiter la date de prochaine élection
        let nextElectionDateObj = null;
        let formattedNextElectionDate = null;
        
        if (nextElectionDate) {
          try {
            if (typeof nextElectionDate === 'number') {
              nextElectionDateObj = new Date((nextElectionDate - 25569) * 86400 * 1000);
            } else if (nextElectionDate instanceof Date) {
              nextElectionDateObj = nextElectionDate;
            } else if (typeof nextElectionDate === 'string') {
              // Essayer différents formats de date
              const parts = nextElectionDate.split(/[\/\-\.]/);
              if (parts.length === 3) {
                // Essayer d'abord le format JJ/MM/AAAA
                if (parts[0].length <= 2 && parts[1].length <= 2 && parts[2].length === 4) {
                  nextElectionDateObj = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                } 
                // Sinon essayer le format AAAA-MM-JJ
                else if (parts[2].length <= 2 && parts[1].length <= 2 && parts[0].length === 4) {
                  nextElectionDateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                } 
                // Sinon essayer la conversion standard
                else {
                  nextElectionDateObj = new Date(nextElectionDate);
                }
              } else {
                nextElectionDateObj = new Date(nextElectionDate);
              }
            }

            // Vérifier que la date est valide
            if (isNaN(nextElectionDateObj.getTime())) {
              throw new Error("Date de prochaine élection invalide");
            }

            // Vérifier que la date est dans le futur
            if (nextElectionDateObj < date) {
              // Si la date est dans le passé, on la met à null
              nextElectionDateObj = null;
            } else {
              // Formater la date au format YYYY-MM-DD
              formattedNextElectionDate = `${nextElectionDateObj.getFullYear()}-${String(nextElectionDateObj.getMonth() + 1).padStart(2, '0')}-${String(nextElectionDateObj.getDate()).padStart(2, '0')}`;
            }
          } catch (error) {
            console.error('Erreur lors de la conversion de la date de prochaine élection:', nextElectionDate, error);
            nextElectionDateObj = null;
          }
        }

        // Vérifier et corriger le cycle électoral
        const correctedElectoralCycle = validateElectoralCycle(electoralCycle, date);

        // Convertir le SIRET en format nombre (en supprimant tous les caractères non numériques)
        const siretNumber = siret ? parseInt(siret) : 0;

        // Utiliser le SIRET comme identifiant unique pour regrouper les résultats
        const company = legalName; // Utiliser la raison sociale comme nom d'entreprise
        const sector = idcc; // Utiliser l'IDCC comme secteur d'activité

        rawData.push({
          company,
          legalName,
          siret: siretNumber,
          idPv: idPv, // Stocker l'ID PV pour l'utiliser lors de la consolidation
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
      } else {
        console.warn(`Ligne ${i+1} ignorée: données insuffisantes`, row);
      }
    }

    console.log('Données brutes traitées:', rawData.length, 'entrées');

    // Traiter les résultats des syndicats
    for (let i = 0; i < rawData.length; i++) {
      const item = rawData[i];

      // Ajouter CGT seulement si elle a des voix
      const cgtVotes = parseInt(String(data[i][19]).replace(/\D/g, '')) || 0;

      if (cgtVotes > 0) {
        const cgtPercentage = item.validVotes > 0 ? (cgtVotes / item.validVotes) * 100 : 0;

        item.results.push({
          union: 'CGT',
          votes: cgtVotes,
          percentage: parseFloat(cgtPercentage.toFixed(1)),
          seats: 0 // Les sièges ne sont pas dans le fichier, à calculer séparément si nécessaire
        });
      }

      // Ajouter les autres syndicats principaux
      const unions = [
        { name: 'CFDT', col: 20 },
        { name: 'FO', col: 21 },
        { name: 'CFTC', col: 22 },
        { name: 'CFE-CGC', col: 23 },
        { name: 'UNSA', col: 24 },
        { name: 'SOLIDAIRES', col: 25 },
        { name: 'AUTRES', col: 26 }
      ];

      unions.forEach(union => {
        if (data[i][union.col] !== undefined && data[i][union.col] !== '') {
          const votes = parseInt(String(data[i][union.col]).replace(/\D/g, '')) || 0;

          // N'ajouter le syndicat que s'il a des voix
          if (votes > 0) {
            // Vérifier que le nombre de voix est cohérent
            if (votes <= item.validVotes) {
              const percentage = item.validVotes > 0 ? (votes / item.validVotes) * 100 : 0;

              // Vérifier que le syndicat n'a pas exactement le même nombre de voix que la CGT
              // (ce qui pourrait indiquer une erreur de duplication)
              const cgtResult = item.results.find(r => r.union === 'CGT');
              if (!cgtResult || votes !== cgtResult.votes) {
                item.results.push({
                  union: union.name,
                  votes: votes,
                  percentage: parseFloat(percentage.toFixed(1)),
                  seats: 0 // Les sièges ne sont pas dans le fichier
                });
              } else {
                const warning = `Ligne ${i+1}: Le syndicat ${union.name} a exactement le même nombre de voix que la CGT (${votes}). Possible duplication, syndicat ignoré.`;
                console.warn(warning);
                warningsCollector.push(warning);
              }
            } else {
              const warning = `Ligne ${i+1}: Le syndicat ${union.name} a plus de voix (${votes}) que le total des votes valides (${item.validVotes}). Syndicat ignoré.`;
              console.warn(warning);
              warningsCollector.push(warning);
            }
          }
        }
      });
    }

    // Regrouper les données par SIRET et ID PV
    const processedData = consolidateDataBySiretAndIdPv(rawData, warningsCollector);
    console.log('Données consolidées:', processedData.length, 'entrées');

    // Vérifier la validité des dates avant de les sauvegarder
    const validatedData = processedData.map(item => {
      // S'assurer que la date est une chaîne valide au format YYYY-MM-DD
      if (!item.date || typeof item.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
        console.warn(`Date invalide détectée: ${item.date}, utilisation de la date par défaut`);
        item.date = '2022-12-31'; // Date par défaut
      }
      
      // S'assurer que nextElectionDate est soit null soit une chaîne valide
      if (item.nextElectionDate && (typeof item.nextElectionDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item.nextElectionDate))) {
        console.warn(`Date de prochaine élection invalide détectée: ${item.nextElectionDate}, mise à null`);
        item.nextElectionDate = null;
      }
      
      return item;
    });

    return validatedData;
  };

  // Fonction pour regrouper les données par SIRET et ID PV
  const consolidateDataBySiretAndIdPv = (rawData, warningsCollector = []) => {
    // Créer une Map pour stocker les données regroupées par SIRET
    const siretMap = new Map();
    
    // Trier les données par SIRET et ID PV pour faciliter la détection des collèges
    rawData.sort((a, b) => {
      if (a.siret === b.siret) {
        // Extraire les parties numériques des ID PV pour comparer
        const numA = parseInt(String(a.idPv).replace(/\D/g, '')) || 0;
        const numB = parseInt(String(b.idPv).replace(/\D/g, '')) || 0;
        return numA - numB;
      }
      return a.siret - b.siret;
    });
    
    // Fonction pour vérifier si deux ID PV sont consécutifs ou liés à la même entreprise
    const areRelatedIdPv = (idPv1, idPv2) => {
      // Si l'un des ID PV est vide ou non défini, considérer qu'ils ne sont pas liés
      if (!idPv1 || !idPv2) return false;
      
      // Extraire les parties numériques des ID PV
      const numPart1 = parseInt(String(idPv1).replace(/\D/g, '')) || 0;
      const numPart2 = parseInt(String(idPv2).replace(/\D/g, '')) || 0;
      
      // Si l'un des ID PV n'a pas de partie numérique, considérer qu'ils ne sont pas liés
      if (numPart1 === 0 || numPart2 === 0) return false;
      
      // Vérifier si les nombres sont consécutifs ou identiques
      // On considère qu'ils sont liés s'ils diffèrent de 1 au maximum
      return Math.abs(numPart2 - numPart1) <= 1;
    };
    
    // Première passe : identifier les groupes d'entreprises avec le même SIRET et des ID PV consécutifs
    let currentGroup = null;
    let currentSiret = null;
    
    rawData.forEach((item, index) => {
      // S'assurer que l'item a toutes les propriétés nécessaires
      if (!item || typeof item !== 'object') {
        console.warn('Item invalide ignoré:', item);
        return;
      }
      
      try {
        // Si c'est un nouveau SIRET ou si le SIRET est 0 (non défini)
        if (item.siret !== currentSiret || item.siret === 0 || !currentSiret) {
          // Commencer un nouveau groupe
          currentSiret = item.siret;
          currentGroup = {
            key: `${item.siret || 0}_${item.idPv || 'unknown'}`,
            items: [item]
          };
          siretMap.set(currentGroup.key, currentGroup);
        } else {
          // Même SIRET, vérifier si les ID PV sont consécutifs
          const previousItem = rawData[index - 1];
          
          if (previousItem && areRelatedIdPv(previousItem.idPv, item.idPv)) {
            // Ajouter au groupe actuel
            currentGroup.items.push(item);
          } else {
            // Commencer un nouveau groupe
            currentGroup = {
              key: `${item.siret || 0}_${item.idPv || 'unknown'}`,
              items: [item]
            };
            siretMap.set(currentGroup.key, currentGroup);
          }
        }
      } catch (error) {
        console.error('Erreur lors du regroupement des données:', error, item);
        warningsCollector.push(`Erreur lors du regroupement des données: ${error.message}`);
      }
    });
    
    // Deuxième passe : consolider les données pour chaque groupe
    const consolidatedData = [];
    
    siretMap.forEach(group => {
      try {
        if (!group || !Array.isArray(group.items) || group.items.length === 0) {
          console.warn('Groupe invalide ignoré:', group);
          return;
        }
        
        if (group.items.length === 1) {
          // S'il n'y a qu'un seul item dans le groupe, l'ajouter directement
          // S'assurer que toutes les propriétés sont valides
          const item = group.items[0];
          
          // Vérifier et corriger les valeurs numériques
          const cleanItem = {
            ...item,
            registeredVoters: parseInt(item.registeredVoters) || 0,
            validVotes: parseInt(item.validVotes) || 0,
            blankNullVotes: parseInt(item.blankNullVotes) || 0
          };
          
          consolidatedData.push(cleanItem);
        } else {
          // Consolider les données du groupe
          const firstItem = group.items[0];
          
          // Créer un objet consolidé avec des valeurs par défaut sûres
          const consolidatedItem = {
            company: firstItem.company || 'Entreprise inconnue',
            legalName: firstItem.legalName || firstItem.company || 'Entreprise inconnue',
            siret: firstItem.siret || 0,
            idPv: firstItem.idPv || '',
            sector: firstItem.sector || '',
            federation: firstItem.federation || '',
            date: firstItem.date || '2022-12-31',
            electoralCycle: firstItem.electoralCycle || 'c4',
            college: "Tous collèges", // Indiquer qu'il s'agit d'une consolidation de plusieurs collèges
            collegeComposition: group.items.map(item => item.college || 'Collège inconnu').join(", "),
            department: firstItem.department || '',
            city: firstItem.city || '',
            address: firstItem.address || '',
            institution: firstItem.institution || '',
            mandateDuration: parseInt(firstItem.mandateDuration) || 4,
            nextElectionDate: firstItem.nextElectionDate || null,
            registeredVoters: 0,
            validVotes: 0,
            blankNullVotes: 0,
            results: [],
            colleges: []
          };
          
          // Additionner les totaux et collecter les informations des collèges
          group.items.forEach(item => {
            try {
              // Vérifier que l'item est valide
              if (!item || typeof item !== 'object') return;
              
              // Créer une copie propre du collège
              const cleanCollege = {
                name: item.college || 'Collège inconnu',
                registeredVoters: parseInt(item.registeredVoters) || 0,
                validVotes: parseInt(item.validVotes) || 0,
                blankNullVotes: parseInt(item.blankNullVotes) || 0,
                results: Array.isArray(item.results) ? [...item.results] : []
              };
              
              // Ajouter le collège à la liste
              consolidatedItem.colleges.push(cleanCollege);
              
              // Additionner les totaux
              consolidatedItem.registeredVoters += cleanCollege.registeredVoters;
              consolidatedItem.validVotes += cleanCollege.validVotes;
              consolidatedItem.blankNullVotes += cleanCollege.blankNullVotes;
              
              // Consolider les résultats par syndicat
              if (Array.isArray(item.results)) {
                item.results.forEach(result => {
                  try {
                    if (!result || typeof result !== 'object') return;
                    
                    const unionName = result.union || 'Inconnu';
                    const votes = parseInt(result.votes) || 0;
                    
                    const existingResult = consolidatedItem.results.find(r => r.union === unionName);
                    
                    if (existingResult) {
                      existingResult.votes += votes;
                    } else {
                      consolidatedItem.results.push({
                        union: unionName,
                        votes: votes,
                        percentage: 0, // Sera recalculé plus tard
                        seats: 0
                      });
                    }
                  } catch (resultError) {
                    console.error('Erreur lors de la consolidation des résultats:', resultError, result);
                  }
                });
              }
            } catch (itemError) {
              console.error('Erreur lors de la consolidation d\'un item:', itemError, item);
            }
          });
          
          // Recalculer les pourcentages
          if (consolidatedItem.validVotes > 0) {
            consolidatedItem.results.forEach(result => {
              try {
                result.percentage = parseFloat(((result.votes / consolidatedItem.validVotes) * 100).toFixed(1));
              } catch (error) {
                console.error('Erreur lors du calcul des pourcentages:', error, result);
                result.percentage = 0;
              }
            });
          }
          
          // Trier les résultats par nombre de voix décroissant
          consolidatedItem.results.sort((a, b) => (b.votes || 0) - (a.votes || 0));
          
          consolidatedData.push(consolidatedItem);
          
          // Ajouter un avertissement pour informer de la consolidation
          const warning = `Les résultats de ${group.items.length} collèges ont été consolidés pour l'entreprise ${firstItem.company || 'inconnue'} (SIRET: ${firstItem.siret || 'non défini'}, ID PV: ${firstItem.idPv || 'non défini'}).`;
          console.log(warning);
          warningsCollector.push(warning);
        }
      } catch (groupError) {
        console.error('Erreur lors de la consolidation d\'un groupe:', groupError, group);
        warningsCollector.push(`Erreur lors de la consolidation d'un groupe: ${groupError.message}`);
      }
    });
    
    return consolidatedData;
  };

  return (
    <div className={styles.importerContainer}>
      <h3 className={styles.importerTitle}>Importer les résultats depuis Excel</h3>
      <div className={styles.importerContent}>
        <p className={styles.importerDescription}>
          Sélectionnez un fichier Excel contenant les résultats des élections au format PV Red Score.
        </p>

        <div className={styles.fileInputContainer}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx,.xls,.csv"
            className={styles.fileInput}
          />
          <div className={styles.fileInputLabel}>
            {file ? file.name : 'Aucun fichier sélectionné'}
          </div>
          <button 
            className={styles.browseButton}
            onClick={() => fileInputRef.current.click()}
          >
            Parcourir
          </button>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {isLoading ? (
          <div className={styles.loadingIndicator}>Traitement du fichier en cours...</div>
        ) : (
          <button 
            className={styles.browseButton}
            onClick={handleImport}
            disabled={!file}
          >
            Importer les données
          </button>
        )}

        {success && (
          <div className={styles.successMessage}>
            <i className="fas fa-check-circle"></i> Importation réussie !
          </div>
        )}

        {warnings.length > 0 && (
          <div className={styles.warningsContainer}>
            <h4>Avertissements ({warnings.length})</h4>
            <ul className={styles.warningsList}>
              {warnings.slice(0, 10).map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
              {warnings.length > 10 && (
                <li>...et {warnings.length - 10} autres avertissements</li>
              )}
            </ul>
          </div>
        )}

        <div className={styles.importerHelp}>
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
            <li>Colonne M: Date scrutin</li>
            <li>Colonne N: Durée mandat</li>
            <li>Colonne O: Date prochain scrutin</li>
            <li>Colonne P: Nombre d'inscrits</li>
            <li>Colonne Q: Nombre de votants</li>
            <li>Colonne R: Nombre de blancs/nuls</li>
            <li>Colonne S: Nombre de SVE</li>
            <li>Colonne T: Score CGT</li>
            <li>Colonne U: Score CFDT</li>
            <li>Colonne V: Score FO</li>
            <li>Colonne W: Score CFTC</li>
            <li>Colonne X: Score CFE-CGC</li>
            <li>Colonne Y: Score UNSA</li>
            <li>Colonne Z: Score SOLIDAIRES</li>
            <li>Colonne AA: Score AUTRES</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExcelImporter;
