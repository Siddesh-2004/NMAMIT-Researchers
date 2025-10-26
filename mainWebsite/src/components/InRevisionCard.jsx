import React from 'react';

export default function InRevisionCard({ paper }) {
  // Default paper data for demonstration
  const defaultPaper = {
    paperTitle: "Machine Learning Approaches for Climate Change Prediction",
    authorName: "Dr. Rajesh Kumar",
    university: "Indian Institute of Technology, Mumbai",
    branch: "Computer Science and Engineering",
    reviewerNumber: "REV-2024-015",
    currentStatus: "Awaiting Resubmission"
  };
  
  const paperData = paper || defaultPaper;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      {/* Paper Title */}
      <h2
        className="text-2xl md:text-3xl font-bold mb-6"
        style={{ color: '#001F3F' }}
      >
        {paperData.paperTitle}
      </h2>

      {/* Paper Details Section */}
      <div className="space-y-4">
        {/* Author Name */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span
            className="font-semibold text-sm md:text-base w-full sm:w-48 mb-1 sm:mb-0"
            style={{ color: '#001F3F' }}
          >
            Author Name:
          </span>
          <span className="text-gray-700 text-sm md:text-base">
            {paperData.authorName}
          </span>
        </div>

        {/* University / Institution */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span
            className="font-semibold text-sm md:text-base w-full sm:w-48 mb-1 sm:mb-0"
            style={{ color: '#001F3F' }}
          >
            University / Institution:
          </span>
          <span className="text-gray-700 text-sm md:text-base">
            {paperData.university}
          </span>
        </div>

        {/* Branch / Department */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span
            className="font-semibold text-sm md:text-base w-full sm:w-48 mb-1 sm:mb-0"
            style={{ color: '#001F3F' }}
          >
            Branch / Department:
          </span>
          <span className="text-gray-700 text-sm md:text-base">
            {paperData.branch}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Revision Information Section */}
        <h3
          className="font-semibold text-lg mb-3"
          style={{ color: '#001F3F' }}
        >
          Revision Information
        </h3>

        {/* Reviewer Number */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span
            className="font-semibold text-sm md:text-base w-full sm:w-48 mb-1 sm:mb-0"
            style={{ color: '#001F3F' }}
          >
            Reviewer Number:
          </span>
          <span className="text-gray-700 text-sm md:text-base">
            {paperData.reviewerNumber}
          </span>
        </div>

        {/* Current Status */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span
            className="font-semibold text-sm md:text-base w-full sm:w-48 mb-1 sm:mb-0"
            style={{ color: '#001F3F' }}
          >
            Current Status:
          </span>
          <span className="text-gray-700 text-sm md:text-base font-medium">
            {paperData.currentStatus}
          </span>
        </div>
      </div>
    </div>
  );
}