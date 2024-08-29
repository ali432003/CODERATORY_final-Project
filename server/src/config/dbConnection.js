import mongoose from "mongoose"
import { configDotenv } from "dotenv"

configDotenv({path : "./.env"})

const DB = process.env.MONGODB_URL
const dbConnection = () => {
    mongoose.connect(DB).then(() => {
        console.log("DB connected!")
    }).catch((e) => { console.log(e.message) })
}

export default dbConnection