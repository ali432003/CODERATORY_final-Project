import Tasks from "../models/employeeTasks.js"

export const gettask = async (req, res) => {
    try {
        const eid = req.params.eid
        const E_tasks = await Tasks.find({ userId: eid })
        if (!E_tasks) throw new Error("No Tasks found")
        res.status(200).json({ message: "task succesfully retrived", data: E_tasks })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}