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
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    phoneNumber:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
    },

});
const ReviewerModel = mongoose.model('Reviewer', reviewerSchema);
export default ReviewerModel;