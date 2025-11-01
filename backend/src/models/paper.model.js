import mongoose from "mongoose";
const paperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
    lowercase: true,
  },
  conference: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    default:"Not Assigned",
  },
  year: {
    type: Number,
    required: true,
  },

  abstract: {
    type: String,
    required: true,
    trim: true,
    maxlength: 750,
    lowercase: true,
  },
  keywords: {
    type: [String],
    required: true,
    lowercase: true,
    trim: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  revisionCount: {
    type: Number,
    required: true,
    default: 0,
  },
  acceptanceStatus: {
    type: String,
    required: true,
    enum: ["Accepted", "InRevision", "InReview"],
    default: "InReview",
  },
 authorsIds:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Team',
    required:true,
}],
reviwerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Reviewer',
    required:true,
  }
});
const PaperModel = mongoose.model("Paper", paperSchema);
export default PaperModel;
