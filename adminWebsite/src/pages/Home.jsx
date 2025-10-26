import React, { useState } from 'react';
import Analytics from '../components/AnalyticsCard';
import ResearchCard from '../components/ResearchCard';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
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

        {/* Filter Panel (optional - shows when filter button is clicked) */}
        {showFilters && (
          <div className='mt-4 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg'>
            <h3 className='font-semibold text-gray-800 mb-3'>Filter Options</h3>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Topic</label>
                <select className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600'>
                  <option value=''>All Topics</option>
                  <option value='ml'>Machine Learning</option>
                  <option value='ai'>Artificial Intelligence</option>
                  <option value='cv'>Computer Vision</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Year</label>
                <select className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600'>
                  <option value=''>All Years</option>
                  <option value='2024'>2024</option>
                  <option value='2023'>2023</option>
                  <option value='2022'>2022</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Conference</label>
                <select className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600'>
                  <option value=''>All Conferences</option>
                  <option value='neurips'>NeurIPS</option>
                  <option value='icml'>ICML</option>
                  <option value='cvpr'>CVPR</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Research Cards */}
      <div className='space-y-4 px-6 mt-6'>
        <ResearchCard status='Accepted' />
        <ResearchCard status='Accepted' />
        <ResearchCard status='Accepted' />
        <ResearchCard status='Accepted' />
        <ResearchCard status='Accepted' />
        <ResearchCard status='Accepted' />
        
      </div>
    </div>
  );
}

export default Home;

