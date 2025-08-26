import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { COMPANY_LIST, BASE_URL } from '../../config';

function CompanyCard({ company, onClick }) {
  const [showImg, setShowImg] = useState(true);

  // Fallback initials + deterministic hue per company (for a unique gradient)
  const name = company?.name || 'Company';
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group relative overflow-hidden rounded-2xl p-5 text-left
        bg-[#0b1116]/90 border border-white/5
        shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_12px_32px_rgba(0,0,0,.45)]
        hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_22px_46px_rgba(0,0,0,.55)]
        transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60
      "
      aria-label={`Open ${name}`}
    >
      {/* soft teal glow on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px 220px at 85% -5%, rgba(20,241,200,.18), transparent 60%)',
        }}
      />
      <div className="relative flex flex-col items-center gap-4">
        <div
          className="
            relative w-20 h-20 rounded-full
            bg-[#121a22] ring-1 ring-white/10
            flex items-center justify-center
            shadow-[0_10px_28px_rgba(0,0,0,.45)]
          "
        >
          {showImg && company?.company_logo ? (
            <img
              src={company.company_logo}
              alt={`${name} logo`}
              loading="lazy"
              className="w-20 h-20 rounded-full object-contain p-2"
              onError={() => setShowImg(false)}
            />
          ) : (
            <span
              className="text-xl font-extrabold tracking-wide"
              style={{
                background: `conic-gradient(from 20deg, hsl(${hue} 90% 60%), hsl(${(hue + 70) % 360} 90% 60%), hsl(${(hue + 140) % 360} 90% 60%), hsl(${hue} 90% 60%))`,
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
              aria-hidden="true"
            >
              {initials}
            </span>
          )}

          {/* subtle ring that appears on hover */}
          <span className="absolute inset-0 rounded-full ring-4 ring-teal-400/0 transition-all duration-300 group-hover:ring-teal-400/20" />
        </div>

        <h3 className="text-white text-base sm:text-lg font-semibold tracking-wide text-center">
          {name}
        </h3>
      </div>
    </button>
  );
}

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
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch companies
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}${COMPANY_LIST}`, {
        params: { page, search: debouncedQuery },
      });
      setCompanies(res.data?.data || []);
      setTotalPages(res.data?.totalPages || 1);
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
  const openCompany = (c) =>
    navigate(`/company/${c._id}`, { state: { companyName: c.name } });

  return (
    <div className="text-white space-y-8">
      {/* Header */}
      <div className="rounded-2xl p-5 sm:p-6 bg-[linear-gradient(180deg,rgba(20,241,200,.12),transparent_40%),#0b1116] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Interview Experiences
        </h1>
        <p className="text-white/60 text-sm sm:text-base mt-1">
          Get ready for your dream company
        </p>
      </div>

      {/* Search */}
      <div className="w-full">
        <div className="relative mx-auto max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Search companies…"
            className="
              w-full pl-10 pr-4 py-2 rounded-xl bg-[#0b1116] text-white/90
              border border-white/10 focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/40
              outline-none transition
            "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 bg-white/5 h-40 animate-pulse"
            >
              <div className="h-full w-full grid place-items-center">
                <div className="w-16 h-16 rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      ) : companies.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {companies.map((c) => (
            <CompanyCard key={c._id} company={c} onClick={() => openCompany(c)} />
          ))}
        </div>
      ) : (
        <div className="text-center text-white/60 py-12">No companies found.</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 sm:gap-4 pt-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-xl
              border border-white/10 text-white/80
              hover:bg-white/5 transition
              ${page === 1 ? 'opacity-40 cursor-not-allowed' : ''}
            `}
          >
            <ArrowLeft className="w-4 h-4" />
            Prev
          </button>

          <span className="text-sm text-white/50">
            Page <strong className="text-white/80">{page}</strong> of{' '}
            <strong className="text-white/80">{totalPages}</strong>
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-xl
              border border-white/10 text-white/80
              hover:bg-white/5 transition
              ${page === totalPages ? 'opacity-40 cursor-not-allowed' : ''}
            `}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
