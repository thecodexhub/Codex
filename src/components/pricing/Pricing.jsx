import React from 'react';
import AuroraBackground from '../utils/BlueBackground';
import { GraduationCap, Clock, Code, LayoutDashboard, Briefcase, Trophy, CalendarDays, AlertTriangle, BookOpen, Flame } from 'lucide-react';

const Pricing = () => {
  // Toggle this boolean to show Active Plan view
  const isplantaken = true;
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
      {isplantaken ? (
        <div className="relative max-w-6xl mx-auto space-y-9">
          <div className="relative border-2 border-[#343434] rounded-2xl p-6 sm:p-8 text-white overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AuroraBackground className="w-[120%] h-[120%] opacity-40 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black" />
            </div>
            <div className="relative z-10 flex items-center justify-between ">
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold mb-1">Active Plan</h1>
                <p className="text-purple-100 text-base sm:text-lg">Your learning journey continues</p>
              </div>
              <span className="px-4 py-2 rounded-full bg-purple-700 border border-purple-300/20 text-sm sm:text-base font-semibold">LIFETIME</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold">Your Plan Includes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-gray-900/60 rounded-xl p-6 border border-gray-800/50 backdrop-blur-md flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-purple-300" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-800/50 backdrop-blur-md">
                <div className="text-lg font-semibold mb-4">Plan Details</div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-10">
                  <div className='grid grid-cols-2 sm:flex sm:flex-row sm:gap-32'>
                    <div className="flex items-start space-x-3">
                      <Trophy className="w-5 h-5 text-purple-300 mt-1" />
                      <div>
                        <div className="text-sm text-gray-400">Current Plan</div>
                        <div className="font-medium">Lifetime Account</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CalendarDays className="w-5 h-5 text-purple-300 mt-1" />
                      <div>
                        <div className="text-sm text-gray-400">Expires</div>
                        <div className="font-medium">Never</div>
                      </div>
                    </div>
                  </div>
                  <button className="sm:w-fit sm:px-10 bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>End Plan</span>
                  </button>
                </div>


              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="relative max-w-6xl mx-auto space-y-9">
          <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 sm:py-4 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Pricing</h1>
            <p className="text-purple-100 text-base sm:text-lg">Make the best investment</p>
          </div>

          <div className="relative bg-gray-900/60 rounded-xl p-8 border border-gray-800/50 flex flex-col lg:flex-row backdrop-blur-md overflow-hidden">
            <div className="hidden lg:block absolute inset-0 flex items-center justify-center pointer-events-none">
              <AuroraBackground className="w-[120%] h-[120%] opacity-40 blur-3xl" />
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 pr-0 lg:pr-8 pb-12 lg:pb-0 border-b border-gray-800/50 lg:border-r lg:border-gray-800/50 lg:border-b-0 relative z-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full border border-gray-600/70 flex items-center justify-center flex-shrink-0">
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

            <div className="flex-1 flex flex-col items-center justify-center text-center mt-12 lg:mt-0 lg:pl-8 relative z-10">
              <div className="text-5xl font-bold text-white mb-2">$99</div>
              <div className="text-gray-400 text-lg mb-8">Lifetime Account</div>

              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg text-lg uppercase tracking-wide hover:opacity-90 transition-opacity duration-200 mb-4">
                Buy Now
              </button>

              <div className="text-gray-400 text-sm">30 Days Moneyback Guarantee</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;