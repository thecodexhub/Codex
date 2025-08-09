import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, INTERVIEW_EXP_BY_COMPANYID } from '../../config';
import { Search, Filter, ArrowLeft } from 'lucide-react';


export default function CompanyExperiences() {
  const { id } = useParams(); // companyId
  const { state } = useLocation();
  const navigate = useNavigate();
  const companyName = state?.companyName || 'Company';

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${INTERVIEW_EXP_BY_COMPANYID}`, {
          params:{
            filter:JSON.stringify({companyId:id})
          }
        });
        setExperiences(res.data || []);
      } catch (error) {
        console.error('Failed to load experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchExperiences();
    }
  }, [id]);

  const filteredExperiences = experiences.filter(exp =>
    exp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.dept?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNameClick = (experience) => {
    navigate(`/company/${id}/interview-experience`, { state: { experience } });
  };
  const handleBack = () => navigate(-1);

  return (

    <div className="text-white space-y-6">
      {/* Purple Banner */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-2xl p-4 sm:px-6 text-white w-full flex items-center gap-6">
      <button onClick={handleBack} className="p-1 rounded-full bg-inherit border-white border-2 hover:bg-[#bfbfbf2d]">
          <ArrowLeft size={20} />
        </button>
        <p className="text-white text-2xl font-semibold">{companyName}</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex sm:justify-between items-center gap-4 ">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search names..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#131B20] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#131B20] border border-gray-700 rounded-lg text-white hover:bg-[#1a252a] transition-colors">
          <Filter size={20} />
          Filter
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : filteredExperiences.length === 0 ? (
        <p className="text-red-400">No interview experiences available.</p>
      ) : (
        <div className="bg-[#131B20] border border-gray-700 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#122027] px-6 py-4 border-b border-gray-700">
            <div className="grid grid-cols-7 sm:grid-cols-4 gap-4 text-white font-medium text-center text-sm sm:text-base">
              {/* Name - takes more space on mobile */}
              <div className="col-span-3 sm:col-span-1 text-left">Name</div>

              {/* Branch */}
              <div className="col-span-2 sm:col-span-1">Branch</div>

              {/* CTC */}
              <div className="col-span-2 sm:col-span-1">CTC</div>

              {/* Passed out in - hidden on mobile */}
              <div className="hidden sm:block">Passed out in</div>
            </div>


          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-700">
            {filteredExperiences.map((exp, index) => (
              <div onClick={() => handleNameClick(exp)} key={exp._id} className="px-6 py-4 hover:bg-[#1a252a] transition-colors cursor-pointer">
                <div className="grid grid-cols-7 sm:grid-cols-4 gap-4 text-white text-center text-sm sm:text-base">
                  {/* Name - 3 parts on mobile (out of 6), 1 part on sm screens (out of 4) */}
                  <div className="col-span-3 sm:col-span-1 flex items-center gap-3 text-left">
                    <span className="text-gray-400 text-sm">{index + 1}.</span>
                    <div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                      {exp.name}
                    </div>
                  </div>

                  {/* Branch - 2 parts on mobile, 1 on sm */}
                  <div className="col-span-2 sm:col-span-1 text-gray-300">{exp.dept}</div>

                  {/* CTC - 1 part on mobile, 1 on sm */}
                  <div className="col-span-2 sm:col-span-1 text-green-400 font-medium">{exp.ctcOffered}</div>

                  {/* Passed out in - hidden on mobile, visible on sm */}
                  <div className="hidden sm:block text-gray-300">{exp.year}</div>
                </div>


              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
