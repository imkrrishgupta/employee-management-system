import { Department } from "../models/department.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addDepartment = asyncHandler(async (req, res) => {
    const { dep_name , description } = req.body;

    const existedDepartment = await Department.findOne({dep_name});

    if (existedDepartment){
        throw new ApiError(409, "Department with same name already exists");
    }

    const department = await Department.create({
        dep_name,
        description
    });

    const createdDepartment = await Department.findById(department._id);

    if (!createdDepartment){
        throw new ApiError(500, "Something went wrong while creating the department");
    }

    return res.
        status(201)
        .json(new ApiResponse(
            201,
            {department: createdDepartment},
            "Department created successfully"
        ));

});

const getDepartments = asyncHandler(async (req, res) => {
    const departments = await Department.find();

    if (!departments){
        throw new ApiError(404, "No record of Department found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { departments: departments },
            "Departments fetched successfully"
        ));

});

const editDepartment = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const department = await Department.findById({ _id });

    if (!department){
        throw new ApiError(404, "Department not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { department: department },
            "Department fetched successfully"
        ));
    
});

const updateDepartment = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const { dep_name, description } = req.body;

    const updateDep = await Department.findByIdAndUpdate({ _id }, {
        dep_name,
        description
    });

    if (!updateDep){
        throw new ApiError(404, "Department not updated");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            updateDep,
            "Department updated successfully"
        ));

});

const deleteDepartment = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const deleteDep = await Department.findById(_id);

    if (!deleteDep){
        throw new ApiError(404, "Department not found");
    }

    await deleteDep.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            null,
            "Department deleted successfully"
        ));

});

export { 
    addDepartment, 
    getDepartments,
    editDepartment,
    updateDepartment,
    deleteDepartment
};