import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Code2, Users, CalendarDays, TrendingUp, Clock, ChevronRight } from 'lucide-react';

const StatCard = ({ icon: Icon, iconClassName, value, label }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 flex items-center">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${iconClassName}`}> 
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-white text-xl font-semibold leading-none">{value}</div>
        <div className="text-gray-400 text-sm mt-1">{label}</div>
      </div>
    </div>
  );
};

const Badge = ({ children, color = 'purple' }) => {
  const colorMap = {
    purple: 'bg-purple-800/30 text-purple-300',
    gray: 'bg-gray-800 text-gray-300',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorMap[color]}`}>{children}</span>
  );
};

const Contests = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Hero */}
      <div className="rounded-xl border border-gray-800 overflow-hidden bg-gray-900">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-purple-900/20 via-gray-900 to-gray-900">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-100">Welcome to Codex Contests</h1>
          <p className="mt-3 text-gray-300 max-w-3xl text-sm sm:text-base">
            Your journey to programming excellence starts here. Practice, compete, and grow with our comprehensive coding platform.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm font-medium transition-colors">
              <Trophy className="w-4 h-4 mr-2" />
              Join Contest
            </button>
            <button className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-800 text-sm font-medium transition-colors">
              <Code2 className="w-4 h-4 mr-2" />
              Start Practicing
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard icon={Trophy} iconClassName="bg-purple-800/40 text-purple-300" value="1,247" label="Active Participants" />
        <StatCard icon={Code2} iconClassName="bg-green-800/30 text-green-400" value="850+" label="Problems Available" />
        <StatCard icon={CalendarDays} iconClassName="bg-yellow-800/30 text-yellow-400" value="47" label="Contests Held" />
        <StatCard icon={TrendingUp} iconClassName="bg-blue-800/30 text-blue-400" value="95%" label="Success Rate" />
      </div>

      {/* Upcoming Contest */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <Badge color="purple">Upcoming</Badge>
          <Badge color="gray">Contest #48</Badge>
        </div>

        <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">Weekly Coding Contest</h2>
            <p className="mt-2 text-gray-400 text-sm">
              Test your skills against programmers worldwide. 6 problems, 3 hours, unlimited possibilities.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-400 text-sm">
              <div className="inline-flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                Starts in 2d 14h 23m
              </div>
              <div className="inline-flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                1,247 registered
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button onClick={() => navigate('/contests/details')} className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm font-medium transition-colors">
              <Trophy className="w-4 h-4 mr-2" />
              View Contest Details
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contests;
