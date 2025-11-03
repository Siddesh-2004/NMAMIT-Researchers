import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true,
        length:10,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    affiliation:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 100,
    },
    paperIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Paper',
    }],
});
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
        