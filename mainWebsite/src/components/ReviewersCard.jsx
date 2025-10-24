export default function ReviewerInfoCard({ reviewer }) {
  // Default reviewer data for demonstration
  const defaultReviewer = {
    name: "Dr. Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya.sharma@nmamit.in",
    averageScore: 4.7,
    papersReviewed: 23,
    qualification: "Ph.D. in Computer Science"
  };
  
  const reviewerData = reviewer || defaultReviewer;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      {/* Reviewer Name */}
      <h2
        className="text-2xl md:text-3xl font-bold mb-6"
        style={{ color: '#001F3F' }}
      >
        {reviewerData.name}
      </h2>

      {/* Reviewer Details Grid */}
      <div className="space-y-4">
        {/* Phone Number */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span
            className="font-semibold text-sm md:text-base w-full sm:w-48 mb-1 sm:mb-0"
            style={{ color: '#001F3F' }}
          >
            Phone Number:
          </span>
          <span className="text-gray-700 text-sm md:text-base">
            {reviewerData.phone}
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
            {reviewerData.email}
          </span>
        </div>

        {/* Qualification */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span
            className="font-semibold text-sm md:text-base w-full sm:w-48 mb-1 sm:mb-0"
            style={{ color: '#001F3F' }}
          >
            Qualification:
          </span>
          <span className="text-gray-700 text-sm md:text-base">
            {reviewerData.qualification}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Average Score */}
          <div className="flex flex-col">
            <span
              className="font-semibold text-sm md:text-base mb-1"
              style={{ color: '#001F3F' }}
            >
              Average Score
            </span>
            <div className="flex items-center">
              <span
                className="text-2xl md:text-3xl font-bold"
                style={{ color: '#001F3F' }}
              >
                {reviewerData.averageScore}
              </span>
              <span className="text-gray-500 text-sm ml-1">/5.0</span>
            </div>
          </div>

          {/* Papers Reviewed */}
          <div className="flex flex-col">
            <span
              className="font-semibold text-sm md:text-base mb-1"
              style={{ color: '#001F3F' }}
            >
              Papers Reviewed
            </span>
            <span
              className="text-2xl md:text-3xl font-bold"
              style={{ color: '#001F3F' }}
            >
              {reviewerData.papersReviewed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}