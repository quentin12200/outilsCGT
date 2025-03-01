import React, { useState } from 'react';

const PlanSyndicalisationModule = () => {
  const [cibles, setCibles] = useState([
    { id: 1, service: '', salaries: 0, syndiques: 0, votantsCGT: 0, responsable: '', priorite: 'moyenne', strategies: [], strategieText: '' }
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState({
    totalSalaries: 0,
    totalSyndiques: 0,
    totalVotantsCGT: 0,
    tauxSyndicalisation: 0,
    potentielSyndicalisation: 0
  });
  
  // Ajout d'une nouvelle cible
  const addCible = () => {
    const newId = cibles.length > 0 ? Math.max(...cibles.map(c => c.id)) + 1 : 1;
    setCibles([...cibles, { 
      id: newId, 
      service: '', 
      salaries: 0, 
      syndiques: 0, 
      votantsCGT: 0, 
      responsable: '', 
      priorite: 'moyenne',
      strategies: [],
      strategieText: ''
    }]);
  };
  
  // Suppression d'une cible
  const removeCible = (id) => {
    if (cibles.length > 1) {
      setCibles(cibles.filter(cible => cible.id !== id));
    }
  };
  
  // Mise à jour des données d'une cible
  const updateCible = (id, field, value) => {
    const updatedCibles = cibles.map(cible => {
      if (cible.id === id) {
        // Convertir en nombre pour les champs numériques
        if (['salaries', 'syndiques', 'votantsCGT'].includes(field)) {
          value = parseInt(value) || 0;
        }
        return { ...cible, [field]: value };
      }
      return cible;
    });
    setCibles(updatedCibles);
  };
  
  // Ajout d'une stratégie à une cible
  const addStrategie = (id) => {
    const updatedCibles = cibles.map(cible => {
      if (cible.id === id && cible.strategieText.trim()) {
        const newStrategies = [...cible.strategies, cible.strategieText];
        return { ...cible, strategies: newStrategies, strategieText: '' };
      }
      return cible;
    });
    setCibles(updatedCibles);
  };
  
  // Suppression d'une stratégie
  const removeStrategie = (cibleId, index) => {
    const updatedCibles = cibles.map(cible => {
      if (cible.id === cibleId) {
        const newStrategies = [...cible.strategies];
        newStrategies.splice(index, 1);
        return { ...cible, strategies: newStrategies };
      }
      return cible;
    });
    setCibles(updatedCibles);
  };
  
  // Validation et soumission du plan
  const submitPlan = () => {
    // Vérifier que tous les services ont un nom
    const emptyServices = cibles.filter(c => !c.service.trim());
    if (emptyServices.length > 0) {
      alert("Tous les services doivent avoir un nom.");
      return;
    }
    
    // Calculer les statistiques globales
    let totalSalaries = 0;
    let totalSyndiques = 0;
    let totalVotantsCGT = 0;
    
    cibles.forEach(cible => {
      totalSalaries += cible.salaries;
      totalSyndiques += cible.syndiques;
      totalVotantsCGT += cible.votantsCGT;
    });
    
    const tauxSyndicalisation = totalSalaries > 0 ? (totalSyndiques / totalSalaries) * 100 : 0;
    const tauxVoteCGT = totalSalaries > 0 ? (totalVotantsCGT / totalSalaries) * 100 : 0;
    const potentielSyndicalisation = totalVotantsCGT - totalSyndiques;
    
    setStats({
      totalSalaries,
      totalSyndiques,
      totalVotantsCGT,
      tauxSyndicalisation,
      tauxVoteCGT,
      potentielSyndicalisation
    });
    
    setSubmitted(true);
  };
  
  // Obtenir le taux de syndicalisation pour une cible
  const getTauxSyndicalisation = (cible) => {
    if (cible.salaries === 0) return 0;
    return (cible.syndiques / cible.salaries) * 100;
  };
  
  // Obtenir le potentiel de syndicalisation (votants CGT non syndiqués)
  const getPotentielSyndicalisation = (cible) => {
    return Math.max(0, cible.votantsCGT - cible.syndiques);
  };
  
  // Obtenir la classe CSS pour la priorité
  const getPrioriteClass = (priorite) => {
    switch(priorite) {
      case 'haute': return 'bg-red-100 text-red-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'basse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100';
    }
  };
  
  // Rendu du récapitulatif et des recommandations
  const renderRecap = () => {
    if (!submitted) return null;
    
    // Tri des cibles par potentiel de syndicalisation décroissant
    const sortedCibles = [...cibles]
      .sort((a, b) => getPotentielSyndicalisation(b) - getPotentielSyndicalisation(a));
    
    // Les 3 cibles prioritaires
    const topCibles = sortedCibles.slice(0, 3);
    
    // Calcul de l'objectif de syndicalisation
    const objectifTotal = Math.min(stats.totalVotantsCGT, Math.ceil(stats.totalSyndiques * 1.2)); // +20% ou atteindre le niveau des votants
    const objectifNouveau = objectifTotal - stats.totalSyndiques;
    
    return (
      <div className="mt-8">
        <h3 className="text-lg font-bold text-red-600 mb-4">Plan de syndicalisation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold mb-2">Situation actuelle</h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600">Salariés</div>
                <div className="text-2xl font-bold">{stats.totalSalaries}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Syndiqués</div>
                <div className="text-2xl font-bold">{stats.totalSyndiques}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Taux de syndicalisation</div>
                <div className="text-2xl font-bold">{stats.tauxSyndicalisation.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Votants CGT</div>
                <div className="text-2xl font-bold">{stats.totalVotantsCGT}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-sm mb-1">Rapport votants/syndiqués</div>
              <div className="flex items-center">
                <div className="flex-1 mr-2">
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div 
                      className="h-4 bg-red-600 rounded-full"
                      style={{ width: `${stats.tauxSyndicalisation}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div 
                      className="h-4 bg-blue-600 rounded-full"
                      style={{ width: `${stats.tauxVoteCGT}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <div>Syndiqués</div>
                <div>Votants CGT</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold mb-2">Objectifs de syndicalisation</h4>
            
            <div className="mb-4">
              <div className="text-sm text-gray-600">Potentiel de syndicalisation</div>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">{stats.potentielSyndicalisation}</div>
                <div className="text-sm text-gray-500">votants CGT non syndiqués</div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded mb-4">
              <p className="font-semibold">Objectif à court terme (+20%)</p>
              <p className="text-lg">De <strong>{stats.totalSyndiques}</strong> à <strong>{objectifTotal}</strong> syndiqués</p>
              <p className="text-sm text-gray-600">Soit {objectifNouveau} nouvelles adhésions</p>
            </div>
            
            <div className="p-3 bg-red-50 rounded">
              <p className="font-semibold">Répartition de l'effort</p>
              <p className="text-sm">Si chaque syndiqué actuel convainc en moyenne {(objectifNouveau / stats.totalSyndiques).toFixed(2)} collègues, l'objectif sera atteint.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow mb-6">
          <h4 className="font-semibold mb-4">Cibles prioritaires</h4>
          
          {topCibles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topCibles.map((cible) => {
                const potentiel = getPotentielSyndicalisation(cible);
                return (
                  <div key={cible.id} className="border rounded p-3">
                    <h5 className="font-semibold text-lg">{cible.service}</h5>
                    <div className="grid grid-cols-2 gap-2 my-2 text-sm">
                      <div>
                        <div className="text-gray-600">Syndiqués</div>
                        <div className="font-bold">{cible.syndiques}/{cible.salaries}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Votants CGT</div>
                        <div className="font-bold">{cible.votantsCGT}</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm text-gray-600">Potentiel</div>
                      <div className="font-bold text-red-600">{potentiel} adhésions possibles</div>
                    </div>
                    <div className={`mt-2 text-xs px-2 py-1 rounded-full inline-block ${getPrioriteClass(cible.priorite)}`}>
                      Priorité {cible.priorite}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">Aucune cible définie</p>
          )}
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Stratégie globale</h4>
          
          <div className="bg-red-50 p-4 rounded border-l-4 border-red-600">
            <p className="mb-2">Pour atteindre l'objectif de syndicalisation, nous recommandons :</p>
            <ol className="list-decimal pl-5">
              <li className="mb-1">Concentrer les efforts sur les services à fort potentiel (votants CGT non syndiqués)</li>
              <li className="mb-1">Cibler en priorité les personnes ayant voté CGT lors des dernières élections</li>
              <li className="mb-1">Organiser des rencontres conviviales par service pour favoriser l'adhésion</li>
              <li className="mb-1">Mettre en place un parrainage : chaque syndiqué accompagne un nouveau pendant 3 mois</li>
              <li className="mb-1">Utiliser le cahier revendicatif comme support concret pour montrer l'utilité du syndicat</li>
            </ol>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-red-600 mb-6">Plan de syndicalisation</h2>
      
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-4">Définir les cibles de syndicalisation</h3>
        
        {cibles.map((cible, index) => (
          <div key={cible.id} className="p-4 border rounded mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Service / Département</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={cible.service}
                  onChange={(e) => updateCible(cible.id, 'service', e.target.value)}
                  placeholder="Nom du service"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Responsable syndical</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={cible.responsable}
                  onChange={(e) => updateCible(cible.id, 'responsable', e.target.value)}
                  placeholder="Personne en charge"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Nombre de salariés</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={cible.salaries}
                  onChange={(e) => updateCible(cible.id, 'salaries', e.target.value)}
                  min="0"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Syndiqués actuels</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={cible.syndiques}
                  onChange={(e) => updateCible(cible.id, 'syndiques', e.target.value)}
                  min="0"
                  max={cible.salaries}
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Votants CGT</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={cible.votantsCGT}
                  onChange={(e) => updateCible(cible.id, 'votantsCGT', e.target.value)}
                  min="0"
                  max={cible.salaries}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 font-medium">Priorité</label>
              <select
                className="w-full border p-2 rounded"
                value={cible.priorite}
                onChange={(e) => updateCible(cible.id, 'priorite', e.target.value)}
              >
                <option value="haute">Haute</option>
                <option value="moyenne">Moyenne</option>
                <option value="basse">Basse</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 font-medium">Stratégies spécifiques</label>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 border p-2 rounded-l"
                  value={cible.strategieText}
                  onChange={(e) => updateCible(cible.id, 'strategieText', e.target.value)}
                  placeholder="Ajouter une stratégie spécifique à ce service..."
                />
                <button
                  type="button"
                  className="bg-gray-200 px-4 py-2 rounded-r hover:bg-gray-300"
                  onClick={() => addStrategie(cible.id)}
                >
                  Ajouter
                </button>
              </div>
              
              {cible.strategies.length > 0 && (
                <ul className="mt-2 list-disc pl-5">
                  {cible.strategies.map((strategie, idx) => (
                    <li key={idx} className="text-sm">
                      {strategie}
                      <button
                        className="ml-2 text-red-600 text-xs hover:text-red-800"
                        onClick={() => removeStrategie(cible.id, idx)}
                      >
                        (retirer)
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm">
                {cible.salaries > 0 && (
                  <>
                    <span className="font-medium">Taux actuel : </span>
                    <span>{getTauxSyndicalisation(cible).toFixed(1)}%</span>
                    {getPotentielSyndicalisation(cible) > 0 && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="font-medium">Potentiel : </span>
                        <span className="text-red-600">+{getPotentielSyndicalisation(cible)} syndiqué(s)</span>
                      </>
                    )}
                  </>
                )}
              </div>
              
              <button
                className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                onClick={() => removeCible(cible.id)}
                disabled={cibles.length === 1}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
        
        <div className="flex gap-2 mt-4">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            onClick={addCible}
          >
            Ajouter un service
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={submitPlan}
          >
            Générer le plan
          </button>
        </div>
      </div>
      
      {renderRecap()}
    </div>
  );
};
ReactDOM.render(
    <PlanSyndicalisationModule />,
    document.getElementById('syndicalisation-container')
  );
export default PlanSyndicalisationModule;