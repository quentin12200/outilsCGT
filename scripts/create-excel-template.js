const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Créer un nouveau classeur
const workbook = XLSX.utils.book_new();

// Définir les en-têtes selon le format PV Red Score
const headers = [
  'cycle',
  'siret',
  'id_pv',
  'FD',
  'idcc',
  'raison_sociale',
  'departement',
  'ville',
  'adresse_1',
  'institution',
  'compo_coll',
  'deno_coll',
  'date_scrutin',
  'duree_mand',
  'date_prochain',
  'nb_inscrits',
  'num_votants',
  'num_blanc_nul',
  'num_sve',
  'score_CGT',
  'score_CFDT',
  'score_FO',
  'score_CFTC',
  'score_CFE_CGC',
  'score_UNSA',
  'score_SOLIDAIRES',
  'score_AUTRES'
];

// Créer des données d'exemple
const exampleData = [
  [
    'c4',                   // cycle
    '12345678901234',       // siret
    'PV001',                // id_pv
    'COMMERCE',             // FD
    '1234',                 // idcc
    'Entreprise Exemple 1', // raison_sociale
    '12',                   // departement
    'Rodez',                // ville
    '1 rue de l\'exemple',  // adresse_1
    'CSE',                  // institution
    'Titulaires',           // compo_coll
    'Collège unique',       // deno_coll
    '01/02/2023',           // date_scrutin
    '4',                    // duree_mand
    '01/02/2027',           // date_prochain
    '100',                  // nb_inscrits
    '80',                   // num_votants
    '5',                    // num_blanc_nul
    '75',                   // num_sve
    '30',                   // score_CGT
    '20',                   // score_CFDT
    '15',                   // score_FO
    '5',                    // score_CFTC
    '5',                    // score_CFE_CGC
    '0',                    // score_UNSA
    '0',                    // score_SOLIDAIRES
    '0'                     // score_AUTRES
  ],
  [
    'c4',                   // cycle
    '98765432109876',       // siret
    'PV002',                // id_pv
    'METALLURGIE',          // FD
    '2345',                 // idcc
    'Entreprise Exemple 2', // raison_sociale
    '12',                   // departement
    'Millau',               // ville
    '2 avenue du modèle',   // adresse_1
    'CSE',                  // institution
    'Titulaires',           // compo_coll
    '1er collège',          // deno_coll
    '15/03/2023',           // date_scrutin
    '4',                    // duree_mand
    '15/03/2027',           // date_prochain
    '50',                   // nb_inscrits
    '40',                   // num_votants
    '2',                    // num_blanc_nul
    '38',                   // num_sve
    '20',                   // score_CGT
    '10',                   // score_CFDT
    '5',                    // score_FO
    '3',                    // score_CFTC
    '0',                    // score_CFE_CGC
    '0',                    // score_UNSA
    '0',                    // score_SOLIDAIRES
    '0'                     // score_AUTRES
  ],
  [
    'c4',                   // cycle
    '98765432109876',       // siret (même que précédent pour montrer un exemple avec plusieurs collèges)
    'PV003',                // id_pv
    'METALLURGIE',          // FD
    '2345',                 // idcc
    'Entreprise Exemple 2', // raison_sociale
    '12',                   // departement
    'Millau',               // ville
    '2 avenue du modèle',   // adresse_1
    'CSE',                  // institution
    'Titulaires',           // compo_coll
    '2ème collège',         // deno_coll
    '15/03/2023',           // date_scrutin
    '4',                    // duree_mand
    '15/03/2027',           // date_prochain
    '30',                   // nb_inscrits
    '25',                   // num_votants
    '1',                    // num_blanc_nul
    '24',                   // num_sve
    '12',                   // score_CGT
    '8',                    // score_CFDT
    '2',                    // score_FO
    '0',                    // score_CFTC
    '2',                    // score_CFE_CGC
    '0',                    // score_UNSA
    '0',                    // score_SOLIDAIRES
    '0'                     // score_AUTRES
  ]
];

// Combiner les en-têtes et les données
const data = [headers, ...exampleData];

// Créer une feuille de calcul
const worksheet = XLSX.utils.aoa_to_sheet(data);

// Ajouter des styles pour les en-têtes (gras et fond gris)
const headerStyle = {
  font: { bold: true },
  fill: { fgColor: { rgb: "DDDDDD" } }
};

// Appliquer des styles aux cellules d'en-tête
const range = XLSX.utils.decode_range(worksheet['!ref']);
for (let col = range.s.c; col <= range.e.c; col++) {
  const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
  if (!worksheet[cellAddress]) worksheet[cellAddress] = {};
  worksheet[cellAddress].s = headerStyle;
}

// Ajouter la feuille au classeur
XLSX.utils.book_append_sheet(workbook, worksheet, "PV Red Score");

// Créer le répertoire de destination s'il n'existe pas
const templateDir = path.join(__dirname, '..', 'frontend', 'public', 'templates');
if (!fs.existsSync(templateDir)) {
  fs.mkdirSync(templateDir, { recursive: true });
}

// Chemin du fichier de sortie
const outputPath = path.join(templateDir, 'modele_pv_red_score.xlsx');

// Écrire le classeur dans un fichier
XLSX.writeFile(workbook, outputPath);

console.log(`Modèle Excel créé avec succès: ${outputPath}`);
