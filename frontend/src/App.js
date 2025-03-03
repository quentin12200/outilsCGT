// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Common/Navigation';
import FooterFooter from './components/Layout/FooterFooter';
import HomePage from './components/pages/HomePage';
import CartoPage from './components/pages/CartoPage';
import AssembleePage from './components/pages/AssembleePage';
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
        <Route path="/assemblees" element={<AssembleePage />} />
        <Route path="/retro-planning" element={<RetroplanningPage />} />
        <Route path="/ecole-de-la-democratie" element={<EcoleDemocratiePage />} />
        <Route path="/resultats" element={<ResultatsPage />} />
        <Route path="/syndicalisation" element={<SyndicalisationPage />} />
        <Route path="/demarche" element={<div>Module en cours de développement</div>} />
      </Routes>
      <FooterFooter />
    </div>
  );
}

export default App;
