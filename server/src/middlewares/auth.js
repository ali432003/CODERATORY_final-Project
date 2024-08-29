import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

const secretKey = process.env.Jwt


export const jsonwebtken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json("No token found!!!");
        }

        const bearer = token.split(" ");
        if (bearer[0] !== "Bearer" || !bearer[1]) {
            return res.status(400).json("Token format invalid!");
        }

        const tokenValue = bearer[1];
        // console.log("Token Value:", tokenValue);
        // console.log("key", secretKey)
        const decode = jwt.verify(tokenValue, secretKey);
        // console.log(decode)
        if (!decode) {
            return res.status(401).json("Invalid Token");
        }

        req.user = decode;
        next();
        
    } catch (error) {
        // console.log(`Error in jsonwebtken middleware: ${error.message}`);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
