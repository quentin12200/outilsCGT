import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const BasicExcelImporter = ({ onImportComplete }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [importedData, setImportedData] = useState(null);

  const containerStyle = {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const titleStyle = {
    color: '#e30613',
    marginTop: '0',
    marginBottom: '15px',
    fontSize: '1.2rem',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px'
  };

  const buttonStyle = {
    backgroundColor: '#e30613',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    marginLeft: '10px'
  };

  const errorStyle = {
    backgroundColor: '#fff0f0',
    color: '#e30613',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '10px'
  };

  const successStyle = {
    backgroundColor: '#f0fff0',
    color: '#00a651',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '10px'
  };

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
    setImportedData(null);

    try {
      // Lire le fichier Excel
      const jsonData = await readExcelFile(file);
      
      if (!jsonData || jsonData.length === 0) {
        setError('Le fichier ne contient pas de données valides.');
        setIsLoading(false);
        return;
      }

      // Traiter les données
      const processedData = processExcelData(jsonData);
      
      if (processedData.length === 0) {
        setError('Aucune donnée valide n\'a pu être extraite du fichier.');
      } else {
        setImportedData(processedData);
        console.log('Données importées avec succès:', processedData.length, 'entrées');
        
        // Si une fonction de callback est fournie, l'appeler avec les données importées
        if (typeof onImportComplete === 'function') {
          onImportComplete(processedData);
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'importation:', error);
      setError(`Erreur lors de l'importation: ${error.message}`);
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
          
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          console.log('Données Excel lues:', jsonData.length, 'lignes');
          
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

  const processExcelData = (data) => {
    console.log('Traitement des données:', data.length, 'lignes');
    const processedData = [];
    
    // Parcourir les lignes de données
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      
      // Vérifier si la ligne a suffisamment de données
      if (!row || typeof row !== 'object' || Object.keys(row).length < 3) {
        continue;
      }
      
      try {
        // Normaliser les noms de colonnes (convertir en minuscules)
        const normalizedRow = {};
        Object.keys(row).forEach(key => {
          normalizedRow[key.toLowerCase()] = row[key];
        });
        
        // Extraire les données de base
        const company = normalizedRow.raison_sociale || '';
        const siret = normalizedRow.siret ? String(normalizedRow.siret).replace(/\D/g, '') : '';
        const idPv = normalizedRow.id_pv || '';
        const sector = normalizedRow.idcc || '';
        const federation = normalizedRow.fd || '';
        const department = normalizedRow.departement || '';
        const city = normalizedRow.ville || '';
        const college = normalizedRow.deno_coll || 'Collège unique';
        
        // Convertir la date
        let date = new Date();
        let formattedDate = '2023-01-01'; // Date par défaut
        
        const rawDate = normalizedRow.date_scrutin;
        if (rawDate) {
          try {
            if (typeof rawDate === 'number') {
              // Conversion d'une date Excel
              date = new Date((rawDate - 25569) * 86400 * 1000);
              formattedDate = date.toISOString().split('T')[0];
            } else if (typeof rawDate === 'string') {
              // Si c'est une chaîne, essayer de la convertir
              const dateObj = new Date(rawDate);
              if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toISOString().split('T')[0];
              }
            }
          } catch (error) {
            console.log(`Erreur lors de la conversion de la date pour la ligne ${i+1}:`, error);
          }
        }
        
        // Convertir les valeurs numériques
        const getNumericValue = (value) => {
          if (value === undefined || value === null || value === '') return 0;
          if (typeof value === 'number') return value;
          return parseInt(String(value).replace(/\D/g, '')) || 0;
        };
        
        const registeredVoters = getNumericValue(normalizedRow.num_inscrits || normalizedRow.nb_inscrits);
        const validVotes = getNumericValue(normalizedRow.num_votants);
        const blankNullVotes = getNumericValue(normalizedRow.num_blanc_nul);
        
        // Extraire les votes des syndicats
        const cgtVotes = getNumericValue(normalizedRow.score_cgt);
        const cfdtVotes = getNumericValue(normalizedRow.score_cfdt);
        const foVotes = getNumericValue(normalizedRow.score_fo);
        const cftcVotes = getNumericValue(normalizedRow.score_cftc);
        const cgcVotes = getNumericValue(normalizedRow.score_cgc || normalizedRow.score_cfe_cgc);
        const unsaVotes = getNumericValue(normalizedRow.score_unsa);
        const solidairesVotes = getNumericValue(normalizedRow.score_solidaire || normalizedRow.score_solidaires);
        const autresVotes = getNumericValue(normalizedRow.score_autre || normalizedRow.score_autres);
        
        // Calculer les pourcentages
        const totalVotes = validVotes > 0 ? validVotes : 1; // Éviter la division par zéro
        const calculatePercentage = (votes) => {
          return parseFloat(((votes / totalVotes) * 100).toFixed(1));
        };
        
        // Préparer les résultats
        const results = [];
        
        // Ajouter les syndicats qui ont des voix
        if (cgtVotes > 0) {
          results.push({
            union: 'CGT',
            votes: cgtVotes,
            percentage: calculatePercentage(cgtVotes),
            seats: 0
          });
        }
        
        if (cfdtVotes > 0) {
          results.push({
            union: 'CFDT',
            votes: cfdtVotes,
            percentage: calculatePercentage(cfdtVotes),
            seats: 0
          });
        }
        
        if (foVotes > 0) {
          results.push({
            union: 'FO',
            votes: foVotes,
            percentage: calculatePercentage(foVotes),
            seats: 0
          });
        }
        
        if (cftcVotes > 0) {
          results.push({
            union: 'CFTC',
            votes: cftcVotes,
            percentage: calculatePercentage(cftcVotes),
            seats: 0
          });
        }
        
        if (cgcVotes > 0) {
          results.push({
            union: 'CFE-CGC',
            votes: cgcVotes,
            percentage: calculatePercentage(cgcVotes),
            seats: 0
          });
        }
        
        if (unsaVotes > 0) {
          results.push({
            union: 'UNSA',
            votes: unsaVotes,
            percentage: calculatePercentage(unsaVotes),
            seats: 0
          });
        }
        
        if (solidairesVotes > 0) {
          results.push({
            union: 'SOLIDAIRES',
            votes: solidairesVotes,
            percentage: calculatePercentage(solidairesVotes),
            seats: 0
          });
        }
        
        if (autresVotes > 0) {
          results.push({
            union: 'AUTRES',
            votes: autresVotes,
            percentage: calculatePercentage(autresVotes),
            seats: 0
          });
        }
        
        // Ajouter l'entrée traitée
        processedData.push({
          company,
          legalName: company,
          siret,
          idPv,
          sector,
          federation,
          date: formattedDate,
          electoralCycle: '2022-2026',
          college,
          collegeComposition: 'Titulaires',
          department,
          city,
          address: normalizedRow.adresse_1 || '',
          institution: normalizedRow.institution || '',
          mandateDuration: 4,
          nextElectionDate: null,
          registeredVoters,
          validVotes,
          blankNullVotes,
          results
        });
        
      } catch (error) {
        console.error(`Erreur lors du traitement de la ligne ${i+1}:`, error);
      }
    }
    
    return processedData;
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Importation simplifiée des résultats</h3>
      
      <div>
        <input
          type="file"
          id="excel_file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <button 
          style={buttonStyle} 
          onClick={handleImport}
          disabled={!file || isLoading}
        >
          {isLoading ? 'Importation en cours...' : 'Importer'}
        </button>
      </div>
      
      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}
      
      {importedData && (
        <div style={successStyle}>
          <p>Importation réussie! {importedData.length} entrées importées.</p>
        </div>
      )}
      
      {!importedData && !error && (
        <div>
          <p>
            <a href="/templates/modele_pv_red_score.xlsx" download>
              Télécharger le modèle Excel
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default BasicExcelImporter;
