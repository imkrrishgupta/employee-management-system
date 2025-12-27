import { User } from "../models/user.models.js";
import { connectDB } from "../db/index.js";

const userRegister = async () => {
    try {
        await connectDB();

        await User.create({
            name: "Admin",
            email: `${process.env.ADMIN_EMAIL}`,
            password: `${process.env.ADMIN_PASS}`,
            role: "admin"
        });

        console.log("Admin added successfully");

    } catch (error) {
        console.log(error);
    }
}

userRegister();