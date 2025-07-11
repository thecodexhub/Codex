import React from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Circle, Lock } from 'lucide-react';

const TopicItem = ({ topic, isExpanded, onToggle }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <Circle className="w-4 h-4 text-purple-400" />;
      case 'locked': return <Lock className="w-4 h-4 text-gray-500" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
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
              <h3 className="text-base sm:text-lg font-semibold text-white truncate">{topic.name}</h3>
              <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{topic.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
            <span className="text-sm text-gray-400">{completedCount}/{topic.subtopics.length}</span>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

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
      </div>

      {isExpanded && (
        <div className="border-t border-gray-800 bg-gray-800">
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
            {topic.subtopics.map((subtopic, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer"
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