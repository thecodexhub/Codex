import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, INTERVIEW_EXP_BY_COMPANYID } from '../../config';
import { Calendar, Briefcase, User, MapPin, Linkedin, BookOpen } from 'lucide-react';

export default function CompanyExperiences() {
  const { id } = useParams(); // companyId
  const { state } = useLocation();
  const companyName = state?.companyName || 'Company';

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${INTERVIEW_EXP_BY_COMPANYID}`, {
          companyId: id
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

  return (
    <div className="bg-[#0B1419] min-h-screen text-white px-4 py-6 font-sans">
      <h1 className="text-3xl font-bold text-purple-300 mb-6">
        {companyName} Interview Experiences
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : experiences.length === 0 ? (
        <p className="text-red-400">No interview experiences available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="bg-[#131B20] border border-gray-700 rounded-lg p-5 shadow-md space-y-4"
            >
              <div className="flex items-center gap-2">
                <User className="text-purple-400" size={18} />
                <h2 className="text-lg font-semibold">
                  {exp.name} ({exp.year})
                </h2>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={16} /> Dept: <span className="text-white">{exp.dept}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Briefcase size={16} /> Role: <span className="text-green-400">{exp.role}</span>
              </div>

              <div className="text-sm text-gray-400">
                <strong>CTC Offered:</strong>{' '}
                <span className="text-blue-300">{exp.ctcOffered}</span>
              </div>

              <div className="text-sm text-gray-400">
                <strong>Rounds:</strong> {exp.numberOfRounds}
              </div>

              <div className="text-sm text-gray-400">
                <strong>Eligibility:</strong> {exp.eligibilityCriteria}
              </div>

              {exp.linkedinUrl && (
                <a
                  href={`https://${exp.linkedinUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:underline"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              )}

              {exp.rounds?.length > 0 && (
                <div className="bg-[#0F2945] border border-[#1d2c3a] rounded-md p-3 text-sm space-y-2">
                  <div className="text-purple-300 font-medium flex items-center gap-2">
                    <BookOpen size={16} />
                    Round Details
                  </div>
                  {exp.rounds.map((r, idx) => (
                    <div key={r._id} className="text-gray-300">
                      <p className="font-semibold">
                        {idx + 1}. {r.round_name} ({r.isRoundOffline ? 'Offline' : 'Online'})
                      </p>
                      <p className="text-sm">{r.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
