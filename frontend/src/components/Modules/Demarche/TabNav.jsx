// src/components/Modules/Demarche/TabNav.jsx
import React from 'react';
import styles from './TabNav.module.css';
import { FaGraduationCap, FaEye, FaClipboardList, FaFileAlt, FaUsers, FaFistRaised } from 'react-icons/fa';

// Fonction pour obtenir l'icône correspondant à l'ID de l'onglet
const getTabIcon = (tabId) => {
  switch (tabId) {
    case 'ecole-democratie':
      return <FaGraduationCap className={styles.tabIcon} />;
    case 'vue-ensemble':
      return <FaEye className={styles.tabIcon} />;
    case 'besoins':
      return <FaClipboardList className={styles.tabIcon} />;
    case 'revendications':
      return <FaFileAlt className={styles.tabIcon} />;
    case 'mobilisation':
      return <FaUsers className={styles.tabIcon} />;
    case 'action':
      return <FaFistRaised className={styles.tabIcon} />;
    default:
      return null;
  }
};

function TabNav({ tabs, activeTab, onTabChange }) {
  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`
              ${styles.tabItem}
              ${activeTab === tab.id ? styles.activeTab : ''}
            `}
            onClick={() => onTabChange(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {getTabIcon(tab.id)}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TabNav;
