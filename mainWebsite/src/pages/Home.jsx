import React, { useState, useEffect } from 'react';
import Analytics from '../components/AnalyticsCard';
import ResearchCard from '../components/ResearchCard';
import axios from '../api/axios.config';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [acceptedPapers, setAcceptedPapers] = useState([]);
  const [sortOrder, setSortOrder] = useState('highest'); // 'highest' or 'lowest'
  const [resultLimit, setResultLimit] = useState('');
  const [rangeFrom, setRangeFrom] = useState('');
  const [rangeTo, setRangeTo] = useState('');
    
  useEffect(() => {
    const getAcceptedPapers = async () => {
      try{
        console.log("Fetching Accepted papers...");
        const response = await axios.get('/paper/getAcceptedPapers');
        setAcceptedPapers(response.data.data);
        console.log(acceptedPapers);
      }catch(error){
        console.error("Error fetching review papers:", error);
      }
    }
    getAcceptedPapers();
  }, []);

  // Function to filter and sort papers
  const getFilteredPapers = () => {
    let filtered = [...acceptedPapers];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(paper => 
        paper.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.conference?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply range filter
    if (rangeFrom || rangeTo) {
      filtered = filtered.filter(paper => {
        const score = paper.score || 0;
        const from = rangeFrom ? parseFloat(rangeFrom) : -Infinity;
        const to = rangeTo ? parseFloat(rangeTo) : Infinity;
        return score >= from && score <= to;
      });
    }

    // Sort by score
    filtered.sort((a, b) => {
      if (sortOrder === 'highest') {
        return (b.score || 0) - (a.score || 0);
      } else {
        return (a.score || 0) - (b.score || 0);
      }
    });

    // Apply limit
    if (resultLimit && parseInt(resultLimit) > 0) {
      filtered = filtered.slice(0, parseInt(resultLimit));
    }

    return filtered;
  };

  const filteredPapers = getFilteredPapers();

  return (
    <div className='lg:ml-64 pt-16 lg:pt-0 '>
      {/* Analytics Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mt-5'>
        <Analytics title='Total Researchers' number='100'/>
        <Analytics title='Total Papers' number='25'/>
        <Analytics title='Topics' number='10'/>
        <Analytics title='Attended Conferences' number='5'/>
      </div>

      {/* Search Bar and Filter */}
      <div className='px-6 mt-6'>
        <div className='flex gap-3 items-center'>
          {/* Search Bar */}
          <div className='flex-1 relative'>
            <input
              autoFocus
              type='text'
              placeholder='Search by title, author, topic, or conference...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 transition-colors'
            />
            <svg 
              className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400'
              fill='none' 
              stroke='currentColor' 
              viewBox='0 0 24 24'
            >
              <path 
                strokeLinecap='round' 
                strokeLinejoin='round' 
                strokeWidth={2} 
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' 
              />
            </svg>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className='px-6 py-3 lg:bg-gradient-to-b lg:from-slate-900 lg:to-slate-800 lg:shadow-2xl lg:z-40 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 whitespace-nowrap'
          >
            <svg 
              className='w-5 h-5' 
              fill='none' 
              stroke='currentColor' 
              viewBox='0 0 24 24'
            >
              <path 
                strokeLinecap='round' 
                strokeLinejoin='round' 
                strokeWidth={2} 
                d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' 
              />
            </svg>
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className='mt-4 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-semibold text-gray-800'>Filter Options</h3>
              <button
                onClick={() => {
                  setSortOrder('highest');
                  setResultLimit('');
                  setRangeFrom('');
                  setRangeTo('');
                }}
                className='px-3 py-1 text-sm text-blue-900 hover:text-white hover:bg-blue-900 border border-blue-900 rounded-lg transition-colors'
              >
                Clear Filters
              </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {/* Sort by Score */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-gray-700'>Sort by Score</label>
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600'
                >
                  <option value='highest'>Highest Score </option>
                  <option value='lowest'>Lowest Score </option>
                </select>
              </div>

              {/* Limit Results */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-gray-700'>Limit Results</label>
                <input
                  type='number'
                  placeholder='Enter number of results'
                  value={resultLimit}
                  onChange={(e) => setResultLimit(e.target.value)}
                  min='1'
                  className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600'
                />
              </div>

              {/* Range Between */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-gray-700'>Range Between</label>
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    placeholder='From'
                    value={rangeFrom}
                    onChange={(e) => setRangeFrom(e.target.value)}
                    step='0.1'
                    className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600'
                  />
                  <span className='text-gray-500 font-medium'>to</span>
                  <input
                    type='number'
                    placeholder='To'
                    value={rangeTo}
                    onChange={(e) => setRangeTo(e.target.value)}
                    step='0.1'
                    className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600'
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='space-y-4 px-6 mt-6'>
        {filteredPapers.length > 0 ? (
          filteredPapers.map((paper, index) => (
            <ResearchCard
              key={index}
              title={paper.title} 
              titleUrl={paper.pdfUrl}
              authors={paper.authors}
              abstract={paper.abstract}
              affiliation={paper.affiliation}
              topic={paper.topic}
              status={paper.acceptanceStatus}
              reviewer={paper.reviewer}
              score={paper.score}
              year={paper.year}
              conference={paper.conference}
              RevisionCount={paper.RevisionCount}
            />
          ))
        ) : (
          <div className='text-center py-10 text-gray-500'>
            No papers found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;