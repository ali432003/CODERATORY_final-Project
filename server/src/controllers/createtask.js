import Tasks from "../models/employeeTasks.js"

export const createtask = async (req, res) => {
    try {
        const { title, description, userId } = req.body
        if (!title || !description || !userId) throw new Error("Required fields is missing")
        const newTask = await Tasks.create({ title: title, description: description, userId: userId })
        res.json({ status: true, message: "task created", data: newTask })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}