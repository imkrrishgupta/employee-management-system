import { Salary } from "../models/salary.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addSalary = asyncHandler(async (req, res) => {
    const {employeeId, basicSalary, allowances, deductions, payDate} = req.body;

    const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const salary = await Salary.create({
        employeeId,
        basicSalary,
        allowances,
        deductions,
        netSalary: totalSalary,
        payDate
    });

    const createdSalary = await Salary.findById(salary._id);

    if (!createdSalary){
        throw new ApiError(404, "Salary not created");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            "Salary added successfully"
        ));

});

const getSalary = asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const salary = await Salary.find({ employeeId: _id })
        .populate({
            path: "employeeId",
            select: "_id userId",
            populate: {
                path: "userId",
                select: "name email avatar"
            }
        });

    if (!salary){
        throw new ApiError(404, "Salary record not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { salary: salary },
                "Salary record found"
            )
        );
});


export {
    addSalary,
    getSalary
};