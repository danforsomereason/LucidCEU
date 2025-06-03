import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    salt: string;
    organization: mongoose.Types.ObjectId;
    license_type: string;
}

const UserSchema = new Schema<IUser>(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        password_hash: { type: String, required: true },
        organization: [{ type: Schema.Types.ObjectId, ref: "Organization" }],
        license_type: { type: String, required: true },
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
