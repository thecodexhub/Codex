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
import FAQ from './components/FAQ/FAQ';
import InterviewExperience from './components/placement/InterviewExperience';
import ProfilePage from './components/profile/ProfilePage';

import CompanyExperiences from './components/placement/Experiencelist';
import Contests from './components/contests/Contests';
import ContestDetails from './components/contests/ContestDetails';
// Wrap the Layout itself
const ProtectedLayout = AuthWrapper(Layout);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
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
          <Route path="faq" element={<FAQ />} />
          <Route path="contests" element={<Contests />} />
          <Route path="contests/details" element={<ContestDetails />} />
          <Route path="/company/:id" element={<CompanyExperiences />} />
          <Route path="/company/:id/interview-experience" element={<InterviewExperience />} />
          {/* <Route path="/" element={<></>}></Route> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;