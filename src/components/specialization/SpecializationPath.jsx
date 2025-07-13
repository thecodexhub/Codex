import React, { useState } from 'react';
import { Globe, Smartphone, Database, Brain, Shield, Cloud, BookOpen, Code, Palette, Server } from 'lucide-react';

const SpecializationPath = () => {
  const [selectedPath, setSelectedPath] = useState('web-dev');

  const specializations = [
    {
      id: 'web-dev',
      name: 'Web Development',
      icon: Globe,
      description: 'Full-stack web development with modern frameworks',
      progress: 65,
      duration: '6 months',
      difficulty: 'Intermediate',
      topics: [
        { name: 'HTML & CSS Fundamentals', progress: 100, icon: Code },
        { name: 'JavaScript ES6+', progress: 85, icon: Code },
        { name: 'React.js', progress: 70, icon: Code },
        { name: 'Node.js & Express', progress: 45, icon: Server },
        { name: 'Database Design', progress: 30, icon: Database },
        { name: 'API Development', progress: 20, icon: Server }
      ]
    },
    {
      id: 'mobile-dev',
      name: 'Mobile Development',
      icon: Smartphone,
      description: 'Cross-platform mobile app development',
      progress: 0,
      duration: '8 months',
      difficulty: 'Intermediate',
      topics: [
        { name: 'React Native Basics', progress: 60, icon: Code },
        { name: 'Mobile UI/UX', progress: 40, icon: Palette },
        { name: 'State Management', progress: 25, icon: Database },
        { name: 'Native APIs', progress: 15, icon: Smartphone },
        { name: 'App Store Deployment', progress: 0, icon: Cloud }
      ]
    },
    {
      id: 'data-science',
      name: 'Data Science',
      icon: Database,
      description: 'Data analysis, machine learning, and AI',
      progress: 0,
      duration: '10 months',
      difficulty: 'Advanced',
      topics: [
        { name: 'Python Fundamentals', progress: 0, icon: Code },
        { name: 'Statistics & Probability', progress: 0, icon: BookOpen },
        { name: 'Data Visualization', progress: 0, icon: Palette },
        { name: 'Machine Learning', progress: 0, icon: Brain },
        { name: 'Deep Learning', progress: 0, icon: Brain }
      ]
    },
    {
      id: 'machine-learning',
      name: 'Machine Learning',
      icon: Brain,
      description: 'Deep learning and neural networks',
      progress: 0,
      duration: '12 months',
      difficulty: 'Advanced',
      topics: [
        { name: 'Linear Algebra', progress: 0, icon: BookOpen },
        { name: 'Neural Networks', progress: 0, icon: Brain },
        { name: 'TensorFlow/PyTorch', progress: 0, icon: Code },
        { name: 'Computer Vision', progress: 0, icon: Brain },
        { name: 'NLP', progress: 0, icon: Brain }
      ]
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      icon: Shield,
      description: 'Security fundamentals and ethical hacking',
      progress: 0,
      duration: '9 months',
      difficulty: 'Advanced',
      topics: [
        { name: 'Network Security', progress: 0, icon: Shield },
        { name: 'Ethical Hacking', progress: 0, icon: Shield },
        { name: 'Cryptography', progress: 0, icon: BookOpen },
        { name: 'Penetration Testing', progress: 0, icon: Shield },
        { name: 'Security Compliance', progress: 0, icon: BookOpen }
      ]
    },
    {
      id: 'cloud-computing',
      name: 'Cloud Computing',
      icon: Cloud,
      description: 'AWS, Azure, and cloud architecture',
      progress: 0,
      duration: '7 months',
      difficulty: 'Intermediate',
      topics: [
        { name: 'Cloud Fundamentals', progress: 0, icon: Cloud },
        { name: 'AWS Services', progress: 0, icon: Server },
        { name: 'DevOps Practices', progress: 0, icon: Code },
        { name: 'Container Orchestration', progress: 0, icon: Server },
        { name: 'Cloud Security', progress: 0, icon: Shield }
      ]
    }
  ];

  const currentPath = specializations.find(spec => spec.id === selectedPath);
  const otherPaths = specializations.filter(spec => spec.id !== selectedPath);

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
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Specialization Paths</h1>
        <p className="text-purple-100 text-base sm:text-lg">Choose your career path and master the skills</p>
      </div>

      {/* Current Selected Path */}
      <div className="bg-gray-900 rounded-xl p-4 sm:p-6">
        <div className="flex items-start space-x-3 sm:space-x-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
            <currentPath.icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{currentPath.name}</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">{currentPath.description}</p>
            
            <div className="flex items-center space-x-2 sm:space-x-4 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(currentPath.difficulty)}`}>
                {currentPath.difficulty}
              </span>
              <span className="text-gray-400 text-xs sm:text-sm">{currentPath.duration}</span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-400">Overall Progress</span>
                <span className="text-sm text-purple-700">{currentPath.progress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-purple-700 h-2 rounded-full"
                  style={{ width: `${currentPath.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Topics in Current Path */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white mb-3">Course Topics</h4>
          {currentPath.topics.map((topic, index) => {
            const TopicIcon = topic.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-lg p-3 sm:p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                    <TopicIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm sm:text-base font-medium">{topic.name}</span>
                </div>
                <div className="ml-11">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs text-purple-400">{topic.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-purple-700 h-1.5 rounded-full"
                      style={{ width: `${topic.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Other Available Paths */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Explore Other Paths</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {otherPaths.map((spec) => {
            const Icon = spec.icon;
            return (
              <div 
                key={spec.id} 
                className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => setSelectedPath(spec.id)}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
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
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-400">Progress</span>
                          <span className="text-sm text-purple-700">{spec.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-purple-700 h-2 rounded-full"
                            style={{ width: `${spec.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:opacity-90 text-sm sm:text-base">
                      {spec.progress > 0 ? 'Continue Learning' : 'Start Path'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpecializationPath;