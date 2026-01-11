import { Employee } from "../models/employee.models.js";
import { User } from "../models/user.models.js";  // Will create user account for every employee
import { Department } from "../models/department.models.js";  // Will update department in update Employee
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

const addEmployee = asyncHandler(async (req, res) => {
    const { name, email,  employeeId, dob, gender, maritalStatus, designation, department, salary, password, role } = req.body;

    const user = await User.findOne({ email });

    if (user){
        throw new ApiError(404, "User already exists");
    }

    const avatarLocalPath = req.file;

    let avatar = null;

    if (avatarLocalPath){
        try {
            avatar = await uploadOnCloudinary(avatarLocalPath.path);
            
            if (process.env.NODE_ENV !== "production"){
                console.log("Uploaded avatar", avatar.public_id);
            }
            
        } catch (error) {
            console.log("Error uploading avatar", error);
            throw new ApiError(500, "Failed to upload avatar");
        }
        
    }
        
    try {
        const user = await User.create({
            name,
            email,
            password,
            role,
            avatar: avatar?.url
        });
        
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if (!createdUser){
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        const employee = await Employee.create({
            userId: user._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        const createdEmployee = await Employee.findOne(employee._id)

        if (!createdEmployee){
            throw new ApiError(404, "Employee not found");
        }
    
        return res
            .status(200)
            .json(new ApiResponse(
                200, 
                createdEmployee, 
                "Employee created successfully"
            ));
    
    } catch (error) {
        console.log("User Creation failed");
        if (avatar){
            await deleteFromCloudinary(avatar.public_id);
        }

        // If all goes well then we want to throw an error
        
        throw new ApiError(500, "Something went wrong while registering a user and images were deleted");
    }

});

const getEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find()
        .populate({
            path: "userId",
            select: "name email role _id avatar"
        })
        .populate({
            path: "department",
            select: "dep_name _id"
        });
    
    if (!employees){
        throw new ApiError(404, "No record of Employee found");
    }
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { employees: employees },
            "Departments fetched successfully"
        ));

})

const getEmployee = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const employee = await Employee.findById({ _id })
        .populate({
            path: "userId",
            select: "name email _id avatar"
        })
        .populate({
            path: "department",
            select: "dep_name"
        });
    
    if (!employee){
        throw new ApiError(404, "No record of Employee found");
    }
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { employee: employee },
            "Employee fetched successfully"
        ));

})

const updateEmployee = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({_id});

    if (!employee){
        throw new ApiError(404, "Employee not found");
    }

    const user = await User.findById({_id: employee.userId});

    if (!user){
        throw new ApiError(404, "User not found");
    }

    const updatedUser = await User.findByIdAndUpdate({_id: employee.userId}, {name});

    const updatedEmployee = await Employee.findByIdAndUpdate({_id}, {maritalStatus, designation, salary, department});

    if (!updatedEmployee || !updatedUser){
        throw new ApiError(404, "Document not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            "Employee updated"
        ));

})

export {
    addEmployee,
    getEmployees,
    getEmployee,
    updateEmployee
};