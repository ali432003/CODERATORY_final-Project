import mongoose from "mongoose";
import moment from "moment";


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Employee'], default: 'Employee' },
}, { timestamps: true });


userSchema.set('toJSON', {
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
const User = mongoose.model("user", userSchema)

export default User