// Thèmes revendicatifs communs au questionnaire et au cahier revendicatif.
// Le questionnaire classe les priorités des salariés par thème, et le
// cahier revendicatif organise les revendications avec les mêmes thèmes :
// les besoins recueillis se transforment ainsi directement en revendications.

export const themesRevendicatifs = [
  { id: 'salaires', label: 'Salaires et pouvoir d\'achat', icone: '💶', couleur: '#b71c1c' },
  { id: 'conditions', label: 'Conditions de travail', icone: '🛠️', couleur: '#d97706' },
  { id: 'temps', label: 'Temps de travail et congés', icone: '⏰', couleur: '#1d4ed8' },
  { id: 'emploi', label: 'Emploi et effectifs', icone: '👥', couleur: '#7c3aed' },
  { id: 'sante', label: 'Santé et sécurité', icone: '🩺', couleur: '#15803d' },
  { id: 'egalite', label: 'Égalité femmes-hommes', icone: '⚖️', couleur: '#be185d' },
  { id: 'formation', label: 'Formation et évolution', icone: '🎓', couleur: '#0f766e' },
  { id: 'management', label: 'Management et reconnaissance', icone: '🗣️', couleur: '#4338ca' },
  { id: 'autres', label: 'Autres sujets', icone: '📌', couleur: '#525252' }
];

export function themeParId(id) {
  return themesRevendicatifs.find((t) => t.id === id) || themesRevendicatifs[themesRevendicatifs.length - 1];
}
