// frontend/src/components/CartoModule/CartoMain.js
import React, { useState } from 'react';
import ServiceForm from './ServiceForm';
import ServiceCard from './ServiceCard';
import GlobalSummary from './GlobalSummary';
import ActionPlan from './ActionPlan';

const CartoMain = () => {
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
    
    // Convert to number for numeric fields
    if (field === 'salaries' || field === 'syndiques') {
      value = parseInt(value) || 0;
    }
    
    // Ensure syndiques doesn't exceed salaries
    if (field === 'syndiques' && value > updatedServices[index].salaries) {
      value = updatedServices[index].salaries;
    }
    
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };
  
  const submitServices = () => {
    // Check that all services have a name
    const emptyServices = services.filter(s => !s.name.trim());
    if (emptyServices.length > 0) {
      alert("Tous les services doivent avoir un nom.");
      return;
    }
    
    // Check data consistency
    for (const service of services) {
      if (service.syndiques > service.salaries) {
        alert(`Le service "${service.name}" a plus de syndiqués que de salariés.`);
        return;
      }
    }
    
    // Calculate global statistics
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-red-600 mb-4">Cartographie stratégique des établissements</h2>
      
      <ServiceForm 
        services={services} 
        onAddService={addService}
        onRemoveService={removeService}
        onUpdateService={updateService}
        onSubmit={submitServices}
      />
      
      {submitted && (
        <>
          <GlobalSummary stats={stats} />
          
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="text-lg font-bold text-red-600 mb-4">Cartographie des services</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index}
                  service={service}
                  className={getServiceClass(service)}
                />
              ))}
            </div>
          </div>
          
          <ActionPlan stats={stats} services={services} />
        </>
      )}
    </div>
  );
};

export default CartoMain;