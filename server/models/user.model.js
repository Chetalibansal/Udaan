import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String }, // Only if using JWT auth
    OAuthProvider: { type: String }, // e.g., 'google'
    OAuthId: { type: String }, // For OAuth
    role: {
      type: String,
      enum: ["student/parent", "teacher/mentor", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
