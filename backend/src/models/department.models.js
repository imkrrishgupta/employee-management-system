import mongoose, { Schema } from "mongoose";

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

export const Department = mongoose.model("Department", departmentSchema);