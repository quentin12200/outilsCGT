// Assurez-vous d'avoir les importations nécessaires
const { useState } = React;

const RetroplanningModule = () => {
  const [electionDate, setElectionDate] = useState('');
  const [steps, setSteps] = useState([]);
  
  // Liste des étapes avec leur offset en mois par rapport à la date d'élection
  const defaultSteps = [
    {
      offset: -12,
      title: 'Préparation',
      description: 'Organisation initiale et définition des fondamentaux.'
    },
    {
      offset: -9,
      title: 'Planification Ciblée',
      description: 'Définition du plan de travail "cousu main".'
    },
    {
      offset: -6,
      title: 'Formation-action',
      description: 'Formation du syndicat, rétro-planning en 3 temps.'
    },
    {
      offset: -4,
      title: 'Déploiement Terrain',
      description: 'Mise en œuvre des visites, communication offensive.'
    },
    {
      offset: -3,
      title: '1ère Étape : Besoins',
      description: 'AG Syndiqués - Déploiement des syndiqués au plus près des salariés pour recueillir les besoins.'
    },
    {
      offset: -2,
      title: '2ème Étape : Revendications',
      description: 'AG Syndiqués - Bilan besoins, élaboration et décisions démocratiques de la plateforme revendicative et des listes.'
    },
    {
      offset: -1,
      title: '3ème Étape : Mobilisation',
      description: 'AG Salariés - Pointage des syndiqués avec désignation nominative des salariés à convaincre dans leur proximité.'
    }
  ];
  
  const calculateDates = () => {
    if (!electionDate) return;
    
    const election = new Date(electionDate);
    const calculatedSteps = defaultSteps.map(step => {
      const stepDate = new Date(election);
      stepDate.setMonth(election.getMonth() + step.offset);
      return {
        ...step,
        date: stepDate.toLocaleDateString('fr-FR')
      };
    });
    
    setSteps(calculatedSteps);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-red-600 mb-4">Module de Rétro-planning Électoral</h2>
      <p className="mb-4">Entrez la date prévue des élections professionnelles pour obtenir un calendrier personnalisé</p>
      
      <div className="flex gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="electionDate" className="mb-2 font-medium">Date de l'élection :</label>
          <input 
            type="date" 
            id="electionDate" 
            className="border p-2 rounded" 
            value={electionDate}
            onChange={(e) => setElectionDate(e.target.value)}
          />
        </div>
        <button 
          onClick={calculateDates}
          className="bg-red-600 text-white px-4 py-2 rounded mt-6 hover:bg-red-700"
        >
          Calculer le rétro-planning
        </button>
      </div>
      
      {steps.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Plan de travail en {steps.length} étapes</h3>
          
          <div className="relative">
            <div className="absolute h-1 bg-red-600 top-6 left-6 right-6 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded shadow">
                  <div className="w-12 h-12 bg-red-600 rounded-full text-white flex items-center justify-center mb-4 mx-auto">
                    {index + 1}
                  </div>
                  <p className="text-gray-500 text-center mb-2">{step.date}</p>
                  <h4 className="text-red-600 font-semibold text-center mb-2">{step.title}</h4>
                  <p className="text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded mt-6 border-l-4 border-red-600">
            <h4 className="font-semibold mb-2">Retroplanning de la démarche : une école de la démocratie</h4>
            <p>Ce plan de travail s'inscrit dans une démarche globale liant élections, syndicalisation, et mobilisation. Chaque étape renforce votre capacité à déployer efficacement l'action syndicale.</p>
          </div>
        </div>
      )}
    </div>
  );
};}
    </div>
  );
};

ReactDOM.render(
  <PageComponent />,
  document.getElementById('app-container')
);