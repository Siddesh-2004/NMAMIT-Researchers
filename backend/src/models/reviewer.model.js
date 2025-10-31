import mongoose from 'mongoose';
const reviewerSchema = new mongoose.Schema({});
const ReviewerModel = mongoose.model('Reviewer', reviewerSchema);
export default ReviewerModel;