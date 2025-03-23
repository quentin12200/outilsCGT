// src/components/CartoModule/ServiceForm.js
import React from 'react';
import styles from './ServiceForm.module.css';

const ServiceForm = ({ services, onAddService, onRemoveService, onUpdateService, onSubmit }) => {
  return (
    <div className={styles.formContainer}>
      
      
      <p className={styles.description}>
        Analysez et visualisez la répartition des syndiqués par service. Cet outil vous permettra d'identifier les zones prioritaires d'intervention.
      </p>
      
      <div className={styles.formSection}>
        <h4 className={styles.sectionTitle}>Ajouter des services</h4>
        
        {/* En-têtes des colonnes - visible seulement sur desktop */}
        <div className={styles.formHeader}>
          <div className={styles.serviceColumn}>Service</div>
          <div className={styles.numberColumn}>Salariés</div>
          <div className={styles.numberColumn}>Syndiqués</div>
          <div className={styles.actionColumn}></div>
        </div>
        
        {/* Liste des services */}
        {services.map((service, index) => (
          <div key={index} className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor={`service-name-${index}`} className={styles.mobileLabel}>Service</label>
              <input
                id={`service-name-${index}`}
                type="text"
                className={styles.inputField}
                value={service.name}
                onChange={(e) => onUpdateService(index, 'name', e.target.value)}
                placeholder="Nom du service"
                aria-label="Nom du service"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor={`service-salaries-${index}`} className={styles.mobileLabel}>Salariés</label>
              <input
                id={`service-salaries-${index}`}
                type="number"
                className={styles.numberField}
                value={service.salaries}
                onChange={(e) => onUpdateService(index, 'salaries', e.target.value)}
                min="1"
                placeholder="Salariés"
                aria-label="Nombre de salariés"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor={`service-syndiques-${index}`} className={styles.mobileLabel}>Syndiqués</label>
              <input
                id={`service-syndiques-${index}`}
                type="number"
                className={styles.numberField}
                value={service.syndiques}
                onChange={(e) => onUpdateService(index, 'syndiques', e.target.value)}
                min="0"
                max={service.salaries}
                placeholder="Syndiqués"
                aria-label="Nombre de syndiqués"
              />
            </div>
            
            <button
              className={styles.removeButton}
              onClick={() => onRemoveService(index)}
              aria-label="Supprimer ce service"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
      
      {/* Boutons d'action */}
      <div className={styles.actionButtons}>
        <button
          className={styles.addButton}
          onClick={onAddService}
          aria-label="Ajouter un nouveau service"
        >
          Ajouter un service
        </button>
        <button
          className={styles.submitButton}
          onClick={onSubmit}
          aria-label="Générer la cartographie"
        >
          Générer la cartographie
        </button>
      </div>
    </div>
  );
};

export default ServiceForm;