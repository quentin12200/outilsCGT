// frontend/src/components/CartoModule/ServiceForm.js
import React from 'react';

const ServiceForm = ({ services, onAddService, onRemoveService, onUpdateService, onSubmit }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-4">Ajouter des services</h3>
      
      {/* Column headers */}
      <div className="flex mb-2 font-bold">
        <div className="flex-1">Service</div>
        <div className="w-24 text-right">Salariés</div>
        <div className="w-24 text-right">Syndiqués</div>
        <div className="w-24"></div>
      </div>
      
      {/* Service list */}
      {services.map((service, index) => (
        <div key={index} className="flex mb-2">
          <input
            type="text"
            className="flex-1 border p-2 rounded mr-2"
            value={service.name}
            onChange={(e) => onUpdateService(index, 'name', e.target.value)}
            placeholder="Nom du service"
          />
          <input
            type="number"
            className="w-24 border p-2 rounded mr-2"
            value={service.salaries}
            onChange={(e) => onUpdateService(index, 'salaries', e.target.value)}
            min="1"
            placeholder="Salariés"
          />
          <input
            type="number"
            className="w-24 border p-2 rounded mr-2"
            value={service.syndiques}
            onChange={(e) => onUpdateService(index, 'syndiques', e.target.value)}
            min="0"
            max={service.salaries}
            placeholder="Syndiqués"
          />
          <button
            className="w-24 bg-red-100 text-red-600 p-2 rounded hover:bg-red-200"
            onClick={() => onRemoveService(index)}
          >
            Supprimer
          </button>
        </div>
      ))}
      
      {/* Action buttons */}
      <div className="flex mt-4">
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-300"
          onClick={onAddService}
        >
          Ajouter un service
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={onSubmit}
        >
          Générer la cartographie
        </button>
      </div>
    </div>
  );
};

export default ServiceForm;