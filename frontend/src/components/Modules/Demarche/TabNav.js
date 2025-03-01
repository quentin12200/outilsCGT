// frontend/src/components/DemarcheModule/TabNav.js

import React from 'react';

// Ce composant crée une barre de navigation avec des onglets
// Il reçoit trois propriétés (props) :
// - tabs : un tableau d'objets représentant les onglets à afficher
// - activeTab : l'identifiant de l'onglet actuellement actif
// - onTabChange : une fonction à appeler quand l'utilisateur clique sur un onglet
function TabNav({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex border-b">
      {/* On parcourt chaque onglet du tableau et on crée un bouton pour chacun */}
      {tabs.map(tab => (
        <button
          key={tab.id} // Clé unique pour React (obligatoire dans les listes)
          className={`px-4 py-2 font-medium rounded-t transition ${
            // Si cet onglet est actif, on lui applique sa couleur et le texte blanc
            // Sinon, on utilise un fond gris clair avec un effet de survol
            activeTab === tab.id 
              ? `${tab.color} text-white` 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          // Quand on clique sur le bouton, on appelle la fonction onTabChange
          // avec l'identifiant de l'onglet comme argument
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label} {/* Le texte affiché sur l'onglet */}
        </button>
      ))}
    </div>
  );
}

export default TabNav;