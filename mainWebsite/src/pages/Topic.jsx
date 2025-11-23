import React from 'react'
import { useState,useEffect } from 'react';
import TopicCard from '../components/TopicCard';
import axios from "../api/axios.config";

function Topic() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [AllTopics, setAllTopics] = useState([]);
  const [sortBySubmissions, setSortBySubmissions] = useState('');
  const [limit, setLimit] = useState('');

  useEffect(() => {
    const getAllTopics = async () => {
      try {
        console.log("Fetching Topics Info ...");
        const response = await axios.get('/topic/getAllTopics');
        setAllTopics(response.data.data);
        console.log(AllTopics);
      } catch (error) {
        console.error("Error fetching topics info:", error);
      }
    }
    getAllTopics();
  }, []);

  // Filter and sort topics
  const filteredAndSortedTopics = () => {
    let result = [...AllTopics];

    // Apply search filter
    if (searchQuery) {
      result = result.filter((topic) => {
        const topicName = topic.topicName?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        return topicName.includes(query);
      });
    }

    // Apply sorting by total submissions
    if (sortBySubmissions) {
      result.sort((a, b) => {
        const aValue = a.paperCount ?? 0;
        const bValue = b.paperCount ?? 0;

        if (sortBySubmissions === 'highest') {
          return bValue - aValue; // Highest to Lowest
        } else if (sortBySubmissions === 'lowest') {
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

  const displayedTopics = filteredAndSortedTopics();

  return (
    <div className='lg:ml-64 pt-16 lg:pt-0 '>
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

        {/* Filter Panel (optional - shows when filter button is clicked) */}
        {showFilters && (
          <div className='mt-4 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg'>
            <h3 className='font-semibold text-gray-800 mb-3'>Filter Options</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Sort By Total Submissions
                </label>
                <select 
                  value={sortBySubmissions}
                  onChange={(e) => setSortBySubmissions(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600'
                >
                  <option value=''>None</option>
                  <option value='highest'>Highest </option>
                  <option value='lowest'>Lowest </option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Limit
                </label>
                <input
                  type='number'
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600'
                  placeholder='Enter number of topics to display'
                  min='1'
                />
              </div>
            </div>
          </div>
        )}
        <div className='m-4 space-y-4  flex flex-col justify-center items-center'>

          {displayedTopics.length > 0 ? (
            displayedTopics.map((topic) => (
              <TopicCard
                key={topic._id}
                topicName={topic.topicName}
                totalSubmissions={topic.paperCount}
                acceptanceRate={
                  topic.AcceptanceRate > 0
                    ? `${topic.AcceptanceRate.toFixed(1)}%`
                    : "0%"
                }
              />
            ))
          ) : (
            <p className="text-gray-500">No topics available</p>
          )}
        </div>
      </div>

    </div>
  )
}

export default Topic