// src/components/CartoModule/CartoMain.js
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from './CartoMain.module.css';
import ServiceForm from './ServiceForm';
import ServiceCard from './ServiceCard';
import GlobalSummary from './GlobalSummary';
import ActionPlan from './ActionPlan';
import storageService from '../services/storageService';
import useSyncTempsReel from '../../hooks/useSyncTempsReel';

const CARTO_KEY = 'cartographieSimple';

// Statistiques globales calculées à partir de la liste des services
function calculerStats(services) {
  let totalSalaries = 0;
  let totalSyndiques = 0;
  const above50 = [];
  const below25 = [];
  services.forEach((service) => {
    totalSalaries += service.salaries;
    totalSyndiques += service.syndiques;
    const ratio = service.salaries > 0 ? (service.syndiques / service.salaries) * 100 : 0;
    if (ratio >= 50) {
      above50.push(service);
    } else if (ratio < 25) {
      below25.push(service);
    }
  });
  const globalRatio = totalSalaries > 0 ? (totalSyndiques / totalSalaries) * 100 : 0;
  return { totalSalaries, totalSyndiques, globalRatio, above50, below25 };
}

const CartoMain = forwardRef((props, ref) => {
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
  const chargeRef = useRef(false);
  // Vrai quand la dernière modification vient d'un camarade (temps réel) :
  // dans ce cas on ne re-sauvegarde pas, sinon deux appareils ouverts
  // se renverraient la donnée en boucle.
  const distantRef = useRef(false);

  const restaurer = (donnees) => {
    if (!donnees?.services?.length) return;
    setServices(donnees.services);
    if (donnees.submitted) {
      setStats(calculerStats(donnees.services));
      setSubmitted(true);
    }
  };

  // Chargement des données sauvegardées (locales puis partagées)
  useEffect(() => {
    const charger = async () => {
      restaurer(storageService.loadFromLocal(CARTO_KEY));
      restaurer(await storageService.loadFromServer(CARTO_KEY));
      chargeRef.current = true;
    };
    charger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Temps réel : la cartographie modifiée par un camarade apparaît en direct
  useSyncTempsReel(CARTO_KEY, (donnees) => {
    distantRef.current = true;
    restaurer(donnees);
  });

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    if (!chargeRef.current) return;
    if (distantRef.current) {
      distantRef.current = false;
      return;
    }
    const donnees = { services, submitted, majLe: new Date().toISOString() };
    storageService.saveLocally(CARTO_KEY, donnees);
    storageService.saveToServer(CARTO_KEY, donnees);
  }, [services, submitted]);
  
  // Expose les références pour le parent
  useImperativeHandle(ref, () => ({
    getSummaryRef: () => summaryRef.current,
    getFullSynthesisRef: () => fullSynthesisRef.current,
    getCardBlockRef: () => cardBlockRef.current,
    getStats: () => stats
  }));
  
  const summaryRef = React.createRef();
  const fullSynthesisRef = React.createRef();
  const cardBlockRef = React.createRef();

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
    
    // Convertir en nombre si c'est un champ numérique
    if (field === 'salaries' || field === 'syndiques') {
      value = parseInt(value) || 0;
      
      // Vérifier que les syndiqués ne dépassent pas les salariés
      if (field === 'syndiques' && value > updatedServices[index].salaries) {
        value = updatedServices[index].salaries;
      }
    }
    
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };
    
    setServices(updatedServices);
  };

  const submitServices = () => {
    // Vérifier si tous les services ont un nom
    const hasEmptyName = services.some(service => !service.name.trim());
    if (hasEmptyName) {
      alert("Tous les services doivent avoir un nom.");
      return;
    }

    // Calculer les statistiques globales
    setStats(calculerStats(services));
    setSubmitted(true);
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
          <div ref={fullSynthesisRef} className={styles.fullSynthesisSection}>
            <div ref={summaryRef} className={styles.summarySection}>
              <GlobalSummary stats={stats} />
            </div>

            <ActionPlan stats={stats} services={services} />
          </div>

          <div ref={cardBlockRef} className={styles.cardBlock}>
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
        </>
      )}
    </div>
  );
});

export default CartoMain;