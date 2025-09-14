import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Student from "./models/student.model.js";
import Attendance from "./models/attendance.model.js";
import Score from "./models/score.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hackathonDB";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected...");

    // Clear old data
    await Promise.all([
      User.deleteMany(),
      Student.deleteMany(),
      Attendance.deleteMany(),
      Score.deleteMany(),
    ]);
    console.log("🗑️ Old data cleared");

    // 1️⃣ Create Users (students, teacher, admin)
    const users = await User.insertMany([
      { name: "Aman Verma", email: "aman@student.com", role: "student/parent" },
      { name: "Neha Sharma", email: "neha@student.com", role: "student/parent" },
      { name: "Teacher One", email: "teacher@institute.com", role: "teacher/mentor" },
      { name: "Admin User", email: "admin@institute.com", role: "admin" },
    ]);

    // 2️⃣ Create Students linked to Users
    const students = await Student.insertMany([
      {
        userId: users[0]._id,
        rollNo: "CS2025001",
        class: "CSE-A",
        section: "A",
        feeStatus: "paid",
      },
      {
        userId: users[1]._id,
        rollNo: "CS2025002",
        class: "CSE-A",
        section: "A",
        feeStatus: "partial",
      },
    ]);

    // 3️⃣ Create Attendance linked to Students
    await Attendance.insertMany([
      { studentId: students[0]._id, totalClasses: 40, attendedClasses: 35 },
      { studentId: students[1]._id, totalClasses: 40, attendedClasses: 22 },
    ]);

    // 4️⃣ Create Scores linked to Students
    await Score.insertMany([
      { studentId: students[0]._id, subject: "Maths", marks: 85, maxMarks: 100 },
      { studentId: students[0]._id, subject: "Physics", marks: 78, maxMarks: 100 },
      { studentId: students[1]._id, subject: "Maths", marks: 40, maxMarks: 100 },
      { studentId: students[1]._id, subject: "Physics", marks: 35, maxMarks: 100 },
    ]);

    console.log("🌱 Sample data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedData();
