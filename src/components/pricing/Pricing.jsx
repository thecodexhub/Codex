import React from 'react';
import { Cloud, Network, MessageCircle, Users, Globe, Share2 } from 'lucide-react';

import { GraduationCap, Clock, Code, LayoutDashboard, Briefcase, Trophy } from 'lucide-react';

const Pricing = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Expert Curriculum",
      description: "Industry-focused, job-ready skills"
    },
    {
      icon: Clock,
      title: "Lifetime Access",
      description: "Learn anytime, revisit forever"
    },
    {
      icon: Code,
      title: "DSA Practice",
      description: "Topic-wise coding problems"
    },
    {
      icon: LayoutDashboard,
      title: "Career Tracks",
      description: "Guided specialization learning paths"
    },
    {
      icon: Briefcase,
      title: "Placement Help",
      description: "Real interview tips shared"
    },
    {
      icon: Trophy,
      title: "Gamified Learning",
      description: "Leaderboard boosts your progress"
    }
  ];




  return (
    <div className="relative h-fit text-white overflow-hidden">
  {/* Glow Background */}

  {/* Content */}
  <div className="relative max-w-6xl mx-auto space-y-6">
    
    {/* Header Section */}
    <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Pricing</h1>
      <p className="text-purple-100 text-base sm:text-lg">Make the best investment</p>
    </div>

    {/* Single Card Layout with Divider */}
    <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 flex flex-col lg:flex-row">
      
      {/* Left Side - Features */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 pr-0 lg:pr-8 pb-12 lg:pb-0 border-b border-gray-800 lg:border-r lg:border-gray-800 lg:border-b-0">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Side - Pricing */}
      <div className="flex-1 flex flex-col items-center justify-center text-center mt-12 lg:mt-0 lg:pl-8">
        <div className="text-5xl font-bold text-white mb-2">$99</div>
        <div className="text-gray-400 text-lg mb-8">Lifetime Account</div>
        
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg text-lg uppercase tracking-wide hover:opacity-90 transition-opacity duration-200 mb-4">
          Buy Now
        </button>
        
        <div className="text-gray-400 text-sm">
          30 Days Moneyback Guarantee
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Pricing;