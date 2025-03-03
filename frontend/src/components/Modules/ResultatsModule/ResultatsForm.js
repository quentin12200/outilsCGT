// src/components/Modules/ResultatsModule/ResultatsForm.js
import React, { useState } from 'react';
import styles from './ResultatsForm.module.css';

function ResultatsForm({ onSave, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    date: '',
    participation: '',
    cgtVotes: '',
    totalVotes: '',
    percentage: '',
    seats: '',
    totalSeats: '',
    previousPercentage: '',
    departments: [
      { name: 'Administration', votes: '', total: '' },
      { name: 'Production', votes: '', total: '' },
      { name: 'R&D', votes: '', total: '' },
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
    const updatedDepartments = [...formData.departments];
    updatedDepartments[index] = {
      ...updatedDepartments[index],
      [field]: value
    };
    setFormData({
      ...formData,
      departments: updatedDepartments
    });
  };

  const addDepartment = () => {
    setFormData({
      ...formData,
      departments: [
        ...formData.departments,
        { name: '', votes: '', total: '' }
      ]
    });
  };

  const removeDepartment = (index) => {
    const updatedDepartments = [...formData.departments];
    updatedDepartments.splice(index, 1);
    setFormData({
      ...formData,
      departments: updatedDepartments
    });
  };

  const calculateResults = () => {
    // Auto-calculate percentages and totals
    const departments = formData.departments.map(dept => {
      const votes = parseInt(dept.votes) || 0;
      const total = parseInt(dept.total) || 1; // Prevent division by zero
      return {
        ...dept,
        percentage: Math.round((votes / total) * 100)
      };
    });

    const totalVotes = parseInt(formData.totalVotes) || 0;
    const cgtVotes = parseInt(formData.cgtVotes) || 0;
    const previousPercentage = parseInt(formData.previousPercentage) || 0;
    
    setFormData({
      ...formData,
      departments,
      percentage: Math.round((cgtVotes / totalVotes) * 100) || 0,
      evolution: Math.round((cgtVotes / totalVotes) * 100) - previousPercentage
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate final results before saving
    calculateResults();
    // Send to parent component
    onSave(formData);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Saisie des résultats électoraux</h2>
      
      <div className={styles.formGrid}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Informations générales</h3>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="date">Date des élections</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              className={styles.formInput}
              value={formData.date || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="totalVotes">Nombre total de votants</label>
            <input 
              type="number" 
              id="totalVotes" 
              name="totalVotes" 
              className={styles.formInput}
              min="0"
              value={formData.totalVotes || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="participation">Taux de participation (%)</label>
            <input 
              type="number" 
              id="participation" 
              name="participation" 
              className={styles.formInput}
              min="0" 
              max="100"
              value={formData.participation || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Résultats CGT</h3>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cgtVotes">Nombre de voix CGT</label>
            <input 
              type="number" 
              id="cgtVotes" 
              name="cgtVotes" 
              className={styles.formInput}
              min="0"
              value={formData.cgtVotes || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.inlineInputs}>
            <div className={`${styles.formGroup} ${styles.inlineInput}`}>
              <label className={styles.formLabel} htmlFor="seats">Sièges obtenus</label>
              <input 
                type="number" 
                id="seats" 
                name="seats" 
                className={styles.formInput}
                min="0"
                value={formData.seats || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={`${styles.formGroup} ${styles.inlineInput}`}>
              <label className={styles.formLabel} htmlFor="totalSeats">Total des sièges</label>
              <input 
                type="number" 
                id="totalSeats" 
                name="totalSeats" 
                className={styles.formInput}
                min="0"
                value={formData.totalSeats || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="previousPercentage">Score précédent (%)</label>
            <input 
              type="number" 
              id="previousPercentage" 
              name="previousPercentage" 
              className={styles.formInput}
              min="0" 
              max="100"
              value={formData.previousPercentage || ''}
              onChange={handleChange}
            />
            <p className={styles.formHelp}>Laissez vide s'il s'agit des premières élections</p>
          </div>
          
          {formData.cgtVotes && formData.totalVotes && (
            <div className={styles.resultPreview}>
              <div className={styles.previewTitle}>Score calculé</div>
              <div className={styles.previewValue}>
                {Math.round((parseInt(formData.cgtVotes) / parseInt(formData.totalVotes)) * 100)}%
              </div>
              {formData.previousPercentage && (
                <div className={styles.previewDescription}>
                  {Math.round((parseInt(formData.cgtVotes) / parseInt(formData.totalVotes)) * 100) - parseInt(formData.previousPercentage) > 0 ? '↑' : '↓'} 
                  {Math.abs(Math.round((parseInt(formData.cgtVotes) / parseInt(formData.totalVotes)) * 100) - parseInt(formData.previousPercentage))}% 
                  par rapport aux élections précédentes
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Répartition par service</h3>
        
        {formData.departments.map((dept, index) => (
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
            
            <div className={styles.inlineInputs}>
              <div className={`${styles.formGroup} ${styles.inlineInput}`}>
                <label className={styles.formLabel} htmlFor={`dept-votes-${index}`}>Voix CGT</label>
                <input 
                  type="number" 
                  id={`dept-votes-${index}`}
                  className={styles.formInput}
                  min="0"
                  value={dept.votes || ''}
                  onChange={(e) => handleDepartmentChange(index, 'votes', e.target.value)}
                  required
                />
              </div>
              
              <div className={`${styles.formGroup} ${styles.inlineInput}`}>
                <label className={styles.formLabel} htmlFor={`dept-total-${index}`}>Total des suffrages</label>
                <input 
                  type="number" 
                  id={`dept-total-${index}`}
                  className={styles.formInput}
                  min="0"
                  value={dept.total || ''}
                  onChange={(e) => handleDepartmentChange(index, 'total', e.target.value)}
                  required
                />
              </div>
            </div>
            
            {dept.votes && dept.total && (
              <div className={styles.formHelp}>
                Résultat dans ce service: <strong>{Math.round((parseInt(dept.votes) / parseInt(dept.total)) * 100)}%</strong>
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
          onClick={calculateResults}
        >
          Calculer les résultats
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

export default ResultatsForm;
