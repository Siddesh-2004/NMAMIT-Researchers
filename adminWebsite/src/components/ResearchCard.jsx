import React, { useState } from "react";

const ResearchCard = ({
  title = "Deep Learning Approaches for Natural Language Processing",
  titleUrl = "#",
  authors = ["John Smith, Jane Doe, Robert Johnson"],
  affiliation = "Stanford University",
  affiliationUrl = "#",
  topic = "Machine Learning",
  reviewer = "Dr. Emily Chen",
  score ,
  conference = "NeurIPS 2024",
  abstract = "This paper presents novel deep learning approaches for natural language processing tasks. We introduce a new architecture that combines transformer models with attention mechanisms to achieve state-of-the-art results on multiple benchmarks. Our experiments demonstrate significant improvements over existing methods in both accuracy and computational efficiency.",
  RevisionCount = 10,
  status = "InReview",
  suggestions = "Please improve the methodology section and add more experimental results. The literature review needs to be expanded to include recent works from 2024.",
}) => {
  const [showAbstract, setShowAbstract] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [scoreInput, setScoreInput] = useState("");
  const [conferenceName, setConferenceName] = useState("");
  const [acceptanceYear, setAcceptanceYear] = useState("");
  const [revisionComments, setRevisionComments] = useState("");

  const handleStatusSelect = (statusType) => {
    setSelectedStatus(statusType);
    setScoreInput("");
    setConferenceName("");
    setAcceptanceYear("");
    setRevisionComments("");
  };

  const handleSubmit = () => {
    if (selectedStatus === "Accepted" && scoreInput && conferenceName && acceptanceYear) {
      console.log("Accepted with score:", scoreInput);
      console.log("Conference:", conferenceName);
      console.log("Year:", acceptanceYear);
      // Add your submit logic here
    } else if (selectedStatus === "Revision" && revisionComments) {
      console.log("Revision with comments:", revisionComments);
      // Add your submit logic here
    }
    // Reset and close
    setShowUpdateStatus(false);
    setSelectedStatus(null);
    setScoreInput("");
    setConferenceName("");
    setAcceptanceYear("");
    setRevisionComments("");
  };
console.log(score);
  return (
    <div className="bg-white border-2 border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      {/* Update Status Button - Only visible if status is In-Review */}
      {/* Update Status Modal/Box */}
      {showUpdateStatus && (
        <div className="mb-6 p-4 border-2 border-blue-300 rounded-lg bg-blue-50">
          <h3 className="font-semibold text-gray-800 mb-3">Update Paper Status</h3>
          
          {/* Status Selection Buttons */}
          {!selectedStatus && (
            <div className="flex gap-3">
              <button
                onClick={() => handleStatusSelect("Accepted")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Accepted
              </button>
              <button
                onClick={() => handleStatusSelect("Revision")}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                Revision
              </button>
              <button
                onClick={() => setShowUpdateStatus(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Score Input for Accepted */}
          {selectedStatus === "Accepted" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Score (0-10)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={scoreInput}
                onChange={(e) => setScoreInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-3"
                placeholder="e.g., 8.5"
              />
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Conference Name
              </label>
              <input
                type="text"
                value={conferenceName}
                onChange={(e) => setConferenceName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-3"
                placeholder="e.g., NeurIPS, ICML, CVPR"
              />
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Year of Acceptance
              </label>
              <input
                type="number"
                min="2000"
                max="2030"
                value={acceptanceYear}
                onChange={(e) => setAcceptanceYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-3"
                placeholder="e.g., 2024"
              />
              
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={!scoreInput || !conferenceName || !acceptanceYear}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
                <button
                  onClick={() => setSelectedStatus(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {/* Textarea for Revision */}
          {selectedStatus === "Revision" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Revision Comments
              </label>
              <textarea
                value={revisionComments}
                onChange={(e) => setRevisionComments(e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-3"
                placeholder="Enter revision comments and feedback..."
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={!revisionComments.trim()}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
                <button
                  onClick={() => setSelectedStatus(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Title and Update Status Button */}
      <div className="mb-4 flex items-ceflnter justify-between">
        <a
          href={titleUrl}
          className="text-xl font-semibold text-blue-600 hover:text-blue-800 hover:underline"
        >
          {title}
        </a>
        {status === "InReview" && !score && score==0&&(
          <button
            onClick={() => setShowUpdateStatus(!showUpdateStatus)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Update Status
          </button>
        )}
      </div>

      {/* Authors and Affiliation */}
      <div className="mb-4">
        <p className="text-gray-700">
          <span className="font-medium">{authors}</span>
          {" • "}
          <a
            href={affiliationUrl}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {affiliation}
          </a>
        </p>
      </div>

      {/* Topic, Reviewer and Score */}
      <div className="mb-4">
        <p className="text-gray-600">
          <span className="font-medium">Topic:</span> {topic}
          {" • "}
          <span className="font-medium">Reviewer:</span> {reviewer}
          {" • "}
          {score && <span className="font-medium">Score: {score}/10</span>}
        </p>
      </div>

      {/* Abstract Button, Conference, Revision Count, and Suggestions Button */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAbstract(!showAbstract)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            {showAbstract ? "Hide Abstract" : "Abstract"}
          </button>
          
        </div>
        <p className="text-gray-600">Revision Count: {RevisionCount}</p>
        <div className="flex items-center gap-4">
        {status=="Accepted" &&
          <p className="text-gray-600 font-medium">{conference}</p>}
          {status === "In-Revision" && (
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              {showSuggestions ? "Hide Suggestions" : "Suggestions"}
            </button>
          )}
        </div>
      </div>

      {/* Abstract Content */}
      {showAbstract && (
        <div className="mt-4 pt-4 border-t-2 border-gray-200 rounded-b-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Abstract</h3>
          <p className="text-gray-700 leading-relaxed">{abstract}</p>
        </div>
      )}

      {/* Suggestions Content */}
      {showSuggestions && (
        <div className="mt-4 pt-4 border-t-2 border-yellow-200 rounded-b-lg bg-yellow-50 p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Reviewer Suggestions</h3>
          <p className="text-gray-700 leading-relaxed">{suggestions}</p>
        </div>
      )}
    </div>
  );
};

export default ResearchCard;