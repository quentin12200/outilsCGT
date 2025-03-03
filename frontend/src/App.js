// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Common/Navigation';
import FooterFooter from './components/Layout/FooterFooter';
import HomePage from './components/pages/HomePage';
import CartoPage from './components/pages/CartoPage';
import RetroplanningPage from './components/pages/RetroplanningPage';
import EcoleDemocratiePage from './components/pages/EcoleDemocratiePage';
import ResultatsPage from './components/pages/ResultatsPage';
import SyndicalisationPage from './components/pages/SyndicalisationPage';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cartographie" element={<CartoPage />} />
        <Route path="/retro-planning" element={<RetroplanningPage />} />
        <Route path="/ecole-de-la-democratie" element={<EcoleDemocratiePage />} />
        <Route path="/resultats" element={<ResultatsPage />} />
        <Route path="/syndicalisation" element={<SyndicalisationPage />} />
        {/* Routes temporaires avec composants simples pour les autres pages */}
        <Route path="/assemblees" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold text-red-700 mb-2">Page Assemblées</h1><p>Cette fonctionnalité est en cours de développement.</p></div>} />
        <Route path="/demarche" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold text-red-700 mb-2">Page Démarche</h1><p>Cette fonctionnalité est en cours de développement.</p></div>} />
      </Routes>
      <FooterFooter />
    </div>
  );
}

export default App;