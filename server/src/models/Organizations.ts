import mongoose, { Schema, Document } from "mongoose";

interface IOrganization extends Document {
    name: string;
    point_of_contact?: mongoose.Types.ObjectId;

    plan_id: mongoose.Types.ObjectId;
    admins: mongoose.Types.ObjectId[];
    owner: mongoose.Types.ObjectId;
}

const OrganizationSchema = new Schema<IOrganization>(
    {
        name: { type: String, required: true },
        // the contact person will default to admin(s) UOS
        point_of_contact: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        plan_id: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
        owner: { type: Schema.Types.ObjectId, ref: "Organization" },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const Organization = mongoose.model<IOrganization>(
    "Organization",
    OrganizationSchema
);
export default Organization;
