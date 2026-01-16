import mongoose, { Schema } from "mongoose";
import { Employee } from "./employee.models.js";
import { Leave } from "./leave.models.js";
import { Salary } from "./salary.models.js";
import { User } from "./user.models.js";

const departmentSchema = new Schema(
    {
        dep_name: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    },
    { timestamps: true }
);

departmentSchema.pre("deleteOne", {document: true, query: false}, async function (){
    const employees = await Employee.find({department: this._id});

    if (employees.length === 0){
        return;
    } 

    const empIds = employees.map((emp) => emp._id);

    const userIds = employees.map((emp) => emp.userId);
        
    if (empIds.length){
        await Leave.deleteMany({employeeId: {$in: empIds}});
        await Salary.deleteMany({employeeId: {$in: empIds}});
        await Employee.deleteMany({ _id: { $in: empIds } });
    }
        
    if (userIds.length){
        await User.deleteMany({_id: {$in: userIds}});
    }

})

export const Department = mongoose.model("Department", departmentSchema);