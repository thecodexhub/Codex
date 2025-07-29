import React, { useState } from 'react';
import { MessageSquare, UploadCloud } from 'lucide-react';

const Queries = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const categories = [
    'Account',
    'Technical Issue',
    'Payment',
    'Feedback',
    'Other',
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubject('');
    setCategory('');
    setDescription('');
    setFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Queries</h1>
        <p className="text-purple-100 text-lg">Share your thoughts with us.</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 border border-gray-800 max-w-2xl mx-auto space-y-6">
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
              <option key={cat} value={cat} className='cursor-pointer'>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please explain the issue in detail. Mention steps to reproduce it or any specific error messages you encountered."
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none resize-none h-32"
            required
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="file-upload" className="cursor-pointer flex  items-center justify-center gap-4 border-2 border-dashed border-gray-600 rounded-lg p-6 w-full max-w-s text-gray-400 hover:border-purple-500 transition-colors">
            <UploadCloud className="w-8 h-8" />
            <span>{file ? file.name : 'Click to browse or drag and drop your files'}</span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 bg-purple-700 text-white rounded-lg font-semibold text-lg hover:bg-purple-800 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Queries; 