import mongoose  from "mongoose";
const teamSchema = new mongoose.Schema({
    authorsIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }],
    paperId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Paper',
        required:true,
    },
    
});
const TeamModel = mongoose.model('Team', teamSchema);
export default TeamModel;