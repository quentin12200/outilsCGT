// src/components/Modules/Demarche/TabNav.jsx
import React from 'react';
import styles from './TabNav.module.css';

function TabNav({ tabs, activeTab, onTabChange }) {
  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`
            ${styles.tabButton}
            ${activeTab === tab.id ? styles.activeTab : ''}
          `}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabNav;
