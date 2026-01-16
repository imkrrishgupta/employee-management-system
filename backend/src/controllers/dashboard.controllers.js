import { Department } from "../models/department.models.js";
import { Employee } from "../models/employee.models.js";
import { Leave } from "../models/leave.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getSummary = asyncHandler(async (req, res) => {
    const totalEmployees = await Employee.countDocuments();

    const totalDepartments = await Department.countDocuments();

    const totalSalaries = await Employee.aggregate([
        {
            $group: {
                _id: null,
                totalSalary: {
                    $sum: "$salary"
                }
            }
        }
    ])

    const employeesAppliedForLeave = await Leave.distinct("employeeId");  // It will count distinct employee Ids (unique)

    const leaveStatus = await Leave.aggregate([
        {
            $group: {
                _id: "$status",
                count: {$sum: 1}
            }
        }
    ])

    const leaveSummary = {
        appliedFor: employeesAppliedForLeave.length,
        approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,
        pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
        rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { summary: {
                totalEmployees, 
                totalDepartments, 
                totalSalary: totalSalaries[0]?.totalSalary || 0, 
                leaveSummary
            }},
            "Summary records sent successfully"
        ));

});

export {
    getSummary
};