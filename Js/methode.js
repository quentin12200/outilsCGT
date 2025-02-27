/**
 * Application pour la page méthode CGT
 * Gère l'affichage des méthodes et la timeline
 */
const methodeApp = {
    // Données pour la timeline
    timelineSteps: [
      {
        offset: -12,
        title: 'Préparation',
        description: 'Organisation initiale et définition des fondamentaux.'
      },
      {
        offset: -11,
        title: 'Analyse du Scrutin',
        description: 'Étude globale et par collège du précédent scrutin.'
      },
      {
        offset: -10,
        title: 'Évaluation de l\'Organisation',
        description: 'Analyse de l\'organisation cogitielle, KBIS, etc.'
      },
      {
        offset: -9,
        title: 'Planification Ciblée',
        description: 'Définition du plan de travail "cousu main".'
      },
      {
        offset: -8,
        title: 'Mobilisation Préliminaire',
        description: 'Visites syndicales, mobilisation départements spécifiques (ICT, etc.).'
      },
      {
        offset: -6,
        title: 'Formation-action',
        description: 'Formation du syndicat, rétroplanning en 3 temps.'
      },
      {
        offset: -4,
        title: 'Déploiement sur le Terrain',
        description: 'Mise en œuvre des visites, communication offensive.'
      },
      {
        offset: -3,
        title: 'Suivi et Réunion d\'Étape',
        description: 'Rencontre d\'étape pour ajuster la campagne.'
      },
      {
        offset: -2,
        title: 'Validation Démocratique',
        description: 'AG des syndiqués pour valider le plan d\'action.'
      },
      {
        offset: -1,
        title: 'Pérennisation & Déploiement',
        description: 'Plan de syndicalisation durable, déploiement interpro.'
      }
    ],
    
    /**
     * Initialisation de l'application
     */
    init: function() {
      // Afficher la méthode de renforcement par défaut
      this.showMethod('renforcement');
      
      // Pré-remplir avec une date dans 6 mois pour l'exemple
      const today = new Date();
      today.setMonth(today.getMonth() + 6);
      document.getElementById('startDate').value = today.toISOString().split('T')[0];
    },
    
    /**
     * Affiche la méthode sélectionnée
     * @param {string} method - 'renforcement' ou 'implantation'
     */
    showMethod: function(method) {
      // Masquer les deux contenus
      document.getElementById('renforcementContent').style.display = 'none';
      document.getElementById('implantationContent').style.display = 'none';
      
      // Afficher celui sélectionné
      document.getElementById(method + 'Content').style.display = 'block';
      
      // Scroll vers la section
      document.getElementById(method + 'Content').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    },
    
    /**
     * Ouvre/ferme la description d'une étape
     * @param {number} index - L'index de l'étape
     */
    toggleStep: function(index) {
      const descriptionElement = document.getElementById('step-description-' + index);
      
      // Ouvrir celle sélectionnée
      if (descriptionElement) {
        if (descriptionElement.classList.contains('active')) {
          descriptionElement.classList.remove('active');
        } else {
          // Fermer toutes les descriptions
          document.querySelectorAll('.step-description').forEach(function(el) {
            el.classList.remove('active');
          });
          
          descriptionElement.classList.add('active');
        }
      }
    },
    
    /**
     * Calcule les dates pour chaque étape de la timeline
     */
    computeDates: function() {
      const startDateInput = document.getElementById('startDate');
      if (!startDateInput.value) {
        alert("Veuillez choisir une date de départ (élection) !");
        return;
      }
      
      // On parse la date de départ
      const start = new Date(startDateInput.value);
      
      // Générer la timeline
      let timelineHTML = '<div class="timeline-line"></div>';
      
      for (let i = 0; i < this.timelineSteps.length; i++) {
        const step = this.timelineSteps[i];
        
        // Calculer la date pour cette étape
        let d = new Date(start);
        d.setMonth(d.getMonth() + step.offset);
        const formattedDate = this.formatDate(d);
        
        // Créer l'élément HTML pour cette étape
        timelineHTML += '<div class="timeline-step" onclick="methodeApp.toggleStep(' + i + ')">';
        timelineHTML += '<div class="circle">' + (i + 1) + '</div>';
        timelineHTML += '<div class="step-info">';
        timelineHTML += '<span class="step-date">' + formattedDate + '</span>';
        timelineHTML += '<div class="step-title">' + step.title + '</div>';
        timelineHTML += '</div>';
        timelineHTML += '<div class="step-description" id="step-description-' + i + '">';
        timelineHTML += '<p>' + step.description + '</p>';
        timelineHTML += '</div>';
        timelineHTML += '</div>';
      }
      
      // Insérer le HTML généré dans la page
      document.getElementById('timelineSteps').innerHTML = timelineHTML;
      
      // Afficher la section timeline
      document.getElementById('timelineSection').style.display = 'block';
      
      // Scroll vers la section timeline
      document.getElementById('timelineSection').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    },
    
    /**
     * Formate une date au format dd/mm/yyyy
     * @param {Date} date - La date à formater
     * @returns {string} La date formatée
     */
    formatDate: function(date) {
      let dd = date.getDate();
      let mm = date.getMonth() + 1; // Jan = 0
      let yyyy = date.getFullYear();
      
      // Ajouter un 0 si besoin
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      
      return dd + '/' + mm + '/' + yyyy;
    }
  };
  
  // Initialiser l'application au chargement de la page
  document.addEventListener('DOMContentLoaded', function() {
    methodeApp.init();
  });