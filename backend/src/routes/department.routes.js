import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/admin.middlewares.js";

import {
    addDepartment,
    getDepartments,
    editDepartment,
    updateDepartment,
    deleteDepartment
} from "../controllers/department.controllers.js";

const router = Router();

router.route("/").get(verifyJWT, getDepartments);
router.route("/add").post(verifyJWT, isAdmin, addDepartment);
router.route("/:_id").get(verifyJWT, isAdmin, editDepartment);
router.route("/:_id").put(verifyJWT, isAdmin, updateDepartment);
router.route("/:_id").delete(verifyJWT, isAdmin, deleteDepartment);

export default router;