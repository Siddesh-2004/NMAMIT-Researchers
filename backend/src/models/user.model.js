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
        lowercase: true,
    },
    affiliation:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 100,
    },
});
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
        