import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    role: "admin" | "user" | "guest" | "instructor";
    passwordHash: string;
    createdAt: Date;
    courseProgress: mongoose.Types.ObjectId[];
    certificates: mongoose.Types.ObjectId[];
    surveyResponses: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    courseProgress: [{ type: Schema.Types.ObjectId, ref: "CourseProgress" }],
    certificates: [{ type: Schema.Types.ObjectId, ref: "Certificate" }],
    surveyResponses: [{ type: Schema.Types.ObjectId, ref: "SurveyResponse" }],
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
