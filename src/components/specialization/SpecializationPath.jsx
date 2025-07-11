import React from 'react';
import { Globe, Smartphone, Database, Brain, Shield, Cloud } from 'lucide-react';

const SpecializationPath = () => {
  const specializations = [
    {
      id: 'web-dev',
      name: 'Web Development',
      icon: Globe,
      description: 'Full-stack web development with modern frameworks',
      progress: 65,
      duration: '6 months',
      difficulty: 'Intermediate',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'mobile-dev',
      name: 'Mobile Development',
      icon: Smartphone,
      description: 'Cross-platform mobile app development',
      progress: 30,
      duration: '8 months',
      difficulty: 'Intermediate',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'data-science',
      name: 'Data Science',
      icon: Database,
      description: 'Data analysis, machine learning, and AI',
      progress: 0,
      duration: '10 months',
      difficulty: 'Advanced',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'machine-learning',
      name: 'Machine Learning',
      icon: Brain,
      description: 'Deep learning and neural networks',
      progress: 0,
      duration: '12 months',
      difficulty: 'Advanced',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      icon: Shield,
      description: 'Security fundamentals and ethical hacking',
      progress: 0,
      duration: '9 months',
      difficulty: 'Advanced',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'cloud-computing',
      name: 'Cloud Computing',
      icon: Cloud,
      description: 'AWS, Azure, and cloud architecture',
      progress: 0,
      duration: '7 months',
      difficulty: 'Intermediate',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-900 text-green-300';
      case 'Intermediate': return 'bg-yellow-900 text-yellow-300';
      case 'Advanced': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Specialization Paths</h1>
        <p className="text-purple-100 text-base sm:text-lg">Choose your career path and master the skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {specializations.map((spec) => {
          const Icon = spec.icon;
          return (
            <div key={spec.id} className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 hover:border-purple-500 cursor-pointer">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${spec.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{spec.name}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4">{spec.description}</p>
                  
                  <div className="flex items-center space-x-2 sm:space-x-4 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(spec.difficulty)}`}>
                      {spec.difficulty}
                    </span>
                    <span className="text-gray-400 text-xs sm:text-sm">{spec.duration}</span>
                  </div>

                  {spec.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-400">Progress</span>
                        <span className="text-sm text-purple-400">{spec.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${spec.color} h-2 rounded-full`}
                          style={{ width: `${spec.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <button className={`w-full mt-4 px-4 py-2 bg-gradient-to-r ${spec.color} text-white rounded-lg hover:opacity-90 text-sm sm:text-base`}>
                    {spec.progress > 0 ? 'Continue Learning' : 'Start Path'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecializationPath;