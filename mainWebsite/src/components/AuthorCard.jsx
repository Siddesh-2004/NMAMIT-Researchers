import React from 'react';

export default function AuthorCard({ author }) {
  // Default author data for demonstration
  const defaultAuthor = {
    name: "Dr. Riya Sharma",
    authorNumber: "AUTH-2024-001",
    email: "riya.sharma@univ.edu",
    phone: "+91 98765 43210",
    university: "ABC University",
    papersPublished: 8,
    activePapers: 3
  };
  
  const authorData = author || defaultAuthor;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      {/* Author Name */}
      <h2
        className="text-2xl md:text-3xl font-bold mb-6"
        style={{ color: '#001F3F' }}
      >
        {authorData.name}
      </h2>

      {/* Author Details Grid */}
      <div className="space-y-4">
        {/* Author Number */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span
            className="font-semibold text-sm md:text-base w-full sm:w-48 mb-1 sm:mb-0"
            style={{ color: '#001F3F' }}
          >
            Author Number:
          </span>
          <span className="text-gray-700 text-sm md:text-base">
            {authorData.authorNumber}
          </span>
        </div>

        {/* Email */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span
            className="font-semibold text-sm md:text-base w-full sm:w-48 mb-1 sm:mb-0"
            style={{ color: '#001F3F' }}
          >
            Email:
          </span>
          <span className="text-gray-700 text-sm md:text-base break-all">
            {authorData.email}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Papers Published */}
          <div className="flex flex-col">
            <span
              className="font-semibold text-sm md:text-base mb-1"
              style={{ color: '#001F3F' }}
            >
              Papers Published
            </span>
            <span
              className="text-2xl md:text-3xl font-bold"
              style={{ color: '#001F3F' }}
            >
              {authorData.papersPublished}
            </span>
          </div>

          {/* Active Papers */}
          <div className="flex flex-col">
            <span
              className="font-semibold text-sm md:text-base mb-1"
              style={{ color: '#001F3F' }}
            >
              Active Papers
            </span>
            <span
              className="text-2xl md:text-3xl font-bold"
              style={{ color: '#001F3F' }}
            >
              {authorData.activePapers}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}