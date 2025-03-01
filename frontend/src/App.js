import React from 'react';
import Navigation from './components/Common/Navigation';
import FooterFooter from './components/Layout/FooterFooter';
import HomePage from './components/pages/HomePage';

function App() {
  return (
    <div>
      <Navigation />
      <HomePage />
      <FooterFooter />
    </div>
  );
}

export default App;