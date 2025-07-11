import React, { useState } from 'react';
import { Crown, Trophy, Medal, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('global');

  const leaderboardData = {
    global: [
      { name: 'Alex Chen', avatar: 'AC', score: 2847, solved: 423, streak: 45, change: '+2' },
      { name: 'Sarah Kim', avatar: 'SK', score: 2756, solved: 398, streak: 32, change: '+1' },
      { name: 'Mike Johnson', avatar: 'MJ', score: 2689, solved: 356, streak: 28, change: '-1' },
      { name: 'Emma Davis', avatar: 'ED', score: 2634, solved: 342, streak: 21, change: '+3' },
      { name: 'David Wilson', avatar: 'DW', score: 2578, solved: 329, streak: 19, change: '+1' },
      { name: 'Lisa Brown', avatar: 'LB', score: 2465, solved: 298, streak: 15, change: '-2' },
      { name: 'James Miller', avatar: 'JM', score: 2398, solved: 287, streak: 12, change: '+4' },
      { name: 'You', avatar: 'U', score: 2234, solved: 267, streak: 12, change: '+5' },
    ],
    monthly: [
      { name: 'Sarah Kim', avatar: 'SK', score: 387, solved: 45, streak: 32, change: '+1' },
      { name: 'Alex Chen', avatar: 'AC', score: 356, solved: 42, streak: 45, change: '-1' },
      { name: 'You', avatar: 'U', score: 298, solved: 34, streak: 12, change: '+2' },
    ],
    weekly: [
      { name: 'You', avatar: 'U', score: 87, solved: 12, streak: 12, change: '+8' },
      { name: 'Alex Chen', avatar: 'AC', score: 76, solved: 11, streak: 45, change: '-1' },
      { name: 'Sarah Kim', avatar: 'SK', score: 65, solved: 9, streak: 32, change: '+2' },
    ]
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-orange-400" />;
      default: return <span className="w-6 h-6 text-gray-400 text-lg font-bold">#{rank}</span>;
    }
  };

  const getChangeColor = (change) => {
    if (change.startsWith('+')) return 'text-green-400';
    if (change.startsWith('-')) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-purple-100 text-lg">Compete with the best coders worldwide</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        {['global', 'monthly', 'weekly'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Rankings
            </h2>
          </div>

          <div className="space-y-3">
            {leaderboardData[activeTab].map((user, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${
                  user.name === 'You' 
                    ? 'bg-gradient-to-r from-purple-900 to-pink-900 bg-opacity-30 border border-purple-500' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(index + 1)}
                </div>
                
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    user.name === 'You' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
                  }`}>
                    {user.avatar}
                  </div>
                  <div>
                    <div className={`font-medium ${user.name === 'You' ? 'text-purple-300' : 'text-white'}`}>
                      {user.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {user.solved} problems • {user.streak} day streak
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-white font-semibold">{user.score}</div>
                  <div className={`text-sm ${getChangeColor(user.change)}`}>
                    {user.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;