import React, { useEffect, useState } from 'react';
import { Star, Send, MessageCircle, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL } from '../../config';

const Feedback = () => {
  const { user, mongodbId } = useAuth();
  const userEmail = user?.email;
  const userName = user?.displayName;

  const [activeTab, setActiveTab] = useState('feedback');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusModal, setStatusModal] = useState({ show: false, success: true, message: '' });
  const categories = ['Account', 'Technical Issue', 'Payment', 'Feedback', 'Other'];
  const [recentFeedback, setRecentFeedback] = useState([]);

  useEffect(() => {
    const fetchRecentFeedback = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/feedback`);
        if (res.data && Array.isArray(res.data.data)) {
          setRecentFeedback(res.data.data);
          console.log('Recent feedback data:', res.data.data);
        }
      } catch (error) {
        console.error('Failed to load recent feedback:', error);
      }
    };
    fetchRecentFeedback();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !feedback.trim()) {
      setStatusModal({ show: true, success: false, message: 'Please provide rating and feedback.' });
      return;
    }
    setLoading(true);
    const token = await user?.getIdToken();
    try {
      const newFeedback = {
        fullName: userName || "Anonymous",
        stars: rating,
        description: feedback,
        date: new Date().toISOString(),
      };

      setRecentFeedback((prev) => [newFeedback, ...prev]);

      const res = await axios.post(
        `${BASE_URL}/api/feedback`,
        {
          user_id: mongodbId,
          feedback_description: feedback,
          number_of_stars: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Feedback response:", res.data);

      setRating(0);
      setFeedback("");

      setTimeout(() => setStatusModal((prev) => ({ ...prev, show: false })), 2000);
    } catch (error) {
      console.error("Feedback error:", error);
      setStatusModal({ show: true, success: false, message: "Failed to submit feedback. Try again later." });


      setRecentFeedback((prev) => prev.slice(1));
    } finally {
      setLoading(false);
    }

  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_USER,
        {
          subject,
          category,
          description,
          email: userEmail || 'no-reply@example.com',
          name: userName || 'Anonymous',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        return emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN,
          {
            subject,
            category,
            description,
            email: userEmail || 'no-reply@example.com',
            name: userName || 'Anonymous',
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      })
      .then(() => {
        setStatusModal({ show: true, success: true, message: 'Query submitted successfully!' });
        setSubject('');
        setCategory('');
        setDescription('');
        setTimeout(() => setStatusModal((prev) => ({ ...prev, show: false })), 2000);
      })
      .catch(() => {
        setStatusModal({ show: true, success: false, message: 'Failed to send query. Please try again.' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="space-y-6">
      {statusModal.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full border border-purple-700 text-center text-white shadow-2xl">
            <h2 className={`text-xl font-bold mb-4 ${statusModal.success ? 'text-green-400' : 'text-red-400'}`}>
              {statusModal.success ? 'Success' : 'Error'}
            </h2>
            <p className="mb-4">{statusModal.message}</p>
            {!statusModal.success && (
              <button
                onClick={() => setStatusModal({ ...statusModal, show: false })}
                className="mt-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-lg font-semibold"
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}

      <div className={`${statusModal.show ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 sm:py-4 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Feedback & Support</h1>
          <p className="text-purple-100 text-base sm:text-lg">Share your thoughts with us</p>
        </div>

        <div className="my-6 bg-[#1f2938] border border-gray-800 rounded-xl p-1 flex items-center mx-auto">
          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-colors ${activeTab === 'feedback'
              ? 'bg-gray-900 text-white'
              : 'bg-transparent text-gray-300 hover:text-white'
              }`}
          >
            <Star className="w-4 h-4" />
            <span>Share Feedback</span>
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors ${activeTab === 'support'
              ? 'bg-gray-900 text-white'
              : 'bg-transparent text-gray-300 hover:text-white'
              }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask Question</span>
          </button>
        </div>

        <div
          className={`mt-4 ${activeTab === 'support'
            ? 'flex justify-center'
            : 'grid gap-6 grid-cols-1 lg:grid-cols-2'
            }`}
        >
          <div className={`bg-gray-900 rounded-xl p-6 border border-gray-800 ${activeTab === 'support' ? 'w-[90%] md:w-[75%]' : ''}`}>
            {activeTab === 'feedback' ? (
              <>
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
                          className={`p-1 rounded transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`}
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
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    {loading ? 'Submitting...' : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Feedback</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-white mb-4">Queries</h2>
                <form onSubmit={handleSupportSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Unable to reset my password"
                      className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none cursor-pointer"
                      required
                    >
                      <option value="">Select a Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-semibold">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please explain the issue in detail..."
                      className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none resize-none h-32"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-purple-700 text-white rounded-lg font-semibold text-lg hover:bg-purple-800 transition-all"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              </>
            )}
          </div>

          {activeTab === 'feedback' && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Recent Feedback</h2>
              </div>

              <div className="space-y-4">
                {Array.isArray(recentFeedback) && recentFeedback.length > 0 ? (
                  recentFeedback.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{item.fullName}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < item.stars ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="flex items-center space-x-1 text-green-400 hover:text-green-300">
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button className="text-gray-400 hover:text-red-400">
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No feedback available yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
