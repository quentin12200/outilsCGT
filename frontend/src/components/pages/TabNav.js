// frontend/src/components/DemarcheModule/TabNav.js
import React from 'react';
import styles from './TabNav.module.css';  // Import du module CSS

function TabNav({ tabs, activeTab, onTabChange }) {
  // Fonction pour déterminer quelle classe de couleur appliquer
  const getTabColorClass = (tab) => {
    if (activeTab !== tab.id) return '';
    
    // Selon la couleur définie dans la prop du tab
    if (tab.color.includes('red')) return styles.tabRed;
    if (tab.color.includes('yellow')) return styles.tabYellow;
    if (tab.color.includes('green')) return styles.tabGreen;
    if (tab.color.includes('blue')) return styles.tabBlue;
    
    return '';
  };

  return (
    <div className={styles.tabContainer}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${
            activeTab === tab.id 
              ? `${styles.tabActive} ${getTabColorClass(tab)}` 
              : styles.tabDefault
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabNav;