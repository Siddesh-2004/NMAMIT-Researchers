import TopicModel from "../models/topic.model.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiError from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiResponse.js";
import PaperModel from "../models/paper.model.js"



const getTopicAllTopics = asyncHandler(async (req, res) => {
    const topics = await TopicModel.find().lean(); // Add .lean()
    
    if(!topics || topics.length === 0){
        throw new ApiError(500, "Failed to fetch topics");
    }
    
    for(let i = 0; i < topics.length; i++){
        const acceptedPaperInTopic = await PaperModel.find({
            topic: topics[i].topicName,
            acceptanceStatus: "Accepted"
        });
        
        topics[i].AcceptanceRate = (acceptedPaperInTopic.length / topics[i].paperCount) * 100;
        console.log("AcceptanceRate", topics[i].AcceptanceRate);
    }
    
    return res.status(200).json(
        new ApiResponse(topics, "Topics fetched successfully", 200)
    );
});

export { getTopicAllTopics };