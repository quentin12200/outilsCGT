document.addEventListener("DOMContentLoaded", function() {
    // Éléments pour le constat initial
    const initialForm = document.getElementById("initialForm");
    const diagramInitial = document.getElementById("diagramInitial");
    const initialSyndiquesValue = document.getElementById("initialSyndiquesValue");
    const initialSalairesValue = document.getElementById("initialSalairesValue");
    const initialRatioLabel = document.getElementById("initialRatioLabel");
    const initialResultText = document.getElementById("initialResultText");
    const initialProgressBar = document.getElementById("initialProgressBar");
    const initialProgressLabel = document.getElementById("initialProgressLabel");
  
    // Éléments pour la démarche "Renforcer la CGT"
    const formationSection = document.getElementById("formationSection");
    const formationForm = document.getElementById("formationForm");
    const diagramUpdated = document.getElementById("diagramUpdated");
    const updatedSyndiquesValue = document.getElementById("updatedSyndiquesValue");
    const updatedSalairesValue = document.getElementById("updatedSalairesValue");
    const updatedRatioLabel = document.getElementById("updatedRatioLabel");
    const formationResultText = document.getElementById("formationResultText");
    const updatedProgressBar = document.getElementById("updatedProgressBar");
    const updatedProgressLabel = document.getElementById("updatedProgressLabel");
    const comparisonResult = document.getElementById("comparisonResult");
  
    // Conclusion
    const conclusionSection = document.getElementById("conclusionSection");
  
    // Variables globales
    let totalSalaries = 0;
    let totalSyndiques = 0;
    let totalMilitants = 0;
    let initialPercentage = 0;
  
    // Fonction pour formater les nombres avec des séparateurs de milliers
    function formatNumber(num) {
      return new Intl.NumberFormat('fr-FR').format(num);
    }
  
    // 1) Formulaire initial (Constat)
    initialForm.addEventListener("submit", function(e) {
      e.preventDefault();
  
      totalSalaries = parseInt(document.getElementById("total_salaries").value) || 0;
      totalSyndiques = parseInt(document.getElementById("total_syndiques").value) || 0;
      totalMilitants = parseInt(document.getElementById("total_militants").value) || 0;
  
      // Vérifications
      if (totalSyndiques > totalSalaries) {
        showNotification("Incohérence : il y a plus de syndiqués que de salariés.", "error");
        return;
      }
      if (totalSyndiques < 0 || totalSalaries <= 0) {
        showNotification("Les nombres doivent être positifs.", "error");
        return;
      }
  
      // Calcul
      const restants = totalSalaries - totalSyndiques;
      const recrutementParSyndique = restants > 0 && totalSyndiques > 0 ? (restants / totalSyndiques).toFixed(2) : 0;
      const recrutementParMilitant = (totalMilitants > 0 && restants > 0) ? (restants / totalMilitants).toFixed(2) : 0;
      initialPercentage = totalSalaries > 0 ? (totalSyndiques / totalSalaries) * 100 : 0;
  
      // Affichage dans le premier diagramme
      diagramInitial.style.display = "block";
      initialSyndiquesValue.textContent = totalSyndiques;
      initialSalairesValue.textContent = totalSalaries;
      
      // Mise à jour des valeurs dans le triangle
      document.getElementById("triangleLeftValue").textContent = totalSyndiques;
      document.getElementById("triangleRightValue").textContent = totalSalaries;
      
      // Mise à jour de la barre de progression
      initialProgressBar.style.width = initialPercentage.toFixed(1) + "%";
      initialProgressLabel.textContent = initialPercentage.toFixed(1) + "%";
      
      if (restants > 0 && totalSyndiques > 0) {
        initialRatioLabel.innerHTML = `<i class="fas fa-user-plus"></i> En moyenne, <strong>${recrutementParSyndique}</strong> salarié·e·s à convaincre par syndiqué·e.`;
      } else if (restants > 0 && totalSyndiques === 0) {
        initialRatioLabel.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Aucun syndiqué présent pour le moment.`;
      } else {
        initialRatioLabel.innerHTML = `<i class="fas fa-check-circle"></i> Tous les salarié·e·s sont déjà syndiqué·e·s !`;
      }
  
      // Construction du texte des résultats
      let html = `<p><strong>Constat initial :</strong></p>`;
      html += `<p>Actuellement, il y a <strong>${totalSyndiques}</strong> syndiqué·e·s sur <strong>${totalSalaries}</strong> salarié·e·s.</p>`;
      html += `<p>Il reste donc <strong>${restants}</strong> salarié·e·s à syndiquer.</p>`;
  
      if (restants > 0 && totalSyndiques > 0) {
        html += `<p>Si tous les syndiqué·e·s se mobilisent, chacun·e doit convaincre environ <strong>${recrutementParSyndique}</strong> salarié·e·s.</p>`;
        if (totalMilitants > 0) {
          html += `<p><strong>(Optionnel)</strong> Si <u>seulement</u> les militants (au nombre de ${totalMilitants}) recrutent, chacun doit convaincre environ <strong>${recrutementParMilitant}</strong> salarié·e·s.</p>`;
        }
      } else if (totalSyndiques === 0) {
        html += `<p><strong>Attention :</strong> Il n'y a pas encore de syndiqués dans votre établissement. La première étape sera de constituer un noyau initial.</p>`;
      } else {
        html += `<p><strong>Bravo !</strong> Tous les salarié·e·s sont déjà syndiqué·e·s.</p>`;
      }
  
      // Scénario : Chaque syndiqué recrute 1 personne
      html += `<hr>`;
      html += `<p><strong>Scénario :</strong> Chaque syndiqué·e recrute 1 nouvelle personne cette année.</p>`;
      
      if (totalSyndiques > 0) {
        const nextYearSyndiques = Math.min(totalSyndiques * 2, totalSalaries);
        const nouveauxSyndiques = nextYearSyndiques - totalSyndiques;
        const restantsNextYear = totalSalaries - nextYearSyndiques;
        html += `<p>L'année prochaine, on aurait <strong>${nextYearSyndiques}</strong> syndiqué·e·s, dont <strong>${nouveauxSyndiques}</strong> nouveaux.</p>`;
        if (restantsNextYear > 0) {
          html += `<p>Il restera alors <strong>${restantsNextYear}</strong> salarié·e·s à syndiquer.</p>`;
          const ratioNextYear = (restantsNextYear / nextYearSyndiques).toFixed(2);
          html += `<p>Soit environ <strong>${ratioNextYear}</strong> salarié·e·s à convaincre par syndiqué·e.</p>`;
        } else {
          html += `<p>Ce scénario suffit déjà à syndiquer tout le monde, bravo !</p>`;
        }
      } else {
        html += `<p>Impossible de calculer un scénario car il n'y a pas encore de syndiqués.</p>`;
      }
  
      initialResultText.innerHTML = html;
  
      // Réinitialiser l'animation de la flèche 1
      resetArrowAnimation("arrowInitial");
  
      // On affiche la section "Renforcer la CGT" pour la suite
      formationSection.style.display = "block";
      diagramUpdated.style.display = "none";
      conclusionSection.style.display = "none";
      
      // Scroll vers le premier diagramme
      diagramInitial.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  
    // 2) Formulaire "Renforcer la CGT"
    formationForm.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const nouveauxSyndiques = parseInt(document.getElementById("nouveaux_syndiques").value) || 0;
      if (nouveauxSyndiques < 0) {
        showNotification("Le nombre de nouveaux syndiqués doit être positif ou nul.", "error");
        return;
      }
  
      // Nouveau total après formation
      let updated = totalSyndiques + nouveauxSyndiques;
      if (updated > totalSalaries) {
        updated = totalSalaries;
        showNotification("Le nombre de syndiqués a été ajusté pour ne pas dépasser le nombre de salariés.", "warning");
      }
  
      // Calcul du pourcentage après formation
      const updatedPercentage = totalSalaries > 0 ? (updated / totalSalaries) * 100 : 0;
      const progression = updatedPercentage - initialPercentage;
  
      // Affichage dans le second diagramme
      diagramUpdated.style.display = "block";
      updatedSyndiquesValue.textContent = updated;
      updatedSalairesValue.textContent = totalSalaries;
      
      // Mise à jour des valeurs dans le triangle
      document.getElementById("updatedTriangleLeftValue").textContent = updated;
      document.getElementById("updatedTriangleRightValue").textContent = totalSalaries;
      
      // Mise à jour de la barre de progression
      updatedProgressBar.style.width = updatedPercentage.toFixed(1) + "%";
      updatedProgressLabel.textContent = updatedPercentage.toFixed(1) + "%";
  
      const restantsFinal = totalSalaries - updated;
      if (restantsFinal > 0) {
        const ratioFinal = (restantsFinal / updated).toFixed(2);
        updatedRatioLabel.innerHTML = `<i class="fas fa-user-plus"></i> Il reste ${restantsFinal} salarié·e·s à syndiquer, soit environ <strong>${ratioFinal}</strong> par syndiqué·e.`;
      } else {
        updatedRatioLabel.innerHTML = `<i class="fas fa-trophy"></i> Tous les salarié·e·s sont désormais syndiqué·e·s, félicitations !`;
      }
  
      // Construction du texte des résultats
      let html2 = `<p><strong>Après la formation "Renforcer la CGT des principes et des actes" :</strong></p>`;
      html2 += `<p>Nous avons <strong>${nouveauxSyndiques}</strong> nouveaux syndiqué·e·s, portant le total à <strong>${updated}</strong>.</p>`;
      
      if (restantsFinal > 0) {
        html2 += `<p>Il manque encore <strong>${restantsFinal}</strong> salarié·e·s pour atteindre la syndicalisation complète.</p>`;
        
        // Scénario pour l'année suivante
        const potentielTotal = Math.min(updated * 2, totalSalaries);
        const potentielPourcentage = (potentielTotal / totalSalaries) * 100;
        
        html2 += `<p>Si chaque syndiqué recrute encore une personne, nous pourrions atteindre <strong>${potentielTotal}</strong> syndiqués (<strong>${potentielPourcentage.toFixed(1)}%</strong>).</p>`;
      } else {
        html2 += `<p><strong>Objectif atteint !</strong> Toute la masse salariale est désormais syndiquée.</p>`;
      }
  
      formationResultText.innerHTML = html2;
      
      // Comparaison des résultats (avant/après)
      let comparisonHTML = `
        <div class="comparison-grid">
          <div class="comparison-item">
            <div class="comparison-label">Syndiqués avant</div>
            <div class="comparison-value">${totalSyndiques}</div>
          </div>
          <div class="comparison-item">
            <div class="comparison-label">Syndiqués après</div>
            <div class="comparison-value">${updated}</div>
          </div>
          <div class="comparison-item">
            <div class="comparison-label">Taux avant</div>
            <div class="comparison-value">${initialPercentage.toFixed(1)}%</div>
          </div>
          <div class="comparison-item">
            <div class="comparison-label">Taux après</div>
            <div class="comparison-value">${updatedPercentage.toFixed(1)}%</div>
          </div>
          <div class="comparison-item highlight">
            <div class="comparison-label">Progression</div>
            <div class="comparison-value ${progression > 0 ? 'positive' : 'negative'}">
              ${progression > 0 ? '+' : ''}${progression.toFixed(1)}%
            </div>
          </div>
          <div class="comparison-item highlight">
            <div class="comparison-label">Nouveaux</div>
            <div class="comparison-value positive">+${nouveauxSyndiques}</div>
          </div>
        </div>
      `;
      
      comparisonResult.innerHTML = comparisonHTML;
      
      // Afficher la conclusion
      conclusionSection.style.display = "block";
      
      // Réinitialiser l'animation de la flèche 2
      resetArrowAnimation("arrowUpdated");
      
      // Scroll vers le second diagramme
      diagramUpdated.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  
    // Fonction pour réinitialiser l'animation d'une flèche
    function resetArrowAnimation(arrowId) {
      const path = document.getElementById(arrowId);
      if (path) {
        path.style.animation = 'none';
        void path.offsetWidth; // force reflow
        path.style.animation = null;
      }
    }
    
    // Fonction pour afficher des notifications
    function showNotification(message, type = 'info') {
      const notification = document.createElement("div");
      notification.className = `notification ${type}`;
      notification.innerHTML = `
        <div class="notification-icon">
          <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        </div>
        <div class="notification-message">${message}</div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
      `;
      
      document.body.appendChild(notification);
      
      // Animation d'entrée
      setTimeout(() => {
        notification.classList.add("show");
      }, 10);
      
      // Fermeture automatique après 5 secondes pour info et warning
      if (type !== "error") {
        setTimeout(() => {
          notification.classList.remove("show");
          setTimeout(() => notification.remove(), 300);
        }, 5000);
      }
      
      // Bouton de fermeture
      notification.querySelector(".notification-close").addEventListener("click", () => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      });
    }
  });