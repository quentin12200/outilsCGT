// src/components/RetroplanningModule/Timeline.js
import React from 'react';

function Timeline({ phases, selectedPhase, onSelectPhase }) {
  return (
    <div className="relative py-12">
      {/* Ligne horizontale */}
      <div className="hidden md:block absolute h-1 bg-gray-200 top-1/2 left-0 right-0 transform -translate-y-1/2"></div>
      
      {/* Phases */}
      <div className="flex flex-col md:flex-row justify-between relative">
        {phases.map((phase, index) => (
          <div 
            key={phase.id}
            className={`flex flex-col items-center mb-8 md:mb-0 cursor-pointer ${
              index === phases.length - 1 ? '' : 'md:flex-1'
            }`}
            onClick={() => onSelectPhase(phase.id)}
          >
            {/* Cercle de la phase */}
            <div 
              className={`w-10 h-10 rounded-full z-10 flex items-center justify-center text-white font-bold ${
                selectedPhase === phase.id ? phase.color : 'bg-gray-400'
              }`}
            >
              {index + 1}
            </div>
            
            {/* Titre et description */}
            <div className={`mt-2 text-center ${selectedPhase === phase.id ? 'font-bold' : ''}`}>
              <div className="text-sm">{phase.title}</div>
              <div className="text-xs text-gray-500 mt-1">{phase.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;