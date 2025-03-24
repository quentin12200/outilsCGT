import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import styles from './ExcelImporter.module.css';

const ExcelImporter = ({ onImportComplete }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const processFile = async () => {
    if (!file) {
      setError('Veuillez sélectionner un fichier Excel.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await readExcelFile(file);
      
      if (data && data.length > 0) {
        // Traiter les données selon le format attendu
        const processedData = processRedScoreData(data);
        
        if (processedData.length > 0) {
          if (typeof onImportComplete === 'function') {
            onImportComplete(processedData);
          } else {
            // Si onImportComplete n'est pas défini, afficher un message de succès
            setError('Importation réussie ! ' + processedData.length + ' résultats importés.');
            // On pourrait stocker les données dans le localStorage ici
            localStorage.setItem('importedElectionResults', JSON.stringify(processedData));
            // Rafraîchir la page pour afficher les résultats
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        } else {
          setError('Aucune donnée valide n\'a été trouvée dans le fichier.');
        }
      } else {
        setError('Le fichier ne contient pas de données valides.');
      }
    } catch (err) {
      setError(`Erreur lors de la lecture du fichier: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Prendre la première feuille du classeur
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Convertir la feuille en tableau JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
            header: 1,  // Utiliser la première ligne comme en-têtes
            defval: '', // Valeur par défaut pour les cellules vides
            raw: false  // Ne pas convertir les valeurs en types natifs
          });
          
          // Supprimer les lignes vides
          const filteredData = jsonData.filter(row => 
            row.length > 0 && row.some(cell => cell !== '')
          );
          
          // Vérifier si nous avons des données
          if (filteredData.length <= 1) {
            reject(new Error('Le fichier ne contient pas de données valides.'));
            return;
          }
          
          // Supprimer la ligne d'en-tête si elle existe
          const dataWithoutHeader = filteredData.length > 1 ? filteredData.slice(1) : filteredData;
          
          console.log('Données Excel lues avec succès:', dataWithoutHeader.length, 'lignes');
          resolve(dataWithoutHeader);
        } catch (error) {
          console.error('Erreur lors de la lecture du fichier Excel:', error);
          reject(new Error(`Erreur lors de la lecture du fichier: ${error.message}`));
        }
      };
      
      reader.onerror = (error) => {
        console.error('Erreur lors de la lecture du fichier:', error);
        reject(new Error('Erreur lors de la lecture du fichier.'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  };

  const processRedScoreData = (data) => {
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
        const siret = row[1] || '';
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
        
        // Convertir la date Excel en format YYYY-MM-DD
        let date = new Date();
        if (rawDate) {
          try {
            if (typeof rawDate === 'number') {
              // Si c'est un nombre, c'est probablement une date Excel (nombre de jours depuis le 1/1/1900)
              date = new Date(Math.round((rawDate - 25569) * 86400 * 1000));
            } else if (typeof rawDate === 'string') {
              // Si c'est une chaîne, essayer de la parser
              // Format français JJ/MM/AAAA
              if (rawDate.includes('/')) {
                const parts = rawDate.split('/');
                if (parts.length === 3) {
                  const day = parseInt(parts[0]);
                  const month = parseInt(parts[1]) - 1; // Les mois commencent à 0 en JS
                  const year = parseInt(parts[2]);
                  date = new Date(year, month, day);
                } else {
                  date = new Date(rawDate);
                }
              } else {
                date = new Date(rawDate);
              }
            }
          } catch (error) {
            console.error('Erreur lors de la conversion de la date:', rawDate, error);
          }
        }
        
        const formattedDate = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
        
        // Traiter les résultats des syndicats
        const results = [];
        
        // Ajouter CGT
        const cgtVotes = parseInt(String(row[19]).replace(/\D/g, '')) || 0;
        const cgtPercentage = validVotes > 0 ? (cgtVotes / validVotes) * 100 : 0;
        
        results.push({
          union: 'CGT',
          votes: cgtVotes,
          percentage: parseFloat(cgtPercentage.toFixed(1)),
          seats: 0 // Les sièges ne sont pas dans le fichier, à calculer séparément si nécessaire
        });
        
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
          if (row[union.col] !== undefined && row[union.col] !== '') {
            const votes = parseInt(String(row[union.col]).replace(/\D/g, '')) || 0;
            const percentage = validVotes > 0 ? (votes / validVotes) * 100 : 0;
            
            if (votes > 0) {
              results.push({
                union: union.name,
                votes: votes,
                percentage: parseFloat(percentage.toFixed(1)),
                seats: 0 // Les sièges ne sont pas dans le fichier
              });
            }
          }
        });
        
        // Utiliser le SIRET comme identifiant unique pour regrouper les résultats
        const company = legalName; // Utiliser la raison sociale comme nom d'entreprise
        const sector = idcc; // Utiliser l'IDCC comme secteur d'activité
        
        rawData.push({
          company,
          legalName,
          siret,
          sector,
          federation,
          date: formattedDate,
          electoralCycle,
          college,
          collegeComposition,
          department,
          city,
          address,
          institution,
          totalEmployees: registeredVoters, // Utiliser le nombre d'inscrits comme effectif total
          registeredVoters,
          validVotes,
          blankNullVotes,
          results
        });
      } else {
        console.warn(`Ligne ${i+1} ignorée: données insuffisantes`, row);
      }
    }
    
    console.log('Données brutes traitées:', rawData.length, 'entrées');
    
    // Regrouper les données par SIRET
    const processedData = consolidateDataBySiret(rawData);
    console.log('Données consolidées:', processedData.length, 'entrées');
    
    return processedData;
  };

  // Fonction pour regrouper les données par SIRET (raison sociale)
  const consolidateDataBySiret = (rawData) => {
    const siretMap = new Map();
    
    // Première passe : regrouper les données par SIRET
    rawData.forEach(item => {
      const siretKey = item.siret; // Utiliser le SIRET comme clé
      
      if (!siretMap.has(siretKey)) {
        siretMap.set(siretKey, {
          company: item.company,
          legalName: item.legalName,
          sector: item.sector,
          federation: item.federation,
          date: item.date,
          electoralCycle: item.electoralCycle,
          colleges: [],
          totalEmployees: 0,
          registeredVoters: 0,
          validVotes: 0,
          blankNullVotes: 0,
          unionResults: new Map() // Pour agréger les résultats par syndicat
        });
      }
      
      const siretData = siretMap.get(siretKey);
      
      // Ajouter le collège s'il n'est pas déjà présent
      if (!siretData.colleges.includes(item.college)) {
        siretData.colleges.push(item.college);
      }
      
      // Additionner les chiffres
      siretData.totalEmployees += item.totalEmployees;
      siretData.registeredVoters += item.registeredVoters;
      siretData.validVotes += item.validVotes;
      siretData.blankNullVotes += item.blankNullVotes;
      
      // Agréger les résultats par syndicat
      item.results.forEach(result => {
        const unionKey = result.union;
        
        if (!siretData.unionResults.has(unionKey)) {
          siretData.unionResults.set(unionKey, {
            union: unionKey,
            votes: 0,
            seats: 0
          });
        }
        
        const unionData = siretData.unionResults.get(unionKey);
        unionData.votes += result.votes;
        unionData.seats += result.seats;
      });
    });
    
    // Deuxième passe : calculer les pourcentages et formater les données finales
    const processedData = [];
    
    siretMap.forEach((siretData, siretKey) => {
      // Calculer les pourcentages pour chaque syndicat
      const results = [];
      
      siretData.unionResults.forEach(unionData => {
        const percentage = siretData.validVotes > 0 
          ? (unionData.votes / siretData.validVotes) * 100 
          : 0;
        
        results.push({
          union: unionData.union,
          votes: unionData.votes,
          percentage: parseFloat(percentage.toFixed(1)),
          seats: unionData.seats
        });
      });
      
      // Trier les résultats par nombre de voix (décroissant)
      results.sort((a, b) => b.votes - a.votes);
      
      // Créer l'entrée finale
      processedData.push({
        company: siretData.company,
        legalName: siretData.legalName,
        sector: siretData.sector,
        federation: siretData.federation,
        date: siretData.date,
        electoralCycle: siretData.electoralCycle,
        colleges: siretData.colleges,
        totalEmployees: siretData.totalEmployees,
        registeredVoters: siretData.registeredVoters,
        validVotes: siretData.validVotes,
        blankNullVotes: siretData.blankNullVotes,
        results: results
      });
    });
    
    return processedData;
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
            onClick={handleBrowseClick}
          >
            Parcourir
          </button>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        {loading ? (
          <div className={styles.loadingIndicator}>Traitement du fichier en cours...</div>
        ) : (
          <button 
            className={styles.browseButton}
            onClick={processFile}
            disabled={!file}
          >
            Importer les données
          </button>
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
