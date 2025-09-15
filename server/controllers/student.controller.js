import Student from "../models/student.model.js";
import Attendance from "../models/attendance.model.js";
import Score from "../models/score.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";

// Get a single student with attendance % and average score
export const getStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [student, attendance, scores] = await Promise.all([
    Student.findById(id).populate("userId", "name email"),
    Attendance.findOne({ studentId: id }),
    Score.find({ studentId: id }),
  ]);
  if (!student) throw new ApiError(404, "Student not found");

  // Attendance
  const attendancePercentage = attendance
    ? parseFloat(attendance.percentage)
    : 0;

  // Average Score
  let avgScore = 0;
  if (scores.length > 0) {
    avgScore = scores.reduce((sum, s) => sum + s.marks, 0) / scores.length;
  }

  //   risk calculation
  let risk = "low"; // default risk

  if (
    attendancePercentage < 60 ||
    avgScore < 30 ||
    student.feeStatus === "unpaid"
  ) {
    risk = "high";
  } else if (attendancePercentage < 75 || avgScore < 40) {
    risk = "medium";
  } else if (attendancePercentage < 85 || avgScore < 75) {
    risk = "low";
  }

  res.status(200).json({
    student,
    attendance: attendancePercentage,
    averageScore: avgScore,
    riskLevel: risk,
  });
});

// Get all students with risk
export const getAllStudentsWithRisk = asyncHandler(async (req, res) => {
  const students = await Student.find().populate("userId", "name email");

  const studentsWithRisk = await Promise.all(
    students.map(async (student) => {
      const attendance = await Attendance.findOne({ studentId: student._id });
      const scores = await Score.find({ studentId: student._id });

      const attendancePercentage = attendance ? parseFloat(attendance.percentage) : 0;
      const avgScore =
        scores.length > 0
          ? scores.reduce((sum, s) => sum + s.marks, 0) / scores.length
          : 0;

      // Calculate risk dynamically (same as getStudentById)
      let risk = "low";
      if (attendancePercentage < 60 || avgScore < 30 || student.feeStatus === "unpaid") {
        risk = "high";
      } else if (attendancePercentage < 75 || avgScore < 40) {
        risk = "medium";
      } else if (attendancePercentage < 85 || avgScore < 75) {
        risk = "low";
      }

      return {
        _id: student._id,
        name: student.userId?.name || "Unknown",
        email: student.userId?.email || "Unknown",
        rollNo: student.rollNo,
        riskLevel: risk,
        attendancePercentage,
        feeStatus: student.feeStatus,
      };
    })
  );

  res.status(200).json({
    success: true,
    count: studentsWithRisk.length,
    students: studentsWithRisk,
  });
});
