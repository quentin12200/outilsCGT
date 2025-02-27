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
        this.services.splice(index, 1);
      },
      submitServices() {
        // Validation supplémentaire si nécessaire
        this.submitted = true;
        // Afficher la synthèse globale
        this.renderGlobal();
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
      // Fonction qui calcule la synthèse globale et affiche les carrés
      renderGlobal() {
        let globalSalaries = 0;
        let globalSyndiques = 0;
        let above50 = [];
        this.services.forEach(service => {
          globalSalaries += service.salaries;
          globalSyndiques += service.syndiques;
          if (service.salaries > 0 && (service.syndiques / service.salaries) >= 0.5) {
            above50.push(service.name);
          }
        });
        let globalRatio = globalSalaries > 0 ? ((globalSyndiques / globalSalaries) * 100).toFixed(1) : 0;
        document.getElementById("globalSalaries").textContent = "Salariés totaux : " + globalSalaries;
        document.getElementById("globalSyndiques").textContent = "Syndiqués totaux : " + globalSyndiques;
        document.getElementById("globalRatio").textContent = "Taux global : " + globalRatio + "%";
  
        // Mise à jour des carrés globaux (50 au total)
        const globalSquaresContainer = document.getElementById("globalSquares");
        globalSquaresContainer.innerHTML = "";
        const redSquares = Math.round((globalSyndiques / globalSalaries) * 50);
        for (let i = 1; i <= 50; i++) {
          const square = document.createElement("div");
          square.classList.add("square");
          square.style.backgroundColor = i <= redSquares ? "#b71c1c" : "#ccc";
          globalSquaresContainer.appendChild(square);
        }
  
        let message = "";
        if (above50.length > 0) {
          message = "Les services suivants, ayant plus de 50% de syndicalisation, peuvent servir de modèle et soutenir les autres : " + above50.join(", ") + ".";
        } else {
          message = "Aucun service n'a encore atteint un taux de syndicalisation supérieur à 50%. Une mobilisation accrue est nécessaire.";
        }
        document.getElementById("globalMessage").textContent = message;
        document.getElementById("globalSection").style.display = "block";
      },
      goBack() {
        // Retour à la page principale
        window.location.href = "index.html";
      }
    }
  });
  