import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    totalClasses: {
      type: Number,
      required: true,
    },
    attendedClasses: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Virtual property to compute percentage dynamically
attendanceSchema.virtual("percentage").get(function () {
  if (this.totalClasses === 0) return 0;
  return ((this.attendedClasses / this.totalClasses) * 100).toFixed(2);
});

// Include virtual in JSON output
attendanceSchema.set("toJSON", { virtuals: true });
attendanceSchema.set("toObject", { virtuals: true });

export default mongoose.model("Attendance", attendanceSchema);
