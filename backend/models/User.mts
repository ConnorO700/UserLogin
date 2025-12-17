import mongoose, { Types } from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },

}, {
    toJSON: { getters: true },
    toObject: { getters: true }
});

export default mongoose.model('User', userSchema);