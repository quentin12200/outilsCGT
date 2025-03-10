import React, { useState } from 'react';
import styles from './QuestionnaireTool.module.css';

function QuestionnaireTool() {
  const [formData, setFormData] = useState({
    besoin: '',
    priorite: '',
    commentaires: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traitement des données (par exemple, envoi vers une API)
    console.log('Questionnaire soumis :', formData);
    alert('Merci pour vos réponses !');
    // Réinitialiser le formulaire si nécessaire :
    setFormData({
      besoin: '',
      priorite: '',
      commentaires: '',
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Questionnaire pour établir le Cahier Revendicatif
      </h1>
      <p className={styles.description}>
        Veuillez remplir ce questionnaire afin de recueillir vos besoins, vos
        priorités et suggestions pour l’élaboration du cahier revendicatif.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="besoin" className={styles.label}>
            Quels sont vos besoins principaux ?
          </label>
          <textarea
            id="besoin"
            name="besoin"
            className={styles.textarea}
            value={formData.besoin}
            onChange={handleChange}
            required
            placeholder="Décrivez vos besoins..."
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="priorite" className={styles.label}>
            Quelles sont vos priorités ?
          </label>
          <textarea
            id="priorite"
            name="priorite"
            className={styles.textarea}
            value={formData.priorite}
            onChange={handleChange}
            required
            placeholder="Indiquez vos priorités..."
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="commentaires" className={styles.label}>
            Commentaires ou suggestions
          </label>
          <textarea
            id="commentaires"
            name="commentaires"
            className={styles.textarea}
            value={formData.commentaires}
            onChange={handleChange}
            placeholder="Vos remarques..."
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default QuestionnaireTool;
