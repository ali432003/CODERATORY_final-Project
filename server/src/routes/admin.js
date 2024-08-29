import express from "express"
import { jsonwebtken } from "../middlewares/auth.js"
import { checkRole } from "../middlewares/checkRole.js"
import { timeTrack } from "../controllers/timeTracks.js"


const Adminrouter = express.Router()


//Admin routes
Adminrouter.get(("/get"), jsonwebtken, checkRole, timeTrack)

export default Adminrouter