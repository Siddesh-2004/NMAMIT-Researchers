import asyncHandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiResponse.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  path: "/",
};
const signUpUser = asyncHandler(async (req, res) => {
  const { userName, email, fullName, phoneNumber, password, affiliation } = req.body;
  if (!userName || !email || !fullName || !phoneNumber || !password || !affiliation) {
    throw new ApiError(400, "Invalid request body");
  }
  const user = await UserModel.findOne({ 
    $or:[
        {userName:userName},
        {email:email},
        {phoneNumber:phoneNumber}
    ]
  });
  if (user) {
    throw new ApiError(400, "Username already exists");
  }
  const newUser = await UserModel.create({
    userName,
    email,
    fullName,
    phoneNumber,
    password,
    affiliation,
  });
  if (!newUser) {
    throw new ApiError(500, "Failed to create user");
  }
  const accessToken = jwt.sign({ username: userName }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h",
  });
  if (!accessToken) {
    throw new ApiError(500, "Failed to generate access token");
  }
  return res
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .status(200)
    .json(new ApiResponse(newUser, "Signup successful", 200));
});