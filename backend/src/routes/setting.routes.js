import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

import {
    changePassword
} from "../controllers/setting.controllers.js";

const router = Router();

router.route("/change-password").put(verifyJWT, changePassword);

export default router;