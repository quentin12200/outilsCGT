// src/components/Modules/SyndicalisationModule/SyndicalisationForm.js
import React, { useState } from 'react';
import styles from './SyndicalisationForm.module.css';

function SyndicalisationForm({ onSave, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    currentMembers: '',
    totalEmployees: '',
    sectorAverage: '',
    targetRatio: 35,
    departmentData: [
      { name: 'Administration', members: '', employees: '' },
      { name: 'Production', members: '', employees: '' },
      { name: 'R&D', members: '', employees: '' },
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDepartmentChange = (index, field, value) => {
    const updatedDepartments = [...formData.departmentData];
    updatedDepartments[index] = {
      ...updatedDepartments[index],
      [field]: value
    };
    setFormData({
      ...formData,
      departmentData: updatedDepartments
    });
  };

  const addDepartment = () => {
    setFormData({
      ...formData,
      departmentData: [
        ...formData.departmentData,
        { name: '', members: '', employees: '' }
      ]
    });
  };

  const removeDepartment = (index) => {
    const updatedDepartments = [...formData.departmentData];
    updatedDepartments.splice(index, 1);
    setFormData({
      ...formData,
      departmentData: updatedDepartments
    });
  };

  const setTarget = (target) => {
    setFormData({
      ...formData,
      targetRatio: target
    });
  };

  const calculateRatios = () => {
    // Auto-calculate ratios for each department
    const departmentData = formData.departmentData.map(dept => {
      const members = parseInt(dept.members) || 0;
      const employees = parseInt(dept.employees) || 1; // Prevent division by zero
      return {
        ...dept,
        ratio: Math.round((members / employees) * 100)
      };
    });

    // Calculate global ratio
    const totalMembers = departmentData.reduce((sum, dept) => sum + (parseInt(dept.members) || 0), 0);
    const totalEmployees = departmentData.reduce((sum, dept) => sum + (parseInt(dept.employees) || 0), 0);
    
    setFormData({
      ...formData,
      departmentData,
      currentMembers: totalMembers,
      totalEmployees: totalEmployees,
      currentRatio: Math.round((totalMembers / totalEmployees) * 100) || 0
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate final ratios before saving
    calculateRatios();
    // Send to parent component
    onSave(formData);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Saisie des données de syndicalisation</h2>
      
      <div className={styles.formGrid}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Informations générales</h3>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="totalEmployees">Nombre total de salariés</label>
            <input 
              type="number" 
              id="totalEmployees" 
              name="totalEmployees" 
              className={styles.formInput}
              min="0"
              value={formData.totalEmployees || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="currentMembers">Nombre total de syndiqués</label>
            <input 
              type="number" 
              id="currentMembers" 
              name="currentMembers" 
              className={styles.formInput}
              min="0"
              value={formData.currentMembers || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="sectorAverage">Moyenne du secteur (%)</label>
            <input 
              type="number" 
              id="sectorAverage" 
              name="sectorAverage" 
              className={styles.formInput}
              min="0" 
              max="100"
              value={formData.sectorAverage || ''}
              onChange={handleChange}
            />
            <p className={styles.formHelp}>Laissez vide si inconnu</p>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Objectifs de syndicalisation</h3>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Définir un objectif (%)</label>
            <div className={styles.targetSelector}>
              {[25, 35, 50, 75].map((target) => (
                <button
                  key={target}
                  type="button"
                  onClick={() => setTarget(target)}
                  className={`${styles.targetButton} ${formData.targetRatio === target ? styles.targetButtonActive : ''}`}
                >
                  {target}%
                </button>
              ))}
            </div>
          </div>
          
          {formData.targetRatio > 0 && formData.totalEmployees && formData.currentMembers && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Pour atteindre cet objectif:</label>
              <p className={styles.formHelp}>
                Il faudra convaincre environ <strong>{Math.ceil((formData.targetRatio * formData.totalEmployees / 100) - formData.currentMembers)}</strong> salariés supplémentaires.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Répartition par service</h3>
        
        {formData.departmentData.map((dept, index) => (
          <div key={index} className={styles.departmentInputs}>
            <div className={styles.departmentHeader}>
              <span className={styles.departmentTitle}>
                {dept.name || `Service ${index + 1}`}
              </span>
              <div className={styles.departmentButtons}>
                {index > 0 && (
                  <button 
                    type="button" 
                    className={`${styles.departmentButton} ${styles.removeButton}`}
                    onClick={() => removeDepartment(index)}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor={`dept-name-${index}`}>Nom du service</label>
              <input 
                type="text" 
                id={`dept-name-${index}`}
                className={styles.formInput}
                value={dept.name || ''}
                onChange={(e) => handleDepartmentChange(index, 'name', e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor={`dept-members-${index}`}>Nombre de syndiqués</label>
              <input 
                type="number" 
                id={`dept-members-${index}`}
                className={styles.formInput}
                min="0"
                value={dept.members || ''}
                onChange={(e) => handleDepartmentChange(index, 'members', e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor={`dept-employees-${index}`}>Nombre total de salariés</label>
              <input 
                type="number" 
                id={`dept-employees-${index}`}
                className={styles.formInput}
                min="0"
                value={dept.employees || ''}
                onChange={(e) => handleDepartmentChange(index, 'employees', e.target.value)}
                required
              />
            </div>
            
            {dept.members && dept.employees && (
              <div className={styles.formHelp}>
                Taux de syndicalisation: <strong>{Math.round((parseInt(dept.members) / parseInt(dept.employees)) * 100)}%</strong>
              </div>
            )}
          </div>
        ))}
        
        <button 
          type="button" 
          className={`${styles.departmentButton} ${styles.addButton}`}
          onClick={addDepartment}
        >
          + Ajouter un service
        </button>
      </div>
      
      <div className={styles.formActions}>
        <button 
          type="button" 
          className={styles.secondaryButton}
          onClick={calculateRatios}
        >
          Calculer les taux
        </button>
        <button 
          type="submit" 
          className={styles.submitButton}
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}

export default SyndicalisationForm;