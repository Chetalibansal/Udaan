import {Router} from 'express';
import { authorize, protect } from '../middleware/auth.middleware.js';
import { getAllStudentsWithRisk} from '../controllers/student.controller.js';

const router = Router();

router.get("/students", protect, authorize(["teacher/mentor", "admin"]), getAllStudentsWithRisk);

export default router