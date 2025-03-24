import React, { useState } from 'react';
import styles from './ElectionResultForm.module.css';

const ElectionResultForm = ({ onSubmit, onCancel }) => {
  // État initial du formulaire
  const initialFormState = {
    company: '',
    legalName: '',
    sector: '',
    date: '',
    colleges: [''],
    totalEmployees: '',
    registeredVoters: '',
    validVotes: '',
    unions: [
      { union: 'CGT', votes: '', percentage: '', seats: '' },
      { union: '', votes: '', percentage: '', seats: '' }
    ]
  };
  
  // État du formulaire
  const [formData, setFormData] = useState(initialFormState);
  
  // Liste des secteurs d'activité
  const sectors = [
    'Métallurgie',
    'Agroalimentaire',
    'Services',
    'Commerce',
    'Santé',
    'Transport',
    'Éducation',
    'Construction',
    'Énergie',
    'Autre'
  ];
  
  // Liste des collèges électoraux standards
  const standardColleges = [
    '1er collège - Ouvriers et employés',
    '2ème collège - Techniciens, agents de maîtrise et assimilés',
    '3ème collège - Ingénieurs et cadres',
    'Collège unique'
  ];
  
  // Gérer les changements dans les champs principaux
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Gérer les changements dans les champs des collèges
  const handleCollegeChange = (index, value) => {
    const updatedColleges = [...formData.colleges];
    updatedColleges[index] = value;
    
    setFormData({
      ...formData,
      colleges: updatedColleges
    });
  };
  
  // Ajouter un collège
  const handleAddCollege = () => {
    setFormData({
      ...formData,
      colleges: [...formData.colleges, '']
    });
  };
  
  // Supprimer un collège
  const handleRemoveCollege = (index) => {
    if (formData.colleges.length <= 1) return;
    
    const updatedColleges = formData.colleges.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      colleges: updatedColleges
    });
  };
  
  // Gérer les changements dans les champs des syndicats
  const handleUnionChange = (index, field, value) => {
    const updatedUnions = [...formData.unions];
    updatedUnions[index] = {
      ...updatedUnions[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      unions: updatedUnions
    });
  };
  
  // Ajouter un syndicat
  const handleAddUnion = () => {
    setFormData({
      ...formData,
      unions: [...formData.unions, { union: '', votes: '', percentage: '', seats: '' }]
    });
  };
  
  // Supprimer un syndicat
  const handleRemoveUnion = (index) => {
    if (formData.unions.length <= 1) return;
    
    const updatedUnions = formData.unions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      unions: updatedUnions
    });
  };
  
  // Calculer automatiquement les pourcentages
  const calculatePercentages = () => {
    const totalVotes = formData.unions.reduce((sum, union) => {
      const votes = union.votes ? parseInt(union.votes, 10) : 0;
      return sum + votes;
    }, 0);
    
    if (totalVotes === 0) return;
    
    const updatedUnions = formData.unions.map(union => {
      const votes = union.votes ? parseInt(union.votes, 10) : 0;
      const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : '0';
      
      return {
        ...union,
        percentage
      };
    });
    
    setFormData({
      ...formData,
      unions: updatedUnions
    });
  };
  
  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérifier que les champs obligatoires sont remplis
    if (!formData.company || !formData.date || !formData.sector) {
      alert('Veuillez remplir tous les champs obligatoires (entreprise, date, secteur).');
      return;
    }
    
    // Vérifier que les syndicats ont des noms
    const hasEmptyUnionNames = formData.unions.some(union => !union.union.trim());
    if (hasEmptyUnionNames) {
      alert('Veuillez nommer tous les syndicats.');
      return;
    }
    
    // Filtrer les collèges vides
    const nonEmptyColleges = formData.colleges.filter(college => college.trim() !== '');
    
    // Préparer les données pour l'envoi
    const formattedData = {
      ...formData,
      colleges: nonEmptyColleges.length > 0 ? nonEmptyColleges : ['Collège unique'],
      totalEmployees: parseInt(formData.totalEmployees, 10) || 0,
      registeredVoters: parseInt(formData.registeredVoters, 10) || 0,
      validVotes: parseInt(formData.validVotes, 10) || 0,
      unions: formData.unions.map(union => ({
        union: union.union,
        votes: parseInt(union.votes, 10) || 0,
        percentage: parseFloat(union.percentage) || 0,
        seats: parseInt(union.seats, 10) || 0
      }))
    };
    
    // Envoyer les données au composant parent
    onSubmit(formattedData);
  };
  
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Ajouter un nouveau résultat d'élection CSE</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Informations générales</h3>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="legalName" className={styles.label}>
                Raison sociale / SIRET <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="legalName"
                name="legalName"
                value={formData.legalName}
                onChange={handleChange}
                className={styles.input}
                placeholder="Raison sociale complète de l'entreprise"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="company" className={styles.label}>
                Nom commercial
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={styles.input}
                placeholder="Nom commercial ou enseigne"
                required
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="sector" className={styles.label}>
                Secteur d'activité <span className={styles.required}>*</span>
              </label>
              <select
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Sélectionner un secteur</option>
                {sectors.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="date" className={styles.label}>
                Date de l'élection <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>
          
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Collèges électoraux</h3>
            <p className={styles.sectionDescription}>
              Indiquez les collèges concernés par cette élection. Si l'élection concerne plusieurs collèges,
              les résultats seront automatiquement regroupés.
            </p>
            
            {formData.colleges.map((college, index) => (
              <div key={index} className={styles.collegeRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Collège {index + 1}
                  </label>
                  <select
                    value={college}
                    onChange={(e) => handleCollegeChange(index, e.target.value)}
                    className={styles.select}
                  >
                    <option value="">Sélectionner un collège</option>
                    {standardColleges.map((collegeOption, optIndex) => (
                      <option key={optIndex} value={collegeOption}>{collegeOption}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveCollege(index)}
                  disabled={formData.colleges.length <= 1}
                >
                  Supprimer
                </button>
              </div>
            ))}
            
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddCollege}
            >
              + Ajouter un collège
            </button>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="totalEmployees" className={styles.label}>
                Effectif total de l'entreprise
              </label>
              <input
                type="number"
                id="totalEmployees"
                name="totalEmployees"
                value={formData.totalEmployees}
                onChange={handleChange}
                className={styles.input}
                min="0"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="registeredVoters" className={styles.label}>
                Nombre d'électeurs inscrits
              </label>
              <input
                type="number"
                id="registeredVoters"
                name="registeredVoters"
                value={formData.registeredVoters}
                onChange={handleChange}
                className={styles.input}
                min="0"
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="validVotes" className={styles.label}>
                Nombre de suffrages valablement exprimés
              </label>
              <input
                type="number"
                id="validVotes"
                name="validVotes"
                value={formData.validVotes}
                onChange={handleChange}
                className={styles.input}
                min="0"
              />
            </div>
            
            <div className={styles.formGroup}>
              <button
                type="button"
                className={styles.calculateButton}
                onClick={calculatePercentages}
              >
                Calculer les pourcentages
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Résultats par organisation syndicale</h3>
          
          {formData.unions.map((union, index) => (
            <div key={index} className={styles.unionRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Organisation syndicale
                </label>
                <input
                  type="text"
                  value={union.union}
                  onChange={(e) => handleUnionChange(index, 'union', e.target.value)}
                  className={styles.input}
                  placeholder="Nom du syndicat"
                  disabled={index === 0 && union.union === 'CGT'}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Voix
                </label>
                <input
                  type="number"
                  value={union.votes}
                  onChange={(e) => handleUnionChange(index, 'votes', e.target.value)}
                  className={styles.input}
                  min="0"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Pourcentage
                </label>
                <input
                  type="number"
                  value={union.percentage}
                  onChange={(e) => handleUnionChange(index, 'percentage', e.target.value)}
                  className={styles.input}
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Sièges
                </label>
                <input
                  type="number"
                  value={union.seats}
                  onChange={(e) => handleUnionChange(index, 'seats', e.target.value)}
                  className={styles.input}
                  min="0"
                />
              </div>
              
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemoveUnion(index)}
                disabled={index === 0 || formData.unions.length <= 1}
              >
                Supprimer
              </button>
            </div>
          ))}
          
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddUnion}
          >
            + Ajouter un syndicat
          </button>
        </div>
        
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Annuler
          </button>
          
          <button
            type="submit"
            className={styles.submitButton}
          >
            Enregistrer les résultats
          </button>
        </div>
      </form>
    </div>
  );
};

export default ElectionResultForm;
