import { User } from "../models/user.models.js";
import { connectDB } from "../db/index.js";
import bcrypt from "bcrypt";

const userRegister = async () => {
    try {
        await connectDB();

        const hashPassword = await bcrypt.hash(`${process.env.ADMIN_PASS}`, Number(process.env.ENCRYPTION_ROUND));

        await User.create({
            name: "Admin",
            email: `${process.env.ADMIN_EMAIL}`,
            password: hashPassword,
            role: "admin"
        });

        console.log("Admin added successfully");

    } catch (error) {
        console.log(error);
    }
}

userRegister();