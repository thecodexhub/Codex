import React, { useState } from 'react';
import { Star, Send, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const recentFeedback = [
    {
      id: 1,
      user: 'Alex Chen',
      rating: 5,
      comment: 'Amazing platform! The DSA problems are well-structured and the explanations are clear.',
      date: '2 days ago',
      helpful: 24
    },
    {
      id: 2,
      user: 'Sarah Kim',
      rating: 4,
      comment: 'Great learning experience. Would love to see more system design questions.',
      date: '1 week ago',
      helpful: 18
    },
    {
      id: 3,
      user: 'Mike Johnson',
      rating: 5,
      comment: 'The placement preparation section is incredibly helpful. Got placed at Google!',
      date: '2 weeks ago',
      helpful: 35
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { rating, feedback });
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Feedback</h1>
        <p className="text-purple-100 text-lg">Help us improve your learning experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Share Your Feedback</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Rate your experience</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-1 rounded transition-colors ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'
                    }`}
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Your feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience..."
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none resize-none h-32"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
          </form>
        </div>

        {/* Recent Feedback */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <MessageCircle className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Recent Feedback</h2>
          </div>

          <div className="space-y-4">
            {recentFeedback.map((item) => (
              <div key={item.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{item.user}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">{item.comment}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{item.date}</span>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 text-green-400 hover:text-green-300">
                      <ThumbsUp className="w-3 h-3" />
                      <span className="text-xs">{item.helpful}</span>
                    </button>
                    <button className="text-gray-400 hover:text-red-400">
                      <ThumbsDown className="w-3 h-3" />
                    </button>
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

export default Feedback;