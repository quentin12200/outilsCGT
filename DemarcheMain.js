// src/components/DemarcheModule/DemarcheMain.js
import React, { useState } from 'react';
import ProcessusGlobal from './frontend/src/components/DemarcheModule/ProcessusGlobal';
import PhaseBesoins from './frontend/src/components/DemarcheModule/PhaseBesoins';
import PhaseRevendications from './frontend/src/components/DemarcheModule/PhaseRevendications';
import PhaseMobilisation from './PhaseMobilisation';
import PhaseActionLutte from './PhaseActionLutte';
import BoiteOutils from './BoiteOutils';

function DemarcheMain() {
  const [activePhase, setActivePhase] = useState('processus');
  const [selectedTools, setSelectedTools] = useState([]);

  // Phases de la démarche revendicative
  const phases = [
    { id: 'processus', name: 'Vue d\'ensemble', icon: '📋' },
    { id: 'besoins', name: 'Recueil des besoins', icon: '👂' },
    { id: 'revendications', name: 'Construction revendicative', icon: '📝' },
    { id: 'mobilisation', name: 'Mobilisation', icon: '🔊' },
    { id: 'action', name: 'Action / Lutte', icon: '✊' },
    { id: 'outils', name: 'Boîte à outils', icon: '🧰' }
  ];

  const handleAddTool = (tool) => {
    if (!selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleRemoveTool = (tool) => {
    setSelectedTools(selectedTools.filter(t => t !== tool));
  };

  return (
    <div>
      {/* Navigation entre phases */}
      <div className="flex flex-wrap gap-2 mb-8">
        {phases.map(phase => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(phase.id)}
            className={`flex items-center px-4 py-2 rounded-full transition ${
              activePhase === phase.id 
                ? 'bg-red-700 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{phase.icon}</span>
            {phase.name}
          </button>
        ))}
      </div>

      {/* Contenu de la phase active */}
      <div>
        {activePhase === 'processus' && <ProcessusGlobal onSelectPhase={setActivePhase} />}
        {activePhase === 'besoins' && <PhaseBesoins onAddTool={handleAddTool} />}
        {activePhase === 'revendications' && <PhaseRevendications onAddTool={handleAddTool} />}
        {activePhase === 'mobilisation' && <PhaseMobilisation onAddTool={handleAddTool} />}
        {activePhase === 'action' && <PhaseActionLutte onAddTool={handleAddTool} />}
        {activePhase === 'outils' && (
          <BoiteOutils 
            selectedTools={selectedTools} 
            onRemoveTool={handleRemoveTool} 
          />
        )}
      </div>

      {/* Barre d'outils sélectionnés */}
      {selectedTools.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-4 font-medium">Outils sélectionnés ({selectedTools.length})</span>
                <div className="flex space-x-2">
                  {selectedTools.map(tool => (
                    <span 
                      key={tool} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {tool}
                      <button 
                        onClick={() => handleRemoveTool(tool)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setActivePhase('outils')}
                className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
              >
                Voir ma boîte à outils
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DemarcheMain;