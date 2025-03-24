import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DashboardCard from './DashboardCard';
import styles from './DashboardGrid.module.css';

const DashboardGrid = ({ tools, category }) => {
  const [pinnedTools, setPinnedTools] = useState([]);
  
  // Charger les outils épinglés depuis le localStorage au chargement
  useEffect(() => {
    const savedPins = localStorage.getItem('cgtPinnedTools');
    if (savedPins) {
      setPinnedTools(JSON.parse(savedPins));
    }
  }, []);
  
  // Sauvegarder les outils épinglés dans le localStorage quand ils changent
  useEffect(() => {
    localStorage.setItem('cgtPinnedTools', JSON.stringify(pinnedTools));
  }, [pinnedTools]);
  
  // Gérer l'épinglage/désépinglage d'un outil
  const handleTogglePin = (path) => {
    if (pinnedTools.includes(path)) {
      setPinnedTools(pinnedTools.filter(p => p !== path));
    } else {
      setPinnedTools([...pinnedTools, path]);
    }
  };
  
  // Filtrer les outils par catégorie si spécifiée
  const filteredTools = category 
    ? tools.filter(tool => tool.category === category)
    : tools;
    
  // Trier les outils pour mettre les épinglés en premier
  const sortedTools = [...filteredTools].sort((a, b) => {
    const aPinned = pinnedTools.includes(a.path);
    const bPinned = pinnedTools.includes(b.path);
    
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return 0;
  });
  
  return (
    <div className={styles.gridContainer}>
      {sortedTools.map((tool) => (
        <DashboardCard
          key={tool.path}
          title={tool.title}
          description={tool.description}
          icon={tool.icon}
          path={tool.path}
          color={tool.color}
          isPinned={pinnedTools.includes(tool.path)}
          onTogglePin={handleTogglePin}
        />
      ))}
    </div>
  );
};

DashboardGrid.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.element,
      path: PropTypes.string.isRequired,
      color: PropTypes.string,
      category: PropTypes.string
    })
  ).isRequired,
  category: PropTypes.string
};

export default DashboardGrid;
