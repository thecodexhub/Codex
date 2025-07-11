import React from 'react';
import { TrendingUp } from 'lucide-react';

const ProgressChart = () => {
  const weeklyData = [
    { day: 'Mon', problems: 5, hours: 2.5 },
    { day: 'Tue', problems: 7, hours: 3.2 },
    { day: 'Wed', problems: 4, hours: 2.0 },
    { day: 'Thu', problems: 9, hours: 4.1 },
    { day: 'Fri', problems: 6, hours: 2.8 },
    { day: 'Sat', problems: 12, hours: 5.5 },
    { day: 'Sun', problems: 8, hours: 3.7 },
  ];

  const maxProblems = Math.max(...weeklyData.map(d => d.problems));

  return (
    <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Weekly Progress</h2>
        <TrendingUp className="w-5 h-5 text-purple-400" />
      </div>
      
      <div className="space-y-4">
        {weeklyData.map((data, index) => (
          <div key={index} className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-6 sm:w-8 text-gray-400 text-xs sm:text-sm">{data.day}</div>
            <div className="flex-1 flex items-center space-x-1 sm:space-x-2">
              <div className="flex-1 bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${(data.problems / maxProblems) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs sm:text-sm text-gray-300 w-12 sm:w-16 text-right">{data.problems}p</div>
            </div>
            <div className="text-xs sm:text-sm text-purple-400 w-8 sm:w-12 text-right">{data.hours}h</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;