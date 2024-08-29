import { roles } from "../constants/role.js"

export const checkRole = (req, res, next) => {
    const role = req.query.role

    if (!role) {
        return res.json({ message: "Missing query param role" })
    } else if (roles.Admin !== role) {
        return res.json({ message: "You are not authorized" })
    }
    req.user = role
    next()
}