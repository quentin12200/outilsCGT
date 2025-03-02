import React from 'react';
import styles from './ServiceForm.module.css';

function ServiceForm({ services, onAddService, onRemoveService, onUpdateService, onSubmit }) {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Ajout des services</h2>
      
      <div className={styles.formDescription}>
        <p>
          Complétez le tableau ci-dessous avec les différents services de votre établissement, 
          le nombre de salariés et le nombre de syndiqués CGT par service.
        </p>
      </div>
      
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.columnService}>Service</div>
          <div className={styles.columnNumber}>Salariés</div>
          <div className={styles.columnNumber}>Syndiqués</div>
          <div className={styles.columnActions}>Actions</div>
        </div>
        
        {services.map((service) => (
          <div key={service.id} className={styles.tableRow}>
            <div className={styles.columnService}>
              <input
                type="text"
                value={service.name}
                onChange={(e) => onUpdateService(service.id, 'name', e.target.value)}
                placeholder="Nom du service"
                className={styles.input}
              />
            </div>
            <div className={styles.columnNumber}>
              <input
                type="number"
                value={service.employees}
                onChange={(e) => onUpdateService(service.id, 'employees', e.target.value)}
                min="0"
                placeholder="Salariés"
                className={styles.input}
              />
            </div>
            <div className={styles.columnNumber}>
              <input
                type="number"
                value={service.unionized}
                onChange={(e) => onUpdateService(service.id, 'unionized', e.target.value)}
                min="0"
                max={service.employees}
                placeholder="Syndiqués"
                className={styles.input}
              />
            </div>
            <div className={styles.columnActions}>
              <button
                onClick={() => onRemoveService(service.id)}
                className={styles.removeButton}
                disabled={services.length <= 1}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.formActions}>
        <button onClick={onAddService} className={styles.addButton}>
          Ajouter un service
        </button>
        <button onClick={onSubmit} className={styles.submitButton}>
          Générer la cartographie
        </button>
      </div>
    </div>
  );
}

export default ServiceForm;