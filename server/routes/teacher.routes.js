import {Router} from 'express';
import { authorize, protect } from '../middleware/auth.middleware';
import { getAllStudentsWithRisk} from '../controllers/student.controller';

const router = Router();

router.get("/students", protect, authorize(["teacher/mentor", "admin"]), getAllStudentsWithRisk);

export default router