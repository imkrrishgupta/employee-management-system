import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
    path: "./.env"
})

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        role: {
            type: String,
            enum: ["employee", "admin"],
            default: "employee",
        },
        avatar: {
            type: String
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function(){
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, Number(`${process.env.ENCRYPTION_ROUND}`));
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
}

export const User = mongoose.model("User", userSchema);