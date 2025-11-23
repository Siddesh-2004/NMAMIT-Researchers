import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import AuthorCard from '../components/AuthorCard';
import axios from '../api/axios.config';


export default function Authors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [authorsInfo, setAuthorsInfo] = useState([]);
  const [minPaperCount, setMinPaperCount] = useState('');
  const [showCollaborative, setShowCollaborative] = useState(false);

  useEffect(() => {
    const getAuthorsInfo = async () => {
      try {
        console.log("Fetching Authors Info ...");
        const response = await axios.get('/author/getAllAuthors');
        setAuthorsInfo(response.data.data);
        console.log(authorsInfo);
      } catch (error) {
        console.error("Error fetching authors info:", error);
      }
    }
    getAuthorsInfo();
  }, []);

  // Filter authors based on search query and filter criteria
  const filteredAuthors = authorsInfo.filter((author) => {
    const normalizedAuthor = {
      name: author.fullName || author.userName,
      authorNumber: author.userName || author._id,
      email: author.email,
      papersPublished: author.PublishedPapers ?? 0,
      activePapers: author.ActivePapers ?? 0,
    };

    // Search filter
    const matchesSearch =
      searchQuery === '' ||
      normalizedAuthor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      normalizedAuthor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      normalizedAuthor.authorNumber.toLowerCase().includes(searchQuery.toLowerCase());

    // Paper count filter
    const matchesPaperCount =
      minPaperCount === '' ||
      normalizedAuthor.papersPublished >= parseInt(minPaperCount);

    // Collaborative filter (authors with more than 1 active paper)
    const matchesCollaborative =
      !showCollaborative || normalizedAuthor.activePapers > 1;

    return matchesSearch && matchesPaperCount && matchesCollaborative;
  });

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
              placeholder="Search authors by name, email, or university..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Author with Paper Count Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author with Paper Count
                </label>
                <input
                  type="number"
                  value={minPaperCount}
                  onChange={(e) => setMinPaperCount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter minimum number of published papers"
                  min="0"
                />
              </div>

              {/* Collaborative Authors Filter */}
              <div className="flex items-center">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="collaborative"
                    checked={showCollaborative}
                    onChange={(e) => setShowCollaborative(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="collaborative" className="ml-3">
                    <span className="block text-sm font-medium text-gray-700">
                      Collaborative Authors
                    </span>
                    <span className="block text-xs text-gray-500 mt-1">
                      Authors with more than one active paper
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Authors Grid */}
      <div className='space-y-4 px-6 mt-6'>
          {filteredAuthors.map((author) => {
            const normalizedAuthor = {
              name: author.fullName || author.userName,
              authorNumber: author.userName || author._id,   
              email: author.email,
              papersPublished: author.PublishedPapers ?? 0,
              activePapers: author.ActivePapers ?? 0,
            };

            return <AuthorCard key={author._id} author={normalizedAuthor} />;
          })}
        </div>
      </div>
    </div>
  );
}