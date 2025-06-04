import mongoose, { Schema, Document } from "mongoose";

type Plan = "basic" | "pro" | "enterprise";
type ComplianceCycle = "annual" | "biennial" | "rolling";

interface Organization extends Document {
    name: string;
    plan: Plan;
    admin_ids: mongoose.Types.ObjectId[];
    compliance_cycle: ComplianceCycle;
    is_active: boolean;
    created_at: Date;
}

const OrganizationSchema = new Schema<Organization>({
    name: { type: String, required: true },
    plan: {
        type: String,
        required: true,
        enum: ["basic", "pro", "enterprise"],
    },
    admin_ids: [{ type: Schema.Types.ObjectId, ref: "User" }],
    compliance_cycle: {
        type: String,
        enum: ["annual", "biennial", "rolling"],
        default: "annual",
    },
    is_active: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Date.now },
});

const OrganizationModel = mongoose.model<Organization>(
    "Organization",
    OrganizationSchema
);
export default OrganizationModel;
