import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiError from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiResponse.js";

const getAllAuthors = asyncHandler(async (req, res) => {
    const authors = await UserModel.aggregate([
        {
            $lookup: {
                from: "papers",
                localField: "_id",
                foreignField: "authors",
                as: "papers",
            },
        },
        {
            $addFields: {
                acceptedPapers: {
                    $filter: {
                        input: "$papers",
                        as: "paper",
                        cond: { $eq: ["$$paper.acceptanceStatus", "Accepted"] }
                    }
                },
                activePapers: {
                    $filter: {
                        input: "$papers",
                        as: "paper",
                        cond: { $ne: ["$$paper.acceptanceStatus", "Accepted"] }
                    }
                }
            }
        },
        {
            $addFields: {
                PublishedPapers: { $size: "$acceptedPapers" },
                ActivePapers: { $size: "$activePapers" },
            },
        },
        {
            $match: {
                PublishedPapers: { $gt: 0 }
            }
        },
        { 
            $sort: { PublishedPapers: -1 }
        },
        {
            $project: {
                _id: 1,  // Include author ID
                userName: 1,  // Include username
                fullName: 1,  // Include full name
                email: 1,  // Include email (optional)
                PublishedPapers: 1,  // Include PublishedPapers count
                ActivePapers: 1,  // Include ActivePapers count
            }
        }
    ]);

    if (!authors || authors.length === 0) {
        throw new ApiError(404, "No authors found with published papers");
    }

    return res
        .status(200)
        .json(new ApiResponse(authors, "Authors fetched successfully", 200));
});

export { getAllAuthors };