import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BASE_URL,
} from '../../config';
import {
  ArrowLeft,
  User,
  GraduationCap,
  Building,
  DollarSign,
  Calendar,
  Contact,
} from 'lucide-react';

export default function InterviewExperience() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const experience = state?.experience;

  const [loading, setLoading] = useState(true);
  const [experienceData, setExperienceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (experience) {
          setExperienceData(experience);
          setLoading(false);
          return;
        }

        if (id) {
          const response = await axios.get(`${BASE_URL}${INTERVIEW_EXP_BY_ID}/${id}`);
          setExperienceData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch experience data:', error);
        setError('Failed to load experience data');
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, [id, experience]);

  const handleBack = () => navigate(-1);
  function extractLinkedInUsername(linkedinUrl) {
    try {
      // Add protocol if missing
      if (!linkedinUrl.startsWith('http')) {
        linkedinUrl = 'https://' + linkedinUrl;
      }

      const url = new URL(linkedinUrl);
      const match = url.pathname.match(/\/in\/([^\/]+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  }



  if (loading || !experienceData) {
    return (
      <div className="bg-[#0B1419] min-h-screen text-white px-4 py-6">
        <p className="text-center text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0B1419] min-h-screen text-white px-4 py-6">
        <p className="text-center text-red-400">{error}</p>
      </div>
    );
  }

  const {
    name,
    dept,
    year,
    role,
    ctcOffered,
    linkedinUrl,
    rounds = []
  } = experienceData;

  return (

    <div className="text-white space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-lg sm:rounded-xl p-2 sm:p-4 text-white w-full flex items-center gap-6">
      <button onClick={handleBack} className="p-1 rounded-full bg-inherit border-white border-2 hover:bg-[#bfbfbf2d]">
          <ArrowLeft size={20} />
        </button>
        <p className="text-white text-base sm:text-xl font-semibold">Learn from their Experiences</p>
      </div>

      {/* Profile Details */}
      <div className="px-6 mb-8 text-base sm:text-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
          {/* LEFT COLUMN - Text Details */}
          <div className="space-y-4 max-w-xl">
            <div className="flex justify-between border-b border-gray-700 py-2">
              <div className="flex items-center gap-2">
                <User size={18} className="text-purple-400" />
                <span className="text-gray-400">Name:</span>
              </div>
              <span className="font-medium">{name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 py-2">
              <div className="flex items-center gap-2">
                <GraduationCap size={18} className="text-purple-400" />
                <span className="text-gray-400">Branch:</span>
              </div>
              <span className="font-medium">{dept}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 py-2">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-purple-400" />
                <span className="text-gray-400">Year:</span>
              </div>
              <span className="font-medium">{year}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 py-2">
              <div className="flex items-center gap-2">
                <Building size={18} className="text-purple-400" />
                <span className="text-gray-400">Role:</span>
              </div>
              <span className="font-medium text-white">{role}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 py-2">
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-purple-400" />
                <span className="text-gray-400">CTC:</span>
              </div>
              <span className="font-medium text-green-400">{ctcOffered}</span>
            </div>
            {/* LinkedIn Link Row */}
            {linkedinUrl && (
              <div className="flex justify-between border-b border-gray-700 py-2">
                <div className="flex items-center gap-2">
                  <Contact size={18} className="text-purple-400" />
                  <span className="text-gray-400">Linkedin:</span>
                </div>
                <a
                  href={linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white hover:text-purple-400 transition-colors"
                >
                  {extractLinkedInUsername(linkedinUrl)}
                </a>

              </div>

            )}
          </div>

          {/* RIGHT COLUMN - User Image */}
          <div className="flex justify-center sm:justify-end items-start pl-4 sm:pl-8">
            <div className="w-full max-w-[240px] aspect-square bg-purple-800 rounded-lg flex items-center justify-center">
              <User className="w-20 h-20 text-white" />
            </div>
          </div>
        </div>
      </div>



      {/* Experience Rounds */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Interview Rounds</h3>
        <div className="space-y-4">
          {rounds.length > 0 ? (
            rounds.map((round, index) => (
              <div key={index} className="bg-[#131B20] border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-semibold">
                    Round {index + 1}: {round.round_name}
                  </h4>
                  <span className="text-sm text-gray-400">
                    ({round.isRoundOffline ? 'Offline' : 'Online'})
                  </span>
                </div>
                <p className="text-gray-300 ml-11">{round.description}</p>
              </div>
            ))
          ) : (
            <div className="bg-[#131B20] border border-gray-700 rounded-lg p-4">
              <p className="text-gray-300">No rounds information available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
