import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

const roleSchema = z.union([
    z.literal("admin"),
    z.literal("instructor"),
    z.literal("user"),
    z.literal("super_admin"),
]);

type Role = z.infer<typeof roleSchema>;

const userZodSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    password_hash: z.string(),
    organization_id: z.string().optional(),
    license_type: z.string(),
    role: roleSchema,
});

export type UserZod = z.infer<typeof userZodSchema>;
export type UserWithoutOrganization = Omit<UserZod, "organization_id">;
export type User = UserWithoutOrganization & {
    organization_id: Schema.Types.ObjectId;
};

const UserSchema = new Schema<User>(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        password_hash: { type: String, required: true },
        organization_id: { type: Schema.Types.ObjectId, ref: "Organizations" },
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
