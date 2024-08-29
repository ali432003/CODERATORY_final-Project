import User from "../models/userSchema.js";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import timeLogDB from "../models/timeTrackSchema.js";

export const logout = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("EmployeeID not Found")
        res.cookie("jwt", '', {
            maxAge: 0
        })
        const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        // console.log(currentTime)
        const existingTimeLog = await timeLogDB.findOne({ userId: id });
        if (existingTimeLog) {
            await timeLogDB.findByIdAndUpdate(existingTimeLog.id, { $set: { logoutTime: currentTime } }, { new: true })
        }
        res.status(200).json({ success: true, message: `User Logged Out at ${currentTime}` })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log(error);
    }
}