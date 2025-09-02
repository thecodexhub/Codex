import React from 'react';
import ProgressChart from './ProgressChart';
import LeaderboardPreview from './LeaderBoardPreview';
import { ChevronRight, Layers, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, } = useAuth();
  
  const cardData = [
    {
      title: 'DSA Progress',
      progress: 68,
      current: 'Dynamic Programming',
      onClick: () => navigate('/')
     },
    {
      title: 'Specialization',
      progress: 45,
      current: 'React Advanced Patterns',
      onClick: () => navigate('/'),
     },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Hi {user?.displayName}, Welcome back!</h1>
        <p className="text-purple-100 text-base sm:text-lg">
          Ready to continue your coding journey?
        </p>
        {/* Subscription Status Badge */}
        {/* {user?.subscription && (
          <div className="mt-3 inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-200 px-3 py-1 rounded-full text-sm">
            <Star className="w-4 h-4" />
            Premium Member
          </div>
        )} */}
      </div>

      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className="bg-gray-900 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-900 transition hover:bg-gray-800"
            role="region"
            aria-labelledby={`progress-title-${index}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3
                  id={`progress-title-${index}`}
                  className="text-lg font-semibold text-gray-100 flex items-center gap-2"
                >
                  {index === 0 ? (
                    <Layers className="w-5 h-5 text-purple-500" />
                  ) : (
                    <Star className="w-5 h-5 text-purple-500" />
                  )}
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300 mt-1">Progress</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="relative w-full bg-gray-200 rounded-full h-2">
                <div
                  className="absolute top-0 left-0 h-2 bg-purple-700 rounded-full"
                  style={{ width: `${card.progress}%` }}
                />
              </div>
              <div className="text-sm text-gray-400 mt-1 font-medium">
                {card.progress}%
              </div>
            </div>

            {/* Current Topic */}
            <div className="mt-3 text-sm text-purple-300">
              Current: <span className="font-semibold text-gray-300">{card.current}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Leaderboard Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2">
          <ProgressChart />
        </div>
        <div>
          <LeaderboardPreview />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;