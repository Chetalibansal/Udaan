import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rollNo: {
      type: String,
      required: true,
      unique: true,
    },
    class: String,
    section: String,
    feeStatus: {
      type: String,
      enum: ["paid", "unpaid", "partial"],
      default: "unpaid",
    },
    riskLevel: {
      type: String,
      enum: ["low", "medium", "high", null],
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
