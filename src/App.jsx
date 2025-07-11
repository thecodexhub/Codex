// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';

import Dashboard from './components/dashboard/Dashboard';
import DSA from './components/dsa/DSA';
import SpecializationPath from './components/specialization/SpecializationPath';
import PlacementPrep from './components/placement/PlacementPrep';
import Leaderboard from './components/leaderboard/Leaderboard';
import Feedback from './components/feedback/Feedback';
import Pricing from './components/pricing/Pricing';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dsa" element={<DSA />} />
          <Route path="/specialization" element={<SpecializationPath />} />
          <Route path="/placement" element={<PlacementPrep />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
