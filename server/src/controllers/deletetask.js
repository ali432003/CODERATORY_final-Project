import Tasks from "../models/employeeTasks.js"

export const deletetask = async (req, res) => {
    try {
        const _id = req.params.id
        
        const updProd = await Tasks.findByIdAndDelete( _id )
        res.json({ status: true, message: "task deleted", data: updProd })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}