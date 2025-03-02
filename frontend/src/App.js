import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Common/Navigation';
import FooterFooter from './components/Layout/FooterFooter';
import HomePage from './components/pages/HomePage';
import CartoPage from './components/pages/CartoPage';
// Autres importations de pages

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cartographie" element={<CartoPage />} />
          {/* Autres routes */}
        </Routes>
      </main>
      <FooterFooter />
    </div>
  );
}

export default App;