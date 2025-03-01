import React from 'react';

function HomePage() {
  // Définition des modules disponibles
  const modules = [
    {
      id: 'cartographie',
      title: 'Cartographie Stratégique',
      description: 'Visualisez le taux de syndicalisation par service et identifiez les zones prioritaires.',
      icon: '🗺️',
      color: 'bg-blue-100 border-blue-500'
    },
    {
      id: 'ecole-de-la-democratie',
      title: 'École de la Démocratie',
      description: 'Guide pour une démarche syndicale démocratique en trois phases.',
      icon: '🎓',
      color: 'bg-yellow-100 border-yellow-500'
    },
    {
      id: 'retro-planning',
      title: 'Rétro-planning',
      description: 'Planifiez vos actions syndicales avec un calendrier interactif.',
      icon: '📅',
      color: 'bg-green-100 border-green-500'
    },
    {
      id: 'assemblees',
      title: 'Assemblées',
      description: 'Outils pour préparer et animer efficacement vos assemblées générales.',
      icon: '👥',
      color: 'bg-purple-100 border-purple-500'
    },
    {
      id: 'syndicalisation',
      title: 'Syndicalisation',
      description: 'Suivez et développez la syndicalisation dans votre établissement.',
      icon: '📊',
      color: 'bg-red-100 border-red-500'
    },
    {
      id: 'resultats',
      title: 'Résultats',
      description: 'Analysez les résultats des actions menées et tirez des enseignements.',
      icon: '📈',
      color: 'bg-indigo-100 border-indigo-500'
    },
    {
      id: 'demarche',
      title: 'Démarche Revendicative',
      description: 'Construisez des cahiers revendicatifs répondant aux besoins des salariés.',
      icon: '📝',
      color: 'bg-orange-100 border-orange-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-2">Bienvenue sur les Outils CGT</h1>
        <p className="text-lg text-gray-600">
          Application de suivi et d'organisation de la syndicalisation CGT
        </p>
      </header>

      <section className="mb-12">
        <div className="bg-red-50 border-l-4 border-red-700 p-4 rounded-r mb-6">
          <p className="italic">
            "La démarche, c'est mener la bataille revendicative, c'est la construction de la mobilisation pour gagner!"
          </p>
        </div>
        
        <p className="mb-6">
          Cette application vous propose différents outils pour renforcer votre action syndicale.
          Chaque module a été conçu pour faciliter et structurer les différentes étapes de la démarche CGT.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-red-700 mb-6">Nos modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map(module => (
            <a 
              key={module.id} 
              href={`/${module.id}`} 
              className={`${module.color} border-l-4 rounded-lg shadow-md hover:shadow-lg transition p-6 flex flex-col h-full`}
            >
              <div className="text-4xl mb-3">{module.icon}</div>
              <h3 className="text-xl font-bold mb-2">{module.title}</h3>
              <p className="text-gray-700 flex-grow">{module.description}</p>
              <div className="mt-4">
                <span className="inline-block bg-red-700 text-white rounded-full px-3 py-1 text-sm font-semibold">
                  Accéder →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;