import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import { isAdmin } from '../middlewares/admin.middlewares.js';
import { uploadAvatar } from '../middlewares/multer.middlewares.js';

import {
    addEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    fetchEmployeesByDepId
} from "../controllers/employee.controllers.js";

const router = Router();

router.route("/").get(verifyJWT, isAdmin, getEmployees);

router.route("/add").post(
    verifyJWT, 
    isAdmin, 
    uploadAvatar.single("avatar"),
    addEmployee
);

router.route("/:_id").get(verifyJWT, isAdmin, getEmployee);

router.route("/:_id").put(verifyJWT, isAdmin, updateEmployee);

router.route("/departments/:_id").get(verifyJWT, isAdmin, fetchEmployeesByDepId);

export default router;