import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { getSocketInstance } from "../socket/socketInstance.js";
import jwt from "jsonwebtoken";
import timeLogDB from "../models/timeTrackSchema.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Required data is missing" });
            return;
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            res.status(404).json({ message: "Incorrect Email" });
            return;
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            res.status(404).json({ message: "Incorrect password" });
            return;
        }

        // Generate JWT token and set cookie
        const token = jwt.sign({ id: userExist._id, email: userExist.email, role: userExist.role }, process.env.Jwt);
        res.cookie('jwt', token);


        // Emit socket event for user connection
        const io = getSocketInstance();
        if (io) {
            io.emit('user-connected', userExist._id); // Emit event with the user ID
        }

        // Check if user already has time logs
        const existingTimeLog = await timeLogDB.findOne({ userId: userExist._id });
        const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

        if (existingTimeLog) {
            // If the user has time logs, update the login time to the current time
            await timeLogDB.findByIdAndUpdate(
                existingTimeLog._id,
                { $set: { loginTime: currentTime } }, // Update login time
                { new: true } // Return the updated document
            );
        } else {
            // Create new time log entry if the user is logging in for the first time
            await timeLogDB.create({
                userId: userExist._id,
                loginTime: currentTime
            });
        }

        res.json({ status: true, data: userExist, message: `User logged in successfully at ${currentTime}`, token: token });

    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
        return;
    }
};
