import React from 'react';

function Navigation() {
  return (
    <nav className="bg-red-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="font-bold text-xl mb-4 md:mb-0">Outils CGT</div>
          
          <ul className="flex flex-wrap justify-center gap-4">
            <li><a href="/" className="hover:bg-red-600 px-3 py-2 rounded transition">Accueil</a></li>
            <li><a href="/cartographie" className="hover:bg-red-600 px-3 py-2 rounded transition">Cartographie</a></li>
            <li><a href="/retro-planning" className="hover:bg-red-600 px-3 py-2 rounded transition">Rétro-planning</a></li>
            <li><a href="/ecole-de-la-democratie" className="hover:bg-red-600 px-3 py-2 rounded transition">École de la Démocratie</a></li>
            <li><a href="/assemblees" className="hover:bg-red-600 px-3 py-2 rounded transition">Assemblées</a></li>
            <li><a href="/syndicalisation" className="hover:bg-red-600 px-3 py-2 rounded transition">Syndicalisation</a></li>
            <li><a href="/resultats" className="hover:bg-red-600 px-3 py-2 rounded transition">Résultats</a></li>
            <li><a href="/demarche" className="hover:bg-red-600 px-3 py-2 rounded transition">Démarche</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;