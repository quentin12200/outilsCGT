import React, { useState } from 'react';

const DemarcheRevendicativeModule = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      id: 'besoins',
      title: '1ère Étape : BESOINS',
      description: 'Avec nos syndiqués, construire l\'émergence des besoins, pour élaborer le cahier revendicatif et amorcer la bataille des idées',
      icon: '📋',
      color: 'blue',
      actions: [
        'Organiser une AG des syndiqués auteurs-acteurs-décideurs',
        'Présenter les enjeux, le contexte, la démarche et les outils',
        'Déployer les syndiqués avec des outils au plus près des salariés',
        'Recueillir les besoins par service et par catégorie',
        'Organiser des tournées de services avec les élus'
      ],
      tools: [
        'Questionnaire des besoins',
        'Trame d\'organisation d\'AG',
        'Planning de visites'
      ]
    },
    {
      id: 'revendications',
      title: '2ème Étape : REVENDICATIONS',
      description: 'Faire le bilan des besoins recueillis et élaborer démocratiquement la plateforme revendicative et les listes',
      icon: '📝',
      color: 'green',
      actions: [
        'Organiser une nouvelle AG des syndiqués auteurs-acteurs-décideurs',
        'Présenter le bilan des besoins recueillis',
        'Élaborer et décider démocratiquement de la plateforme revendicative',
        'Valider les listes de candidatures',
        'Préparer l\'argumentaire et la communication',
        'Planifier les actions à venir'
      ],
      tools: [
        'Trame de cahier revendicatif',
        'Modèle de profession de foi',
        'Support de communication'
      ]
    },
    {
      id: 'mobilisation',
      title: '3ème Étape : MOBILISATION',
      description: 'Convaincre par la bataille d\'idées le plus grand nombre de salariés à se mobiliser au vote CGT',
      icon: '✊',
      color: 'red',
      actions: [
        'Organiser une AG des salariés',
        'Présenter la plateforme revendicative issue des besoins recueillis',
        'Mobiliser autour des revendications concrètes',
        'Pointage des syndiqués avec désignation nominative des salariés à convaincre',
        'Rappel des salariés ayant été soutenus par la CGT ou ayant signé des pétitions'
      ],
      tools: [
        'Tableau de pointage des votes',
        'Tracts personnalisés',
        'Plan de déploiement jour J',
        'Argumentaire "Pourquoi voter CGT"'
      ]
    }
  ];
  
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-red-600 mb-6">Démarche revendicative en 3 temps</h2>
      
      <div className="flex justify-between mb-8 border-b">
        {steps.map((step, index) => (
          <button
            key={step.id}
            className={`pb-2 px-4 relative ${activeStep === index ? 'font-bold border-b-2 border-red-600' : ''}`}
            onClick={() => setActiveStep(index)}
          >
            <span className="inline-block w-8 h-8 rounded-full mr-2 text-white text-center leading-8 bg-red-600">
              {index + 1}
            </span>
            {step.title.split(':')[1]}
            {activeStep === index && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></span>
            )}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <span className="inline-block w-10 h-10 rounded-full mr-3 text-white text-center leading-10 text-xl bg-red-600">
                {steps[activeStep].icon}
              </span>
              {steps[activeStep].title}
            </h3>
            <p className="mt-2 text-gray-700">{steps[activeStep].description}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded mb-4">
            <h4 className="font-bold mb-2">Actions à mener :</h4>
            <ul className="list-disc pl-5">
              {steps[activeStep].actions.map((action, idx) => (
                <li key={idx} className="mb-2">{action}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-bold mb-2">Outils disponibles :</h4>
            <ul className="list-disc pl-5">
              {steps[activeStep].tools.map((tool, idx) => (
                <li key={idx} className="mb-2">{tool}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded border-l-4 border-red-600">
          <h4 className="font-bold mb-2">Points clés :</h4>
          
          {activeStep === 0 && (
            <>
              <p className="mb-4">Cette première étape est fondamentale pour partir des besoins réels des salariés. Les syndiqués doivent être les vecteurs de la démarche et aller au contact des collègues.</p>
              <div className="p-3 bg-yellow-50 rounded">
                <p className="font-semibold text-yellow-800">ATTENTION !!!</p>
                <p className="text-sm text-yellow-800">Une AG des syndiqués se construit avec :</p>
                <ul className="list-disc pl-5 text-sm text-yellow-800">
                  <li>Courrier à CHAQUE SYNDIQUÉ précisant l'objet et les enjeux</li>
                  <li>Appel téléphonique de confirmation</li>
                  <li>Aspect convivial (prévoir un moment fraternel)</li>
                </ul>
              </div>
            </>
          )}
          
          {activeStep === 1 && (
            <>
              <p className="mb-4">La plateforme revendicative doit être le reflet exact des besoins exprimés par les salariés. C'est la condition pour créer l'adhésion et la mobilisation.</p>
              <p>Le cahier revendicatif est l'outil central de la bataille des idées. Il doit être clair, concret et montrer l'utilité du vote CGT pour répondre aux préoccupations quotidiennes.</p>
            </>
          )}
          
          {activeStep === 2 && (
            <>
              <p className="mb-4">La mobilisation est l'aboutissement logique des deux premières étapes. Les salariés doivent se reconnaître dans nos revendications car elles sont issues de leurs besoins.</p>
              <p>Le pointage nominatif est décisif : chaque syndiqué doit avoir une liste précise de collègues à convaincre dans son entourage immédiat.</p>
            </>
          )}
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <button 
          className={`bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 ${activeStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
        >
          Étape précédente
        </button>
        <button 
          className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${activeStep === steps.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={activeStep === steps.length - 1}
        >
          Étape suivante
        </button>
      </div>
    </div>
  );
};

export default DemarcheRevendicativeModule;