import React, { useState, useEffect } from 'react';
import styles from './CartographieAvancee.module.css';
import SaveButtons from '../../Common/SaveButtons'; // Correct file path
import storageService from '../services/storageService';
import { saveAs } from 'file-saver';

const CartographieAvancee = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // État pour les données de cartographie avancée
  const [servicesData, setServicesData] = useState([
    {
      id: 1,
      name: 'Administration',
      totalEmployees: 45,
      totalSyndiques: 15,
      gender: {
        men: { employees: 20, syndiques: 8 },
        women: { employees: 25, syndiques: 7 }
      },
      categories: {
        ouvriers: { employees: 5, syndiques: 2 },
        employes: { employees: 25, syndiques: 8 },
        agentsMaitrise: { employees: 10, syndiques: 3 },
        techniciens: { employees: 0, syndiques: 0 },
        cadres: { employees: 5, syndiques: 2 }
      }
    },
    {
      id: 2,
      name: 'Production',
      totalEmployees: 380,
      totalSyndiques: 95,
      gender: {
        men: { employees: 280, syndiques: 78 },
        women: { employees: 100, syndiques: 17 }
      },
      categories: {
        ouvriers: { employees: 220, syndiques: 65 },
        employes: { employees: 80, syndiques: 15 },
        agentsMaitrise: { employees: 50, syndiques: 10 },
        techniciens: { employees: 20, syndiques: 4 },
        cadres: { employees: 10, syndiques: 1 }
      }
    },
    {
      id: 3,
      name: 'R&D',
      totalEmployees: 110,
      totalSyndiques: 22,
      gender: {
        men: { employees: 75, syndiques: 18 },
        women: { employees: 35, syndiques: 4 }
      },
      categories: {
        ouvriers: { employees: 0, syndiques: 0 },
        employes: { employees: 20, syndiques: 5 },
        agentsMaitrise: { employees: 30, syndiques: 7 },
        techniciens: { employees: 40, syndiques: 8 },
        cadres: { employees: 20, syndiques: 2 }
      }
    }
  ]);

  // Obtenir un service par son ID
  const getServiceById = (id) => {
    return servicesData.find(service => service.id === id);
  };

  // Ajouter un nouveau service
  const addNewService = () => {
    const newService = {
      id: servicesData.length + 1,
      name: `Nouveau service ${servicesData.length + 1}`,
      totalEmployees: 0,
      totalSyndiques: 0,
      gender: {
        men: { employees: 0, syndiques: 0 },
        women: { employees: 0, syndiques: 0 }
      },
      categories: {
        ouvriers: { employees: 0, syndiques: 0 },
        employes: { employees: 0, syndiques: 0 },
        agentsMaitrise: { employees: 0, syndiques: 0 },
        techniciens: { employees: 0, syndiques: 0 },
        cadres: { employees: 0, syndiques: 0 }
      }
    };
    setServicesData([...servicesData, newService]);
    setSelectedService(newService.id);
  };

  // Calculer les totaux de l'entreprise
  const calculateTotals = () => {
    return servicesData.reduce((totals, service) => {
      totals.employees += service.totalEmployees;
      totals.syndiques += service.totalSyndiques;
      
      // Ajouter les chiffres par genre
      totals.gender.men.employees += service.gender.men.employees;
      totals.gender.men.syndiques += service.gender.men.syndiques;
      totals.gender.women.employees += service.gender.women.employees;
      totals.gender.women.syndiques += service.gender.women.syndiques;
      
      // Ajouter les chiffres par catégorie
      Object.keys(totals.categories).forEach(category => {
        totals.categories[category].employees += service.categories[category].employees;
        totals.categories[category].syndiques += service.categories[category].syndiques;
      });
      
      return totals;
    }, {
      employees: 0,
      syndiques: 0,
      gender: {
        men: { employees: 0, syndiques: 0 },
        women: { employees: 0, syndiques: 0 }
      },
      categories: {
        ouvriers: { employees: 0, syndiques: 0 },
        employes: { employees: 0, syndiques: 0 },
        agentsMaitrise: { employees: 0, syndiques: 0 },
        techniciens: { employees: 0, syndiques: 0 },
        cadres: { employees: 0, syndiques: 0 }
      }
    });
  };

  // Calculer le taux de syndicalisation
  const calculateRate = (syndiques, employees) => {
    if (employees === 0) return 0;
    return Math.round((syndiques / employees) * 100);
  };

  // Gérer la mise à jour des données d'un service
  const handleServiceUpdate = (serviceId, field, value) => {
    const updatedServices = servicesData.map(service => {
      if (service.id === serviceId) {
        // Décomposer le champ pour accéder aux propriétés imbriquées
        const fields = field.split('.');
        
        if (fields.length === 1) {
          // Mise à jour d'un champ de premier niveau
          return { ...service, [fields[0]]: value };
        } else if (fields.length === 3) {
          // Mise à jour d'un champ imbriqué (genre ou catégorie)
          const [category, subCategory, property] = fields;
          
          if (category === 'gender') {
            return {
              ...service,
              gender: {
                ...service.gender,
                [subCategory]: {
                  ...service.gender[subCategory],
                  [property]: parseInt(value) || 0
                }
              }
            };
          } else if (category === 'categories') {
            return {
              ...service,
              categories: {
                ...service.categories,
                [subCategory]: {
                  ...service.categories[subCategory],
                  [property]: parseInt(value) || 0
                }
              }
            };
          }
        }
        
        return service;
      }
      return service;
    });
    
    // Mettre à jour les totaux après la modification des sous-catégories
    const updatedServicesWithTotals = updatedServices.map(service => {
      if (service.id === serviceId) {
        // Recalculer les totaux pour ce service
        const menEmployees = service.gender.men.employees || 0;
        const womenEmployees = service.gender.women.employees || 0;
        const menSyndiques = service.gender.men.syndiques || 0;
        const womenSyndiques = service.gender.women.syndiques || 0;
        
        // Déterminer quel total utiliser (celui saisi directement ou calculé)
        const newTotalEmployees = field === 'totalEmployees' 
          ? parseInt(value) || 0 
          : (menEmployees + womenEmployees);
        
        const newTotalSyndiques = field === 'totalSyndiques' 
          ? parseInt(value) || 0 
          : (menSyndiques + womenSyndiques);
        
        return {
          ...service,
          totalEmployees: newTotalEmployees,
          totalSyndiques: newTotalSyndiques
        };
      }
      return service;
    });
    
    setServicesData(updatedServicesWithTotals);
  };

  // Charger les données sauvegardées au chargement
  useEffect(() => {
    const loadData = async () => {
      try {
        // Essayer de charger depuis le localStorage d'abord
        const localData = storageService.loadFromLocal('cartographieAvancee');
        if (localData) {
          setServicesData(localData);
          console.log('Données chargées localement');
          return;
        }
        
        // Si aucune donnée locale, essayer de charger depuis le serveur
        const serverData = await storageService.loadFromServer('cartographieAvancee');
        if (serverData && Array.isArray(serverData)) {
          setServicesData(serverData);
          console.log('Données chargées depuis le serveur');
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };
    
    loadData();
  }, []);

  // Fonction pour sauvegarder les données dans un fichier
  const saveToFile = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'cartographieAvancee_backup.json');
  };

  // Fonction pour la sauvegarde locale
  const handleSaveLocal = async () => {
    const result = await storageService.saveLocally('cartographieAvancee', servicesData);
    saveToFile(servicesData);
    return result;
  };

  // Fonction pour la sauvegarde sur le serveur
  const handleSaveServer = async () => {
    const result = await storageService.saveToServer('cartographieAvancee', servicesData);
    saveToFile(servicesData);
    return result;
  };

  // Obtenir la classe de couleur pour le taux
  const getRateColorClass = (rate) => {
    if (rate >= 30) return styles.rateHigh;
    if (rate >= 20) return styles.rateMedium;
    return styles.rateLow;
  };

  // Calculer les totaux
  const totals = calculateTotals();

  // Calculer les taux globaux
  const globalRate = calculateRate(totals.syndiques, totals.employees);
  const menRate = calculateRate(totals.gender.men.syndiques, totals.gender.men.employees);
  const womenRate = calculateRate(totals.gender.women.syndiques, totals.gender.women.employees);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Cartographie Avancée</h2>
        <div className="relative">
          <button 
            className={styles.infoButton}
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.infoIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Comment obtenir les effectifs?
          </button>
          
          {showTooltip && (
            <div className={styles.tooltip}>
              <h3 className={styles.tooltipTitle}>Démarche auprès de l'employeur</h3>
              <ol className={styles.tooltipList}>
                <li className={styles.tooltipItem}>Adressez une demande écrite à la Direction des Ressources Humaines</li>
                <li className={styles.tooltipItem}>Fondez votre demande sur l'article L.2315-81 du Code du Travail (pour les CSE) ou consultez la BDES</li>
                <li className={styles.tooltipItem}>Précisez le détail souhaité (service, genre, catégorie, etc.)</li>
                <li className={styles.tooltipItem}>Fixez un délai raisonnable de réponse (15 jours)</li>
              </ol>
              <div className={styles.tooltipWarning}>
                En cas de refus, contactez l'inspection du travail ou votre UL/UD
              </div>
              <button 
                className={styles.closeButton}
                onClick={() => setShowTooltip(false)}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Récapitulatif global */}
      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Situation globale</h3>
          <div className={styles.summaryRow}>
            <span>Salariés:</span>
            <span className="font-semibold">{totals.employees}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Syndiqués:</span>
            <span className="font-semibold">{totals.syndiques}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Taux:</span>
            <span className={`font-semibold ${getRateColorClass(globalRate)}`}>{globalRate}%</span>
          </div>
        </div>
        
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Répartition par genre</h3>
          <div className={styles.genderGrid}>
            <div>
              <h4 className={styles.genderTitle}>Hommes</h4>
              <div className={styles.genderStat}>Salariés: {totals.gender.men.employees}</div>
              <div className={styles.genderStat}>Syndiqués: {totals.gender.men.syndiques}</div>
              <div className={`${styles.genderStat} ${getRateColorClass(menRate)}`}>Taux: {menRate}%</div>
            </div>
            <div>
              <h4 className={styles.genderTitle}>Femmes</h4>
              <div className={styles.genderStat}>Salariées: {totals.gender.women.employees}</div>
              <div className={styles.genderStat}>Syndiquées: {totals.gender.women.syndiques}</div>
              <div className={`${styles.genderStat} ${getRateColorClass(womenRate)}`}>Taux: {womenRate}%</div>
            </div>
          </div>
        </div>
        
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Répartition par catégorie</h3>
          <div className="space-y-1">
            {Object.entries(totals.categories).map(([category, data]) => {
              const rate = calculateRate(data.syndiques, data.employees);
              const categoryNames = {
                ouvriers: 'Ouvriers',
                employes: 'Employés',
                agentsMaitrise: 'Agents de maîtrise',
                techniciens: 'Techniciens',
                cadres: 'Cadres'
              };
              return (
                <div key={category} className={styles.categoryRow}>
                  <span>{categoryNames[category]}:</span>
                  <span className={`font-semibold ${getRateColorClass(rate)}`}>
                    {rate}% ({data.syndiques}/{data.employees})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Liste des services */}
      <div className="mb-6">
        <div className={styles.serviceListHeader}>
          <h3 className={styles.serviceTitle}>Services</h3>
          <button 
            onClick={addNewService}
            className={styles.addButton}
          >
            + Ajouter un service
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Service</th>
                <th className={`${styles.tableHeaderCell} ${styles.tableCellCenter}`}>Salariés</th>
                <th className={`${styles.tableHeaderCell} ${styles.tableCellCenter}`}>Syndiqués</th>
                <th className={`${styles.tableHeaderCell} ${styles.tableCellCenter}`}>Taux</th>
                <th className={`${styles.tableHeaderCell} ${styles.tableCellCenter}`}>Détails</th>
              </tr>
            </thead>
            <tbody>
              {servicesData.map(service => {
                const rate = calculateRate(service.totalSyndiques, service.totalEmployees);
                return (
                  <tr key={service.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{service.name}</td>
                    <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>{service.totalEmployees}</td>
                    <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>{service.totalSyndiques}</td>
                    <td className={`${styles.tableCell} ${styles.tableCellCenter} font-medium ${getRateColorClass(rate)}`}>{rate}%</td>
                    <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>
                      <button 
                        onClick={() => setSelectedService(service.id === selectedService ? null : service.id)}
                        className={styles.detailButton}
                      >
                        {service.id === selectedService ? 'Masquer' : 'Voir détails'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulaire de détails d'un service */}
      {selectedService && (
        <div className={styles.serviceForm}>
          <h3 className={styles.formHeader}>
            Détails du service: {getServiceById(selectedService)?.name}
          </h3>
          
          <div className={styles.formGrid}>
            {/* Informations générales */}
            <div className="col-span-1 md:col-span-3">
              <h4 className={styles.sectionTitle}>Informations générales</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Nom du service</label>
                  <input 
                    type="text" 
                    className={styles.input}
                    value={getServiceById(selectedService)?.name || ''} 
                    onChange={(e) => handleServiceUpdate(selectedService, 'name', e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Total salariés</label>
                  <input 
                    type="number" 
                    className={styles.input}
                    value={getServiceById(selectedService)?.totalEmployees || ''} 
                    onChange={(e) => handleServiceUpdate(selectedService, 'totalEmployees', e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Total syndiqués</label>
                  <input 
                    type="number" 
                    className={styles.input}
                    value={getServiceById(selectedService)?.totalSyndiques || ''} 
                    onChange={(e) => handleServiceUpdate(selectedService, 'totalSyndiques', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Répartition par genre */}
            <div className={styles.formSection}>
              <h4 className={styles.sectionTitle}>Répartition par genre</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm mb-1">Hommes</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>Salariés</label>
                      <input 
                        type="number" 
                        className={styles.input}
                        value={getServiceById(selectedService)?.gender.men.employees || ''} 
                        onChange={(e) => handleServiceUpdate(selectedService, 'gender.men.employees', e.target.value)}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>Syndiqués</label>
                      <input 
                        type="number" 
                        className={styles.input}
                        value={getServiceById(selectedService)?.gender.men.syndiques || ''} 
                        onChange={(e) => handleServiceUpdate(selectedService, 'gender.men.syndiques', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm mb-1">Femmes</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>Salariées</label>
                      <input 
                        type="number" 
                        className={styles.input}
                        value={getServiceById(selectedService)?.gender.women.employees || ''} 
                        onChange={(e) => handleServiceUpdate(selectedService, 'gender.women.employees', e.target.value)}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>Syndiquées</label>
                      <input 
                        type="number" 
                        className={styles.input}
                        value={getServiceById(selectedService)?.gender.women.syndiques || ''} 
                        onChange={(e) => handleServiceUpdate(selectedService, 'gender.women.syndiques', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Répartition par catégorie */}
            <div className="col-span-1 md:col-span-2">
              <h4 className={styles.sectionTitle}>Répartition par catégorie</h4>
              <div className={styles.categoryGrid}>
                {Object.entries(getServiceById(selectedService)?.categories || {}).map(([category, data]) => {
                  const categoryNames = {
                    ouvriers: 'Ouvriers',
                    employes: 'Employés',
                    agentsMaitrise: 'Agents de maîtrise',
                    techniciens: 'Techniciens',
                    cadres: 'Cadres'
                  };
                  return (
                    <div key={category}>
                      <h5 className="text-sm mb-1">{categoryNames[category]}</h5>
                      <div className="space-y-2">
                        <div className={styles.inputGroup}>
                          <label className={styles.inputLabel}>Salariés</label>
                          <input 
                            type="number" 
                            className={styles.input}
                            value={data.employees || ''} 
                            onChange={(e) => handleServiceUpdate(selectedService, `categories.${category}.employees`, e.target.value)}
                          />
                        </div>
                        <div className={styles.inputGroup}>
                          <label className={styles.inputLabel}>Syndiqués</label>
                          <input 
                            type="number" 
                            className={styles.input}
                            value={data.syndiques || ''} 
                            onChange={(e) => handleServiceUpdate(selectedService, `categories.${category}.syndiques`, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Utilisation du composant SaveButtons */}
      <SaveButtons
        onSaveLocal={handleSaveLocal}
        onSaveServer={handleSaveServer}
        moduleName="cartographieAvancee"
      />
    </div>
  );
};

export default CartographieAvancee;