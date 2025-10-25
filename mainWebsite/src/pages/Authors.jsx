import React, { useState } from 'react';
import { Mail, Building, FileText, Calendar, Search, Filter, X } from 'lucide-react';

export default function App() {
  // Mock authors with simplified data structure
  const [authors] = useState([
    {
      id: '1',
      fullName: 'Dr. Elara Vance',
      email: 'elara.vance@uni-global.edu',
      affiliation: 'Institute of Future Technologies, Global Research University',
      papers: [
        { 
          id: 'RT-2024-001', 
          title: 'Quantum Entanglement in Biological Systems: A New Paradigm', 
          submissionDate: '2024-08-15', 
          status: 'Accepted' 
        },
        { 
          id: 'RT-2024-002', 
          title: 'Neural Networks for Predictive Climate Modeling', 
          submissionDate: '2024-09-20', 
          status: 'Under Review' 
        },
        { 
          id: 'RT-2024-007', 
          title: 'Machine Learning Applications in Genomic Research', 
          submissionDate: '2024-10-05', 
          status: 'Submitted' 
        }
      ]
    },
    {
      id: '2',
      fullName: 'Prof. Marcus Chen',
      email: 'marcus.chen@tech-institute.org',
      affiliation: 'Department of Advanced Computing, MIT',
      papers: [
        { 
          id: 'RT-2024-003', 
          title: 'Quantum Computing: Breaking Classical Encryption Barriers', 
          submissionDate: '2024-07-10', 
          status: 'Accepted' 
        },
        { 
          id: 'RT-2024-004', 
          title: 'Post-Quantum Cryptography: Security in the Quantum Age', 
          submissionDate: '2024-08-25', 
          status: 'Submitted' 
        },
        { 
          id: 'RT-2024-005', 
          title: 'Optimization Algorithms for Large-Scale Data Processing', 
          submissionDate: '2024-10-01', 
          status: 'Rejected' 
        }
      ]
    },
    {
      id: '3',
      fullName: 'Dr. Sophia Rodriguez',
      email: 'sophia.rodriguez@research-hub.edu',
      affiliation: 'Center for Biomedical Innovation, Stanford University',
      papers: [
        { 
          id: 'RT-2024-006', 
          title: 'CRISPR-Cas9 Applications in Treating Genetic Disorders', 
          submissionDate: '2024-09-12', 
          status: 'Under Review' 
        },
        { 
          id: 'RT-2024-008', 
          title: 'Personalized Medicine: AI-Driven Treatment Protocols', 
          submissionDate: '2024-10-18', 
          status: 'Submitted' 
        }
      ]
    }
  ]);

  // Track selected author by ID
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Find the selected author object
  const selectedAuthor = authors.find(a => a.id === selectedAuthorId);

  // Filter authors based on search query
  const filteredAuthors = authors.filter(author =>
    author.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get status badge colors based on paper status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted': 
        return 'bg-[#001F3F] text-white';
      case 'Under Review': 
        return 'bg-yellow-500 text-gray-900';
      case 'Accepted': 
        return 'bg-green-600 text-white';
      case 'Rejected': 
        return 'bg-red-600 text-white';
      default: 
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-white lg:ml-64 pt-16 lg:pt-0">
      {/* Top Header with Navy Blue color */}
      <h1
          className="text-3xl md:text-4xl font-bold mb-8 lg:ml-50"
          style={{ color: '#001F3F' }}
        >
                Author's Details
        </h1>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Author List Section (Left Column) */}
          <div className={`${selectedAuthorId ? 'md:col-span-4' : 'md:col-span-12'}`}>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#001F3F' }}>
                Authors
              </h2>

              {/* Search and Filter Section */}
              <div className="mb-4 flex gap-2">
                <div className="flex-1 relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F3F] focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="px-4 py-2 bg-[#001F3F] text-white rounded-lg hover:bg-[#003366] transition-colors flex items-center gap-2"
                >
                  <Filter size={20} />
                  Filter
                </button>
              </div>

              {/* Filter Menu (if needed in future) */}
              {showFilterMenu && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">Filter options coming soon...</p>
                </div>
              )}

              {/* Scrollable author list */}
              <div className="space-y-4 max-h-[calc(100vh-380px)] overflow-y-auto">
                {filteredAuthors.map(author => (
                  <div
                    key={author.id}
                    onClick={() => setSelectedAuthorId(author.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAuthorId === author.id
                        ? 'border-[#001F3F] bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {author.fullName}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-start gap-2">
                      <Building size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{author.affiliation}</span>
                    </p>
                  </div>
                ))}
              </div>
              
            </div>
          </div>

          {/* Author Details Section (Right Column) - Only visible when an author is selected */}
          {selectedAuthorId && selectedAuthor && (
            <div className="md:col-span-8">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                
                {/* Header with Close Button */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: '#001F3F' }}>
                    Author Details
                  </h2>
                  <button
                    onClick={() => setSelectedAuthorId(null)}
                    // Updated class names for a themed look
                    className="p-2 rounded-full text-[#001F3F] hover:bg-blue-100 hover:text-[#001F3F] transition-colors"
                    aria-label="Close author details"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Essential Contact Information Card */}
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {selectedAuthor.fullName}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail size={20} className="text-[#001F3F] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Email</p>
                          <p className="text-gray-900">{selectedAuthor.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Building size={20} className="text-[#001F3F] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Affiliation</p>
                          <p className="text-gray-900">{selectedAuthor.affiliation}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Associated Papers Table */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2" style={{ color: '#001F3F' }}>
                      <FileText size={20} />
                      Associated Papers ({selectedAuthor.papers.length})
                    </h4>
                    
                    {selectedAuthor.papers.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                          <thead>
                            <tr className="bg-[#001F3F] text-white">
                              <th className="px-4 py-3 text-left border-r border-blue-800">Paper ID</th>
                              <th className="px-4 py-3 text-left border-r border-blue-800">Title</th>
                              <th className="px-4 py-3 text-left border-r border-blue-800">Submission Date</th>
                              <th className="px-4 py-3 text-left">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedAuthor.papers.map(paper => (
                              <tr key={paper.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-900 font-medium border-r border-gray-200">
                                  {paper.id}
                                </td>
                                <td className="px-4 py-3 text-gray-900 border-r border-gray-200">
                                  {paper.title}
                                </td>
                                <td className="px-4 py-3 text-gray-600 border-r border-gray-200">
                                  <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    {paper.submissionDate}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getStatusColor(paper.status)}`}>
                                    {paper.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic bg-gray-50 p-4 rounded-lg">
                        No papers associated with this author.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}