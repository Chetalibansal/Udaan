import { Router } from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = Router();

// student/parent dashboard
router.get("/student", protect, authorize("student/parent"), (req, res) => {
  res.json({ message: `Welcome Student ${req.user.name}`, role: req.user.role });
});

// teacher/mentor dashboard
router.get("/teacher", protect, authorize("teacher/mentor"), (req, res) => {
  res.json({ message: `Welcome Teacher ${req.user.name}`, role: req.user.role });
});

// admin dashboard
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}`, role: req.user.role });
});

export default router;
