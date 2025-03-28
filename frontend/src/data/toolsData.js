import React from 'react';

// Icônes pour les outils
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

const ChecklistIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

// Catégories d'outils
export const categories = [
  { id: 'syndicalisation', label: 'Syndicalisation', color: 'red' },
  { id: 'elections', label: 'Élections', color: 'blue' },
  { id: 'planification', label: 'Planification', color: 'green' },
  { id: 'analyse', label: 'Analyse', color: 'orange' }
];

// Données des outils
export const tools = [
  {
    title: 'Cartographie stratégique',
    description: 'Analysez et visualisez la répartition des syndiqués par service pour identifier les zones prioritaires d\'intervention.',
    icon: <MapIcon />,
    path: '/cartographie',
    color: 'orange',
    category: 'analyse'
  },
  {
    title: 'Rétro-planning',
    description: 'Planifiez les étapes clés de votre campagne syndicale avec un calendrier interactif.',
    icon: <CalendarIcon />,
    path: '/retroplanning',
    color: 'green',
    category: 'planification'
  },
  {
    title: 'Démarche syndicale',
    description: 'Guide méthodologique pour construire et renforcer votre section syndicale.',
    icon: <ChecklistIcon />,
    path: '/demarche',
    color: 'red',
    category: 'syndicalisation'
  },
  {
    title: 'Campagne électorale',
    description: 'Outils pour préparer et mener efficacement votre campagne pour les élections professionnelles.',
    icon: <UsersIcon />,
    path: '/campagne',
    color: 'blue',
    category: 'elections'
  },
  {
    title: 'Résultats électoraux',
    description: 'Analysez les résultats des élections et identifiez les points forts et axes d\'amélioration.',
    icon: <ChartIcon />,
    path: '/resultats',
    color: 'blue',
    category: 'elections'
  },
  {
    title: 'Plan d\'actions',
    description: 'Créez et suivez votre plan d\'actions syndical avec des objectifs clairs et mesurables.',
    icon: <FileIcon />,
    path: '/plan-actions',
    color: 'green',
    category: 'planification'
  }
];

// Données statistiques (à connecter à de vraies données ultérieurement)
export const defaultStats = [
  {
    icon: <UsersIcon />,
    value: '32%',
    label: 'Taux de syndicalisation moyen',
    color: 'red'
  },
  {
    icon: <CalendarIcon />,
    value: '45j',
    label: 'Avant prochaine échéance',
    color: 'blue'
  },
  {
    icon: <ChartIcon />,
    value: '3',
    label: 'Services prioritaires',
    color: 'orange'
  },
  {
    icon: <ChecklistIcon />,
    value: '8',
    label: 'Actions en cours',
    color: 'green'
  }
];
