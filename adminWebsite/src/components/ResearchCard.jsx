import React, { useState } from "react";

const ResearchCard = ({
  title = "Deep Learning Approaches for Natural Language Processing",
  titleUrl = "#",
  authors = "John Smith, Jane Doe, Robert Johnson",
  affiliation = "Stanford University",
  affiliationUrl = "#",
  topic = "Machine Learning",
  reviewer = "Dr. Emily Chen",
  score = 4.5,
  conference = "NeurIPS 2024",
  abstract = "This paper presents novel deep learning approaches for natural language processing tasks. We introduce a new architecture that combines transformer models with attention mechanisms to achieve state-of-the-art results on multiple benchmarks. Our experiments demonstrate significant improvements over existing methods in both accuracy and computational efficiency.",
  RevisionCount =10,
  status = "Accepted",
}) => {
  const [showAbstract, setShowAbstract] = useState(false);

  return (
    <div className="bg-white border-2 border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      {/* Title */}
      <div className="mb-4">
        <a
          href={titleUrl}
          className="text-xl font-semibold text-blue-600 hover:text-blue-800 hover:underline"
        >
          {title}
        </a>
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
          {
            score &&
          <span className="font-medium">Score: {score}/10</span>
          }
        </p>
      </div>

      {/* Abstract Button and Conference */}
      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={() => setShowAbstract(!showAbstract)}
          className="px-4 py-2 lg:bg-gradient-to-b lg:from-slate-900 lg:to-slate-800 lg:shadow-2xl lg:z-40 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {showAbstract ? "Hide Abstract" : "Abstract"}
        </button>

        <p className="text-gray-600 font-medium">{conference}</p>

        {RevisionCount && <p>Revison Count: {RevisionCount}</p>}
        {status && <p>{status}</p>}
      </div>

      {/* Abstract Content */}
      {showAbstract && (
        <div className="mt-4 pt-4 border-t-2 border-gray-200 rounded-b-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Abstract</h3>
          <p className="text-gray-700 leading-relaxed">{abstract}</p>
        </div>
      )}
    </div>
  );
};

export default ResearchCard;
