import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

import {
    loginUser,
    logoutUser
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);


export default router;