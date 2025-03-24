import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const MinimalExcelImporter = ({ onImportComplete }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [importedData, setImportedData] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          console.log('Données Excel lues:', jsonData.length, 'lignes');
          
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
          
          setIsLoading(false);
        } catch (error) {
          console.error('Erreur lors de la lecture du fichier Excel:', error);
          setError(`Erreur lors de la lecture du fichier Excel: ${error.message}`);
          setIsLoading(false);
        }
      };
      
      reader.onerror = (error) => {
        console.error('Erreur lors de la lecture du fichier:', error);
        setError('Erreur lors de la lecture du fichier');
        setIsLoading(false);
      };
      
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error('Erreur lors de l\'importation:', error);
      setError(`Erreur lors de l'importation: ${error.message}`);
      setIsLoading(false);
    }
  };

  const processExcelData = (data) => {
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
        const sector = normalizedRow.idcc || '';
        const department = normalizedRow.departement || '';
        
        // Convertir les valeurs numériques
        const getNumericValue = (value) => {
          if (value === undefined || value === null || value === '') return 0;
          if (typeof value === 'number') return value;
          return parseInt(String(value).replace(/\D/g, '')) || 0;
        };
        
        const registeredVoters = getNumericValue(normalizedRow.num_inscrits || normalizedRow.nb_inscrits);
        const validVotes = getNumericValue(normalizedRow.num_votants);
        const cgtVotes = getNumericValue(normalizedRow.score_cgt);
        
        // Calculer le pourcentage CGT
        const cgtPercentage = validVotes > 0 ? (cgtVotes / validVotes) * 100 : 0;
        
        // Créer l'entrée de résultat
        const resultEntry = {
          company,
          legalName: company,
          siret,
          date: '2023-01-01',
          sector,
          department,
          registeredVoters,
          validVotes,
          results: []
        };
        
        // Ajouter les résultats CGT
        if (cgtVotes > 0) {
          resultEntry.results.push({
            union: 'CGT',
            votes: cgtVotes,
            percentage: parseFloat(cgtPercentage.toFixed(1)),
            seats: 0
          });
        }
        
        // Ajouter l'entrée traitée
        processedData.push(resultEntry);
        
      } catch (error) {
        console.error(`Erreur lors du traitement de la ligne ${i+1}:`, error);
      }
    }
    
    return processedData;
  };

  const containerStyle = {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
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

  return (
    <div style={containerStyle}>
      <h3>Importation simplifiée des résultats</h3>
      
      <div>
        <input
          type="file"
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
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
      
      {importedData && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          <p>Importation réussie! {importedData.length} entrées importées.</p>
        </div>
      )}
    </div>
  );
};

export default MinimalExcelImporter;
