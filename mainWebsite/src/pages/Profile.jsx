import React, { useState,useEffect } from 'react';
import { Search, FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, LogOut } from 'lucide-react';
import axios from '../api/axios.config.js';
import toast from 'react-hot-toast';

export default function Profile({setIsLoggedIn}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  // const [papers, setPapers] = useState([]);
  // useEffect(() => {
  //     const getPapers = async () => {
  //       try{
  //         console.log("Fetching user's papers...");
  //         const response = await axios.get('/user/papers');

  //         const fetchedPapers = response.data.papers || response.data.data;
  //         // setfetchPapers(response.data.data);
  //         setPapers(fetchedPapers);
  //               console.log("Successfully fetched papers count:", fetchedPapers.length);
  //       }catch(error){
  //         console.error("Error fetching review papers:", error);
  //       }
  //     }
  //     getPapers();
  //   }, []);
  //   console.log("Rendered review papers:", papers);

  

  // User profile data
  const userProfile = {
    name: 'Dr. Riya Sharma',
    email: 'riya.sharma@univ.edu',
    institution: 'Indian Institute of Technology',
    department: 'Computer Science & Engineering',
    contact: '+91 98765 43210'
  };

   // Research papers data
  const papers = [
    { id: 1, title: 'Machine Learning Applications in Climate Change Prediction', submissionDate: '2024-09-15', status: 'accepted' },
    { id: 2, title: 'Quantum Computing: A Comprehensive Review', submissionDate: '2024-10-01', status: 'under-review' },
    { id: 3, title: 'Blockchain Technology in Healthcare Systems', submissionDate: '2024-08-20', status: 'in-revision' },
    { id: 4, title: 'Neural Networks for Image Recognition', submissionDate: '2024-07-10', status: 'accepted' },
    { id: 5, title: 'Cybersecurity Challenges in IoT Devices', submissionDate: '2024-06-05', status: 'rejected' },
    { id: 6, title: 'Artificial Intelligence in Medical Diagnosis', submissionDate: '2024-10-20', status: 'under-review' },
    { id: 7, title: 'A New Method for High-Dimensional Data Clustering', submissionDate: '2024-05-10', status: 'accepted' },
    { id: 8, title: 'Ethical Implications of Generative AI Models', submissionDate: '2024-04-15', status: 'under-review' },
    { id: 9, title: 'Performance Optimization in Cloud Environments', submissionDate: '2024-03-22', status: 'in-revision' },
    { id: 10, title: 'Secure Multi-Party Computation Protocol', submissionDate: '2024-02-01', status: 'rejected' },
  ];

  // Status configuration
  const statusConfig = {
    'under-review': {
      label: 'Under Review',
      color: 'bg-gray-100 text-[#001F3F] border border-gray-300',
      icon: Clock
    },
    'in-revision': {
      label: 'In Revision',
      color: 'bg-gray-100 text-[#001F3F] border border-gray-300',
      icon: AlertCircle
    },
    'accepted': {
      label: 'Accepted',
      color: 'bg-gray-100 text-[#001F3F] border border-gray-300',
      icon: CheckCircle
    },
    'rejected': {
      label: 'Rejected',
      color: 'bg-gray-100 text-[#001F3F] border border-gray-300',
      icon: XCircle
    }
  };

  // Filter and search papers
  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || paper.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const StatusBadge = ({ status }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const handleLogout = async () => {
      try {
        const response = await axios.post("/user/logout", {}, { withCredentials: true });
        if (response.data.success) {
          setIsLoggedIn(false);
          toast.success(response.data.message);
        }

        // toast.success("Logout successful");
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout failed");
      }
    } 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Layout */}
          <div className="grid grid-cols-1 gap-6">
            {/* Section 1: Profile */}
            <div className="space-y-6">
              {/* User Information Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold" style={{ color: '#001F3F' }}>
                    Profile Information
                  </h2>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:shadow-md"
                    style={{ backgroundColor: '#001F3F' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#003366'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#001F3F'}
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>

                <div className="space-y-4">
                  {Object.entries(userProfile).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                      <p className="text-gray-900 font-medium mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Research Papers */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 h-full flex flex-col">
                <h2 className="text-xl font-bold mb-6" style={{ color: '#001F3F' }}>
                  My Research Papers
                </h2>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 flex-shrink-0">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search papers by title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F]"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001F3F] focus:border-[#001F3F]"
                    style={{ minWidth: '150px' }}
                  >
                    <option value="all">All Status</option>
                    <option value="under-review">Under Review</option>
                    <option value="in-revision">In Revision</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Scrollable Paper List */}
                <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '600px' }}>
                  {/* Desktop Table */}
                  <div className="hidden md:block">
                    <table className="w-full">
                      <thead>
                        <tr className="text-white text-left sticky top-0 z-10" style={{ backgroundColor: '#001F3F' }}>
                          <th className="px-4 py-3 rounded-tl-lg font-semibold min-w-[300px]">Paper Title</th>
                          <th className="px-4 py-3 font-semibold text-center w-40">Submission Date</th>
                          <th className="px-4 py-3 rounded-tr-lg font-semibold text-center w-32">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPapers.map((paper, index) => (
                          <tr
                            key={paper.id}
                            className={`border-b border-gray-200 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                              }`}
                          >
                            <td className="px-4 py-4">
                              <div className="flex items-start gap-2">
                                <FileText size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                                <span className="font-medium text-gray-900">{paper.title}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Calendar size={16} className="text-gray-400" />
                                <span className="text-gray-700">
                                  {new Date(paper.submissionDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <StatusBadge status={paper.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {filteredPapers.map((paper) => (
                      <div key={paper.id} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
                        <div className="flex items-start gap-2 mb-3">
                          <FileText size={18} className="text-gray-500 mt-1 flex-shrink-0" />
                          <h3 className="font-semibold text-gray-900 flex-1">{paper.title}</h3>
                        </div>
                        <div className="space-y-2 text-sm pl-7">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Submitted:</span>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="text-gray-700 font-medium">
                                {new Date(paper.submissionDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-gray-600">Status:</span>
                            <StatusBadge status={paper.status} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* No Results */}
                  {filteredPapers.length === 0 && (
                    <div className="text-center py-12">
                      <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">No papers found</p>
                      <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}