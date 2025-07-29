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
