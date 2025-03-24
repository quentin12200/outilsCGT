const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Fonction principale pour importer les données Excel
function importExcelData(filePath) {
  try {
    console.log(`Lecture du fichier Excel: ${filePath}`);
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
      console.error(`Erreur: Le fichier ${filePath} n'existe pas.`);
      return null;
    }
    
    // Lire le fichier Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir en JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`${rawData.length} lignes trouvées dans le fichier Excel.`);
    
    if (rawData.length === 0) {
      console.error("Erreur: Le fichier ne contient pas de données.");
      return null;
    }
    
    // Traiter les données
    const processedData = processExcelData(rawData);
    
    if (processedData.length === 0) {
      console.error("Erreur: Aucune donnée valide n'a pu être extraite du fichier.");
      return null;
    }
    
    console.log(`${processedData.length} entrées valides extraites et traitées.`);
    
    // Sauvegarder les données traitées
    const outputPath = path.join(path.dirname(filePath), 'resultats_traites.json');
    fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2));
    console.log(`Données sauvegardées dans: ${outputPath}`);
    
    return processedData;
    
  } catch (error) {
    console.error("Erreur lors de l'importation:", error);
    return null;
  }
}

// Fonction pour traiter les données Excel
function processExcelData(data) {
  console.log("Traitement des données...");
  const processedData = [];
  
  // Parcourir les lignes de données
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    
    // Vérifier si la ligne a suffisamment de données
    if (!row || typeof row !== 'object' || Object.keys(row).length < 3) {
      console.log(`Ligne ${i+1}: Ignorée (données insuffisantes)`);
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
      
      // Vérifier la cohérence des données
      let correctedValidVotes = validVotes;
      if (validVotes > registeredVoters && registeredVoters > 0) {
        console.log(`Ligne ${i+1}: Correction - Nombre de votants (${validVotes}) supérieur au nombre d'inscrits (${registeredVoters})`);
        correctedValidVotes = registeredVoters;
      }
      
      // Extraire les votes des syndicats
      const cgtVotes = getNumericValue(normalizedRow.score_cgt);
      const cfdtVotes = getNumericValue(normalizedRow.score_cfdt);
      const foVotes = getNumericValue(normalizedRow.score_fo);
      const cftcVotes = getNumericValue(normalizedRow.score_cftc);
      const cgcVotes = getNumericValue(normalizedRow.score_cgc || normalizedRow.score_cfe_cgc);
      const unsaVotes = getNumericValue(normalizedRow.score_unsa);
      const solidairesVotes = getNumericValue(normalizedRow.score_solidaire || normalizedRow.score_solidaires);
      const autresVotes = getNumericValue(normalizedRow.score_autre || normalizedRow.score_autres);
      
      // Calculer le total des votes par syndicat
      const totalSyndicateVotes = cgtVotes + cfdtVotes + foVotes + cftcVotes + cgcVotes + unsaVotes + solidairesVotes + autresVotes;
      
      // Vérifier la cohérence des votes par syndicat
      let correctedVotes = {
        cgt: cgtVotes,
        cfdt: cfdtVotes,
        fo: foVotes,
        cftc: cftcVotes,
        cgc: cgcVotes,
        unsa: unsaVotes,
        solidaires: solidairesVotes,
        autres: autresVotes
      };
      
      if (totalSyndicateVotes > correctedValidVotes && correctedValidVotes > 0) {
        console.log(`Ligne ${i+1}: Correction - Total des votes par syndicat (${totalSyndicateVotes}) supérieur au nombre de votants (${correctedValidVotes})`);
        
        // Ajuster proportionnellement les votes par syndicat
        const ratio = correctedValidVotes / totalSyndicateVotes;
        Object.keys(correctedVotes).forEach(key => {
          correctedVotes[key] = Math.round(correctedVotes[key] * ratio);
        });
      }
      
      // Calculer les pourcentages
      const totalVotes = correctedValidVotes > 0 ? correctedValidVotes : 1; // Éviter la division par zéro
      const calculatePercentage = (votes) => {
        return parseFloat(((votes / totalVotes) * 100).toFixed(1));
      };
      
      // Préparer les résultats
      const results = [];
      
      // Ajouter les syndicats qui ont des voix
      if (correctedVotes.cgt > 0) {
        results.push({
          union: 'CGT',
          votes: correctedVotes.cgt,
          percentage: calculatePercentage(correctedVotes.cgt),
          seats: 0
        });
      }
      
      if (correctedVotes.cfdt > 0) {
        results.push({
          union: 'CFDT',
          votes: correctedVotes.cfdt,
          percentage: calculatePercentage(correctedVotes.cfdt),
          seats: 0
        });
      }
      
      if (correctedVotes.fo > 0) {
        results.push({
          union: 'FO',
          votes: correctedVotes.fo,
          percentage: calculatePercentage(correctedVotes.fo),
          seats: 0
        });
      }
      
      if (correctedVotes.cftc > 0) {
        results.push({
          union: 'CFTC',
          votes: correctedVotes.cftc,
          percentage: calculatePercentage(correctedVotes.cftc),
          seats: 0
        });
      }
      
      if (correctedVotes.cgc > 0) {
        results.push({
          union: 'CFE-CGC',
          votes: correctedVotes.cgc,
          percentage: calculatePercentage(correctedVotes.cgc),
          seats: 0
        });
      }
      
      if (correctedVotes.unsa > 0) {
        results.push({
          union: 'UNSA',
          votes: correctedVotes.unsa,
          percentage: calculatePercentage(correctedVotes.unsa),
          seats: 0
        });
      }
      
      if (correctedVotes.solidaires > 0) {
        results.push({
          union: 'SOLIDAIRES',
          votes: correctedVotes.solidaires,
          percentage: calculatePercentage(correctedVotes.solidaires),
          seats: 0
        });
      }
      
      if (correctedVotes.autres > 0) {
        results.push({
          union: 'AUTRES',
          votes: correctedVotes.autres,
          percentage: calculatePercentage(correctedVotes.autres),
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
        validVotes: correctedValidVotes,
        blankNullVotes,
        results
      });
      
      console.log(`Ligne ${i+1}: Traitée avec succès - ${company} (${results.length} syndicats)`);
      
    } catch (error) {
      console.error(`Erreur lors du traitement de la ligne ${i+1}:`, error);
    }
  }
  
  return processedData;
}

// Si le script est exécuté directement
if (require.main === module) {
  // Vérifier si un chemin de fichier a été fourni
  if (process.argv.length < 3) {
    console.error("Erreur: Veuillez spécifier le chemin du fichier Excel à importer.");
    console.error("Usage: node import-excel-data.js <chemin_du_fichier_excel>");
    process.exit(1);
  }
  
  const filePath = process.argv[2];
  const data = importExcelData(filePath);
  
  if (data) {
    console.log("Importation réussie!");
    process.exit(0);
  } else {
    console.error("Échec de l'importation.");
    process.exit(1);
  }
}

// Exporter la fonction pour utilisation dans d'autres scripts
module.exports = { importExcelData };
