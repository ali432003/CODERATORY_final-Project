import express from "express"
import { configDotenv } from "dotenv"
import dbConnection from "../src/config/dbConnection.js"
import Adminrouter from "../src/routes/admin.js"
import Emprouter from "../src/routes/employee.js"
import Authrouter from "../src/routes/auth.js"
import cors from "cors"
import http from "http"
import initializeSocket from "../src/socket/socket.js"


const app = express()

configDotenv({ path: "./.env" })


// db connection
dbConnection()

// JSON body parser and cors
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
))

//socket
const server = http.createServer(app)
initializeSocket(server)

// root api
app.get(("/api/v2"), (req, res) => {
    res.json({ message: "hellow world" })
})
// routes
app.use("/api/v2", Adminrouter)
app.use("/api/v2/employee", Emprouter)
app.use("/api/v2/auth", Authrouter)




const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})