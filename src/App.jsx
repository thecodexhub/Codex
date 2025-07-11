import React, { useState } from 'react';
import Layout from './layouts/Layout';
import Dashboard from './components/dashboard/Dashboard';
import DSA from './components/dsa/DSA';
import SpecializationPath from './components/specialization/SpecializationPath';
import PlacementPrep from './components/placement/PlacementPrep';
import Leaderboard from './components/leaderboard/Leaderboard';
import Feedback from './components/feedback/Feedback';
import Pricing from './components/pricing/Pricing';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'dsa':
        return <DSA />;
      case 'specialization':
        return <SpecializationPath />;
      case 'placement':
        return <PlacementPrep />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'feedback':
        return <Feedback />;
      case 'pricing':
        return <Pricing />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
    </div>

  );
}

export default App;