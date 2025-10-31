import mongoose  from "mongoose";
const teamSchema = new mongoose.Schema({});
const TeamModel = mongoose.model('Team', teamSchema);
export default TeamModel;