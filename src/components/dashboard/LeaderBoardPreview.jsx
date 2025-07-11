import React from 'react';
import { Crown, Trophy, Medal } from 'lucide-react';

const LeaderboardPreview = () => {
  const topUsers = [
    { name: 'Alex Chen', score: 2847, rank: 1 },
    { name: 'Sarah Kim', score: 2756, rank: 2 },
    { name: 'Mike Johnson', score: 2689, rank: 3 },
    { name: 'You', score: 2234, rank: 42 },
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-orange-400" />;
      default: return <span className="w-5 h-5 text-gray-400 text-sm">#{rank}</span>;
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Leaderboard</h2>
      
      <div className="space-y-3">
        {topUsers.map((user, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 sm:space-x-4 p-3 rounded-lg ${
              user.name === 'You' ? 'bg-purple-900/30 border border-purple-500' : 'bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-center w-6 sm:w-8">
              {getRankIcon(user.rank)}
            </div>
            <div className="flex-1">
              <div className={`font-medium text-sm sm:text-base ${user.name === 'You' ? 'text-purple-300' : 'text-white'}`}>
                {user.name}
              </div>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">{user.score} pts</div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 text-sm sm:text-base">
        View Full Leaderboard
      </button>
    </div>
  );
};

export default LeaderboardPreview;