import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isAdmin = asyncHandler(async(req, res, next) => {
    if (!req.user){
        throw new ApiError(401, "Unauthorised");
    }

    if (req.user.role !== "admin"){
        throw new ApiError(403, "Admin access required");
    }

    next();

});