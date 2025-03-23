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
    previousVotes: '',
    colleges: [
      { name: 'Premier collège (Ouvriers/Employés)', inscriptions: '', votants: '', voixCGT: '' },
      { name: 'Deuxième collège (Techniciens/Agents de maîtrise)', inscriptions: '', votants: '', voixCGT: '' },
      { name: 'Troisième collège (Cadres)', inscriptions: '', votants: '', voixCGT: '' }
    ],
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

  const handleCollegeChange = (index, field, value) => {
    const updatedColleges = [...formData.colleges];
    updatedColleges[index] = {
      ...updatedColleges[index],
      [field]: value
    };
    setFormData({
      ...formData,
      colleges: updatedColleges
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

  const addCollege = () => {
    setFormData({
      ...formData,
      colleges: [
        ...formData.colleges,
        { name: '', inscriptions: '', votants: '', voixCGT: '' }
      ]
    });
  };

  const removeCollege = (index) => {
    const updatedColleges = [...formData.colleges];
    updatedColleges.splice(index, 1);
    setFormData({
      ...formData,
      colleges: updatedColleges
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

    // Calculate college totals
    let totalInscriptions = 0;
    let totalVotants = 0;
    let totalVoixCGT = 0;

    const colleges = formData.colleges.map(college => {
      const inscriptions = parseInt(college.inscriptions) || 0;
      const votants = parseInt(college.votants) || 0;
      const voixCGT = parseInt(college.voixCGT) || 0;
      
      totalInscriptions += inscriptions;
      totalVotants += votants;
      totalVoixCGT += voixCGT;
      
      return {
        ...college,
        participation: Math.round((votants / inscriptions) * 100) || 0,
        pourcentageCGT: Math.round((voixCGT / votants) * 100) || 0
      };
    });

    const totalVotes = parseInt(formData.totalVotes) || totalVotants;
    const cgtVotes = parseInt(formData.cgtVotes) || totalVoixCGT;
    const previousVotes = parseInt(formData.previousVotes) || 0;
    const previousPercentage = previousVotes > 0 && totalVotes > 0 ? Math.round((previousVotes / totalVotes) * 100) : 0;
    
    setFormData({
      ...formData,
      departments,
      colleges,
      totalVotes: totalVotes || totalVotants,
      cgtVotes: cgtVotes || totalVoixCGT,
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
            <label className={styles.formLabel} htmlFor="previousVotes">Voix CGT élections précédentes</label>
            <input 
              type="number" 
              id="previousVotes" 
              name="previousVotes" 
              className={styles.formInput}
              min="0"
              value={formData.previousVotes || ''}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      {/* Section des collèges électoraux */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Collèges électoraux</h3>
        <p className={styles.sectionDescription}>Saisissez les données par collège électoral selon le PV officiel</p>
        
        {formData.colleges.map((college, index) => (
          <div key={index} className={styles.departmentRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nom du collège</label>
              <input 
                type="text" 
                className={styles.formInput}
                value={college.name}
                onChange={(e) => handleCollegeChange(index, 'name', e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Inscrits</label>
              <input 
                type="number" 
                className={styles.formInput}
                min="0"
                value={college.inscriptions}
                onChange={(e) => handleCollegeChange(index, 'inscriptions', e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Votants</label>
              <input 
                type="number" 
                className={styles.formInput}
                min="0"
                value={college.votants}
                onChange={(e) => handleCollegeChange(index, 'votants', e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Voix CGT</label>
              <input 
                type="number" 
                className={styles.formInput}
                min="0"
                value={college.voixCGT}
                onChange={(e) => handleCollegeChange(index, 'voixCGT', e.target.value)}
                required
              />
            </div>
            
            <button 
              type="button" 
              className={styles.removeButton}
              onClick={() => removeCollege(index)}
              aria-label="Supprimer ce collège"
            >
              &times;
            </button>
          </div>
        ))}
        
        <button 
          type="button" 
          className={styles.addButton}
          onClick={addCollege}
        >
          + Ajouter un collège
        </button>
      </div>
      
      {/* Section des services */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Répartition par service (estimation)</h3>
        <p className={styles.sectionDescription}>Ces données sont des estimations internes et ne figurent pas sur le PV officiel</p>
        
        {formData.departments.map((dept, index) => (
          <div key={index} className={styles.departmentRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Nom du service</label>
              <input 
                type="text" 
                className={styles.formInput}
                value={dept.name}
                onChange={(e) => handleDepartmentChange(index, 'name', e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Voix CGT</label>
              <input 
                type="number" 
                className={styles.formInput}
                min="0"
                value={dept.votes}
                onChange={(e) => handleDepartmentChange(index, 'votes', e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Total votants</label>
              <input 
                type="number" 
                className={styles.formInput}
                min="0"
                value={dept.total}
                onChange={(e) => handleDepartmentChange(index, 'total', e.target.value)}
                required
              />
            </div>
            
            <button 
              type="button" 
              className={styles.removeButton}
              onClick={() => removeDepartment(index)}
              aria-label="Supprimer ce service"
            >
              &times;
            </button>
          </div>
        ))}
        
        <button 
          type="button" 
          className={styles.addButton}
          onClick={addDepartment}
        >
          + Ajouter un service
        </button>
      </div>
      
      <div className={styles.formActions}>
        <button 
          type="button" 
          className={styles.calculateButton}
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
