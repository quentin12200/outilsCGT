import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Common/Navigation';
import FooterFooter from './components/Layout/FooterFooter';
import HomePage from './components/pages/HomePage';
import CartoPage from './components/pages/CartoPage';
// Importez vos autres pages ici

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cartographie" element={<CartoPage />} />
        {/* Ajoutez vos autres routes ici */}
      </Routes>
      <FooterFooter />
    </div>
  );
}

export default App;