import React, { useState, useEffect } from 'react';
import { Crown, Trophy, Medal, TrendingUp, Star, Sparkles, Users, Target, Award, Construction, Rocket, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('institute');
  // State for API data
  const [instituteData, setInstituteData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const hasSubscription = user?.subscription || false;

  // Determine overlay mode based on activeTab
  const overlayMode = (activeTab === 'monthly' || activeTab === 'weekly') ? 'coming-soon' : 'none';

  // Determine which overlay to show
  const showPremiumOverlay = (!hasSubscription && overlayMode !== 'coming-soon' && overlayMode === 'premium');
  const showComingSoonOverlay = overlayMode === 'coming-soon';
  const showOverlay = showPremiumOverlay || showComingSoonOverlay;

  // Fetch leaderboard data for 'institute' tab
  useEffect(() => {
    if (activeTab !== 'institute') return;
    setLoading(true);
    fetch(BASE_URL + `/api/leaderboard?page=${page}&limit=10`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setInstituteData(res.data || []);
          setTotalPages(res.totalPages || 1);
        }
      })
      .finally(() => setLoading(false));
  }, [activeTab, page]);

  const leaderboardData = {
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
        bg: 'bg-opacity-30 border border-purple-500',
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
    <div className={`${showOverlay ? 'h-screen' : ''} space-y-6`}>
      {/* Hero Section - Always visible */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-purple-100 text-base sm:text-lg">Compete with the best coders</p>
      </div>

      {/* Tab Navigation - Always show but disable interaction if overlay is active */}
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

      {/* Content Area */}
      {showComingSoonOverlay ? (
        /* Coming Soon Component - Full Width */
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 sm:p-8 lg:p-12 flex-1 min-h-0">
          <div className="text-center max-w-6xl mx-auto h-full flex flex-col justify-center">
            {/* Coming Soon Icon */}
            <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 relative">
              <TrendingUp className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-white"/>
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Rocket className="w-3 sm:w-4 h-3 sm:h-4 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Coming Soon Message */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Enhanced Rankings Coming Soon!
            </h3>
            <p className="text-gray-300 mb-8 sm:mb-12 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              We're building advanced leaderboards with real-time rankings, detailed analytics, and competitive insights to elevate your coding journey.
            </p>

            {/* Feature Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-5xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <h4 className="text-white font-semibold text-sm">Live Rankings</h4>
                </div>
                <p className="text-gray-400 text-xs">Real-time position updates as you solve problems</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <h4 className="text-white font-semibold text-sm">Global Competition</h4>
                </div>
                <p className="text-gray-400 text-xs">Compete with programmers from around the world</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <h4 className="text-white font-semibold text-sm">Performance Insights</h4>
                </div>
                <p className="text-gray-400 text-xs">Detailed analytics on your coding performance</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <h4 className="text-white font-semibold text-sm">Achievement System</h4>
                </div>
                <p className="text-gray-400 text-xs">Unlock badges and achievements for milestones</p>
              </div>
            </div>

            {/* Notify Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={() => {
                  console.log('User wants to be notified about leaderboard');
                  alert('We\'ll notify you when enhanced leaderboards are ready!');
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-500 hover:to-red-500 transition-all duration-200 font-semibold text-base sm:text-lg flex items-center justify-center gap-3"
              >
                <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6" />
                Notify Me When Ready
              </button>
            </div>
            
            <p className="text-gray-400 mt-6 sm:mt-8 text-sm sm:text-base">
              Expected launch: Q1 2024
            </p>
          </div>
        </div>
      ) : showPremiumOverlay ? (
        /* Premium Component - Full Width */
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 sm:p-8 lg:p-10 flex-1 min-h-0">
          <div className="text-center max-w-6xl mx-auto h-full flex flex-col justify-center">
            {/* Premium Icon */}
            <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 relative">
              <Crown className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-yellow-400"/>
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="w-3 sm:w-4 h-3 sm:h-4 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Premium Message */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Premium Feature
            </h3>
            <p className="text-gray-300 mb-8 sm:mb-12 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Unlock detailed rankings and compete with coders worldwide! Track your progress and climb the leaderboards.
            </p>

            {/* Feature List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-5xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-purple-400" />
                  <h4 className="text-white font-semibold text-sm">Global Rankings</h4>
                </div>
                <p className="text-gray-400 text-xs">Access institute, monthly, and weekly leaderboards</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <h4 className="text-white font-semibold text-sm">Progress Tracking</h4>
                </div>
                <p className="text-gray-400 text-xs">Monitor your rank changes and performance trends</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-purple-400" />
                  <h4 className="text-white font-semibold text-sm">Competitor Analysis</h4>
                </div>
                <p className="text-gray-400 text-xs">See detailed stats of top performers and rivals</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-purple-400" />
                  <h4 className="text-white font-semibold text-sm">Achievement Badges</h4>
                </div>
                <p className="text-gray-400 text-xs">Earn exclusive badges for ranking milestones</p>
              </div>
            </div>

            {/* Upgrade Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={handleUpgradeClick}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-200 font-semibold text-base sm:text-lg flex items-center justify-center gap-3"
              >
                <Crown className="w-5 sm:w-6 h-5 sm:h-6" />
                Upgrade to Premium
              </button>
            </div>
            
            <p className="text-gray-400 mt-6 sm:mt-8 text-sm sm:text-base">
              Start your premium journey today and unlock your full potential!
            </p>
          </div>
        </div>
      ) : (
        /* Regular Content - Only show when user has access */
        <div className="relative mt-6 flex-grow overflow-hidden rounded-xl">
          <div className="bg-gray-900 rounded-xl border border-gray-700 h-full">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center space-x-2 mb-4 flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Rankings
                </h2>
              </div>
              {activeTab === 'institute' ? (
                <>
                  {loading ? (
                    <div className="text-center text-gray-400 py-8">Loading...</div>
                  ) : (
                    <div className="space-y-3 flex-grow overflow-y-auto pr-2 scrollbar-hidden">
                      {instituteData.map((user, index) => {
                        const rank = (page - 1) * 10 + index + 1;
                        const isCurrentUser = user.fullName === (user?.fullName || 'You');
                        const colors = getRankColors(rank, isCurrentUser);
                        return (
                          <div
                            key={user.fullName + index}
                            className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${colors.bg}`}
                          >
                            <div className="flex items-center justify-center w-8">
                              <span className="w-6 h-6 text-gray-400 text-lg font-bold">{rank}</span>
                            </div>
                            <div className="flex items-center space-x-3 flex-1">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${colors.avatar}`}
                                style={user.avatar ? { backgroundImage: `url(${user.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                                {!user.avatar && (user.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : '?')}
                              </div>
                              <div>
                                <div className={`font-medium ${colors.name}`}>{user.fullName}</div>
                                <div className="text-gray-400 text-sm">
                                  {user.streak} day streak
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-semibold ${rank <= 3 && !isCurrentUser ? colors.name : 'text-white'}`}>{user.score}</div>
                              {/* No change field in API, so skip */}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* Pagination Controls */}
                  <div className="flex justify-center mt-4 gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50"
                    >Prev</button>
                    <span className="text-gray-300 px-2">Page {page} of {totalPages}</span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50"
                    >Next</button>
                  </div>
                </>
              ) : (
                <div className="space-y-3 flex-grow overflow-y-auto pr-2 scrollbar-hidden">
                  {leaderboardData[activeTab].map((user, index) => {
                    const rank = index + 1;
                    const isCurrentUser = user.name === 'You';
                    const colors = getRankColors(rank, isCurrentUser);
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${colors.bg}`}
                      >
                        <div className="flex items-center justify-center w-8">
                          <span className="w-6 h-6 text-gray-400 text-lg font-bold">{rank}</span>
                        </div>
                        <div className="flex items-center space-x-3 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${colors.avatar}`}>{user.avatar}</div>
                          <div>
                            <div className={`font-medium ${colors.name}`}>{user.name}</div>
                            <div className="text-gray-400 text-sm">{user.solved} problems • {user.streak} day streak</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${rank <= 3 && !isCurrentUser ? colors.name : 'text-white'}`}>{user.score}</div>
                          <div className={`text-sm ${getChangeColor(user.change)}`}>{user.change}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;