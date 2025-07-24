import mongoose, { Schema, Document } from "mongoose";

type Role = "admin" | "instructor" | "user" | "super_admin";

export interface User extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    salt: string;
    organization_id: mongoose.Types.ObjectId;
    license_type: string;
    role: Role;
}

const UserSchema = new Schema<User>(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        password_hash: { type: String, required: true },
        organization_id: [{ type: Schema.Types.ObjectId, ref: "Organization" }],
        license_type: { type: String, required: true },
        role: {
            type: String,
            required: true,
            enum: ["admin", "instructor", "user", "super_admin"],
            default: "user",
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const UserModel = mongoose.model<User>("User", UserSchema);
export default UserModel;
