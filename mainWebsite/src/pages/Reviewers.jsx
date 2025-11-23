import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import ReviewerInfoCard from "../components/ReviewerInfoCard";
import axios from '../api/axios.config';

export default function Reviewers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [reviewersInfo, setReviewersInfo] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [sortByScore, setSortByScore] = useState('');
  const [limit, setLimit] = useState('');

  useEffect(() => {
    const getReviewersInfo = async () => {
      try {
        console.log("Fetching Reviewers Info...");
        const response = await axios.get('/reviewer/getAllReviewers');
        setReviewersInfo(response.data.data);
        console.log(reviewersInfo);
      } catch (error) {
        console.error("Error fetching authors info:", error);
      }
    }
    getReviewersInfo();
  }, []);

  // Filter and sort reviewers
  const filteredAndSortedReviewers = () => {
    let result = [...reviewersInfo];

    // Apply search filter
    if (searchQuery) {
      result = result.filter((reviewer) => {
        const name = reviewer.reviewerName?.toLowerCase() || '';
        const email = reviewer.email?.toLowerCase() || '';
        const qualification = reviewer.qualification?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();

        return name.includes(query) || email.includes(query) || qualification.includes(query);
      });
    }

    // Apply ordering by papers reviewed
    if (orderBy) {
      result.sort((a, b) => {
        const aValue = a.totalPapers ?? 0;
        const bValue = b.totalPapers ?? 0;

        if (orderBy === 'highest') {
          return bValue - aValue; // Descending
        } else if (orderBy === 'lowest') {
          return aValue - bValue; // Ascending
        }
        return 0;
      });
    }

    // Apply ordering by average score
    if (sortByScore) {
      result.sort((a, b) => {
        const aValue = a.averageScore ?? 0;
        const bValue = b.averageScore ?? 0;

        if (sortByScore === 'descending') {
          return bValue - aValue; // Highest to Lowest
        } else if (sortByScore === 'ascending') {
          return aValue - bValue; // Lowest to Highest
        }
        return 0;
      });
    }

    // Apply limit
    if (limit && parseInt(limit) > 0) {
      result = result.slice(0, parseInt(limit));
    }

    return result;
  };

  const displayedReviewers = filteredAndSortedReviewers();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:ml-64 pt-16 lg:pt-10">
      <div className="max-w-7xl mx-auto">


        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search reviewers by name, email, or qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: '#001F3F' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#003366'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#001F3F'}
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Options (shown when filter button is clicked) */}
        {showFilters && (
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4" style={{ color: '#001F3F' }}>
              Filter Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order By Papers Reviewed
                </label>
                <select 
                  value={orderBy}
                  onChange={(e) => setOrderBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">None</option>
                  <option value="highest">Highest to Lowest</option>
                  <option value="lowest">Lowest to Highest</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By Average Score
                </label>
                <select 
                  value={sortByScore}
                  onChange={(e) => setSortByScore(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">None</option>
                  <option value="descending">Highest </option>
                  <option value="ascending">Lowest </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Limit
                </label>
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter number of reviewers to display"
                  min="1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Reviewers Grid */}

        <div className="space-y-6">
          {
            displayedReviewers.map((reviewer) => {
              const normalizedReviewer = {
                name: reviewer.reviewerName,
                reviewerNumber: reviewer._id.toString().slice(-6), // last 6 digits of ID
                phone: reviewer.phoneNumber,
                email: reviewer.email,
                qualification: reviewer.qualification,
                papersReviewed: reviewer.totalPapers,
                averageScore: reviewer.averageScore ?? 0,  // handle null
              };

              return <ReviewerInfoCard key={reviewer._id} reviewer={normalizedReviewer} />;
            })
          }
        </div>
      </div>
    </div>
  );
}