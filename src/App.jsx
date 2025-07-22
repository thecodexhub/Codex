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
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import AuthWrapper from './components/auth/AuthWrapper';

// Wrap the Layout itself
const ProtectedLayout = AuthWrapper(Layout);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Protected layout and nested routes */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dsa" element={<DSA />} />
          <Route path="specialization" element={<SpecializationPath />} />
          <Route path="placement" element={<PlacementPrep />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;