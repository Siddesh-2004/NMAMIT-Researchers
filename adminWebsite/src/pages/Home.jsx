import React from 'react'
import Analytics from '../components/AnalyticsCard'

function Home() {
  return (
    
    <div className='lg:ml-64 pt-16 lg:pt-0'>
    <h1 className='text-6xl font-bold text-center bg-gradient-to-r from-slate-900 to-slate-800 text-white py-5 mb-3'>
    Welcome to NMAMIT Researchers</h1>
    {/* Analytics Section */}
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6'>
        <Analytics title='Total Researchers' number='100'/>
        <Analytics title='Total Papers' number='25'/>
        <Analytics title='Topics' number='10'/>
        <Analytics title='Attended Conferences' number='5'/>
    </div>
    
    </div>
  )
}

      


export default Home
