import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import FullPageLayout from './layouts/FullPageLayout';
import Dashboard from './components/dashboard/Dashboard';
import DSA from './components/dsa/DSA';
import PlacementPrep from './components/placement/PlacementPrep';
import Leaderboard from './components/leaderboard/Leaderboard';
import Feedback from './components/feedback/Feedback';
import Pricing from './components/pricing/Pricing';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import AuthWrapper from './components/auth/AuthWrapper';
import FAQ from './components/FAQ/FAQ';
import InterviewExperience from './components/placement/InterviewExperience';
import CompanyExperiences from './components/placement/Experiencelist';
import Contests from './components/contests/Contests';
import ContestDetails from './components/contests/ContestDetails';
import UserOnboarding from "./components/auth/onboarding/UserOnboarding";
import UserProfile from './components/profile/UserProfile';
import Courses from './components/Courses/Courses';
import CProgramming from './components/Courses/CProgramming';
import Documentation from './components/Courses/Documentation';
import WebDevelopment from './components/specialization/webDevelopment';
import Specialization from './components/specialization/Specialization';
import DocumentationSpecialization from './components/specialization/DocumentationSpecialization';
import TermsAndConditions from './components/FAQ/TermsAndConditions';
import MakePayment from './components/pricing/MakePayment';
import InterviewForm from './components/InterviewForm/interviewForm';
import ProblemDisplay from './components/contests/ProblemDisplay';

// Wrap the Layout with authentication
const ProtectedLayout = AuthWrapper(Layout);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/documentation/:topicId/:chapterId?" element={<Documentation />} />
        <Route path="/documentation-specialization/:topicId/:chapterId?" element={<DocumentationSpecialization />} />
        <Route path="/experience-form" element={<InterviewForm />} />

        {/* Protected Layout */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/c-programming" element={<CProgramming />} />
          <Route path="dsa" element={<DSA />} />
          <Route path="/specialization" element={<Specialization />} /> {/* new route */}
          <Route path="/specialization/web-development" element={<WebDevelopment />} />
          <Route path="placement" element={<PlacementPrep />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contests" element={<Contests />} />
          <Route path="contests/details" element={<ContestDetails />} />
          <Route path="company/:id" element={<CompanyExperiences />} />
          <Route path="company/:id/interview-experience" element={<InterviewExperience />} />
          <Route path="faq/terms" element={<TermsAndConditions />} />
          <Route path="make-payment" element={<MakePayment />} />

        </Route>

        {/* Full Page Layout Routes */}
        <Route element={<FullPageLayout />}>
          <Route path="useronboarding" element={<UserOnboarding />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path='contests/contest-problems' element={ <ProblemDisplay/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
