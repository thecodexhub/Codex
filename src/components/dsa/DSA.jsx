import React, { useState } from 'react';
import TopicItem from './TopicItem';
import { dsaTopics } from '../../utils/data';

const DSA = () => {
  const [expandedTopic, setExpandedTopic] = useState(null);

  const toggleTopic = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-4 sm:p-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Data Structures & Algorithms</h1>
          <p className="text-purple-100 text-base sm:text-lg">Master the fundamentals of programming</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            {dsaTopics.slice(0, Math.ceil(dsaTopics.length / 2)).map((topic) => (
              <TopicItem
                key={topic.id}
                topic={topic}
                isExpanded={expandedTopic === topic.id}
                onToggle={() => toggleTopic(topic.id)}
              />
            ))}
          </div>
          
          {/* Right Column */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            {dsaTopics.slice(Math.ceil(dsaTopics.length / 2)).map((topic) => (
              <TopicItem
                key={topic.id}
                topic={topic}
                isExpanded={expandedTopic === topic.id}
                onToggle={() => toggleTopic(topic.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSA;