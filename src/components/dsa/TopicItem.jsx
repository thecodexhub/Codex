import React from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Circle, Lock, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopicItem = ({ topic, isExpanded, onToggle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hasSubscription = user?.subscription || false;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <Circle className="w-4 h-4 text-purple-400" />;
      case 'locked': return <Lock className="w-4 h-4 text-gray-500" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleUpgradeClick = () => {
    if (!hasSubscription) {
      navigate('/pricing');
    }
  };
  const completedCount = topic.subtopics.filter(sub => sub.status === 'completed').length;
  const progressPercent = (completedCount / topic.subtopics.length) * 100;

  return (
    <div className="flex flex-col bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div
        className="p-4 sm:p-6 cursor-pointer hover:bg-gray-800"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${topic.color}`}>
              <topic.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-semibold text-white truncate">{topic.name}</h3>
                {!hasSubscription && (
                  <Lock className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{topic.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
            {hasSubscription && (
              <span className="text-sm text-gray-400">{completedCount}/{topic.subtopics.length}</span>
            )}
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Only show progress bar for subscribed users */}
        {hasSubscription && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs sm:text-sm text-gray-400">Progress</span>
              <span className="text-sm text-purple-400">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Show premium overlay for users WITHOUT subscription */}
      {isExpanded && !hasSubscription && (
        <div className="border-t border-gray-800 bg-gray-900 relative">
          {/* Blurred Content */}
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 filter blur-sm">
            {topic.subtopics.map((subtopic, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-800"
              >
                {getStatusIcon(subtopic.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm sm:text-base truncate">{subtopic.name}</span>
                    <span className="text-xs px-1 sm:px-2 py-1 bg-purple-900 text-purple-300 rounded-full flex-shrink-0">
                      {subtopic.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">{subtopic.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs sm:text-sm text-gray-400">{subtopic.problems}p</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Premium Lock Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-gray-800 rounded-2xl p-2 sm:p-8 text-center max-w-sm mx-4 border border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-700 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Content</h3>
              <p className="text-gray-400 mb-3 text-sm">
                Unlock this topic and access all problems, solutions, and detailed explanations.
              </p>
              <button onClick={handleUpgradeClick} className="w-full bg-gradient-to-r from-purple-800 to-purple-900 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200">
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show normal content for subscribed users */}
      {isExpanded && hasSubscription && (
        <div className="border-t border-gray-800 bg-gray-900">
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
            {topic.subtopics.map((subtopic, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Clicked on ${subtopic.name}`);
                }}
              >
                {getStatusIcon(subtopic.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm sm:text-base truncate">{subtopic.name}</span>
                    <span className="text-xs px-1 sm:px-2 py-1 bg-purple-900 text-purple-300 rounded-full flex-shrink-0">
                      {subtopic.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">{subtopic.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs sm:text-sm text-gray-400">{subtopic.problems}p</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicItem;