// frontend/src/components/CartoModule/ActionPlan.js
import React from 'react';

const ActionPlan = ({ stats, services }) => {
  // Calculate priority services
  const priorityServices = [...stats.below25];
  
  // Find services with most potential for growth
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

export default ActionPlan;