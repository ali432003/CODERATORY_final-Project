import express from "express"
import { createtask } from "../controllers/createtask.js"
import { gettask } from "../controllers/gettask.js"
import { updatetask } from "../controllers/updatetask.js"
import { deletetask } from "../controllers/deletetask.js"
import { jsonwebtken } from "../middlewares/auth.js"


const Emprouter = express.Router()

//employee routes

Emprouter.post(("/createtask"), jsonwebtken, createtask)
Emprouter.get(("/gettask/:eid"), jsonwebtken, gettask)
Emprouter.patch(("/updatetask/:id"), jsonwebtken, updatetask)
Emprouter.delete(("/deletetask/:id"), jsonwebtken, deletetask)

export default Emprouter