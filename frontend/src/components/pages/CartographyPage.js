import React, { useState } from 'react';
import styles from './CartographyPage.module.css';
import ServiceForm from '../CartoModule/ServiceForm';
import ServiceVisualization from '../CartoModule/ServiceVisualization';
import GlobalSummary from '../CartoModule/GlobalSummary';
import ActionPlan from '../CartoModule/ActionPlan';

function CartographyPage() {
  const [services, setServices] = useState([
    { id: 1, name: '', employees: 0, unionized: 0 }
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalUnionized: 0,
    globalRatio: 0,
    above50: [],
    below25: []
  });
  
  // Function to add a new service to the list
  const addService = () => {
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    setServices([...services, { id: newId, name: '', employees: 0, unionized: 0 }]);
  };
  
  // Function to remove a service from the list
  const removeService = (id) => {
    if (services.length > 1) {
      setServices(services.filter(service => service.id !== id));
    }
  };
  
  // Function to update a service's data
  const updateService = (id, field, value) => {
    const updatedServices = services.map(service => {
      if (service.id === id) {
        // Convert to number for numeric fields
        if (field === 'employees' || field === 'unionized') {
          value = parseInt(value) || 0;
          
          // Ensure unionized doesn't exceed employees
          if (field === 'unionized' && value > service.employees) {
            value = service.employees;
          }
        }
        
        return { ...service, [field]: value };
      }
      return service;
    });
    
    setServices(updatedServices);
  };
  
  // Function to process the form data
  const processData = () => {
    // Validate that all services have names
    if (services.some(s => !s.name.trim())) {
      alert("Tous les services doivent avoir un nom.");
      return;
    }
    
    // Calculate statistics
    let totalEmployees = 0;
    let totalUnionized = 0;
    let above50 = [];
    let below25 = [];
    
    services.forEach(service => {
      totalEmployees += service.employees;
      totalUnionized += service.unionized;
      
      if (service.employees > 0) {
        const ratio = service.unionized / service.employees;
        if (ratio >= 0.5) {
          above50.push(service.name);
        }
        if (ratio < 0.25 && service.employees > 5) {
          below25.push(service.name);
        }
      }
    });
    
    const globalRatio = totalEmployees > 0 ? (totalUnionized / totalEmployees) * 100 : 0;
    
    setStats({
      totalEmployees,
      totalUnionized,
      globalRatio,
      above50,
      below25
    });
    
    setSubmitted(true);
  };

  return (
    <div className={styles.cartographyPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Cartographie Stratégique</h1>
          <p className={styles.subtitle}>
            Visualisez et analysez la répartition des syndiqués dans votre établissement
          </p>
        </div>
        
        <div className={styles.content}>
          <ServiceForm 
            services={services}
            onAddService={addService}
            onRemoveService={removeService}
            onUpdateService={updateService}
            onSubmit={processData}
          />
          
          {submitted && (
            <>
              <GlobalSummary stats={stats} />
              
              <ServiceVisualization services={services} />
              
              <ActionPlan stats={stats} services={services} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartographyPage;