import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Common/Navigation';
import FooterFooter from './components/Layout/FooterFooter';

// Pages existantes
import HomePage from './components/pages/HomePage';
import CartoPage from './components/pages/CartoPage';
import AssembleePage from './components/pages/AssembleePage';
import RetroplanningPage from './components/pages/RetroplanningPage';
import EcoleDemocratiePage from './components/pages/EcoleDemocratiePage';
import ResultatsPage from './components/pages/ResultatsPage';
import SyndicalisationPage from './components/pages/SyndicalisationPage';
import DemarcheSyndicalePage from './components/pages/DemarcheSyndicalePage';

// Nouveaux modules
import PlanActionsPage from './components/pages/PlanActionsPage';
import PlanPendantPage from './components/pages/PlanPendantPage';
import PlanAvantPage from './components/pages/PlanAvantPage';
import PlanApresPage from './components/pages/PlanApresPage';
import PlanImplanterPage from './components/pages/PlanImplanterPage';
import PlanOutilsPage from './components/pages/PlanOutilsPage';

// Outils spécifiques
import CahierRevendicatifTool from './components/pages/CahierRevendicatifTool';
import QuestionnaireTool from './components/pages/QuestionnaireTool';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Routes>
          {/* Routes principales */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cartographie" element={<CartoPage />} />
          <Route path="/retro-planning" element={<RetroplanningPage />} />
          <Route path="/ecole-de-la-democratie" element={<EcoleDemocratiePage />} />
          <Route path="/assemblees" element={<AssembleePage />} />
          <Route path="/syndicalisation" element={<SyndicalisationPage />} />
          <Route path="/resultats" element={<ResultatsPage />} />
          <Route path="/demarche" element={<DemarcheSyndicalePage />} />

          {/* Nouveaux modules de campagne */}
          <Route path="/plan-actions" element={<PlanActionsPage />} />
          <Route path="/plan-pendant" element={<PlanPendantPage />} />
          <Route path="/plan-avant" element={<PlanAvantPage />} />
          <Route path="/plan-apres" element={<PlanApresPage />} />
          <Route path="/plan-implanter" element={<PlanImplanterPage />} />
          <Route path="/plan-outils" element={<PlanOutilsPage />} />

          {/* Outils spécifiques */}
          <Route path="/cahier-revendicatif" element={<CahierRevendicatifTool />} />
          <Route path="/questionnaire" element={<QuestionnaireTool />} />

          {/* Route 404 */}
          <Route path="*" element={
            <div style={{ padding: "2rem", textAlign: "center" }}>
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
