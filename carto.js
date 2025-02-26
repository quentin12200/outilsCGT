new Vue({
    el: '#app',
    data: {
      // Liste dynamique des services (1 service vide par défaut)
      services: [
        { name: '', salaries: 0, syndiques: 0 }
      ],
      submitted: false
    },
    methods: {
      addService() {
        // Ajoute un nouveau service vide
        this.services.push({ name: '', salaries: 0, syndiques: 0 });
      },
      removeService(index) {
        this.services.splice(index, 1);
      },
      submitServices() {
        // Validation supplémentaire si besoin
        // ...
        this.submitted = true;
      },
      // Calcule la couleur d'un carré en fonction du ratio
      // On fait un ratio sur 50 carrés : si ratio = 60% => 30 carrés rouges
      squareStyle(n, service) {
        if (service.salaries <= 0) {
          return { backgroundColor: '#ccc' };
        }
        const redSquares = Math.round((service.syndiques / service.salaries) * 50);
        return {
          backgroundColor: n <= redSquares ? '#b71c1c' : '#ccc'
        };
      },
      goBack() {
        // Retour à la page principale
        window.location.href = "index.html";
      }
    }
  });
  