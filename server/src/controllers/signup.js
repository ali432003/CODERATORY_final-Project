import User from "../models/userSchema.js";
import bcrypt from "bcrypt"
import mongoose from "mongoose";

export const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!username | !email | !password) {
            return res.status(404).json({ message: "required data is missing" })
        }
        else if (!emailRegex.test(email)) {
            res.status(400).json({ message: "Invalid Email", status: false })
            return
        } else if (password.length < 8) {
            res.status(400).json({ message: "Invalid password it must contain 8 characters" })
            return
        }
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            res.json({ message: "User is already exist", status: false })
            return
        }
        const hashPass = await bcrypt.hash(password, 10)
        const obj = { ...req.body, password: hashPass }
        const newUser = new User(obj)
        await newUser.save()
        res.status(200).json({ status: true, data: newUser, message: "user created !" })

    } catch (error) {
        res.status(500).json({ message: error.message, data: [], status: false })
    }



};

