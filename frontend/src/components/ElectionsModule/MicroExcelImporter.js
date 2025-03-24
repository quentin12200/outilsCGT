import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const MicroExcelImporter = ({ onImportComplete }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setSuccess(false);
  };

  const handleImport = () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier Excel");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(sheet);
        
        if (rawData.length === 0) {
          setError("Le fichier ne contient pas de données");
          setIsLoading(false);
          return;
        }

        // Traitement simplifié des données
        const processedData = rawData.map(row => {
          // Normaliser les noms de colonnes
          const normalizedRow = {};
          Object.keys(row).forEach(key => {
            normalizedRow[key.toLowerCase()] = row[key];
          });

          // Extraire les valeurs importantes
          const company = normalizedRow.raison_sociale || '';
          const siret = normalizedRow.siret ? String(normalizedRow.siret).replace(/\D/g, '') : '';
          const sector = normalizedRow.idcc || '';
          const department = normalizedRow.departement || '';
          
          // Convertir les valeurs numériques
          const getNumber = (val) => {
            if (val === undefined || val === null || val === '') return 0;
            if (typeof val === 'number') return val;
            return parseInt(String(val).replace(/\D/g, '')) || 0;
          };
          
          const registeredVoters = getNumber(normalizedRow.num_inscrits || normalizedRow.nb_inscrits);
          const validVotes = getNumber(normalizedRow.num_votants);
          const cgtVotes = getNumber(normalizedRow.score_cgt);
          const cfdtVotes = getNumber(normalizedRow.score_cfdt);
          const foVotes = getNumber(normalizedRow.score_fo);
          
          // Calculer les pourcentages
          const totalVotes = validVotes > 0 ? validVotes : 1; // Éviter division par zéro
          const cgtPercentage = parseFloat(((cgtVotes / totalVotes) * 100).toFixed(1));
          const cfdtPercentage = parseFloat(((cfdtVotes / totalVotes) * 100).toFixed(1));
          const foPercentage = parseFloat(((foVotes / totalVotes) * 100).toFixed(1));
          
          // Résultats par syndicat
          const results = [];
          
          if (cgtVotes > 0) {
            results.push({
              union: 'CGT',
              votes: cgtVotes,
              percentage: cgtPercentage,
              seats: 0
            });
          }
          
          if (cfdtVotes > 0) {
            results.push({
              union: 'CFDT',
              votes: cfdtVotes,
              percentage: cfdtPercentage,
              seats: 0
            });
          }
          
          if (foVotes > 0) {
            results.push({
              union: 'FO',
              votes: foVotes,
              percentage: foPercentage,
              seats: 0
            });
          }
          
          return {
            company,
            legalName: company,
            siret,
            date: '2023-01-01', // Date par défaut
            sector,
            department,
            registeredVoters,
            validVotes,
            blankNullVotes: 0,
            results
          };
        }).filter(item => item.company && item.results.length > 0);

        if (processedData.length === 0) {
          setError("Aucune donnée valide n'a pu être extraite");
          setIsLoading(false);
          return;
        }

        // Appeler le callback avec les données traitées
        if (typeof onImportComplete === 'function') {
          onImportComplete(processedData);
        }
        
        setSuccess(true);
        setIsLoading(false);
        
      } catch (error) {
        console.error("Erreur lors de l'importation:", error);
        setError(`Erreur lors de l'importation: ${error.message}`);
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
      setError("Erreur lors de la lecture du fichier");
      setIsLoading(false);
    };
    
    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '5px',
      border: '1px solid #ddd'
    }}>
      <h3 style={{ marginTop: 0, color: '#e30613' }}>Import Excel Simplifié</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="file" 
          accept=".xlsx, .xls" 
          onChange={handleFileChange}
          disabled={isLoading}
          style={{ marginRight: '10px' }}
        />
        
        <button 
          onClick={handleImport}
          disabled={!file || isLoading}
          style={{
            backgroundColor: '#e30613',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '4px',
            cursor: !file || isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Importation...' : 'Importer'}
        </button>
      </div>
      
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#fff0f0', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ 
          color: 'green', 
          backgroundColor: '#f0fff0', 
          padding: '10px', 
          borderRadius: '4px' 
        }}>
          Importation réussie!
        </div>
      )}
    </div>
  );
};

export default MicroExcelImporter;
