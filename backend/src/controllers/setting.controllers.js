import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";


const changePassword = asyncHandler(async (req, res) => {
    const {userId, oldPassword, newPassword } = req.body;

    const user = await User.findById({_id: userId});

    if (!user){
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid){
        throw new ApiError(401, "Old password is incorrect");
    }

    user.password = newPassword;

    await user.save({ validateBeforeSave: true });

    return res
        .status(200)
        .json(new ApiResponse(
            200, 
            {}, 
            "Password changed successfully"
        ));

})

export {
    changePassword
};