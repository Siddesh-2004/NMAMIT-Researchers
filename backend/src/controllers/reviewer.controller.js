import ReviewerModel from "../models/reviewer.model.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiError from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiResponse.js";

const addReviewer =asyncHandler(async(req,res)=>{
    const {reviewerName,qualification} = req.body;
    if(!reviewerName || !qualification){
        throw new ApiError(400,"Invalid request body");
    }
    const newReviewer = await ReviewerModel.create({reviewerName,qualification});
    if(!newReviewer){
        throw new ApiError(500,"Failed to create reviewer");
    }
    return res.status(200).json(new ApiResponse(newReviewer,"Reviewer added successfully",200));
});

 const deleteReviewer = asyncHandler(async(req,res)=>{
     const {reviewerId} = req.body;
     if(!reviewerId){
         throw new ApiError(400,"Invalid request body");
     }
     const deletedReviewer = await ReviewerModel.findByIdAndDelete(reviewerId);
     if(!deletedReviewer){
         throw new ApiError(500,"Reviewer not found");
     }
     return res.status(200).json(new ApiResponse(deletedReviewer,"Reviewer deleted successfully",200));
 });

 export {addReviewer,deleteReviewer};
