import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Search,
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  DollarSign,
  GraduationCap,
  Users,
  Lock
} from 'lucide-react';
import { BASE_URL, INTERVIEW_EXP_BY_COMPANYID } from '../../config';
import { useAuth } from '../../context/AuthContext';

// Subtle skeleton row
const ExperienceSkeleton = () => (
  <div className="bg-black/40 border border-white/5 rounded-xl animate-pulse p-5">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white/10 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-white/10 rounded w-1/3" />
        <div className="h-3 bg-white/10 rounded w-1/4" />
      </div>
      <div className="space-y-2 hidden sm:block">
        <div className="h-3.5 bg-white/10 rounded w-20" />
        <div className="h-3 bg-white/10 rounded w-16" />
      </div>
    </div>
  </div>
);

export default function CompanyExperiences() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const companyName = state?.companyName || 'Company';

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const { user } = useAuth();
  const isSubscribed = user?.subscription || false;
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${INTERVIEW_EXP_BY_COMPANYID}`, {
          params: { companyId: id },
        });
        setExperiences(res.data || []);
      } catch (error) {
        console.error('Failed to load experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchExperiences();
  }, [id]);

  const filteredExperiences = experiences.filter((exp) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return (
      exp.name?.toLowerCase().includes(q) ||
      exp.dept?.toLowerCase().includes(q) ||
      exp.role?.toLowerCase().includes(q)
    );
  });

  const openExperience = (experience) =>
    navigate(`/company/${id}/interview-experience`, { state: { experience } });

  const goBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <div className="container mx-auto px-4 py-6 space-y-8">

        <header className="rounded-2xl border border-white/5 bg-black/50 shadow-[0_10px_28px_rgba(0,0,0,.45)]">
          <div className="p-5 sm:p-6 flex items-center gap-4 sm:gap-6">
            <button
              onClick={goBack}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-colors"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <Building2 size={24} className="text-slate-100" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{companyName}</h1>
                <p className="text-slate-400 text-sm">Interview Experiences</p>
              </div>
              <div>
                {!isSubscribed && (
                  <Lock className="w-10 h-10 text-yellow-500" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Tools row: count + search */}
        <section className="rounded-2xl border border-white/5 bg-black/50">
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-300/80">
              <Users size={16} />
              <span>{filteredExperiences.length} experiences</span>
            </div>

            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, role, or dept…"
                className="w-full pl-9 pr-9 py-2 rounded-xl bg-black/60 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400/40 transition"
              />
              {!!searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ExperienceSkeleton key={i} />
            ))}
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-black/50 p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/5 grid place-items-center">
              <Users size={22} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No experiences found</h3>
            <p className="text-slate-400 text-sm">
              {searchTerm
                ? 'Try a different search term.'
                : 'No interview experiences are available for this company yet.'}
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredExperiences.map((exp, index) => {
               
              return (
                <li key={exp._id} className="relative">
                  <button
                    onClick={() => {
                      if (!isSubscribed) {
                        alert("Subscribe to unlock this experience!");
                        return;
                      }
                      openExperience(exp);
                    }}
                    className={`
                      w-full text-left rounded-xl border border-white/8 bg-black/50
                      px-4 sm:px-5 py-4
                      transition duration-200 ease-out
                      focus:outline-none
                      ${!isSubscribed ? "cursor-not-allowed" : "hover:border-purple-500/35 hover:bg-white/[.04] focus:ring-2 focus:ring-purple-400/30"}
                    `}
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 grid place-items-center text-white font-semibold">
                        {exp.name?.charAt(0) || 'U'}
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-100 truncate">
                              {exp.name || 'Unknown Candidate'}
                            </h3>
                            <span className="hidden sm:inline text-xs text-slate-500">#{index + 1}</span>
                          </div>
                          <p className="text-yellow-600 text-sm truncate">
                            {!isSubscribed ? "Premium • Subscribe to unlock" : exp.role}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-200">
                          <GraduationCap size={15} className="text-slate-400" />
                          <span className="truncate">{exp.dept || '—'}</span>
                        </div>

                        <div className="flex items-center sm:justify-end gap-4">
                          <div className="flex items-center gap-1.5 text-sm">
                            <DollarSign size={15} className="text-emerald-400" />
                            <span className="text-emerald-400 font-medium">{exp.ctcOffered || '—'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-slate-200">
                            <Calendar size={15} className="text-slate-400" />
                            <span>{exp.year || '—'}</span>
                          </div>
                          {!isSubscribed ? (
                            <Lock className="w-6 h-6 text-yellow-400" />
                          ) : (
                            <ArrowRight className="hidden sm:block w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
