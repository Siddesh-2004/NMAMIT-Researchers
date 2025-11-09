import asyncHandler from "../utils/asynchandler.js";
import  ApiError  from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiResponse.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  path: "/",
};
const signUpUser = asyncHandler(async (req, res) => {
  const { userName, email, fullName, phoneNumber, password, affiliation } =
    req.body;
  if (
    !userName ||
    !email ||
    !fullName ||
    !phoneNumber ||
    !password ||
    !affiliation
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await UserModel.findOne({
    $or: [
      { userName: userName },
      { email: email },
      { phoneNumber: phoneNumber },
    ],
  });
  if (user) {
    throw new ApiError(400, "User already exists with same details");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    userName,
    email,
    fullName,
    phoneNumber,
    password: hashedPassword,
    affiliation,
  });
  if (!newUser) {
    throw new ApiError(500, "Failed to create user");
  }
  const accessToken = jwt.sign(
    { username: userName },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h",
    }
  );
  if (!accessToken) {
    throw new ApiError(500, "Failed to generate access token");
  }
  return res
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .status(200)
    .json(new ApiResponse(newUser, "Signup successful", 200));
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Username and password are required");
  }
  const user = await UserModel.findOne({ email });
  console.log(user);
  if (!user) {
    throw new ApiError(401, "Invalid userNasfdsfsme or password");
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid userName or password");
  }
  const accessToken = jwt.sign(
    { username: user.userName },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h",
    }
  );
  if (!accessToken) {
    throw new ApiError(500, "Failed to generate access token");
  }
  return res
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .status(200)
    .json(new ApiResponse(user, "Login successful", 200));
});
const logoutUser = asyncHandler(async (req, res) => {
  console.log("cookies before logging out", req.cookies);
  return res
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .status(200)
    .json(new ApiResponse(null, "Logout successful", 200));
});
const verifyJwtUser=asyncHandler(async(req,res)=>{
    console.log(req.cookies);
    const accessToken=req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ", "");
    if(!accessToken){
        throw new ApiError(401,"Please Login")
    }
    const decodedToken=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    const user=await UserModel.findOne({userName:decodedToken.username});
    if(!user){
        throw new ApiError(401,"Invalid AccessToken");
    }
    res.status(200).json(new ApiResponse(user,"Auto Login Successful",200));
});

const getUserByUserName=asyncHandler(async(req,res)=>{
  const userName=req.body.userName;
  if(!userName){
    throw new ApiError(400,"UserName is required");
  }
  const user=await UserModel.findOne({userName});
  if(!user){
    throw new ApiError(404,"User not found");
  }
  return res.status(200).json(new ApiResponse(user,"User fetched successfully",200));
});
const getCurrentUser=asyncHandler(async(req,res)=>{
  const accessToken=req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ", "");
  if(!accessToken){
      throw new ApiError(401,"Please Login")
  }
  const decodedToken=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
  const user=await UserModel.findOne({userName:decodedToken.username});
  if(!user){
      throw new ApiError(401,"Invalid AccessToken");
  }
  return res.status(200).json(new ApiResponse(user,"User fetched successfully",200));
});




export { signUpUser, loginUser, logoutUser,verifyJwtUser,getUserByUserName,getCurrentUser};

