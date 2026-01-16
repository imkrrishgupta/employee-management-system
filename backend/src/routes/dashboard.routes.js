import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/admin.middlewares.js";

import {
    getSummary
} from "../controllers/dashboard.controllers.js";

const router = Router();

router.route("/summary").get(verifyJWT, isAdmin, getSummary);

export default router;