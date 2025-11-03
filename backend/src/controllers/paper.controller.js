//add paper
//change status
//delete paper
//asign reviewer
//asign score
import { uploadOnCloudinary } from "../services/cloundinary.service.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiError from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiResponse.js";
import PaperModel from "../models/paper.model.js";
import ReviewerModel from "../models/reviewer.model.js";
const addPaper = asyncHandler(async (req, res) => {
  const { title, abstract, keywords, authors } = req.body;
  if (!title || !abstract || !keywords || !authors) {
    throw new ApiError(400, "All fields are required");
  }
  const cloudinaryResponse = await uploadOnCloudinary(req.file);
  if (!cloudinaryResponse) {
    throw new ApiError(500, "Failed to upload on cloudinary");
  }
  const pdfUrl = cloudinaryResponse.secure_url;
  const lowestPapersReviewer = await ReviewerModel.aggregate([
    { $addFields: { paperCount: { $size: "$paperIds" } } },
    { $sort: { paperCount: 1 } },
    { $limit: 1 },
  ]);
  const lowestPapersReviewerId = lowestPapersReviewer[0]._id;
  const newPaper = await PaperModel.create({
    title,
    abstract,
    keywords,
    authors,
    reviwerId: lowestPapersReviewerId,
    pdfUrl,
  });
  if (!newPaper) {
    throw new ApiError(500, "Failed to create paper");
  }
  return res
    .status(200)
    .json(new ApiResponse(newPaper, "Paper added successfully", 200));
});

export { addPaper };
