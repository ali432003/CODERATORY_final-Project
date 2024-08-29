import express from "express"
import { signup } from "../controllers/signup.js"
import { login } from "../controllers/login.js"
import { logout } from "../controllers/logout.js"
import { jsonwebtken } from "../middlewares/auth.js"


const Authrouter = express.Router()
//auth routes

Authrouter.post(("/signup"), signup)

Authrouter.post(("/login"), login)

Authrouter.post(("/logout/:id"),jsonwebtken, logout)

export default Authrouter