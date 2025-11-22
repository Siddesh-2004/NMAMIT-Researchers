import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true,
  },
  paperCount: {
    type: Number,
    default : 0,
  },
});

const TopicModel = mongoose.model("topic", TopicSchema);

export default TopicModel;