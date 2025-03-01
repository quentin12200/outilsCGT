import React, { useState } from 'react';

const ResultatsElectionModule = () => {
  const [elections, setElections] = useState([
    { id: 1, etablissement: '', dateScrutin: '', inscrits: 0, votants: 0, cgt: 0, cfdt: 0, fo: 0, cftc: 0, cfe: 0, autres: 0 }
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [comparison, setComparison] = useState({
    totalVoix: 0,
    pourcentageCGT: 0,
    tendance: 0,
    analyseTendance: ''
  });
  
  // Ajout d'une nouvelle élection
  const addElection = () => {
    const newId = elections.length > 0 ? Math.max(...elections.map(e => e.id)) + 1 : 1;
    setElections([...elections, { 
      id: newId, 
      etablissement: '', 
      dateScrutin: '', 
      inscrits: 0, 
      votants: 0, 
      cgt: 0, 
      cfdt: 0, 
      fo: 0, 
      cftc: 0, 
      cfe: 0, 
      autres: 0 
    }]);
  };
  
  // Suppression d'une élection
  const removeElection = (id) => {
    if (elections.length > 1) {
      setElections(elections.filter(election => election.id !== id));
    }
  };
  
  // Mise à jour des données d'une élection
  const updateElection = (id, field, value) => {
    const updatedElections = elections.map(election => {
      if (election.id === id) {
        // Convertir en nombre pour les champs numériques
        if (['inscrits', 'votants', 'cgt', 'cfdt', 'fo', 'cftc', 'cfe', 'autres'].includes(field)) {
          value = parseInt(value) || 0;
        }
        return { ...election, [field]: value };
      }
      return election;
    });
    setElections(updatedElections);
  };
  
  // Vérification de la cohérence des données
  const validateData = (election) => {
    const totalVoix = election.cgt + election.cfdt + election.fo + election.cftc + election.cfe + election.autres;
    
    if (totalVoix > election.votants) {
      return `Erreur: Le total des voix (${totalVoix}) est supérieur au nombre de votants (${election.votants}) pour ${election.etablissement || 'un établissement'}`;
    }
    
    if (election.votants > election.inscrits) {
      return `Erreur: Le nombre de votants (${election.votants}) est supérieur au nombre d'inscrits (${election.inscrits}) pour ${election.etablissement || 'un établissement'}`;
    }
    
    return null;
  };
  
  // Soumission et analyse des résultats
  const submitResults = () => {
    // Validation des données
    for (const election of elections) {
      const error = validateData(election);
      if (error) {
        alert(error);
        return;
      }
    }
    
    // Analyse des résultats
    let totalInscrits = 0;
    let totalVotants = 0;
    let totalVoixCGT = 0;
    let totalVoixTous = 0;
    let tendance = 0;
    
    // Si nous avons des élections précédentes pour comparer
    if (elections.length > 1) {
      // Trier par date
      const sortedElections = [...elections].sort((a, b) => new Date(a.dateScrutin) - new Date(b.dateScrutin));
      const previous = sortedElections[0];
      const current = sortedElections[sortedElections.length - 1];
      
      // Calcul des pourcentages CGT précédent et actuel
      const previousTotal = previous.cgt + previous.cfdt + previous.fo + previous.cftc + previous.cfe + previous.autres;
      const currentTotal = current.cgt + current.cfdt + current.fo + current.cftc + current.cfe + current.autres;
      
      const previousPercentage = previousTotal > 0 ? (previous.cgt / previousTotal) * 100 : 0;
      const currentPercentage = currentTotal > 0 ? (current.cgt / currentTotal) * 100 : 0;
      
      tendance = currentPercentage - previousPercentage;
      
      totalInscrits = current.inscrits;
      totalVotants = current.votants;
      totalVoixCGT = current.cgt;
      totalVoixTous = currentTotal;
    } else {
      // Sinon, juste les données de l'élection actuelle
      const election = elections[0];
      totalInscrits = election.inscrits;
      totalVotants = election.votants;
      totalVoixCGT = election.cgt;
      totalVoixTous = election.cgt + election.cfdt + election.fo + election.cftc + election.cfe + election.autres;
    }
    
    // Analyse de la tendance
    let analyseTendance = '';
    if (tendance > 5) {
      analyseTendance = 'Forte progression - La démarche engagée porte ses fruits !';
    } else if (tendance > 2) {
      analyseTendance = 'Progression significative - Continuez à renforcer la démarche';
    } else if (tendance > 0) {
      analyseTendance = 'Légère progression - Intensifiez la démarche démocratique';
    } else if (tendance === 0) {
      analyseTendance = 'Stagnation - Nécessité de revoir notre approche';
    } else if (tendance > -5) {
      analyseTendance = 'Léger recul - Besoin urgent de redynamiser la démarche';
    } else {
      analyseTendance = 'Fort recul - Analyse détaillée et reset complet de la démarche nécessaire';
    }
    
    setComparison({
      totalVoix: totalVoixTous,
      pourcentageCGT: totalVoixTous > 0 ? (totalVoixCGT / totalVoixTous) * 100 : 0,
      pourcentageParticipation: totalInscrits > 0 ? (totalVotants / totalInscrits) * 100 : 0,
      tendance,
      analyseTendance
    });
    
    setSubmitted(true);
  };
  
  // Rendu des graphiques de résultats
  const renderResultsCharts = () => {
    if (!submitted) return null;
    
    // Dernière élection pour les graphiques
    const latestElection = [...elections].sort((a, b) => new Date(b.dateScrutin) - new Date(a.dateScrutin))[0];
    const totalVoix = latestElection.cgt + latestElection.cfdt + latestElection.fo + latestElection.cftc + latestElection.cfe + latestElection.autres;
    
    return (
      <div className="mt-8">
        <h3 className="text-lg font-bold text-red-600 mb-4">Résultats de l'élection</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded shadow">
            <h4 className="font-semibold mb-2">Participation</h4>
            <div className="flex justify-between mb-1">
              <span>Participation:</span>
              <span>{comparison.pourcentageParticipation.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${comparison.pourcentageParticipation}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Inscrits: {latestElection.inscrits}</span>
              <span>Votants: {latestElection.votants}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded shadow">
            <h4 className="font-semibold mb-2">Score CGT</h4>
            <div className="flex justify-between mb-1">
              <span>CGT:</span>
              <span>{comparison.pourcentageCGT.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-red-600 h-2 rounded-full" 
                style={{ width: `${comparison.pourcentageCGT}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Voix CGT: {latestElection.cgt}</span>
              <span>Total voix: {totalVoix}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded shadow">
            <h4 className="font-semibold mb-2">Évolution CGT</h4>
            <div className="flex justify-between mb-1">
              <span>Tendance:</span>
              <span className={comparison.tendance > 0 ? 'text-green-600' : comparison.tendance < 0 ? 'text-red-600' : ''}>
                {comparison.tendance > 0 ? '+' : ''}{comparison.tendance.toFixed(1)}%
              </span>
            </div>
            <div className="mt-4 text-sm">
              {comparison.analyseTendance}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded shadow mb-6">
          <h4 className="font-semibold mb-4">Répartition des voix</h4>
          <div className="flex h-8 w-full rounded-lg overflow-hidden">
            {totalVoix > 0 && (
              <>
                <div 
                  className="bg-red-600 h-full text-white text-xs flex items-center justify-center"
                  style={{ width: `${(latestElection.cgt / totalVoix) * 100}%` }}
                >
                  {latestElection.cgt > 0 ? 'CGT' : ''}
                </div>
                <div 
                  className="bg-orange-500 h-full text-white text-xs flex items-center justify-center"
                  style={{ width: `${(latestElection.cfdt / totalVoix) * 100}%` }}
                >
                  {latestElection.cfdt > 0 ? 'CFDT' : ''}
                </div>
                <div 
                  className="bg-yellow-500 h-full text-white text-xs flex items-center justify-center"
                  style={{ width: `${(latestElection.fo / totalVoix) * 100}%` }}
                >
                  {latestElection.fo > 0 ? 'FO' : ''}
                </div>
                <div 
                  className="bg-blue-500 h-full text-white text-xs flex items-center justify-center"
                  style={{ width: `${(latestElection.cftc / totalVoix) * 100}%` }}
                >
                  {latestElection.cftc > 0 ? 'CFTC' : ''}
                </div>
                <div 
                  className="bg-green-500 h-full text-white text-xs flex items-center justify-center"
                  style={{ width: `${(latestElection.cfe / totalVoix) * 100}%` }}
                >
                  {latestElection.cfe > 0 ? 'CFE' : ''}
                </div>
                <div 
                  className="bg-gray-500 h-full text-white text-xs flex items-center justify-center"
                  style={{ width: `${(latestElection.autres / totalVoix) * 100}%` }}
                >
                  {latestElection.autres > 0 ? 'Autres' : ''}
                </div>
              </>
            )}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <div>CGT: {latestElection.cgt > 0 ? ((latestElection.cgt / totalVoix) * 100).toFixed(1) + '%' : '0%'}</div>
            <div>CFDT: {latestElection.cfdt > 0 ? ((latestElection.cfdt / totalVoix) * 100).toFixed(1) + '%' : '0%'}</div>
            <div>FO: {latestElection.fo > 0 ? ((latestElection.fo / totalVoix) * 100).toFixed(1) + '%' : '0%'}</div>
            <div>CFTC: {latestElection.cftc > 0 ? ((latestElection.cftc / totalVoix) * 100).toFixed(1) + '%' : '0%'}</div>
            <div>CFE: {latestElection.cfe > 0 ? ((latestElection.cfe / totalVoix) * 100).toFixed(1) + '%' : '0%'}</div>
            <div>Autres: {latestElection.autres > 0 ? ((latestElection.autres / totalVoix) * 100).toFixed(1) + '%' : '0%'}</div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded border-l-4 border-red-600">
          <h4 className="font-bold mb-2">Analyse et recommandations:</h4>
          
          {comparison.pourcentageCGT >= 50 ? (
            <p>La CGT est majoritaire ! Position idéale pour obtenir des avancées sociales significatives. Veillez à maintenir une dynamique de syndicalisation pour pérenniser cette position.</p>
          ) : comparison.pourcentageCGT >= 30 ? (
            <p>La CGT dispose d'une influence significative. Concentrez vos efforts sur la syndicalisation des salariés qui ont voté CGT mais ne sont pas encore adhérents.</p>
          ) : (
            <p>La CGT doit renforcer sa présence. Priorité à la démarche démocratique et au travail de terrain pour recueillir les besoins réels des salariés.</p>
          )}
          
          {comparison.pourcentageParticipation < 50 && (
            <p className="mt-2 text-orange-700">La participation est faible. Cela indique un désintérêt ou un manque de confiance des salariés envers les élections professionnelles. Renforcer la communication sur l'utilité concrète du vote.</p>
          )}
          
          {comparison.tendance < 0 && (
            <p className="mt-2 text-red-700">La tendance est à la baisse. Nécessité de revoir la démarche, notamment en renforçant le lien direct avec les salariés et en construisant un cahier revendicatif plus ancré dans leurs besoins quotidiens.</p>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-red-600 mb-6">Analyse des élections et représentativité</h2>
      
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-4">Saisie des résultats d'élections</h3>
        
        {elections.map((election, index) => (
          <div key={election.id} className="p-4 border rounded mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Établissement/Service</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={election.etablissement}
                  onChange={(e) => updateElection(election.id, 'etablissement', e.target.value)}
                  placeholder="Nom de l'établissement"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Date du scrutin</label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={election.dateScrutin}
                  onChange={(e) => updateElection(election.id, 'dateScrutin', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Inscrits</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={election.inscrits}
                  onChange={(e) => updateElection(election.id, 'inscrits', e.target.value)}
                  min="0"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Votants</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={election.votants}
                  onChange={(e) => updateElection(election.id, 'votants', e.target.value)}
                  min="0"
                  max={election.inscrits}
                />
              </div>
            </div>
            
            <h4 className="font-medium mb-2">Répartition des voix</h4>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div>
                <label className="block mb-1 text-sm">CGT</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={election.cgt}
                  onChange={(e) => updateElection(election.id, 'cgt', e.target.value)}
                  min="0"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm">CFDT</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={election.cfdt}
                  onChange={(e) => updateElection(election.id, 'cfdt', e.target.value)}
                  min="0"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm">FO</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={election.fo}
                  onChange={(e) => updateElection(election.id, 'fo', e.target.value)}
                  min="0"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm">CFTC</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={election.cftc}
                  onChange={(e) => updateElection(election.id, 'cftc', e.target.value)}
                  min="0"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm">CFE-CGC</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={election.cfe}
                  onChange={(e) => updateElection(election.id, 'cfe', e.target.value)}
                  min="0"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm">Autres</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={election.autres}
                  onChange={(e) => updateElection(election.id, 'autres', e.target.value)}
                  min="0"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200"
                onClick={() => removeElection(election.id)}
                disabled={elections.length === 1}
              >
                Supprimer cette élection
              </button>
            </div>
          </div>
        ))}
        
        <div className="flex gap-2 mt-4">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            onClick={addElection}
          >
            Ajouter une élection
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={submitResults}
          >
            Analyser les résultats
          </button>
        </div>
        
        <p className="mt-4 text-sm text-gray-600">
          Note: Si vous ajoutez plusieurs élections, l'analyse inclura une comparaison des tendances entre la plus ancienne et la plus récente.
        </p>
      </div>
      
      {renderResultsCharts()}
    </div>
  );
};
ReactDOM.render(
    <ResultatsElectionModule />,
    document.getElementById('resultats-container')
  );
export default ResultatsElectionModule;