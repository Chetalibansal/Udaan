import {Router} from 'express';
import { authorize, protect } from '../middleware/auth.middleware.js';
import { getStudentById} from '../controllers/student.controller.js';

const router = Router();

router.get('/:id', protect, authorize(["student/parent", "teacher/mentor", "admin"]), getStudentById);

export default router