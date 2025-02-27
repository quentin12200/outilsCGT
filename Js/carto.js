new Vue({
  el: '#app',
  data: {
    // Liste dynamique des services
    services: [
      { name: '', salaries: 0, syndiques: 0 }
    ],
    submitted: false
  },
  methods: {
    addService() {
      this.services.push({ name: '', salaries: 0, syndiques: 0 });
    },
    removeService(index) {
      if (this.services.length > 1) {
        this.services.splice(index, 1);
      } else {
        alert("Il doit y avoir au moins un service dans la liste.");
      }
    },
    submitServices() {
      // Vérification que tous les services ont un nom
      const emptyServices = this.services.filter(s => !s.name.trim());
      if (emptyServices.length > 0) {
        alert("Tous les services doivent avoir un nom.");
        return;
      }
      
      // Vérifier que les nombres sont cohérents
      for (const service of this.services) {
        if (service.syndiques > service.salaries) {
          alert(`Le service "${service.name}" a plus de syndiqués que de salariés.`);
          return;
        }
      }
      
      this.submitted = true;
      // Afficher la synthèse globale
      this.renderGlobal();
      
      // Scroll vers la section des résultats
      setTimeout(() => {
        document.querySelector('.diagram-section').scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    },
    // Fonction qui calcule le style des carrés pour chaque service
    squareStyle(n, service) {
      if (service.salaries <= 0) {
        return { backgroundColor: '#ccc' };
      }
      // Calcul du nombre de carrés rouges sur un total de 50
      const redSquares = Math.round((service.syndiques / service.salaries) * 50);
      return {
        backgroundColor: n <= redSquares ? '#b71c1c' : '#ccc'
      };
    },
    // Calculer la classe CSS en fonction du taux
    getServiceClass(service) {
      if (service.salaries <= 0) return '';
      
      const rate = service.syndiques / service.salaries;
      if (rate >= 0.5) return 'service-high';
      if (rate >= 0.25) return 'service-medium';
      return 'service-low';
    },
    // Fonction qui calcule la synthèse globale et affiche les carrés
    renderGlobal() {
      let globalSalaries = 0;
      let globalSyndiques = 0;
      let above50 = [];
      let below25 = [];
      
      this.services.forEach(service => {
        globalSalaries += service.salaries;
        globalSyndiques += service.syndiques;
        
        if (service.salaries > 0) {
          const rate = service.syndiques / service.salaries;
          if (rate >= 0.5) {
            above50.push(service.name);
          }
          if (rate < 0.25 && service.salaries > 5) { // Ignorer les très petits services
            below25.push(service.name);
          }
        }
      });
      
      let globalRatio = globalSalaries > 0 ? ((globalSyndiques / globalSalaries) * 100).toFixed(1) : 0;
      document.getElementById("globalSalaries").textContent = "Salariés totaux : " + globalSalaries;
      document.getElementById("globalSyndiques").textContent = "Syndiqués totaux : " + globalSyndiques;
      document.getElementById("globalRatio").textContent = "Taux global : " + globalRatio + "%";

      // Mise à jour des carrés globaux (50 au total)
      const globalSquaresContainer = document.getElementById("globalSquares");
      globalSquaresContainer.innerHTML = "";
      const redSquares = Math.round((globalSyndiques / globalSalaries) * 50) || 0;
      
      for (let i = 1; i <= 50; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.backgroundColor = i <= redSquares ? "#b71c1c" : "#ccc";
        globalSquaresContainer.appendChild(square);
      }

      let message = "";
      if (above50.length > 0) {
        message = `<i class="fas fa-star"></i> Les services suivants, ayant plus de 50% de syndicalisation, peuvent servir de modèle et soutenir les autres : <strong>${above50.join(", ")}</strong>.`;
      } else {
        message = "<i class='fas fa-exclamation-triangle'></i> Aucun service n'a encore atteint un taux de syndicalisation supérieur à 50%. Une mobilisation accrue est nécessaire.";
      }
      
      // Ajouter les services à faible taux
      if (below25.length > 0) {
        message += `<br><br><i class="fas fa-exclamation-circle"></i> Attention : les services suivants ont moins de 25% de syndicalisation et nécessitent une attention particulière : <strong>${below25.join(", ")}</strong>.`;
      }
      
      document.getElementById("globalMessage").innerHTML = message;
      document.getElementById("globalSection").style.display = "block";
      
      // Générer les conseils stratégiques
      this.generateStrategicAdvice(globalSyndiques, globalSalaries, above50, below25);
    },
    // Générer des conseils stratégiques basés sur les résultats
    generateStrategicAdvice(totalSyndiques, totalSalaries, above50, below25) {
      const globalRate = totalSalaries > 0 ? (totalSyndiques / totalSalaries) : 0;
      
      let advice = "<h3>Conseils stratégiques</h3>";
      
      // Conseil basé sur le taux global
      if (globalRate < 0.1) {
        advice += "<p>Le taux global de syndicalisation est très faible. Concentrez vos efforts sur une campagne de sensibilisation générale et choisissez un service pilote pour créer un premier succès.</p>";
      } else if (globalRate < 0.3) {
        advice += "<p>Le taux global est modeste. Utilisez les services déjà bien syndiqués comme ambassadeurs et organisez des rencontres inter-services.</p>";
      } else if (globalRate < 0.5) {
        advice += "<p>Le taux global est encourageant. Organisez des formations pour transformer les syndiqués en recruteurs actifs.</p>";
      } else {
        advice += "<p>Excellent taux global ! Concentrez-vous maintenant sur les services en retard et sur la qualité de l'engagement.</p>";
      }
      
      // Conseils spécifiques
      if (above50.length > 0) {
        advice += `<p>Organisez des échanges d'expérience entre les services bien syndiqués (${above50.join(", ")}) et les autres.</p>`;
      }
      
      if (below25.length > 0) {
        advice += `<p>Pour les services à faible taux (${below25.join(", ")}), identifiez des personnes influentes qui pourraient servir de relais.</p>`;
      }
      
      // Ajouter les conseils au conteneur
      const adviceElement = document.getElementById("strategicAdvice");
      if (adviceElement) {
        adviceElement.innerHTML = advice;
        adviceElement.style.display = "block";
      }
    },
    goBack() {
      // Retour à la page principale
      window.location.href = "index.html";
    },
    // Imprimer la cartographie
    printCartography() {
      if (!this.submitted) {
        alert("Veuillez d'abord générer la cartographie");
        return;
      }
      
      window.print();
    }
  }
});