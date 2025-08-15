import React, { useState } from 'react';
import { MessageSquare, UploadCloud } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useAuth } from '../../context/AuthContext'; 

const Queries = () => {
  const { user } = useAuth(); 
  const email = user?.email;
  const name = user?.displayName;

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusModal, setStatusModal] = useState({ show: false, success: true, message: '' });

  const categories = ['Account', 'Technical Issue', 'Payment', 'Feedback', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_USER,
      { 
        subject,
        category,
        description,
        email: email || 'no-reply@example.com',
        name: name || 'Anonymous',
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      // Send to Admin
      return emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN,
        {
          subject,
          category,
          description,
          email: email || 'no-reply@example.com',
          name: name || 'Anonymous',
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
    .catch((error) => {
      console.error('Email sending FAILED...', error);
      setStatusModal({ show: true, success: false, message: 'Failed to send query. Please try again.' });
    })
    .finally(() => {
      setLoading(false);
    });
  };


  return (
    <div className="relative">
      {/* Modal */}
      {statusModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center">
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

      {/* Main form */}
      <div className={`${statusModal.show ? 'blur-sm pointer-events-none' : ''} space-y-6`}>
        <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Queries</h1>
          <p className="text-purple-100 text-base sm:text-lg">Share your thoughts with us</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 border border-gray-800 max-w-3xl mx-auto space-y-6">
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
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none resize-none h-32 sm:h-24"
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
      </div>
    </div>
  );
};

export default Queries;
