import mongoose from "mongoose";

const verifiedUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }
}, {
    timestamps: true
});

const VerifiedUser = mongoose.model('VerifiedUser', verifiedUserSchema);

export default VerifiedUser;
