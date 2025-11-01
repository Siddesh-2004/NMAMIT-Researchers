import mongoose from 'mongoose';
const reviewerSchema = new mongoose.Schema({
    reviwerName:{
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
});
const ReviewerModel = mongoose.model('Reviewer', reviewerSchema);
export default ReviewerModel;