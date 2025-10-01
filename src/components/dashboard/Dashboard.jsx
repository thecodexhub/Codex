import React from 'react';
import axios from 'axios';
import ProgressChart from './ProgressChart';
import LeaderboardPreview from './LeaderBoardPreview';
import { ChevronRight, Layers, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL, DASHBOARD } from '../../config';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, mongodbId } = useAuth();

  const [weeklyData, setWeeklyData] = React.useState([
    { day: 'Mon', problems: 0, hours: 0 },
    { day: 'Tue', problems: 0, hours: 0 },
    { day: 'Wed', problems: 0, hours: 0 },
    { day: 'Thu', problems: 0, hours: 0 },
    { day: 'Fri', problems: 0, hours: 0 },
    { day: 'Sat', problems: 0, hours: 0 },
    { day: 'Sun', problems: 0, hours: 0 },
  ]);
  const [dsaProgressTotal, setDsaProgressTotal] = React.useState(0);
  const [specProgressTotal, setSpecProgressTotal] = React.useState(0);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getWeekBounds = (referenceDate = new Date()) => {
    const today = new Date(referenceDate);
    // JS getDay: 0=Sun,...,6=Sat; We want Monday as start
    const dayOfWeek = today.getDay();
    const daysSinceMonday = (dayOfWeek + 6) % 7; // Mon->0, Tue->1, ..., Sun->6
    const monday = new Date(today);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(today.getDate() - daysSinceMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return { monday, sunday };
  };

  const buildWeekTemplate = () => ([
    { day: 'Mon', problems: 0, hours: 0 },
    { day: 'Tue', problems: 0, hours: 0 },
    { day: 'Wed', problems: 0, hours: 0 },
    { day: 'Thu', problems: 0, hours: 0 },
    { day: 'Fri', problems: 0, hours: 0 },
    { day: 'Sat', problems: 0, hours: 0 },
    { day: 'Sun', problems: 0, hours: 0 },
  ]);

  const applySeriesToWeek = (template, series, field) => {
    const dayIndexToKey = {
      1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat', 0: 'Sun',
    };
    const keyToIndex = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
    const result = [...template];
    (series || []).forEach((item) => {
      if (!item || !item.day) return;
      const date = new Date(item.day);
      const jsDay = date.getDay();
      const label = dayIndexToKey[jsDay];
      const idx = keyToIndex[label];
      if (idx !== undefined) {
        result[idx] = {
          ...result[idx],
          [field]: (Number(item.count) || 0),
        };
      }
    });
    return result;
  };

  React.useEffect(() => {
    const fetchDashboard = async () => {
      if (!mongodbId) return;
      try {
        const { monday, sunday } = getWeekBounds(new Date());
        const startDate = formatDate(monday);
        const endDate = formatDate(sunday);
        const res = await axios.get(`${BASE_URL}${DASHBOARD}`, {
          params: {
            user_id: mongodbId,
            startDate,
            endDate,
          },
        });

        const data = res?.data || {};
        const weekTemplate = buildWeekTemplate();
        let merged = applySeriesToWeek(weekTemplate, data.prog_progress, 'problems');
        merged = applySeriesToWeek(merged, data.specialisation_prog, 'hours');
        setWeeklyData(merged);
        setDsaProgressTotal(Number(data.prog_progress_total) || 0);
        setSpecProgressTotal(Number(data.specialisation_prog_total) || 0);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
        setWeeklyData(buildWeekTemplate());
        setDsaProgressTotal(0);
        setSpecProgressTotal(0);
      }
    };

    fetchDashboard();
  }, [mongodbId]);
  
  const cardData = [
    {
      title: 'DSA Progress',
      progress: Math.min(100, dsaProgressTotal),
      current: 'Dynamic Programming',
      onClick: () => navigate('/')
     },
    {
      title: 'Specialization',
      progress: Math.min(100, specProgressTotal),
      current: 'React Advanced Patterns',
      onClick: () => navigate('/'),
     },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Hi {user?.displayName}, Welcome back!</h1>
        <p className="text-purple-100 text-base sm:text-lg">
          Ready to continue your coding journey?
        </p>
        {/* Subscription Status Badge */}
        {/* {user?.subscription && (
          <div className="mt-3 inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-200 px-3 py-1 rounded-full text-sm">
            <Star className="w-4 h-4" />
            Premium Member
          </div>
        )} */}
      </div>

      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className="bg-gray-900 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-900 transition hover:bg-gray-800"
            role="region"
            aria-labelledby={`progress-title-${index}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3
                  id={`progress-title-${index}`}
                  className="text-lg font-semibold text-gray-100 flex items-center gap-2"
                >
                  {index === 0 ? (
                    <Layers className="w-5 h-5 text-purple-500" />
                  ) : (
                    <Star className="w-5 h-5 text-purple-500" />
                  )}
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300 mt-1">Progress</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="relative w-full bg-gray-200 rounded-full h-2">
                <div
                  className="absolute top-0 left-0 h-2 bg-purple-700 rounded-full"
                  style={{ width: `${card.progress}%` }}
                />
              </div>
              <div className="text-sm text-gray-400 mt-1 font-medium">
                {card.progress}%
              </div>
            </div>

            {/* Current Topic */}
            <div className="mt-3 text-sm text-purple-300">
              Current: <span className="font-semibold text-gray-300">{card.current}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Leaderboard Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2">
          <ProgressChart weeklyData={weeklyData} />
        </div>
        <div>
          <LeaderboardPreview />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;