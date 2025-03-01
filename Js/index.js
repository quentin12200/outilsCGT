import React from 'react';

const HomePage = () => {
  const modules = [
    {
      id: 'demarche',
      title: 'Démarche Revendicative',
      description: 'Mener la bataille revendicative en 3 temps: Besoins, Revendications, Mobilisation',
      icon: '📋',
      color: 'bg-red-600',
      link: '/demarche'
    },
    {
      id: 'cartographie',
      title: 'Cartographie Stratégique',
      description: 'Analyser et visualiser la répartition des syndiqués par service pour cibler les actions',
      icon: '🗺️',
      color: 'bg-blue-600',
      link: '/cartographie'
    },
    {
      id: 'retroplanning',
      title: 'Rétro-planning Electoral',
      description: 'Planifier les étapes de la campagne électorale de manière structurée',
      icon: '📅',
      color: 'bg-green-600',
      link: '/retroplanning'
    },
    {
      id: 'assemblee',
      title: 'Assemblées Générales',
      description: 'Organiser des AG efficaces pour faire vivre la démocratie syndicale',
      icon: '👥',
      color: 'bg-yellow-600',
      link: '/assemblee'
    },
    {
      id: 'syndicalisation',
      title: 'Plan de Syndicalisation',
      description: 'Développer la syndicalisation en ciblant prioritairement les votants CGT',
      icon: '📈',
      color: 'bg-purple-600',
      link: '/syndicalisation'
    },
    {
      id: 'resultats',
      title: 'Analyse des Élections',
      description: 'Suivre et analyser les résultats électoraux comme indicateur du rapport de force',
      icon: '📊',
      color: 'bg-indigo-600',
      link: '/resultats'
    }
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Outils CGT - Campagne Confédérale de Conquête Électorale
        </h1>
        <p className="text-lg max-w-3xl mx-auto">
          L'informatique au service du militantisme CGT pour renforcer la démarche démocratique,
          construire le rapport de force et gagner !
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 border-b border-red-600 pb-2">
          Une démarche globale : Élections, Syndicalisation, Mobilisation
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow p-4 border-t-4 border-red-600">
            <div className="text-3xl mb-2 text-center">🗳️</div>
            <h3 className="font-bold text-center mb-2">Élections</h3>
            <p className="text-sm text-gray-600">
              Les élections professionnelles sont un moment crucial pour mesurer la représentativité 
              et renforcer le rapport de force. La campagne électorale doit s'appuyer sur les besoins 
              réels des salariés.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 border-t-4 border-blue-600">
            <div className="text-3xl mb-2 text-center">📝</div>
            <h3 className="font-bold text-center mb-2">Syndicalisation</h3>
            <p className="text-sm text-gray-600">
              Renforcer la CGT en augmentant le nombre de syndiqués est essentiel. Chaque syndiqué 
              doit devenir acteur du développement en convainquant ses collègues dans sa proximité 
              immédiate.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 border-t-4 border-green-600">
            <div className="text-3xl mb-2 text-center">✊</div>
            <h3 className="font-bold text-center mb-2">Mobilisation</h3>
            <p className="text-sm text-gray-600">
              La mobilisation des salariés repose sur la construction d'un cahier revendicatif 
              répondant à leurs besoins et sur la bataille d'idées pour convaincre le plus grand 
              nombre à s'engager dans l'action.
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 border-b border-red-600 pb-2">
          Outils à votre disposition
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map(module => (
            <a
              key={module.id}
              href={module.link}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              <div className={`w-12 h-12 ${module.color} text-white rounded-full flex items-center justify-center text-xl mb-4`}>
                {module.icon}
              </div>
              <h3 className="font-bold mb-2">{module.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">{module.description}</p>
              <div className="mt-4 text-right">
                <span className="text-red-600 font-medium text-sm">Accéder →</span>
              </div>
            </a>
          ))}
        </div>
      </section>
      
      <section className="bg-red-50 rounded-lg p-6 mb-12 border-l-4 border-red-600">
        <h2 className="text-xl font-bold mb-4">Campagne Confédérale de Conquête Électorale 2021-2024</h2>
        <p className="mb-4">
          La Campagne Confédérale de Conquête Électorale s'inscrit dans la continuité du dispositif 
          engagé et validé démocratiquement lors du 52ème congrès de la CGT.
        </p>
        
        <blockquote className="border-l-4 border-red-600 pl-4 italic mb-4">
          "C'est un outil à démocratiser pour être opérationnel dans les territoires et professions 
          et mis en œuvre par les syndicats."
          <div className="font-bold text-sm mt-1">52ème congrès CGT</div>
        </blockquote>
        
        <p>
          Notre objectif commun est la reconquête de la 1ère place au niveau confédéral, en renforçant 
          nos syndicats pour qu'ils soient en capacité d'agir sur l'ensemble des appareils pour GAGNER 
          sur tous les enjeux.
        </p>
      </section>
      
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Pour aller plus loin</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Méthode en deux axes</h3>
            <div className="text-sm">
              <p className="mb-2"><span className="font-bold">1. Là où nous sommes présents :</span> Construction et mise en œuvre de campagnes s'appuyant sur la réappropriation de la démarche revendicative CGT</p>
              <p><span className="font-bold">2. Là où nous sommes absents :</span> Approche organisée de la CGT à tous ses niveaux et pratique du parrainage</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-2">Ressources complémentaires</h3>
            <ul className="list-disc pl-5 text-sm">
              <li>Guide du militant électoral</li>
              <li>Formation "Renforcer la CGT : des principes et des actes"</li>
              <li>Les outils juridiques des élections professionnelles</li>
              <li>Méthode de construction du cahier revendicatif</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="mt-12 bg-gray-100 p-6 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Un outil au service de la démocratie syndicale</h2>
        <p className="mb-4">
          Ces outils sont conçus pour soutenir la démarche CGT et renforcer la démocratie syndicale
          en impliquant l'ensemble des syndiqués dans la bataille électorale et revendicative.
        </p>
        <a href="/contact" className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Nous contacter
        </a>
      </section>
    </div>
  );
};
ReactDOM.render(
    <HomePage />,
    document.getElementById('app')
  );
export default HomePage;