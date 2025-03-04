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
import DemarchePage from './components/pages/DemarchePage';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Routes>
          {/* Ces routes doivent correspondre exactement aux chemins dans Navigation.jsx */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cartographie" element={<CartoPage />} />
          <Route path="/retro-planning" element={<RetroplanningPage />} />
          <Route path="/ecole-de-la-democratie" element={<EcoleDemocratiePage />} />
          <Route path="/assemblees" element={<AssembleePage />} />
          <Route path="/syndicalisation" element={<SyndicalisationPage />} />
          <Route path="/resultats" element={<ResultatsPage />} />
          <Route path="/demarche" element={<DemarchePage />} />
          
          {/* Route 404 pour gérer les URL non définies */}
          <Route path="*" element={
            <div style={{padding: "2rem", textAlign: "center"}}>
              <h1>Page non trouvée</h1>
              <p>La page que vous recherchez n'existe pas.</p>
            </div>
          } />
        </Routes>
      </main>
      <FooterFooter />
    </div>
  );
}

export default App;