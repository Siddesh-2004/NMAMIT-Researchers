import { uploadOnCloudinary } from "../services/cloundinary.service.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiError from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiResponse.js";
import PaperModel from "../models/paper.model.js";
import ReviewerModel from "../models/reviewer.model.js";
const addPaper = asyncHandler(async (req, res) => {
  const { title, abstract, keywords, authors ,topic} = req.body;
  if (!title || !abstract || !keywords || !authors || !topic) {
    throw new ApiError(400, "All fields are required");
  }
  console.log("hai");
  console.log(req.file);
  const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
  console.log(cloudinaryResponse);
  console.log("hai")

  if (!cloudinaryResponse) {
    throw new ApiError(500, "Failed to upload on cloudinary");
  }
  const pdfUrl = cloudinaryResponse.secure_url;
  const lowestPapersReviewer = await ReviewerModel.aggregate([
    { $addFields: { paperCount: { $size: "$paperIds" } } },
    { $sort: { paperCount: 1 } },
    { $limit: 1 },
  ]);
  const reviewerId = lowestPapersReviewer[0]._id;
  const keywordsArray = keywords.split(',');
  console.log(keywordsArray);
  const lowestPapersReviewerId = lowestPapersReviewer[0]._id;
  const newPaper = await PaperModel.create({
    title,
    abstract,
    keywords: keywordsArray,
    authors,
    reviwerId: lowestPapersReviewerId,
    pdfUrl,
    topic,
  });
  if (!newPaper) {
    throw new ApiError(500, "Failed to create paper");
  }
  const updatedReviewer=await ReviewerModel.findByIdAndUpdate(reviewerId,{$push:{paperIds:newPaper._id}},{new:true});

  if(!updatedReviewer){
    throw new ApiError(500,"Failed to update reviewer");
  }
  return res
    .status(200)
    .json(new ApiResponse({newPaper,updatedReviewer},"Paper added successfully", 200));
});


const getInReviewPapers = asyncHandler(async (req, res) => {
  const papersInReview = await PaperModel.aggregate([
  {
    $match: {
      acceptanceStatus: "InReview"
    }
  },
  {
    $lookup: {
      from: "users", // MongoDB collection name (lowercase plural)
      localField: "authors",
      foreignField: "_id",
      as: "authorDetails"
    }
  },
  {
    $lookup: {
      from: "reviewers", // MongoDB collection name (lowercase plural)
      localField: "reviwerId",
      foreignField: "_id",
      as: "reviewerDetails"
    }
  },
  {
    $unwind: {
      path: "$reviewerDetails",
      preserveNullAndEmptyArrays: true // In case some papers don't have a reviewer yet
    }
  },
  {
    $project: {
      title: 1,
      topic: 1,
      conference: 1,
      year: 1,
      abstract: 1,
      keywords: 1,
      score: 1,
      revisionCount: 1,
      acceptanceStatus: 1,
      review: 1,
      pdfUrl: 1,
      authors: {
        $map: {
          input: "$authorDetails",
          as: "author",
          in: {
            _id: "$$author._id",
            fullName: "$$author.fullName",
            email: "$$author.email",
            affiliation: "$$author.affiliation"
          }
        }
      },
      reviewer: {
        _id: "$reviewerDetails._id",
        reviewerName: "$reviewerDetails.reviewerName",
        email: "$reviewerDetails.email",
        qualification: "$reviewerDetails.qualification"
      }
    }
  },
  {
    $sort: {
      year: -1 // Optional: sort by year descending
    }
  }
]);

console.log(papersInReview);
  if (!papersInReview || papersInReview.length === 0) {
    throw new ApiError(500, "They are no papers in review");
  }
  return res
  .status(200)
  .json(new ApiResponse(papersInReview, "Papers fetched successfully", 200));
});

const getAcceptedPapers = asyncHandler(async (req, res) => {
  const papers = await PaperModel.find({ acceptanceStatus: "Accepted" });
  if (!papers || papers.length === 0) {
    throw new ApiError(500, "They are no papers accepted");
  }
  return res
  .status(200)
  .json(new ApiResponse(papers, "Papers fetched successfully", 200));
});

const getInRevisionPapers = asyncHandler(async (req, res) => {
  const papers = await PaperModel.find({ acceptanceStatus: "InRevision" });
  if (!papers || papers.length === 0) {
    throw new ApiError(500, "They are no papers in revision");
  }
  return res
  .status(200)
  .json(new ApiResponse(papers, "Papers fetched successfully", 200));
});


const updateAcceptanceStatus = asyncHandler(async (req, res) => {
  const {score,acceptanceStatus,paperId,reviews} = req.body;
  let updatedPaper;
  if(!acceptanceStatus || !paperId){
    throw new ApiError(400,"Accepted status and paperId are required");

  }
  if(!score && acceptanceStatus=="Accepted"){
    throw new ApiError(400,"Score is required for making the paper Accepted");
  }
  if(score && score<0 || score>100){
    throw new ApiError(400,"Score should be between 0 and 100");
  }
  if(acceptanceStatus=="Accepted"){
    updatedPaper = await PaperModel.findByIdAndUpdate(paperId,{$set:{score,acceptanceStatus}},{new:true});
    if(!updatedPaper){
      throw new ApiError(500,"Failed to update paper");
    }
     return res
    .status(200)
    .json(new ApiResponse(updatedPaper,"Paper updated successfully to Accepted",200));
  } else if(acceptanceStatus=="InRevision"){
     if(!reviews){
       throw new ApiError(400,"Reviews are required for changing the acceptance status to InRevision");
     }
    let paperToUpdate= await PaperModel.findById(paperId);
    if(!paperToUpdate){
      throw new ApiError(400,"Paper not found");
    }
    let revisionCount=paperToUpdate.revisionCount+1;
    let updatedPaper = await PaperModel.findByIdAndUpdate(paperId,{$set:{score,acceptanceStatus,revisionCount,review:reviews}},{new:true});
    if(!updatedPaper){
      throw new ApiError(500,"Failed to update paper");
    }
    updatedPaper = await PaperModel.findByIdAndUpdate(paperId,{$set:{score,acceptanceStatus,review:reviews}},{new:true});
    if(!updatedPaper){
      throw new ApiError(500,"Failed to update paper");
    }
    return res
    .status(200)
    .json(new ApiResponse(updatedPaper,"Paper updated to InRevision successfully",200));
  }
});

const deletePaper = asyncHandler(async (req, res) => {
  const {paperId} = req.body;
  if(!paperId){
    throw new ApiError(400,"PaperId is required");
  }
  const deletedPaper = await PaperModel.findByIdAndDelete(paperId);
  if(!deletedPaper){
    throw new ApiError(500,"Failed to delete paper");
  }
  return res
  .status(200)
  .json(new ApiResponse(deletedPaper,"Paper deleted successfully",200));
});

export { addPaper ,getInReviewPapers,getAcceptedPapers,getInRevisionPapers,updateAcceptanceStatus,deletePaper};