import React from 'react';
import { Crown, Trophy, Medal, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeaderboardPreview = () => {
  const navigate = useNavigate();

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
    <div
      className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 cursor-pointer group relative hover:shadow-lg transition"
      onClick={() => navigate('/leaderboard')}
    >
      {/* Header with hover icon */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Leaderboard</h2>
        <ChevronRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition duration-200" />
      </div>

      {/* User List */}
      <div className="space-y-4">
        {topUsers.map((user, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 sm:space-x-4 p-3 rounded-lg transition-colors duration-200 ${
              user.name === 'You'
                ? 'bg-purple-900/30 border border-purple-500'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-center w-6 sm:w-8">
              {getRankIcon(user.rank)}
            </div>
            <div className="flex-1">
              <div
                className={`font-medium text-sm sm:text-base ${
                  user.name === 'You' ? 'text-purple-300' : 'text-white'
                }`}
              >
                {user.name}
              </div>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">{user.score} pts</div>
          </div>
        ))}
      </div>

      {/* View Full Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          navigate('/leaderboard');
        }}
        className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-900 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 text-sm sm:text-base"
      >
        View Full Leaderboard
      </button>
    </div>
  );
};

export default LeaderboardPreview;
