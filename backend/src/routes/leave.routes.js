import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

import {
    addLeave,
    getLeaves,
    getLeave,
    getLeaveDetail,
    updateLeave
} from "../controllers/leave.controllers.js";

import { isAdmin } from "../middlewares/admin.middlewares.js";

const router = Router();

router.route("/add").post(verifyJWT, addLeave);

router.route("/:_id").get(verifyJWT, getLeave);

router.route("/").get(verifyJWT, getLeaves);

router.route("/details/:_id").get(verifyJWT, getLeaveDetail);

router.route("/:_id").put(verifyJWT, isAdmin, updateLeave);

export default router;