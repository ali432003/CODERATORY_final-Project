import mongoose from "mongoose";
import moment from "moment";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

taskSchema.set('toJSON', {
    transform: (doc, ret) => {
        if (ret.createdAt && ret.updatedAt) {
            const createdAtMoment = moment(ret.createdAt);
            ret.createdAt = createdAtMoment.format("h.mm A, D/M/YY");
            const updatedAtMoment = moment(ret.updatedAt);
            ret.updatedAt = updatedAtMoment.format("h.mm A, D/M/YY");
        }
        return ret;
    }
});

const Tasks = mongoose.model("task", taskSchema)

export default Tasks