import React from 'react';

const TopicCard = ({ 
  topicName = "AI/ML",
  totalSubmissions = "45",
  acceptanceRate = "68%"
}) => {
  return (
    <div className="bg-white border-2 border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow w-3/4">
      {/* Topic Name */}
      <div className="mb-4 text-center pb-4 border-b-2 border-gray-200 ">
        <h2 className="text-2xl font-bold text-gray-800">
          {topicName}
        </h2>
      </div>

      {/* Total Submissions and Acceptance Rate */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Submissions */}
        <div className="p-4 lg:bg-gradient-to-b lg:from-slate-900 lg:to-slate-800 lg:shadow-2xl lg:z-40 border-2 border-gray-200 rounded-lg">
          <p className="text-white text-sm font-medium mb-2">
            Total Submissions
          </p>
          <p className="text-3xl font-bold text-blue-600">
            {totalSubmissions}
          </p>
        </div>

        {/* Acceptance Rate */}
        <div className="p-4 lg:bg-gradient-to-b lg:from-slate-900 lg:to-slate-800 lg:shadow-2xl lg:z-40 border-2 border-gray-200 rounded-lg">
          <p className="text-white text-sm font-medium mb-2">
            Acceptance Rate
          </p>
          <p className="text-3xl font-bold text-green-600">
            {acceptanceRate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;