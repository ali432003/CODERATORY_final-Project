import mongoose from "mongoose"
import { getSocketInstance } from "../socket/socketInstance.js"
import timeLogDB from "../models/timeTrackSchema.js"


export const timeTrack = async (req, res) => {
    try {
        const allTimeTracks = await timeLogDB.find({})
        res.status(200).json({ message: "All time logs fetched", data: allTimeTracks })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
} 