import React from 'react';
import {
  Trophy,
  CalendarDays,
  Clock,
  Users,
  ChevronRight,
  Star,
  CheckCircle2,
  ShieldAlert,
  Target,
  BookOpen,
  ListChecks,
  Lightbulb,
  Code2,
} from 'lucide-react';

const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>
);

const ProgressBar = ({ value }) => (
  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
    <div
      className="h-full bg-purple-700"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
);

const ContestDetails = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Hero */}
      <div className="rounded-xl border border-gray-800 overflow-hidden bg-gray-900">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-purple-900/20 via-gray-900 to-gray-900">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100">Weekly Coding Contest</h1>
              <p className="mt-3 text-gray-300 max-w-3xl text-sm sm:text-base">
                Test your programming skills in our weekly coding contest. Solve challenging problems and climb the leaderboard!
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm font-medium transition-colors">
                  <Trophy className="w-4 h-4 mr-2" />
                  Register for Contest
                </button>
                <button className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-800 text-sm font-medium transition-colors">
                  <Clock className="w-4 h-4 mr-2" />
                  View Past Contests
                </button>
                <button className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 text-sm font-medium transition-colors">
                  <Code2 className="w-4 h-4 mr-2" />
                  Practice Problems
                </button>
              </div>
            </div>

            {/* Next contest card */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-5 w-full lg:min-w-[320px]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-800/40 text-purple-300 flex items-center justify-center">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-300 text-sm">Next Contest</div>
                    <div className="text-gray-400 text-xs">Saturday, August 17, 2025 at 10:00 AM PST</div>
                    <div className="mt-3 flex items-center gap-2 text-purple-300 text-xs">
                      <Clock className="w-4 h-4" />
                      2d 14h 23m
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contest Structure */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-200">
          <span className="w-2 h-2 rounded-full bg-purple-600" />
          <span className="font-semibold">Contest Structure</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Easy */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
            <div className="flex items-center justify-between">
              <Badge className="bg-green-800/30 text-green-400">Easy</Badge>
              <span className="text-green-400 text-sm font-semibold">100 points</span>
            </div>
            <div className="mt-4 text-gray-200 font-medium">3 Problems</div>
            <p className="mt-2 text-gray-400 text-sm">Perfect for beginners. Focus on basic algorithms and data structures.</p>
            <div className="mt-4 text-gray-500 text-xs">Avg. Solve Time <span className="text-gray-300 font-medium">15 min</span></div>
          </div>
          {/* Medium */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
            <div className="flex items-center justify-between">
              <Badge className="bg-yellow-800/30 text-yellow-400">Medium</Badge>
              <span className="text-yellow-400 text-sm font-semibold">300 points</span>
            </div>
            <div className="mt-4 text-gray-200 font-medium">2 Problems</div>
            <p className="mt-2 text-gray-400 text-sm">Intermediate level problems requiring efficient solutions.</p>
            <div className="mt-4 text-gray-500 text-xs">Avg. Solve Time <span className="text-gray-300 font-medium">30 min</span></div>
          </div>
          {/* Hard */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
            <div className="flex items-center justify-between">
              <Badge className="bg-red-800/30 text-red-400">Hard</Badge>
              <span className="text-red-400 text-sm font-semibold">500 points</span>
            </div>
            <div className="mt-4 text-gray-200 font-medium">1 Problems</div>
            <p className="mt-2 text-gray-400 text-sm">Advanced problems for experienced programmers.</p>
            <div className="mt-4 text-gray-500 text-xs">Avg. Solve Time <span className="text-gray-300 font-medium">60 min</span></div>
          </div>
        </div>
      </div>

      {/* Results + Rankers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Previous Results */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
          <div className="flex items-center gap-2 text-gray-200">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <span className="font-semibold">Your Previous Contest Results</span>
            <Badge className="ml-auto bg-green-800/30 text-green-400">Contest #47</Badge>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-purple-300 text-2xl font-bold">850</div>
              <div className="text-gray-400 text-sm">Total Points</div>
            </div>
            <div>
              <div className="text-green-400 text-2xl font-bold">#15</div>
              <div className="text-gray-400 text-sm">Final Rank</div>
            </div>
            <div>
              <div className="text-gray-200 text-2xl font-bold">4</div>
              <div className="text-gray-400 text-sm">Problems Solved</div>
            </div>
            <div>
              <div className="text-yellow-400 text-2xl font-bold">2h 34m</div>
              <div className="text-gray-400 text-sm">Time Spent</div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Problems Completion</span>
                <span className="text-gray-400">4/6 (67%)</span>
              </div>
              <div className="mt-2"><ProgressBar value={67} /></div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Ranking Percentile</span>
                <span className="text-gray-400">Top 10%</span>
              </div>
              <div className="mt-2"><ProgressBar value={90} /></div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-gray-300 text-sm mb-2">Achievements earned</div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gray-800 text-gray-300">First Solve</Badge>
              <Badge className="bg-gray-800 text-gray-300">Speed Runner</Badge>
              <Badge className="bg-gray-800 text-gray-300">Problem Solver</Badge>
            </div>
          </div>
        </div>

        {/* Top Rankers */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
          <div className="flex items-center gap-2 text-gray-200">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <span className="font-semibold">Previous Contest Top Rankers</span>
            <span className="ml-auto text-gray-400 text-xs">Previous Contest</span>
          </div>

          <div className="mt-4 space-y-3">
            {[
              { name: 'Alex Chen', problems: 6, points: 2847, color: 'bg-purple-800/40 text-purple-300' },
              { name: 'Sarah Kim', problems: 5, points: 2756, color: 'bg-blue-800/40 text-blue-300' },
              { name: 'Mike Johnson', problems: 5, points: 2698, color: 'bg-green-800/40 text-green-300' },
              { name: 'Emma Wilson', problems: 4, points: 2534, color: 'bg-yellow-800/40 text-yellow-300' },
              { name: 'David Park', problems: 4, points: 2456, color: 'bg-red-800/40 text-red-300' },
            ].map((r, idx) => (
              <div key={r.name} className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${r.color}`}>{idx + 1}</div>
                  <div>
                    <div className="text-gray-200 text-sm font-medium">{r.name}</div>
                    <div className="text-gray-400 text-xs">{r.problems} problems solved</div>
                  </div>
                </div>
                <div className="text-purple-300 text-sm font-semibold">{r.points} points</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Solve + Terms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* How to Solve */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
          <div className="flex items-center gap-2 text-gray-200">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <span className="font-semibold">How to Solve Problems</span>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            {[
              { icon: BookOpen, text: 'Read the problem statement and understand the requirements.' },
              { icon: ListChecks, text: 'Analyze examples to understand the input-output pattern.' },
              { icon: Target, text: 'Plan your approach and data structures you\'ll need.' },
              { icon: Code2, text: 'Implement solution with clean, efficient code.' },
              { icon: CheckCircle2, text: 'Test with samples and edge cases before submitting.' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 w-6 h-6 rounded-md bg-gray-800 text-gray-300 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-gray-300">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="text-gray-400 text-xs font-medium">Pro Tips</div>
            <ul className="mt-2 list-disc list-inside text-gray-400 text-xs space-y-1">
              <li>Start with easier problems to build momentum</li>
              <li>Write clean, readable code; avoid premature optimization</li>
              <li>Use fast I/O when necessary; watch constraints closely</li>
              <li>Double-check corner cases before final submit</li>
            </ul>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
          <div className="flex items-center gap-2 text-gray-200">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <span className="font-semibold">Terms & Conditions</span>
          </div>
          <ul className="mt-4 space-y-2 text-gray-300 text-sm">
            {[
              'Contest duration is 3 hours from the start time',
              'Participants can submit multiple times; latest score counts',
              'Plagiarism detection is active - original solutions only',
              'Rankings are updated in real-time during contest',
              'Points are awarded based on difficulty and solve time',
              'No external assistance or prior test cases allowed',
              'Contest results are final after review period',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-purple-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 border border-red-900/40 bg-red-900/10 rounded-lg p-4 text-sm text-red-300 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <div>
              <div className="font-medium">Important Notice</div>
              <p className="mt-1 text-red-300/90">
                Any form of cheating, plagiarism, or unfair practice will result in immediate disqualification from the contest and potential account suspension.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;

