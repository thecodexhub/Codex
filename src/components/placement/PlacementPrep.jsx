<<<<<<< HEAD
import React from 'react';
import { BookOpen, Users, Building, Calendar, Clock, MapPin, Briefcase } from 'lucide-react';

const PlacementPrep = () => {
  const prepSections = [
    {
      title: 'Technical Interviews',
      icon: BookOpen,
      description: 'System design, coding challenges, and technical questions',
      progress: 45,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Behavioral Interviews',
      icon: Users,
      description: 'Soft skills, communication, and leadership questions',
      progress: 20,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Company Research',
      icon: Building,
      description: 'Industry insights and company-specific preparation',
      progress: 60,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Mock Interviews',
      icon: Calendar,
      description: 'Practice with real interview scenarios',
      progress: 30,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const upcomingCampusDrives = [
    { 
      company: 'Google', 
      visitDate: 'Mar 15, 2024', 
      currentRound: 'Online Assessment',
      nextRound: 'Technical Interview',
      status: 'Registration Open', 
      location: 'Campus Auditorium',
      package: '₹45-60 LPA',
      eligibility: 'CSE, IT, ECE'
    },
    { 
      company: 'Microsoft', 
      visitDate: 'Mar 18, 2024', 
      currentRound: 'Resume Screening',
      nextRound: 'Coding Round',
      status: 'Shortlisted', 
      location: 'Main Building',
      package: '₹35-50 LPA',
      eligibility: 'All Branches'
    },
    { 
      company: 'Amazon', 
      visitDate: 'Mar 22, 2024', 
      currentRound: 'Technical Round 1',
      nextRound: 'Technical Round 2',
      status: 'In Progress', 
      location: 'Computer Lab',
      package: '₹28-42 LPA',
      eligibility: 'CSE, IT'
    },
    { 
      company: 'TCS', 
      visitDate: 'Mar 25, 2024', 
      currentRound: 'Not Started',
      nextRound: 'Aptitude Test',
      status: 'Coming Soon', 
      location: 'Examination Hall',
      package: '₹7-12 LPA',
      eligibility: 'All Branches'
    },
    { 
      company: 'Infosys', 
      visitDate: 'Mar 28, 2024', 
      currentRound: 'HR Round',
      nextRound: 'Final Selection',
      status: 'Final Stage', 
      location: 'Conference Room',
      package: '₹8-15 LPA',
      eligibility: 'All Branches'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Registration Open': return 'bg-green-900 text-green-300';
      case 'Shortlisted': return 'bg-blue-900 text-blue-300';
      case 'In Progress': return 'bg-yellow-900 text-yellow-300';
      case 'Coming Soon': return 'bg-purple-900 text-purple-300';
      case 'Final Stage': return 'bg-orange-900 text-orange-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:p-6 text-white">
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
                  <span className="text-sm text-purple-700">{section.progress}%</span>
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

      <div className="bg-gray-950 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Upcoming Campus Drives
        </h2>
        <div className="space-y-4">
          {upcomingCampusDrives.map((drive, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-lg">{drive.company}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(drive.status)}`}>
                      {drive.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center text-gray-300 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{drive.visitDate}</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{drive.location}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    <div className="text-sm">
                      <span className="text-gray-400">Package: </span>
                      <span className="text-green-400 font-semibold">{drive.package}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Eligibility: </span>
                      <span className="text-blue-400">{drive.eligibility}</span>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm text-gray-400 mb-1">Current Round</div>
                        <div className="text-white font-medium">{drive.currentRound}</div>
                      </div>
                      <div className="mx-4">
                        <Clock className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-400 mb-1">Next Round</div>
                        <div className="text-purple-400 font-medium">{drive.nextRound}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementPrep;
=======
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { COMPANY_LIST, BASE_URL } from '../../config';

export default function CompanyGrid() {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // Reset page on new query
    }, 1000);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch companies
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}${COMPANY_LIST}`, {
        params: { page, search: debouncedQuery }
      });
      setCompanies(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQuery]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const handleCardClick = (company) => {
    navigate(`/company/${company._id}`, { state: { companyName: company.name } });
  };

  return (
    <div className="min-h-screen bg-[#0B1419] text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Company Listings</h2>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <div className="flex items-center bg-gray-800 rounded-md px-3 py-2 w-full max-w-md">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search companies..."
            className="bg-transparent outline-none text-white w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Company Cards Grid */}
      {loading ? (
        <div className="text-center text-gray-400 py-10">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company._id}
              onClick={() => handleCardClick(company)}
              className="cursor-pointer bg-gray-900 rounded-xl p-5 border border-gray-700 shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              {company.company_logo ? (
                <img
                  src={company.company_logo}
                  alt={company.name}
                  className="w-16 h-16 object-contain rounded-full mb-3"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-3 text-sm text-gray-300">
                  No Logo
                </div>
              )}
              <h3 className="text-lg font-semibold">{company.name}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md border border-gray-600 flex items-center gap-2 ${page === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-800'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Prev
          </button>

          <span className="text-sm text-gray-400">
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md border border-gray-600 flex items-center gap-2 ${page === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-800'}`}
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
>>>>>>> origin/sobia
