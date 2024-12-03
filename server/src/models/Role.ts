import mongoose, { Schema, Document } from "mongoose";

interface IRole extends Document {
    name: "admin" | "instructor" | "user";
}

const RoleSchema = new Schema<IRole>(
    {
        name: {
            type: String,
            required: true,
            enum: ["admin", "instructor", "user"],
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const Role = mongoose.model<IRole>("Role", RoleSchema);
export default Role;
