document.addEventListener("DOMContentLoaded", function() {
    // Éléments pour le constat initial
    const initialForm = document.getElementById("initialForm");
    const diagramInitial = document.getElementById("diagramInitial");
    const initialSyndiquesValue = document.getElementById("initialSyndiquesValue");
    const initialSalairesValue = document.getElementById("initialSalairesValue");
    const initialRatioLabel = document.getElementById("initialRatioLabel");
    const initialResultText = document.getElementById("initialResultText");
  
    // Éléments pour la démarche "Renforcer la CGT"
    const formationSection = document.getElementById("formationSection");
    const formationForm = document.getElementById("formationForm");
    const diagramUpdated = document.getElementById("diagramUpdated");
    const updatedSyndiquesValue = document.getElementById("updatedSyndiquesValue");
    const updatedSalairesValue = document.getElementById("updatedSalairesValue");
    const updatedRatioLabel = document.getElementById("updatedRatioLabel");
    const formationResultText = document.getElementById("formationResultText");
  
    // Conclusion
    const conclusionSection = document.getElementById("conclusionSection");
  
    // Variables globales
    let totalSalaries = 0;
    let totalSyndiques = 0;
    let totalMilitants = 0;
  
    // 1) Formulaire initial (Constat)
    initialForm.addEventListener("submit", function(e) {
      e.preventDefault();
  
      totalSalaries = parseInt(document.getElementById("total_salaries").value) || 0;
      totalSyndiques = parseInt(document.getElementById("total_syndiques").value) || 0;
      totalMilitants = parseInt(document.getElementById("total_militants").value) || 0;
  
      // Vérifications
      if (totalSyndiques > totalSalaries) {
        alert("Incohérence : il y a plus de syndiqués que de salariés.");
        return;
      }
      if (totalSyndiques <= 0) {
        alert("Il n'y a aucun syndiqué pour le moment, la mobilisation est à construire de zéro.");
        return;
      }
  
      // Calcul
      const restants = totalSalaries - totalSyndiques;
      const recrutementParSyndique = restants > 0 ? (restants / totalSyndiques).toFixed(2) : 0;
      const recrutementParMilitant = (totalMilitants > 0 && restants > 0) ? (restants / totalMilitants).toFixed(2) : 0;
  
      // Affichage dans le premier diagramme
      initialSyndiquesValue.textContent = totalSyndiques;
      initialSalairesValue.textContent = totalSalaries;
      if (restants > 0) {
        initialRatioLabel.textContent = `En moyenne, ${recrutementParSyndique} salarié·e·s à convaincre par syndiqué·e.`;
      } else {
        initialRatioLabel.textContent = `Tous les salarié·e·s sont déjà syndiqué·e·s !`;
      }
  
      // Construction du texte
      let html = `<p><strong>Constat initial :</strong></p>`;
      html += `<p>Actuellement, il y a <strong>${totalSyndiques}</strong> syndiqué·e·s sur <strong>${totalSalaries}</strong> salarié·e·s.</p>`;
      html += `<p>Il reste donc <strong>${restants}</strong> salarié·e·s à syndiquer.</p>`;
  
      if (restants > 0) {
        html += `<p>Si tous les syndiqué·e·s se mobilisent, chacun·e doit convaincre environ <strong>${recrutementParSyndique}</strong> salarié·e·s.</p>`;
        if (totalMilitants > 0) {
          html += `<p><strong>(Optionnel)</strong> Si <u>seulement</u> les militants (au nombre de ${totalMilitants}) recrutent, chacun doit convaincre environ <strong>${recrutementParMilitant}</strong> salarié·e·s.</p>`;
        }
      } else {
        html += `<p><strong>Bravo !</strong> Tous les salarié·e·s sont déjà syndiqué·e·s.</p>`;
      }
  
      // Scénario : Chaque syndiqué recrute 1 personne
      html += `<hr>`;
      html += `<p><strong>Scénario :</strong> Chaque syndiqué·e recrute 1 nouvelle personne cette année.</p>`;
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
  
      initialResultText.innerHTML = html;
      diagramInitial.style.display = "block";
  
      // Réinitialiser l'animation de la flèche 1
      resetArrowAnimation("arrowInitial");
  
      // On affiche la section "Renforcer la CGT" pour la suite
      formationSection.style.display = "block";
      diagramUpdated.style.display = "none";
      conclusionSection.style.display = "none";
    });
  
    // 2) Formulaire "Renforcer la CGT"
    formationForm.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const nouveauxSyndiques = parseInt(document.getElementById("nouveaux_syndiques").value) || 0;
      if (nouveauxSyndiques < 0) {
        alert("Le nombre de nouveaux syndiqués doit être positif ou nul.");
        return;
      }
  
      // Nouveau total après formation
      let updated = totalSyndiques + nouveauxSyndiques;
      if (updated > totalSalaries) {
        updated = totalSalaries;
      }
  
      // Affichage dans le second diagramme
      updatedSyndiquesValue.textContent = updated;
      updatedSalairesValue.textContent = totalSalaries;
  
      const restantsFinal = totalSalaries - updated;
      if (restantsFinal > 0) {
        const ratioFinal = (restantsFinal / updated).toFixed(2);
        updatedRatioLabel.textContent = `Il reste ${restantsFinal} salarié·e·s à syndiquer, soit environ ${ratioFinal} par syndiqué·e.`;
      } else {
        updatedRatioLabel.textContent = `Tous les salarié·e·s sont désormais syndiqué·e·s, félicitations !`;
      }
  
      let html2 = `<p><strong>Après la formation "Renforcer la CGT des principes et des actes" :</strong></p>`;
      html2 += `<p>Nous avons <strong>${nouveauxSyndiques}</strong> nouveaux syndiqué·e·s, portant le total à <strong>${updated}</strong>.</p>`;
      if (restantsFinal > 0) {
        html2 += `<p>Il manque encore <strong>${restantsFinal}</strong> salarié·e·s pour atteindre la syndicalisation complète.</p>`;
      } else {
        html2 += `<p><strong>Objectif atteint !</strong> Toute la masse salariale est désormais syndiquée.</p>`;
      }
  
      formationResultText.innerHTML = html2;
      diagramUpdated.style.display = "block";
      conclusionSection.style.display = "block";
  
      // Réinitialiser l'animation de la flèche 2
      resetArrowAnimation("arrowUpdated");
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
  });
  