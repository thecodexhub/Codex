import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Code2, 
  Users, 
  CalendarDays, 
  TrendingUp, 
  Clock, 
  ChevronRight, 
  Crown,
  Star,
  Construction,
  Rocket,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ icon: Icon, iconClassName, value, label }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 flex items-center">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${iconClassName}`}> 
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-white text-xl font-semibold leading-none">{value}</div>
        <div className="text-gray-400 text-sm mt-1">{label}</div>
      </div>
    </div>
  );
};

const Badge = ({ children, color = 'purple' }) => {
  const colorMap = {
    purple: 'bg-purple-800/30 text-purple-300',
    gray: 'bg-gray-800 text-gray-300',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorMap[color]}`}>{children}</span>
  );
};

const Contests = () => {
  // Control overlay states
  const [overlayMode, setOverlayMode] = useState('premium'); // 'none', 'premium', 'coming-soon'
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const hasSubscription = user?.subscription || true;

  // Determine which overlay to show
  const showPremiumOverlay = (!hasSubscription && overlayMode !== 'coming-soon');
  const showComingSoonOverlay = overlayMode === 'coming-soon';
  const showOverlay = showPremiumOverlay || showComingSoonOverlay;

  const handleUpgradeClick = () => {
    navigate('/pricing');
  };

  return (
    <div className={`${showOverlay ? 'h-screen' : ''} space-y-6`}>

      {/* Hero Section - Always visible*/}
      <div className="rounded-xl border border-gray-800 overflow-hidden bg-gray-900">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-purple-900/20 via-gray-900 to-gray-900">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-100">Welcome to Codex Contests</h1>
          <p className="mt-3 text-gray-300 max-w-3xl text-sm sm:text-base">
            Your journey to programming excellence starts here. Practice, compete, and grow with our comprehensive coding platform.
          </p>
          
          {/* Only show buttons if feature is available and user has subscription */}
          {!showComingSoonOverlay && hasSubscription && (
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm font-medium transition-colors">
                <Trophy className="w-4 h-4 mr-2" />
                Join Contest
              </button>
              <button className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-800 text-sm font-medium transition-colors">
                <Code2 className="w-4 h-4 mr-2" />
                Start Practicing
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Area - Show overlay components instead of blurred content */}
      {showComingSoonOverlay ? (
        /* Coming Soon Component - Full Width */
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 sm:p-8 lg:p-12 flex-1 min-h-0">
          <div className="text-center max-w-6xl mx-auto h-full flex flex-col justify-center">
            {/* Coming Soon Icon */}
            <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 relative">
              <Construction className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-white"/>
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-orange-400 rounded-full flex items-center justify-center animate-pulse">
                  <Rocket className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Coming Soon Message */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Coming Soon!
            </h3>
            <p className="text-gray-300 mb-8 sm:mb-12 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              We're working hard to bring you an amazing contest experience that will revolutionize how you practice competitive programming.
            </p>

            {/* Feature Preview Grid - Single Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-5xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <h4 className="text-white font-semibold text-sm">Live Contests</h4>
                </div>
                <p className="text-gray-400 text-xs">Real-time competitive programming with instant feedback</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <h4 className="text-white font-semibold text-sm">Global Rankings</h4>
                </div>
                <p className="text-gray-400 text-xs">Compete with programmers worldwide</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <h4 className="text-white font-semibold text-sm">Team Battles</h4>
                </div>
                <p className="text-gray-400 text-xs">Collaborate with friends in special events</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <h4 className="text-white font-semibold text-sm">Rewards</h4>
                </div>
                <p className="text-gray-400 text-xs">Win exciting prizes and recognition</p>
              </div>
            </div>

            {/* Notify Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={() => {
                  console.log('User wants to be notified');
                  alert('We\'ll notify you when contests are ready!');
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 font-semibold text-base sm:text-lg flex items-center justify-center gap-3"
              >
                <Rocket className="w-5 sm:w-6 h-5 sm:h-6" />
                Notify Me When Ready
              </button>
            </div>
            
            <p className="text-gray-400 mt-6 sm:mt-8 text-sm sm:text-base">
              Expected launch: Q2 2024
            </p>
          </div>
        </div>
      ) : showPremiumOverlay ? (
        /* Premium Component - Full Width */
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 sm:p-8 lg:p-10 flex-1 min-h-0">
          <div className="text-center max-w-6xl mx-auto h-full flex flex-col justify-center">
            {/* Premium Icon */}
            <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 relative">
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
              Unlock competitive programming contests and climb the global rankings with our premium features!
            </p>

            {/* Feature List Grid - Single Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-5xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-purple-400" />
                  <h4 className="text-white font-semibold text-sm">Live Contests</h4>
                </div>
                <p className="text-gray-400 text-xs">Join live contests with thousands of participants worldwide</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <h4 className="text-white font-semibold text-sm">Global Leaderboards</h4>
                </div>
                <p className="text-gray-400 text-xs">Access global leaderboards and track your ranking progress</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-purple-400" />
                  <h4 className="text-white font-semibold text-sm">Premium Problems</h4>
                </div>
                <p className="text-gray-400 text-xs">Solve exclusive premium contest problems with detailed solutions</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <h4 className="text-white font-semibold text-sm">Advanced Analytics</h4>
                </div>
                <p className="text-gray-400 text-xs">Get detailed performance analytics and improvement suggestions</p>
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
              Start your 7-day free trial today
            </p>
          </div>
        </div>
      ) : (
        /* Regular Content - Only show when user has access */
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard icon={Trophy} iconClassName="bg-purple-800/40 text-purple-300" value="1,247" label="Active Participants" />
            <StatCard icon={Code2} iconClassName="bg-green-800/30 text-green-400" value="850+" label="Problems Available" />
            <StatCard icon={CalendarDays} iconClassName="bg-yellow-800/30 text-yellow-400" value="47" label="Contests Held" />
            <StatCard icon={TrendingUp} iconClassName="bg-blue-800/30 text-blue-400" value="95%" label="Success Rate" />
          </div>

          {/* Upcoming Contest */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <Badge color="purple">Upcoming</Badge>
              <Badge color="gray">Contest #48</Badge>
            </div>

            <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">Weekly Coding Contest</h2>
                <p className="mt-2 text-gray-400 text-sm">
                  Test your skills against programmers worldwide. 6 problems, 3 hours, unlimited possibilities.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                  <div className="inline-flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    Starts in 2d 14h 23m
                  </div>
                  <div className="inline-flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    1,247 registered
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <button onClick={() => navigate('/contests/details')} className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm font-medium transition-colors">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Contest Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contests;