import React, { useState } from 'react';
import TopicItem from './TopicItem';
import { dsaTopics } from '../../utils/data';

const DSA = () => {
  const [expandedTopic, setExpandedTopic] = useState(null);

  const toggleTopic = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Data Structures & Algorithms</h1>
        <p className="text-purple-100 text-base sm:text-lg">Master the fundamentals of programming</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {dsaTopics.map((topic) => (
          <TopicItem
            key={topic.id}
            topic={topic}
            isExpanded={expandedTopic === topic.id}
            onToggle={() => toggleTopic(topic.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DSA;