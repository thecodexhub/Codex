import React from 'react';
import { BookOpen, Users, Building, Calendar } from 'lucide-react';

const PlacementPrep = () => {
  const prepSections = [
    {
      title: 'Technical Interviews',
      icon: BookOpen,
      description: 'System design, coding challenges, and technical questions',
      progress: 45,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Behavioral Interviews',
      icon: Users,
      description: 'Soft skills, communication, and leadership questions',
      progress: 20,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Company Research',
      icon: Building,
      description: 'Industry insights and company-specific preparation',
      progress: 60,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Mock Interviews',
      icon: Calendar,
      description: 'Practice with real interview scenarios',
      progress: 30,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const upcomingInterviews = [
    { company: 'Google', date: 'Mar 15, 2024', type: 'Technical', status: 'Scheduled' },
    { company: 'Microsoft', date: 'Mar 18, 2024', type: 'Behavioral', status: 'Pending' },
    { company: 'Amazon', date: 'Mar 22, 2024', type: 'System Design', status: 'Requested' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Placement Preparation</h1>
        <p className="text-purple-100 text-lg">Get ready for your dream job</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prepSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                  <p className="text-gray-400 text-sm">{section.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-purple-400">{section.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${section.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${section.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Upcoming Interviews</h2>
        <div className="space-y-3">
          {upcomingInterviews.map((interview, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div>
                <h3 className="text-white font-medium">{interview.company}</h3>
                <p className="text-gray-400 text-sm">{interview.type} Interview</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300">{interview.date}</p>
                <span className="text-xs px-2 py-1 bg-purple-900 text-purple-300 rounded-full">
                  {interview.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementPrep;