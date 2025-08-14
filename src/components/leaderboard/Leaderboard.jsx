import React, { useState } from 'react';
import { Crown, Trophy, Medal, TrendingUp, Star, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('institute');
  const { user } = useAuth();
  const navigate = useNavigate();
    // const user = { subscription: true };
  const hasSubscription = user?.subscription || false;
  // const navigate = (path) => console.log(`Navigating to: ${path}`);

  const leaderboardData = {
    institute: [
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
      case 2: return <Trophy className="w-6 h-6 text-gray-300" />;
      case 3: return <Medal className="w-6 h-6 text-orange-400" />;
      default: return <span className="w-6 h-6 text-gray-400 text-lg font-bold">#{rank}</span>;
    }
  };

  const getChangeColor = (change) => {
    if (change.startsWith('+')) return 'text-green-400';
    if (change.startsWith('-')) return 'text-red-400';
    return 'text-gray-400';
  };

  const getRankColors = (rank, isCurrentUser) => {
    if (isCurrentUser) {
      return {
        bg: 'bg-purple-900 bg-opacity-30 border border-purple-500',
        name: 'text-purple-300',
        avatar: 'bg-gradient-to-r from-purple-500 to-pink-500'
      };
    }

    switch (rank) {
      case 1:
        return {
          bg: 'bg-gray-600 bg-opacity-20 border border-yellow-500',
          name: 'text-yellow-300 font-bold',
          avatar: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
        };
      case 2:
        return {
          bg: 'bg-gray-600 bg-opacity-30 border border-gray-400',
          name: 'text-gray-200 font-bold',
          avatar: 'bg-gradient-to-r from-gray-400 to-gray-500'
        };
      case 3:
        return {
          bg: 'bg-gray-600 bg-opacity-20 border border-orange-500',
          name: 'text-orange-300 font-bold',
          avatar: 'bg-gradient-to-r from-orange-500 to-orange-600'
        };
      default:
        return {
          bg: 'bg-gray-800 hover:bg-gray-700',
          name: 'text-white',
          avatar: 'bg-gray-600'
        };
    }
  };

  const handleUpgradeClick = () => {
    navigate('/pricing');
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-950 text-white scrollbar-hidden">
      {/* <style>{`
        .scrollbar-hidden::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
        .scrollbar-hidden {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style> */}
      
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:p-6 text-white flex-shrink-0">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 overflow-hidden">
          Leaderboard
        </h1>
        <p className="text-purple-100 text-lg">Compete with the best coders</p>
      </div>

      {/* Tab Navigation - `flex-shrink-0` ensures it doesn't shrink. */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 overflow-hidden mt-6 flex-shrink-0">
        {['institute', 'monthly', 'weekly'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
              activeTab === tab
                ? 'bg-purple-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Leaderboard Container - `flex-grow` allows it to fill the remaining space. `overflow-hidden` ensures its children respect the boundaries. */}
      <div className="relative mt-6 flex-grow overflow-hidden rounded-xl">
        {/* Main Leaderboard Content - `h-full` and `flex flex-col` ensure it fills the parent and controls the layout of its children. */}
        <div className={`bg-gray-900 rounded-xl border border-gray-700 h-full ${!hasSubscription ? 'filter blur-sm' : ''}`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center space-x-2 mb-4 flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Rankings
              </h2>
            </div>

            <div className="space-y-3 flex-grow overflow-y-auto pr-2 scrollbar-hidden">
              {leaderboardData[activeTab].map((user, index) => {
                const rank = index + 1;
                const isCurrentUser = user.name === 'You';
                const colors = getRankColors(rank, isCurrentUser);
                
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${colors.bg} ${!hasSubscription ? 'pointer-events-none' : ''}`}
                  >
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(rank)}
                    </div>
                    
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${colors.avatar}`}>
                        {user.avatar}
                      </div>
                      <div>
                        <div className={`font-medium ${colors.name}`}>
                          {user.name}
                          {rank <= 3 && !isCurrentUser && (
                            <span className="ml-2 text-xs px-2 py-1 rounded-full bg-opacity-20 bg-white">
                              {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
                            </span>
                          )}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {user.solved} problems • {user.streak} day streak
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`font-semibold ${rank <= 3 && !isCurrentUser ? colors.name : 'text-white'}`}>
                        {user.score}
                      </div>
                      <div className={`text-sm ${getChangeColor(user.change)}`}>
                        {user.change}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Premium Overlay */}
        {!hasSubscription && (
          <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gray-800 rounded-xl p-5 text-center max-w-screen-sm mx-4 border border-gray-800 shadow-2xl">
              {/* Premium Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-purple-800 to-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <Crown className="w-8 h-8 text-yellow-400"/>
              </div>

              {/* Premium Message */}
              <h3 className="text-lg font-bold text-white mb-2">
                Premium Feature
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Unlock detailed rankings and compete with coders worldwide!
              </p>

              {/* Feature List - Compact */}
              <div className="bg-gray-700 rounded-lg p-3 mb-4 text-left">
                <ul className="space-y-1 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-purple-400" />
                    Global rankings
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-purple-400" />
                    Monthly & weekly boards
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-purple-400" />
                    Progress tracking
                  </li>
                </ul>
              </div>

              {/* Upgrade Button */}
              <button
                onClick={handleUpgradeClick}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-800 to-purple-900 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4" />
                Upgrade to Premium
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
