import React from 'react';
import { TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

const ProgressChart = ({ weeklyData = [
  { day: 'Mon', problems: 0, hours: 0 },
  { day: 'Tue', problems: 0, hours: 0 },
  { day: 'Wed', problems: 0, hours: 0 },
  { day: 'Thu', problems: 0, hours: 0 },
  { day: 'Fri', problems: 0, hours: 0 },
  { day: 'Sat', problems: 0, hours: 0 },
  { day: 'Sun', problems: 0, hours: 0 },
] }) => {

  return (
    <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Weekly Progress</h2>
        <TrendingUp className="w-5 h-5 text-purple-400" />
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f1f1f', borderColor: '#444' }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#ddd' }}
            />
            <Legend
              wrapperStyle={{ color: '#bbb' }}
              formatter={(value) => <span className="text-sm text-gray-300">{value}</span>}
            />
            <defs>
              <linearGradient id="colorProblemsLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
              <linearGradient id="colorHoursLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="problems"
              stroke="url(#colorProblemsLine)"
              strokeWidth={3}
              dot={{ r: 5 }}
              name="Problems Solved"
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="url(#colorHoursLine)"
              strokeWidth={3}
              dot={{ r: 5 }}
              name="Modules Completed"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
