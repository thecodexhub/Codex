import React from 'react';
import ProgressChart from './ProgressChart';
import LeaderboardPreview from './LeaderBoardPreview';
import { Calendar, Target, Trophy, Clock } from 'lucide-react';

const Dashboard = () => {
  const progressData = [
    { name: 'DSA Fundamentals', progress: 75, total: 100 },
    { name: 'System Design', progress: 45, total: 80 },
    { name: 'Web Development', progress: 90, total: 120 },
    { name: 'Machine Learning', progress: 30, total: 60 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Hi there, Welcome back! 👋</h1>
        <p className="text-purple-100 text-base sm:text-lg">Ready to continue your coding journey?</p>
      </div>

      {/* Progress Section */}
      <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Your Progress</h2>
        <div className="space-y-4">
          {progressData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium text-sm sm:text-base">{item.name}</span>
                <span className="text-purple-400 text-sm">{item.progress}/{item.total}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${(item.progress / item.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts and Leaderboard */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <ProgressChart />
        <LeaderboardPreview />
      </div>
    </div>
  );
};

export default Dashboard;