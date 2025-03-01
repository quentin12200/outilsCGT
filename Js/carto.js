import React, { useState, useEffect } from 'react';

const CartoModule = () => {
  const [services, setServices] = useState([
    { name: '', salaries: 0, syndiques: 0 }
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState({
    totalSalaries: 0,
    totalSyndiques: 0,
    globalRatio: 0,
    above50: [],
    below25: []
  });
  
  const addService = () => {
    setServices([...services, { name: '', salaries: 0, syndiques: 0 }]);
  };
  
  const removeService = (index) => {
    if (services.length > 1) {
      const updatedServices = [...services];
      updatedServices.splice(index, 1);
      setServices(updatedServices);
    }
  };
  
  const updateService = (index, field, value) => {
    const updatedServices = [...services];
    
    // Convertir en nombre pour les champs numériques
    if (field === 'salaries' || field === 'syndiques') {
      value = parseInt(value) || 0;
    }
    
    // S'assurer que syndiques ne dépasse pas salaries
    if (field === 'syndiques' && value > updatedServices[index].salaries) {
      value = updatedServices[index].salaries;
    }
    
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };
  
  const submitServices = () => {
    // Vérifier que tous les services ont un nom
    const emptyServices = services.filter(s => !s.name.trim());
    if (emptyServices.length > 0) {
      alert("Tous les services doivent avoir un nom.");
      return;
    }
    
    // Vérifier la cohérence des données
    for (const service of services) {
      if (service.syndiques > service.salaries) {
        alert(`Le service "${service.name}" a plus de syndiqués que de salariés.`);
        return;
      }
    }
    
    // Calculer les statistiques globales
    let totalSalaries = 0;
    let totalSyndiques = 0;
    let above50 = [];
    let below25 = [];
    
    services.forEach(service => {
      totalSalaries += service.salaries;
      totalSyndiques += service.syndiques;
      
      if (service.salaries > 0) {
        const rate = service.syndiques / service.salaries;
        if (rate >= 0.5) {
          above50.push(service.name);
        }
        if (rate < 0.25 && service.salaries > 5) {
          below25.push(service.name);
        }
      }
    });
    
    const globalRatio = totalSalaries > 0 ? (totalSyndiques / totalSalaries) * 100 : 0;
    
    setStats({
      totalSalaries,
      totalSyndiques,
      globalRatio,
      above50,
      below25
    });
    
    setSubmitted(true);
  };
  
  const getServiceClass = (service) => {
    if (service.salaries <= 0) return '';
    
    const rate = service.syndiques / service.salaries;
    if (rate >= 0.5) return 'bg-green-100 border-green-500';
    if (rate >= 0.25) return 'bg-yellow-100 border-yellow-500';
    return 'bg-red-100 border-red-500';
  };
  
  const renderActionPlan = () => {
    if (!submitted) return null;
    
    const priorityServices = [...stats.below25];
    const potentialGrowth = services
      .filter(s => s.salaries > 0)
      .map(s => ({
        name: s.name,
        current: s.syndiques,
        potential: s.salaries - s.syndiques,
        ratio: s.syndiques / s.salaries
      }))
      .sort((a, b) => b.potential - a.potential)
      .slice(0, 3);
    
    return (
      <div className="mt-8 p-4 bg-white rounded shadow">
        <h3 className="text-lg font-bold text-red-600 mb-4">Plan d'action stratégique</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded border-l-4 border-red-600">
            <h4 className="font-bold mb-2">Priorités d'intervention</h4>
            {priorityServices.length > 0 ? (
              <>
                <p className="mb-2">Services à faible taux de syndicalisation (moins de 25%) :</p>
                <ul className="list-disc pl-5">
                  {priorityServices.map((service, idx) => (
                    <li key={idx}>{service}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Aucun service n'est en dessous de 25% de syndicalisation. Continuez vos efforts pour augmenter le taux global.</p>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
            <h4 className="font-bold mb-2">Potentiel de croissance</h4>
            <p className="mb-2">Services présentant le plus fort potentiel de progression :</p>
            <ul className="list-disc pl-5">
              {potentialGrowth.map((service, idx) => (
                <li key={idx}>
                  {service.name} : {service.potential} salariés non-syndiqués 
                  ({(service.ratio * 100).toFixed(1)}% actuellement)
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {stats.above50.length > 0 && (
          <div className="bg-green-50 p-4 rounded mb-6 border-l-4 border-green-600">
            <h4 className="font-bold mb-2">Modèles de réussite</h4>
            <p className="mb-2">Services à fort taux de syndicalisation (plus de 50%) pouvant servir d'exemple :</p>
            <ul className="list-disc pl-5">
              {stats.above50.map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm italic">Ces services peuvent être mobilisés pour aider à syndiquer les autres secteurs.</p>
          </div>
        )}
        
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-bold mb-2">Axes de travail prioritaires</h4>
          <ol className="list-decimal pl-5">
            <li className="mb-2">Organiser des AG de syndiqués dans les {stats.below25.length > 0 ? 'services prioritaires' : 'services à fort potentiel'}</li>
            <li className="mb-2">Développer un cahier revendicatif par service en partant des besoins exprimés</li>
            <li className="mb-2">Mettre en place un plan de visites de services et tournées systématiques</li>
            <li className="mb-2">Déployer les syndiqués dans leur proximité immédiate avec des outils de pointage nominatifs</li>
          </ol>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-red-600 mb-4">Cartographie stratégique des établissements</h2>
      
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-4">Ajouter des services</h3>
        
        {/* En-tête des colonnes */}
        <div className="flex mb-2 font-bold">
          <div className="flex-1">Service</div>
          <div className="w-24 text-right">Salariés</div>
          <div className="w-24 text-right">Syndiqués</div>
          <div className="w-24"></div>
        </div>
        
        {/* Liste des services */}
        {services.map((service, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded mr-2"
              value={service.name}
              onChange={(e) => updateService(index, 'name', e.target.value)}
              placeholder="Nom du service"
            />
            <input
              type="number"
              className="w-24 border p-2 rounded mr-2"
              value={service.salaries}
              onChange={(e) => updateService(index, 'salaries', e.target.value)}
              min="1"
              placeholder="Salariés"
            />
            <input
              type="number"
              className="w-24 border p-2 rounded mr-2"
              value={service.syndiques}
              onChange={(e) => updateService(index, 'syndiques', e.target.value)}
              min="0"
              max={service.salaries}
              placeholder="Syndiqués"
            />
            <button
              className="w-24 bg-red-100 text-red-600 p-2 rounded hover:bg-red-200"
              onClick={() => removeService(index)}
            >
              Supprimer
            </button>
          </div>
        ))}
        
        {/* Boutons d'action */}
        <div className="flex mt-4">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-300"
            onClick={addService}
          >
            Ajouter un service
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={submitServices}
          >
            Générer la cartographie
          </button>
        </div>
      </div>
      
      {submitted && (
        <>
          {/* Résumé global */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="text-lg font-bold text-red-600 mb-4">Synthèse globale</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <div className="text-gray-600">Salariés totaux</div>
                <div className="text-2xl font-bold">{stats.totalSalaries}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <div className="text-gray-600">Syndiqués totaux</div>
                <div className="text-2xl font-bold">{stats.totalSyndiques}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <div className="text-gray-600">Taux global</div>
                <div className="text-2xl font-bold">{stats.globalRatio.toFixed(1)}%</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-red-600 h-4 rounded-full"
                style={{ width: `${Math.min(stats.globalRatio, 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Cartographie détaillée */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="text-lg font-bold text-red-600 mb-4">Cartographie des services</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => {
                const ratio = service.salaries > 0 ? (service.syndiques / service.salaries) * 100 : 0;
                
                return (
                  <div 
                    key={index}
                    className={`border p-4 rounded shadow ${getServiceClass(service)}`}
                  >
                    <h4 className="font-bold mb-2">{service.name}</h4>
                    <div className="flex justify-between mb-2">
                      <span>Salariés: {service.salaries}</span>
                      <span>Syndiqués: {service.syndiques}</span>
                    </div>
                    <div className="text-right font-bold mb-2">
                      Taux: {ratio.toFixed(1)}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${ratio}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Plan d'action */}
          {renderActionPlan()}
        </>
      )}
    </div>
  );
};

export default CartoModule;