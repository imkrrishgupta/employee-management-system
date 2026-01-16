import { Leave } from "../models/leave.models.js";
import { Employee } from "../models/employee.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addLeave = asyncHandler(async (req, res) => {
    const {userId, leaveType, startDate, endDate, reason} = req.body;

    const employee = await Employee.findOne({userId});
    
    const leave = await Leave.create({
        employeeId: employee._id, 
        leaveType, 
        startDate, 
        endDate, 
        reason
    });
    
    const createdLeave = await Leave.findById(leave._id);
    
    if (!createdLeave){
        throw new ApiError(404, "Leave not created");
    }
    
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            "Leave added successfully"
        ));

});

const getLeave = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    let employee = await Employee.findById(_id);

    if (!employee) {
        employee = await Employee.findOne({ userId: _id });
    }

    if (!employee) {
        throw new ApiError(404, "Employee not found");
    }

    const leaves = await Leave.find({ employeeId: employee._id })
        .populate({
            path: "employeeId",
            populate: {
                path: "userId",
                select: "name"
            }
        });

    if (leaves.length === 0) {
        throw new ApiError(404, "No leave record found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { leaves: leaves },
            "Leave records fetched successfully"
        )
    );
});

const getLeaves = asyncHandler(async (req, res) => {
    const leaves = await Leave.find()
        .populate({
            path: "employeeId",
            populate: [
                {
                    path: "department",
                    select: "dep_name"
                },
                {
                    path: "userId",
                    select: "name avatar"
                }
            ]
        })

    if (!leaves){
        throw new ApiError(404, "No leave record is found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {leaves: leaves},
            "All leaves fetched successfully"
        ));

});

const getLeaveDetail = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const leave = await Leave.findById({ _id })
        .populate({
            path: "employeeId",
            populate : [
                {
                    path: "department",
                    select: "dep_name"
                },
                {
                    path: "userId",
                    select: "name avatar"
                }
            ]
        })

    if (!leave){
        throw new ApiError(404, "No leave record found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { leave: leave },
            "Leave details fetched"
        ));

});

const updateLeave = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate({ _id }, { status })

    if (!leave){
        throw new ApiError(404, "Leave not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { leave: leave },
            "Leave status updated successfully"
        ));

});

export {
    addLeave,
    getLeave,
    getLeaves,
    getLeaveDetail,
    updateLeave
};