import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ResearchCard from '../components/ResearchCard';
export default function InRevision() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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
              placeholder="Search papers by title, author name, or university..."
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
                  Reviewer Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., REV-2024-015"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All</option>
                  <option value="in-revision">In Revision</option>
                  <option value="awaiting-resubmission">Awaiting Resubmission</option>
                  <option value="pending-changes">Pending Changes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All</option>
                  <option value="cs">Computer Science</option>
                  <option value="ee">Electrical Engineering</option>
                  <option value="me">Mechanical Engineering</option>
                  <option value="bio">Biotechnology</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Papers Grid */}
        <div className="space-y-6">
          <ResearchCard status="In-Revision" />
          <ResearchCard status="In-Revision" />
          <ResearchCard status="In-Revision" />

          <div className="text-center text-gray-500 py-8">
            
          </div>
        </div>
      </div>
    </div>
  );
}