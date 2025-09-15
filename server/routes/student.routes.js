import {Router} from 'express';
import { authorize, protect } from '../middleware/auth.middleware';
import { getStudentById} from '../controllers/student.controller';

const router = Router();

router.get('/:id', protect, authorize(["student/parent", "teacher/mentor", "admin"]), getStudentById);

export default router