// frontend/src/components/CartoModule/ServiceCard.js
import React from 'react';

const ServiceCard = ({ service, className }) => {
  const ratio = service.salaries > 0 ? (service.syndiques / service.salaries) * 100 : 0;
  
  return (
    <div className={`border p-4 rounded shadow ${className}`}>
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
};

export default ServiceCard;