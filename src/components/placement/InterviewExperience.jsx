import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BASE_URL,
  INTERVIEW_EXP_BY_COMPANYID, // ensure this exists in your config
} from '../../config';
import {
  ArrowLeft,
  User,
  GraduationCap,
  Building,
  DollarSign,
  Calendar,
  Link2,
} from 'lucide-react';

export default function InterviewExperience() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const experience = state?.experience;

  const [loading, setLoading] = useState(true);
  const [experienceData, setExperienceData] = useState(null);
  const [error, setError] = useState(null);

  const safeLink = (url) => (!url ? null : url.startsWith('http') ? url : `https://${url}`);

  const initials = useMemo(() => {
    const n = (experienceData?.name || 'Anonymous').trim();
    const parts = n.split(/\s+/);
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last || 'A').toUpperCase();
  }, [experienceData]);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (experience) {
          setExperienceData(experience);
          return;
        }
        if (id) {
          const { data } = await axios.get(`${BASE_URL}${INTERVIEW_EXP_BY_COMPANYID}/${id}`);
          setExperienceData(data);
        }
      } catch (e) {
        console.error('Failed to fetch experience data:', e);
        setError('Failed to load experience data.');
      } finally {
        setLoading(false);
      }
    };
    fetchExperienceData();
  }, [id, experience]);

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-slate-100 px-4 py-6 grid place-items-center">
        <p className="text-slate-400">Loading…</p>
      </div>
    );
  }
  if (error || !experienceData) {
    return (
      <div className="min-h-screen bg-black text-slate-100 px-4 py-6 grid place-items-center">
        <p className="text-red-400">{error || 'No data found.'}</p>
      </div>
    );
  }

  const {
    name = 'Anonymous',
    dept = '—',
    year = '—',
    role = '—',
    ctcOffered = '—',
    linkedinUrl,
    rounds = [],
  } = experienceData;

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <div className="container mx-auto px-4 py-6 space-y-8">

        {/* Top bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg sm:text-xl font-semibold">Interview Experience</h1>
        </div>

        {/* Profile (no boxes/cards) */}
        <section className="space-y-4">
          {/* Avatar + Name/Role */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl grid place-items-center bg-white/[.06] text-xl sm:text-2xl font-bold tracking-wide">
                {initials}
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight truncate">{name}</h2>
                <p className="text-slate-400 text-sm sm:text-base truncate">{role}</p>
              </div>
            </div>

            {/* LinkedIn (simple text link) */}
            {linkedinUrl && (
              <a
                href={safeLink(linkedinUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-200 hover:text-purple-300 underline underline-offset-4 decoration-white/20"
                title={linkedinUrl}
              >
                <span className="inline-flex items-center gap-2">
                  <Link2 size={16} className="text-slate-400" />
                  View LinkedIn
                </span>
              </a>
            )}
          </div>

          {/* Details list (plain, two columns on md+, with separators) */}
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm sm:text-base">
            <div className="flex items-start justify-between border-b border-white/10 py-2">
              <dt className="text-slate-400 inline-flex items-center gap-2">
                <User size={16} className="text-slate-500" />
                Name
              </dt>
              <dd className="text-slate-100 font-medium text-right">{name}</dd>
            </div>

            <div className="flex items-start justify-between border-b border-white/10 py-2">
              <dt className="text-slate-400 inline-flex items-center gap-2">
                <Building size={16} className="text-slate-500" />
                Role
              </dt>
              <dd className="text-slate-100 font-medium text-right">{role}</dd>
            </div>

            <div className="flex items-start justify-between border-b border-white/10 py-2">
              <dt className="text-slate-400 inline-flex items-center gap-2">
                <GraduationCap size={16} className="text-slate-500" />
                Branch
              </dt>
              <dd className="text-slate-100 text-right">{dept}</dd>
            </div>

            <div className="flex items-start justify-between border-b border-white/10 py-2">
              <dt className="text-slate-400 inline-flex items-center gap-2">
                <Calendar size={16} className="text-slate-500" />
                Year
              </dt>
              <dd className="text-slate-100 text-right">{year}</dd>
            </div>

            <div className="flex items-start justify-between border-b border-white/10 py-2 md:col-span-2">
              <dt className="text-slate-400 inline-flex items-center gap-2">
                <DollarSign size={16} className="text-emerald-400" />
                CTC
              </dt>
              <dd className="text-emerald-400 font-semibold text-right">{ctcOffered}</dd>
            </div>
          </dl>
        </section>

        {/* Rounds (highlighted round number, name, and mode) */}
        <section>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Interview Rounds</h3>

          {!rounds?.length ? (
            <div className="rounded-xl border border-white/10 bg-black/40 p-5">
              <p className="text-slate-400">No rounds information available.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rounds.map((round, i) => (
                <div
                  key={`${round.round_name ?? 'Round'}-${i}`}
                  className="rounded-xl border border-white/10 bg-black/40 p-4 sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    {/* Round number */}
                    <span className="w-9 h-9 rounded-full bg-purple-600/20 text-purple-400 grid place-items-center text-sm font-bold">
                      {i + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      {/* Round name + mode */}
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-base sm:text-lg font-bold text-purple-300">
                          Round {i + 1}{round.round_name ? `: ${round.round_name}` : ''}
                        </h4>

                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${round.isRoundOffline
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-400/30'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30'
                            }`}
                        >
                          {round.isRoundOffline ? 'Offline' : 'Online'}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-2 text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {round.description || 'No description provided.'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
