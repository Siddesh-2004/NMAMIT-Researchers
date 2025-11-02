import mongoose from 'mongoose';
const reviewerSchema = new mongoose.Schema({
    reviewerName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },
    qualification:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },
    paperIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Paper',
    }],
});
const ReviewerModel = mongoose.model('Reviewer', reviewerSchema);
export default ReviewerModel;