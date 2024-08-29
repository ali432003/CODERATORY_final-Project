import Tasks from "../models/employeeTasks.js"


export const updatetask = async (req, res) => {
    try {
        const _id = req.params.id
        const updProd = await Tasks.findByIdAndUpdate(_id, req.body, { new: true })
        res.json({ status: true, message: "task updated", data: updProd })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}