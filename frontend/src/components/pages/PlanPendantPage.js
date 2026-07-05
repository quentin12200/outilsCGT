// src/components/pages/PlanPendantPage.js
// PENDANT les élections : la dernière ligne droite et le jour du scrutin,
// sous forme de checklist persistante partagée avec le syndicat.

import React from 'react';
import PlanCampagneChecklist from './PlanCampagneChecklist';

const sections = [
  {
    id: 'derniere-ligne',
    titre: 'Dernière ligne droite',
    icone: '🏁',
    couleur: '#d97706',
    description:
      "Les derniers jours avant le vote : c'est là que se décident les indécis.",
    items: [
      { id: 'pe-rappel', label: 'Rappeler la date, les horaires et les modalités du vote à tous les salariés', detail: 'tract, affichage, bouche-à-oreille' },
      { id: 'pe-tournee-finale', label: 'Faire la dernière tournée des services avec les candidat·es', detail: 'en priorité les services identifiés comme fragiles' },
      { id: 'pe-procurations', label: 'Aider les absents à voter', detail: 'vote par correspondance ou vote électronique selon le PAP' },
      { id: 'pe-mobilisation', label: 'Mobiliser chaque syndiqué pour faire voter autour de lui', detail: "l'abstention est notre premier adversaire" }
    ]
  },
  {
    id: 'jour-j',
    titre: 'Le jour du scrutin',
    icone: '🗳️',
    couleur: '#b71c1c',
    description:
      'Le déroulement du vote doit être irréprochable — et surveillé.',
    items: [
      { id: 'pe-bureau', label: 'Désigner nos représentants au bureau de vote', detail: 'présents à l’ouverture, pendant le vote et au dépouillement' },
      { id: 'pe-materiel', label: 'Vérifier le matériel de vote', detail: 'bulletins, enveloppes, urnes, émargement, isoloirs' },
      { id: 'pe-quorum', label: 'Suivre la participation en cours de journée', detail: 'au 1er tour, le quorum conditionne la validité — relancer si nécessaire' },
      { id: 'pe-incidents', label: 'Noter tout incident ou irrégularité', detail: 'faits précis, heure, témoins — utile en cas de contestation' }
    ]
  },
  {
    id: 'depouillement',
    titre: 'Dépouillement et procès-verbal',
    icone: '📋',
    couleur: '#1d4ed8',
    description:
      "Les résultats se jouent aussi dans les détails du dépouillement.",
    items: [
      { id: 'pe-depouillement', label: 'Assister au dépouillement avec nos représentants', detail: 'vérifier le décompte des voix et les ratures' },
      { id: 'pe-pv', label: 'Contrôler et faire signer les procès-verbaux', detail: "exiger une copie immédiatement — c'est la base du calcul de représentativité" },
      { id: 'pe-second-tour', label: 'Si quorum non atteint : préparer le second tour', detail: 'il doit se tenir dans les 15 jours' },
      { id: 'pe-saisie', label: "Saisir les résultats dans l'outil Résultats", lien: '/resultats' }
    ]
  },
  {
    id: 'communication-jour',
    titre: 'Communiquer sans attendre',
    icone: '📣',
    couleur: '#15803d',
    description:
      'Gagné ou pas, les salariés doivent entendre la CGT en premier.',
    items: [
      { id: 'pe-remerciement', label: 'Remercier les votant·es dès le lendemain', detail: 'tract ou affichage : « vous avez voté, voici la suite »' },
      { id: 'pe-annonce', label: 'Annoncer les résultats et les élu·es CGT', detail: 'avec les premières priorités du mandat' },
      { id: 'pe-bilan-campagne', label: 'Faire le débriefing de campagne à chaud avec les militants', detail: 'ce qui a marché, ce qui a manqué — pour le bilan', lien: '/plan-apres' }
    ]
  }
];

function PlanPendantPage() {
  return (
    <PlanCampagneChecklist
      cleStockage="planPendant"
      titre="PENDANT — Gagner le scrutin"
      sousTitre="De la dernière ligne droite au procès-verbal : la checklist du scrutin, partagée avec le syndicat."
      sections={sections}
    />
  );
}

export default PlanPendantPage;
