// src/components/CartoModule/CartoMain.js
import React, { useState } from 'react';
import styles from './CartoMain.module.css';
import ServiceForm from './ServiceForm';
import ServiceCard from './ServiceCard';
import GlobalSummary from './GlobalSummary';
import ActionPlan from './ActionPlan';
import CartographieAvancee from './CartographieAvancee';

function CartoMain() {
  const [services, setServices] = useState([
    { name: '', salaries: 0, syndiques: 0 }
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
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
    if (field === 'salaries' || field === 'syndiques') {
      value = parseInt(value) || 0;
    }
    if (field === 'syndiques' && value > updatedServices[index].salaries) {
      value = updatedServices[index].salaries;
    }
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const submitServices = () => {
    // Vérifie que tous les services ont un nom
    const emptyServices = services.filter(s => !s.name.trim());
    if (emptyServices.length > 0) {
      alert("Tous les services doivent avoir un nom.");
      return;
    }

    // Vérifie la cohérence
    for (const service of services) {
      if (service.syndiques > service.salaries) {
        alert(`Le service "${service.name}" a plus de syndiqués que de salariés.`);
        return;
      }
    }

    // Calcule les stats globales
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
    setStats({ totalSalaries, totalSyndiques, globalRatio, above50, below25 });
    setSubmitted(true);
  };

  // Fonction pour basculer l'affichage de la cartographie avancée
  const toggleAdvancedCartography = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.pageTitle}>Cartographie stratégique des établissements</h2>

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

          <div className={styles.cardBlock}>
            <h3 className={styles.cardTitle}>Cartographie des services</h3>
            <div className={styles.serviceGrid}>
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  service={service}
                />
              ))}
            </div>
          </div>

          <ActionPlan stats={stats} services={services} />
        </>
      )}

      {/* Bouton pour afficher/masquer la cartographie avancée */}
      <div className={styles.advancedButtonContainer}>
        <button 
          className={styles.advancedButton}
          onClick={toggleAdvancedCartography}
        >
          {showAdvanced ? 'Masquer la cartographie avancée' : 'Afficher la cartographie avancée'}
        </button>
      </div>

      {/* Composant CartographieAvancee qui ne s'affiche que si showAdvanced est vrai */}
      <CartographieAvancee isVisible={showAdvanced} />
    </div>
  );
}

export default CartoMain;