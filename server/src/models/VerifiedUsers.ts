import mongoose from "mongoose";

export interface VerifiedUser extends mongoose.Document {
    email: string;
    first_name: string;
    last_name: string;
    organization: mongoose.Types.ObjectId;
    verification_code: string;
    invited_by: mongoose.Types.ObjectId;
    invited_at: Date;
    verified_at: Date;
    email_sent: boolean;
    email_sent_at: Date;
    user_id: mongoose.Types.ObjectId;
    is_active: boolean;
}

const verifiedUserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        verification_code: {
            type: String,
            required: true,
        },
        invited_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        invited_at: {
            type: Date,
            required: true,
        },
        verified_at: {
            type: Date,
            required: false,
        },
        email_sent: {
            type: Boolean,
            required: true,
            default: false,
        },
        email_sent_at: {
            type: Date,
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        is_active: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const VerifiedUserModel = mongoose.model<VerifiedUser>(
    "VerifiedUser",
    verifiedUserSchema
);

export default VerifiedUserModel;
