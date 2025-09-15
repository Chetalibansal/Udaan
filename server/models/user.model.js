import bcrypt from "bcryptjs";
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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})



export default mongoose.model("User", userSchema);
