import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateToken } from "../utils/generateToken.js";

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) throw new ApiError(400, "User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    
  });
  if (!user) throw new ApiError(500, "User creation failed");
  await user.save();
  
  const token = generateToken(user._id, user.role);

  res
    .status(201)
    .json(
      new ApiResponse(201, { user, token }, "User registered successfully")
    );
});

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(400, "Email and password required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const token = generateToken(user._id, user.role);

  res
    .status(200)
    .json(new ApiResponse(200, { token, user }, "User logged in successfully"));
});

// logout user
export const logoutUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});
