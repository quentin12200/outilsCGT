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
        
        {/* En-têtes des colonnes */}
        <div className={styles.formHeader}>
          <div className={styles.serviceColumn}>Service</div>
          <div className={styles.numberColumn}>Salariés</div>
          <div className={styles.numberColumn}>Syndiqués</div>
          <div className={styles.actionColumn}></div>
        </div>
        
        {/* Liste des services */}
        {services.map((service, index) => (
          <div key={index} className={styles.inputRow}>
            <input
              type="text"
              className={styles.inputField}
              value={service.name}
              onChange={(e) => onUpdateService(index, 'name', e.target.value)}
              placeholder="Nom du service"
            />
            <input
              type="number"
              className={styles.numberField}
              value={service.salaries}
              onChange={(e) => onUpdateService(index, 'salaries', e.target.value)}
              min="1"
              placeholder="Salariés"
            />
            <input
              type="number"
              className={styles.numberField}
              value={service.syndiques}
              onChange={(e) => onUpdateService(index, 'syndiques', e.target.value)}
              min="0"
              max={service.salaries}
              placeholder="Syndiqués"
            />
            <button
              className={styles.removeButton}
              onClick={() => onRemoveService(index)}
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
        >
          Ajouter un service
        </button>
        <button
          className={styles.submitButton}
          onClick={onSubmit}
        >
          Générer la cartographie
        </button>
      </div>
    </div>
  );
};

export default ServiceForm;