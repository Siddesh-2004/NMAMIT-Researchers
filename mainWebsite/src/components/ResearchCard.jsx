import React, { useState } from "react";
import axios from "../api/axios.config";
import { toast } from "react-hot-toast";

const ResearchCard = ({
  title = "Deep Learning Approaches for Natural Language Processing",
  titleUrl = "#",
  authors = "John Smith, Jane Doe, Robert Johnson",
  affiliation = "Stanford University",
  affiliationUrl = "#",
  topic = "Machine Learning",
  reviewer = "Dr. Emily Chen",
  score ,
  conference = "NeurIPS 2024",
  abstract = "This paper presents novel deep learning approaches for natural language processing tasks. We introduce a new architecture that combines transformer models with attention mechanisms to achieve state-of-the-art results on multiple benchmarks. Our experiments demonstrate significant improvements over existing methods in both accuracy and computational efficiency.",
  RevisionCount = 10,
  status = "In-Revision",
  suggestions = "Please improve the methodology section and add more experimental results. The literature review needs to be expanded to include recent works from 2024.",
}) => {
  const [showAbstract, setShowAbstract] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  

  return (
    <div className="bg-white border-2 border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
   

      {/* Title and Update Status Button */}
      <div className="mb-4 flex items-center justify-between">
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
      {
        authors.map((author,index)=>(
         <span key={index}>
          {author.fullName}{"-"}{author.affiliation}{" • "}
         </span>
        ))
      }
      </p>
      </div>

      {/* Topic, Reviewer and Score */}
      <div className="mb-4">
        <p className="text-gray-600">
          <span className="font-medium">Topic:</span> {topic}
          {" • "}
          <span className="font-medium">Reviewer:</span> {reviewer.reviewerName}
          {" • "}
           {score!=0 && score &&  <span className="font-medium">Score: {score}/10</span>}
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
            console.log(status),
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