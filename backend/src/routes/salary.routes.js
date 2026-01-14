import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import { isAdmin } from '../middlewares/admin.middlewares.js';

import { 
    addSalary,
    getSalary
} from '../controllers/salary.controllers.js';

const router = Router();

router.route("/:_id").get(verifyJWT, getSalary);

router.route("/add").post(verifyJWT, isAdmin, addSalary);

export default router;