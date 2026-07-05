// src/components/pages/PlanAvantPage.js
// AVANT les élections : tout ce qui doit être fait en amont du scrutin,
// sous forme de checklist persistante partagée avec le syndicat.

import React from 'react';
import PlanCampagneChecklist from './PlanCampagneChecklist';

const sections = [
  {
    id: 'cadre',
    titre: 'Cadre légal et calendrier',
    icone: '⚖️',
    couleur: '#1d4ed8',
    description:
      "Le processus électoral est encadré par des délais stricts : les manquer, c'est fragiliser le scrutin.",
    items: [
      { id: 'av-date', label: 'Connaître la date de fin des mandats en cours', detail: 'les élections doivent être organisées avant' },
      { id: 'av-effectifs', label: "Vérifier les effectifs de l'entreprise", detail: 'ils déterminent le nombre de sièges au CSE' },
      { id: 'av-invitation', label: "Obtenir l'invitation de l'employeur à négocier le PAP", detail: "l'exiger par écrit s'il tarde" },
      { id: 'av-pap', label: "Négocier le protocole d'accord préélectoral (PAP)", detail: 'collèges, répartition des sièges, modalités de vote, listes électorales' },
      { id: 'av-retro', label: 'Caler le rétro-planning complet de la campagne', lien: '/retro-planning' }
    ]
  },
  {
    id: 'terrain',
    titre: 'Connaître le terrain',
    icone: '🗺️',
    couleur: '#b71c1c',
    description:
      'Une campagne gagnante part de la réalité des services et des attentes des salariés.',
    items: [
      { id: 'av-carto', label: 'Mettre à jour la cartographie des services', lien: '/carto-syndicalisation?tab=cartographie' },
      { id: 'av-besoins', label: 'Lancer le questionnaire des besoins', lien: '/questionnaire' },
      { id: 'av-cahier', label: 'Construire le cahier revendicatif à partir des besoins', lien: '/cahier-revendicatif' },
      { id: 'av-analyse', label: 'Analyser les résultats du scrutin précédent', detail: 'où avons-nous perdu, où progresser ?', lien: '/resultats' }
    ]
  },
  {
    id: 'listes',
    titre: 'Constituer les listes',
    icone: '👥',
    couleur: '#7c3aed',
    description:
      "Des listes complètes et représentatives : c'est le premier message envoyé aux salariés.",
    items: [
      { id: 'av-candidats', label: 'Repérer et convaincre des candidat·es dans chaque service', detail: 'viser des listes complètes' },
      { id: 'av-parite', label: 'Respecter la représentation femmes-hommes', detail: 'proportion du collège, alternance sur la liste — une liste non conforme fait annuler des élu·es' },
      { id: 'av-formation', label: 'Former les candidat·es', detail: 'rôle du CSE, protection des candidats, conduite de campagne' },
      { id: 'av-depot', label: 'Déposer les listes dans les délais du PAP', detail: 'avec accusé de réception' }
    ]
  },
  {
    id: 'communication',
    titre: 'Campagne de communication',
    icone: '📣',
    couleur: '#d97706',
    description:
      'Faire connaître les candidat·es et les revendications avant le premier tour.',
    items: [
      { id: 'av-profession', label: 'Rédiger la profession de foi', detail: 'courte, concrète, appuyée sur le cahier revendicatif' },
      { id: 'av-tracts', label: "Planifier tracts et affichage", detail: 'un message par semaine plutôt que tout à la fois' },
      { id: 'av-tournee', label: 'Organiser la tournée des services avec les candidat·es', detail: 'le contact direct fait la différence' },
      { id: 'av-bilan-mandat', label: 'Valoriser le bilan du mandat écoulé', detail: "ce que la CGT a obtenu, chiffres à l'appui" }
    ]
  }
];

function PlanAvantPage() {
  return (
    <PlanCampagneChecklist
      cleStockage="planAvant"
      titre="AVANT — Préparer les élections"
      sousTitre="Tout ce qui se joue en amont du scrutin : le cadre légal, le terrain, les listes, la campagne. Chaque case cochée est partagée avec le syndicat."
      sections={sections}
    />
  );
}

export default PlanAvantPage;
