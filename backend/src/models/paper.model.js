import mongoose from 'mongoose';
const paperSchema = new mongoose.Schema({});
const PaperModel = mongoose.model('Paper', paperSchema);    
export default PaperModel;