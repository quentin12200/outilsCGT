// Composant ServiceForm amélioré
import React from 'react';

const ServiceForm = ({ services, onAddService, onRemoveService, onUpdateService, onSubmit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold text-red-700 mb-4">Cartographie stratégique des établissements</h3>
      
      <p className="mb-6 text-gray-600">
        Analysez et visualisez la répartition des syndiqués par service. Cet outil vous permettra d'identifier les zones prioritaires d'intervention.
      </p>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-3">Ajouter des services</h4>
        
        {/* En-têtes des colonnes */}
        <div className="flex items-center mb-2 font-bold border-b pb-2">
          <div className="flex-1">Service</div>
          <div className="w-28 text-center">Salariés</div>
          <div className="w-28 text-center">Syndiqués</div>
          <div className="w-28"></div>
        </div>
        
        {/* Liste des services */}
        {services.map((service, index) => (
          <div key={index} className="flex items-center mb-3">
            <input
              type="text"
              className="flex-1 border border-gray-300 p-2 rounded mr-2"
              value={service.name}
              onChange={(e) => onUpdateService(index, 'name', e.target.value)}
              placeholder="Nom du service"
            />
            <input
              type="number"
              className="w-28 border border-gray-300 p-2 rounded mx-2 text-center"
              value={service.salaries}
              onChange={(e) => onUpdateService(index, 'salaries', e.target.value)}
              min="1"
              placeholder="Salariés"
            />
            <input
              type="number"
              className="w-28 border border-gray-300 p-2 rounded mx-2 text-center"
              value={service.syndiques}
              onChange={(e) => onUpdateService(index, 'syndiques', e.target.value)}
              min="0"
              max={service.salaries}
              placeholder="Syndiqués"
            />
            <button
              className="w-28 bg-red-50 text-red-700 p-2 rounded hover:bg-red-100 transition"
              onClick={() => onRemoveService(index)}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
      
      {/* Boutons d'action */}
      <div className="flex mt-6">
        <button
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded mr-3 hover:bg-gray-200 transition"
          onClick={onAddService}
        >
          Ajouter un service
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition"
          onClick={onSubmit}
        >
          Générer la cartographie
        </button>
      </div>
    </div>
  );
};

export default ServiceForm;