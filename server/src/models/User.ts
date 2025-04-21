import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    password_hash: string;
    salt: string;
    course_progress: mongoose.Types.ObjectId[];
    certificates: mongoose.Types.ObjectId[];
    survey_responses: mongoose.Types.ObjectId[];
    organization: mongoose.Types.ObjectId;
    isAdmin: boolean;
    license_type: string;
}

const UserSchema = new Schema<IUser>(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        role: {
            type: String,
            required: true,
            enum: ["admin", "instructor", "user"],
            default: "user",
        },
        password_hash: { type: String, required: true },
        course_progress: [
            { type: Schema.Types.ObjectId, ref: "CourseProgress" },
        ],
        certificates: [{ type: Schema.Types.ObjectId, ref: "Certificate" }],
        survey_responses: [
            { type: Schema.Types.ObjectId, ref: "SurveyResponse" },
        ],
        organization: [{ type: Schema.Types.ObjectId, ref: "Organization" }],
        license_type: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
