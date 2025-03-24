import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Common/Navigation';
import FooterFooter from './components/Layout/FooterFooter';
import VueEnsemblePage from './components/pages/VueEnsemblePage';
// Pages existantes
import HomePage from './components/pages/HomePage';
import AssembleePage from './components/pages/AssembleePage';
import RetroplanningPage from './components/pages/RetroplanningPage';
import ResultatsPage from './components/pages/ResultatsPage';
import DemarcheSyndicalePage from './components/pages/DemarcheSyndicalePage';
import CampagneElectionsPage from './components/pages/CampagneElectionsPage';
// Nouveaux modules de campagne
import PlanActionsPage from './components/pages/PlanActionsPage';
import PlanPendantPage from './components/pages/PlanPendantPage';
import PlanAvantPage from './components/pages/PlanAvantPage';
import PlanApresPage from './components/pages/PlanApresPage';
import PlanImplanterPage from './components/pages/PlanImplanterPage';
import PlanOutilsPage from './components/pages/PlanOutilsPage';
// Nouveau composant fusionné
import CartoSyndicalisationPage from './components/pages/CartoSyndicalisationPage';
// Page des élections CSE
import ElectionsCSEPage from './components/pages/ElectionsCSEPage';

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
          {/* Redirection des anciennes routes vers la nouvelle page fusionnée */}
          <Route path="/cartographie" element={<Navigate to="/carto-syndicalisation" replace />} />
          <Route path="/syndicalisation" element={<Navigate to="/carto-syndicalisation" replace />} />
          <Route path="/retro-planning" element={<RetroplanningPage />} />
          <Route path="/ecole-de-la-democratie" element={<Navigate to="/demarche?tab=ecole-democratie" replace />} />
          <Route path="/assemblees" element={<AssembleePage />} />
          <Route path="/resultats" element={<ResultatsPage />} />
          <Route path="/demarche" element={<DemarcheSyndicalePage />} />
          <Route path="/vue-ensemble" element={<VueEnsemblePage />} />
          {/* Nouveau composant fusionné */}
          <Route path="/carto-syndicalisation" element={<CartoSyndicalisationPage />} />
          {/* Nouveaux modules de campagne */}
          <Route path="/plan-actions" element={<PlanActionsPage />} />
          <Route path="/plan-pendant" element={<PlanPendantPage />} />
          <Route path="/plan-avant" element={<PlanAvantPage />} />
          <Route path="/plan-apres" element={<PlanApresPage />} />
          <Route path="/plan-implanter" element={<PlanImplanterPage />} />
          <Route path="/plan-outils" element={<PlanOutilsPage />} />
          <Route path="/campagne-elections" element={<CampagneElectionsPage />} />
          {/* Élections CSE */}
          <Route path="/elections-cse" element={<ElectionsCSEPage />} />
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
