// src/components/RetroplanningModule/RetroplanningMain.js
import React, { useState, useEffect } from 'react';
import Timeline from './Timeline';
import PhasePlanning from './PhasePlanning';

function RetroplanningMain() {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [dateEvenement, setDateEvenement] = useState('');
  const [joursRestants, setJoursRestants] = useState(null);
  const [phaseActuelle, setPhaseActuelle] = useState(null);
  
  // Définition des phases du rétro-planning selon le document
  const phases = [
    { 
      id: 'analyse', 
      title: 'Analyse et Organisation', 
      description: 'État des lieux, ciblage, anticipation', 
      color: 'bg-blue-600',
      joursAvant: 120,
      joursApres: 90
    },
    { 
      id: 'besoins', 
      title: '1ère Étape: Besoins', 
      description: 'Recueil des besoins auprès des salariés', 
      color: 'bg-yellow-600',
      joursAvant: 90,
      joursApres: 60
    },
    { 
      id: 'revendications', 
      title: '2ème Étape: Revendications', 
      description: 'Élaboration du cahier revendicatif', 
      color: 'bg-green-600',
      joursAvant: 60,
      joursApres: 40
    },
    { 
      id: 'mobilisation', 
      title: '3ème Étape: Mobilisation', 
      description: 'Organisation de la mobilisation', 
      color: 'bg-red-600',
      joursAvant: 40,
      joursApres: 10
    },
    { 
      id: 'jourj', 
      title: 'Jour J', 
      description: 'Jour du scrutin, remise des timbres ou journée de lutte', 
      color: 'bg-purple-700',
      joursAvant: 0,
      joursApres: 0
    },
    { 
      id: 'bilan', 
      title: 'Bilan et Perspectives', 
      description: 'Analyse des résultats et préparation des prochaines étapes', 
      color: 'bg-indigo-600',
      joursAvant: -1,
      joursApres: -30
    }
  ];

  // Fonction pour calculer les jours restants et déterminer la phase actuelle
  useEffect(() => {
    if (dateEvenement) {
      const dateJ = new Date(dateEvenement);
      const aujourdhui = new Date();
      
      // Calculer la différence en jours
      const diffTime = dateJ - aujourdhui;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setJoursRestants(diffDays);
      
      // Déterminer la phase actuelle en fonction des jours restants
      if (diffDays > 90) {
        setPhaseActuelle('analyse');
      } else if (diffDays > 60) {
        setPhaseActuelle('besoins');
      } else if (diffDays > 40) {
        setPhaseActuelle('revendications');
      } else if (diffDays > 0) {
        setPhaseActuelle('mobilisation');
      } else if (diffDays === 0) {
        setPhaseActuelle('jourj');
      } else {
        setPhaseActuelle('bilan');
      }
      
      // Sélectionner automatiquement la phase actuelle si aucune phase n'est sélectionnée
      if (!selectedPhase) {
        setSelectedPhase(phaseActuelle);
      }
    }
  }, [dateEvenement, selectedPhase]);

  // Générer les dates pour chaque phase en fonction de la date de l'événement
  const genererDatesPhases = () => {
    if (!dateEvenement) return {};
    
    const dateJ = new Date(dateEvenement);
    const datesPhases = {};
    
    phases.forEach(phase => {
      if (phase.id === 'jourj') {
        datesPhases[phase.id] = dateJ.toLocaleDateString('fr-FR');
      } else if (phase.id === 'bilan') {
        const dateDebut = new Date(dateJ);
        dateDebut.setDate(dateJ.getDate() + 1);
        const dateFin = new Date(dateJ);
        dateFin.setDate(dateJ.getDate() + 30);
        datesPhases[phase.id] = `${dateDebut.toLocaleDateString('fr-FR')} - ${dateFin.toLocaleDateString('fr-FR')}`;
      } else {
        const dateDebut = new Date(dateJ);
        dateDebut.setDate(dateJ.getDate() - phase.joursAvant);
        const dateFin = new Date(dateJ);
        dateFin.setDate(dateJ.getDate() - phase.joursApres);
        datesPhases[phase.id] = `${dateDebut.toLocaleDateString('fr-FR')} - ${dateFin.toLocaleDateString('fr-FR')}`;
      }
    });
    
    return datesPhases;
  };

  const datesPhases = genererDatesPhases();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-red-600 mb-4">Rétro-planning de la démarche syndicale</h2>
      
      {/* Formulaire de date */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Définir la date de votre événement</h3>
        <p className="mb-4 text-gray-600">
          Tout le rétro-planning s'organisera à partir de cette date clé (scrutin, action revendicative, etc.).
        </p>
        
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
          <div className="w-full md:w-auto">
            <label htmlFor="date-evenement" className="block text-sm font-medium text-gray-700 mb-1">
              Date de l'événement (Jour J)
            </label>
            <input
              type="date"
              id="date-evenement"
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={dateEvenement}
              onChange={(e) => setDateEvenement(e.target.value)}
            />
          </div>
          
          {joursRestants !== null && (
            <div className="bg-gray-100 px-4 py-2 rounded-md ml-0 md:ml-4">
              {joursRestants > 0 ? (
                <span className="font-semibold">J-{joursRestants} avant l'événement</span>
              ) : joursRestants === 0 ? (
                <span className="font-semibold text-red-600">C'est aujourd'hui !</span>
              ) : (
                <span className="font-semibold">J+{Math.abs(joursRestants)} après l'événement</span>
              )}
            </div>
          )}
        </div>
        
        {phaseActuelle && (
          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <p className="text-yellow-800">
              <span className="font-semibold">Phase actuelle : </span>
              {phases.find(p => p.id === phaseActuelle)?.title} - Vous êtes dans la bonne période pour cette phase de la démarche.
            </p>
          </div>
        )}
      </div>
      
      {/* Phase actuelle et prochaines étapes */}
      {phaseActuelle && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Calendrier des phases</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Période</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {phases.map(phase => {
                  // Déterminer le statut de la phase
                  let statut = "";
                  let statusClass = "";
                  
                  if (phase.id === phaseActuelle) {
                    statut = "En cours";
                    statusClass = "bg-green-100 text-green-800";
                  } else if ((phases.findIndex(p => p.id === phase.id) < phases.findIndex(p => p.id === phaseActuelle))) {
                    statut = "Terminée";
                    statusClass = "bg-gray-100 text-gray-800";
                  } else {
                    statut = "À venir";
                    statusClass = "bg-yellow-100 text-yellow-800";
                  }
                  
                  return (
                    <tr 
                      key={phase.id}
                      className={phase.id === selectedPhase ? "bg-red-50" : ""}
                      onClick={() => setSelectedPhase(phase.id)}
                      style={{cursor: "pointer"}}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-10 w-10 rounded-full ${phase.color} flex items-center justify-center text-white font-bold`}>
                            {phases.findIndex(p => p.id === phase.id) + 1}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{phase.title}</div>
                            <div className="text-sm text-gray-500">{phase.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{datesPhases[phase.id]}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
                          {statut}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <p className="text-gray-700 mb-4">
          Le rétro-planning vous permet d'organiser votre action syndicale dans le temps, 
          en préparant chaque étape nécessaire à la réussite de votre démarche. 
          Sélectionnez une phase pour afficher les actions correspondantes.
        </p>
        
        <Timeline 
          phases={phases} 
          selectedPhase={selectedPhase} 
          onSelectPhase={setSelectedPhase} 
        />
      </div>
      
      {selectedPhase && (
        <PhasePlanning phase={phases.find(p => p.id === selectedPhase)} />
      )}
      
      {/* Section d'aide et conseils */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-lg font-semibold mb-4">Conseils pour un rétro-planning efficace</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-700 mb-2">Planification et anticipation</h4>
            <ul className="space-y-2 text-blue-800">
              <li>Commencez votre rétro-planning suffisamment tôt (idéalement 4 mois avant le Jour J)</li>
              <li>Identifiez les étapes critiques qui nécessitent plus de temps</li>
              <li>Prévoyez des marges de sécurité pour chaque phase</li>
              <li>Adaptez le calendrier aux spécificités de votre établissement</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-700 mb-2">Mobilisation des équipes</h4>
            <ul className="space-y-2 text-green-800">
              <li>Partagez le rétro-planning avec tous les syndiqués</li>
              <li>Répartissez clairement les responsabilités pour chaque action</li>
              <li>Organisez des points d'étape réguliers pour suivre l'avancement</li>
              <li>Valorisez chaque réussite pour maintenir la dynamique</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded hover:bg-red-100 w-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Télécharger le guide complet du rétro-planning CGT
          </button>
        </div>
      </div>
    </div>
  );
}

export default RetroplanningMain;