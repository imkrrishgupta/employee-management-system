import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

import {
    addLeave,
    getLeaves
} from "../controllers/leave.controllers.js";

const router = Router();

router.route("/add").post(verifyJWT, addLeave);

router.route("/:_id").get(verifyJWT, getLeaves);

export default router;