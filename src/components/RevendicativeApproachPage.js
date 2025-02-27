import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RevendicativeApproachPage from './components/RevendicativeApproachPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/demarche-revendicative" element={<RevendicativeApproachPage />} />
        {/* Autres routes */}
      </Routes>
    </Router>
  );
}