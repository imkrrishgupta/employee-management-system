import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigin = `${process.env.NODE_ENV}` === "production" ? `${process.env.CORS_ORIGIN_PROD}` : `${process.env.CORS_ORIGIN_DEV}`;

app.use(
    cors({
        origin: allowedOrigin,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

// common middleware

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb"}))  // To come up the data in the url encoded format
app.use(express.static("public"))
app.use(cookieParser())

// import routes

import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middlewares.js";
import { verifyJWT } from "./middlewares/auth.middlewares.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import departmentRouter from "./routes/department.routes.js";

// routes

app.use("/api/v1/users", userRouter);
app.get("/api/v1/verify", verifyJWT, (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200,
            { user: req.user },
            "User verified"
        ));
});

app.use("/api/v1/departments", departmentRouter);

app.use(errorHandler);

export { app };