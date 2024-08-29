import mongoose from "mongoose";
import moment from "moment";

const timeLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    loginTime: {
        type: String,
        required: true
    },
    logoutTime: {
        type: String
    },
    totalActivityTime: {
        type: Number
    }, // Calculated in seconds or minutes
}, { timestamps: true });

timeLogSchema.set('toJSON', {
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

const timeLogDB = mongoose.model("timeLogSchema", timeLogSchema)

export default timeLogDB
